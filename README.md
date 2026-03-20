# AcgUI - 二次元风格UI组件库

<p>
    <img src="https://img.shields.io/badge/版本-2.0.0-blue" alt="版本">
    <img src="https://img.shields.io/badge/状态-稳定-green" alt="状态">
    <img src="https://img.shields.io/badge/许可证-MIT-green" alt="许可证">
    <img src="https://img.shields.io/badge/二次元-友好!-ff69b4" alt="二次元友好">
</p>

## 🌸 项目简介

AcgUI（Anime CSS GUI）是一个专为二次元风格网站设计的轻量级UI组件库，致力于创建既美观又实用的动态组件，让开发者能够轻松构建充满动感的二次元风格界面。

## ✨ 核心特性

- 🎨 **为二次元而生**：专注于二次元风格的UI组件和特效
- ⚡ **轻量高性能**：每个组件都经过优化，不影响页面性能
- 🔧 **高度可定制**：丰富的参数配置，满足各种个性化需求
- 🌐 **开箱即用**：简单的API，几行代码就能实现炫酷效果
- 🧩 **双模式支持**：支持JavaScript类方式和Web Components方式

## 📦 组件列表

| 组件 | 描述 | 可配置参数 |
|------|------|------------|
| 🌸 Sakura（樱花飘落） | 模拟樱花飘落的粒子效果 | 密度、速度、颜色 |
| 🫧 Bubble（气泡上升） | 模拟气泡上升的动画效果 | 密度、速度、颜色 |
| 🖼️ Border（边框动画） | 动态边框绘制效果 | 速度、颜色、线宽 |
| ⭐ Star（星星动画） | 闪烁的星星效果 | 颜色、位置、大小 |
| 🖼️ Background（背景图片） | 背景图片切换效果 | 图片列表、切换时长 |
| 💫 Breathing（呼吸效果） | 元素呼吸闪烁效果 | 速度、颜色 |

## 🚀 快速开始

### 安装

```bash
npm install acgui
```

### 使用方式

#### 方式一：JavaScript类方式

```javascript
import { Sakura, Bubble, Border, Star, Background, Breathing } from 'acgui';

// 樱花飘落效果
const sakura = new Sakura({
    container: document.getElementById('my-container'),
    density: 30,
    speed: 2,
    color: '#ffb7c5'
}).init();

// 气泡上升效果
const bubble = new Bubble({
    container: document.getElementById('my-container'),
    density: 15,
    speed: 1,
    color: 'rgba(255, 255, 255, 0.6)'
}).init();

// 销毁组件
sakura.destroy();
bubble.destroy();
```

#### 方式二：Web Components方式

```html
<!-- 直接在HTML中使用自定义标签 -->
<acg-sakura count="30" speed="2" color="#ffb7c5"></acg-sakura>
<acg-bubble count="15" speed="1" color="rgba(255, 255, 255, 0.6)"></acg-bubble>
```

### 开发

```bash
# 克隆仓库
git clone git@github.com:Morlvoid/AcgUI.git

# 安装依赖
cd AcgUI
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| Web Components | 组件封装与复用 |
| HTML5 Canvas | 复杂动画与粒子系统 |
| CSS3 Animations | 基础动画效果 |
| JavaScript ES6+ | 组件逻辑与交互 |
| Webpack | 项目构建与打包 |
| Babel | JavaScript编译 |

## 📁 项目结构

```
AcgUI/
├── src/
│   ├── components/
│   │   ├── Sakura/          # 樱花飘落组件
│   │   ├── Bubble/          # 气泡上升组件
│   │   ├── Border/          # 边框动画组件
│   │   ├── Star/            # 星星动画组件
│   │   ├── Background/      # 背景图片组件
│   │   └── Breathing/       # 呼吸效果组件
│   ├── utils/               # 工具函数
│   └── index.js             # 入口文件
├── examples/                # 示例页面
├── dist/                    # 构建输出
├── index.html               # 组件展示页面
├── package.json
├── webpack.config.js
└── babel.config.js
```

## 🤝 贡献指南

欢迎所有对二次元和Web开发感兴趣的朋友参与贡献！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢所有为 AcgUI 做出贡献的开发者！

---

**让我们一起打造属于二次元开发者自己的工具库！** 🌸
