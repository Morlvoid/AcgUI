import './web-component.js';

/**
 * SakuraComponent - 樱花飘落效果组件
 * 支持两种使用方式：
 * 1. JavaScript类方式：new SakuraComponent(options).init()
 * 2. Web Components方式：<acg-sakura count="30" speed="2"></acg-sakura>
 */

class SakuraComponent {
    constructor(options = {}) {
        this.options = {
            container: document.body,
            speed: 1,
            density: 15,
            color: '#ffb7c5',
            sway: 2,
            wind: 0.5,
            opacity: 0.7,
            ...options
        };
        this.element = null;
    }

    /**
     * 初始化组件
     * @returns {SakuraComponent}
     */
    init() {
        // 创建Web Component元素
        this.element = document.createElement('acg-sakura');
        this.element.setAttribute('count', this.options.density);
        this.element.setAttribute('speed', this.options.speed);
        this.element.setAttribute('color', this.options.color);
        this.element.setAttribute('sway', this.options.sway);
        this.element.setAttribute('wind', this.options.wind);
        this.element.setAttribute('opacity', this.options.opacity);

        this.options.container.appendChild(this.element);
        return this;
    }

    /**
     * 更新配置
     * @param {Object} options - 配置选项
     * @returns {SakuraComponent}
     */
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
            if (options.sway !== undefined) {
                this.element.setAttribute('sway', options.sway);
            }
            if (options.wind !== undefined) {
                this.element.setAttribute('wind', options.wind);
            }
            if (options.opacity !== undefined) {
                this.element.setAttribute('opacity', options.opacity);
            }
        }
        return this;
    }

    /**
     * 暂停动画
     * @returns {SakuraComponent}
     */
    pause() {
        if (this.element && this.element.pause) {
            this.element.pause();
        }
        return this;
    }

    /**
     * 恢复动画
     * @returns {SakuraComponent}
     */
    resume() {
        if (this.element && this.element.resume) {
            this.element.resume();
        }
        return this;
    }

    /**
     * 销毁组件
     */
    destroy() {
        if (this.element && this.element.destroy) {
            this.element.destroy();
        }
        this.element = null;
    }
}

export default SakuraComponent;
export { SakuraComponent };