/**
 * Sakura Web Component - 樱花飘落效果
 * 基于Web Components标准实现，支持HTML标签直接使用
 *
 * 使用方式：
 * <acg-sakura count="30" speed="2" color="#ffb7c5"></acg-sakura>
 */

class AcgSakura extends HTMLElement {
    constructor() {
        super();
        this._defaultOptions = {
            count: 30,
            speed: 2,
            color: '#ffb7c5',
            zIndex: 9999,
            opacity: 0.7,
            size: { min: 10, max: 25 },
            sway: 2,
            wind: 0.5
        };

        this._options = {...this._defaultOptions };
        this._petals = [];
        this._animationId = null;
        this._isRunning = false;
        this._containerWidth = 0;
        this._containerHeight = 0;
    }

    connectedCallback() {
        this._parseAttributes();
        this._init();
        this._startAnimation();
        window.addEventListener('resize', this._handleResize.bind(this));
    }

    disconnectedCallback() {
        this._stopAnimation();
        window.removeEventListener('resize', this._handleResize.bind(this));
    }

    static get observedAttributes() {
        return ['count', 'speed', 'color', 'density'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this._parseAttributes();
            if (this._isRunning) {
                this._reset();
            }
        }
    }

    _parseAttributes() {
        const attrs = this.attributes;
        for (let attr of attrs) {
            switch (attr.name) {
                case 'count':
                case 'density':
                    this._options.count = parseInt(attr.value) || this._defaultOptions.count;
                    break;
                case 'speed':
                    this._options.speed = parseFloat(attr.value) || this._defaultOptions.speed;
                    break;
                case 'color':
                    this._options.color = attr.value;
                    break;
                case 'z-index':
                    this._options.zIndex = parseInt(attr.value) || this._defaultOptions.zIndex;
                    break;
            }
        }
    }

    _init() {
        // 设置容器样式
        this.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: ${this._options.zIndex};
        `;

        // 获取容器尺寸
        this._updateContainerSize();
        this._createPetals();
    }

    _updateContainerSize() {
        const rect = this.getBoundingClientRect();
        this._containerWidth = rect.width || this.parentElement?.offsetWidth || window.innerWidth;
        this._containerHeight = rect.height || this.parentElement?.offsetHeight || window.innerHeight;
    }

    _createPetals() {
        this.innerHTML = '';
        this._petals = [];

        // 创建樱花花瓣SVG
        const petalSVG = `<svg viewBox="0 0 100 100" style="width:100%;height:100%;display:block;">
            <path d="M50,15 C60,5 75,10 85,25 C95,40 90,60 75,70 C60,80 40,80 25,70 C10,60 5,40 15,25 C25,10 40,5 50,15 Z"
                fill="${this._options.color}" fill-opacity="${this._options.opacity}"/>
        </svg>`;

        for (let i = 0; i < this._options.count; i++) {
            const petal = document.createElement('div');
            petal.className = 'acg-sakura-petal';
            petal.innerHTML = petalSVG;

            const size = Math.random() * (this._options.size.max - this._options.size.min) + this._options.size.min;
            const startX = Math.random() * this._containerWidth;
            const startY = Math.random() * this._containerHeight - this._containerHeight;

            petal.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${startX}px;
                top: ${startY}px;
                pointer-events: none;
                transform: rotate(${Math.random() * 360}deg);
            `;

            this._petals.push({
                element: petal,
                x: startX,
                y: startY,
                speed: (0.5 + Math.random() * 0.5) * this._options.speed,
                sway: Math.random() * this._options.sway - (this._options.sway / 2),
                rotation: Math.random() * 0.5 - 0.25,
                size: size,
                windEffect: Math.random() * this._options.wind - (this._options.wind / 2)
            });

            this.appendChild(petal);
        }
    }

    _animatePetals() {
        this._petals.forEach(petal => {
            // 更新位置
            petal.y += petal.speed;
            petal.x += petal.sway + petal.windEffect;

            // 更新旋转
            const currentTransform = petal.element.style.transform;
            const rotationMatch = currentTransform.match(/rotate\(([-\d.]+)deg\)/);
            const currentRotation = rotationMatch ? parseFloat(rotationMatch[1]) : 0;
            const newRotation = currentRotation + petal.rotation;

            // 边界检查 - 如果超出底部，重置到顶部
            if (petal.y > this._containerHeight) {
                petal.y = -petal.size;
                petal.x = Math.random() * this._containerWidth;
            }

            // 水平边界检查
            if (petal.x > this._containerWidth + petal.size) {
                petal.x = -petal.size;
            } else if (petal.x < -petal.size) {
                petal.x = this._containerWidth + petal.size;
            }

            // 应用位置
            petal.element.style.left = `${petal.x}px`;
            petal.element.style.top = `${petal.y}px`;
            petal.element.style.transform = `rotate(${newRotation}deg)`;
        });

        this._animationId = requestAnimationFrame(this._animatePetals.bind(this));
    }

    _startAnimation() {
        if (!this._isRunning) {
            this._isRunning = true;
            this._animatePetals();
        }
    }

    _stopAnimation() {
        if (this._animationId) {
            cancelAnimationFrame(this._animationId);
            this._animationId = null;
        }
        this._isRunning = false;
    }

    _reset() {
        this._updateContainerSize();
        this._createPetals();
    }

    _handleResize() {
        this._updateContainerSize();
    }

    // 公共API
    update(options) {
        this._options = {...this._options, ...options };
        this._reset();
        return this;
    }

    destroy() {
        this._stopAnimation();
        this.innerHTML = '';
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    }

    pause() {
        this._stopAnimation();
        return this;
    }

    resume() {
        this._startAnimation();
        return this;
    }
}

// 注册自定义元素
if (!customElements.get('acg-sakura')) {
    customElements.define('acg-sakura', AcgSakura);
}

export default AcgSakura;