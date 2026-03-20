class BorderComponent {
    constructor(options = {}) {
        this.options = {
            container: document.body,
            speed: 1,
            color: '#333333',
            lineWidth: 3,
            ...options
        };
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.startTime = null;
        this.animDuration = 2600 / this.options.speed;
        this.width = 0;
        this.height = 0;
        this._isRunning = false;
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '10';
        this.canvas.style.pointerEvents = 'none';
        this.options.container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.startAnimation();

        window.addEventListener('resize', this.handleResize);

        return this;
    }

    handleResize = () => {
        this.resize();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    drawBorderFrame(progress) {
        const w = this.width;
        const h = this.height;
        if (w === 0 || h === 0) return;

        const ctx = this.ctx;
        ctx.clearRect(0, 0, w, h);

        const r = 20;
        const len = 2 * Math.PI * r + 2 * (w - 2 * r) + 2 * (h - 2 * r);
        const drawLen = progress * len;

        ctx.beginPath();
        ctx.moveTo(r, 0);
        ctx.lineTo(w - r, 0);
        ctx.quadraticCurveTo(w, 0, w, r);
        ctx.lineTo(w, h - r);
        ctx.quadraticCurveTo(w, h, w - r, h);
        ctx.lineTo(r, h);
        ctx.quadraticCurveTo(0, h, 0, h - r);
        ctx.lineTo(0, r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.closePath();

        ctx.strokeStyle = this.options.color;
        ctx.lineWidth = this.options.lineWidth;
        ctx.setLineDash([drawLen, len]);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    borderAnimation(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const elapsed = timestamp - this.startTime;
        let progress = Math.min(elapsed / this.animDuration, 1);
        this.drawBorderFrame(progress);

        if (progress < 1) {
            this.animationId = requestAnimationFrame((ts) => this.borderAnimation(ts));
        } else {
            this._isRunning = false;
            if (this.options.onComplete) {
                this.options.onComplete();
            }
        }
    }

    startAnimation() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.startTime = null;
        this.animDuration = 2600 / this.options.speed;
        this._isRunning = true;
        this.animationId = requestAnimationFrame((ts) => this.borderAnimation(ts));
    }

    update(options) {
        this.options = {...this.options, ...options };
        this.animDuration = 2600 / this.options.speed;
        this.startAnimation();
        return this;
    }

    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this._isRunning = false;
        return this;
    }

    resume() {
        if (!this._isRunning) {
            this.startAnimation();
        }
        return this;
    }

    destroy() {
        this.pause();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        window.removeEventListener('resize', this.handleResize);
    }
}

export default BorderComponent;
export { BorderComponent };