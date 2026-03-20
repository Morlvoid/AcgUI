import './web-component.js';

/**
 * BubbleComponent - 气泡上升效果组件
 * 支持两种使用方式：
 * 1. JavaScript类方式：new BubbleComponent(options).init()
 * 2. Web Components方式：<acg-bubble count="12" speed="1"></acg-bubble>
 */

class BubbleComponent {
    constructor(options = {}) {
        this.options = {
            container: document.body,
            speed: 1,
            density: 12,
            color: '#aae6ff',
            ...options
        };
        this.element = null;
    }

    init() {
        this.element = document.createElement('acg-bubble');
        this.element.setAttribute('count', this.options.density);
        this.element.setAttribute('speed', this.options.speed);
        this.element.setAttribute('color', this.options.color);

        this.options.container.appendChild(this.element);
        return this;
    }

    update(options) {
        this.options = {...this.options, ...options };

        if (this.element) {
            if (options.density !== undefined) {
                this.element.setAttribute('count', options.density);
            }
            if (options.speed !== undefined) {
                this.element.setAttribute('speed', options.speed);
            }
            if (options.color !== undefined) {
                this.element.setAttribute('color', options.color);
            }
        }
        return this;
    }

    pause() {
        if (this.element && this.element.pause) {
            this.element.pause();
        }
        return this;
    }

    resume() {
        if (this.element && this.element.resume) {
            this.element.resume();
        }
        return this;
    }

    destroy() {
        if (this.element && this.element.destroy) {
            this.element.destroy();
        }
        this.element = null;
    }
}

export default BubbleComponent;
export { BubbleComponent };