class BackgroundComponent {
    constructor(options = {}) {
        this.options = {
            container: document.body,
            images: [],
            duration: 5000,
            ...options
        };
        this.stage = null;
        this.currentIndex = 0;
        this.intervalId = null;
        this._isRunning = false;
    }

    init() {
        if (!this.options.images || this.options.images.length === 0) {
            console.warn('BackgroundComponent: no images provided');
            return this;
        }

        this.stage = document.createElement('div');
        this.stage.style.position = 'absolute';
        this.stage.style.top = '0';
        this.stage.style.left = '0';
        this.stage.style.width = '100%';
        this.stage.style.height = '100%';
        this.stage.style.zIndex = '1';
        this.stage.style.overflow = 'hidden';
        this.options.container.appendChild(this.stage);

        this.showImage(0);

        if (this.options.images.length > 1) {
            this.startSlideshow();
        }

        return this;
    }

    showImage(index) {
        this.stage.innerHTML = '';

        const img = document.createElement('div');
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
        img.style.backgroundRepeat = 'no-repeat';
        img.style.backgroundImage = `url('${this.options.images[index]}')`;
        img.style.opacity = '0';
        img.style.transition = 'opacity 1s ease';

        this.stage.appendChild(img);

        requestAnimationFrame(() => {
            img.style.opacity = '1';
        });

        this.currentIndex = index;
    }

    startSlideshow() {
        this._isRunning = true;
        this.intervalId = setInterval(() => {
            const nextIndex = (this.currentIndex + 1) % this.options.images.length;
            this.showImage(nextIndex);
        }, this.options.duration);
    }

    update(options) {
        this.options = {...this.options, ...options };

        if (options.duration && this._isRunning) {
            this.stop();
            this.startSlideshow();
        }

        return this;
    }

    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this._isRunning = false;
        return this;
    }

    resume() {
        if (!this._isRunning && this.options.images.length > 1) {
            this.startSlideshow();
        }
        return this;
    }

    destroy() {
        this.stop();
        if (this.stage && this.stage.parentNode) {
            this.stage.parentNode.removeChild(this.stage);
        }
        this.stage = null;
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this._isRunning = false;
        return this;
    }
}

export default BackgroundComponent;
export { BackgroundComponent };