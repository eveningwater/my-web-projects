var three = three || {
    screen: {
        elem: null,
        callback: null,
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        init: function(id, callback, initRes) {
            this.elem = document.getElementById(id);
            this.callback = callback || null;
            window.addEventListener('resize', function() { this.resize(); }.bind(this), false);
            this.elem.onselectstart = function() { return false; }
            this.elem.ondrag = function() { return false; }
            initRes && this.resize();
            return this;
        },
        resize: function() {
            let o = this.elem;
            this.width = o.offsetWidth;
            this.height = o.offsetHeight;
            for (this.left = 0, this.top = 0; o != null; o = o.offsetParent) {
                this.left += o.offsetLeft;
                this.top += o.offsetTop;
            }
            this.callback && this.callback();
        },
        pointer: {
            screen: null,
            elem: null,
            callback: null,
            pos: { x: 0, y: 0 },
            mov: { x: 0, y: 0 },
            drag: { x: 0, y: 0 },
            start: { x: 0, y: 0 },
            end: { x: 0, y: 0 },
            active: false,
            touch: false,
            down: function(e, touch) {
                this.touch = touch;
                if (touch) e.preventDefault();
                let pointer = touch ? e.touches[0] : e;
                this.pos.x = this.start.x = pointer.clientX - this.screen.left;
                this.pos.y = this.start.y = pointer.clientY - this.screen.top;
                this.active = true;
                this.callback.down && this.callback.down();
            },
            up: function(e, touch) {
                this.touch = touch;
                e.preventDefault();
                this.end.x = this.drag.x;
                this.end.y = this.drag.y;
                this.active = false;
                this.callback.up && this.callback.up();
            },
            move: function(e, touch) {
                this.touch = touch;
                e.preventDefault();
                let pointer = touch ? e.touches[0] : e;
                this.mov.x = pointer.clientX - this.screen.left;
                this.mov.y = pointer.clientY - this.screen.top;
                if (this.active) {
                    this.pos.x = this.mov.x;
                    this.pos.y = this.mov.y;
                    this.drag.x = this.end.x + (this.pos.x - this.start.x)/2;
                    this.drag.y = this.end.y + (this.pos.y - this.start.y)/2;
                    this.callback.move && this.callback.move();
                }
            },
            init: function(callback) {
                this.screen = three.screen;
                this.elem = this.screen.elem;
                this.callback = callback || {};
                if ('ontouchstart' in window) {
                    // touch
                    this.elem.ontouchstart = function(e) { this.down(e, true); }.bind(this);
                    this.elem.ontouchmove = function(e) { this.move(e, true); }.bind(this);
                    this.elem.ontouchend = function(e) { this.up(e, true); }.bind(this);
                    this.elem.ontouchcancel = function(e) { this.up(e, true); }.bind(this);
                }
                // mouse
                this.elem.addEventListener("mousedown", function(e) { this.down(e, false); }.bind(this), true);
                document.addEventListener("mousemove", function(e) { this.move(e, false); }.bind(this), true);
                document.addEventListener("mouseup", function(e) { this.up(e, false); }.bind(this), true);
                return this;
            }
        }
    }
}
