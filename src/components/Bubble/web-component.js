/**
 * Bubble Web Component - 气泡上升效果
 * 基于Web Components标准实现
 *
 * 使用方式：
 * <acg-bubble count="12" speed="1" color="#aae6ff"></acg-bubble>
 */

class AcgBubble extends HTMLElement {
    constructor() {
        super();
        this._defaultOptions = {
            count: 12,
            speed: 1,
            color: '#aae6ff',
            opacity: 0.5,
            size: { min: 5, max: 20 },
            zIndex: 9998
        };

        this._options = {...this._defaultOptions };
        this._bubbles = [];
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
        this._updateContainerSize();
        this._createBubbles();
    }

    _updateContainerSize() {
        const rect = this.getBoundingClientRect();
        this._containerWidth = rect.width || this.parentElement?.offsetWidth || window.innerWidth;
        this._containerHeight = rect.height || this.parentElement?.offsetHeight || window.innerHeight;
    }

    _createBubbles() {
        this.innerHTML = '';
        this._bubbles = [];

        for (let i = 0; i < this._options.count; i++) {
            const bubble = document.createElement('div');
            const size = Math.random() * (this._options.size.max - this._options.size.min) + this._options.size.min;
            const opacity = Math.random() * 0.5 + 0.2;
            const startX = Math.random() * this._containerWidth;
            const startY = Math.random() * this._containerHeight + this._containerHeight;

            bubble.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border: 1.5px solid ${this._options.color};
                border-radius: 50%;
                background: rgba(255, 255, 255, ${opacity * 0.2});
                left: ${startX}px;
                top: ${startY}px;
                opacity: ${opacity};
                pointer-events: none;
            `;

            this._bubbles.push({
                element: bubble,
                x: startX,
                y: startY,
                speed: (Math.random() * 0.6 + 0.3) * this._options.speed,
                sway: Math.random() * 0.2 - 0.1,
                size: size
            });

            this.appendChild(bubble);
        }
    }

    _animateBubbles() {
        this._bubbles.forEach(bubble => {
            bubble.y -= bubble.speed;
            bubble.x += bubble.sway;

            if (bubble.y < -bubble.size) {
                bubble.y = this._containerHeight + bubble.size;
                bubble.x = Math.random() * this._containerWidth;
            }

            if (bubble.x > this._containerWidth + bubble.size) {
                bubble.x = -bubble.size;
            } else if (bubble.x < -bubble.size) {
                bubble.x = this._containerWidth + bubble.size;
            }

            bubble.element.style.left = `${bubble.x}px`;
            bubble.element.style.top = `${bubble.y}px`;
        });

        this._animationId = requestAnimationFrame(this._animateBubbles.bind(this));
    }

    _startAnimation() {
        if (!this._isRunning) {
            this._isRunning = true;
            this._animateBubbles();
        }
    }

    _stopAnimation() {
        if (this._animationId) {
            cancelAnimationFrame(this._animationId);
            this._animationId = null;
            this._isRunning = false;
        }
    }

    _reset() {
        this._updateContainerSize();
        this._createBubbles();
    }

    _handleResize() {
        this._updateContainerSize();
    }

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

if (!customElements.get('acg-bubble')) {
    customElements.define('acg-bubble', AcgBubble);
}

export default AcgBubble;