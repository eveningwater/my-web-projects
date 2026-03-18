import './style.css'
import axios from 'axios'
import { createRangeSlider, RangeSlider } from './rangeSlider'
import { CanvasBackground } from './canvasBackground'

interface Person {
  name: string
  probability: number
  timesSelected: number
}

interface NamesData {
  names: string[]
}

class RandomNameSelector {
  private names: Person[] = []
  private isLoading = false
  private totalSelections = 0
  private sliders: Map<number, RangeSlider> = new Map()
  private _canvasBackground: CanvasBackground | null = null
  private isCountingDown = false
  private animationFrameId: number | null = null

  async init() {
    try {
      this._canvasBackground = new CanvasBackground()
      this.setupDOM()
      await this.loadNames()
      this.attachEventListeners()
    } catch (error) {
      this.showError('初始化失败，请刷新页面重试')
      console.error(error)
    }
  }

  private setupDOM() {
    const app = document.querySelector('#app') as HTMLElement
    if (!app) throw new Error('未找到 #app 元素')

    app.innerHTML = `
      <div class="container">
        <div class="header">
          <h1 class="title">✨ 随机点名</h1>
          <p class="subtitle">轻松随机选择一个人</p>
        </div>

        <div class="card result-card">
          <div class="result-display">
            <div id="result" class="name-result">准备好了</div>
          </div>

          <div class="button-group">
            <button class="btn btn-primary" id="selectBtn">开始点名</button>
            <button class="btn btn-secondary" id="stopBtn" disabled>停止</button>
          </div>

          <div class="stats">
            <div class="stat-item">
              <div class="stat-label">总点名次数</div>
              <div class="stat-value" id="totalCount">0</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">被选中最多的人</div>
              <div class="stat-value" id="mostSelected">-</div>
            </div>
          </div>
        </div>

        <div class="settings-section">
          <div class="settings-title">📊 概率设置</div>
          <div id="settingsList" class="settings-list"></div>
          <button class="reset-btn" id="resetBtn">重置所有统计</button>
        </div>

        <div id="errorMsg"></div>
      </div>
    `
  }

  private async loadNames() {
    const baseUrl = import.meta.env.PROD
      ? 'https://eveningwater.com/random-name-project/random-name-project-1'
      : ''
    const response = await axios.get<NamesData>(`${baseUrl}/names.json`)
    this.names = response.data.names.map((name: string) => ({
      name,
      probability: 1,
      timesSelected: 0,
    }))
  }

  private renderSettings() {
    const settingsList = document.querySelector('#settingsList')
    if (!settingsList) return

    // 清空之前的 sliders
    this.sliders.forEach((slider) => slider.destroy())
    this.sliders.clear()

    settingsList.innerHTML = this.names
      .map(
        (person, index) => `
        <div class="person-item">
          <span class="person-name">${this.escapeHtml(person.name)}</span>
          <div class="probability-control">
            <div id="slider-container-${index}"></div>
            <span class="probability-value" data-prob-index="${index}">${person.probability.toFixed(1)}x</span>
          </div>
        </div>
      `,
      )
      .join('')

    // 为每个人创建自定义 Range Slider
    this.names.forEach((person, index) => {
      const container = document.querySelector(`#slider-container-${index}`)
      if (!container) return

      const probDisplay = document.querySelector(
        `[data-prob-index="${index}"]`,
      ) as HTMLElement

      const slider = createRangeSlider({
        min: 0.1,
        max: 3,
        step: 0.1,
        value: person.probability,
        dataIndex: index,
        onChange: (value) => {
          this.names[index].probability = value

          // 更新显示
          if (probDisplay) {
            probDisplay.textContent = `${value.toFixed(1)}x`
          }
        },
      })

      container.appendChild(slider.getElement())
      this.sliders.set(index, slider)
    })
  }

  private updateStats() {
    const totalCountEl = document.querySelector('#totalCount')
    if (totalCountEl) {
      totalCountEl.textContent = this.totalSelections.toString()
    }

    const mostSelectedEl = document.querySelector('#mostSelected')
    if (mostSelectedEl && this.names.length > 0) {
      const maxSelected = Math.max(...this.names.map((p) => p.timesSelected))
      if (maxSelected > 0) {
        const person = this.names.find((p) => p.timesSelected === maxSelected)
        mostSelectedEl.textContent = person ? this.escapeHtml(person.name) : '-'
      }
    }
  }

