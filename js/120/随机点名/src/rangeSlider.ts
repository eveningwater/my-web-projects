/**
 * 自定义 Range Slider 插件
 * 功能：替代原生 input[type=range]
 * 特点：可定制化、动画流畅、触摸友好
 */

export interface RangeSliderOptions {
  min: number
  max: number
  step: number
  value: number
  dataIndex?: string | number
  onChange?: (value: number) => void
}

export class RangeSlider {
  private container: HTMLElement
  private track: HTMLElement
  private thumb: HTMLElement
  private fill: HTMLElement
  private valueDisplay: HTMLElement | null = null
  private isDragging = false
  private options: RangeSliderOptions

  constructor(options: RangeSliderOptions) {
    this.options = {
      min: options.min,
      max: options.max,
      step: options.step,
      value: Math.max(options.min, Math.min(options.max, options.value)),
      dataIndex: options.dataIndex,
      onChange: options.onChange,
    }

    this.container = this.createContainer()
    this.track = this.createTrack()
    this.fill = this.createFill()
    this.thumb = this.createThumb()

    this.container.appendChild(this.track)
    this.track.appendChild(this.fill)
    this.track.appendChild(this.thumb)

    this.updateSliderPosition()
    this.attachEventListeners()
  }

  private createContainer(): HTMLElement {
    const container = document.createElement('div')
    container.className = 'custom-range-slider'
    return container
  }

  private createTrack(): HTMLElement {
    const track = document.createElement('div')
    track.className = 'range-track'
    return track
  }

  private createFill(): HTMLElement {
    const fill = document.createElement('div')
    fill.className = 'range-fill'
    return fill
  }

  private createThumb(): HTMLElement {
    const thumb = document.createElement('div')
    thumb.className = 'range-thumb'

    // 鼠标进入时改变样式
    thumb.addEventListener('mouseenter', () => {
      if (!this.isDragging) {
        thumb.style.width = '22px'
        thumb.style.height = '22px'
        thumb.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.5)'
        thumb.style.cursor = 'grab'
      }
    })

    thumb.addEventListener('mouseleave', () => {
      if (!this.isDragging) {
        thumb.style.width = '18px'
        thumb.style.height = '18px'
        thumb.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)'
      }
    })

    return thumb
  }

  private attachEventListeners(): void {
    // 鼠标按下
    this.thumb.addEventListener('mousedown', (e) => {
      this.startDrag(e)
    })

    // 点击轨道
    this.track.addEventListener('click', (e) => {
      this.handleTrackClick(e)
    })

    // 触摸支持
    this.thumb.addEventListener('touchstart', (e) => {
      this.startDrag(e as any)
    })

    // 鼠标移动
    document.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        this.updateFromEvent(e)
      }
    })

    // 触摸移动
    document.addEventListener('touchmove', (e) => {
      if (this.isDragging) {
        this.updateFromEvent(e as any)
      }
    })

    // 鼠标/触摸释放
    document.addEventListener('mouseup', () => {
      this.stopDrag()
    })

    document.addEventListener('touchend', () => {
      this.stopDrag()
    })
  }

  private startDrag(e: MouseEvent | TouchEvent): void {
    this.isDragging = true
    this.thumb.style.cursor = 'grabbing'
    this.thumb.style.width = '22px'
    this.thumb.style.height = '22px'
    this.thumb.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.6)'
    this.updateFromEvent(e)
  }

  private stopDrag(): void {
    this.isDragging = false
    this.thumb.style.cursor = 'grab'
    this.thumb.style.width = '18px'
    this.thumb.style.height = '18px'
    this.thumb.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)'
  }

  private handleTrackClick(e: MouseEvent): void {
    const rect = this.track.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const newValue = this.options.min + percent * (this.options.max - this.options.min)
    this.setValue(this.snapToStep(newValue))
  }

  private updateFromEvent(e: MouseEvent | TouchEvent): void {
    const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX
    const rect = this.track.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newValue = this.options.min + percent * (this.options.max - this.options.min)
    this.setValue(this.snapToStep(newValue))
  }

  private snapToStep(value: number): number {
    const steps = Math.round((value - this.options.min) / this.options.step)
    return this.options.min + steps * this.options.step
  }

  private updateSliderPosition(): void {
    const percent =
      ((this.options.value - this.options.min) / (this.options.max - this.options.min)) * 100
    this.thumb.style.left = percent + '%'
    this.fill.style.width = percent + '%'
  }

  public setValue(value: number): void {
    this.options.value = Math.max(this.options.min, Math.min(this.options.max, value))
    this.updateSliderPosition()

    if (this.options.onChange) {
      this.options.onChange(this.options.value)
    }
  }

  public getValue(): number {
    return this.options.value
  }

  public getElement(): HTMLElement {
    return this.container
  }

  public setValueDisplay(element: HTMLElement): void {
    this.valueDisplay = element
  }

  public updateValueDisplay(text: string): void {
    if (this.valueDisplay) {
      this.valueDisplay.textContent = text
    }
  }

  public destroy(): void {
    this.container.remove()
  }
}

/**
 * 创建 Range Slider
 */
export function createRangeSlider(options: RangeSliderOptions): RangeSlider {
  return new RangeSlider(options)
}
