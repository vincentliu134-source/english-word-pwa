# GitHub 上传与更新操作说明

本说明用于把“星词探险”项目发布到 GitHub 仓库，并在每次修改后更新线上 HTTPS 网页。

当前仓库地址：

`https://github.com/vincentliu134-source/english-word-pwa`

当前线上访问地址：

`https://vincentliu134-source.github.io/english-word-pwa/enhanced-word-tool.html`

## 一、第一次上传项目到 GitHub

如果项目已经在 GitHub Desktop 里显示为 `english-word-pwa`，并且顶部能看到 `Publish repository` 或 `Push origin`，说明本地仓库已经准备好了。

### 方式 A：用 GitHub Desktop，推荐

1. 打开 GitHub Desktop。
2. 左上角 `Current Repository` 选择本项目。
3. 确认分支是 `main`。
4. 如果顶部显示 `Publish repository`：
   - 点击 `Publish repository`。
   - 仓库名建议使用：`english-word-pwa`。
   - 如果不想别人看到，先选 `Private`；如果要 GitHub Pages 免费访问，通常需要设为 `Public`。
   - 点击发布。
5. 发布完成后，进入 GitHub 网页仓库。
6. 打开 `Settings` → `Pages`。
7. 设置：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
8. 保存，等待 1–3 分钟。
9. 打开 GitHub Pages 生成的网址。

### 方式 B：用命令行

在项目目录执行：

```bash
git remote add origin https://github.com/vincentliu134-source/english-word-pwa.git
git branch -M main
git add .
git commit -m "首次发布星词探险 PWA"
git push -u origin main
```

如果提示 `remote origin already exists`，说明远程仓库已经配置过，不需要重复添加。

## 二、以后每次修改后如何更新线上版本

每次我帮你修改完工具后，只需要做三步：

### 1. 提交本地修改

打开 GitHub Desktop：

1. 左侧 `Changes` 查看改动文件。
2. 左下角 `Summary` 填一句更新说明，例如：
   - `优化阅读页交互`
   - `修复挑战页布局`
   - `更新星词积分系统`
3. 点击 `Commit to main`。

### 2. 推送到 GitHub

提交后，顶部会出现：

`Push origin`

点击它，把本地修改上传到 GitHub。

### 3. 等待 GitHub Pages 自动更新

一般等待 1–3 分钟，然后打开：

`https://vincentliu134-source.github.io/english-word-pwa/enhanced-word-tool.html`

如果页面没变化，通常是缓存问题，不一定是上传失败。

## 三、手机端还是旧版本怎么办

因为这个工具是 PWA，会缓存文件以支持弱网和离线使用，所以手机上可能不会立刻显示新版。

按下面顺序处理：

1. 先刷新网页。
2. 关闭浏览器标签页，重新打开网址。
3. 如果是添加到桌面的 PWA，先完全退出再重新打开。
4. 如果仍然是旧版：
   - 删除桌面图标；
   - 用浏览器重新打开线上地址；
   - 再次“添加到主屏幕”。

## 四、如何确认是否真的上传成功

可以检查三处：

1. GitHub Desktop 左侧显示 `0 changed files`。
2. GitHub Desktop 顶部没有 `Push origin`，说明已经推送。
3. GitHub 网页仓库里能看到最新提交时间。

如果 GitHub 已经更新，但线上网页还是旧的，多半是 Pages 或浏览器缓存，等几分钟或清缓存即可。

## 五、推荐的提交说明写法

提交说明不用太长，能看懂这次改了什么就行。

常用模板：

```text
优化首页布局和学习设置
修复阅读页目标词点击逻辑
更新挑战页一屏展示效果
新增星词积分和等级体系
修复 PWA 缓存版本
补充音频生成脚本和测试
```

## 六、命令行快速更新方式

如果不用 GitHub Desktop，也可以在项目目录执行：

```bash
git status
git add .
git commit -m "本次更新说明"
git push origin main
```

其中 `"本次更新说明"` 换成你自己的描述。

## 七、注意事项

- 不要只上传 `enhanced-word-tool.html`，因为图片、CSS、JS、PWA 配置、Service Worker 都可能一起变化。
- 如果修改了 PWA、CSS 或 JS，最好同步更新缓存版本号，否则手机可能继续加载旧文件。
- 上传后不要立刻判断失败，GitHub Pages 通常需要一点时间部署。
- 手机安装到桌面后，本质上还是网页 App；更新依赖 GitHub Pages 和本地缓存刷新。