  private async selectRandomName() {
    if (this.isLoading || this.isCountingDown) return

    this.isLoading = true
    const selectBtn = document.querySelector('#selectBtn') as HTMLButtonElement
    const stopBtn = document.querySelector('#stopBtn') as HTMLButtonElement
    const resultEl = document.querySelector('#result') as HTMLElement

    if (selectBtn) selectBtn.disabled = true
    if (stopBtn) stopBtn.disabled = false

    // 动画转轮效果
    const duration = 2000 // 2 秒动画
    const startTime = Date.now()
    let stopped = false

    const animate = () => {
      const elapsed = Date.now() - startTime
      if (elapsed < duration && !stopped) {
        const randomName = this.getWeightedRandomName()
        if (resultEl) {
          resultEl.textContent = randomName
        }
        this.animationFrameId = requestAnimationFrame(animate)
      } else if (stopped) {
        // 如果被停止，进行倒计时
        this.isLoading = false
        this.showCountdown(resultEl, selectBtn, stopBtn)
      } else {
        // 正常结束，显示最终结果
        const finalName = this.getWeightedRandomName()
        const selectedPerson = this.names.find((p) => p.name === finalName)

        if (selectedPerson) {
          selectedPerson.timesSelected++
          this.totalSelections++
          this.updateStats()
        }

        if (resultEl) {
          resultEl.textContent = finalName
        }

        this.isLoading = false
        if (selectBtn) selectBtn.disabled = false
        if (stopBtn) stopBtn.disabled = true
      }
    }

    // 保存停止函数的引用
    const stopHandler = () => {
      stopped = true
    }

    // 临时保存停止处理器
    ;(selectBtn as any)._stopHandler = stopHandler

    this.animationFrameId = requestAnimationFrame(animate)
  }

  private showCountdown(
    resultEl: HTMLElement | null,
    selectBtn: HTMLButtonElement,
    stopBtn: HTMLButtonElement,
  ): void {
    this.isCountingDown = true
    let countdown = 3

    if (resultEl) {
      resultEl.style.fontSize = '48px'
      resultEl.textContent = countdown.toString()
    }

    const countdownInterval = setInterval(() => {
      countdown--

      if (countdown > 0) {
        if (resultEl) {
          resultEl.textContent = countdown.toString()
        }
      } else {
        clearInterval(countdownInterval)

        // 显示最终结果
        const finalName = this.getWeightedRandomName()
        const selectedPerson = this.names.find((p) => p.name === finalName)

        if (selectedPerson) {
          selectedPerson.timesSelected++
          this.totalSelections++
          this.updateStats()
        }

        if (resultEl) {
          resultEl.style.fontSize = '48px'
          resultEl.textContent = finalName
        }

        selectBtn.disabled = false
        stopBtn.disabled = true
        this.isCountingDown = false
      }
    }, 1000)
  }

  private getWeightedRandomName(): string {
    const weights = this.names.map((p) => p.probability)
    const totalWeight = weights.reduce((a, b) => a + b, 0)

    let random = Math.random() * totalWeight
    for (let i = 0; i < this.names.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        return this.names[i].name
      }
    }

    return this.names[0].name
  }

  private resetStats() {
    this.names.forEach((person) => {
      person.timesSelected = 0
    })
    this.totalSelections = 0
    const resultEl = document.querySelector('#result')
    if (resultEl) {
      resultEl.textContent = '已重置'
    }
    this.updateStats()
  }

  private attachEventListeners() {
    const selectBtn = document.querySelector('#selectBtn')
    const stopBtn = document.querySelector('#stopBtn')
    const resetBtn = document.querySelector('#resetBtn')

    selectBtn?.addEventListener('click', () => this.selectRandomName())
    stopBtn?.addEventListener('click', () => {
      if (this.isLoading) {
        // 触发倒计时
        const stopHandler = (selectBtn as any)?._stopHandler
        if (stopHandler) {
          stopHandler()
        }
      } else if (this.isCountingDown) {
        // 如果正在倒计时，取消并恢复按钮状态
        this.isCountingDown = false
        const selectBtnEl = document.querySelector('#selectBtn') as HTMLButtonElement
        const stopBtnEl = document.querySelector('#stopBtn') as HTMLButtonElement
        if (selectBtnEl) selectBtnEl.disabled = false
        if (stopBtnEl) stopBtnEl.disabled = true
      }
    })
    resetBtn?.addEventListener('click', () => this.resetStats())
  }

  private showError(message: string) {
    const errorEl = document.querySelector('#errorMsg')
    if (errorEl) {
      errorEl.innerHTML = `<div class="error-message">${this.escapeHtml(message)}</div>`
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  render() {
    this.renderSettings()
    this.updateStats()
  }
}

// 初始化应用
const app = new RandomNameSelector()
app.init().then(() => app.render())
