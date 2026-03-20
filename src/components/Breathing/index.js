class BreathingComponent {
    constructor(options = {}) {
        this.options = {
            element: null,
            speed: 1,
            direction: 'vertical',
            scale: 0.2,
            ...options
        };
        this.originalTransform = '';
        this._isRunning = false;
    }

    init() {
        if (!this.options.element) {
            console.error('BreathingComponent: element is required');
            return this;
        }

        this.originalTransform = this.options.element.style.transform || '';
        this.addAnimationStyles();
        this.applyAnimation();
        this._isRunning = true;

        return this;
    }

    addAnimationStyles() {
        if (!document.getElementById('breathing-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'breathing-animation-styles';
            style.textContent = `
        @keyframes breatheVertical {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        
        @keyframes breatheHorizontal {
          0%, 100% { transform: translate(-50%, -50%) scaleX(1); }
          50% { transform: translate(-50%, -50%) scaleX(1.2); }
        }
        
        @keyframes breatheBoth {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
      `;
            document.head.appendChild(style);
        }
    }

    applyAnimation() {
        if (!this.options.element) return;

        this.options.element.style.animation = '';

        let animationName = 'breatheVertical';
        if (this.options.direction === 'horizontal') {
            animationName = 'breatheHorizontal';
        } else if (this.options.direction === 'both') {
            animationName = 'breatheBoth';
        }

        const duration = 3 / this.options.speed;
        this.options.element.style.animation = `${animationName} ${duration}s ease-in-out infinite`;
    }

    update(options) {
        this.options = {...this.options, ...options };
        this.applyAnimation();
        return this;
    }

    pause() {
        if (this.options.element) {
            this.options.element.style.animationPlayState = 'paused';
        }
        this._isRunning = false;
        return this;
    }

    resume() {
        if (this.options.element) {
            this.options.element.style.animationPlayState = 'running';
        }
        this._isRunning = true;
        return this;
    }

    destroy() {
        if (this.options.element) {
            this.options.element.style.animation = '';
            this.options.element.style.transform = this.originalTransform;
        }
        this._isRunning = false;
    }

    stop() {
        if (this.options.element) {
            this.options.element.style.animation = '';
            this.options.element.style.transform = this.originalTransform;
        }
        this._isRunning = false;
        return this;
    }
}

export default BreathingComponent;
export { BreathingComponent };