/**
 * Animation Components Library
 * 动画组件库 - 整合AcgUI和原有动画组件
 * 
 * 支持两种使用方式：
 * 1. JavaScript类方式：new Component(options).init()
 * 2. Web Components方式：直接在HTML中使用自定义标签
 * 
 * @version 2.0.0
 * @author Animation Components Team
 * @license MIT
 */

// 导入各个组件（包含Web Components注册）
import Sakura from './components/Sakura';
import Bubble from './components/Bubble';
import Border from './components/Border';
import Star from './components/Star';
import Background from './components/Background';
import Breathing from './components/Breathing';

// 组件版本信息
const VERSION = '2.0.0';

// 组件列表
const components = {
    Sakura,
    Bubble,
    Border,
    Star,
    Background,
    Breathing
};

// 自动注册所有Web Components（如果浏览器支持）
if (typeof window !== 'undefined' && window.customElements) {
    // Web Components已在各组件的web-component.js中注册
    console.log(`[Animation Components] v${VERSION} loaded successfully`);
}

// 导出组件
export {
    Sakura,
    Bubble,
    Border,
    Star,
    Background,
    Breathing,
    VERSION
};

// 导出默认对象
export default {
    Sakura,
    Bubble,
    Border,
    Star,
    Background,
    Breathing,
    VERSION,

    /**
     * 安装所有组件到Vue应用
     * @param {Object} app - Vue应用实例
     */
    install(app) {
        if (app && app.component) {
            // Vue 3
            Object.keys(components).forEach(name => {
                app.component(`Acg${name}`, components[name]);
            });
        }
    },

    /**
     * 批量创建组件实例
     * @param {Object} config - 组件配置对象
     * @returns {Object} 组件实例对象
     */
    create(config = {}) {
        const instances = {};

        Object.keys(config).forEach(name => {
            if (components[name]) {
                instances[name] = new components[name](config[name]).init();
            }
        });

        return instances;
    }
};