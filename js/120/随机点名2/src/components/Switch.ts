export const setupSwitch = (
  button: HTMLButtonElement,
  options: {
    checked: boolean
    disabled?: boolean
    onChange: (checked: boolean) => void
  }
) => {
  button.classList.add('cb')
  button.setAttribute('role', 'switch')
  button.setAttribute('aria-checked', options.checked ? 'true' : 'false')
  button.setAttribute('aria-disabled', options.disabled ? 'true' : 'false')
  button.disabled = Boolean(options.disabled)
  button.innerHTML = `<span class="cbThumb" aria-hidden="true"></span>`
  button.classList.toggle('cbOn', options.checked)

  button.addEventListener('click', () => {
    if (options.disabled) return
    options.onChange(!options.checked)
  })
}
