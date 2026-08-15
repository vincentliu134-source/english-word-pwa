# Excel 单词库导入规范

系统只读取工作簿的第一个 sheet，支持 `.xlsx` 和 `.xls`。推荐严格使用正式模板表头。

## 标准表头

模板共 34 列：

`教材版本, 年级, 册别, Unit, Lesson, 页码, 序号, 英文, 中文, 词性, 主题分类, 课标要求, 难度, 是否短语/专名, 图片生成文件名, 图片链接, 发音链接, 标准发音/音标, sentence_audio_url, listen_tip_听一听, example_sentence_跟着说, example_sentence_cn, chunk_tip_拆开记, show_chunk_tip, memory_tip_记忆小窍门, spelling_secret_拼写小秘密, 主动回忆题型, 展示模式, spelling_test_mode, 初学显示中文, 复习隐藏中文, 初始复习等级, 学习状态, 备注`

代码中的唯一规范来源为 `assets/js/modules/import-core.js`。

## 必填字段

年级、难度、英文、中文、Unit、词性、`listen_tip_听一听`、`example_sentence_跟着说`、`memory_tip_记忆小窍门`、`spelling_secret_拼写小秘密`、主动回忆题型、展示模式和 `spelling_test_mode` 必填。

当 `show_chunk_tip` 为 `TRUE` 时，`chunk_tip_拆开记`也必填。

## 允许值

- 年级：一年级至六年级，或数字 `1` 至 `6`
- 难度：`easy`、`medium`、`hard`
- 展示模式：`image_first`、`abstract_scene`、`place`、`phrase`、`culture`
- 拼写模式：`letter_bank`、`partial_blank`、`phrase_order`、`full_blank`
- 布尔字段：`TRUE/FALSE`、`是/否`、`1/0`
- 初始复习等级：`0–5`

## 图片规则

- `图片链接`可以是网络地址，也可以是相对项目入口的本地路径。
- 图片链接为空时，`图片生成文件名`必须使用 `snake_case.png` 格式。
- 六年级默认词库使用项目内 `六年级单词图片`目录中的 143 张本地图片。

## 正式模板

`outputs/word-tool-upgrade/小学英语单词导入模板.xlsx`
