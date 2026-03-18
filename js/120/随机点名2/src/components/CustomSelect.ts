export type SelectOption = {
  value: string
  label: string
}

let closeActiveSelect: (() => void) | null = null

export const setupCustomSelect = (
  host: HTMLElement,
  options: {
    value: string
    options: SelectOption[]
    placeholder?: string
    disabled?: boolean
    onChange: (value: string) => void
  }
) => {
  const placeholder = options.placeholder ?? ''
  host.classList.add('csRoot')
  host.innerHTML = `
    <button class="csButton" type="button" aria-haspopup="listbox" aria-expanded="false">
      <span class="csButtonText"></span>
      <span class="csChevron" aria-hidden="true"></span>
    </button>
    <div class="csMenu" role="listbox" hidden></div>
  `

  const button = host.querySelector<HTMLButtonElement>('.csButton')
  const buttonText = host.querySelector<HTMLSpanElement>('.csButtonText')
  const menu = host.querySelector<HTMLDivElement>('.csMenu')
  if (!button || !buttonText || !menu) return

  const disabled = Boolean(options.disabled)
  button.disabled = disabled
  host.classList.toggle('csDisabled', disabled)

  const selected = options.options.find((o) => o.value === options.value)
  buttonText.textContent = selected?.label ?? placeholder
  if (!selected && placeholder) buttonText.classList.add('csPlaceholder')

  menu.innerHTML = options.options
    .map((o) => {
      const selectedClass = o.value === options.value ? 'csOptionSelected' : ''
      return `<button class="csOption ${selectedClass}" type="button" role="option" data-value="${o.value}">${o.label}</button>`
    })
    .join('')

  const setOpen = (open: boolean) => {
    button.setAttribute('aria-expanded', open ? 'true' : 'false')
    menu.hidden = !open
    host.classList.toggle('csOpen', open)
  }

  const close = () => {
    setOpen(false)
    if (closeActiveSelect) {
      closeActiveSelect = null
    }
  }

  const open = () => {
    if (closeActiveSelect) closeActiveSelect()
    setOpen(true)

    const onDocPointerDown = (e: PointerEvent) => {
      const t = e.target
      if (t instanceof Node && host.contains(t)) return
      window.removeEventListener('pointerdown', onDocPointerDown, { capture: true } as AddEventListenerOptions)
      close()
    }

    window.addEventListener('pointerdown', onDocPointerDown, { capture: true })
    closeActiveSelect = () => {
      window.removeEventListener('pointerdown', onDocPointerDown, { capture: true } as AddEventListenerOptions)
      close()
    }
  }

  button.addEventListener('click', () => {
    if (disabled) return
    const expanded = button.getAttribute('aria-expanded') === 'true'
    if (expanded) {
      if (closeActiveSelect) closeActiveSelect()
      close()
      return
    }
    open()
  })

  menu.addEventListener('click', (e) => {
    const target = e.target
    if (!(target instanceof HTMLElement)) return
    const optionBtn = target.closest<HTMLElement>('[data-value]')
    if (!optionBtn) return
    const next = optionBtn.dataset.value ?? ''
    if (closeActiveSelect) closeActiveSelect()
    close()
    options.onChange(next)
  })

  host.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (closeActiveSelect) closeActiveSelect()
      close()
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (disabled) return
      const expanded = button.getAttribute('aria-expanded') === 'true'
      if (expanded) {
        if (closeActiveSelect) closeActiveSelect()
        close()
      } else {
        open()
      }
    }
  })
}
