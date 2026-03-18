import './styles/variables.css'
import './styles/base.css'
import './styles/app.css'

import { fetchNames } from './lib/fetchNames'
import { pickWeighted } from './lib/weightedPick'
import { loadWeights, saveWeights } from './lib/weightsStore'
import { setupCustomSelect } from './components/CustomSelect'
import { setupRangeSlider } from './components/RangeSlider'
import { setupSwitch } from './components/Switch'

type AppState = {
  names: string[]
  baseWeights: Record<string, number>
  biasTarget: string | null
  biasStrength: number
  excludePicked: boolean
  spinMs: number
  history: string[]
  rolling: boolean
  canStop: boolean
  rollingName: string | null
  currentPick: {
    name: string
    weight: number
    totalWeight: number
    chance: number
  } | null
  error: string | null
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`

const uniqueNames = (names: string[]) => {
  const seen = new Set<string>()
  const out: string[] = []
  for (const raw of names) {
    const n = raw.trim()
    if (!n) continue
    if (seen.has(n)) continue
    seen.add(n)
    out.push(n)
  }
  return out
}

const buildCandidates = (state: AppState) => {
  const pickedSet = new Set(state.history)
  return state.names.map((name) => {
    const base = state.baseWeights[name] ?? 1
    const biased = state.biasTarget === name ? base * state.biasStrength : base
    const effective = state.excludePicked && pickedSet.has(name) ? 0 : biased
    return { name, weight: effective }
  })
}

const render = (root: HTMLElement, state: AppState) => {
  root.innerHTML = `
    <div class="app">
      <div class="layout">
        <div class="header">
          <h1 class="title">
            <span class="titleMark">随机点名</span>
            <span class="subtitle">可调整偏向概率 · 清新自然背景与高亮效果</span>
          </h1>
          <div class="pill" title="当前策略概览">
            <span class="pillDot"></span>
            <span class="pillText" id="pillText"></span>
          </div>
        </div>

        <div class="card primaryCard">
          <div class="picked">
            <div class="pickedLabel" id="pickedLabel">本次点到</div>
            <div class="pickedName" id="pickedName">${state.rolling ? state.rollingName ?? '滚动中…' : state.currentPick ? state.currentPick.name : '—'}</div>
            <div class="pickedMeta" id="pickedMeta"></div>
            <div class="controls">
              <button class="btn btnPrimary" id="startBtn" type="button">开始滚动</button>
              <button class="btn btnDanger" id="stopBtn" type="button" disabled>停止</button>
              <button class="btn" id="clearHistoryBtn" type="button">清空历史</button>
            </div>
          </div>

          <div class="spacer14"></div>

          <div class="card listCard listCardSoft">
            <div class="listHeader">
              <div>
                <div class="sectionTitle">历史</div>
              </div>
              <div class="listHint">开启“排除已点到”时，历史将不参与抽取</div>
            </div>
            <div class="history" id="history"></div>
          </div>
        </div>

        <div class="card side">
          <div class="sectionTitle">设置</div>
          <div class="fields">
            <div class="field">
              <div class="fieldLabel">
                <span>偏向对象</span>
                <span id="biasHint" style="color: var(--text-2)"></span>
              </div>
              <div class="select" id="biasSelect" tabindex="0"></div>
            </div>

            <div class="field">
              <div class="fieldLabel">
                <span>偏向强度</span>
                <span id="biasStrengthText"></span>
              </div>
              <div class="range" id="biasRange"></div>
            </div>

            <div class="switch">
              <span class="switchHint">排除已点到</span>
              <button id="excludePicked" type="button"></button>
            </div>

            <div class="field">
              <div class="fieldLabel">
                <span>滚动时长</span>
                <span id="spinText"></span>
              </div>
              <div class="range" id="spinRange"></div>
            </div>
          </div>

          <div id="error" class="error" hidden></div>
        </div>

        <div class="card listCard">
          <div class="listHeader">
            <div>
              <div class="sectionTitle">名单与权重</div>
            </div>
            <div class="listHint">每人基础权重（1-10）+ 可选偏向强度（倍数）</div>
          </div>
          <div class="nameList" id="nameList"></div>
        </div>
      </div>
    </div>
  `

  const pillText = root.querySelector<HTMLSpanElement>('#pillText')
  const biasSelect = root.querySelector<HTMLDivElement>('#biasSelect')
  const biasRange = root.querySelector<HTMLDivElement>('#biasRange')
  const biasStrengthText = root.querySelector<HTMLSpanElement>('#biasStrengthText')
  const biasHint = root.querySelector<HTMLSpanElement>('#biasHint')
  const excludePicked = root.querySelector<HTMLButtonElement>('#excludePicked')
  const spinRange = root.querySelector<HTMLDivElement>('#spinRange')
  const spinText = root.querySelector<HTMLSpanElement>('#spinText')
  const pickedNameEl = root.querySelector<HTMLDivElement>('#pickedName')
  const pickedMetaEl = root.querySelector<HTMLDivElement>('#pickedMeta')
  const pickedLabelEl = root.querySelector<HTMLDivElement>('#pickedLabel')
  const nameList = root.querySelector<HTMLDivElement>('#nameList')
  const historyEl = root.querySelector<HTMLDivElement>('#history')
  const startBtn = root.querySelector<HTMLButtonElement>('#startBtn')
  const stopBtn = root.querySelector<HTMLButtonElement>('#stopBtn')
  const clearHistoryBtn = root.querySelector<HTMLButtonElement>('#clearHistoryBtn')
  const errorEl = root.querySelector<HTMLDivElement>('#error')

  if (
    !pillText ||
    !biasSelect ||
    !biasRange ||
    !biasStrengthText ||
    !biasHint ||
    !excludePicked ||
    !spinRange ||
    !spinText ||
    !pickedNameEl ||
    !pickedMetaEl ||
    !pickedLabelEl ||
    !nameList ||
    !historyEl ||
    !startBtn ||
    !stopBtn ||
    !clearHistoryBtn ||
    !errorEl
  ) {
    throw new Error('页面元素缺失')
  }

  const candidates = buildCandidates(state)
  const total = candidates.reduce((sum, c) => sum + (c.weight > 0 ? c.weight : 0), 0)
  const usableCount = candidates.filter((c) => c.weight > 0).length

  const candidateWeightByName = new Map(candidates.map((c) => [c.name, c.weight] as const))

  const biasLabel = state.biasTarget ? `偏向「${state.biasTarget}」` : '无偏向'
  pillText.textContent = `${biasLabel} · 可抽 ${usableCount}/${state.names.length}`

  biasStrengthText.textContent = `${state.biasStrength}×`
  biasHint.textContent = state.biasTarget ? `当前偏向有效` : `未选择对象`

  setupCustomSelect(biasSelect, {
    value: state.biasTarget ?? '',
    placeholder: '不偏向任何人',
    disabled: state.rolling,
    options: [{ value: '', label: '不偏向任何人' }, ...state.names.map((n) => ({ value: n, label: n }))],
    onChange: (v) => {
      if (state.rolling) return
      state.biasTarget = v ? v : null
      render(root, state)
    }
  })

  setupRangeSlider(biasRange, {
    min: 1,
    max: 20,
    step: 1,
    value: state.biasStrength,
    disabled: state.rolling,
    onInput: (v) => {
      if (state.rolling) return
      state.biasStrength = v
      biasStrengthText.textContent = `${v}×`
    },
    onCommit: () => {
      if (state.rolling) return
      render(root, state)
    }
  })

  setupSwitch(excludePicked, {
    checked: state.excludePicked,
    disabled: state.rolling,
    onChange: (checked) => {
      if (state.rolling) return
      state.excludePicked = checked
      render(root, state)
    }
  })

  spinText.textContent = `${state.spinMs}ms`

  setupRangeSlider(spinRange, {
    min: 500,
    max: 4500,
    step: 100,
    value: state.spinMs,
    disabled: state.rolling,
    onInput: (v) => {
      if (state.rolling) return
      state.spinMs = v
      spinText.textContent = `${v}ms`
    },
    onCommit: () => {
      if (state.rolling) return
      render(root, state)
    }
  })

  startBtn.disabled = state.rolling || state.names.length === 0
  stopBtn.disabled = !state.rolling || !state.canStop
  clearHistoryBtn.disabled = state.rolling || state.history.length === 0

  errorEl.style.display = state.error ? 'block' : 'none'
  errorEl.textContent = state.error ?? ''
  errorEl.hidden = !state.error

  historyEl.innerHTML = state.history.length
    ? state.history.map((n) => `<span class="historyItem">${n}</span>`).join('')
    : `<span class="historyItem" style="opacity:0.7">暂无</span>`

  const pickMeta = (pick: { weight: number; totalWeight: number; chance: number } | null) => {
    if (!pick) return ''
    const weightText = `${Math.round(pick.weight)} / ${Math.round(pick.totalWeight)}`
    return [
      `<span class="metaBadge">命中概率 ${formatPercent(pick.chance)}</span>`,
      `<span class="metaBadge">权重 ${weightText}</span>`,
      total > 0 ? `<span class="metaBadge">可抽总权重 ${Math.round(total)}</span>` : ''
    ].join('')
  }

  pickedMetaEl.innerHTML = state.rolling ? '' : pickMeta(state.currentPick)

  const renderList = () => {
    const pickedSet = new Set(state.history)
    nameList.innerHTML = state.names
      .map((name) => {
        const base = state.baseWeights[name] ?? 1
        const isBiased = state.biasTarget === name
        const effective = candidateWeightByName.get(name) ?? base
        const percent = total > 0 ? effective / total : 0
        const disabled = effective <= 0
        const picked = pickedSet.has(name)
        return `
          <div class="nameItem ${disabled ? 'nameItemDisabled' : ''}">
            <div class="nameTop">
              <div class="nameText">${name}</div>
              <div class="nameBadges">
                ${isBiased ? `<span class="badge badgeBias">偏向</span>` : ''}
                ${picked ? `<span class="badge badgeOff">已点到</span>` : ''}
                <span class="badge">${formatPercent(percent)}</span>
              </div>
            </div>
            <div class="nameRangeRow">
              <div class="range" data-weight-slider="1" data-name="${name}"></div>
              <div class="nameRangeValue" data-weight-label="1" data-name="${name}">基础 ${base} · 有效 ${Math.round(effective)}</div>
            </div>
          </div>
        `
      })
      .join('')

    const sliderHosts = Array.from(nameList.querySelectorAll<HTMLDivElement>('[data-weight-slider][data-name]'))
    for (const host of sliderHosts) {
      const name = host.dataset.name
      if (!name) continue

      const label = nameList.querySelector<HTMLDivElement>(`[data-weight-label][data-name="${name}"]`)

      setupRangeSlider(host, {
        min: 1,
        max: 10,
        step: 1,
        value: state.baseWeights[name] ?? 1,
        disabled: state.rolling,
        onInput: (v) => {
          if (state.rolling) return
          state.baseWeights[name] = v
          saveWeights(state.baseWeights)
          if (label) label.textContent = `基础 ${v} · 有效 ${Math.round(candidateWeightByName.get(name) ?? v)}`
        },
        onCommit: () => {
          if (state.rolling) return
          render(root, state)
        }
      })
    }
  }

  renderList()

  const flashPicked = () => {
    const el = root.querySelector<HTMLDivElement>('#pickedName')
    if (!el) return
    el.classList.remove('pickedNameFlash')
    void el.offsetWidth
    el.classList.add('pickedNameFlash')
  }

  const doPick = (): { name: string; weight: number; totalWeight: number; chance: number } | null => {
    const pick = pickWeighted(buildCandidates(state))
    if (!pick) return null
    return pick
  }

  clearHistoryBtn.addEventListener('click', () => {
    state.history = []
    render(root, state)
  })

  let timer: number | null = null
  let countdownTimer: number | null = null
  let lastRollingPick: { name: string; weight: number; totalWeight: number; chance: number } | null = null

  const stopRolling = () => {
    if (timer !== null) {
      window.clearInterval(timer)
      timer = null
    }

    if (countdownTimer !== null) {
      window.clearInterval(countdownTimer)
      countdownTimer = null
    }

    state.rolling = false
    state.canStop = false
    state.rollingName = null
    root.classList.remove('isRolling')

    if (!lastRollingPick) {
      state.error = '当前没有可抽取的人（检查是否全部被排除/权重为 0）'
      return
    }

    const pick = lastRollingPick
    lastRollingPick = null

    state.error = null

    startBtn.disabled = true
    stopBtn.disabled = true
    clearHistoryBtn.disabled = true

    pickedLabelEl.textContent = '倒计时'
    pickedMetaEl.innerHTML = ''

    let remaining = 3
    pickedNameEl.textContent = String(remaining)
    pickedNameEl.classList.remove('pickedNameFlash')

    countdownTimer = window.setInterval(() => {
      remaining -= 1
      if (remaining <= 0) {
        if (countdownTimer !== null) {
          window.clearInterval(countdownTimer)
          countdownTimer = null
        }
        state.history.unshift(pick.name)
        state.currentPick = pick
        render(root, state)
        flashPicked()
        return
      }
      pickedNameEl.textContent = String(remaining)
    }, 1000)
  }

  startBtn.addEventListener('click', () => {
    if (state.rolling) return
    state.rolling = true
    state.canStop = true
    state.rollingName = null
    state.currentPick = null
    state.error = null
    root.classList.add('isRolling')

    pickedNameEl.textContent = '滚动中…'
    pickedMetaEl.innerHTML = ''
    pickedNameEl.classList.remove('pickedNameFlash')

    startBtn.disabled = true
    stopBtn.disabled = false
    clearHistoryBtn.disabled = true

    lastRollingPick = null
    timer = window.setInterval(() => {
      const p = doPick()
      if (p) {
        lastRollingPick = p
        state.rollingName = p.name
        pickedNameEl.textContent = p.name
      }
    }, 55)
  })

  stopBtn.addEventListener('click', () => {
    if (!state.canStop) return
    stopRolling()
  })
}

const mount = async () => {
  const root = document.querySelector<HTMLDivElement>('#app')
  if (!root) return

  const saved = loadWeights()

  const state: AppState = {
    names: [],
    baseWeights: { ...saved },
    biasTarget: null,
    biasStrength: 6,
    excludePicked: true,
    spinMs: 1400,
    history: [],
    rolling: false,
    canStop: false,
    rollingName: null,
    currentPick: null,
    error: null
  }

  render(root, state)

  try {
    const names = uniqueNames(await fetchNames('/names.json'))
    state.names = names
    for (const n of names) {
      if (typeof state.baseWeights[n] !== 'number') state.baseWeights[n] = 1
      state.baseWeights[n] = clamp(state.baseWeights[n], 1, 10)
    }
    saveWeights(state.baseWeights)
    render(root, state)
  } catch (e) {
    const message = e instanceof Error ? e.message : '加载 names.json 失败'
    state.error = `名单加载失败：${message}`
    state.names = ['张三', '李四', '王五', '赵六']
    for (const n of state.names) state.baseWeights[n] = 1
    render(root, state)
  }
}

void mount()
