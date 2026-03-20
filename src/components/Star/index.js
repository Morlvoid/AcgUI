class StarComponent {
    constructor(options = {}) {
        this.options = {
            container: document.body,
            color: '#ffd700',
            position: { x: 50, y: 50 },
            size: 60,
            ...options
        };
        this.container = null;
        this.star = null;
        this._isRunning = false;
    }

    init() {
        this.addAnimationStyles();

        this.container = document.createElement('div');
        this.container.style.position = 'absolute';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.zIndex = '15';
        this.container.style.pointerEvents = 'none';
        this.options.container.appendChild(this.container);

        this.createStar();
        this._isRunning = true;

        return this;
    }

    createStar() {
        if (this.star) {
            this.star.remove();
        }

        this.star = document.createElement('div');
        this.star.style.position = 'absolute';
        this.star.style.left = this.options.position.x + '%';
        this.star.style.top = this.options.position.y + '%';
        this.star.style.transform = 'translate(-50%, -50%)';
        this.star.style.fontSize = this.options.size + 'px';
        this.star.style.color = this.options.color;
        this.star.style.pointerEvents = 'none';
        this.star.textContent = '★';
        this.star.style.animation = 'starBreathe 3s ease-in-out infinite';
        this.star.style.willChange = 'transform, opacity';

        this.container.appendChild(this.star);
    }

    addAnimationStyles() {
        if (!document.getElementById('star-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'star-animation-styles';
            style.textContent = `
        @keyframes starBreathe {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 1;
          }
        }
      `;
            document.head.appendChild(style);
        }
    }

    update(options) {
        this.options = {...this.options, ...options };
        this.createStar();
        return this;
    }

    pause() {
        if (this.star) {
            this.star.style.animationPlayState = 'paused';
        }
        this._isRunning = false;
        return this;
    }

    resume() {
        if (this.star) {
            this.star.style.animationPlayState = 'running';
        }
        this._isRunning = true;
        return this;
    }

    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.container = null;
        this.star = null;
        this._isRunning = false;
    }
}

export default StarComponent;
export { StarComponent };