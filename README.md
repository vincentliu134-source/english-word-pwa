# 小学英语单词学习工具

一个纯前端的小学英语单词学习工具，支持卡片学习、多题型主动回忆、Excel 单词库导入、错词复习、阅读练习和本地学习记录分析。

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
│           └── statistics-core.js
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
- 卡片式学习
- 多题型主动回忆与拼写挑战
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

正式模板共有 34 个字段。请使用
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

## 文档

- 功能与技术盘点：`docs/项目功能技术盘点.md`
- 手工验收清单：`docs/手工验收测试清单.md`
