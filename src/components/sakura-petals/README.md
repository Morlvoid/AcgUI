# ACGUI 樱花飘落组件

为二次元风格网站设计的樱花飘落效果组件。

## 安装与使用

### 方式一：HTML标签（推荐）
```html
<acg-sakura-petals
  count="50"
  speed="2.5"
  color="#ff9ebb"
  area="fullscreen"
  z-index="9999"
  theme="light"
></acg-sakura-petals>
```



### 方式二：JavaScript API

```javascript
// 获取组件实例
const sakura = document.querySelector('acg-sakura-petals');

// 更新配置
sakura.updateOptions({
  count: 30,
  speed: 1.5,
  color: '#ff6b9d',
  area: 'background'
});

// 控制动画
sakura.pause();  // 暂停
sakura.start();  // 开始

// 单独设置属性
sakura.setSpeed(3);
sakura.setColor('#ff4081');
sakura.setArea('fullscreen');
```

## 属性配置

| 属性    | 类型   | 默认值       | 说明                                           |
| :------ | :----- | :----------- | :--------------------------------------------- |
| count   | number | 30           | 花瓣数量                                       |
| speed   | number | 2            | 飘落速度 (0.1-5)                               |
| color   | string | '#ffb7c5'    | 花瓣颜色                                       |
| area    | string | 'fullscreen' | 范围：'fullscreen'全屏覆盖，'background'背景层 |
| z-index | number | 9999         | 层级                                           |
| theme   | string | -            | 主题：'light'或'dark'                          |
| opacity | number | 0.7          | 透明度 (0-1)                                   |

## 方法

`updateOptions(options)`

更新组件配置。

`start()`

开始/恢复动画。

`pause()`

暂停动画。

`setColor(color)`

设置花瓣颜色。

`setSpeed(speed)`

设置飘落速度。

`setArea(area)`

设置飘落范围。

## 事件

组件会触发以下自定义事件：

- `acg-sakura-start`: 动画开始
- `acg-sakura-pause`: 动画暂停
- `acg-sakura-reset`: 重置时触发

## 示例

查看 `examples/sakura-demo.html` 获取完整示例。

