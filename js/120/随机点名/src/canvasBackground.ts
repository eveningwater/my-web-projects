/**
 * Canvas 背景动画效果 - 优化版本
 */

interface Star {
  angle: number
  radius: number
  angularSpeed: number
  radialSpeed: number
  size: number
  alpha: number
  twinkleSpeed: number
  twinklePhase: number
  colorIndex: number
  offset: number
  layer: number
}

interface GlowOrb {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  colorIndex: number
  pulseSpeed: number
  pulsePhase: number
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  width: number
  life: number
  maxLife: number
  delay: number
}

export class CanvasBackground {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private stars: Star[] = []
  private orbs: GlowOrb[] = []
  private streaks: ShootingStar[] = []
  private animationId: number | null = null
  private width: number = 0
  private height: number = 0
  private dpr: number = 1
  private time: number = 0
  private lastTime: number = 0
  private frameDelta: number = 16
  private backgroundGradient: CanvasGradient | null = null
  private readonly palette = ['#6366f1', '#818cf8', '#ec4899', '#f472b6', '#a78bfa', '#c084fc', '#60a5fa']

  constructor() {
    this.canvas = document.createElement('canvas')
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    `
    document.body.insertBefore(this.canvas, document.body.firstChild)

    const ctx = this.canvas.getContext('2d')
    if (!ctx) throw new Error('Cannot get canvas 2D context')
    this.ctx = ctx

    this.resize()
    this.init()
    this.animate()

    window.addEventListener('resize', () => this.resize())
  }

  private resize(): void {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.dpr = Math.max(1, window.devicePixelRatio || 1)

    this.canvas.width = Math.floor(this.width * this.dpr)
    this.canvas.height = Math.floor(this.height * this.dpr)
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.backgroundGradient = this.createBackgroundGradient()
    this.init()
  }

  private init(): void {
    this.stars = []
    this.orbs = []
    this.streaks = []

    const area = this.width * this.height
    const starCount = Math.max(120, Math.floor(area / 8000))
    const maxRadius = Math.hypot(this.width, this.height) * 0.52

    for (let i = 0; i < starCount; i++) {
      const layerRoll = Math.random()
      const layer = layerRoll < 0.6 ? 1 : layerRoll < 0.88 ? 2 : 3
      const radius = Math.pow(Math.random(), 0.75) * maxRadius
      const angularSpeed = (Math.random() * 0.0007 + 0.00015) * (layer === 1 ? 1 : 0.65) * (Math.random() > 0.5 ? 1 : -1)
      const radialSpeed = (Math.random() - 0.5) * 0.02
      const size = Math.random() * (layer === 3 ? 1.6 : 1.1) + (layer === 1 ? 0.4 : 0.7)

      this.stars.push({
        angle: Math.random() * Math.PI * 2,
        radius,
        angularSpeed,
        radialSpeed,
        size,
        alpha: Math.random() * 0.5 + 0.15,
        twinkleSpeed: Math.random() * 0.002 + 0.001,
        twinklePhase: Math.random() * Math.PI * 2,
        colorIndex: Math.floor(Math.random() * this.palette.length),
        offset: Math.random() * Math.PI * 2,
        layer,
      })
    }

    const orbCount = Math.min(12, Math.max(6, Math.floor(Math.sqrt(starCount))))
    for (let i = 0; i < orbCount; i++) {
      this.orbs.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        radius: Math.random() * 220 + 140,
        alpha: Math.random() * 0.1 + 0.05,
        colorIndex: Math.floor(Math.random() * this.palette.length),
        pulseSpeed: Math.random() * 0.0014 + 0.0006,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    for (let i = 0; i < 3; i++) {
      this.streaks.push(this.createShootingStar())
    }
  }

  private createBackgroundGradient(): CanvasGradient {
    const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height)
    gradient.addColorStop(0, 'rgba(248, 249, 255, 1)')
    gradient.addColorStop(0.45, 'rgba(241, 235, 255, 1)')
    gradient.addColorStop(1, 'rgba(236, 248, 255, 1)')
    return gradient
  }

  private createShootingStar(): ShootingStar {
    const fromLeft = Math.random() > 0.5
    const startX = fromLeft ? -this.width * 0.1 : this.width * 1.1
    const startY = Math.random() * this.height * 0.5
    const direction = fromLeft ? 1 : -1
    const speed = Math.random() * 0.55 + 0.65
    return {
      x: startX,
      y: startY,
      vx: speed * direction,
      vy: speed * 0.6,
      width: Math.random() * 1.4 + 1.8,
      life: 0,
      maxLife: Math.random() * 900 + 1100,
      delay: Math.random() * 2200 + 900,
    }
  }

  private animate = (timestamp: number = 0): void => {
    const delta = timestamp - this.lastTime
    this.lastTime = timestamp
    const dt = Math.min(40, Math.max(12, delta || 16))
    this.frameDelta = dt
    this.time += dt

    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.fillStyle = this.backgroundGradient || '#f8f9ff'
    this.ctx.fillRect(0, 0, this.width, this.height)

    this.drawOrbs(dt)
    this.drawStars()
    this.drawShootingStars(dt)

    this.animationId = requestAnimationFrame(this.animate)
  }

  private drawOrbs(dt: number): void {
    this.ctx.globalCompositeOperation = 'screen'
    for (const orb of this.orbs) {
      orb.x += orb.vx * dt
      orb.y += orb.vy * dt

      if (orb.x < -orb.radius) orb.x = this.width + orb.radius
      if (orb.x > this.width + orb.radius) orb.x = -orb.radius
      if (orb.y < -orb.radius) orb.y = this.height + orb.radius
      if (orb.y > this.height + orb.radius) orb.y = -orb.radius

      const pulse = 0.7 + 0.3 * Math.sin(this.time * orb.pulseSpeed + orb.pulsePhase)
      const radius = orb.radius * pulse
      const color = this.palette[orb.colorIndex]
      const gradient = this.ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, radius)
      gradient.addColorStop(0, this.hexToRgba(color, orb.alpha * 0.5))
      gradient.addColorStop(0.6, this.hexToRgba(color, orb.alpha * 0.2))
      gradient.addColorStop(1, this.hexToRgba(color, 0))
      this.ctx.fillStyle = gradient
      this.ctx.beginPath()
      this.ctx.arc(orb.x, orb.y, radius, 0, Math.PI * 2)
      this.ctx.fill()
    }
    this.ctx.globalCompositeOperation = 'source-over'
  }

  private drawStars(): void {
    const centerX = this.width * 0.5
    const centerY = this.height * 0.5
    const maxRadius = Math.hypot(this.width, this.height) * 0.52

    this.ctx.globalCompositeOperation = 'lighter'
    for (const star of this.stars) {
      star.angle += star.angularSpeed * this.frameDelta
      star.radius += star.radialSpeed * this.frameDelta

      if (star.radius > maxRadius || star.radius < 40) {
        star.radialSpeed *= -1
      }

      const wobble = Math.sin(this.time * 0.0005 + star.offset) * (6 + star.layer * 2)
      const x = centerX + Math.cos(star.angle) * (star.radius + wobble) + Math.sin(this.time * 0.0002 + star.offset) * (8 - star.layer)
      const y = centerY + Math.sin(star.angle) * (star.radius + wobble * 0.7) + Math.cos(this.time * 0.00025 + star.offset) * (6 - star.layer)

      const twinkle = 0.65 + 0.35 * Math.sin(this.time * star.twinkleSpeed + star.twinklePhase)
      const alpha = star.alpha * twinkle
      const size = star.size * (1 + (1 - star.layer) * 0.15)
      const color = this.palette[star.colorIndex]

      this.ctx.fillStyle = this.hexToRgba(color, alpha)
      this.ctx.beginPath()
      this.ctx.arc(x, y, size, 0, Math.PI * 2)
      this.ctx.fill()
    }
    this.ctx.globalCompositeOperation = 'source-over'
  }

  private drawShootingStars(dt: number): void {
    this.ctx.globalCompositeOperation = 'lighter'
    for (const streak of this.streaks) {
      if (streak.delay > 0) {
        streak.delay -= dt
        continue
      }

      streak.life += dt
      streak.x += streak.vx * dt
      streak.y += streak.vy * dt

      const progress = Math.min(1, streak.life / streak.maxLife)
      const alpha = (1 - progress) * 0.95
      const tailLength = 200 * (1 - progress) + 80
      const tailX = streak.x - streak.vx * tailLength
      const tailY = streak.y - streak.vy * tailLength

      const glow = this.ctx.createRadialGradient(streak.x, streak.y, 0, streak.x, streak.y, 24)
      glow.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
      this.ctx.fillStyle = glow
      this.ctx.beginPath()
      this.ctx.arc(streak.x, streak.y, 20, 0, Math.PI * 2)
      this.ctx.fill()

      this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
      this.ctx.lineWidth = streak.width
      this.ctx.beginPath()
      this.ctx.moveTo(streak.x, streak.y)
      this.ctx.lineTo(tailX, tailY)
      this.ctx.stroke()

      if (streak.life >= streak.maxLife || streak.x < -200 || streak.x > this.width + 200 || streak.y > this.height + 200) {
        Object.assign(streak, this.createShootingStar())
      }
    }
    this.ctx.globalCompositeOperation = 'source-over'
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  public destroy(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
    }
    this.canvas.remove()
  }
}
