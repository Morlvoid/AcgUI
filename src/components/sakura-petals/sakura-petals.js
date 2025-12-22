/**
 * ACGUI - 樱花飘落效果组件
 * 使用方式：
 * <acg-sakura-petals></acg-sakura-petals>
 * 或
 * new ACSakuraPetals(options)
 */

class ACSakuraPetals extends HTMLElement {
    constructor() {
        super();
        this._defaultOptions = {
            count: 30, // 花瓣数量
            speed: 2, // 飘落速度 (1-5)
            color: '#ffb7c5', // 花瓣颜色
            zIndex: 9999, // 层级
            area: 'fullscreen', // 范围: 'fullscreen' | 'background'
            opacity: 0.7, // 透明度
            size: { min: 10, max: 25 }, // 花瓣大小范围(px)
            sway: 2, // 摇摆幅度
            wind: 0.5, // 风力影响
            interactive: false // 是否可交互
        };

        this._options = {...this._defaultOptions };
        this._petals = [];
        this._animationId = null;
        this._isRunning = false;
    }

    // Web Components 生命周期方法
    connectedCallback() {
        this._parseAttributes();
        this._init();
        this._startAnimation();

        // 监听窗口大小变化
        window.addEventListener('resize', this._handleResize.bind(this));
    }

    disconnectedCallback() {
        this._stopAnimation();
        window.removeEventListener('resize', this._handleResize.bind(this));
    }

    // 属性变化监听
    static get observedAttributes() {
        return ['count', 'speed', 'color', 'area'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this._parseAttributes();
            if (this._isRunning) {
                this._reset();
            }
        }
    }

    // 解析元素属性
    _parseAttributes() {
        const attrs = this.attributes;

        for (let attr of attrs) {
            switch (attr.name) {
                case 'count':
                    this._options.count = parseInt(attr.value) || this._defaultOptions.count;
                    break;
                case 'speed':
                    this._options.speed = parseFloat(attr.value) || this._defaultOptions.speed;
                    break;
                case 'color':
                    this._options.color = attr.value;
                    break;
                case 'area':
                    this._options.area = attr.value;
                    break;
                case 'z-index':
                    this._options.zIndex = parseInt(attr.value) || this._defaultOptions.zIndex;
                    break;
            }
        }
    }

    // 初始化花瓣
    _init() {
        this.style.position = 'relative';
        this.style.overflow = 'hidden';

        if (this._options.area === 'background') {
            this.style.position = 'absolute';
            this.style.top = '0';
            this.style.left = '0';
            this.style.width = '100%';
            this.style.height = '100%';
            this.style.zIndex = '-1';
        }

        this._createPetals();
    }

    // 创建花瓣元素
    _createPetals() {
        // 清空现有花瓣
        this.innerHTML = '';
        this._petals = [];

        const petalSVG = `<svg viewBox="0 0 100 100">
      <path d="M50,15 C60,5 75,10 85,25 C95,40 90,60 75,70 C60,80 40,80 25,70 C10,60 5,40 15,25 C25,10 40,5 50,15 Z" 
            fill="${this._options.color}" fill-opacity="${this._options.opacity}"/>
    </svg>`;

        for (let i = 0; i < this._options.count; i++) {
            const petal = document.createElement('div');
            petal.className = 'acg-sakura-petal';
            petal.innerHTML = petalSVG;

            // 设置初始位置和大小
            const size = Math.random() *
                (this._options.size.max - this._options.size.min) +
                this._options.size.min;

            petal.style.position = 'absolute';
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.top = `${-size}px`;
            petal.style.zIndex = this._options.zIndex;
            petal.style.pointerEvents = this._options.interactive ? 'auto' : 'none';
            petal.style.transition = 'opacity 0.3s';

            // 随机旋转
            petal.style.transform = `rotate(${Math.random() * 360}deg)`;

            // 存储花瓣状态
            this._petals.push({
                element: petal,
                x: parseFloat(petal.style.left),
                y: parseFloat(petal.style.top),
                speed: (0.5 + Math.random() * 0.5) * this._options.speed,
                sway: Math.random() * this._options.sway - (this._options.sway / 2),
                rotation: Math.random() * 0.5 - 0.25,
                size: size,
                windEffect: Math.random() * this._options.wind - (this._options.wind / 2)
            });

            this.appendChild(petal);
        }
    }

    // 动画循环
    _animatePetals() {
        const viewportHeight = window.innerHeight;

        this._petals.forEach(petal => {
            // 更新位置
            petal.y += petal.speed;
            petal.x += petal.sway + petal.windEffect;

            // 旋转
            const rotation = parseFloat(petal.element.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
            petal.element.style.transform = `rotate(${rotation + petal.rotation}deg)`;

            // 边界检测
            if (petal.y > viewportHeight) {
                petal.y = -petal.size;
                petal.x = Math.random() * 100;
            }

            if (petal.x > 100) petal.x = -5;
            if (petal.x < -5) petal.x = 100;

            // 应用新位置
            petal.element.style.left = `${petal.x}vw`;
            petal.element.style.top = `${petal.y}px`;
        });

        this._animationId = requestAnimationFrame(this._animatePetals.bind(this));
    }

    // 开始动画
    _startAnimation() {
        if (!this._isRunning) {
            this._isRunning = true;
            this._animatePetals();
        }
    }

    // 停止动画
    _stopAnimation() {
        if (this._animationId) {
            cancelAnimationFrame(this._animationId);
            this._isRunning = false;
        }
    }

    // 重置花瓣
    _reset() {
        this._createPetals();
    }

    // 处理窗口大小变化
    _handleResize() {
        // 重新计算位置
        this._petals.forEach(petal => {
            if (petal.y > window.innerHeight) {
                petal.y = -petal.size;
            }
        });
    }

    // 公共API方法

    /**
     * 更新组件配置
     * @param {Object} newOptions - 新配置
     */
    updateOptions(newOptions) {
        this._options = {...this._options, ...newOptions };
        this._reset();
    }

    /**
     * 开始/恢复动画
     */
    start() {
        this._startAnimation();
    }

    /**
     * 暂停动画
     */
    pause() {
        this._stopAnimation();
    }

    /**
     * 设置花瓣颜色
     * @param {string} color - CSS颜色值
     */
    setColor(color) {
        this._options.color = color;
        this._reset();
    }

    /**
     * 设置飘落速度
     * @param {number} speed - 速度值 (1-5)
     */
    setSpeed(speed) {
        this._options.speed = Math.max(0.1, Math.min(5, speed));
        this._petals.forEach(petal => {
            petal.speed = (0.5 + Math.random() * 0.5) * this._options.speed;
        });
    }

    /**
     * 设置飘落范围
     * @param {string} area - 'fullscreen' 或 'background'
     */
    setArea(area) {
        this._options.area = area;
        if (area === 'background') {
            this.style.position = 'absolute';
            this.style.zIndex = '-1';
        } else {
            this.style.position = 'relative';
            this.style.zIndex = this._options.zIndex;
        }
    }
}

// 注册自定义元素
if (!customElements.get('acg-sakura-petals')) {
    customElements.define('acg-sakura-petals', ACSakuraPetals);
}

// 导出为模块
export default ACSakuraPetals;