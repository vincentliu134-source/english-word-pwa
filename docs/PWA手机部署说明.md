# PWA 手机部署说明

这个项目已经支持 PWA：部署到 HTTPS 后，可以在手机浏览器里“添加到主屏幕”，像一个轻量 App 一样使用。

## 推荐免费方案：GitHub Pages

不需要单独申请域名。GitHub Pages 会自动提供一个 HTTPS 地址：

`https://你的用户名.github.io/仓库名/`

操作步骤：

1. 新建一个 GitHub 仓库。
2. 把本项目所有文件上传到仓库根目录。
3. 进入仓库 `Settings` → `Pages`。
4. `Build and deployment` 选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. 保存后等待 1–3 分钟，GitHub 会生成 HTTPS 访问地址。

手机安装：

- iPhone Safari：打开网址 → 分享 → 添加到主屏幕。
- Android Chrome：打开网址 → 右上角菜单 → 添加到主屏幕/安装应用。

更详细的 GitHub 首次上传、日常修改后更新、缓存处理步骤，请看：

`docs/GitHub上传与更新操作说明.md`

## 其他免费 HTTPS 方案

- Cloudflare Pages：免费、速度快，也可以后续绑定自己的域名。
- Netlify：拖拽整个文件夹即可部署，适合非技术操作。
- Vercel：也可以免费部署静态网页。

## 是否需要买域名？

不需要。免费地址已经能正常打开和安装。

只有当你想要更好记的地址，例如：

`https://word.liubai.xxx`

才需要购买域名并绑定到 GitHub Pages / Cloudflare Pages。

## 离线能力说明

当前 PWA 会缓存：

- 主页面
- CSS / JS
- PWA 图标
- 当前学习批次的单词图片和本地音频
- 已访问过的 CDN 脚本和字体

第一次使用需要联网；进入学习后，系统会提前预热后续单词的压缩图片和本地音频，之后弱网或短时间离线时也能继续使用。学习记录保存在当前手机浏览器本地，不会自动同步到其他设备。
