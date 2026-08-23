# 星词探险

一个纯前端的小学英语看图、听读与主动回忆工具，支持自适应卡片学习、多题型主动回忆、Excel 单词库导入、薄弱点小回合、间隔复习、今日单词小故事和本地学习记录分析。

## 打开方式

直接在浏览器中打开 `enhanced-word-tool.html` 即可。

## 当前目录结构

```text
.
├── enhanced-word-tool.html
├── assets
│   ├── css
│   │   └── enhanced-word-tool.css
│   └── js
│       ├── enhanced-word-tool.js
│       └── modules
│           ├── word-database.js
│           ├── import-core.js
│           ├── game-core.js
│           ├── statistics-core.js
│           ├── memory-core.js
│           └── story-core.js
├── archive
│   └── legacy-pages
│       └── 历史 HTML 版本
├── docs
│   └── 项目功能技术盘点.md
└── 相关资料 / Excel / 图片素材
```

## 核心能力

- 年级与难度选择
- 单词数量与学习时长配置
- 「我记住了 / 帮我记一记」自适应卡片学习
- 多题型主动回忆与拼写挑战
- 错词自动生成「只复习薄弱点」小回合
- 基于已学词的本地「今日单词小故事」、逐句点读和三道理解题
- Excel 单词库导入
- 自定义图片
- 学习数据分析

## 技术说明

- 原生 HTML / CSS / JavaScript
- Tailwind CSS CDN
- Font Awesome CDN
- SheetJS / XLSX CDN
- Web Speech API
- localStorage

## Excel 格式

正式模板共有 36 个字段。请使用
`outputs/word-tool-upgrade/小学英语单词导入模板.xlsx`，完整规则见
`docs/Excel导入规范.md`。

## 说明

- 当前项目不依赖构建工具
- 当前项目没有后端
- 学习记录保存在当前浏览器本地
- 默认词库覆盖 1–6 年级和 easy / medium / hard
- 六年级正式词库共 143 词，并使用 143 张本地图片
- 历史页面版本已归档到 `archive/legacy-pages`

## 自动化检查

需要 Node.js 18 或更高版本：

```bash
npm test
npm run check
```

## 批量生成本地音频

音频脚本会读取默认词库，使用 macOS 本地 `say` 朗读单词和例句，转成 MP3 后写入
`assets/audio/`，并自动回写 `audioUrl / audio_url` 与
`sentenceAudioUrl / sentence_audio_url`。

首次使用前需要安装 ffmpeg：

```bash
brew install ffmpeg
```

常用命令：

```bash
npm run generate-audio -- --dry-run --limit=5
npm run generate-audio -- --grade=grade6 --difficulty=easy --limit=10
npm run generate-audio -- --word=taste --force
```

## 压缩手机端图片

六年级原始图片较大，手机首次打开会慢。项目会优先读取
`assets/images/optimized/` 下的 WebP 压缩图，失败时再回退到原图。

新增或替换图片后，运行：

```bash
npm run optimize-images
```

当前六年级图片已从约 276MB 压缩到约 11MB，并且学习时会提前缓存当前批次的图片和本地音频，提升手机 PWA 的二次打开速度。

## 文档

- 功能与技术盘点：`docs/项目功能技术盘点.md`
- 手工验收清单：`docs/手工验收测试清单.md`
