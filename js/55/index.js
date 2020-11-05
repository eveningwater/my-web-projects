class Crood {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    setCrood(x, y) {
        this.x = x
        this.y = y
    }
    copyCrood() {
        return new Crood(this.x, this.y)
    }
}

class ShootingStar {
    constructor(
        start = new Crood(),
        end = new Crood(),
        size = 3,
        speed = 200,
        onDestroy = null
    ) {
        this.start = start
        this.end = end
        this.size = size
        this.speed = speed
        // 飞行总时间
        this.flyTime =
            (Math.sqrt(
                Math.pow(this.end.x - this.start.x, 2) +
                Math.pow(this.end.y - this.start.y, 2)
            ) *
                1000) /
            this.speed
        this.passTime = 0
        this.prev = this.start.copyCrood()
        this.now = this.start.copyCrood()
        this.onDestroy = onDestroy
    }
    draw(ctx, delta) {
        this.passTime += delta
        this.passTime = Math.min(this.passTime, this.flyTime)

        let percent = this.passTime / this.flyTime

        this.now.setCrood(
            this.start.x + (this.end.x - this.start.x) * percent,
            this.start.y + (this.end.y - this.start.y) * percent
        )

        // canvas API
        ctx.strokeStyle = 'rgba(255,255,255,.8)'
        ctx.lineCap = 'round'
        ctx.lineWidth = this.size
        ctx.beginPath()
        ctx.moveTo(this.now.x, this.now.y)
        ctx.lineTo(this.prev.x, this.prev.y)
        ctx.stroke()

        this.prev.setCrood(this.now.x, this.now.y)
        if (this.passTime === this.flyTime) {
            this.destroy()
        }
    }
    destroy() {
        this.onDestroy && this.onDestroy()
    }
}

class ShootingStars {
    constructor(cvs, ctx) {
        this.cvs = cvs
        this.ctx = ctx
        this.shootingStars = []
        this.T = null
        this.stop = false
        this.playing = false
    }
    createStar() {
        let angle = Math.PI / 3
        let distance = Math.random() * 400
        let start = new Crood(
            (Math.random() * this.cvs.width) | 0,
            (Math.random() * this.cvs.height) | 0
        )
        let end = new Crood(
            start.x + distance * Math.cos(angle),
            start.y + distance * Math.sin(angle)
        )
        let size = Math.random() * 3
        let speed = Math.random() * 400 + 100
        let star = new ShootingStar(start, end, size, speed, () => {
            this.remove(star)
        })
        return star
    }
    remove(star) {
        this.shootingStars = this.shootingStars.filter((_) => _ !== star)
    }
    update(delta) {
        if (!this.stop && this.shootingStars.length < 25) {
            this.shootingStars.push(this.createStar())
        }
        this.shootingStars.forEach((star) => {
            star.draw(this.ctx, delta)
        })
    }
    tick() {
        if (this.playing) return
        this.playing = true

        let now = new Date().getTime()
        let last = now
        let delta

        let _tick = () => {
            if (this.stop && !this.shootingStars.length) {
                cancelAnimationFrame(this.T)
                this.playing = false
                return
            }
            delta = now - last
            delta = delta > 500 ? 30 : delta < 16 ? 16 : delta
            last = now

            this.T = requestAnimationFrame(_tick)
            this.ctx.save()
            this.ctx.fillStyle = 'rgba(0,0,0,0.8)'
            this.ctx.globalCompositeOperation = 'destination-in'
            this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height)
            this.ctx.restore()
            this.update(delta)
        }
        _tick()
    }
    start() {
        this.stop = false
        this.tick()
    }
    stop() {
        this.stop = true
    }
}
let cvs = document.getElementById('canvas')
let ctx = cvs.getContext('2d')

let stars = new ShootingStars(cvs, ctx)
stars.start()