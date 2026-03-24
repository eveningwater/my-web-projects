const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export const setupRangeSlider = (
  host: HTMLElement,
  options: {
    min: number
    max: number
    step: number
    value: number
    disabled?: boolean
    onInput: (value: number) => void
    onCommit: (value: number) => void
  }
) => {
  host.classList.add('rsRoot')
  host.innerHTML = `
    <div class="rsTrack" aria-hidden="true"><div class="rsFill"></div></div>
    <div class="rsThumb" tabindex="0" role="slider" aria-valuemin="${options.min}" aria-valuemax="${options.max}"></div>
  `

  const track = host.querySelector<HTMLDivElement>('.rsTrack')
  const thumb = host.querySelector<HTMLDivElement>('.rsThumb')
  if (!track || !thumb) return

  const disabled = Boolean(options.disabled)
  host.classList.toggle('rsDisabled', disabled)
  thumb.setAttribute('aria-disabled', disabled ? 'true' : 'false')
  thumb.tabIndex = disabled ? -1 : 0

  let value = options.value

  const snap = (v: number) => {
    const raw = clamp(v, options.min, options.max)
    const stepped = options.min + Math.round((raw - options.min) / options.step) * options.step
    return clamp(stepped, options.min, options.max)
  }

  const apply = () => {
    const pct = options.max === options.min ? 0 : (value - options.min) / (options.max - options.min)
    const pctStr = `${clamp(pct, 0, 1) * 100}%`
    host.style.setProperty('--rs-pct', pctStr)
    thumb.setAttribute('aria-valuenow', String(value))
  }

  const setFromClientX = (clientX: number, commit: boolean) => {
    const rect = track.getBoundingClientRect()
    const pct = rect.width <= 0 ? 0 : clamp((clientX - rect.left) / rect.width, 0, 1)
    const next = snap(options.min + pct * (options.max - options.min))
    if (next === value) {
      if (commit) options.onCommit(value)
      return
    }
    value = next
    apply()
    options.onInput(value)
    if (commit) options.onCommit(value)
  }

  apply()

  host.addEventListener('pointerdown', (e) => {
    if (disabled) return
    const t = e.target
    if (!(t instanceof Element)) return
    e.preventDefault()
    host.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX, false)

    const onMove = (ev: PointerEvent) => {
      setFromClientX(ev.clientX, false)
    }

    const onUp = (ev: PointerEvent) => {
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('pointerup', onUp)
      host.removeEventListener('pointercancel', onUp)
      setFromClientX(ev.clientX, true)
    }

    host.addEventListener('pointermove', onMove)
    host.addEventListener('pointerup', onUp)
    host.addEventListener('pointercancel', onUp)
  })

  thumb.addEventListener('keydown', (e) => {
    if (disabled) return
    const key = e.key
    const delta =
      key === 'ArrowLeft' || key === 'ArrowDown'
        ? -options.step
        : key === 'ArrowRight' || key === 'ArrowUp'
          ? options.step
          : 0

    if (key === 'Home') {
      e.preventDefault()
      value = options.min
      apply()
      options.onInput(value)
      options.onCommit(value)
      return
    }

    if (key === 'End') {
      e.preventDefault()
      value = options.max
      apply()
      options.onInput(value)
      options.onCommit(value)
      return
    }

    if (delta === 0) return
    e.preventDefault()
    value = snap(value + delta)
    apply()
    options.onInput(value)
    options.onCommit(value)
  })
}
