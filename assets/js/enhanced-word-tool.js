        // 1. 单词数据库（含精准记忆方法）
        const legacyWordDatabase = {
            grade1: {
                easy: [
                    { chinese: "苹果", english: "apple", image: "https://picsum.photos/id/102/800/600", memoryTip: "拆分记忆：a-p-p-l-e，联想：一个（a）苹果放在盘子（p-p）里，像小灯笼（l-e）" },
                    { chinese: "香蕉", english: "banana", image: "https://picsum.photos/id/1080/800/600", memoryTip: "谐音记忆：“不拿拿”，香蕉太滑拿不住；拼写：ba-na-na，重复na很易记" },
                    { chinese: "猫", english: "cat", image: "https://picsum.photos/id/40/800/600", memoryTip: "发音记忆：cat发音像“凯特”，小猫叫凯特；拼写：c-a-t，三个字母简单记" },
                    { chinese: "狗", english: "dog", image: "https://picsum.photos/id/237/800/600", memoryTip: "联想记忆：小狗（dog）喜欢叼骨头（d像骨头，o像嘴巴，g像尾巴）" },
                    { chinese: "一", english: "one", image: "https://picsum.photos/id/188/800/600", memoryTip: "形状记忆：o像数字0，n像数字1，e像数字1，合起来1个0+1+1=1" },
                    { chinese: "二", english: "two", image: "https://picsum.photos/id/287/800/600", memoryTip: "谐音记忆：“兔”，兔子有两只耳朵；拼写：t-w-o，像两只耳朵（w）" },
                    { chinese: "三", english: "three", image: "https://picsum.photos/id/225/800/600", memoryTip: "拆分记忆：th-ree，th像数字3的形状，ree像“瑞”，三个瑞雪" },
                    { chinese: "红色", english: "red", image: "https://picsum.photos/id/1060/800/600", memoryTip: "联想记忆：太阳（red）升起，r像太阳，e像眼睛，d像地面" },
                    { chinese: "蓝色", english: "blue", image: "https://picsum.photos/id/1059/800/600", memoryTip: "谐音记忆：“布鲁”，布鲁的天空是蓝色；拼写：b-l-u-e，简单四字母" },
                    { chinese: "绿色", english: "green", image: "https://picsum.photos/id/106/800/600", memoryTip: "联想记忆：小草（green）是绿色，g像小草，r-e-e-n，三个e像小草" }
                ],
                medium: [
                    { chinese: "黄色", english: "yellow", image: "https://picsum.photos/id/1061/800/600", memoryTip: "联想记忆：黄色（yellow）的太阳，y像阳光，e-l-l-o-w像阳光四射" },
                    { chinese: "黑色", english: "black", image: "https://picsum.photos/id/1055/800/600", memoryTip: "拆分记忆：b-l-a-c-k，b像黑夜，l-a-c-k像“lack（缺少）”光" },
                    { chinese: "白色", english: "white", image: "https://picsum.photos/id/1063/800/600", memoryTip: "联想记忆：白色（white）的雪花，w-h-i-t-e像雪花飘落" },
                    { chinese: "男孩", english: "boy", image: "https://picsum.photos/id/1074/800/600", memoryTip: "发音记忆：“波伊”，男孩叫波伊；拼写：b-o-y，三个字母简单记" },
                    { chinese: "女孩", english: "girl", image: "https://picsum.photos/id/1077/800/600", memoryTip: "联想记忆：女孩（girl）喜欢礼物（g像礼物，i-r-l像“爱礼物”）" },
                    { chinese: "学校", english: "school", image: "https://picsum.photos/id/20/800/600", memoryTip: "拆分记忆：s-c-h-o-o-l，s像校门，c-h像操场，o-o像窗户" },
                    { chinese: "老师", english: "teacher", image: "https://picsum.photos/id/1066/800/600", memoryTip: "词根记忆：teach（教）+er（人），教书的人就是老师" },
                    { chinese: "学生", english: "student", image: "https://picsum.photos/id/1062/800/600", memoryTip: "联想记忆：student（学生）在study（学习），s-t-u-d-e-n-t" },
                    { chinese: "朋友", english: "friend", image: "https://picsum.photos/id/1071/800/600", memoryTip: "谐音记忆：“富润的”，朋友之间互相帮助变得富有" },
                    { chinese: "家庭", english: "family", image: "https://picsum.photos/id/1082/800/600", memoryTip: "联想记忆：f-a-m-i-l-y，家（family）有爸爸和妈妈（m和f）" }
                ],
                hard: []
            },
            grade2: {
                easy: [
                    { chinese: "书", english: "book", image: "https://picsum.photos/id/24/800/600", memoryTip: "形状记忆：b和k像书的封面，oo像书页，合起来是一本打开的书" },
                    { chinese: "笔", english: "pen", image: "https://picsum.photos/id/1025/800/600", memoryTip: "发音记忆：pen发音像“喷”，钢笔能喷墨；拼写：p-e-n，三字母简单记" },
                    { chinese: "书包", english: "schoolbag", image: "https://picsum.photos/id/1058/800/600", memoryTip: "组合记忆：school（学校）+bag（包），上学用的包就是书包" },
                    { chinese: "眼睛", english: "eye", image: "https://picsum.photos/id/1062/800/600", memoryTip: "形状记忆：两个e像两只眼睛，y像鼻子，合起来是脸的样子" },
                    { chinese: "耳朵", english: "ear", image: "https://picsum.photos/id/1062/800/600", memoryTip: "谐音记忆：“耳”，直接对应耳朵；拼写：e-a-r，三字母对应耳的形状" },
                    { chinese: "鼻子", english: "nose", image: "https://picsum.photos/id/1062/800/600", memoryTip: "联想记忆：鼻子（nose）能闻味道，n像鼻子，o像鼻孔，s-e像呼吸" },
                    { chinese: "嘴巴", english: "mouth", image: "https://picsum.photos/id/1062/800/600", memoryTip: "拆分记忆：m-o-u-t-h，m像嘴巴，o像张开的嘴，u-t-h像牙齿" },
                    { chinese: "手", english: "hand", image: "https://picsum.photos/id/1062/800/600", memoryTip: "联想记忆：手（hand）能做事，h像手指，a-n-d像“和”，手和我们一起做事" },
                    { chinese: "脚", english: "foot", image: "https://picsum.photos/id/1062/800/600", memoryTip: "形状记忆：f-o-o-t，两个o像两只脚，t像脚趾，合起来是脚的样子" },
                    { chinese: "学校", english: "school", image: "https://picsum.photos/id/20/800/600", memoryTip: "拆分记忆：s-c-h-o-o-l，s像校门，c-h像操场，o-o像窗户，l像旗杆" }
                ],
                medium: [
                    { chinese: "橡皮", english: "eraser", image: "https://picsum.photos/id/1025/800/600", memoryTip: "词根记忆：erase 是擦掉，eraser 就是能擦掉字的工具" },
                    { chinese: "铅笔盒", english: "pencil-box", image: "https://picsum.photos/id/1025/800/600", memoryTip: "组合记忆：pencil + box，装铅笔的盒子就是铅笔盒" },
                    { chinese: "桌子", english: "desk", image: "https://picsum.photos/id/48/800/600", memoryTip: "desk 发音短促，想象小书桌短短四个字母就能记住" },
                    { chinese: "椅子", english: "chair", image: "https://picsum.photos/id/29/800/600", memoryTip: "chair 中 ai 发长音，坐在 chair 上慢慢读更好记" },
                    { chinese: "老师", english: "teacher", image: "https://picsum.photos/id/1066/800/600", memoryTip: "teach 是教，teacher 就是教书的人" }
                ],
                hard: []
            },
            grade3: {
                easy: [
                    { chinese: "水果", english: "fruit", image: "https://picsum.photos/id/1080/800/600", memoryTip: "fruit 里 ui 连在一起，想象水果排成一队更容易记" },
                    { chinese: "面包", english: "bread", image: "https://picsum.photos/id/431/800/600", memoryTip: "bread 里 ea 常一起出现，看到面包就想到这组字母" },
                    { chinese: "牛奶", english: "milk", image: "https://picsum.photos/id/292/800/600", memoryTip: "milk 只有四个字母，喝牛奶时顺口念一遍最好记" },
                    { chinese: "水", english: "water", image: "https://picsum.photos/id/1011/800/600", memoryTip: "water 前半段像 wave，想到水波就能联想起来" },
                    { chinese: "鸡蛋", english: "egg", image: "https://picsum.photos/id/312/800/600", memoryTip: "egg 两个 g 像两个圆圆的鸡蛋并排放着" }
                ],
                medium: [
                    { chinese: "天气", english: "weather", image: "https://picsum.photos/id/1056/800/600", memoryTip: "weather 里 ea 组合常见，天天问天气就容易熟悉它" },
                    { chinese: "雨天", english: "rainy", image: "https://picsum.photos/id/1040/800/600", memoryTip: "rain 加 y 就变成 rainy，看到下雨就想到它" },
                    { chinese: "晴朗的", english: "sunny", image: "https://picsum.photos/id/1059/800/600", memoryTip: "sun 加 ny，两个 n 像连着的阳光线条" },
                    { chinese: "星期一", english: "Monday", image: "https://picsum.photos/id/1060/800/600", memoryTip: "Mon 开头像 moon，想象周一的月亮帮助记忆" },
                    { chinese: "星期五", english: "Friday", image: "https://picsum.photos/id/1039/800/600", memoryTip: "Fri 像 free，周五快放松了，就容易记住 Friday" }
                ],
                hard: []
            },
            grade4: {
                easy: [
                    { chinese: "公园", english: "park", image: "https://picsum.photos/id/1043/800/600", memoryTip: "park 里的 ar 发音很明显，去公园时多读几次就能记住" },
                    { chinese: "河流", english: "river", image: "https://picsum.photos/id/1015/800/600", memoryTip: "river 前后的 r 像河两岸，中间 i-ve 像流动的水" },
                    { chinese: "山", english: "mountain", image: "https://picsum.photos/id/1036/800/600", memoryTip: "mountain 很长，分成 moun-tain 两部分读更容易" },
                    { chinese: "湖", english: "lake", image: "https://picsum.photos/id/1016/800/600", memoryTip: "lake 中 ake 很像熟悉的 make，借熟词记新词" },
                    { chinese: "村庄", english: "village", image: "https://picsum.photos/id/1069/800/600", memoryTip: "village 里 ll 像小路，想象村庄里的小路帮助记忆" }
                ],
                medium: [
                    { chinese: "参观", english: "visit", image: "https://picsum.photos/id/1041/800/600", memoryTip: "visit 是去看一看，vi-sit 分开读会更顺" },
                    { chinese: "旅行", english: "travel", image: "https://picsum.photos/id/1018/800/600", memoryTip: "travel 里的 tr 开头很有动作感，想到出发就能记住" },
                    { chinese: "地图", english: "map", image: "https://picsum.photos/id/42/800/600", memoryTip: "map 三个字母短小，拿地图时顺口拼读最容易记" },
                    { chinese: "车站", english: "station", image: "https://picsum.photos/id/1073/800/600", memoryTip: "station 可拆成 sta-tion，看到车站牌就能联想到拼写" },
                    { chinese: "左边", english: "left", image: "https://picsum.photos/id/1070/800/600", memoryTip: "left 和 lift 很像，记住 e 和 i 的区别就行" }
                ],
                hard: []
            },
            grade5: { 
                easy: [
                    { chinese: "电脑", english: "computer", image: "https://picsum.photos/id/180/800/600", memoryTip: "发音记忆：“肯普优特”，电脑的英文发音；拆分：com-pu-ter" },
                    { chinese: "电话", english: "telephone", image: "https://picsum.photos/id/160/800/600", memoryTip: "词根记忆：tele（远）+phone（声音），传递远方声音的设备" },
                    { chinese: "家庭作业", english: "homework", image: "https://picsum.photos/id/20/800/600", memoryTip: "组合记忆：home（家）+work（工作），在家做的工作就是作业" },
                    { chinese: "图书馆", english: "library", image: "https://picsum.photos/id/24/800/600", memoryTip: "联想记忆：图书馆有很多书（book），lib-rar-y" },
                    { chinese: "教室", english: "classroom", image: "https://picsum.photos/id/36/800/600", memoryTip: "组合记忆：class（班级）+room（房间），班级上课的房间" },
                    { chinese: "铅笔", english: "pencil", image: "https://picsum.photos/id/1025/800/600", memoryTip: "发音记忆：“潘修”，铅笔的发音；拼写：pen-cil，pen是笔" },
                    { chinese: "橡皮", english: "eraser", image: "https://picsum.photos/id/1025/800/600", memoryTip: "词根记忆：erase（擦除）+r，能擦除的东西" },
                    { chinese: "尺子", english: "ruler", image: "https://picsum.photos/id/1025/800/600", memoryTip: "词根记忆：rule（规则/尺子）+r，测量用的尺子" },
                    { chinese: "学校", english: "school", image: "https://picsum.photos/id/20/800/600", memoryTip: "联想记忆：s像校门，c像操场，h像教学楼，oo像窗户" },
                    { chinese: "老师", english: "teacher", image: "https://picsum.photos/id/1066/800/600", memoryTip: "词根记忆：teach（教）+er（人），教书的人" }
                ], 
                medium: [
                    { chinese: "博物馆", english: "museum", image: "https://picsum.photos/id/1019/800/600", memoryTip: "museum 里 muse 像音乐和艺术，和博物馆很配" },
                    { chinese: "医院", english: "hospital", image: "https://picsum.photos/id/1075/800/600", memoryTip: "hospital 可以拆成 hos-pi-tal，分段朗读更容易记" },
                    { chinese: "餐厅", english: "restaurant", image: "https://picsum.photos/id/292/800/600", memoryTip: "restaurant 字母多，先记 rest，再记 aurant 会轻松很多" },
                    { chinese: "周末", english: "weekend", image: "https://picsum.photos/id/1033/800/600", memoryTip: "week + end，周的结束就是周末" },
                    { chinese: "有时候", english: "sometimes", image: "https://picsum.photos/id/1035/800/600", memoryTip: "some + times，几个时间里有时会发生，就是 sometimes" }
                ], 
                hard: [] 
            },
            grade6: {
                easy: [
                    { chinese: "健康的", english: "healthy", image: "https://picsum.photos/id/433/800/600", memoryTip: "health 加 y 变成形容词，和健康有关都能联想到" },
                    { chinese: "锻炼", english: "exercise", image: "https://picsum.photos/id/1081/800/600", memoryTip: "exercise 比较长，先记 exer，再记 cise" },
                    { chinese: "早餐", english: "breakfast", image: "https://picsum.photos/id/1080/800/600", memoryTip: "break + fast，本义像打破空腹，正好对应早餐" },
                    { chinese: "午餐", english: "lunch", image: "https://picsum.photos/id/292/800/600", memoryTip: "lunch 读音很短，想象中午铃声响就记住它" },
                    { chinese: "晚餐", english: "dinner", image: "https://picsum.photos/id/488/800/600", memoryTip: "dinner 双 n 很醒目，晚餐时多念几次更好记" }
                ],
                medium: [
                    { chinese: "著名的", english: "famous", image: "https://picsum.photos/id/1067/800/600", memoryTip: "famous 和 familiar 都有 fa 开头，联想有名的人大家都熟悉" },
                    { chinese: "未来", english: "future", image: "https://picsum.photos/id/1047/800/600", memoryTip: "fu-ture 两段读，想到未来一步一步走来" },
                    { chinese: "梦想", english: "dream", image: "https://picsum.photos/id/1048/800/600", memoryTip: "dream 里的 ea 常见，做梦时把字母一起带进去" },
                    { chinese: "科学家", english: "scientist", image: "https://picsum.photos/id/1076/800/600", memoryTip: "science 加 t，做科学的人就是 scientist" },
                    { chinese: "宇航员", english: "astronaut", image: "https://picsum.photos/id/903/800/600", memoryTip: "astro 和星空有关，naut 和航行有关，合起来就是宇航员" }
                ],
                hard: []
            }
        };

        const defaultWordDatabase = window.WordDatabaseModule.database;

        // 2. 全局变量
        const STORAGE_KEY = 'englishWordStudyRecords';
        const MASTERY_STORAGE_KEY = 'englishWordMasteryRecords';
        const REVIEW_QUEUE_STORAGE_KEY = 'englishWordReviewQueue';
        const CUSTOM_WORD_DATABASE_KEY = 'englishWordCustomDatabase';
        const WORD_SOURCE_KEY = 'englishWordSource';
        const IMPORT_SHEET_MODE_KEY = 'englishWordImportSheetMode';
        const WORD_STAR_PROFILE_KEY = 'englishWordStarProfile';
        const REVIEW_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];
        const SLOW_RECALL_MS = 9000;
        const PREVIEW_PRAISE_HOLD_MS = 1700;
        const PREVIEW_SPELLING_PRAISE_HOLD_MS = 2100;
        const PREVIEW_WRONG_FEEDBACK_HOLD_MS = 1250;
        const GAME_PRAISE_HOLD_MS = 1800;
        const GAME_WRONG_FEEDBACK_HOLD_MS = 1300;
        const CELEBRATION_MESSAGE_HOLD_MS = 2400;
        const IMAGE_PREFETCH_AHEAD_COUNT = 4;
        const WORD_ASSET_PREFETCH_COUNT = 4;
        const WORD_ASSET_PREFETCH_DELAY_MS = 900;
        const OPTIMIZED_IMAGE_PREFIX = 'assets/images/optimized/';
        const TTS_WORD_RATE = 0.84;
        const TTS_PHRASE_RATE = 0.86;
        const TTS_SENTENCE_RATE = 0.92;
        const TTS_STORY_RATE = 0.9;
        const TTS_NATURAL_PAUSE_MS = 180;
        // 星星会来自学新词、挑战、阅读和间隔复习。阈值按“六年小学词库 + 多轮复习”
        // 设计，避免孩子学完一个年级后很快封顶，同时保留前期的成就反馈。
        const WORD_STAR_LEVELS = [
            { min: 0, title: '星词启航者' },
            { min: 120, title: '看图小侦探' },
            { min: 300, title: '听读小达人' },
            { min: 600, title: '回忆小勇士' },
            { min: 1000, title: '单词探险家' },
            { min: 1500, title: '句子小领航' },
            { min: 2200, title: '课本词汇官' },
            { min: 3000, title: '阅读冒险家' },
            { min: 4000, title: '复习规划师' },
            { min: 5200, title: '星词远征家' },
            { min: 6600, title: '英语小领航' },
            { min: 8000, title: '星词大师' }
        ];
        const QUESTION_TYPES = ['english_to_chinese', 'chinese_to_english', 'audio_to_english', 'spelling', 'cloze'];
        const PREVIEW_QUESTION_TYPES = ['image_to_english', 'audio_to_english', 'spelling', 'english_to_chinese'];
        const QUESTION_ERROR_TYPES = {
            image_to_english: 'meaning_error',
            english_to_chinese: 'meaning_error',
            chinese_to_english: 'meaning_error',
            audio_to_english: 'pronunciation_error',
            spelling: 'spelling_error',
            cloze: 'usage_error'
        };
        let currentGrade = 'grade6';
        let currentDifficulty = 'easy';
        let currentGradeText = ' ';
        let gameWords = [];
        let requestedWordCount = 10; // 用户设置的目标单词数量
        let customWordDatabase = null; // 存储自定义Excel单词库
        let wordAnswerRecords = []; // 记录每个单词的答题情况（首次是否答错）
        let currentPreviewIndex = 0; // 单卡片学习时的当前索引

        // 游戏状态变量
        let currentWordIndex = 0;
        let score = 0;
        let correctCount = 0;
        let wrongCount = 0;
        let firstWrongCount = 0; // 首次答错数量
        let timeLeft = 300; // 改为可配置的变量
        let timerInterval;
        let usedHints = 0;
        let gameStarted = false;
        let initialTime = 300; // 改为可配置的变量
        let currentRecord = null;
        let speechSequenceToken = 0;
        let preferredEnglishVoiceCache = {};
        let currentWordSource = 'default'; // 'default' 或 'custom'
        let currentLetterBank = [];
        let selectedLetterIndices = [];
        let currentDragSource = null;
        let selectedTargetSlot = null;
        let activeQuestion = null;
        let questionStartedAt = null;
        let currentPreviewStep = 'study';
        let previewQuizQuestions = [];
        let previewQuizIndex = 0;
        let previewQuizAnsweredCount = 0;
        let previewQuizQuestion = null;
        let previewQuizStartedAt = null;
        let previewQuizLetterBank = [];
        let previewQuizSelectedIndices = [];
        let previewQuizSubmitting = false;
        let previewRewardStreak = 0;
        let previewRewardStars = 0;
        let previewAutoAdvanceTimer = null;
        let previewAutoPronounceTimer = null;
        let previewWeakRoundActive = false;
        let readingSourceWords = [];
        let currentReadingStory = null;
        let readingAnsweredIds = new Set();
        let readingCorrectCount = 0;
        let readingStoryVariant = 0;
        let readingPerfectCelebrated = false;
        let wordStarProfile = loadWordStarProfile();

        // 3. DOM元素获取
        const startScreen = document.getElementById('start-screen');
        const readingScreen = document.getElementById('reading-screen');
        const excelUploadScreen = document.getElementById('excel-upload-screen');
        const previewScreen = document.getElementById('preview-screen');
        const gameScreen = document.getElementById('game-screen');
        const endScreen = document.getElementById('end-screen');
        const analysisScreen = document.getElementById('analysis-screen');
        const imageModal = document.getElementById('image-modal');
        
        // Excel上传相关元素
        const excelUpload = document.getElementById('excel-upload');
        const excelUploadStatus = document.getElementById('excel-upload-status');
        const useDefaultWords = document.getElementById('use-default-words');
        const useUploadedWords = document.getElementById('use-uploaded-words');
        const excelUploadBtn = document.getElementById('excel-upload-btn');
        const backToStartFromExcelBtn = document.getElementById('back-to-start-from-excel-btn');
        const wordSourceIndicator = document.getElementById('word-source-indicator');
        const sourceText = document.getElementById('source-text');
        const wordSourceStatus = document.getElementById('word-source-status');
        const currentSource = document.getElementById('current-source');
        const sourceIcon = document.getElementById('source-icon');
        
        // 自定义图片相关元素
        const closeModalBtn = document.getElementById('close-modal-btn');
        const cancelImageBtn = document.getElementById('cancel-image-btn');
        const saveImageBtn = document.getElementById('save-image-btn');
        const customImageUpload = document.getElementById('custom-image-upload');
        const imageUrlInput = document.getElementById('image-url-input');
        const modalWordName = document.getElementById('modal-word-name');
        const modalWordIndex = document.getElementById('modal-word-index');
        const cardEditImageBtn = document.getElementById('card-edit-image-btn');
        
        // 单卡片学习相关元素
        const singleWordCard = document.getElementById('single-word-card');
        const previewWordImage = document.getElementById('preview-word-image');
        const previewMissingImage = document.getElementById('preview-missing-image');
        const previewEnglishWord = document.getElementById('preview-english-word');
        const previewPhonetic = document.getElementById('preview-phonetic');
        const previewChineseWord = document.getElementById('preview-chinese-word');
        const previewStepHint = document.getElementById('preview-step-hint');
        const previewStudyStep = document.getElementById('preview-study-step');
        const previewHelperStep = document.getElementById('preview-helper-step');
        const previewQuizStep = document.getElementById('preview-quiz-step');
        const previewReadTip = document.getElementById('preview-read-tip');
        const previewWordAudioBtn = document.getElementById('preview-word-audio-btn');
        const previewSentenceAudioBtn = document.getElementById('preview-sentence-audio-btn');
        const previewExample = document.getElementById('preview-example');
        const previewExampleCn = document.getElementById('preview-example-cn');
        const previewChunkCard = document.getElementById('preview-chunk-card');
        const previewChunkTitle = document.getElementById('preview-chunk-title');
        const previewSyllableSplit = document.getElementById('preview-syllable-split');
        const previewMemoryCard = document.getElementById('preview-memory-card');
        const previewMemoryTip = document.getElementById('preview-memory-tip');
        const previewSpellingCard = document.getElementById('preview-spelling-card');
        const previewSpellingTip = document.getElementById('preview-spelling-tip');
        const previewHelperEmpty = document.getElementById('preview-helper-empty');
        const previewMainActionBtn = document.getElementById('preview-main-action-btn');
        const previewHelpActionBtn = document.getElementById('preview-help-action-btn');
        const previewStageItems = Array.from(document.querySelectorAll('[data-preview-stage]'));
        const previewQuizTitle = document.getElementById('preview-quiz-title');
        const previewQuizPrompt = document.getElementById('preview-quiz-prompt');
        const previewQuizHelper = document.getElementById('preview-quiz-helper');
        const previewQuizOptions = document.getElementById('preview-quiz-options');
        const previewQuizSpelling = document.getElementById('preview-quiz-spelling');
        const previewQuizSpellingPattern = document.getElementById('preview-quiz-spelling-pattern');
        const previewQuizAnswerSlots = document.getElementById('preview-quiz-answer-slots');
        const previewQuizLetterBankEl = document.getElementById('preview-quiz-letter-bank');
        const previewQuizTextInput = document.getElementById('preview-quiz-text-input');
        const previewQuizSubmitBtn = document.getElementById('preview-quiz-submit-btn');
        const previewQuizFeedback = document.getElementById('preview-quiz-feedback');
        const previewWordCount = document.getElementById('preview-word-count');
        const prevWordBtn = document.getElementById('prev-word-btn');
        const nextWordBtn = document.getElementById('next-word-btn');
        const cardPronounceBtn = document.getElementById('card-pronounce-btn');
        
        // 年级相关元素
        const gradeSelect = document.getElementById('grade-select');
        const previewGradeBadge = document.getElementById('preview-grade-badge');
        const gameGradeBadge = document.getElementById('game-grade-badge');
        const endGradeBadge = document.getElementById('end-grade-badge');
        
        // 数据分析相关元素
        const analysisBtn = document.getElementById('analysis-btn');
        const analysisFromGameBtn = document.getElementById('analysis-from-game-btn');
        const goToAnalysisBtn = document.getElementById('go-to-analysis-btn');
        const backToStartFromAnalysisBtn = document.getElementById('back-to-start-from-analysis-btn');
        const totalStudiesEl = document.getElementById('total-studies');
        const totalWordsCountEl = document.getElementById('total-words-count');
        const avgAccuracyEl = document.getElementById('avg-accuracy');
        const maxAccuracyEl = document.getElementById('max-accuracy');
        const weakWordsCountEl = document.getElementById('weak-words-count');
        const firstWrongWordsCountEl = document.getElementById('first-wrong-words-count');
        const recentRecordsEl = document.getElementById('recent-records');
        const noRecordsEl = document.getElementById('no-records');
        const weakWordsEl = document.getElementById('weak-words');
        const firstWrongWordsEl = document.getElementById('first-wrong-words');
        const noFirstWrongWordsEl = document.getElementById('no-first-wrong-words');
        const firstWrongCountEl = document.getElementById('first-wrong-count');
        const answerRecordEl = document.getElementById('answer-record');
        const recordTextEl = document.getElementById('record-text');
        const answerSlotsEl = document.getElementById('answer-slots');
        const letterBankEl = document.getElementById('letter-bank');
        const questionTitleEl = document.getElementById('question-title');
        const questionHelperEl = document.getElementById('question-helper');
        const activeRecallOptionsEl = document.getElementById('active-recall-options');
        const letterGameInstructionEl = document.getElementById('letter-game-instruction');
        const removeLetterBtn = document.getElementById('remove-letter-btn');
        const clearAnswerBtn = document.getElementById('clear-answer-btn');
        const shuffleLettersBtn = document.getElementById('shuffle-letters-btn');
        const celebrationLayer = document.getElementById('celebration-layer');
        const mascotMessageEl = document.getElementById('mascot-message');
        const rewardStarsEl = document.getElementById('reward-stars');
        const todayReviewSummaryEl = document.getElementById('today-review-summary');
        const startReviewBtn = document.getElementById('start-review-btn');
        const resultReviewPanel = document.getElementById('result-review-panel');
        const resultReviewSummaryEl = document.getElementById('result-review-summary');
        const resultReviewWordsEl = document.getElementById('result-review-words');
        const reviewWrongBtn = document.getElementById('review-wrong-btn');
        const readingBtn = document.getElementById('reading-btn');
        const refreshReadingBtn = document.getElementById('refresh-reading-btn');
        const backToStartFromReadingBtn = document.getElementById('back-to-start-from-reading-btn');
        const readingStartGameBtn = document.getElementById('reading-start-game-btn');
        const readingListenBtn = document.getElementById('reading-listen-btn');
        const readingTitleEl = document.getElementById('reading-title');
        const readingEmptyEl = document.getElementById('reading-empty');
        const readingContentEl = document.getElementById('reading-content');
        const readingTargetWordsEl = document.getElementById('reading-target-words');
        const readingStoryEl = document.getElementById('reading-story');
        const readingQuestionsListEl = document.getElementById('reading-questions-list');
        const readingClozeListEl = document.getElementById('reading-cloze-list');
        const readingSentenceBuilderEl = document.getElementById('reading-sentence-builder');
        const readingProgressSummaryEl = document.getElementById('reading-progress-summary');
        const readStoryBtn = document.getElementById('read-story-btn');
        const parentDailyReportEl = document.getElementById('parent-daily-report');

        // 4. 初始化函数
        function init() {
            syncViewportHeight();
            window.addEventListener('resize', syncViewportHeight, { passive: true });
            initLocalTtsVoices();
            // 绑定所有事件
            bindEvents();
            // 初始化年级信息
            updateGradeInfo();
            // 初始化学习设置
            initStudySettings();
            // 加载历史记录
            const existingRecords = loadStudyRecords();
            ensureMasteryFromHistory(existingRecords);
            renderTodayReviewEntry(existingRecords);
            loadCustomWordDatabase();
            // 初始化单词库（默认）
            initWordDatabase();
            // 初始化单词来源显示
            updateWordSourceDisplay();
            updateWordStarHud();
            window.addEventListener('scroll', syncReadingScrollState, { passive: true });
            document.addEventListener('click', handleDocumentClickForWordStarLevel);
            document.addEventListener('keydown', handleWordStarLevelKeydown);
            renderRewardStars();
            updateMascotMessage('welcome');
        }

        function syncViewportHeight() {
            document.documentElement.style.setProperty('--app-viewport-height', `${window.innerHeight}px`);
        }

        function initLocalTtsVoices() {
            if (!('speechSynthesis' in window)) return;
            preferredEnglishVoiceCache = {};
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => {
                preferredEnglishVoiceCache = {};
            };
        }

        // 5. 事件绑定
        function bindEvents() {
            // Excel上传页面相关事件
            excelUploadBtn.addEventListener('click', goToExcelUploadScreen);
            backToStartFromExcelBtn.addEventListener('click', goToStartScreen);
            if (useUploadedWords) {
                useUploadedWords.addEventListener('click', useUploadedWordDatabase);
            }
            
            // Excel上传处理事件
            excelUpload.addEventListener('change', function(e) {
                console.log('文件选择事件触发:', {
                    files: e.target.files,
                    fileCount: e.target.files.length
                });
                
                if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    console.log('选择的文件详情:', {
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        lastModified: new Date(file.lastModified).toLocaleString()
                    });
                    handleExcelUpload(e);
                } else {
                    console.log('文件选择被取消或失败');
                }
                
                // 重要：重置文件输入，避免相同文件无法重新选择
                setTimeout(() => {
                    excelUpload.value = '';
                    console.log('文件输入已重置');
                }, 100);
            });
            useDefaultWords.addEventListener('click', useDefaultWordDatabase);
            
            // 自定义图片事件
            cardEditImageBtn.addEventListener('click', () => {
                if (gameWords.length === 0) {
                    alert('请先选择单词库进行学习');
                    return;
                }
                openImageModal(currentPreviewIndex);
            });
            closeModalBtn.addEventListener('click', closeImageModal);
            cancelImageBtn.addEventListener('click', closeImageModal);
            saveImageBtn.addEventListener('click', saveCustomImage);
            customImageUpload.addEventListener('change', handleImageUpload);
            
            // 单卡片学习翻页事件
            prevWordBtn.addEventListener('click', showPreviousWord);
            nextWordBtn.addEventListener('click', showNextWord);
            // 只有拼写等输入题显示提交按钮；回车等同于点击该按钮。
            document.addEventListener('keydown', (e) => {
                if (previewScreen.classList.contains('screen-hidden')) return;

                if (e.key === 'Enter' && currentPreviewStep === 'quiz' && !e.isComposing) {
                    if (!previewQuizSubmitBtn.classList.contains('hidden') && !previewQuizSubmitBtn.disabled) {
                        e.preventDefault();
                        previewQuizSubmitBtn.click();
                    }
                    return;
                }

                if (e.key === 'ArrowLeft') {
                    showPreviousWord();
                } else if (e.key === 'ArrowRight') {
                    showNextWord();
                }
            });
            
            previewMainActionBtn.addEventListener('click', handlePreviewMainAction);
            previewHelpActionBtn.addEventListener('click', () => setPreviewStep('helper'));
            previewQuizSubmitBtn.addEventListener('click', submitPreviewCurrentAnswer);
            
            // 卡片发音按钮
            cardPronounceBtn.addEventListener('click', function() {
                if (gameWords.length > 0 && currentPreviewIndex < gameWords.length) {
                    const word = gameWords[currentPreviewIndex];
                    pronounceWord(word.english, getAudioUrlForWord(word));
                }
            });
            previewWordAudioBtn.addEventListener('click', function() {
                if (gameWords.length > 0 && currentPreviewIndex < gameWords.length) {
                    const word = gameWords[currentPreviewIndex];
                    pronounceWord(word.english, getAudioUrlForWord(word), previewWordAudioBtn, '🔊 听单词');
                }
            });
            previewSentenceAudioBtn.addEventListener('click', function() {
                if (gameWords.length > 0 && currentPreviewIndex < gameWords.length) {
                    const word = gameWords[currentPreviewIndex];
                    pronounceSentenceForWord(word);
                }
            });
            
            // 主页面按钮
            document.getElementById('learn-first-btn').addEventListener('click', learnFirst);
            document.getElementById('direct-game-btn').addEventListener('click', startDirectly);
            readingBtn.addEventListener('click', () => goToReadingScreen());
            refreshReadingBtn.addEventListener('click', () => {
                readingStoryVariant += 1;
                renderReadingPractice();
            });
            backToStartFromReadingBtn.addEventListener('click', goToStartScreen);
            readingStartGameBtn.addEventListener('click', startDirectly);
            readingListenBtn.addEventListener('click', pronounceCurrentStory);
            readingStoryEl.addEventListener('click', handleReadingKeywordToggle);
            readingStoryEl.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleReadingKeywordToggle(event);
                }
            });
            
            document.getElementById('back-to-start-from-preview-btn').addEventListener('click', goToStartScreen);
            
            // 游戏页面按钮
            document.getElementById('back-to-start-from-game-btn').addEventListener('click', goToStartScreen);
            document.getElementById('study-now-btn').addEventListener('click', () => {
                hideAllScreens();
                showPreviewScreen();
            });
            document.getElementById('submit-btn').addEventListener('click', checkAnswer);
            removeLetterBtn.addEventListener('click', removeLastLetter);
            clearAnswerBtn.addEventListener('click', clearSelectedLetters);
            shuffleLettersBtn.addEventListener('click', shuffleCurrentLetters);
            document.getElementById('hint-btn').addEventListener('click', showHint);
            
            // 结束页面按钮
            document.getElementById('restart-game-btn').addEventListener('click', () => {
                initGame(false);
                startGame();
            });
            document.getElementById('new-game-btn').addEventListener('click', () => {
                initGame(true);
                startGame();
            });
            startReviewBtn.addEventListener('click', startTodayReview);
            reviewWrongBtn.addEventListener('click', startWrongWordsReview);
            readStoryBtn.addEventListener('click', () => goToReadingScreen(gameWords));
            document.getElementById('back-to-study-btn').addEventListener('click', () => {
                hideAllScreens();
                showPreviewScreen();
            });
            const studyMoreBtn = document.getElementById('study-more-btn');
            if (studyMoreBtn) {
                studyMoreBtn.addEventListener('click', () => {
                    hideAllScreens();
                    showPreviewScreen();
                });
            }
            document.getElementById('back-to-start-from-end-btn').addEventListener('click', goToStartScreen);
            
            // 年级选择事件
            gradeSelect.addEventListener('change', updateGradeInfo);
            document.getElementById('difficulty').addEventListener('change', function() {
                currentDifficulty = this.value;
                updateCurrentSelectionDisplay();
            });
            
            // 数据分析相关事件
            analysisBtn.addEventListener('click', goToAnalysisScreen);
            analysisFromGameBtn.addEventListener('click', goToAnalysisScreen);
            goToAnalysisBtn.addEventListener('click', goToAnalysisScreen);
            backToStartFromAnalysisBtn.addEventListener('click', goToStartScreen);
            document.getElementById('word-star-level-btn')?.addEventListener('click', function(event) {
                event.stopPropagation();
                toggleWordStarLevelPanel();
            });

            document.getElementById('game-pronounce-btn').addEventListener('click', () => {
                if (gameWords.length > 0 && currentWordIndex < gameWords.length) {
                    pronounceWord(gameWords[currentWordIndex].english, getAudioUrlForWord(gameWords[currentWordIndex]));
                }
            });
            
            // 初始化当前选择显示
            updateCurrentSelectionDisplay();
            
            // 下载Excel模板功能
            document.getElementById('download-template-btn').addEventListener('click', function() {
                // 创建教材匹配版示例数据
                const templateData = [
                    window.ImportCore.TEMPLATE_HEADERS,
                    ['人民教育出版社（一年级起点）', '六年级', '上册', 'Unit 1', 'Lesson 1', 'P2', 2, 'soup', '汤', 'n.', 'food', '必会', 'easy', '否', 'soup.png', '六年级单词图片/6年级上/02 soup.png', '', '', '', '点一下声音，听准发音，再跟读一遍。', 'I drink hot soup.', '我喝热汤。', '', false, '想象一碗热汤正在冒香气。', '注意字母组合 ou。', 'scene;spelling', 's__p', 'image_to_english;audio_to_english;spelling', 'image_first', 'letter_bank', true, true, 0, '新词', '示例行'],
                    ['人民教育出版社（一年级起点）', '六年级', '上册', 'Unit 1', 'Lesson 1', 'P2', 5, 'the Summer Palace', '颐和园', 'proper n.', 'places / culture', '必会', 'hard', '是', 'the_summer_palace.png', '六年级单词图片/6年级上/05 the Summer Palace.png', '', '', '', '先听准每个词，再连起来跟读。', 'We visit the Summer Palace.', '我们参观颐和园。', 'the / Summer / Palace', true, '把名称和颐和园的地标画面连起来。', '三个词分开写，专名首字母大写。', 'image;phrase;spelling', '', 'meaning_to_word;audio_to_word;phrase_order', 'place', 'phrase_order', true, true, 0, '新词', '示例行']
                ];
                
                // 创建工作簿
                const ws = XLSX.utils.aoa_to_sheet(templateData);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "教材单词模板");
                
                // 下载文件
                XLSX.writeFile(wb, "小学英语教材单词导入模板.xlsx");
            });
        }

        function normalizeExcelHeader(header) {
            return window.ImportCore.normalizeHeader(header);
            return String(header || '').trim().replace(/\s+/g, '').toLowerCase();
        }

        function normalizeExcelRow(rawRow) {
            return window.ImportCore.normalizeRow(rawRow);
            const aliases = {
                textbook: ['教材版本', '版本', 'textbook', 'bookversion'],
                grade: ['年级', 'grade'],
                volume: ['册别', '上下册', '学期', 'volume', 'semester'],
                unit: ['unit', '单元'],
                lesson: ['lesson', '课时', '课次'],
                page: ['页码', 'page'],
                difficulty: ['难度', 'difficulty'],
                chinese: ['中文', '中文意思', '释义', 'chinese'],
                english: ['英文', '英语', '单词', 'english', 'word'],
                partOfSpeech: ['词性', 'partofspeech', 'pos'],
                topic: ['主题分类', '主题', 'topic', 'category'],
                curriculum: ['课标要求', '课标', '要求', 'curriculum'],
                image: ['图片链接', '图片', 'image', 'imageurl'],
                imageFileName: ['图片生成文件名', '图片文件名', 'imagefilename'],
                audio: ['发音链接', '音频链接', '发音', 'audio', 'audiourl'],
                sentenceAudio: ['例句音频', '句子音频', 'sentence_audio_url', 'sentenceaudio', 'sentenceaudiourl'],
                example: ['例句', 'example', 'sentence'],
                exampleCn: ['例句中文', '例句翻译', 'examplecn', 'sentencecn'],
                phonetic: ['标准发音/音标', '音标', 'phonetic', 'pronunciation'],
                readTip: ['读一读', '听一听', 'listen_tip_听一听', 'listentip听一听', 'listentip', 'listen_tip', 'readtip', 'read_tip'],
                chunkTip: ['拆一拆', 'chunk_tip_拆开记', 'chunktip拆开记', 'chunktip', 'chunk_tip'],
                optimizedExample: ['说一说_例句', '说一说例句', '说一说英文', 'example_sentence_跟着说', 'examplesentence跟着说', 'examplesentence', 'example_sentence'],
                optimizedExampleCn: ['说一说_中文', '说一说中文', 'examplesentencecn', 'example_sentence_cn'],
                optimizedMemoryTip: ['小窍门', '记忆小窍门', 'memory_tip_记忆小窍门', 'memorytip记忆小窍门', 'memory_tip', 'memorytip'],
                optimizedSpellingTip: ['写一写要注意', '拼写小秘密', 'spelling_secret_拼写小秘密', 'spellingsecret拼写小秘密', 'spelling_secret', 'spellingsecret', 'spelling_tip', 'spellingtip'],
                showChunkTip: ['是否显示拆开记', 'show_chunk_tip', 'showchunktip'],
                spellingTestMode: ['拼写题模式', 'spelling_test_mode', 'spellingtestmode'],
                testFlow: ['主动回忆题型', 'testflow', 'test_flow'],
                displayMode: ['展示模式', 'displaymode', 'display_mode'],
                spellingMode: ['拼写题提示模式', 'spellingmode', 'spelling_mode'],
                showChineseInLearning: ['初学显示中文', 'showchineseinlearning', 'show_chinese_in_learning'],
                hideChineseInReview: ['复习隐藏中文', 'hidechineseinreview', 'hide_chinese_in_review'],
                phonicsTip: ['发音规律/自然拼读提示', '自然拼读', '自然拼读提示', 'phonics', 'phonicstip'],
                syllableSplit: ['词块/音节拆分', '音节拆分', '词块拆分', 'syllablesplit', 'chunks'],
                spellingTip: ['字母图像/拼写提示', '拼写提示', '字母图像', 'spellingtip'],
                memoryHook: ['趣味记忆钩子', '趣味记忆', '记忆钩子', 'memoryhook'],
                letterImageStory: ['字母图像故事', 'letterimagestory'],
                testMethods: ['主要测试方式', '测试方式', 'testmethods'],
                masteryLevel: ['初始复习等级', '复习等级', '掌握等级', 'masterylevel'],
                memoryTip: ['记忆方法', '记忆提示', '记忆技巧', 'memorytip']
            };
            const normalizedRow = {};
            Object.entries(rawRow).forEach(([header, value]) => {
                const normalizedHeader = normalizeExcelHeader(header);
                Object.entries(aliases).some(([field, fieldAliases]) => {
                    if (fieldAliases.map(normalizeExcelHeader).includes(normalizedHeader)) {
                        normalizedRow[field] = value;
                        return true;
                    }
                    return false;
                });
            });
            return normalizedRow;
        }

        function getImportWorksheet(workbook) {
            const firstSheetName = workbook.SheetNames[0];
            localStorage.setItem(IMPORT_SHEET_MODE_KEY, 'first_sheet');
            return {
                sheetName: firstSheetName,
                worksheet: workbook.Sheets[firstSheetName]
            };
        }

        function saveCustomWordDatabase() {
            localStorage.setItem(CUSTOM_WORD_DATABASE_KEY, JSON.stringify(customWordDatabase || null));
            localStorage.setItem(WORD_SOURCE_KEY, currentWordSource);
        }

        function loadCustomWordDatabase() {
            try {
                const savedSource = localStorage.getItem(WORD_SOURCE_KEY);
                const savedDatabase = JSON.parse(localStorage.getItem(CUSTOM_WORD_DATABASE_KEY) || 'null');
                if (savedSource === 'custom' && savedDatabase) {
                    customWordDatabase = savedDatabase;
                    currentWordSource = 'custom';
                }
            } catch (error) {
                console.warn('本地上传词库读取失败，已使用默认词库:', error);
                customWordDatabase = null;
                currentWordSource = 'default';
            }
        }

        function normalizeGradeKey(rawGrade) {
            return window.ImportCore.gradeKey(rawGrade);
            const value = String(rawGrade || '').trim().toLowerCase();
            const chineseGradeMap = {
                '一年级': 'grade1',
                '二年级': 'grade2',
                '三年级': 'grade3',
                '四年级': 'grade4',
                '五年级': 'grade5',
                '六年级': 'grade6'
            };
            if (chineseGradeMap[value]) {
                return chineseGradeMap[value];
            }
            const digitMatch = value.match(/[1-6]/);
            return digitMatch ? `grade${digitMatch[0]}` : '';
        }

        function normalizeDifficultyKey(rawDifficulty) {
            return window.ImportCore.difficultyKey(rawDifficulty);
            const value = String(rawDifficulty || '').trim().toLowerCase();
            const difficultyMap = {
                easy: 'easy',
                e: 'easy',
                '基础': 'easy',
                '基础难度': 'easy',
                '认识单词': 'easy',
                medium: 'medium',
                med: 'medium',
                m: 'medium',
                normal: 'medium',
                '标准': 'medium',
                '进阶': 'medium',
                '进阶难度': 'medium',
                '会写单词': 'medium',
                hard: 'hard',
                h: 'hard',
                '挑战': 'hard',
                '挑战难度': 'hard',
                '熟练运用': 'hard'
            };
            return difficultyMap[value] || value;
        }

        function parseBooleanValue(value, defaultValue = false) {
            return window.ImportCore.booleanValue(value, defaultValue);
            const normalized = String(value ?? '').trim().toLowerCase();
            if (!normalized) return defaultValue;
            return ['true', '1', 'yes', 'y', '是'].includes(normalized);
        }

        function normalizeMode(value) {
            return String(value || '').trim();
        }

        function validateImportedRows(rows) {
            return window.ImportCore.validateRows(rows);
            const allowedDisplayModes = new Set(['image_first', 'abstract_scene', 'place', 'phrase', 'culture']);
            const allowedSpellingModes = new Set(['letter_bank', 'partial_blank', 'phrase_order', 'full_blank']);
            const snakeCasePngPattern = /^[a-z0-9]+(?:_[a-z0-9]+)*\.png$/;
            const bannedExamplePattern = /\bI can see\s+(vacation|pity)\b|^Let's\s+(the\s+)?[A-Z]/i;
            const errors = [];

            rows.forEach((item) => {
                const row = item.rowNumber || '?';
                const requiredFields = [
                    ['english', '英文'],
                    ['chinese', '中文'],
                    ['unit', 'Unit'],
                    ['partOfSpeech', '词性'],
                    ['readTip', '读一读'],
                    ['optimizedExample', '说一说_例句'],
                    ['optimizedMemoryTip', '小窍门'],
                    ['optimizedSpellingTip', '写一写要注意']
                ];

                requiredFields.forEach(([field, label]) => {
                    if (!String(item[field] || '').trim()) {
                        errors.push(`第${row}行缺少「${label}」`);
                    }
                });

                const shouldShowChunkTip = parseBooleanValue(item.showChunkTip, true);
                if (shouldShowChunkTip && !String(item.chunkTip || item.syllableSplit || '').trim()) {
                    errors.push(`第${row}行缺少「拆一拆」；短词如不需要拆分，请将「是否显示拆开记」设为 false`);
                }

                const imageUrl = String(item.image || '').trim();
                const imageFileName = String(item.imageFileName || '').trim();
                if (!imageUrl && !snakeCasePngPattern.test(imageFileName)) {
                    errors.push(`第${row}行图片链接为空时，「图片生成文件名」必须是 snake_case.png`);
                }

                const example = String(item.optimizedExample || item.example || '').trim();
                if (bannedExamplePattern.test(example)) {
                    errors.push(`第${row}行例句不自然：${example}`);
                }

                const displayMode = normalizeMode(item.displayMode);
                if (displayMode && !allowedDisplayModes.has(displayMode)) {
                    errors.push(`第${row}行展示模式无效：${displayMode}`);
                }

                const spellingMode = normalizeMode(item.spellingTestMode || item.spellingMode);
                if (spellingMode && !allowedSpellingModes.has(spellingMode)) {
                    errors.push(`第${row}行拼写题提示模式无效：${spellingMode}`);
                }
            });

            return errors;
        }

        function normalizeWordItem(item) {
            const english = String(item.english || '').trim();
            const chinese = String(item.chinese || '').trim();
            const readTip = String(item.readTip || item.phonicsTip || '').trim();
            const chunkTip = String(item.chunkTip || item.syllableSplit || '').trim();
            const example = String(item.optimizedExample || item.example || '').trim();
            const exampleCn = String(item.optimizedExampleCn || item.exampleCn || '').trim();
            const memoryHook = String(item.optimizedMemoryTip || item.memoryHook || item.memoryTip || '').trim();
            const spellingTip = String(item.optimizedSpellingTip || item.spellingTip || '').trim();
            const memoryStrategy = String(item.memoryStrategy || '').trim();
            const spellingPattern = String(item.spellingPattern || '').trim();
            const imageUrl = String(item.image || '').trim();
            const audioUrl = String(item.audio || '').trim();
            const sentenceAudioUrl = String(item.sentenceAudio || '').trim();
            const masteryLevel = Number.parseInt(item.masteryLevel, 10);

            return {
                chinese,
                english,
                word_id: `${normalizeWordForGame(english)}-${String(item.unit || '').trim()}-${String(item.page || '').trim()}`.replace(/-+$/g, ''),
                image: imageUrl,
                image_url: imageUrl,
                image_file_name: String(item.imageFileName || '').trim(),
                audio: audioUrl,
                audio_url: audioUrl,
                sentence_audio_url: sentenceAudioUrl,
                phonetic: String(item.phonetic || '').trim(),
                listen_tip: readTip,
                read_tip: readTip,
                chunk_tip: chunkTip,
                example: example,
                example_sentence: example,
                example_sentence_cn: exampleCn,
                phonics_tip: readTip,
                syllable_split: chunkTip,
                spelling_tip: spellingTip,
                memory_hook: memoryHook,
                letter_image_story: String(item.letterImageStory || spellingTip || memoryHook || '').trim(),
                memoryTip: memoryHook || readTip || createKidFriendlyMemoryTip({ english, chinese }),
                test_methods: String(item.testFlow || item.testMethods || '').trim(),
                test_flow: String(item.testFlow || item.testMethods || '').trim(),
                display_mode: normalizeMode(item.displayMode) || 'image_first',
                spelling_mode: normalizeMode(item.spellingTestMode || item.spellingMode) || 'letter_bank',
                spelling_test_mode: normalizeMode(item.spellingTestMode || item.spellingMode) || 'letter_bank',
                spelling_secret: spellingTip,
                memory_strategy: memoryStrategy,
                spelling_pattern: spellingPattern,
                show_chunk_tip: parseBooleanValue(item.showChunkTip, false),
                show_chinese_in_learning: parseBooleanValue(item.showChineseInLearning, true),
                hide_chinese_in_review: parseBooleanValue(item.hideChineseInReview, true),
                mastery_level: Number.isFinite(masteryLevel) ? Math.max(0, Math.min(5, masteryLevel)) : 0,
                next_review_at: '',
                review_count: 0,
                correct_count: 0,
                wrong_count: 0,
                error_types: [],
                textbook: item.textbook || '',
                grade: normalizeGradeKey(item.grade),
                difficulty: normalizeDifficultyKey(item.difficulty),
                volume: item.volume || '',
                unit: item.unit || '',
                lesson: item.lesson || '',
                page: item.page || '',
                partOfSpeech: item.partOfSpeech || '',
                topic: item.topic || '',
                curriculum: item.curriculum || ''
            };
        }

        // 处理Excel上传
        function handleExcelUpload(event) {
            const file = event.target.files[0];
            if (!file) {
                console.log('没有选择文件');
                return;
            }
            
            console.log('开始处理Excel文件:', {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: new Date(file.lastModified).toLocaleString()
            });
            
            // 检查文件大小（限制10MB）
            if (file.size > 10 * 1024 * 1024) {
                excelUploadStatus.textContent = '⚠️ 文件过大，请选择小于10MB的Excel文件';
                excelUploadStatus.className = 'mt-4 p-4 rounded-lg text-sm font-medium bg-yellow-50 border border-yellow-200 text-yellow-800';
                excelUploadStatus.classList.remove('hidden');
                return;
            }
            
            // 更可靠的文件类型检查
            const fileName = file.name.toLowerCase();
            const isExcelFile = fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || 
                               file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                               file.type === 'application/vnd.ms-excel';
            
            if (!isExcelFile) {
                console.log('文件类型检查失败:', {
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size
                });
                excelUploadStatus.textContent = '⚠️ 请上传Excel文件（.xlsx或.xls格式）';
                excelUploadStatus.className = 'mt-4 p-4 rounded-lg text-sm font-medium bg-yellow-50 border border-yellow-200 text-yellow-800';
                excelUploadStatus.classList.remove('hidden');
                return;
            }
            
            // 更新当前选择显示
            updateCurrentSelectionDisplay();
            
            // 显示上传状态
            excelUploadStatus.textContent = '⏳ 正在读取文件...';
            excelUploadStatus.className = 'mt-4 p-4 rounded-lg text-sm font-medium bg-blue-50 border border-blue-200 text-blue-800';
            excelUploadStatus.classList.remove('hidden');
            
            // 处理完成后重置文件输入
            const resetFileInput = () => {
                setTimeout(() => {
                    excelUpload.value = '';
                    console.log('文件输入已重置（处理完成后）');
                }, 1000);
            };
            
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    console.log('文件读取成功，开始解析...');
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    
                    console.log('工作表列表:', workbook.SheetNames);
                    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
                        throw new Error('Excel文件中没有可读取的工作表');
                    }
                    
                    const { sheetName: firstSheetName, worksheet } = getImportWorksheet(workbook);
                    console.log('导入使用第一个sheet:', firstSheetName);
                    
                    // 转换为JSON，按表头名称识别字段，兼容新版教材模板和旧版六列模板
                    const rawJsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
                    const jsonData = rawJsonData.map((row, index) => ({
                        ...normalizeExcelRow(row),
                        rowNumber: index + 2
                    }));
                    
                    console.log('原始数据:', jsonData);
                    
                    const validationErrors = validateImportedRows(jsonData);
                    if (validationErrors.length > 0) {
                        const previewErrors = validationErrors.slice(0, 20).join('\n');
                        const moreText = validationErrors.length > 20 ? `\n...还有 ${validationErrors.length - 20} 个问题` : '';
                        throw new Error(`导入校验未通过：\n${previewErrors}${moreText}`);
                    }

                    // 验证数据格式
                    const validData = jsonData.filter((item, index) => {
                        const isValid = item.grade && item.difficulty && item.chinese && item.english && item.unit && item.partOfSpeech;
                        if (!isValid) {
                            console.log(`第${index + 2}行无效数据:`, item);
                            console.log(`缺失字段: 年级=${item.grade}, 难度=${item.difficulty}, Unit=${item.unit}, 词性=${item.partOfSpeech}, 中文=${item.chinese}, 英文=${item.english}`);
                        }
                        return isValid;
                    });
                    
                    console.log('有效数据数量:', validData.length);
                    
                    if (validData.length === 0) {
                        let errorMsg = 'Excel文件中无有效单词数据，请检查以下要求：\n\n';
                        errorMsg += '1. 确保Excel文件包含必填表头：年级、难度、中文、英文\n';
                        errorMsg += '2. 表头必须位于第一行\n';
                        errorMsg += '3. 年级列填写数字（1-6）\n';
                        errorMsg += '4. 难度列填写英文（easy/medium/hard）\n';
                        errorMsg += '5. 中文和英文列不能为空\n\n';
                        errorMsg += '建议先下载新版教材单词模板查看正确格式。';
                        throw new Error(errorMsg);
                    }
                    
                    // 构建自定义单词数据库
                    customWordDatabase = {};
                    let totalProcessed = 0;
                    let skippedItems = 0;
                    
                    validData.forEach((item, index) => {
                        try {
                            const gradeKey = normalizeGradeKey(item.grade);
                            if (!gradeKey) {
                                console.log(`跳过第${index+1}行：无效年级值 ${item.grade}`);
                                skippedItems++;
                                return;
                            }
                            if (!customWordDatabase[gradeKey]) {
                                customWordDatabase[gradeKey] = { easy: [], medium: [], hard: [] };
                            }
                            const difficultyKey = normalizeDifficultyKey(item.difficulty);
                            if (!['easy', 'medium', 'hard'].includes(difficultyKey)) {
                                console.log(`跳过第${index+1}行：无效难度值 ${item.difficulty}`);
                                skippedItems++;
                                return;
                            }
                            customWordDatabase[gradeKey][difficultyKey].push(normalizeWordItem(item));
                            totalProcessed++;
                        } catch (err) {
                            console.log(`处理第${index+1}行时出错:`, err);
                            skippedItems++;
                        }
                    });
                    
                    console.log('构建的数据库:', customWordDatabase);
                    console.log(`总共处理: ${totalProcessed}, 跳过: ${skippedItems}`);
                    
                    // 显示上传成功信息，包含所有年级和难度的统计
                    let totalWords = 0;
                    let gradeStats = {};
                    
                    Object.keys(customWordDatabase).forEach(grade => {
                        gradeStats[grade] = { easy: 0, medium: 0, hard: 0, total: 0 };
                        ['easy', 'medium', 'hard'].forEach(diff => {
                            const count = customWordDatabase[grade][diff].length;
                            gradeStats[grade][diff] = count;
                            gradeStats[grade].total += count;
                            totalWords += count;
                        });
                    });
                    
                    console.log('上传统计:', gradeStats);
                    console.log('总单词数:', totalWords);
                    
                    // 更新单词来源
                    currentWordSource = 'custom';
                    saveCustomWordDatabase();
                    updateWordSourceDisplay();
                    
                    // 提示上传成功，显示详细的年级和难度统计
                    let successMessage = `✅ 上传成功！系统已记住：每次导入都提取第一个sheet。\n本次读取sheet：${firstSheetName}\n共导入 ${totalWords} 个单词\n\n`;
                    successMessage += '各年级分布：\n';
                    
                    Object.keys(gradeStats).forEach(grade => {
                        if (gradeStats[grade].total > 0) {
                            const gradeNum = grade.replace('grade', '');
                            successMessage += `${gradeNum}年级：${gradeStats[grade].total}个（基础${gradeStats[grade].easy}，进阶${gradeStats[grade].medium}，挑战${gradeStats[grade].hard}）\n`;
                        }
                    });
                    
                    successMessage += '\n现在可以根据首页选择的年级和难度自动匹配相应的单词！';
                    
                    excelUploadStatus.textContent = successMessage;
                excelUploadStatus.className = 'mt-4 p-4 rounded-lg text-sm font-medium bg-green-50 border border-green-200 text-green-800 whitespace-pre-line';
                excelUploadStatus.classList.remove('hidden');
                
                // 成功处理后重置文件输入
                resetFileInput();
                    
                    // 初始化单词库
                    initWordDatabase();
                    
                } catch (error) {
            console.error('Excel处理错误:', error);
            excelUploadStatus.textContent = `❌ 上传失败：${error.message}`;
            excelUploadStatus.className = 'mt-4 p-4 rounded-lg text-sm font-medium bg-red-50 border border-red-200 text-red-800';
            excelUploadStatus.classList.remove('hidden');
            
            // 错误处理后也重置文件输入
            resetFileInput();
        }
            };
            
            reader.onerror = function(e) {
                console.error('文件读取错误:', e);
                excelUploadStatus.textContent = '❌ 文件读取失败，请重试';
                excelUploadStatus.className = 'mt-4 p-4 rounded-lg text-sm font-medium bg-red-50 border border-red-200 text-red-800';
                excelUploadStatus.classList.remove('hidden');
                
                // 读取错误后也重置文件输入
                resetFileInput();
            };
            
            reader.readAsArrayBuffer(file);
        }

        // 使用默认单词库
        function useDefaultWordDatabase() {
            currentWordSource = 'default';
            saveCustomWordDatabase();
            updateWordSourceDisplay();
            initWordDatabase();
            excelUploadStatus.textContent = '✅ 已切换到默认单词库';
            excelUploadStatus.className = 'mt-4 p-4 rounded-lg text-sm font-medium bg-blue-50 border border-blue-200 text-blue-800';
            excelUploadStatus.classList.remove('hidden');
            excelUpload.value = ''; // 清空上传文件
        }

        function useUploadedWordDatabase() {
            const savedDatabase = JSON.parse(localStorage.getItem(CUSTOM_WORD_DATABASE_KEY) || 'null');
            if (!savedDatabase) {
                excelUploadStatus.textContent = '⚠️ 还没有已导入词库，请先上传 Excel 单词表。';
                excelUploadStatus.className = 'mt-4 p-4 rounded-lg text-sm font-medium bg-yellow-50 border border-yellow-200 text-yellow-800';
                excelUploadStatus.classList.remove('hidden');
                return;
            }

            customWordDatabase = savedDatabase;
            currentWordSource = 'custom';
            saveCustomWordDatabase();
            updateWordSourceDisplay();
            initWordDatabase();
            excelUploadStatus.textContent = '✅ 已切换到已导入词库，可回首页按年级和难度学习。';
            excelUploadStatus.className = 'mt-4 p-4 rounded-lg text-sm font-medium bg-green-50 border border-green-200 text-green-800';
            excelUploadStatus.classList.remove('hidden');
        }

        // 更新单词来源显示
        function updateWordSourceDisplay() {
            if (currentWordSource === 'custom') {
                sourceText.textContent = '本地上传单词库';
                currentSource.textContent = '本地上传单词库';
                sourceIcon.className = 'fa fa-upload text-primary text-xl mr-3';
                wordSourceIndicator.classList.remove('hidden');
                wordSourceIndicator.classList.add('flex');
            } else {
                sourceText.textContent = '默认单词库';
                currentSource.textContent = '默认单词库';
                sourceIcon.className = 'fa fa-database text-primary text-xl mr-3';
                wordSourceIndicator.classList.remove('hidden');
                wordSourceIndicator.classList.add('flex');
            }
        }

        // 初始化单词库
        function initWordDatabase() {
            // 根据是否有自定义库选择使用哪个库
            if (currentWordSource === 'custom' && customWordDatabase) {
                window.wordDatabase = customWordDatabase;
            } else {
                window.wordDatabase = defaultWordDatabase;
            }
        }

        function escapeSvgText(text) {
            return String(text)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function getWordEmoji(word) {
            const key = `${word.english} ${word.chinese}`.toLowerCase();
            const emojiMap = [
                { match: ['apple', '苹果'], emoji: '🍎' },
                { match: ['banana', '香蕉'], emoji: '🍌' },
                { match: ['cat', '猫'], emoji: '🐱' },
                { match: ['dog', '狗'], emoji: '🐶' },
                { match: ['book', '书'], emoji: '📘' },
                { match: ['pen', '铅笔', '笔'], emoji: '✏️' },
                { match: ['school', 'teacher', 'student', '学校', '老师', '学生'], emoji: '🏫' },
                { match: ['friend', '家庭', 'family'], emoji: '👨‍👩‍👧' },
                { match: ['fruit', 'bread', 'milk', 'water', 'egg', '水果', '面包', '牛奶', '水', '鸡蛋'], emoji: '🍽️' },
                { match: ['weather', 'rainy', 'sunny', '天气', '雨天', '晴朗'], emoji: '🌦️' },
                { match: ['weekend', '周末'], emoji: '🗓️' },
                { match: ['vacation', 'travel', '旅行', '假期'], emoji: '🧳' },
                { match: ['garden', 'flower', '花园', '花'], emoji: '🌷' },
                { match: ['soup', 'hot pot', 'lunch', 'dinner', 'breakfast', '汤', '火锅'], emoji: '🥣' },
                { match: ['park', 'river', 'mountain', 'lake', 'village', '公园', '河流', '山', '湖', '村庄'], emoji: '🏞️' },
                { match: ['computer', 'telephone', 'museum', 'hospital', 'restaurant', '电脑', '电话', '博物馆', '医院', '餐厅'], emoji: '🏙️' },
                { match: ['homework', 'library', 'classroom', '图书馆', '教室', '作业'], emoji: '📚' },
                { match: ['healthy', 'exercise', 'breakfast', 'lunch', 'dinner', '健康', '锻炼', '早餐', '午餐', '晚餐'], emoji: '💪' },
                { match: ['future', 'dream', 'scientist', 'astronaut', '未来', '梦想', '科学家', '宇航员'], emoji: '🚀' }
            ];

            const matched = emojiMap.find(item => item.match.some(keyword => key.includes(keyword)));
            return matched ? matched.emoji : '🖼️';
        }

        function getIllustrationPalette(word) {
            const key = `${word.english} ${word.chinese}`.toLowerCase();
            if (key.includes('apple') || key.includes('红') || key.includes('水果')) {
                return ['#fff1f2', '#fecdd3', '#fb7185'];
            }
            if (key.includes('water') || key.includes('river') || key.includes('lake') || key.includes('blue')) {
                return ['#eff6ff', '#bfdbfe', '#60a5fa'];
            }
            if (key.includes('school') || key.includes('teacher') || key.includes('student')) {
                return ['#eef2ff', '#c7d2fe', '#6366f1'];
            }
            if (key.includes('healthy') || key.includes('exercise')) {
                return ['#ecfdf5', '#a7f3d0', '#10b981'];
            }
            if (key.includes('future') || key.includes('astronaut')) {
                return ['#f5f3ff', '#ddd6fe', '#8b5cf6'];
            }
            return ['#fff7ed', '#fed7aa', '#f59e0b'];
        }

        function createWordIllustration(word) {
            const [bg1, bg2, accent] = getIllustrationPalette(word);
            const emoji = escapeSvgText(getWordEmoji(word));
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
                    <defs>
                        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0%" stop-color="${bg1}" />
                            <stop offset="100%" stop-color="${bg2}" />
                        </linearGradient>
                    </defs>
                    <rect width="800" height="600" rx="36" fill="url(#bg)" />
                    <circle cx="145" cy="118" r="68" fill="${accent}" opacity="0.16" />
                    <circle cx="665" cy="132" r="82" fill="${accent}" opacity="0.12" />
                    <circle cx="692" cy="486" r="96" fill="${accent}" opacity="0.1" />
                    <rect x="138" y="124" width="524" height="352" rx="42" fill="white" opacity="0.9" />
                    <text x="400" y="332" text-anchor="middle" font-size="162"> ${emoji} </text>
                </svg>
            `;

            return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
        }

        function shouldUseIllustration(imageUrl) {
            if (!imageUrl || !imageUrl.trim()) {
                return true;
            }
            return imageUrl.includes('picsum.photos') || imageUrl.includes('via.placeholder.com');
        }

        function resolveWordImage(word) {
            const imageUrl = word.image_url || word.image;
            return shouldUseIllustration(imageUrl) ? '' : imageUrl;
        }

        function getOptimizedImageCandidate(imageUrl) {
            const normalizedUrl = String(imageUrl || '').trim();
            if (!normalizedUrl || /^(https?:|data:|blob:|file:)/i.test(normalizedUrl) || normalizedUrl.startsWith('/')) {
                return '';
            }

            let relativePath = normalizedUrl.replace(/^\.\//, '');
            if (/^6年级[上下]\//.test(relativePath)) {
                relativePath = `六年级单词图片/${relativePath}`;
            }

            if (!relativePath.startsWith('六年级单词图片/') || !/\.(?:png|jpg|jpeg)$/i.test(relativePath)) {
                return '';
            }

            return `${OPTIMIZED_IMAGE_PREFIX}${relativePath.replace(/\.(?:png|jpg|jpeg)$/i, '.webp')}`;
        }

        function getWordImageCandidates(word) {
            const imageUrl = resolveWordImage(word);
            if (!imageUrl) {
                return [];
            }

            const normalizedUrl = String(imageUrl).trim();
            if (/^(https?:|data:|blob:|file:)/i.test(normalizedUrl) || normalizedUrl.startsWith('/')) {
                return [normalizedUrl];
            }

            const optimizedCandidate = getOptimizedImageCandidate(normalizedUrl);
            const candidates = optimizedCandidate ? [optimizedCandidate, normalizedUrl] : [normalizedUrl];
            const withoutLeadingDot = normalizedUrl.replace(/^\.\//, '');
            if (withoutLeadingDot !== normalizedUrl) {
                candidates.push(withoutLeadingDot);
            }
            if (/^6年级[上下]\//.test(withoutLeadingDot)) {
                candidates.push(`六年级单词图片/${withoutLeadingDot}`);
            }
            if (/^一年级/.test(withoutLeadingDot) || /^IMG_/i.test(withoutLeadingDot)) {
                candidates.push(`一年级单词图片/${withoutLeadingDot}`);
            }

            return [...new Set(candidates)];
        }

        function canPrefetchUrl(url) {
            const text = String(url || '').trim();
            if (!text || /^(data:|blob:|file:)/i.test(text)) return false;
            if (/^https?:\/\//i.test(text)) {
                try {
                    return new URL(text).origin === window.location.origin;
                } catch (error) {
                    return false;
                }
            }
            return true;
        }

        function runWhenBrowserIdle(callback, delay = WORD_ASSET_PREFETCH_DELAY_MS) {
            if (typeof callback !== 'function') return;
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(callback, { timeout: Math.max(1200, delay + 800) });
                return;
            }
            window.setTimeout(callback, delay);
        }

        function preloadUrlsWithServiceWorker(urls, options = {}) {
            const uniqueUrls = [...new Set((urls || []).filter(canPrefetchUrl))];
            if (uniqueUrls.length === 0 || !('serviceWorker' in navigator)) return;

            const sendMessage = () => {
                const message = { type: 'CACHE_WORD_ASSETS', urls: uniqueUrls };
                if (navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage(message);
                    return;
                }

                navigator.serviceWorker.ready
                    .then((registration) => {
                        const worker = registration.active || registration.waiting || registration.installing;
                        worker?.postMessage(message);
                    })
                    .catch(() => {});
            };

            if (options.defer) {
                runWhenBrowserIdle(sendMessage, options.delay);
            } else {
                sendMessage();
            }
        }

        function getWordAssetUrls(word) {
            return [
                ...getWordImageCandidates(word),
                getAudioUrlForWord(word),
                getSentenceAudioUrlForWord(word)
            ].filter(Boolean);
        }

        function loadImageWithFallback(imgEl, candidates, onMissing) {
            let index = 0;
            imgEl.loading = imgEl.loading || 'lazy';
            imgEl.decoding = imgEl.decoding || 'async';
            const tryNext = () => {
                if (index >= candidates.length) {
                    imgEl.removeAttribute('src');
                    onMissing?.();
                    return;
                }
                imgEl.src = candidates[index];
                index += 1;
            };

            imgEl.onerror = tryNext;
            imgEl.onload = () => {
                imgEl.onerror = null;
            };
            tryNext();
        }

        function preloadImageCandidates(candidates) {
            (candidates || []).forEach(src => {
                if (!src || /^data:/i.test(src)) return;
                const image = new Image();
                image.decoding = 'async';
                image.src = src;
            });
        }

        function preloadWordImages(words, startIndex = 0, count = IMAGE_PREFETCH_AHEAD_COUNT, options = {}) {
            if (!Array.isArray(words) || words.length === 0) return;
            const start = Math.max(0, Number(startIndex) || 0);
            const end = Math.min(words.length, start + Math.max(1, Number(count) || IMAGE_PREFETCH_AHEAD_COUNT));
            const urls = [];
            for (let index = start; index < end; index++) {
                const imageCandidates = getWordImageCandidates(words[index]);
                urls.push(...imageCandidates);
                if (options.immediateImages !== false) {
                    preloadImageCandidates(imageCandidates);
                }
            }
            preloadUrlsWithServiceWorker(urls, options);
        }

        function preloadWordAssets(words, startIndex = 0, count = WORD_ASSET_PREFETCH_COUNT, options = {}) {
            if (!Array.isArray(words) || words.length === 0) return;
            const start = Math.max(0, Number(startIndex) || 0);
            const end = Math.min(words.length, start + Math.max(1, Number(count) || WORD_ASSET_PREFETCH_COUNT));
            const urls = [];
            for (let index = start; index < end; index++) {
                const word = words[index];
                const imageCandidates = getWordImageCandidates(word);
                if (options.immediateImages !== false) {
                    preloadImageCandidates(imageCandidates);
                }
                urls.push(...getWordAssetUrls(word));
            }
            preloadUrlsWithServiceWorker(urls, options);
        }

        function scheduleWordAssetPreload(words, startIndex = 0, count = WORD_ASSET_PREFETCH_COUNT) {
            runWhenBrowserIdle(() => {
                preloadWordAssets(words, startIndex, count, {
                    defer: true,
                    immediateImages: false,
                    delay: 300
                });
            });
        }

        function normalizeWordForGame(text) {
            return window.GameCore.normalizeAnswer(text);
        }

        function sanitizeWordCharacters(word) {
            return normalizeWordForGame(word.english).split('');
        }

        function splitWordForReading(english) {
            const cleanWord = normalizeWordForGame(english);
            if (cleanWord.length <= 4) {
                return cleanWord.split('').join('-');
            }
            if (cleanWord.length <= 7) {
                const splitAt = Math.ceil(cleanWord.length / 2);
                return `${cleanWord.slice(0, splitAt)}-${cleanWord.slice(splitAt)}`;
            }

            const chunks = [];
            for (let i = 0; i < cleanWord.length; i += 3) {
                chunks.push(cleanWord.slice(i, i + 3));
            }
            return chunks.join('-');
        }

        function createKidFriendlyMemoryTip(word) {
            const english = String(word.english || '').trim();
            const chinese = String(word.chinese || '').trim();
            const cleanWord = normalizeWordForGame(english);
            if (cleanWord === 'weekend') {
                return 'week = 一周；end = 结束。weekend 就是一周结束的时候，也就是周末。';
            }
            if (!cleanWord) {
                return `先看图片，说出“${chinese}”，再跟读两遍。`;
            }

            return `看图想象“${chinese}”的真实场景，再说出 ${english}。`;
        }

        function getMemoryTipForWord(word) {
            return window.MemoryCore.getMemoryTip(word);
        }

        function createThreePartMemoryTip(word, importedTip = '') {
            return window.MemoryCore.getMemoryTip({ ...word, memory_hook: importedTip || word.memory_hook });
        }

        function sanitizeShortText(text, maxLength = 72) {
            const value = String(text || '').trim();
            return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
        }

        function getListenTipForWord(word) {
            const english = String(word.english || '').trim();
            const importedTip = String(word.listen_tip || word.read_tip || '').trim();
            if (english.includes(' ')) {
                return `先分开听，再连起来读。`;
            }
            if (importedTip
                && !importedTip.includes('/')
                && !importedTip.includes('按词块')
                && !importedTip.includes('短词不要死背')
                && !importedTip.includes('字母音')) {
                return sanitizeShortText(importedTip);
            }
            return `听准 ${english} 的发音，再跟着读一遍。`;
        }

        function getExampleForWord(word) {
            const example = String(
                word.example_sentence
                || word.optimizedExample
                || word.exampleSentence
                || word.example
                || ''
            ).trim();
            return example || '请先在导入表填写自然例句。';
        }

        function getExampleCnForWord(word) {
            return String(
                word.example_sentence_cn
                || word.optimizedExampleCn
                || word.exampleSentenceCn
                || word.exampleCn
                || ''
            ).trim();
        }

        function getPhonicsTipForWord(word) {
            if (String(word.read_tip || '').trim()) {
                return String(word.read_tip).trim();
            }
            const tip = String(word.phonics_tip || word.phonicsTip || '').trim();
            const cleanWord = normalizeWordForGame(word.english || '');
            const genericTipPatterns = ['先听准重音', '短词：先听标准发音', '先听标准发音，再按字母音'];
            const shouldReplaceGenericTip = genericTipPatterns.some(pattern => tip.includes(pattern));
            if (cleanWord === 'weekend') {
                return 'week 读成 /wiːk/，end 读成 /end/，两个词合起来读 weekend。';
            }
            if (tip && !shouldReplaceGenericTip) return tip;
            if (cleanWord.endsWith('tion')) {
                return '词尾 -tion 常读 /ʃən/，先读前面，再轻轻读结尾。';
            }
            if (cleanWord.endsWith('ing')) {
                return '先读前面的词根，再加 -ing 的 /ɪŋ/ 音。';
            }
            if (cleanWord.includes('oo')) {
                return '看到 oo 先想一想它的长短音，再听标准发音确认。';
            }
            if (cleanWord.includes('ea')) {
                return 'ea 是常见字母组合，先把这两个字母放在一起读。';
            }
            if (cleanWord.length <= 4) {
                return '短词不要死背，听一遍，再按字母音快速拼出来。';
            }
            return `先听标准发音，再跟读 ${word.english}。`;
        }

        function getSyllableSplitForWord(word) {
            return window.MemoryCore.getChunkTip(word);
        }

        function getSpellingHelperForTest(word) {
            return getSpellingSecretForWord(word);
        }

        function shouldShowChunkTipForWord(word) {
            return Boolean(window.MemoryCore.getChunkTip(word));
        }

        function escapeRegExp(text) {
            return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        function getSpellingSecretForWord(word) {
            return sanitizeShortText(window.MemoryCore.getSpellingTip(word), 56);
        }

        function getReadTipForWord(word) {
            const pieces = [word.phonetic, getListenTipForWord(word)]
                .filter(Boolean)
                .join('  ');
            return pieces || '听标准发音，再跟读一遍。';
        }

        function getSentenceAudioUrlForWord(word) {
            return String(word.sentence_audio_url || word.sentenceAudioUrl || word.sentenceAudio || '').trim();
        }

        function getSpellingTipForWord(word) {
            return getSpellingSecretForWord(word);
        }

        function getAudioUrlForWord(word) {
            return String(word.audio_url || word.audioUrl || word.audio || '').trim();
        }

        function loadMasteryRecords() {
            try {
                return JSON.parse(localStorage.getItem(MASTERY_STORAGE_KEY) || '{}');
            } catch (error) {
                console.warn('掌握记录读取失败，已重置:', error);
                return {};
            }
        }

        function saveMasteryRecords(masteryRecords) {
            localStorage.setItem(MASTERY_STORAGE_KEY, JSON.stringify(masteryRecords));
        }

        function loadReviewQueue() {
            try {
                return JSON.parse(localStorage.getItem(REVIEW_QUEUE_STORAGE_KEY) || '{}');
            } catch (error) {
                console.warn('复习队列读取失败，已重置:', error);
                return {};
            }
        }

        function saveReviewQueue(reviewQueue) {
            localStorage.setItem(REVIEW_QUEUE_STORAGE_KEY, JSON.stringify(reviewQueue));
        }

        function addDays(date, days) {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }

        function getReviewDueAt(word) {
            return word.nextReviewAt || word.next_review_at || word.review_due_at || null;
        }

        function getReviewWeaknessScore(word, now = new Date()) {
            const dueAt = getReviewDueAt(word);
            const dueMs = dueAt ? new Date(dueAt).getTime() : 0;
            const overdueDays = dueMs ? Math.max(0, Math.floor((now.getTime() - dueMs) / 86400000)) : 0;
            const statusScore = word.status === 'learning' ? 80 : word.status === 'review' ? 40 : 10;
            const wrongScore = Math.min(50, Number(word.wrong_count || word.wrongCount || word.totalWrong || 0) * 10);
            const slowScore = Math.min(24, Number(word.slowRecallCount || word.slow_recall_count || 0) * 6);
            const freshWrongScore = word.lastWrongAt || word.last_wrong_at ? 12 : 0;
            return statusScore + wrongScore + slowScore + freshWrongScore + Math.min(30, overdueDays * 3);
        }

        function getReviewReason(word) {
            const errors = Array.isArray(word.error_types) ? word.error_types : [];
            if ((word.wrong_count || word.wrongCount || word.totalWrong || 0) > 0) return '错题复习';
            if (errors.includes('slow_recall')) return '反应偏慢';
            if (errors.includes('spelling_error')) return '拼写巩固';
            if (errors.includes('pronunciation_error')) return '听音巩固';
            if (word.status === 'learning') return '薄弱点';
            return '间隔复习';
        }

        function createReviewQueueEntry(key, word, now = new Date()) {
            const dueAt = getReviewDueAt(word) || now.toISOString();
            return {
                key,
                english: word.english,
                chinese: word.chinese,
                grade: word.grade || currentGrade,
                difficulty: word.difficulty || currentDifficulty,
                dueAt,
                status: word.status || 'review',
                reason: getReviewReason(word),
                priority: getReviewWeaknessScore(word, now),
                lastStudiedAt: word.lastStudiedAt || word.lastReviewedAt || word.last_reviewed_at || '',
                updatedAt: now.toISOString()
            };
        }

        function updateReviewQueueAfterRecord(masteryRecords = loadMasteryRecords()) {
            const now = new Date();
            const nextQueue = {};
            Object.entries(masteryRecords || {}).forEach(([key, word]) => {
                const dueAt = getReviewDueAt(word);
                const shouldQueue = Boolean(dueAt)
                    && String(word.english || '').trim();
                if (!shouldQueue) return;
                nextQueue[key] = createReviewQueueEntry(key, word, now);
            });
            saveReviewQueue(nextQueue);
            return nextQueue;
        }

        function getDueReviewQueueWords(limit = 8) {
            const now = new Date();
            const masteryRecords = loadMasteryRecords();
            const queue = updateReviewQueueAfterRecord(masteryRecords);
            return Object.values(queue)
                .filter(item => item.dueAt && new Date(item.dueAt) <= now)
                .sort((a, b) => {
                    if (b.priority !== a.priority) return b.priority - a.priority;
                    return new Date(a.dueAt) - new Date(b.dueAt);
                })
                .slice(0, limit)
                .map(item => ({
                    ...(masteryRecords[item.key] || {}),
                    review_due_at: item.dueAt,
                    review_reason: item.reason,
                    review_priority: item.priority
                }));
        }

        function createMasteryEntry(word, record) {
            return {
                chinese: word.chinese,
                english: word.english,
                image: word.image,
                image_url: word.image_url || word.image,
                audio_url: getAudioUrlForWord(word),
                phonetic: word.phonetic || '',
                example_sentence: getExampleForWord(word),
                example_sentence_cn: getExampleCnForWord(word),
                phonics_tip: getPhonicsTipForWord(word),
                syllable_split: getSyllableSplitForWord(word),
                spelling_tip: getSpellingTipForWord(word),
                memory_hook: getMemoryTipForWord(word),
                letter_image_story: word.letter_image_story || getSpellingTipForWord(word),
                mastery_level: Math.max(0, Math.min(5, Number(word.mastery_level || 0))),
                review_count: 0,
                correct_count: 0,
                wrong_count: 0,
                error_types: [],
                memoryTip: getMemoryTipForWord(word),
                category: word.category || word.topic || '',
                topic: word.topic || word.category || '',
                partOfSpeech: word.partOfSpeech || word.part_of_speech || '',
                memory_strategy: word.memory_strategy || word.memoryStrategy || '',
                spelling_pattern: word.spelling_pattern || word.spellingPattern || '',
                chunk_tip: word.chunk_tip || word.chunkTip || '',
                show_chunk_tip: word.show_chunk_tip ?? word.showChunkTip ?? false,
                test_flow: word.test_flow || word.testFlow || word.test_methods || '',
                grade: record.grade,
                gradeText: record.gradeText,
                difficulty: record.difficulty,
                difficultyText: record.difficultyText,
                status: 'new',
                lastStudiedAt: null,
                lastReviewedAt: null,
                nextReviewAt: null,
                next_review_at: null,
                consecutiveCorrect: 0,
                intervalIndex: Math.max(0, Math.min(5, Number(word.mastery_level || 0))),
                totalCorrect: 0,
                totalWrong: 0,
                slowRecallCount: 0
            };
        }

        function updateMasteryFromRecord(record) {
            if (!record || !Array.isArray(record.words) || !Array.isArray(record.wordAnswerRecords)) {
                return;
            }

            const masteryRecords = loadMasteryRecords();
            const studiedAt = record.finishTime || new Date().toISOString();
            const studiedDate = new Date(studiedAt);

            record.words.forEach((word, index) => {
                const answerRecord = record.wordAnswerRecords[index];
                if (!word || !answerRecord || !answerRecord.answered) {
                    return;
                }

                const key = getWordKey(word);
                const entry = masteryRecords[key] || createMasteryEntry(word, record);
                entry.chinese = word.chinese;
                entry.english = word.english;
                entry.image = word.image;
                entry.image_url = word.image_url || word.image;
                entry.audio_url = getAudioUrlForWord(word);
                entry.phonetic = word.phonetic || '';
                entry.example_sentence = getExampleForWord(word);
                entry.example_sentence_cn = getExampleCnForWord(word);
                entry.phonics_tip = getPhonicsTipForWord(word);
                entry.syllable_split = getSyllableSplitForWord(word);
                entry.spelling_tip = getSpellingTipForWord(word);
                entry.memory_hook = getMemoryTipForWord(word);
                entry.letter_image_story = word.letter_image_story || getSpellingTipForWord(word);
                entry.memoryTip = getMemoryTipForWord(word);
                entry.category = word.category || word.topic || entry.category || '';
                entry.topic = word.topic || word.category || entry.topic || '';
                entry.partOfSpeech = word.partOfSpeech || word.part_of_speech || entry.partOfSpeech || '';
                entry.memory_strategy = word.memory_strategy || word.memoryStrategy || entry.memory_strategy || '';
                entry.spelling_pattern = word.spelling_pattern || word.spellingPattern || entry.spelling_pattern || '';
                entry.chunk_tip = word.chunk_tip || word.chunkTip || entry.chunk_tip || '';
                entry.show_chunk_tip = word.show_chunk_tip ?? word.showChunkTip ?? entry.show_chunk_tip ?? false;
                entry.test_flow = word.test_flow || word.testFlow || word.test_methods || entry.test_flow || '';
                entry.grade = record.grade;
                entry.gradeText = record.gradeText;
                entry.difficulty = record.difficulty;
                entry.difficultyText = record.difficultyText;
                entry.lastStudiedAt = studiedAt;
                entry.lastReviewedAt = studiedAt;
                entry.last_reviewed_at = studiedAt;
                entry.review_count = (entry.review_count || 0) + 1;
                entry.reviewCount = entry.review_count;

                const responseTimeMs = answerRecord.responseTimeMs || 0;
                const isSlow = answerRecord.slowRecall || responseTimeMs > SLOW_RECALL_MS;
                const errorTypes = Array.isArray(answerRecord.errorTypes) ? answerRecord.errorTypes : [];
                entry.error_types = Array.from(new Set([...(entry.error_types || []), ...errorTypes]));

                if (answerRecord.firstCorrect) {
                    entry.totalCorrect = (entry.totalCorrect || 0) + 1;
                    entry.correct_count = (entry.correct_count || 0) + 1;
                    entry.correctCount = entry.correct_count;
                    entry.consecutiveCorrect = (entry.consecutiveCorrect || 0) + 1;
                    if (isSlow) {
                        entry.slowRecallCount = (entry.slowRecallCount || 0) + 1;
                        entry.error_types = Array.from(new Set([...(entry.error_types || []), 'slow_recall']));
                    } else {
                        entry.intervalIndex = Math.min((entry.intervalIndex || 0) + 1, REVIEW_INTERVAL_DAYS.length - 1);
                    }
                    entry.status = entry.intervalIndex >= REVIEW_INTERVAL_DAYS.length - 1 ? 'mastered' : 'review';
                    entry.nextReviewAt = addDays(studiedDate, REVIEW_INTERVAL_DAYS[entry.intervalIndex]).toISOString();
                    entry.next_review_at = entry.nextReviewAt;
                } else {
                    entry.totalWrong = (entry.totalWrong || 0) + 1;
                    entry.wrong_count = (entry.wrong_count || 0) + 1;
                    entry.wrongCount = entry.wrong_count;
                    entry.consecutiveCorrect = 0;
                    entry.intervalIndex = Math.max(0, (entry.intervalIndex || 0) - 1);
                    entry.status = 'learning';
                    entry.nextReviewAt = studiedDate.toISOString();
                    entry.next_review_at = entry.nextReviewAt;
                }

                entry.mastery_level = Math.max(0, Math.min(5, entry.intervalIndex || 0));

                masteryRecords[key] = entry;
            });

            saveMasteryRecords(masteryRecords);
            updateReviewQueueAfterRecord(masteryRecords);
        }

        function getDueReviewWords(limit = 8) {
            return getDueReviewQueueWords(limit);
        }

        function getLearnedWords(limit = 12) {
            return Object.values(loadMasteryRecords())
                .filter(word => (word.totalCorrect || 0) > 0)
                .sort((a, b) => {
                    const dueDiff = new Date(a.nextReviewAt || a.next_review_at || 0) - new Date(b.nextReviewAt || b.next_review_at || 0);
                    if (dueDiff !== 0) return dueDiff;
                    return new Date(b.lastStudiedAt || 0) - new Date(a.lastStudiedAt || 0);
                })
                .slice(0, limit);
        }

        function ensureMasteryFromHistory(records) {
            if (Object.keys(loadMasteryRecords()).length > 0 || !Array.isArray(records) || records.length === 0) {
                return;
            }

            [...records].reverse().forEach(record => {
                if (record.status === 'completed') {
                    updateMasteryFromRecord(record);
                }
            });
        }

        function shuffleArray(array) {
            return window.GameCore.shuffle(array);
        }

        function getQuestionTypeForWord(word, index) {
            const flowTypes = parseTestFlowTypes(word);
            if (flowTypes.length > 0) {
                return flowTypes[index % flowTypes.length];
            }

            const methodText = String(word.test_methods || word.testMethods || '').toLowerCase();
            if (methodText.includes('听音') && index % 3 === 0) {
                return 'audio_to_english';
            }
            if ((methodText.includes('例句') || methodText.includes('填空')) && index % 4 === 0) {
                return 'cloze';
            }
            return QUESTION_TYPES[index % QUESTION_TYPES.length];
        }

        function mapTestFlowItemToQuestionType(item) {
            const text = String(item || '').trim();
            const normalized = text.toLowerCase().replace(/[\s-]+/g, '_');
            if (!text) return '';
            if (['image_to_word', 'image_to_english', 'picture_to_word', 'picture_to_english', 'scene_to_word', 'scene_to_english'].includes(normalized)) return 'image_to_english';
            if (['audio_to_word', 'audio_to_english', 'listen_to_word', 'listen_to_english'].includes(normalized)) return 'audio_to_english';
            if (['word_to_meaning', 'english_to_chinese', 'word_to_chinese'].includes(normalized)) return 'english_to_chinese';
            if (['meaning_to_word', 'chinese_to_english', 'meaning_to_english'].includes(normalized)) return 'chinese_to_english';
            if (['sentence_blank', 'sentence_cloze', 'cloze', 'example_blank'].includes(normalized)) return 'cloze';
            if (['spelling_partial', 'partial_blank', 'spelling', 'full_blank', 'letter_bank'].includes(normalized)) return 'spelling';
            if (['phrase_order', 'chunk_order', 'word_order'].includes(normalized)) return 'phrase_order';
            if (text.includes('看图') || text.includes('场景')) return 'image_to_english';
            if (text.includes('听音')) return 'audio_to_english';
            if (text.includes('英文选中文')) return 'english_to_chinese';
            if (text.includes('例句填空')) return 'cloze';
            if (text.includes('词块排序')) return 'phrase_order';
            if (text.includes('半提示拼写') || text.includes('拼写')) return 'spelling';
            if (text.includes('看中文选短语')) return 'chinese_to_english';
            return '';
        }

        function parseTestFlowTypes(word) {
            const flowText = String(word.test_flow || word.test_methods || '').trim();
            if (!flowText) return [];
            return flowText
                .split(/[；;、,，|/]+/)
                .map(mapTestFlowItemToQuestionType)
                .filter(Boolean);
        }

        function getPreviewQuestionTypesForWord(word) {
            const fromFlow = parseTestFlowTypes(word);
            const ordered = fromFlow.length > 0
                ? fromFlow
                : ['image_to_english', 'audio_to_english', 'english_to_chinese', 'spelling'];
            const unique = ordered.filter((type, index, array) => array.indexOf(type) === index);
            return unique.slice(0, Math.max(2, Math.min(4, unique.length)));
        }

        function getWordsForOptions(answerWord, field, limit = 4) {
            const seen = new Set([String(answerWord[field] || '').trim()]);
            const pool = [];
            const currentGradeWords = Object.values(window.wordDatabase[currentGrade] || {})
                .flat()
                .filter(Boolean);
            [...gameWords, ...currentGradeWords].forEach(word => {
                const value = String(word[field] || '').trim();
                if (value && !seen.has(value)) {
                    seen.add(value);
                    pool.push(value);
                }
            });
            const fallback = field === 'english'
                ? ['book', 'school', 'teacher', 'friend']
                : ['书', '学校', '老师', '朋友'];
            fallback.forEach(value => {
                if (!seen.has(value)) {
                    seen.add(value);
                    pool.push(value);
                }
            });
            return shuffleArray([String(answerWord[field] || '').trim(), ...shuffleArray(pool).slice(0, limit - 1)]);
        }

        function buildClozeSentence(word) {
            const sentence = getExampleForWord(word);
            const english = String(word.english || '').trim();
            if (english && sentence.toLowerCase().includes(english.toLowerCase())) {
                return sentence.replace(new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '____');
            }
            return `I like ____ .`;
        }

        function getPhraseChunks(word) {
            const chunkText = String(word.chunk_tip || word.syllable_split || word.english || '').trim();
            const chunks = chunkText.includes('/')
                ? chunkText.split('/').map(item => item.trim()).filter(Boolean)
                : String(word.english || '').split(/\s+/).filter(Boolean);
            return chunks.length > 1 ? chunks : sanitizeWordCharacters(word).map(char => char);
        }

        function shouldPreserveCase(word) {
            return /[A-Z]/.test(String(word.english || '').replace(/^the\s+/i, ''));
        }

        function makePartialBlankPattern(answer) {
            const word = gameWords[currentPreviewIndex];
            if (word && String(word.english || '').trim().toLowerCase() === String(answer || '').trim().toLowerCase()) {
                return window.MemoryCore.getSpellingPattern(word);
            }
            return window.MemoryCore.getSpellingPattern({ english: answer });
        }

        function createActiveQuestion(word, index) {
            const type = getQuestionTypeForWord(word, index);
            return createQuestionByType(word, type);
        }

        function createQuestionByType(word, type) {
            if (type === 'image_to_english') {
                return {
                    type,
                    prompt: '看图，选择对应的英文',
                    title: '看图选英文',
                    helper: '先看图片想英文，再看选项。',
                    answer: word.english,
                    options: getWordsForOptions(word, 'english')
                };
            }
            if (type === 'english_to_chinese') {
                return {
                    type,
                    prompt: word.english,
                    title: '英文选中文',
                    helper: word.phonetic || '看英文，主动回忆中文意思。',
                    answer: word.chinese,
                    options: getWordsForOptions(word, 'chinese')
                };
            }
            if (type === 'chinese_to_english') {
                return {
                    type,
                    prompt: word.chinese,
                    title: '中文选英文',
                    helper: '先在脑中说出英文，再看选项。',
                    answer: word.english,
                    options: getWordsForOptions(word, 'english')
                };
            }
            if (type === 'audio_to_english') {
                return {
                    type,
                    prompt: '听音，选择你听到的英文',
                    title: '听音选英文',
                    helper: '先听标准发音，再选英文。',
                    answer: word.english,
                    options: getWordsForOptions(word, 'english')
                };
            }
            if (type === 'cloze') {
                return {
                    type,
                    prompt: buildClozeSentence(word),
                    title: '例句填空',
                    helper: getExampleCnForWord(word) || word.chinese,
                    answer: word.english,
                    options: getWordsForOptions(word, 'english')
                };
            }
            if (type === 'phrase_order') {
                const chunks = getPhraseChunks(word);
                return {
                    type,
                    prompt: word.chinese,
                    title: '词块排序',
                    helper: '把词块排成正确顺序。',
                    answer: chunks.join(' '),
                    chunks,
                    options: shuffleArray(chunks)
                };
            }
            return {
                type: 'spelling',
                prompt: word.chinese,
                title: '看中文拼英文',
                helper: getSpellingTipForWord(word),
                answer: word.english,
                options: []
            };
        }

        function isSpellingQuestion() {
            return !activeQuestion || activeQuestion.type === 'spelling';
        }

        function buildLetterBank(word) {
            currentLetterBank = shuffleArray(
                sanitizeWordCharacters(word).map((char, index) => ({
                    id: `${word.english}-${index}-${char}`,
                    char,
                    originalIndex: index
                }))
            );
            selectedLetterIndices = Array(sanitizeWordCharacters(word).length).fill(null);
            currentDragSource = null;
            selectedTargetSlot = null;
            renderLetterGame();
        }

        function getSelectedAnswer() {
            return selectedLetterIndices
                .map(index => Number.isInteger(index) ? currentLetterBank[index].char : '')
                .join('');
        }

        function hasPlacedLetters() {
            return selectedLetterIndices.some(Number.isInteger);
        }

        function isLetterAnswerComplete(targetLength) {
            return selectedLetterIndices.length === targetLength
                && selectedLetterIndices.every(Number.isInteger);
        }

        function renderLetterGame() {
            const currentWord = gameWords[currentWordIndex];
            const targetLength = currentWord ? sanitizeWordCharacters(currentWord).length : 0;
            const preserveCase = shouldPreserveCase(currentWord || {});

            answerSlotsEl.innerHTML = '';
            for (let i = 0; i < targetLength; i++) {
                const slot = document.createElement('div');
                const selectedBankIndex = selectedLetterIndices[i];
                const filledChar = Number.isInteger(selectedBankIndex)
                    ? (preserveCase ? currentLetterBank[selectedBankIndex].char : currentLetterBank[selectedBankIndex].char.toLowerCase())
                    : '';
                slot.className = `answer-slot ${filledChar ? 'filled' : ''} ${selectedTargetSlot === i ? 'selected-target' : ''}`;
                slot.dataset.position = String(i);
                slot.addEventListener('dragover', handleLetterDragOver);
                slot.addEventListener('dragleave', handleLetterDragLeave);
                slot.addEventListener('drop', (event) => handleAnswerSlotDrop(event, i));
                slot.addEventListener('click', () => {
                    if (!filledChar) {
                        selectedTargetSlot = i;
                        renderLetterGame();
                    }
                });

                if (filledChar) {
                    const selectedTile = document.createElement('button');
                    selectedTile.type = 'button';
                    selectedTile.className = 'letter-tile letter-tile-selected';
                    selectedTile.textContent = filledChar;
                    selectedTile.draggable = true;
                    selectedTile.addEventListener('dragstart', (event) => handleLetterDragStart(event, 'selected', i));
                    selectedTile.addEventListener('dragend', handleLetterDragEnd);
                    selectedTile.addEventListener('click', (event) => {
                        event.stopPropagation();
                        removeSelectedLetterAt(i);
                    });
                    slot.appendChild(selectedTile);
                } else {
                    slot.textContent = '_';
                }

                answerSlotsEl.appendChild(slot);
            }

            letterBankEl.innerHTML = '';
            letterBankEl.ondragover = handleLetterDragOver;
            letterBankEl.ondragleave = handleLetterDragLeave;
            letterBankEl.ondrop = handleLetterBankDrop;
            currentLetterBank.forEach((item, index) => {
                const letterBtn = document.createElement('button');
                letterBtn.type = 'button';
                letterBtn.className = 'letter-tile';
                letterBtn.textContent = preserveCase ? item.char : item.char.toLowerCase();
                const isUsed = selectedLetterIndices.includes(index);
                letterBtn.disabled = isUsed;
                if (!isUsed) {
                    letterBtn.draggable = true;
                    letterBtn.addEventListener('dragstart', (event) => handleLetterDragStart(event, 'bank', index));
                    letterBtn.addEventListener('dragend', handleLetterDragEnd);
                    letterBtn.addEventListener('click', () => selectLetter(index));
                }
                letterBankEl.appendChild(letterBtn);
            });

            removeLetterBtn.disabled = !hasPlacedLetters();
            clearAnswerBtn.disabled = !hasPlacedLetters();
            shuffleLettersBtn.disabled = currentLetterBank.length === 0;
            document.getElementById('submit-btn').disabled = !isLetterAnswerComplete(targetLength);
        }

        function selectLetter(index) {
            if (selectedLetterIndices.includes(index)) {
                return;
            }
            const targetPosition = Number.isInteger(selectedTargetSlot)
                ? selectedTargetSlot
                : selectedLetterIndices.findIndex(slotIndex => !Number.isInteger(slotIndex));
            if (targetPosition === -1) {
                return;
            }
            selectedLetterIndices[targetPosition] = index;
            selectedTargetSlot = null;
            renderLetterGame();
        }

        function placeBankLetter(bankIndex, targetPosition) {
            if (selectedLetterIndices.includes(bankIndex)) {
                return;
            }
            if (targetPosition < 0 || targetPosition >= selectedLetterIndices.length) {
                return;
            }
            selectedLetterIndices[targetPosition] = bankIndex;
        }

        function moveSelectedLetter(fromPosition, targetPosition) {
            if (fromPosition < 0 || fromPosition >= selectedLetterIndices.length
                || targetPosition < 0 || targetPosition >= selectedLetterIndices.length
                || fromPosition === targetPosition) {
                return;
            }

            const movedIndex = selectedLetterIndices[fromPosition];
            if (!Number.isInteger(movedIndex)) {
                return;
            }
            const replacedIndex = selectedLetterIndices[targetPosition];
            selectedLetterIndices[targetPosition] = movedIndex;
            selectedLetterIndices[fromPosition] = Number.isInteger(replacedIndex) ? replacedIndex : null;
        }

        function removeSelectedLetterAt(position) {
            if (position < 0 || position >= selectedLetterIndices.length) {
                return;
            }
            selectedLetterIndices[position] = null;
            selectedTargetSlot = position;
            renderLetterGame();
        }

        function handleLetterDragStart(event, sourceType, index) {
            currentDragSource = { type: sourceType, index };
            if (event.currentTarget) {
                event.currentTarget.classList.add('letter-dragging');
            }
            if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', `${sourceType}:${index}`);
            }
        }

        function handleLetterDragEnd(event) {
            currentDragSource = null;
            document.querySelectorAll('.letter-drag-over').forEach(element => {
                element.classList.remove('letter-drag-over');
            });
            if (event.currentTarget) {
                event.currentTarget.classList.remove('letter-dragging');
            }
        }

        function handleLetterDragOver(event) {
            event.preventDefault();
            event.currentTarget.classList.add('letter-drag-over');
        }

        function handleLetterDragLeave(event) {
            event.currentTarget.classList.remove('letter-drag-over');
        }

        function handleAnswerSlotDrop(event, targetPosition) {
            event.preventDefault();
            event.currentTarget.classList.remove('letter-drag-over');
            if (!currentDragSource) {
                return;
            }

            if (currentDragSource.type === 'bank') {
                placeBankLetter(currentDragSource.index, targetPosition);
            } else if (currentDragSource.type === 'selected') {
                moveSelectedLetter(currentDragSource.index, targetPosition);
            }

            currentDragSource = null;
            selectedTargetSlot = null;
            renderLetterGame();
        }

        function handleLetterBankDrop(event) {
            event.preventDefault();
            event.currentTarget.classList.remove('letter-drag-over');
            if (!currentDragSource) {
                return;
            }

            if (currentDragSource.type === 'selected') {
                selectedLetterIndices[currentDragSource.index] = null;
            }

            currentDragSource = null;
            selectedTargetSlot = null;
            renderLetterGame();
        }

        function removeLastLetter() {
            const lastFilledPosition = selectedLetterIndices.reduce((lastPosition, bankIndex, position) => (
                Number.isInteger(bankIndex) ? position : lastPosition
            ), -1);
            if (lastFilledPosition === -1) {
                return;
            }
            removeSelectedLetterAt(lastFilledPosition);
        }

        function clearSelectedLetters() {
            selectedLetterIndices = selectedLetterIndices.map(() => null);
            currentDragSource = null;
            selectedTargetSlot = null;
            renderLetterGame();
        }

        function shuffleCurrentLetters() {
            const selectedCharsBySlot = selectedLetterIndices.map(index => (
                Number.isInteger(index) ? currentLetterBank[index].char : null
            ));
            const currentWord = gameWords[currentWordIndex];
            currentLetterBank = shuffleArray(
                sanitizeWordCharacters(currentWord).map((char, index) => ({
                    id: `${currentWord.english}-${index}-${char}`,
                    char,
                    originalIndex: index
                }))
            );
            const usedBankIndices = new Set();
            selectedLetterIndices = selectedCharsBySlot.map(char => {
                if (!char) return null;
                const bankIndex = currentLetterBank.findIndex((item, itemIndex) => (
                    item.char === char && !usedBankIndices.has(itemIndex)
                ));
                if (bankIndex !== -1) {
                    usedBankIndices.add(bankIndex);
                    return bankIndex;
                }
                return null;
            });
            selectedTargetSlot = null;

            renderLetterGame();
        }

        function launchCelebration() {
            const shapes = ['✨', '⭐', '🌟', '💖', '🎉', '🎈'];
            const cheers = ['太棒啦！', '你真厉害！', '拼对啦！', '继续保持！', '好棒好棒！'];
            const burstCount = 30;

            playCelebrationSound();

            const message = document.createElement('div');
            message.className = 'celebration-message';
            message.textContent = cheers[Math.floor(Math.random() * cheers.length)];
            celebrationLayer.appendChild(message);
            setTimeout(() => message.remove(), CELEBRATION_MESSAGE_HOLD_MS);

            for (let i = 0; i < burstCount; i++) {
                const particle = document.createElement('span');
                const angle = (Math.PI * 2 * i) / burstCount;
                const distance = 110 + Math.random() * 190;
                particle.className = 'celebration-particle';
                particle.textContent = shapes[i % shapes.length];
                particle.style.left = `${35 + Math.random() * 30}%`;
                particle.style.top = `${24 + Math.random() * 26}%`;
                particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
                celebrationLayer.appendChild(particle);
                setTimeout(() => particle.remove(), 1800);
            }
        }

        function launchReadingPerfectCelebration() {
            const shapes = ['⭐', '🌟', '✨', '📖', '🎉'];
            const burstCount = 36;
            const overlay = document.createElement('div');
            overlay.className = 'reading-perfect-celebration';
            overlay.innerHTML = `
                <div class="reading-perfect-card">
                    <div class="reading-perfect-badge">⭐</div>
                    <div class="reading-perfect-title">阅读全对！</div>
                    <div class="reading-perfect-copy">你把小故事里的单词都认出来啦。</div>
                </div>
            `;
            document.body.appendChild(overlay);
            playCelebrationSound();

            for (let i = 0; i < burstCount; i++) {
                const particle = document.createElement('span');
                const angle = (Math.PI * 2 * i) / burstCount;
                const distance = 80 + Math.random() * 160;
                particle.className = 'reading-perfect-particle';
                particle.textContent = shapes[i % shapes.length];
                particle.style.left = `${42 + Math.random() * 16}%`;
                particle.style.top = `${34 + Math.random() * 16}%`;
                particle.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
                particle.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
                overlay.appendChild(particle);
            }

            setTimeout(() => overlay.classList.add('leaving'), 2200);
            setTimeout(() => overlay.remove(), 2850);
        }

        function playCelebrationSound() {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) {
                return;
            }

            const audioContext = new AudioContextClass();
            const now = audioContext.currentTime;
            const notes = [523.25, 659.25, 783.99];

            notes.forEach((frequency, index) => {
                const oscillator = audioContext.createOscillator();
                const gain = audioContext.createGain();
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(frequency, now + index * 0.11);
                gain.gain.setValueAtTime(0.0001, now + index * 0.11);
                gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.11 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.11 + 0.26);
                oscillator.connect(gain);
                gain.connect(audioContext.destination);
                oscillator.start(now + index * 0.11);
                oscillator.stop(now + index * 0.11 + 0.28);
            });

            setTimeout(() => {
                audioContext.close().catch(() => {});
            }, 900);
        }

        function updateMascotMessage(type = 'default') {
            if (!mascotMessageEl) {
                return;
            }

            const messages = {
                welcome: ['欢迎来到单词乐园！', '今天我们也要闪闪发光。'],
                ready: ['先看中文提示，再拼出英文吧。', '小手动一动，字母排整齐。'],
                hint: ['悄悄告诉你一点线索。', '别急，我们一步一步来。'],
                correct: ['太棒啦，我们又赢下一颗星！', '拼对啦，你真的越来越厉害了！'],
                wrong: ['没关系，再试一次就更接近答案啦。', '勇敢一点，我们马上就能拼对。'],
                finish: ['今天表现超棒，继续保持！', '你已经收获满满啦！']
            };

            const list = messages[type] || messages.default || messages.ready;
            mascotMessageEl.textContent = list[Math.floor(Math.random() * list.length)];
        }

        function renderRewardStars() {
            if (!rewardStarsEl) {
                return;
            }

            rewardStarsEl.innerHTML = '';
            const filledStars = Math.min(5, correctCount);
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                star.className = `playful-reward-star ${i < filledStars ? 'filled' : ''}`;
                star.textContent = i < filledStars ? '⭐' : '☆';
                rewardStarsEl.appendChild(star);
            }
        }

        function loadWordStarProfile() {
            const today = new Date().toISOString().slice(0, 10);
            try {
                const rawProfile = localStorage.getItem(WORD_STAR_PROFILE_KEY);
                const parsedProfile = rawProfile ? JSON.parse(rawProfile) : {};
                const totalStars = Number(parsedProfile.totalStars || 0);
                return {
                    totalStars,
                    todayStars: parsedProfile.date === today ? Number(parsedProfile.todayStars || 0) : 0,
                    streak: Number(parsedProfile.streak || 0),
                    date: today,
                    lastTitle: parsedProfile.lastTitle || getWordStarTitle(totalStars)
                };
            } catch (error) {
                return { totalStars: 0, todayStars: 0, streak: 0, date: today, lastTitle: getWordStarTitle(0) };
            }
        }

        function saveWordStarProfile() {
            try {
                localStorage.setItem(WORD_STAR_PROFILE_KEY, JSON.stringify(wordStarProfile));
            } catch (error) {
                console.warn('星词数据保存失败', error);
            }
        }

        function getWordStarTitle(totalStars = wordStarProfile.totalStars) {
            return getWordStarLevel(totalStars).title;
        }

        function getWordStarLevel(totalStars = wordStarProfile.totalStars) {
            const normalizedStars = Math.max(0, Number(totalStars || 0));
            let levelIndex = 0;
            WORD_STAR_LEVELS.forEach((level, index) => {
                if (normalizedStars >= level.min) {
                    levelIndex = index;
                }
            });
            const level = WORD_STAR_LEVELS[levelIndex] || WORD_STAR_LEVELS[0];
            const nextLevel = WORD_STAR_LEVELS[levelIndex + 1] || null;
            const span = nextLevel ? nextLevel.min - level.min : 1;
            const progress = nextLevel ? Math.min(span, normalizedStars - level.min) : span;
            const progressRatio = nextLevel ? progress / span : 1;
            return {
                ...level,
                nextTitle: nextLevel?.title || '',
                nextMin: nextLevel?.min || null,
                progress,
                span,
                progressRatio,
                isMaxLevel: !nextLevel
            };
        }

        function updateWordStarHud() {
            const scoreEl = document.getElementById('score');
            const meterEl = document.getElementById('word-star-meter');
            const titleEl = document.getElementById('word-star-title');
            const progressEl = document.getElementById('word-star-progress');
            const level = getWordStarLevel();
            const progressText = level.isMaxLevel
                ? `${wordStarProfile.totalStars}+`
                : `${level.progress}/${level.span}`;

            if (scoreEl) {
                scoreEl.textContent = progressText;
                scoreEl.title = `${level.title} · 总 ${wordStarProfile.totalStars} 颗 · 今日 +${wordStarProfile.todayStars}`;
                scoreEl.dataset.wordStarTitle = level.title;
            }
            if (titleEl) {
                titleEl.textContent = level.title;
            }
            if (progressEl) {
                progressEl.style.width = `${Math.round(level.progressRatio * 100)}%`;
            }
            if (meterEl) {
                meterEl.title = `${level.title} · 总 ${wordStarProfile.totalStars} 颗 · 今日 +${wordStarProfile.todayStars}`;
                meterEl.dataset.wordStarTitle = level.title;
                meterEl.dataset.wordStarTotal = String(wordStarProfile.totalStars);
                meterEl.classList.toggle('max-level', level.isMaxLevel);
            }
            renderWordStarLevelPanel();
        }

        function resetWordStarStreak() {
            wordStarProfile.streak = 0;
            saveWordStarProfile();
            updateWordStarHud();
        }

        function awardWordStars(amount = 1, source = '练习', detail = '') {
            const today = new Date().toISOString().slice(0, 10);
            if (wordStarProfile.date !== today) {
                wordStarProfile.date = today;
                wordStarProfile.todayStars = 0;
            }
            const previousTitle = getWordStarTitle(wordStarProfile.totalStars);
            wordStarProfile.totalStars += amount;
            wordStarProfile.todayStars += amount;
            wordStarProfile.streak += 1;
            const title = getWordStarTitle();
            const titleUpgraded = title !== previousTitle;
            wordStarProfile.lastTitle = title;
            saveWordStarProfile();
            updateWordStarHud();
            showWordStarReward({ amount, source, detail, title, titleUpgraded, streak: wordStarProfile.streak, anchorEl: document.activeElement });
        }

        function playWordStarCollectSound() {
            try {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (!AudioContextClass) return;
                const audioContext = window.wordStarAudioContext || new AudioContextClass();
                window.wordStarAudioContext = audioContext;
                if (audioContext.state === 'suspended') {
                    audioContext.resume?.();
                }

                const now = audioContext.currentTime;
                const gainNode = audioContext.createGain();
                gainNode.gain.setValueAtTime(0.0001, now);
                gainNode.gain.exponentialRampToValueAtTime(0.052, now + 0.018);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
                gainNode.connect(audioContext.destination);

                [880, 1320].forEach((frequency, index) => {
                    const oscillator = audioContext.createOscillator();
                    const startAt = now + index * 0.035;
                    oscillator.type = 'triangle';
                    oscillator.frequency.setValueAtTime(frequency, startAt);
                    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.22, startAt + 0.12);
                    oscillator.connect(gainNode);
                    oscillator.start(startAt);
                    oscillator.stop(startAt + 0.18);
                });
            } catch (error) {
                // 浏览器可能会在非用户手势里禁止音效，安静失败即可。
            }
        }

        function showWordStarReward({ amount, source, detail, title, titleUpgraded, streak, anchorEl = null }) {
            const meterEl = document.getElementById('word-star-meter');
            if (!meterEl) return;

            const targetEl = document.getElementById('word-star-meter-icon') || meterEl;
            const validAnchor = anchorEl && anchorEl.getBoundingClientRect ? anchorEl : null;
            const sourceRect = validAnchor?.getBoundingClientRect();
            const targetRect = targetEl.getBoundingClientRect();
            const startX = sourceRect ? sourceRect.left + sourceRect.width / 2 : window.innerWidth / 2;
            const startY = sourceRect ? sourceRect.top + sourceRect.height / 2 : window.innerHeight / 2;
            const endX = targetRect.left + targetRect.width / 2;
            const endY = targetRect.top + targetRect.height / 2;
            const flyCount = Math.min(Math.max(1, amount), 3);

            meterEl.classList.remove('word-star-meter-pop');
            requestAnimationFrame(() => meterEl.classList.add('word-star-meter-pop'));
            setTimeout(() => meterEl.classList.remove('word-star-meter-pop'), 620);
            playWordStarCollectSound();

            for (let i = 0; i < flyCount; i++) {
                const star = document.createElement('span');
                star.className = 'word-star-fly';
                star.textContent = '⭐';
                star.style.setProperty('--from-x', `${startX + (i - 1) * 10}px`);
                star.style.setProperty('--from-y', `${startY + i * 4}px`);
                star.style.setProperty('--mid-x', `${startX + (endX - startX) * 0.66 + (i - 1) * 10}px`);
                star.style.setProperty('--mid-y', `${startY + (endY - startY) * 0.28 - 34 - i * 5}px`);
                star.style.setProperty('--to-x', `${endX}px`);
                star.style.setProperty('--to-y', `${endY}px`);
                star.style.animationDelay = `${i * 42}ms`;
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 760 + i * 42);
            }

            if (titleUpgraded) {
                showWordStarUpgrade({ title, source, detail, streak });
            }
        }

        function showWordStarUpgrade({ title, source, detail, streak }) {
            const oldUpgrade = document.querySelector('.word-star-upgrade');
            if (oldUpgrade) oldUpgrade.remove();

            const meterEl = document.getElementById('word-star-meter');
            const meterRect = meterEl?.getBoundingClientRect();
            const upgrade = document.createElement('div');
            upgrade.className = 'word-star-upgrade';
            upgrade.innerHTML = `
                <span>升级啦</span>
                <strong>${escapeHtml(title)}</strong>
                <small>${escapeHtml(source)}${detail ? ` · ${escapeHtml(detail)}` : ''}${streak >= 2 ? ` · 连对 ${streak}` : ''}</small>
            `;
            if (meterRect) {
                upgrade.style.top = `${Math.max(12, meterRect.bottom + 8)}px`;
                upgrade.style.left = `${Math.min(window.innerWidth - 260, Math.max(12, meterRect.left))}px`;
            }
            document.body.appendChild(upgrade);
            requestAnimationFrame(() => upgrade.classList.add('show'));
            setTimeout(() => upgrade.classList.add('leaving'), 2500);
            setTimeout(() => upgrade.remove(), 3100);
        }

        function toggleWordStarLevelPanel() {
            const existingPanel = document.querySelector('.word-star-level-panel');
            const triggerBtn = document.getElementById('word-star-level-btn');
            const shouldShow = !existingPanel?.classList.contains('show');
            if (!shouldShow) {
                closeWordStarLevelPanel();
                return;
            }
            renderWordStarLevelPanel({ forceShow: true });
            triggerBtn?.setAttribute('aria-expanded', 'true');
        }

        function renderWordStarLevelPanel(options = {}) {
            const { forceShow = false } = options;
            const triggerBtn = document.getElementById('word-star-level-btn');
            let panel = document.querySelector('.word-star-level-panel');
            const isOpen = forceShow || panel?.classList.contains('show');
            if (!isOpen && panel) return;
            if (!triggerBtn || (!isOpen && !forceShow)) return;

            const currentLevel = getWordStarLevel();
            const totalStars = wordStarProfile.totalStars;
            const levelItems = WORD_STAR_LEVELS.map((level, index) => {
                const next = WORD_STAR_LEVELS[index + 1];
                const isCurrent = currentLevel.title === level.title;
                const rangeText = next ? `${level.min}–${next.min - 1} 颗` : `${level.min}+ 颗`;
                return `
                    <div class="word-star-level-item ${isCurrent ? 'current' : ''}">
                        <span class="level-icon">${isCurrent ? '⭐' : '☆'}</span>
                        <span>
                            <strong>${escapeHtml(level.title)}</strong>
                            <small>${isCurrent ? `当前 ${totalStars} 颗星` : rangeText}</small>
                        </span>
                        <span class="level-target">${level.min}+</span>
                    </div>
                `;
            }).join('');

            if (!panel) {
                panel = document.createElement('div');
                panel.className = 'word-star-level-panel';
                panel.setAttribute('role', 'dialog');
                panel.setAttribute('aria-label', '星词等级说明');
                document.body.appendChild(panel);
            }

            panel.innerHTML = `
                <h3>星词等级</h3>
                <p>${currentLevel.isMaxLevel ? '已经到达最高称号，继续积累星词。' : `距离“${escapeHtml(currentLevel.nextTitle)}”还差 ${Math.max(0, currentLevel.span - currentLevel.progress)} 颗星。`}</p>
                <div class="word-star-level-list">${levelItems}</div>
            `;

            const triggerRect = triggerBtn.getBoundingClientRect();
            const panelWidth = Math.min(420, window.innerWidth - 24);
            panel.style.top = `${Math.max(12, triggerRect.bottom + 10)}px`;
            panel.style.left = `${Math.min(window.innerWidth - panelWidth - 12, Math.max(12, triggerRect.right - panelWidth))}px`;
            requestAnimationFrame(() => {
                panel.classList.add('show');
                triggerBtn.setAttribute('aria-expanded', 'true');
            });
        }

        function closeWordStarLevelPanel() {
            const panel = document.querySelector('.word-star-level-panel');
            const triggerBtn = document.getElementById('word-star-level-btn');
            if (panel) panel.remove();
            triggerBtn?.setAttribute('aria-expanded', 'false');
        }

        function handleDocumentClickForWordStarLevel(event) {
            const target = event.target;
            if (target?.closest?.('#word-star-meter') || target?.closest?.('.word-star-level-panel')) return;
            closeWordStarLevelPanel();
        }

        function handleWordStarLevelKeydown(event) {
            if (event.key === 'Escape') {
                closeWordStarLevelPanel();
            }
        }

        // 自定义图片处理
        function openImageModal(index) {
            if (index < 0 || index >= gameWords.length) return;
            
            const word = gameWords[index];
            modalWordName.textContent = `${word.chinese} (${word.english})`;
            modalWordIndex.value = index;
            imageUrlInput.value = shouldUseIllustration(word.image) ? '' : word.image;
            customImageUpload.value = '';
            
            imageModal.classList.remove('screen-hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeImageModal() {
            imageModal.classList.add('screen-hidden');
            document.body.style.overflow = '';
        }

        function handleImageUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // 检查文件类型
            if (!file.type.startsWith('image/')) {
                alert('请选择图片文件');
                return;
            }
            
            // 图片压缩处理
            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            img.onload = function() {
                // 设置压缩后的尺寸（最大宽度400px，保持宽高比）
                const maxWidth = 400;
                const maxHeight = 300;
                let width = img.width;
                let height = img.height;
                
                // 计算压缩比例
                if (width > maxWidth) {
                    height = (maxWidth / width) * height;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width = (maxHeight / height) * width;
                    height = maxHeight;
                }
                
                // 设置canvas尺寸
                canvas.width = width;
                canvas.height = height;
                
                // 绘制压缩后的图片
                ctx.drawImage(img, 0, 0, width, height);
                
                // 转换为base64（质量0.8）
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                
                // 显示压缩信息
                const originalSize = (file.size / 1024).toFixed(2);
                const compressedSize = (compressedDataUrl.length * 0.75 / 1024).toFixed(2);
                console.log(`图片压缩: ${originalSize}KB → ${compressedSize}KB`);
                
                // 设置压缩后的图片
                imageUrlInput.value = compressedDataUrl;
                
                // 清理
                canvas.remove();
            };
            
            img.onerror = function() {
                alert('图片加载失败，请选择其他图片');
            };
            
            // 读取原始图片
            const reader = new FileReader();
            reader.onload = function(e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        function saveCustomImage() {
            const index = parseInt(modalWordIndex.value);
            const imageUrl = imageUrlInput.value.trim();
            
            if (index >= 0 && index < gameWords.length && imageUrl) {
                // 更新单词图片
                gameWords[index].image = imageUrl;
                gameWords[index].image_url = imageUrl;
                
                // 如果是当前显示的单词，更新UI
                if (index === currentPreviewIndex) {
                    showCurrentPreviewWord();
                }
                
                // 提示成功
                alert('图片保存成功！');
                closeImageModal();
            } else {
                alert('请输入有效的图片链接');
            }
        }

        // 学习设置相关函数
        function initStudySettings() {
            const wordCountSlider = document.getElementById('word-count-slider');
            const timeSlider = document.getElementById('time-slider');
            const wordCountInput = document.getElementById('word-count-input');
            const timeInput = document.getElementById('time-input');
            const wordCountDisplay = document.getElementById('word-count-display');
            const timeDisplay = document.getElementById('time-display');
            const toggleSettingsBtn = document.getElementById('toggle-settings-btn');
            const settingsPanel = document.getElementById('settings-panel');
            const resetSettingsBtn = document.getElementById('reset-settings-btn');
            const wordPresetButtons = Array.from(document.querySelectorAll('[data-word-count]'));
            const timePresetButtons = Array.from(document.querySelectorAll('[data-study-time]'));
            const wordCustomButton = document.getElementById('word-count-custom-btn');
            const timeCustomButton = document.getElementById('time-custom-btn');
            const wordCustomControl = document.getElementById('word-count-custom-control');
            const timeCustomControl = document.getElementById('time-custom-control');
            let wordCustomMode = false;
            let timeCustomMode = false;

            function clampValue(value, min, max, fallback) {
                const parsed = Number.parseInt(value, 10);
                if (!Number.isFinite(parsed)) return fallback;
                return Math.min(max, Math.max(min, parsed));
            }

            function syncChoiceStates() {
                const wordCount = Number.parseInt(wordCountSlider.value, 10);
                const timeMinutes = Number.parseInt(timeSlider.value, 10);
                wordPresetButtons.forEach(button => {
                    const isActive = !wordCustomMode && Number.parseInt(button.dataset.wordCount, 10) === wordCount;
                    button.classList.toggle('active', isActive);
                    button.setAttribute('aria-pressed', String(isActive));
                });
                timePresetButtons.forEach(button => {
                    const isActive = !timeCustomMode && Number.parseInt(button.dataset.studyTime, 10) === timeMinutes;
                    button.classList.toggle('active', isActive);
                    button.setAttribute('aria-pressed', String(isActive));
                });
                wordCustomButton.classList.toggle('active', wordCustomMode);
                timeCustomButton.classList.toggle('active', timeCustomMode);
                wordCustomButton.setAttribute('aria-pressed', String(wordCustomMode));
                timeCustomButton.setAttribute('aria-pressed', String(timeCustomMode));
                wordCustomButton.textContent = wordCustomMode ? `自定义 · ${wordCount} 个` : '自定义';
                timeCustomButton.textContent = timeCustomMode ? `自定义 · ${timeMinutes} 分钟` : '自定义';
                wordCustomControl.classList.toggle('hidden', !wordCustomMode);
                timeCustomControl.classList.toggle('hidden', !timeCustomMode);
            }

            // 更新显示值
            function updateSettingsDisplay() {
                const wordCount = parseInt(wordCountSlider.value);
                const timeMinutes = parseInt(timeSlider.value);
                
                wordCountInput.value = wordCount;
                timeInput.value = timeMinutes;
                wordCountDisplay.textContent = `${wordCount} 个`;
                timeDisplay.textContent = `${timeMinutes} 分钟`;
                
                // 更新全局变量
                requestedWordCount = wordCount;
                timeLeft = timeMinutes * 60;
                initialTime = timeMinutes * 60;
                syncChoiceStates();
                
                console.log(`学习设置更新: ${wordCount}个单词, ${timeMinutes}分钟`);
            }
            
            wordPresetButtons.forEach(button => {
                button.addEventListener('click', () => {
                    wordCustomMode = false;
                    wordCountSlider.value = button.dataset.wordCount;
                    updateSettingsDisplay();
                });
            });
            timePresetButtons.forEach(button => {
                button.addEventListener('click', () => {
                    timeCustomMode = false;
                    timeSlider.value = button.dataset.studyTime;
                    updateSettingsDisplay();
                });
            });

            wordCustomButton.addEventListener('click', () => {
                wordCustomMode = true;
                syncChoiceStates();
                wordCountInput.focus();
            });
            timeCustomButton.addEventListener('click', () => {
                timeCustomMode = true;
                syncChoiceStates();
                timeInput.focus();
            });

            // 自定义值支持滑杆和数字直接输入，两者始终保持同步。
            wordCountSlider.addEventListener('input', () => {
                wordCustomMode = true;
                updateSettingsDisplay();
            });
            timeSlider.addEventListener('input', () => {
                timeCustomMode = true;
                updateSettingsDisplay();
            });
            wordCountInput.addEventListener('change', () => {
                wordCustomMode = true;
                wordCountSlider.value = clampValue(wordCountInput.value, 5, 50, Number.parseInt(wordCountSlider.value, 10));
                updateSettingsDisplay();
            });
            timeInput.addEventListener('change', () => {
                timeCustomMode = true;
                timeSlider.value = clampValue(timeInput.value, 3, 30, Number.parseInt(timeSlider.value, 10));
                updateSettingsDisplay();
            });
            
            // 展开/收起设置面板
            toggleSettingsBtn.addEventListener('click', function() {
                const isHidden = settingsPanel.classList.contains('hidden');
                if (isHidden) {
                    settingsPanel.classList.remove('hidden');
                    this.innerHTML = '<i class="fa fa-cog mr-1"></i>收起设置';
                } else {
                    settingsPanel.classList.add('hidden');
                    this.innerHTML = '<i class="fa fa-cog mr-1"></i>展开设置';
                }
            });
            
            // 重置设置
            resetSettingsBtn.addEventListener('click', function() {
                wordCustomMode = false;
                timeCustomMode = false;
                wordCountSlider.value = 10;
                timeSlider.value = 5;
                updateSettingsDisplay();
                alert('设置已重置为默认值: 10个单词, 5分钟');
            });
            
            // 初始化显示
            updateSettingsDisplay();
        }

        // 7. 年级信息更新
        function updateGradeInfo() {
            const difficultySelect = document.getElementById('difficulty');
            currentGrade = gradeSelect.value || 'grade6';
            currentDifficulty = difficultySelect.value || 'easy';

            if (!gradeSelect.value) {
                gradeSelect.value = currentGrade;
            }
            if (!difficultySelect.value) {
                difficultySelect.value = currentDifficulty;
            }
            
            // 年级信息映射
            const gradeMap = {
                grade1: { text: '一年级', badgeClass: 'grade1' },
                grade2: { text: '二年级', badgeClass: 'grade2' },
                grade3: { text: '三年级', badgeClass: 'grade3' },
                grade4: { text: '四年级', badgeClass: 'grade4' },
                grade5: { text: '五年级', badgeClass: 'grade5' },
                grade6: { text: '六年级', badgeClass: 'grade6' }
            };
            
            const gradeInfo = gradeMap[currentGrade];
            currentGradeText = gradeInfo.text;
            
            // 更新当前选择显示
            updateCurrentSelectionDisplay();
        }
        
        // 更新当前选择显示
        function updateCurrentSelectionDisplay() {
            const currentSelectionDisplay = document.getElementById('current-selection-display');
            if (currentSelectionDisplay) {
                const gradeMap = {
                    grade1: '一年级', grade2: '二年级', grade3: '三年级',
                    grade4: '四年级', grade5: '五年级', grade6: '六年级'
                };
                const difficultyMap = {
                    easy: '基础', medium: '进阶', hard: '挑战'
                };
                currentSelectionDisplay.textContent = `${gradeMap[currentGrade]} - ${difficultyMap[currentDifficulty]}`;
            }
        }
        
        // 获取当前年级文本
        function getCurrentGradeText() {
            const gradeMap = {
                grade1: '一年级', grade2: '二年级', grade3: '三年级',
                grade4: '四年级', grade5: '五年级', grade6: '六年级'
            };
            return gradeMap[currentGrade] || currentGrade;
        }

        function getAvailableDifficultyForGrade(gradeKey, preferredDifficulty) {
            const gradeData = window.wordDatabase[gradeKey];
            if (!gradeData) {
                return { difficulty: preferredDifficulty, words: [] };
            }

            const fallbackOrder = [preferredDifficulty, 'easy', 'medium', 'hard']
                .filter((value, index, array) => value && array.indexOf(value) === index);

            for (const difficulty of fallbackOrder) {
                const words = gradeData[difficulty] || [];
                if (words.length > 0) {
                    return { difficulty, words };
                }
            }

            return { difficulty: preferredDifficulty, words: [] };
        }

        // 8. 游戏初始化（包含答题记录）
        function initGame(generateNewWords = true) {
            currentWordIndex = 0;
            currentPreviewIndex = 0;
            if (generateNewWords) {
                previewWeakRoundActive = false;
            }
            score = 0;
            correctCount = 0;
            wrongCount = 0;
            firstWrongCount = 0;
            // 使用配置的时间设置
            timeLeft = initialTime;
            usedHints = 0;
            document.getElementById('words-list').innerHTML = '';

            // 生成当前年级和难度的单词
            if (generateNewWords || gameWords.length === 0) {
                // 检查是否选择了有效的年级和难度
                if (!currentGrade || !currentDifficulty) {
                    // 如果没有选择年级和难度，使用默认值
                    currentGrade = currentGrade || 'grade6';
                    currentDifficulty = currentDifficulty || 'easy';
                }
                
                const requestedDifficulty = currentDifficulty;
                const difficultyTextMap = {
                    easy: '基础',
                    medium: '进阶',
                    hard: '挑战'
                };
                const fallbackResult = getAvailableDifficultyForGrade(currentGrade, currentDifficulty);
                const gradeWords = fallbackResult.words;
                if (gradeWords.length === 0) {
                    alert(`当前年级难度下没有单词，请选择其他年级或难度`);
                    goToStartScreen();
                    return false;
                }

                if (fallbackResult.difficulty !== currentDifficulty) {
                    currentDifficulty = fallbackResult.difficulty;
                    document.getElementById('difficulty').value = currentDifficulty;
                    updateCurrentSelectionDisplay();
                    alert(`当前年级的${difficultyTextMap[requestedDifficulty] || requestedDifficulty}难度暂未配置单词，已自动切换到${difficultyTextMap[currentDifficulty] || currentDifficulty}难度继续学习。`);
                }
                
                // 如果单词数量不足，使用实际可用的单词数量
                const availableWords = Math.min(requestedWordCount, gradeWords.length);

                if (gradeWords.length < requestedWordCount) {
                    console.log(`当前年级难度下单词数量不足，使用${availableWords}个单词而不是${requestedWordCount}个`);
                }
                
                // 洗牌算法确保无重复
                gameWords = window.GameCore.selectWords(gradeWords, availableWords);
                scheduleWordAssetPreload(gameWords, 1, Math.min(WORD_ASSET_PREFETCH_COUNT, Math.max(0, gameWords.length - 1)));
            }

            wordAnswerRecords = gameWords.map(() => ({
                answered: false,
                firstCorrect: true,
                attemptCount: 0,
                questionType: '',
                responseTimeMs: 0,
                slowRecall: false,
                errorTypes: [],
                lastAnswer: '',
                quizResults: []
            }));

            // 更新UI
            updateWordStarHud();
            updateTimerDisplay();
            document.getElementById('feedback').classList.add('hidden');
            document.getElementById('hint').classList.add('hidden');
            document.getElementById('timer').classList.remove('text-danger');
            answerRecordEl.classList.add('hidden');
            updateProgressDisplay();
            renderRewardStars();
            updateMascotMessage('ready');

            // 初始化当前学习记录
            currentRecord = {
                grade: currentGrade,
                gradeText: currentGradeText,
                difficulty: currentDifficulty,
                difficultyText: getDifficultyText(),
                startTime: new Date().toISOString(),
                words: JSON.parse(JSON.stringify(gameWords)), // 深拷贝
                wordAnswerRecords: JSON.parse(JSON.stringify(wordAnswerRecords)), // 记录答题情况
                score: 0,
                correctCount: 0,
                wrongCount: 0,
                firstWrongCount: 0,
                requestedCount: requestedWordCount,
                totalCount: gameWords.length, // 使用实际的单词数量
                accuracy: 0,
                usedTime: 0,
                finishTime: null,
                status: 'in-progress',
                source: currentWordSource
            };

            // 更新进度显示
            document.getElementById('word-count').textContent = gameWords.length > 0
                ? `进度: ${currentWordIndex + 1}/${gameWords.length}`
                : '进度: 0/0';
            return true;
        }

        // 9. 难度文字转换
        function getDifficultyText() {
            const difficultyMap = {
                easy: '基础',
                medium: '进阶',
                hard: '挑战'
            };
            return difficultyMap[currentDifficulty] || '基础';
        }

        // 10. 显示卡片学习页面（单卡片版）
        function showPreviewScreen() {
            // 确保有单词数据
            if (gameWords.length === 0) {
                const initialized = initGame();
                if (!initialized) {
                    return;
                }
            }
            
            // 显示当前卡片
            showCurrentPreviewWord();
            
            // 更新按钮状态
            updatePreviewButtons();
            
            // 显示学习页面
            hideAllScreens();
            setPageMode('preview');
            previewScreen.classList.remove('screen-hidden');
        }
        
        // 显示当前预览单词
        function showCurrentPreviewWord() {
            clearPreviewAutoAdvance();
            clearPreviewAutoPronounce();
            if (currentPreviewIndex < 0 || currentPreviewIndex >= gameWords.length) {
                console.log('索引超出范围:', currentPreviewIndex, '单词总数:', gameWords.length);
                return;
            }
            
            const word = gameWords[currentPreviewIndex];
            
            const imageCandidates = getWordImageCandidates(word);
            const imageUrl = imageCandidates[0] || '';
            
            previewMissingImage.classList.toggle('hidden', imageCandidates.length > 0);
            previewWordImage.classList.toggle('hidden', imageCandidates.length === 0);
            previewWordImage.loading = 'eager';
            previewWordImage.decoding = 'async';
            previewWordImage.fetchPriority = 'high';
            if (imageCandidates.length > 0) {
                loadImageWithFallback(previewWordImage, imageCandidates, () => {
                    console.log('图片加载失败，显示缺少图片:', word.english, '候选链接:', imageCandidates);
                    previewWordImage.classList.add('hidden');
                    previewMissingImage.classList.remove('hidden');
                });
            } else {
                previewWordImage.onerror = null;
                previewWordImage.removeAttribute('src');
            }
            previewWordImage.alt = `${word.chinese}的图片`;
            previewEnglishWord.textContent = word.english;
            previewPhonetic.textContent = word.phonetic || '';
            previewChineseWord.textContent = word.chinese;
            const hideChinese = (currentRecord && currentRecord.reviewMode && word.hide_chinese_in_review !== false)
                || (!currentRecord?.reviewMode && word.show_chinese_in_learning === false);
            previewChineseWord.classList.toggle('hidden', hideChinese);
            previewReadTip.textContent = getReadTipForWord(word);
            previewExample.textContent = getExampleForWord(word);
            previewExampleCn.textContent = getExampleCnForWord(word);
            const mastery = loadMasteryRecords()[getWordKey(word)] || {};
            const adaptiveCards = window.MemoryCore.getAdaptiveCards(word, mastery);
            const chunkCard = adaptiveCards.find(card => ['compound', 'syllable', 'phrase'].includes(card.type));
            const memoryCard = adaptiveCards.find(card => card.type === 'scene');
            const spellingCard = adaptiveCards.find(card => card.type === 'spelling');
            previewSyllableSplit.textContent = chunkCard ? chunkCard.text : '';
            previewChunkTitle.textContent = chunkCard ? `${chunkCard.icon} ${chunkCard.title}` : '词块记忆';
            previewChunkCard.classList.toggle('hidden', !chunkCard);
            previewMemoryTip.textContent = memoryCard ? memoryCard.text : '';
            previewMemoryCard.classList.toggle('hidden', !memoryCard);
            previewSpellingTip.textContent = spellingCard ? spellingCard.text : '';
            previewSpellingCard.classList.toggle('hidden', !spellingCard);
            previewHelperEmpty.classList.toggle('hidden', adaptiveCards.length > 0);
            const visibleMemoryCardCount = [
                previewChunkCard,
                previewMemoryCard,
                previewSpellingCard
            ].filter(card => !card.classList.contains('hidden')).length;
            const visibleHelperCardCount = 2 + (visibleMemoryCardCount || 1);
            previewHelperStep.dataset.helperCardCount = String(visibleHelperCardCount);
            previewWordCount.textContent = `${currentPreviewIndex + 1}/${gameWords.length}`;
            setPreviewStep('study');
            schedulePreviewWordPronunciation(word, currentPreviewIndex);
            preloadWordAssets(gameWords, currentPreviewIndex + 1, 2, { defer: true, delay: 500 });

            console.log('显示单词:', word.english, '索引:', currentPreviewIndex, '图片链接:', imageUrl);
        }

        function updatePreviewStage(visualStep) {
            const stageOrder = ['study', 'helper', 'quiz'];
            previewStageItems.forEach((item) => {
                const itemStep = item.dataset.previewStage;
                item.classList.toggle('active', itemStep === visualStep);
                item.classList.toggle('complete', stageOrder.indexOf(itemStep) < stageOrder.indexOf(visualStep));
                if (itemStep === visualStep) {
                    item.setAttribute('aria-current', 'step');
                } else {
                    item.removeAttribute('aria-current');
                }
            });
        }

        function completePreviewStageTrack() {
            previewStageItems.forEach((item) => {
                item.classList.remove('active');
                item.classList.add('complete');
                item.removeAttribute('aria-current');
            });
        }

        function setPreviewStep(step) {
            currentPreviewStep = step;
            singleWordCard.dataset.previewStep = step;
            delete previewMainActionBtn.dataset.action;
            updatePreviewStage(step);
            previewStudyStep.classList.toggle('hidden', step !== 'study');
            previewHelperStep.classList.toggle('hidden', step !== 'helper');
            previewQuizStep.classList.toggle('hidden', step !== 'quiz');
            previewQuizFeedback.classList.add('hidden');

            if (step === 'study') {
                previewStepHint.textContent = '第 1/6 步：看图认识单词和意思。';
                previewMainActionBtn.textContent = '下一步：听读与记忆';
                previewMainActionBtn.classList.remove('hidden');
                previewHelpActionBtn.classList.add('hidden');
            } else if (step === 'helper') {
                previewStepHint.textContent = '第 2/6 步：听单词、跟读句子，需要时再看记忆提示。';
                previewMainActionBtn.textContent = '开始挑战：看图选英文';
                previewMainActionBtn.classList.remove('hidden');
                previewHelpActionBtn.classList.add('hidden');
                const word = gameWords[currentPreviewIndex];
                if (word) {
                    const helperWordIndex = currentPreviewIndex;
                    setTimeout(() => {
                        if (currentPreviewStep === 'helper' && currentPreviewIndex === helperWordIndex) {
                            pronounceWord(word.english, getAudioUrlForWord(word), previewWordAudioBtn, '🔊 听单词');
                        }
                    }, 180);
                }
            } else {
                previewStepHint.textContent = '第 3—6/6 步：选择题点选即作答，最后完成一次拼写。';
                previewMainActionBtn.classList.add('hidden');
                previewHelpActionBtn.classList.add('hidden');
            }

            const activeStep = step === 'study'
                ? previewStudyStep
                : (step === 'helper' ? previewHelperStep : previewQuizStep);
            activeStep.scrollTop = 0;
            updatePreviewButtons();
        }

        function handlePreviewMainAction() {
            if (previewMainActionBtn.dataset.action === 'reading') {
                goToReadingScreen(getCurrentLearningRoundWords());
                return;
            }

            if (currentPreviewStep === 'study') {
                setPreviewStep('helper');
                return;
            }

            if (currentPreviewStep === 'helper') {
                startPreviewQuiz();
            }
        }

        function startPreviewQuiz() {
            const word = gameWords[currentPreviewIndex];
            previewQuizQuestions = buildPreviewQuizQuestions(word);
            previewQuizIndex = 0;
            previewQuizAnsweredCount = 0;
            previewQuizSubmitting = false;
            previewRewardStreak = 0;
            previewRewardStars = 0;
            setPreviewStep('quiz');
            renderPreviewQuizQuestion();
        }

        function buildPreviewQuizQuestions(word) {
            const coreTypes = ['image_to_english', 'audio_to_english', 'english_to_chinese', 'spelling'];
            return coreTypes.map(type => createQuestionByType(word, type));
        }

        function getCurrentLearningRoundWords() {
            const completedWords = gameWords.filter((word, index) => word && isPreviewWordLearned(index));
            return completedWords.length >= 2 ? completedWords : gameWords.filter(Boolean);
        }

        function renderPreviewQuizQuestion() {
            clearPreviewAutoAdvance();
            const word = gameWords[currentPreviewIndex];
            previewQuizQuestion = previewQuizQuestions[previewQuizIndex];
            previewQuizStartedAt = Date.now();
            previewQuizSubmitting = false;
            const pageNumber = previewQuizIndex + 3;
            previewQuizTitle.textContent = `${previewQuizQuestion.title} ${pageNumber}/6`;
            previewQuizPrompt.textContent = previewQuizQuestion.prompt;
            previewQuizHelper.textContent = previewQuizQuestion.helper;
            previewQuizOptions.innerHTML = '';
            previewQuizFeedback.classList.add('hidden');

            const isSpelling = previewQuizQuestion.type === 'spelling' || previewQuizQuestion.type === 'phrase_order';
            previewQuizStep.dataset.questionType = previewQuizQuestion.type;
            previewQuizOptions.classList.toggle('hidden', isSpelling);
            previewQuizSpelling.classList.toggle('hidden', !isSpelling);
            previewQuizSubmitBtn.classList.toggle('hidden', !isSpelling);
            previewQuizSubmitBtn.disabled = true;
            previewQuizSubmitBtn.textContent = '提交答案';

            if (previewQuizQuestion.type === 'image_to_english') {
                const imageCandidates = getWordImageCandidates(word);
                previewQuizPrompt.innerHTML = imageCandidates.length
                    ? `<img src="${escapeHtml(imageCandidates[0])}" alt="${escapeHtml(word.chinese)}的图片" class="preview-quiz-image">`
                    : `<div class="preview-missing-image inline"><i class="fa fa-image"></i><strong>缺少图片</strong><span>${escapeHtml(word.image_file_name || '请填写 image_url')}</span></div>`;
                const quizImage = previewQuizPrompt.querySelector('img');
                if (quizImage) {
                    quizImage.loading = 'eager';
                    quizImage.decoding = 'async';
                    quizImage.fetchPriority = 'high';
                    loadImageWithFallback(quizImage, imageCandidates, () => {
                        previewQuizPrompt.innerHTML = `<div class="preview-missing-image inline"><i class="fa fa-image"></i><strong>缺少图片</strong><span>${escapeHtml(word.image_file_name || '请填写 image_url')}</span></div>`;
                    });
                }
            }

            if (previewQuizQuestion.type === 'audio_to_english') {
                previewQuizPrompt.innerHTML = `
                    <div class="audio-quiz-card">
                        <div class="audio-quiz-icon">🎧</div>
                        <div class="audio-quiz-copy">
                            <strong>听音，选择你听到的英文</strong>
                            <span>没听清可以点右侧按钮重复听。</span>
                        </div>
                        <button type="button" id="preview-replay-audio-btn" class="quiz-replay-audio-btn">🔊 再听一遍</button>
                    </div>
                `;
                const replayAudioBtn = document.getElementById('preview-replay-audio-btn');
                replayAudioBtn?.addEventListener('click', () => {
                    pronounceWord(word.english, getAudioUrlForWord(word), replayAudioBtn, '🔊 再听一遍');
                });
                setTimeout(() => pronounceWord(word.english, getAudioUrlForWord(word), replayAudioBtn, '🔊 再听一遍'), 150);
            }

            if (isSpelling) {
                buildPreviewSpellingInput(word, previewQuizQuestion.type);
                return;
            }

            previewQuizQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'active-recall-option';
                button.textContent = option;
                button.addEventListener('click', () => submitPreviewChoiceAnswer(option));
                previewQuizOptions.appendChild(button);
            });
        }

        function submitPreviewCurrentAnswer() {
            if (previewQuizSubmitting || !previewQuizQuestion) return;
            if (previewQuizQuestion.type === 'spelling' || previewQuizQuestion.type === 'phrase_order') {
                submitPreviewSpellingAnswer();
            }
        }

        function buildPreviewSpellingInput(word, questionType = 'spelling') {
            const spellingMode = questionType === 'phrase_order' ? 'phrase_order' : (word.spelling_test_mode || word.spelling_mode || 'partial_blank');
            previewQuizSpelling.dataset.mode = spellingMode;
            previewQuizSelectedIndices = [];
            previewQuizSpellingPattern.classList.add('hidden');
            previewQuizTextInput.classList.add('hidden');
            previewQuizAnswerSlots.classList.remove('hidden');
            previewQuizLetterBankEl.classList.remove('hidden');

            if (spellingMode === 'partial_blank') {
                previewQuizSpellingPattern.textContent = makePartialBlankPattern(word.english);
                previewQuizSpellingPattern.classList.remove('hidden');
                previewQuizTextInput.value = '';
                previewQuizTextInput.classList.remove('hidden');
                previewQuizAnswerSlots.classList.add('hidden');
                previewQuizLetterBankEl.classList.add('hidden');
                previewQuizSubmitBtn.disabled = true;
                previewQuizTextInput.oninput = () => {
                    previewQuizSubmitBtn.disabled = previewQuizTextInput.value.trim().length === 0;
                };
                setTimeout(() => previewQuizTextInput.focus(), 50);
                return;
            }

            if (spellingMode === 'full_blank') {
                previewQuizSpellingPattern.textContent = '____';
                previewQuizSpellingPattern.classList.remove('hidden');
                previewQuizTextInput.value = '';
                previewQuizTextInput.classList.remove('hidden');
                previewQuizAnswerSlots.classList.add('hidden');
                previewQuizLetterBankEl.classList.add('hidden');
                previewQuizSubmitBtn.disabled = true;
                previewQuizTextInput.oninput = () => {
                    previewQuizSubmitBtn.disabled = previewQuizTextInput.value.trim().length === 0;
                };
                setTimeout(() => previewQuizTextInput.focus(), 50);
                return;
            }

            const sourceItems = spellingMode === 'phrase_order'
                ? getPhraseChunks(word).map(chunk => shouldPreserveCase(word) ? chunk : chunk.toLowerCase())
                : (shouldPreserveCase(word)
                    ? String(word.english || '').replace(/[^a-zA-Z]/g, '').split('')
                    : sanitizeWordCharacters(word).map(char => char.toLowerCase()));
            previewQuizLetterBank = shuffleArray(sourceItems.map((char, index) => ({ char, originalIndex: index })));
            renderPreviewSpellingInput();
        }

        function renderPreviewSpellingInput() {
            const word = gameWords[currentPreviewIndex];
            const isPhraseOrder = previewQuizSpelling.dataset.mode === 'phrase_order';
            const targetLength = isPhraseOrder ? getPhraseChunks(word).length : sanitizeWordCharacters(word).length;
            previewQuizAnswerSlots.innerHTML = '';
            for (let i = 0; i < targetLength; i++) {
                const slot = document.createElement('button');
                slot.type = 'button';
                const bankIndex = previewQuizSelectedIndices[i];
                slot.className = `answer-slot ${bankIndex !== undefined ? 'filled' : ''}`;
                slot.textContent = bankIndex !== undefined ? previewQuizLetterBank[bankIndex].char : '_';
                if (bankIndex !== undefined) {
                    slot.addEventListener('click', () => {
                        previewQuizSelectedIndices.splice(i, 1);
                        renderPreviewSpellingInput();
                    });
                }
                previewQuizAnswerSlots.appendChild(slot);
            }

            previewQuizLetterBankEl.innerHTML = '';
            previewQuizLetterBank.forEach((item, index) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'letter-tile';
                button.textContent = item.char;
                button.disabled = previewQuizSelectedIndices.includes(index);
                button.addEventListener('click', () => {
                    if (!previewQuizSelectedIndices.includes(index)) {
                        previewQuizSelectedIndices.push(index);
                        renderPreviewSpellingInput();
                    }
                });
                previewQuizLetterBankEl.appendChild(button);
            });
            previewQuizSubmitBtn.disabled = previewQuizSelectedIndices.length !== targetLength;
        }

        function getPreviewSpellingAnswer() {
            const joiner = previewQuizSpelling.dataset.mode === 'phrase_order' ? ' ' : '';
            return previewQuizSelectedIndices.map(index => previewQuizLetterBank[index].char).join(joiner);
        }

        function submitPreviewSpellingAnswer() {
            if (!previewQuizQuestion || (previewQuizQuestion.type !== 'spelling' && previewQuizQuestion.type !== 'phrase_order')) {
                return;
            }
            const mode = previewQuizSpelling.dataset.mode;
            const rawAnswer = mode === 'partial_blank' || mode === 'full_blank'
                ? previewQuizTextInput.value.trim()
                : getPreviewSpellingAnswer();
            const selectedAnswer = mode === 'phrase_order'
                ? rawAnswer.trim().toLowerCase()
                : normalizeWordForGame(rawAnswer);
            const correctAnswer = mode === 'phrase_order'
                ? String(previewQuizQuestion.answer).trim().toLowerCase()
                : normalizeWordForGame(previewQuizQuestion.answer);
            finishPreviewQuizAnswer(rawAnswer, selectedAnswer === correctAnswer);
        }

        function submitPreviewChoiceAnswer(selectedAnswer) {
            if (!previewQuizQuestion || previewQuizQuestion.type === 'spelling' || previewQuizQuestion.type === 'phrase_order') {
                return;
            }
            finishPreviewQuizAnswer(selectedAnswer, selectedAnswer === previewQuizQuestion.answer);
        }

        function finishPreviewQuizAnswer(selectedAnswer, isCorrect) {
            if (previewQuizSubmitting) return;
            previewQuizSubmitting = true;
            previewQuizSubmitBtn.disabled = true;
            const word = gameWords[currentPreviewIndex];
            const responseTime = previewQuizStartedAt ? Date.now() - previewQuizStartedAt : 0;
            recordPreviewQuizAnswer(word, selectedAnswer, isCorrect, responseTime);

            previewQuizOptions.querySelectorAll('button').forEach(button => {
                button.disabled = true;
                if (button.textContent === previewQuizQuestion.answer) {
                    button.classList.add('correct');
                } else if (button.textContent === selectedAnswer && !isCorrect) {
                    button.classList.add('wrong');
                }
            });

            const isSpellingLike = previewQuizQuestion.type === 'spelling' || previewQuizQuestion.type === 'phrase_order';
            const spellingTip = getSpellingSecretForWord(word);
            if (isCorrect) {
                previewRewardStreak += 1;
                previewRewardStars += 1;
                awardWordStars(1, '学新词', word?.english || '');
                const praises = ['太棒了！', '答对啦！', '很准确！', '记得真牢！'];
                const praise = praises[(previewQuizIndex + previewQuizAnsweredCount) % praises.length];
                const streakText = previewRewardStreak >= 2 ? ` · 连对 ${previewRewardStreak} 题` : '';
                previewQuizFeedback.innerHTML = `<strong>⭐ ${praise}</strong><span>+1 记忆星${streakText}，现在有 ${previewRewardStars} 颗。</span>`;
            } else {
                previewRewardStreak = 0;
                resetWordStarStreak();
                const correction = isSpellingLike && spellingTip
                    ? escapeHtml(spellingTip)
                    : `正确答案是 <b>${escapeHtml(previewQuizQuestion.answer)}</b>`;
                previewQuizFeedback.innerHTML = `<strong>💪 找到一个薄弱点</strong><span>${correction}。它会进入薄弱复习，再遇到就会更稳。</span>`;
            }
            previewQuizFeedback.className = `preview-quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
            previewQuizFeedback.classList.remove('hidden');
            previewQuizAnsweredCount++;

            const advanceDelay = isCorrect
                ? (isSpellingLike ? PREVIEW_SPELLING_PRAISE_HOLD_MS : PREVIEW_PRAISE_HOLD_MS)
                : PREVIEW_WRONG_FEEDBACK_HOLD_MS;
            previewAutoAdvanceTimer = setTimeout(() => {
                previewAutoAdvanceTimer = null;
                previewQuizIndex++;
                if (previewQuizIndex < previewQuizQuestions.length) {
                    renderPreviewQuizQuestion();
                    return;
                }
                finishPreviewQuizForWord();
            }, advanceDelay);
        }

        function recordPreviewQuizAnswer(word, selectedAnswer, isCorrect, responseTime) {
            const errorType = isCorrect
                ? (responseTime > SLOW_RECALL_MS ? 'slow_recall' : '')
                : (QUESTION_ERROR_TYPES[previewQuizQuestion.type] || 'meaning_error');
            const tempAnswerRecord = {
                answered: true,
                firstCorrect: isCorrect,
                attemptCount: 1,
                questionType: previewQuizQuestion.type,
                responseTimeMs: responseTime,
                slowRecall: responseTime > SLOW_RECALL_MS,
                errorTypes: errorType ? [errorType] : [],
                lastAnswer: selectedAnswer
            };

            const sharedRecord = wordAnswerRecords[currentPreviewIndex];
            sharedRecord.answered = true;
            sharedRecord.attemptCount = (sharedRecord.attemptCount || 0) + 1;
            sharedRecord.firstCorrect = sharedRecord.firstCorrect && isCorrect;
            sharedRecord.questionType = previewQuizQuestion.type;
            sharedRecord.responseTimeMs = responseTime;
            sharedRecord.slowRecall = sharedRecord.slowRecall || responseTime > SLOW_RECALL_MS;
            sharedRecord.lastAnswer = selectedAnswer;
            sharedRecord.errorTypes = Array.from(new Set([...(sharedRecord.errorTypes || []), ...tempAnswerRecord.errorTypes]));
            sharedRecord.quizResults = [
                ...(sharedRecord.quizResults || []),
                {
                    word_id: word.word_id || getWordKey(word),
                    isCorrect,
                    responseTime,
                    questionType: previewQuizQuestion.type,
                    errorType,
                    userAnswer: selectedAnswer,
                    correctAnswer: previewQuizQuestion.answer
                }
            ];

            const latestResult = sharedRecord.quizResults[sharedRecord.quizResults.length - 1];
            if (latestResult) {
                latestResult.masteryLevel = null;
                latestResult.nextReviewAt = null;
            }
        }

        function finishPreviewQuizForWord() {
            const word = gameWords[currentPreviewIndex];
            const sharedRecord = wordAnswerRecords[currentPreviewIndex];
            const quizResults = sharedRecord.quizResults || [];
            const allCorrect = quizResults.length > 0 && quizResults.every(result => result.isCorrect);
            const slowRecall = quizResults.some(result => result.responseTime > SLOW_RECALL_MS);
            const aggregateErrorTypes = Array.from(new Set(quizResults.map(result => result.errorType).filter(Boolean)));
            const aggregateRecord = {
                answered: true,
                firstCorrect: allCorrect,
                attemptCount: quizResults.length,
                questionType: 'preview_quiz',
                responseTimeMs: quizResults.reduce((sum, result) => sum + result.responseTime, 0),
                slowRecall,
                errorTypes: aggregateErrorTypes,
                lastAnswer: quizResults[quizResults.length - 1]?.userAnswer || ''
            };
            const tempRecord = {
                grade: currentGrade,
                gradeText: currentGradeText,
                difficulty: currentDifficulty,
                difficultyText: getDifficultyText(),
                finishTime: new Date().toISOString(),
                words: [word],
                wordAnswerRecords: [aggregateRecord]
            };
            updateMasteryFromRecord(tempRecord);
            Object.assign(sharedRecord, aggregateRecord, {
                completedAt: new Date().toISOString(),
                quizResults
            });
            const updatedEntry = loadMasteryRecords()[getWordKey(word)];
            if (updatedEntry) {
                quizResults.forEach(result => {
                    result.masteryLevel = updatedEntry.mastery_level;
                    result.nextReviewAt = updatedEntry.next_review_at || updatedEntry.nextReviewAt;
                });
            }

            previewQuizTitle.textContent = '这张卡学完啦';
            completePreviewStageTrack();
            currentPreviewStep = 'complete';
            singleWordCard.dataset.previewStep = 'complete';
            const needsWork = aggregateErrorTypes.length > 0 || !allCorrect;
            const nextReviewAt = updatedEntry ? (updatedEntry.next_review_at || updatedEntry.nextReviewAt) : '';
            const nextReviewText = nextReviewAt ? formatReviewTime(nextReviewAt) : '稍后';
            const strengtheningTip = getSpellingSecretForWord(word) || getMemoryTipForWord(word);
            const completedRoundWords = getCurrentLearningRoundWords();
            const canReadStory = completedRoundWords.length >= 2
                && gameWords.every((item, index) => !item || isPreviewWordLearned(index));
            previewQuizPrompt.innerHTML = `
                <div class="preview-complete-card">
                    <strong>${escapeHtml(word.english)} = ${escapeHtml(word.chinese)}</strong>
                    <span>${needsWork ? '这个词还不太熟。' : '你已经完成听音、记忆和小测试。'}</span>
                    <span>${needsWork && strengtheningTip ? `重点记住：${escapeHtml(strengtheningTip)}` : `${nextReviewText}我们会再复习一次。`}</span>
                    <span>${canReadStory ? '这一轮词学完了，可以读一篇只含刚学词的小故事。' : `下次复习：${escapeHtml(nextReviewText)}`}</span>
                </div>
            `;
            previewQuizHelper.textContent = '';
            previewQuizOptions.innerHTML = '';
            previewQuizOptions.classList.add('hidden');
            previewQuizSpelling.classList.add('hidden');
            previewQuizSubmitBtn.classList.add('hidden');
            previewQuizFeedback.classList.add('hidden');
            if (canReadStory) {
                previewMainActionBtn.textContent = '读刚学单词小故事';
                previewMainActionBtn.dataset.action = 'reading';
                previewMainActionBtn.classList.remove('hidden');
            } else {
                previewMainActionBtn.classList.add('hidden');
            }
            previewHelpActionBtn.classList.add('hidden');
            updatePreviewButtons();
        }

        function clearPreviewAutoAdvance() {
            if (previewAutoAdvanceTimer) {
                clearTimeout(previewAutoAdvanceTimer);
                previewAutoAdvanceTimer = null;
            }
        }

        function clearPreviewAutoPronounce() {
            if (previewAutoPronounceTimer) {
                clearTimeout(previewAutoPronounceTimer);
                previewAutoPronounceTimer = null;
            }
        }

        function schedulePreviewWordPronunciation(word, wordIndex) {
            clearPreviewAutoPronounce();
            previewAutoPronounceTimer = setTimeout(() => {
                previewAutoPronounceTimer = null;
                if (currentPreviewStep === 'study' && currentPreviewIndex === wordIndex) {
                    pronounceWord(word.english, getAudioUrlForWord(word));
                }
            }, 240);
        }

        function schedulePreviewAutoAdvance() {
            clearPreviewAutoAdvance();
        }

        function isPreviewWordLearned(index) {
            const record = wordAnswerRecords[index];
            return Boolean(record && (record.completedAt || record.questionType === 'preview_quiz'));
        }

        function getPreviewWeakWords() {
            return wordAnswerRecords
                .map((answerRecord, index) => ({ answerRecord, word: gameWords[index] }))
                .filter(({ answerRecord, word }) => {
                    if (!word || !answerRecord || !answerRecord.answered) return false;
                    return answerRecord.firstCorrect === false
                        || answerRecord.slowRecall
                        || (answerRecord.errorTypes || []).filter(Boolean).length > 0;
                })
                .map(({ word }) => word);
        }

        function startPreviewWeakRound() {
            const weakWords = getPreviewWeakWords();
            if (weakWords.length === 0) {
                startGame();
                return;
            }

            gameWords = weakWords.slice(0, Math.min(requestedWordCount, weakWords.length));
            previewWeakRoundActive = true;
            const initialized = initGame(false);
            if (!initialized) {
                return;
            }
            if (currentRecord) {
                currentRecord.reviewMode = true;
                currentRecord.reviewLabel = '薄弱点小回合';
                currentRecord.totalCount = gameWords.length;
                currentRecord.requestedCount = gameWords.length;
            }
            showPreviewScreen();
        }

        function formatReviewTime(dateText) {
            const reviewDate = new Date(dateText);
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            const target = new Date(reviewDate.getFullYear(), reviewDate.getMonth(), reviewDate.getDate()).getTime();
            const diffDays = Math.round((target - today) / 86400000);
            if (diffDays <= 0) return '今天晚点';
            if (diffDays === 1) return '明天';
            return `${diffDays}天后`;
        }
        
        // 显示上一个单词
        function showPreviousWord() {
            clearPreviewAutoAdvance();
            console.log('尝试上一个单词，当前索引:', currentPreviewIndex);
            
            if (currentPreviewIndex > 0) {
                currentPreviewIndex--;
                console.log('切换到索引:', currentPreviewIndex);
                showCurrentPreviewWord();
                updatePreviewButtons();
            } else {
                console.log('已经是第一个单词');
            }
        }
        
        // 显示下一个单词
        function showNextWord() {
            clearPreviewAutoAdvance();
            console.log('尝试下一个单词，当前索引:', currentPreviewIndex, '总数:', gameWords.length);
            if (nextWordBtn.disabled) {
                return;
            }
            
            if (currentPreviewIndex < gameWords.length - 1) {
                currentPreviewIndex++;
                console.log('切换到索引:', currentPreviewIndex);
                showCurrentPreviewWord();
                updatePreviewButtons();
            } else {
                const weakWords = getPreviewWeakWords();
                if (!previewWeakRoundActive && weakWords.length > 0) {
                    console.log('进入薄弱点小回合:', weakWords.length);
                    startPreviewWeakRound();
                    return;
                }
                console.log('已经是最后一个单词，进入游戏检验');
                startGame();
            }
        }
        
        // 更新预览按钮状态
        function updatePreviewButtons() {
            // 上一个按钮状态
            if (currentPreviewIndex === 0) {
                prevWordBtn.disabled = true;
                prevWordBtn.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                prevWordBtn.disabled = false;
                prevWordBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
            
            const canGoNext = isPreviewWordLearned(currentPreviewIndex);
            if (currentPreviewIndex >= gameWords.length - 1) {
                const weakCount = getPreviewWeakWords().length;
                nextWordBtn.textContent = (!previewWeakRoundActive && weakCount > 0)
                    ? `复习薄弱点（${weakCount}个）`
                    : '开始游戏检验';
            } else {
                nextWordBtn.textContent = canGoNext ? '确认下一张' : '下一张';
            }

            if (!canGoNext) {
                nextWordBtn.disabled = true;
                nextWordBtn.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                nextWordBtn.disabled = false;
                nextWordBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }

        // 11. 开始卡片学习
        function learnFirst() {
            if (!initGame()) {
                return;
            }
            showPreviewScreen();
        }

        // 直接开始游戏
        function startDirectly() {
            if (!initGame()) {
                return;
            }
            startGame();
        }

        // 12. 开始游戏
        function startGame() {
            hideAllScreens();
            setPageMode('game');
            gameScreen.classList.remove('screen-hidden');
            
            // 显示当前单词
            showCurrentWord();
            
            // 开始计时
            if (!gameStarted) {
                gameStarted = true;
                startTimer();
            }
        }

        // 显示当前单词
        function showCurrentWord() {
            if (currentWordIndex >= gameWords.length) {
                endGame();
                return;
            }
            
            const currentWord = gameWords[currentWordIndex];
            activeQuestion = createActiveQuestion(currentWord, currentWordIndex);
            gameScreen.dataset.questionType = activeQuestion.type;
            questionStartedAt = Date.now();
            questionTitleEl.textContent = activeQuestion.title;
            questionHelperEl.textContent = activeQuestion.helper;
            document.getElementById('chinese-word').textContent = activeQuestion.prompt;
            document.getElementById('word-count').textContent = `进度: ${currentWordIndex + 1}/${gameWords.length}`;
            document.getElementById('feedback').classList.add('hidden');
            document.getElementById('hint').classList.add('hidden');
            renderActiveQuestionInput(currentWord);
            updateMascotMessage('ready');
            preloadWordAssets(gameWords, currentWordIndex + 1, 2, { defer: true, delay: 500 });

            if (activeQuestion.type === 'audio_to_english' || activeQuestion.type === 'spelling') {
                setTimeout(() => {
                    pronounceWord(currentWord.english, getAudioUrlForWord(currentWord));
                }, 300);
            }
            
            // 检查是否有答题记录
            if (wordAnswerRecords[currentWordIndex].answered) {
                answerRecordEl.classList.remove('hidden');
                if (wordAnswerRecords[currentWordIndex].firstCorrect) {
                    recordTextEl.textContent = `首次答题 - 正确 (尝试${wordAnswerRecords[currentWordIndex].attemptCount}次)`;
                } else {
                    recordTextEl.textContent = `首次答题 - 错误 (尝试${wordAnswerRecords[currentWordIndex].attemptCount}次)`;
                }
            } else {
                answerRecordEl.classList.add('hidden');
            }
        }

        function renderActiveQuestionInput(currentWord) {
            activeRecallOptionsEl.innerHTML = '';
            activeRecallOptionsEl.classList.toggle('hidden', isSpellingQuestion());
            answerSlotsEl.classList.toggle('hidden', !isSpellingQuestion());
            letterBankEl.classList.toggle('hidden', !isSpellingQuestion());
            removeLetterBtn.classList.toggle('hidden', !isSpellingQuestion());
            clearAnswerBtn.classList.toggle('hidden', !isSpellingQuestion());
            shuffleLettersBtn.classList.toggle('hidden', !isSpellingQuestion());
            document.getElementById('submit-btn').classList.toggle('hidden', !isSpellingQuestion());

            if (isSpellingQuestion()) {
                letterGameInstructionEl.textContent = '拖到任意空格，或先点空格再选字母。';
                buildLetterBank(currentWord);
                return;
            }

            letterGameInstructionEl.textContent = '先在脑中回忆答案，再点击选项。';
            activeQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'active-recall-option';
                button.textContent = option;
                button.addEventListener('click', () => submitActiveRecallAnswer(option));
                activeRecallOptionsEl.appendChild(button);
            });
        }

        // 13. 检查答案
        function checkAnswer() {
            if (!isSpellingQuestion()) {
                return;
            }
            const currentWord = gameWords[currentWordIndex];
            const feedbackEl = document.getElementById('feedback');
            const userAnswer = normalizeWordForGame(getSelectedAnswer());
            const correctAnswer = normalizeWordForGame(currentWord.english);
            const responseTimeMs = questionStartedAt ? Date.now() - questionStartedAt : 0;
            
            // 记录尝试次数
            wordAnswerRecords[currentWordIndex].attemptCount++;
            wordAnswerRecords[currentWordIndex].questionType = activeQuestion.type;
            wordAnswerRecords[currentWordIndex].responseTimeMs = responseTimeMs;
            wordAnswerRecords[currentWordIndex].slowRecall = responseTimeMs > SLOW_RECALL_MS;
            wordAnswerRecords[currentWordIndex].lastAnswer = userAnswer;
            
            if (userAnswer === correctAnswer) {
                // 答案正确
                correctCount++;
                score += 10 - usedHints; // 提示会扣分
                feedbackEl.textContent = `正确！${currentWord.english} 的意思是 ${currentWord.chinese}`;
                feedbackEl.className = 'p-4 rounded-lg text-center text-lg bg-green-50 text-green-700 border border-green-200';
                
                // 如果是首次回答正确，记录
                if (!wordAnswerRecords[currentWordIndex].answered) {
                    wordAnswerRecords[currentWordIndex].answered = true;
                    wordAnswerRecords[currentWordIndex].firstCorrect = true;
                    if (responseTimeMs > SLOW_RECALL_MS) {
                        wordAnswerRecords[currentWordIndex].errorTypes.push('slow_recall');
                    }
                }

                launchCelebration();
                awardWordStars(Math.max(1, 2 - usedHints), '做挑战', currentWord.english);
                updateMascotMessage('correct');
                
                // 添加到已完成列表
                addToCompletedList(currentWord, true);
                
                // 延迟进入下一题
                setTimeout(() => {
                    currentWordIndex++;
                    usedHints = 0;
                    updateProgressDisplay();
                    showCurrentWord();
                }, GAME_PRAISE_HOLD_MS);
            } else {
                // 答案错误
                wrongCount++;
                feedbackEl.textContent = `错误！正确答案是 ${currentWord.english}`;
                feedbackEl.className = 'p-4 rounded-lg text-center text-lg bg-red-50 text-red-700 border border-red-200';
                
                // 如果是首次回答错误，记录
                if (!wordAnswerRecords[currentWordIndex].answered) {
                    wordAnswerRecords[currentWordIndex].answered = true;
                    wordAnswerRecords[currentWordIndex].firstCorrect = false;
                    wordAnswerRecords[currentWordIndex].errorTypes.push(QUESTION_ERROR_TYPES[activeQuestion.type] || 'spelling_error');
                    firstWrongCount++; // 首次答错计数增加
                }
                updateMascotMessage('wrong');
                resetWordStarStreak();
                
                // 延迟清空输入框
                setTimeout(() => {
                    clearSelectedLetters();
                }, 1500);
            }
            
            // 更新分数
            updateWordStarHud();
            renderRewardStars();
            feedbackEl.classList.remove('hidden');
        }

        function submitActiveRecallAnswer(selectedAnswer) {
            if (!activeQuestion || isSpellingQuestion()) {
                return;
            }

            const currentWord = gameWords[currentWordIndex];
            const feedbackEl = document.getElementById('feedback');
            const isCorrect = selectedAnswer === activeQuestion.answer;
            const responseTimeMs = questionStartedAt ? Date.now() - questionStartedAt : 0;
            const answerRecord = wordAnswerRecords[currentWordIndex];

            activeRecallOptionsEl.querySelectorAll('button').forEach(button => {
                button.disabled = true;
                if (button.textContent === activeQuestion.answer) {
                    button.classList.add('correct');
                } else if (button.textContent === selectedAnswer && !isCorrect) {
                    button.classList.add('wrong');
                }
            });

            answerRecord.answered = true;
            answerRecord.firstCorrect = isCorrect;
            answerRecord.attemptCount = 1;
            answerRecord.questionType = activeQuestion.type;
            answerRecord.responseTimeMs = responseTimeMs;
            answerRecord.slowRecall = responseTimeMs > SLOW_RECALL_MS;
            answerRecord.lastAnswer = selectedAnswer;
            answerRecord.errorTypes = [];

            if (isCorrect) {
                correctCount++;
                score += responseTimeMs > SLOW_RECALL_MS ? 8 : 10;
                if (responseTimeMs > SLOW_RECALL_MS) {
                    answerRecord.errorTypes.push('slow_recall');
                }
                feedbackEl.textContent = `正确！${currentWord.english} 的意思是 ${currentWord.chinese}`;
                feedbackEl.className = 'p-4 rounded-lg text-center text-lg bg-green-50 text-green-700 border border-green-200';
                launchCelebration();
                awardWordStars(responseTimeMs > SLOW_RECALL_MS ? 1 : 2, '做挑战', currentWord.english);
                updateMascotMessage('correct');
                addToCompletedList(currentWord, true);
            } else {
                wrongCount++;
                firstWrongCount++;
                answerRecord.errorTypes.push(QUESTION_ERROR_TYPES[activeQuestion.type] || 'meaning_error');
                answerRecord.errorTypes.push('confusion_error');
                const spellingHint = activeQuestion.type === 'spelling' ? `差一点，${getSpellingSecretForWord(currentWord)}` : `这题选错了，正确答案是 ${activeQuestion.answer}`;
                feedbackEl.textContent = spellingHint;
                feedbackEl.className = 'p-4 rounded-lg text-center text-lg bg-red-50 text-red-700 border border-red-200';
                updateMascotMessage('wrong');
                resetWordStarStreak();
                addToCompletedList(currentWord, false);
            }

            updateWordStarHud();
            renderRewardStars();
            feedbackEl.classList.remove('hidden');

            setTimeout(() => {
                currentWordIndex++;
                usedHints = 0;
                updateProgressDisplay();
                showCurrentWord();
            }, isCorrect ? GAME_PRAISE_HOLD_MS : GAME_WRONG_FEEDBACK_HOLD_MS);
        }

        // 添加到已完成列表
        function addToCompletedList(word, isCorrect) {
            // 新版挑战页以当前题为核心，不再在底部堆叠已完成单词。
            // 否则会出现“第一个词一直露在底部”的视觉干扰。
            return;
            const wordsListEl = document.getElementById('words-list');
            const wordEl = document.createElement('div');
            wordEl.className = `rounded-lg p-2 text-center text-sm ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`;
            wordEl.innerHTML = `
                <div class="font-bold">${word.english}</div>
                <div class="text-xs">${word.chinese}</div>
            `;
            wordsListEl.appendChild(wordEl);
        }

        // 14. 显示提示
        function showHint() {
            if (!isSpellingQuestion()) {
                const hintEl = document.getElementById('hint');
                hintEl.textContent = activeQuestion && activeQuestion.type === 'audio_to_english'
                    ? `提示: 再听一遍，开头音接近 ${String(activeQuestion.answer || '').charAt(0).toUpperCase()}`
                    : `提示: ${activeQuestion ? activeQuestion.helper : '先回忆，再选择。'}`;
                hintEl.classList.remove('hidden');
                if (activeQuestion && activeQuestion.type === 'audio_to_english') {
                    pronounceWord(gameWords[currentWordIndex].english, getAudioUrlForWord(gameWords[currentWordIndex]));
                }
                updateMascotMessage('hint');
                return;
            }

            if (usedHints >= 3) {
                alert('提示次数已用完！');
                return;
            }
            
            const currentWord = gameWords[currentWordIndex];
            const hintEl = document.getElementById('hint');
            const normalizedWord = normalizeWordForGame(currentWord.english);
            usedHints++;
            
            if (usedHints === 1) {
                hintEl.textContent = `提示: 开头字母是 "${normalizedWord[0].toUpperCase()}"`;
            } else if (usedHints === 2) {
                const lengthHint = normalizedWord.length;
                hintEl.textContent = `提示: 单词长度为 ${lengthHint} 个字母`;
            } else {
                const maskedWord = normalizedWord.split('').map((char, index) => 
                    index < 2 ? char : '_'
                ).join('');
                hintEl.textContent = `提示: 前两个字母是 "${maskedWord}"`;
            }
            
            hintEl.classList.remove('hidden');
            updateMascotMessage('hint');
        }

        // 15. 计时器功能
        function startTimer() {
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                
                // 更新时间进度条
                const percentage = (timeLeft / initialTime) * 100;
                const timeProgressEl = document.getElementById('time-progress');
                if (timeProgressEl) {
                    timeProgressEl.style.width = `${percentage}%`;
                }
                
                // 时间不足时警告
                if (timeLeft <= 60) {
                    document.getElementById('timer').classList.add('text-danger');
                }
                
                // 时间到结束游戏
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    endGame();
                }
            }, 1000);
        }

        // 更新计时器显示
        function updateTimerDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }

        // 更新进度显示
        function updateProgressDisplay() {
            const totalCount = gameWords.length;
            const progress = totalCount === 0 ? 0 : (currentWordIndex / totalCount) * 100;
            document.getElementById('completion-progress').style.width = `${progress}%`;
            document.getElementById('progress-text').textContent = `完成度: ${Math.round(progress)}%`;
        }

        // 16. 结束游戏
        function endGame() {
            clearInterval(timerInterval);
            gameStarted = false;
            const timeProgressEl = document.getElementById('time-progress');
            if (timeProgressEl) {
                timeProgressEl.style.width = '100%';
            }
            
            // 保存学习记录
            saveStudyRecord();
            
            // 更新结束页面信息
            document.getElementById('final-score').textContent = `${score}分`;
            
            const accuracy = Math.round((correctCount / gameWords.length) * 100);
            document.getElementById('accuracy').textContent = `${accuracy}%`;
            
            document.getElementById('correct-count').textContent = `${correctCount}/${gameWords.length}`;
            document.getElementById('first-wrong-count').textContent = firstWrongCount;
            
            // 格式化用时
            const usedTime = initialTime - timeLeft;
            const usedMinutes = Math.floor(usedTime / 60);
            const usedSeconds = usedTime % 60;
            document.getElementById('used-time').textContent = `${usedMinutes}分${usedSeconds < 10 ? '0' + usedSeconds : usedSeconds}秒`;
            
            // 根据得分显示不同信息
            const resultTitle = document.getElementById('result-title');
            const resultMessage = document.getElementById('result-message');
            const resultIcon = document.getElementById('result-icon');
            
            if (accuracy === 100) {
                resultTitle.textContent = '太棒了！满分！';
                resultMessage.textContent = `你在${usedMinutes}分${usedSeconds}秒内完美完成了所有单词`;
                resultIcon.innerHTML = '<i class="fa fa-trophy text-accent"></i>';
            } else if (accuracy >= 80) {
                resultTitle.textContent = '非常好！';
                resultMessage.textContent = `你的正确率达到了${accuracy}%，继续努力！`;
                resultIcon.innerHTML = '<i class="fa fa-star text-yellow-500"></i>';
            } else if (accuracy >= 60) {
                resultTitle.textContent = '做得不错！';
                resultMessage.textContent = `你的正确率是${accuracy}%，再试一次会更好！`;
                resultIcon.innerHTML = '<i class="fa fa-check-circle text-green-500"></i>';
            } else {
                resultTitle.textContent = '继续加油！';
                resultMessage.textContent = `你的正确率是${accuracy}%，建议再复习一下单词`;
                resultIcon.innerHTML = '<i class="fa fa-thumbs-up text-blue-500"></i>';
            }
            renderResultReviewAdvice();
            updateMascotMessage('finish');
            
            // 显示结束页面
            hideAllScreens();
            setPageMode('end');
            endScreen.classList.remove('screen-hidden');
        }

        // 17. 历史记录相关函数
        function loadStudyRecords() {
            const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            updateAnalysisData(records);
            return records;
        }

        function getRecordTotalCount(record) {
            return window.StatisticsCore.recordTotal(record);
            if (!record) return 0;
            if (typeof record.totalCount === 'number' && record.totalCount > 0) {
                return record.totalCount;
            }
            return Array.isArray(record.words) ? record.words.length : 0;
        }

        function getWrongAttemptCount(answerRecord) {
            return window.StatisticsCore.wrongAttempts(answerRecord);
            if (!answerRecord || !answerRecord.answered || answerRecord.firstCorrect) {
                return 0;
            }
            return Math.max(1, (answerRecord.attemptCount || 1) - 1);
        }

        function getWordKey(word) {
            return `${normalizeWordForGame(word.english)}-${String(word.chinese).trim()}`;
        }

        function buildWrongWordBook(records) {
            const wrongWordsMap = {};

            records.forEach(record => {
                if (!record.wordAnswerRecords || !record.words) {
                    return;
                }

                record.wordAnswerRecords.forEach((answerRecord, index) => {
                    if (!answerRecord || !answerRecord.answered || answerRecord.firstCorrect) {
                        return;
                    }

                    const word = record.words[index];
                    if (!word) {
                        return;
                    }

                    const wordKey = getWordKey(word);
                    const wrongCountForAttempt = getWrongAttemptCount(answerRecord);
                    if (!wrongWordsMap[wordKey]) {
                        wrongWordsMap[wordKey] = {
                            ...word,
                            grade: record.grade,
                            gradeText: record.gradeText,
                            difficulty: record.difficulty,
                            difficultyText: record.difficultyText,
                            wrongCount: 0,
                            firstWrongCount: 0,
                            totalAttempts: 0,
                            lastWrongAt: record.finishTime || record.startTime
                        };
                    }

                    wrongWordsMap[wordKey].wrongCount += wrongCountForAttempt;
                    wrongWordsMap[wordKey].firstWrongCount++;
                    wrongWordsMap[wordKey].totalAttempts += answerRecord.attemptCount || 0;
                    wrongWordsMap[wordKey].lastWrongAt = record.finishTime || record.startTime || wrongWordsMap[wordKey].lastWrongAt;
                });
            });

            return Object.values(wrongWordsMap).sort((a, b) => {
                if (b.firstWrongCount !== a.firstWrongCount) {
                    return b.firstWrongCount - a.firstWrongCount;
                }
                if (b.wrongCount !== a.wrongCount) {
                    return b.wrongCount - a.wrongCount;
                }
                return new Date(b.lastWrongAt || 0) - new Date(a.lastWrongAt || 0);
            });
        }

        function isSameLocalDate(dateText, targetDate = new Date()) {
            if (!dateText) return false;
            const date = new Date(dateText);
            return date.getFullYear() === targetDate.getFullYear()
                && date.getMonth() === targetDate.getMonth()
                && date.getDate() === targetDate.getDate();
        }

        function collectErrorTypeStats(records) {
            const stats = {};
            records.forEach(record => {
                (record.wordAnswerRecords || []).forEach(answerRecord => {
                    (answerRecord.errorTypes || []).forEach(type => {
                        stats[type] = (stats[type] || 0) + 1;
                    });
                });
            });
            return stats;
        }

        function getErrorTypeLabel(type) {
            const labels = {
                meaning_error: '意思不熟',
                pronunciation_error: '听音不熟',
                spelling_error: '拼写错误',
                confusion_error: '容易混淆',
                slow_recall: '反应偏慢',
                usage_error: '例句运用不熟'
            };
            return labels[type] || type;
        }

        function renderParentDailyReport(records) {
            if (!parentDailyReportEl) {
                return;
            }

            const todayRecords = records.filter(record => isSameLocalDate(record.finishTime || record.startTime));
            if (todayRecords.length === 0) {
                parentDailyReportEl.innerHTML = `
                    <div class="daily-report-title">今日建议</div>
                    <p class="daily-report-action">开始一轮卡片学习，完成后这里会告诉你下一步该复习什么。</p>
                `;
                return;
            }

            const learnedCount = todayRecords.reduce((sum, record) => sum + getRecordTotalCount(record), 0);
            const reviewCount = todayRecords
                .filter(record => record.reviewMode)
                .reduce((sum, record) => sum + getRecordTotalCount(record), 0);
            const totalCorrect = todayRecords.reduce((sum, record) => sum + (record.correctCount || 0), 0);
            const totalCount = todayRecords.reduce((sum, record) => sum + getRecordTotalCount(record), 0);
            const accuracy = totalCount > 0 ? Math.round((totalCorrect / totalCount) * 100) : 0;
            const todayWrongWords = buildWrongWordBook(todayRecords).slice(0, 6);
            const errorStats = collectErrorTypeStats(todayRecords);
            const mainProblems = Object.entries(errorStats)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([type, count]) => `${getErrorTypeLabel(type)} ${count} 次`);
            const dueTomorrow = Object.values(loadMasteryRecords())
                .filter(word => {
                    const nextReviewAt = word.nextReviewAt || word.next_review_at;
                    if (!nextReviewAt) return false;
                    const reviewDate = new Date(nextReviewAt);
                    const tomorrow = addDays(new Date(), 1);
                    return isSameLocalDate(reviewDate, tomorrow);
                })
                .slice(0, 5);
            const wrongText = todayWrongWords.length
                ? todayWrongWords.map(word => `${word.english}/${word.chinese}`).join('、')
                : '暂无明显错词';
            const problemText = mainProblems.length ? mainProblems.join('，') : '整体表现稳定';
            const tomorrowText = dueTomorrow.length
                ? `明天优先复习 ${dueTomorrow.map(word => word.english).join('、')}，先听音再做拼写。`
                : '明天可继续新词学习，并用 3 分钟复盘今天的拼写题。';

            parentDailyReportEl.innerHTML = `
                <div class="daily-report-heading">
                    <span>今日建议</span>
                    <p>${escapeHtml(tomorrowText)}</p>
                </div>
                <div class="parent-daily-grid">
                    <div><span>今日学习</span><strong>${learnedCount}</strong></div>
                    <div><span>复习数量</span><strong>${reviewCount}</strong></div>
                    <div><span>正确率</span><strong>${accuracy}%</strong></div>
                </div>
                <div class="daily-report-note"><strong>需要留意：</strong>${escapeHtml(problemText)}${todayWrongWords.length ? `；错词：${escapeHtml(wrongText)}` : ''}</div>
            `;
        }

        function getTodayReviewWords(records, limit = 8) {
            const dueWords = getDueReviewWords(limit);
            if (dueWords.length >= limit) {
                return dueWords;
            }

            const seen = new Set(dueWords.map(getWordKey));
            const fallbackWrongWords = buildWrongWordBook(records)
                .filter(word => !seen.has(getWordKey(word)))
                .slice(0, limit - dueWords.length);
            return [...dueWords, ...fallbackWrongWords];
        }

        function getCurrentWrongWords() {
            return wordAnswerRecords
                .map((answerRecord, index) => ({ answerRecord, word: gameWords[index] }))
                .filter(item => item.word && item.answerRecord && item.answerRecord.answered && !item.answerRecord.firstCorrect)
                .map(item => item.word);
        }

        function prepareReviewGame(words, label = '错词复习') {
            if (!words || words.length === 0) {
                alert('暂时没有需要复习的错词，先完成一轮挑战吧。');
                return false;
            }

            const uniqueWords = [];
            const seen = new Set();
            words.forEach(word => {
                const key = getWordKey(word);
                if (!seen.has(key)) {
                    seen.add(key);
                uniqueWords.push({
                    chinese: word.chinese,
                    english: word.english,
                    image: word.image,
                    image_url: word.image_url || word.image,
                    audio_url: getAudioUrlForWord(word),
                    phonetic: word.phonetic || '',
                    example_sentence: getExampleForWord(word),
                    example_sentence_cn: getExampleCnForWord(word),
                    phonics_tip: getPhonicsTipForWord(word),
                    syllable_split: getSyllableSplitForWord(word),
                    spelling_tip: getSpellingTipForWord(word),
                    memory_hook: getMemoryTipForWord(word),
                    letter_image_story: word.letter_image_story || getSpellingTipForWord(word),
                    memoryTip: getMemoryTipForWord(word),
                    category: word.category || word.topic || '',
                    topic: word.topic || word.category || '',
                    partOfSpeech: word.partOfSpeech || word.part_of_speech || '',
                    memory_strategy: word.memory_strategy || word.memoryStrategy || '',
                    spelling_pattern: word.spelling_pattern || word.spellingPattern || '',
                    chunk_tip: word.chunk_tip || word.chunkTip || '',
                    show_chunk_tip: word.show_chunk_tip ?? word.showChunkTip ?? false,
                    test_flow: word.test_flow || word.testFlow || word.test_methods || '',
                    mastery_level: word.mastery_level || word.intervalIndex || 0
                });
                }
            });

            gameWords = uniqueWords.slice(0, requestedWordCount);
            if (words[0].grade) {
                currentGrade = words[0].grade;
                gradeSelect.value = currentGrade;
            }
            if (words[0].difficulty) {
                currentDifficulty = words[0].difficulty;
                document.getElementById('difficulty').value = currentDifficulty;
            }
            updateGradeInfo();

            const initialized = initGame(false);
            if (!initialized) {
                return false;
            }

            if (currentRecord) {
                currentRecord.reviewMode = true;
                currentRecord.reviewLabel = label;
                currentRecord.totalCount = gameWords.length;
                currentRecord.requestedCount = gameWords.length;
            }

            return true;
        }

        function startTodayReview() {
            const reviewWords = getTodayReviewWords(loadStudyRecords(), requestedWordCount);
            if (prepareReviewGame(reviewWords, '今日复习队列')) {
                startGame();
            }
        }

        function startWrongWordsReview() {
            const currentWrongWords = getCurrentWrongWords();
            const reviewWords = currentWrongWords.length > 0
                ? currentWrongWords
                : getTodayReviewWords(loadStudyRecords(), requestedWordCount);

            if (prepareReviewGame(reviewWords, '本轮错词复习')) {
                startGame();
            }
        }

        function renderTodayReviewEntry(records) {
            if (!todayReviewSummaryEl || !startReviewBtn) {
                return;
            }

            const reviewBar = document.getElementById('game-review-bar');

            const reviewWords = getTodayReviewWords(records, requestedWordCount);
            if (reviewWords.length === 0) {
                todayReviewSummaryEl.textContent = '';
                startReviewBtn.disabled = true;
                startReviewBtn.classList.add('opacity-60', 'cursor-not-allowed');
                reviewBar?.classList.add('hidden');
                return;
            }

            const previewWords = reviewWords.slice(0, 3).map(word => word.english).join('、');
            todayReviewSummaryEl.textContent = `今日可复习 ${reviewWords.length} 个词：${previewWords}${reviewWords.length > 3 ? '…' : ''}`;
            startReviewBtn.disabled = false;
            startReviewBtn.classList.remove('opacity-60', 'cursor-not-allowed');
            reviewBar?.classList.remove('hidden');
        }

        function renderResultReviewAdvice() {
            const wrongWords = getCurrentWrongWords();
            if (!resultReviewPanel || !resultReviewSummaryEl || !resultReviewWordsEl || !reviewWrongBtn) {
                return;
            }

            resultReviewWordsEl.innerHTML = '';

            if (wrongWords.length === 0) {
                const queueItems = Object.values(loadReviewQueue())
                    .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt))
                    .slice(0, 4);
                resultReviewSummaryEl.textContent = queueItems.length
                    ? '本轮没有明显错词，系统已经把这些词放进间隔复习队列。'
                    : '本轮没有明显错词，可以继续学新词，或读刚学单词小故事。';
                queueItems.forEach(item => {
                    const tag = document.createElement('span');
                    tag.className = 'result-review-tag';
                    const dueDate = item.dueAt ? new Date(item.dueAt) : null;
                    const dueText = dueDate && !Number.isNaN(dueDate.getTime())
                        ? `${dueDate.getMonth() + 1}/${dueDate.getDate()}`
                        : '待定';
                    tag.textContent = `${item.english} · ${dueText}`;
                    resultReviewWordsEl.appendChild(tag);
                });
                reviewWrongBtn.disabled = true;
                reviewWrongBtn.classList.add('opacity-60', 'cursor-not-allowed');
                reviewWrongBtn.classList.add('hidden');
                return;
            }

            resultReviewSummaryEl.textContent = `本轮有 ${wrongWords.length} 个词值得马上再练一遍，趁记忆还新鲜巩固一下。`;
            wrongWords.slice(0, 6).forEach(word => {
                const tag = document.createElement('span');
                tag.className = 'result-review-tag';
                tag.textContent = `${word.english} / ${word.chinese}`;
                resultReviewWordsEl.appendChild(tag);
            });
            reviewWrongBtn.disabled = false;
            reviewWrongBtn.classList.remove('opacity-60', 'cursor-not-allowed', 'hidden');
        }

        function resetAnalysisData() {
            totalStudiesEl.textContent = '0';
            totalWordsCountEl.textContent = '0';
            avgAccuracyEl.textContent = '0%';
            if (maxAccuracyEl) maxAccuracyEl.textContent = '0%';
            weakWordsCountEl.textContent = '0';
            if (firstWrongWordsCountEl) firstWrongWordsCountEl.textContent = '0';
            recentRecordsEl.innerHTML = '';
            noRecordsEl.classList.remove('hidden');
            recentRecordsEl.appendChild(noRecordsEl);
            weakWordsEl.innerHTML = '<span class="text-gray-500 text-sm">暂无薄弱单词记录</span>';
            firstWrongWordsEl.innerHTML = '';
            noFirstWrongWordsEl.classList.remove('hidden');
            firstWrongWordsEl.appendChild(noFirstWrongWordsEl);
            renderParentDailyReport([]);
            renderTodayReviewEntry([]);

            for (let i = 1; i <= 6; i++) {
                const gradeKey = `grade${i}`;
                const accuracyEl = document.getElementById(`${gradeKey}-accuracy`);
                const progressEl = document.getElementById(`${gradeKey}-progress`);
                accuracyEl.textContent = '0%';
                progressEl.style.width = '0%';
            }
        }

        function saveStudyRecord() {
            if (!currentRecord) return;
            
            // 完善记录信息
            const actualTotalCount = getRecordTotalCount(currentRecord) || gameWords.length;
            currentRecord.score = score;
            currentRecord.correctCount = correctCount;
            currentRecord.wrongCount = wrongCount;
            currentRecord.firstWrongCount = firstWrongCount;
            currentRecord.wordAnswerRecords = JSON.parse(JSON.stringify(wordAnswerRecords));
            currentRecord.requestedCount = currentRecord.requestedCount || requestedWordCount;
            currentRecord.totalCount = actualTotalCount;
            currentRecord.accuracy = actualTotalCount > 0 ? Math.round((correctCount / actualTotalCount) * 100) : 0;
            currentRecord.usedTime = initialTime - timeLeft;
            currentRecord.finishTime = new Date().toISOString();
            currentRecord.status = 'completed';
            updateMasteryFromRecord(currentRecord);
            currentRecord.masteryUpdatedAt = new Date().toISOString();
            
            // 保存记录
            const records = loadStudyRecords();
            records.unshift(currentRecord);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
            
            // 更新数据分析
            updateAnalysisData(records);
        }

        // 数据分析（重点统计首次答错单词）
        function updateAnalysisData(records) {
            if (records.length === 0) {
                resetAnalysisData();
                return;
            }
            noRecordsEl.classList.add('hidden');
            
            // 1. 概览数据
            const totalStudies = records.length;
            const totalWordsCount = records.reduce((sum, record) => sum + getRecordTotalCount(record), 0);
            const totalAccuracy = records.reduce((sum, record) => sum + record.accuracy, 0);
            const avgAccuracy = Math.round(totalAccuracy / totalStudies);
            
            // 统计首次答错单词
            const firstWrongWordsMap = {};
            const allWrongWordsMap = {};
            const wrongWordBook = buildWrongWordBook(records);
            
            records.forEach(record => {
                if (record.wordAnswerRecords && record.words) {
                    record.wordAnswerRecords.forEach((answerRecord, index) => {
                        if (!answerRecord || !answerRecord.answered) {
                            return;
                        }

                        const word = record.words[index];
                        if (!word) {
                            return;
                        }

                        const wordKey = `${word.english}-${word.chinese}`;

                        if (!answerRecord.firstCorrect) {
                            if (!firstWrongWordsMap[wordKey]) {
                                firstWrongWordsMap[wordKey] = {
                                    ...word,
                                    count: 0,
                                    totalAttempts: 0
                                };
                            }

                            firstWrongWordsMap[wordKey].count++;
                            firstWrongWordsMap[wordKey].totalAttempts += answerRecord.attemptCount || 0;
                            allWrongWordsMap[wordKey] = (allWrongWordsMap[wordKey] || 0) + getWrongAttemptCount(answerRecord);
                        }
                    });
                }
            });
            
            const firstWrongWordsList = Object.values(firstWrongWordsMap).sort((a, b) => {
                if (b.count !== a.count) {
                    return b.count - a.count;
                }
                return b.totalAttempts - a.totalAttempts;
            });
            const allWrongWordsList = Object.entries(allWrongWordsMap)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10);
            renderTodayReviewEntry(records);
            
            // 更新概览UI
            totalStudiesEl.textContent = totalStudies;
            totalWordsCountEl.textContent = totalWordsCount;
            avgAccuracyEl.textContent = `${avgAccuracy}%`;
            if (maxAccuracyEl) maxAccuracyEl.textContent = `${Math.max(...records.map(record => record.accuracy))}%`;
            weakWordsCountEl.textContent = wrongWordBook.length;
            if (firstWrongWordsCountEl) firstWrongWordsCountEl.textContent = firstWrongWordsList.length;
            
            // 2. 各年级掌握情况
            const gradeAccuracy = {
                grade1: { count: 0, total: 0 },
                grade2: { count: 0, total: 0 },
                grade3: { count: 0, total: 0 },
                grade4: { count: 0, total: 0 },
                grade5: { count: 0, total: 0 },
                grade6: { count: 0, total: 0 }
            };
            
            records.forEach(record => {
                if (gradeAccuracy[record.grade]) {
                    gradeAccuracy[record.grade].count += record.accuracy;
                    gradeAccuracy[record.grade].total += 1;
                }
            });
            
            // 更新各年级进度条
            for (let i = 1; i <= 6; i++) {
                const gradeKey = `grade${i}`;
                const accuracyEl = document.getElementById(`${gradeKey}-accuracy`);
                const progressEl = document.getElementById(`${gradeKey}-progress`);
                
                if (gradeAccuracy[gradeKey].total === 0) {
                    accuracyEl.textContent = '0%';
                    progressEl.style.width = '0%';
                } else {
                    const avg = Math.round(gradeAccuracy[gradeKey].count / gradeAccuracy[gradeKey].total);
                    accuracyEl.textContent = `${avg}%`;
                    progressEl.style.width = `${avg}%`;
                }
            }
            
            // 3. 首次答错单词展示
            if (firstWrongWordsList.length === 0) {
                noFirstWrongWordsEl.classList.remove('hidden');
                firstWrongWordsEl.innerHTML = '';
                firstWrongWordsEl.appendChild(noFirstWrongWordsEl);
            } else {
                noFirstWrongWordsEl.classList.add('hidden');
                firstWrongWordsEl.innerHTML = '';
                firstWrongWordsList.slice(0, 8).forEach(word => {
                    const wordCard = document.createElement('div');
                    wordCard.className = 'bg-danger/5 rounded-lg p-3 text-center border border-danger/20';
                    wordCard.innerHTML = `
                        <div class="font-bold text-danger">${word.english}</div>
                        <div class="text-sm text-gray-600">${word.chinese}</div>
                        <div class="text-xs text-gray-500 mt-1">首次答错 ${word.count} 次</div>
                    `;
                    firstWrongWordsEl.appendChild(wordCard);
                });
            }
            
            // 4. 最近学习记录
            recentRecordsEl.innerHTML = '';
            const recentRecords = records.slice(0, 5);
            
            recentRecords.forEach((record) => {
                const recordItem = document.createElement('div');
                recordItem.className = 'bg-gray-50 rounded-lg p-3 shadow-sm border border-gray-100';
                
                // 格式化时间
                const date = new Date(record.startTime);
                const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                
                // 格式化用时
                const usedMinutes = Math.floor(record.usedTime / 60);
                const usedSeconds = record.usedTime % 60;
                const usedTimeText = `${usedMinutes}分${usedSeconds < 10 ? '0' + usedSeconds : usedSeconds}秒`;
                
                // 单词来源标记
                const sourceBadge = record.source === 'custom' 
                    ? '<span class="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">本地单词</span>'
                    : '';
                
                // 正确率颜色
                let accuracyClass = 'text-green-600';
                if (record.accuracy < 60) accuracyClass = 'text-red-600';
                else if (record.accuracy < 80) accuracyClass = 'text-yellow-600';
                
                recordItem.innerHTML = `
                    <div class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <span class="grade-badge mr-2 ${record.grade}">${record.grade.replace('grade', '')}</span>
                            <span class="font-medium">${record.gradeText} ${record.difficultyText}难度${sourceBadge}</span>
                        </div>
                        <span class="text-sm text-gray-500">${formattedDate} ${formattedTime}</span>
                    </div>
                    <div class="flex flex-wrap justify-between text-sm gap-2">
                        <div>得分: <span class="font-bold text-primary">${record.score}</span></div>
                        <div>正确率: <span class="font-bold ${accuracyClass}">${record.accuracy}%</span></div>
                        <div>首次答错: <span class="font-bold text-danger">${record.firstWrongCount}</span>个</div>
                        <div>用时: <span class="font-medium">${usedTimeText}</span></div>
                    </div>
                `;
                recentRecordsEl.appendChild(recordItem);
            });
            
            // 5. 薄弱单词分析
            weakWordsEl.innerHTML = '';
            if (wrongWordBook.length === 0) {
                weakWordsEl.innerHTML = '<span class="text-gray-500 text-sm">暂无薄弱单词记录</span>';
            } else {
                wrongWordBook.slice(0, 12).forEach(word => {
                    const wordTag = document.createElement('span');
                    wordTag.className = 'bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full';
                    wordTag.textContent = `${word.english}(${word.chinese}) 错误${word.wrongCount}次`;
                    weakWordsEl.appendChild(wordTag);
                });
            }
            renderParentDailyReport(records);
        }

        function escapeHtml(text) {
            return String(text).replace(/[&<>"']/g, char => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[char]));
        }

        function highlightTargetWords(sentence, targetWords) {
            let highlighted = escapeHtml(sentence);
            targetWords.forEach(word => {
                const english = String(word.english || '').trim();
                if (!english) return;
                const escapedWord = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const chinese = escapeHtml(word.chinese || '');
                const safeEnglish = escapeHtml(english);
                highlighted = highlighted.replace(
                    new RegExp(`\\b(${escapedWord})\\b`, 'gi'),
                    `<span class="reading-keyword" role="button" tabindex="0" data-english="${safeEnglish}" data-chinese="${chinese}" aria-label="查看 ${safeEnglish} 的中文">$1</span>`
                );
            });
            return highlighted;
        }

        function handleReadingKeywordToggle(event) {
            const keyword = event.target?.closest?.('.reading-keyword');
            if (!keyword || !readingStoryEl.contains(keyword)) return;
            event.preventDefault();
            const english = keyword.dataset.english || keyword.textContent || '';
            const chinese = keyword.dataset.chinese || '';
            const matchedWord = currentReadingStory?.targetWords?.find(word =>
                normalizeWordForGame(word.english) === normalizeWordForGame(english)
            );
            const showingMeaning = keyword.classList.toggle('showing-meaning');
            keyword.textContent = showingMeaning && chinese ? `${english} · ${chinese}` : english;
            keyword.setAttribute('aria-pressed', showingMeaning ? 'true' : 'false');
            pronounceWord(english, getAudioUrlForWord(matchedWord || { english }));
        }

        function buildReadingSentences(targetWords) {
            const sentenceTemplates = [
                word => `I see a ${word.english}.`,
                word => `This ${word.english} is for me.`,
                word => `I like the ${word.english}.`,
                word => `My friend can find the ${word.english}.`,
                word => `Look, the ${word.english} is here.`
            ];

            const sentences = targetWords.slice(0, 5).map((word, index) => {
                const template = sentenceTemplates[index % sentenceTemplates.length];
                return template(word);
            });

            if (targetWords.length >= 2) {
                sentences.push(`I can read ${targetWords[0].english} and ${targetWords[1].english}.`);
            }

            return sentences.slice(0, 5);
        }

        function buildReadingQuestions(targetWords) {
            const questions = [];
            if (targetWords.length > 0) {
                const answerWord = targetWords[0];
                const optionWords = shuffleArray(targetWords).slice(0, 3);
                if (!optionWords.some(word => getWordKey(word) === getWordKey(answerWord))) {
                    optionWords[0] = answerWord;
                }
                questions.push({
                    text: `哪个单词的中文意思是“${answerWord.chinese}”？`,
                    answer: answerWord.english,
                    options: shuffleArray(optionWords.map(word => word.english))
                });
            }

            if (targetWords.length > 1) {
                const answerWord = targetWords[1];
                questions.push({
                    text: `短文里出现了哪个重点词？`,
                    answer: answerWord.english,
                    options: shuffleArray([
                        answerWord.english,
                        'happy',
                        'play'
                    ])
                });
            }

            return questions;
        }

        function getReadingOptions(answerWord, targetWords) {
            const options = [];
            const seen = new Set();
            [answerWord, ...shuffleArray(targetWords)].forEach(word => {
                const english = String(word.english || '').trim();
                const key = normalizeWordForGame(english);
                if (english && !seen.has(key)) {
                    seen.add(key);
                    options.push(english);
                }
            });

            ['book', 'red', 'play', 'happy', 'school'].forEach(word => {
                if (options.length < 3 && !seen.has(word)) {
                    seen.add(word);
                    options.push(word);
                }
            });

            return shuffleArray(options.slice(0, 3));
        }

        function buildClozeItems(targetWords) {
            const templates = [
                word => ({ sentence: `I see a ____ .`, answer: word.english, chinese: word.chinese }),
                word => ({ sentence: `This is my ____ .`, answer: word.english, chinese: word.chinese }),
                word => ({ sentence: `I like the ____ .`, answer: word.english, chinese: word.chinese })
            ];

            return targetWords.slice(0, 3).map((word, index) => ({
                ...templates[index % templates.length](word),
                options: getReadingOptions(word, targetWords)
            }));
        }

        function renderReadingQuestion(question) {
            const card = document.createElement('div');
            card.className = 'reading-question-card';
            const title = document.createElement('div');
            title.className = 'font-bold text-gray-800 mb-3';
            title.textContent = question.text;
            card.appendChild(title);

            const optionsWrap = document.createElement('div');
            optionsWrap.className = 'grid grid-cols-1 sm:grid-cols-3 gap-2';
            shuffleArray([...question.options]).forEach(option => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'reading-option bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-2 text-sm font-bold';
                button.textContent = option;
                button.addEventListener('click', () => {
                    optionsWrap.querySelectorAll('button').forEach(item => {
                        item.disabled = true;
                        if (item.textContent === question.answer) {
                            item.classList.add('correct');
                        }
                    });
                    if (option !== question.answer) {
                        button.classList.add('wrong');
                    }
                    recordStoryAnswer(question.word, option === question.answer, question.type);
                    markReadingAnswer(question.id, option === question.answer);
                });
                optionsWrap.appendChild(button);
            });
            card.appendChild(optionsWrap);
            return card;
        }

        function renderClozeItem(item) {
            const card = document.createElement('div');
            card.className = 'reading-question-card';
            const sourceSentence = item.sentence || item.text || '';
            const chineseHint = item.chinese || item.word?.chinese || '';

            const sentence = document.createElement('div');
            sentence.className = 'reading-cloze-sentence mb-3';
            sentence.textContent = sourceSentence;
            card.appendChild(sentence);

            const hint = document.createElement('div');
            hint.className = 'text-sm text-gray-500 mb-3';
            hint.textContent = `提示中文：${chineseHint}`;
            card.appendChild(hint);

            const optionsWrap = document.createElement('div');
            optionsWrap.className = 'grid grid-cols-1 sm:grid-cols-3 gap-2';
            shuffleArray([...item.options]).forEach(option => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'reading-option bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-2 text-sm font-bold';
                button.textContent = option;
                button.addEventListener('click', () => {
                    optionsWrap.querySelectorAll('button').forEach(itemButton => {
                        itemButton.disabled = true;
                        if (itemButton.textContent === item.answer) {
                            itemButton.classList.add('correct');
                        }
                    });
                    if (option !== item.answer) {
                        button.classList.add('wrong');
                    }
                    sentence.innerHTML = escapeHtml(sourceSentence).replace('____', `<span class="reading-keyword">${escapeHtml(item.answer)}</span>`);
                    recordStoryAnswer(item.word, option === item.answer, item.type || 'usage');
                    markReadingAnswer(item.id || 'cloze', option === item.answer);
                });
                optionsWrap.appendChild(button);
            });

            card.appendChild(optionsWrap);
            return card;
        }

        function renderSentenceBuilder(targetWords) {
            const word = targetWords[0];
            const patterns = [
                { label: 'I see a...', build: selectedWord => `I see a ${selectedWord.english}.` },
                { label: 'This is my...', build: selectedWord => `This is my ${selectedWord.english}.` },
                { label: 'I like the...', build: selectedWord => `I like the ${selectedWord.english}.` }
            ];
            let selectedPattern = patterns[0];
            let selectedWord = word;

            const wrap = document.createElement('div');
            wrap.className = 'reading-builder-card';
            const imageCandidates = getWordImageCandidates(word);
            wrap.innerHTML = `
                <div class="reading-builder-visual">
                    <img src="${escapeHtml(imageCandidates[0] || '')}" alt="${escapeHtml(word.chinese)}的图片">
                    <div>
                        <div class="text-sm text-gray-500">选择句型和单词</div>
                        <div class="text-xl font-bold text-gray-800">${escapeHtml(word.chinese)} / ${escapeHtml(word.english)}</div>
                    </div>
                </div>
                <div class="reading-builder-section">
                    <div class="text-sm font-bold text-gray-700 mb-2">句型</div>
                    <div class="reading-builder-patterns"></div>
                </div>
                <div class="reading-builder-section">
                    <div class="text-sm font-bold text-gray-700 mb-2">单词</div>
                    <div class="reading-builder-words"></div>
                </div>
                <div class="reading-built-sentence"></div>
            `;
            const visualImage = wrap.querySelector('.reading-builder-visual img');
            if (imageCandidates.length > 0) {
                loadImageWithFallback(visualImage, imageCandidates, () => visualImage.classList.add('hidden'));
            } else {
                visualImage.classList.add('hidden');
            }

            const patternWrap = wrap.querySelector('.reading-builder-patterns');
            const wordWrap = wrap.querySelector('.reading-builder-words');
            const resultEl = wrap.querySelector('.reading-built-sentence');

            function updateResult() {
                resultEl.innerHTML = highlightTargetWords(selectedPattern.build(selectedWord), targetWords);
                patternWrap.querySelectorAll('button').forEach(button => {
                    button.classList.toggle('active', button.dataset.pattern === selectedPattern.label);
                });
                wordWrap.querySelectorAll('button').forEach(button => {
                    button.classList.toggle('active', button.dataset.word === selectedWord.english);
                });
            }

            patterns.forEach(pattern => {
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.pattern = pattern.label;
                button.className = 'reading-builder-choice bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-2 text-sm font-bold';
                button.textContent = pattern.label;
                button.addEventListener('click', () => {
                    selectedPattern = pattern;
                    updateResult();
                });
                patternWrap.appendChild(button);
            });

            targetWords.slice(0, 5).forEach(targetWord => {
                const button = document.createElement('button');
                button.type = 'button';
                button.dataset.word = targetWord.english;
                button.className = 'reading-builder-choice bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 px-3 py-2 text-sm font-bold';
                button.textContent = `${targetWord.english} / ${targetWord.chinese}`;
                button.addEventListener('click', () => {
                    selectedWord = targetWord;
                    updateResult();
                });
                wordWrap.appendChild(button);
            });

            updateResult();
            readingSentenceBuilderEl.appendChild(wrap);
        }

        function getReadingSourceWords() {
            const source = readingSourceWords.length > 0
                ? readingSourceWords
                : getLearnedWords(Math.max(8, requestedWordCount));
            const masteryRecords = loadMasteryRecords();
            const uniqueWords = [];
            const seen = new Set();
            source.forEach(word => {
                const key = getWordKey(word);
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueWords.push({ ...word, ...(masteryRecords[key] || {}) });
                }
            });
            return uniqueWords;
        }

        function markReadingAnswer(answerId, isCorrect) {
            if (readingAnsweredIds.has(answerId)) return;
            readingAnsweredIds.add(answerId);
            if (isCorrect) {
                readingCorrectCount += 1;
                awardWordStars(1, '读故事', '阅读题');
            } else {
                resetWordStarStreak();
            }
            const total = (currentReadingStory?.questions?.length || 0) + (currentReadingStory?.cloze ? 1 : 0);
            readingProgressSummaryEl.textContent = `阅读题：${readingAnsweredIds.size}/${total} · 答对 ${readingCorrectCount}`;
            readingProgressSummaryEl.classList.toggle('complete', readingAnsweredIds.size === total);
            if (!readingPerfectCelebrated && total > 0 && readingAnsweredIds.size === total && readingCorrectCount === total) {
                readingPerfectCelebrated = true;
                awardWordStars(3, '读故事', '全对奖励');
                launchReadingPerfectCelebration();
            }
        }

        function recordStoryAnswer(word, isCorrect, questionType) {
            if (!word) return;
            const masteryRecords = loadMasteryRecords();
            const key = getWordKey(word);
            const entry = masteryRecords[key] || createMasteryEntry(word, {
                grade: currentGrade,
                gradeText: currentGradeText,
                difficulty: currentDifficulty,
                difficultyText: getDifficultyText()
            });
            entry.story_attempt_count = (entry.story_attempt_count || 0) + 1;
            entry.story_correct_count = (entry.story_correct_count || 0) + (isCorrect ? 1 : 0);
            entry.story_wrong_count = (entry.story_wrong_count || 0) + (isCorrect ? 0 : 1);
            if (!isCorrect) {
                const errorType = questionType === 'usage' ? 'usage_error' : 'meaning_error';
                entry.error_types = Array.from(new Set([...(entry.error_types || []), errorType]));
                entry.status = 'learning';
                entry.consecutiveCorrect = 0;
                entry.intervalIndex = Math.max(0, (entry.intervalIndex || 0) - 1);
                entry.nextReviewAt = new Date().toISOString();
                entry.next_review_at = entry.nextReviewAt;
                entry.mastery_level = entry.intervalIndex;
            }
            masteryRecords[key] = entry;
            saveMasteryRecords(masteryRecords);
            updateReviewQueueAfterRecord(masteryRecords);
        }

        function pronounceCurrentStory() {
            if (!currentReadingStory) return;
            pronounceWord(currentReadingStory.sentences.join(' '), '', readingListenBtn, '🔊 听完整故事', { mode: 'story' });
        }

        function renderReadingPractice() {
            const uniqueWords = getReadingSourceWords();

            if (uniqueWords.length < 2) {
                readingEmptyEl.classList.remove('hidden');
                readingContentEl.classList.add('hidden');
                return;
            }

            currentReadingStory = window.StoryCore.createStory(uniqueWords, { limit: 3, offset: readingStoryVariant });
            if (!currentReadingStory) {
                readingEmptyEl.classList.remove('hidden');
                readingContentEl.classList.add('hidden');
                return;
            }
            const targetWords = currentReadingStory.targetWords;
            readingAnsweredIds = new Set();
            readingCorrectCount = 0;
            readingPerfectCelebrated = false;

            readingEmptyEl.classList.add('hidden');
            readingContentEl.classList.remove('hidden');
            readingTitleEl.textContent = currentReadingStory.title;
            readingProgressSummaryEl.textContent = '阅读题：0/3';
            readingProgressSummaryEl.classList.remove('complete');
            readingTargetWordsEl.innerHTML = '';
            readingStoryEl.innerHTML = '';
            readingQuestionsListEl.innerHTML = '';
            readingClozeListEl.innerHTML = '';
            readingSentenceBuilderEl.innerHTML = '';

            targetWords.forEach(word => {
                const tag = document.createElement('button');
                tag.type = 'button';
                tag.className = 'reading-target-word';
                tag.textContent = word.english;
                tag.dataset.english = word.english;
                tag.dataset.chinese = word.chinese;
                tag.disabled = true;
                tag.setAttribute('aria-label', `目标词 ${word.english}`);
                readingTargetWordsEl.appendChild(tag);
            });

            currentReadingStory.sentences.forEach((storySentence, index) => {
                const row = document.createElement('div');
                row.className = 'reading-sentence-row';
                const listenButton = document.createElement('button');
                listenButton.type = 'button';
                listenButton.className = 'reading-sentence-audio';
                listenButton.setAttribute('aria-label', `听第${index + 1}句`);
                listenButton.textContent = '🔊';
                listenButton.addEventListener('click', () => pronounceWord(storySentence, '', listenButton, '🔊', { mode: 'sentence' }));
                const paragraph = document.createElement('p');
                paragraph.innerHTML = highlightTargetWords(storySentence, targetWords);
                row.append(listenButton, paragraph);
                readingStoryEl.appendChild(row);
            });

            currentReadingStory.questions.forEach(question => {
                readingQuestionsListEl.appendChild(renderReadingQuestion(question));
            });
            readingClozeListEl.appendChild(renderClozeItem(currentReadingStory.cloze));
        }

        // 18. 页面切换
        function goToReadingScreen(sourceWords = []) {
            readingSourceWords = Array.isArray(sourceWords) ? sourceWords.filter(Boolean) : [];
            readingStoryVariant = 0;
            hideAllScreens();
            setPageMode('reading');
            readingScreen.classList.remove('screen-hidden');
            readingScreen.classList.remove('reading-scrolled');
            renderReadingPractice();
            scrollToPageTop();
            syncReadingScrollState();
        }

        function goToExcelUploadScreen() {
            hideAllScreens();
            setPageMode('excel');
            excelUploadScreen.classList.remove('screen-hidden');
            scrollToPageTop();
        }
        
        function goToAnalysisScreen() {
            hideAllScreens();
            setPageMode('analysis');
            analysisScreen.classList.remove('screen-hidden');
            loadStudyRecords(); // 刷新数据
            scrollToPageTop();
        }

        function scrollToPageTop() {
            // 页面切换不沿用上一页的滚动位置，始终从标题开始阅读。
            requestAnimationFrame(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                syncReadingScrollState();
            });
        }

        function syncReadingScrollState() {
            if (!readingScreen) return;
            const shouldCollapseActions = document.body.classList.contains('mode-reading') && window.scrollY > 32;
            readingScreen.classList.toggle('reading-scrolled', shouldCollapseActions);
        }

        function goToStartScreen() {
            gameStarted = false;
            clearInterval(timerInterval);
            hideAllScreens();
            setPageMode('start');
            startScreen.classList.remove('screen-hidden');
            renderTodayReviewEntry(loadStudyRecords());
            const timeProgressEl = document.getElementById('time-progress');
            if (timeProgressEl) {
                timeProgressEl.style.width = '100%';
            }
            document.getElementById('timer').classList.remove('text-danger');
        }

        function hideAllScreens() {
            clearPreviewAutoAdvance();
            startScreen.classList.add('screen-hidden');
            readingScreen.classList.add('screen-hidden');
            excelUploadScreen.classList.add('screen-hidden');
            previewScreen.classList.add('screen-hidden');
            gameScreen.classList.add('screen-hidden');
            endScreen.classList.add('screen-hidden');
            analysisScreen.classList.add('screen-hidden');
            imageModal.classList.add('screen-hidden');
            document.body.style.overflow = '';
        }

        function setPageMode(mode) {
            document.body.classList.remove(
                'mode-start',
                'mode-preview',
                'mode-game',
                'mode-excel',
                'mode-analysis',
                'mode-reading',
                'mode-end',
                'focus-mode'
            );
            document.body.classList.add(`mode-${mode}`);
            if (mode === 'preview' || mode === 'game') {
                document.body.classList.add('focus-mode');
            }
            if (mode === 'preview') {
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }
        }

        // 19. 本地发音功能：优先真实音频；没有音频时使用浏览器 TTS，
        // 并按“单词 / 短语 / 句子 / 故事”选择更自然的 voice、语速和停顿。
        function inferSpeechMode(text) {
            const cleanText = String(text || '').trim();
            const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
            if (/[.!?]/.test(cleanText) || wordCount > 3) return 'sentence';
            if (wordCount > 1) return 'phrase';
            return 'word';
        }

        function splitSpeechSegments(text, mode = 'sentence') {
            const cleanText = String(text || '').replace(/\s+/g, ' ').trim();
            if (!cleanText) return [];
            if (mode !== 'story' && cleanText.length <= 120) return [cleanText];
            const sentenceParts = cleanText.match(/[^.!?]+[.!?]?/g)
                ?.map(part => part.trim())
                .filter(Boolean) || [cleanText];
            return sentenceParts.flatMap(part => {
                if (part.length <= 120) return [part];
                return part.split(/,\s+|;\s+/).map(piece => piece.trim()).filter(Boolean);
            });
        }

        function scoreEnglishVoice(voice, mode = 'sentence') {
            const lang = String(voice.lang || '').toLowerCase();
            const name = String(voice.name || '').toLowerCase();
            const isVivienne = /vivienne/.test(name);
            let score = 0;

            if (isVivienne) score += 1000;
            if (lang === 'en-us') score += 80;
            else if (lang.startsWith('en-')) score += 60;
            else if (isVivienne) score += 60;
            else return -1000;

            if (/multilingual/.test(name)) score += 80;
            if (/samantha|ava|allison|susan|victoria|karen|serena|moira/.test(name)) score += 40;
            if (/google.*english|microsoft.*(jenny|aria|guy|zira|david)|natural|neural|premium/.test(name)) score += 34;
            if (/female|woman/.test(name)) score += mode === 'sentence' || mode === 'story' ? 10 : 4;
            if (voice.localService) score += 4;
            if (/compact|novelty|whisper|bad news|bells|cellos|organ|trinoids|zarvox/.test(name)) score -= 80;
            if (mode === 'word' && /alex|daniel|guy|david/.test(name)) score += 8;

            return score;
        }

        function getPreferredEnglishVoice(mode = 'sentence') {
            if (preferredEnglishVoiceCache[mode]) return preferredEnglishVoiceCache[mode];
            if (!('speechSynthesis' in window)) return null;
            const voices = window.speechSynthesis.getVoices() || [];
            if (!voices.length) return null;
            const preferredVoice = voices
                .filter(voice => {
                    const lang = String(voice.lang || '').toLowerCase();
                    const name = String(voice.name || '').toLowerCase();
                    return lang.startsWith('en') || /vivienne/.test(name);
                })
                .sort((a, b) => scoreEnglishVoice(b, mode) - scoreEnglishVoice(a, mode))[0] || null;
            preferredEnglishVoiceCache[mode] = preferredVoice;
            return preferredVoice;
        }

        function getSpeechTuning(mode = 'sentence') {
            if (mode === 'word') return { rate: TTS_WORD_RATE, pitch: 1.03, volume: 1 };
            if (mode === 'phrase') return { rate: TTS_PHRASE_RATE, pitch: 1.02, volume: 1 };
            if (mode === 'story') return { rate: TTS_STORY_RATE, pitch: 1.0, volume: 1 };
            return { rate: TTS_SENTENCE_RATE, pitch: 1.0, volume: 1 };
        }

        function speakWithBrowserTts(text, buttonEl = null, defaultLabel = '', options = {}) {
            if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
                if (buttonEl) {
                    buttonEl.disabled = false;
                    buttonEl.textContent = defaultLabel || buttonEl.dataset.defaultLabel || '🔊 播放';
                }
                return;
            }

            const mode = options.mode || inferSpeechMode(text);
            const segments = splitSpeechSegments(text, mode);
            if (!segments.length) return;

            const token = ++speechSequenceToken;
            const tuning = getSpeechTuning(mode);
            const voice = getPreferredEnglishVoice(mode);
            let index = 0;

            const setPlayingState = () => {
                if (buttonEl) {
                    buttonEl.disabled = true;
                    buttonEl.textContent = '正在播放';
                }
            };
            const clearPlayingState = () => {
                if (token !== speechSequenceToken) return;
                if (buttonEl) {
                    buttonEl.disabled = false;
                    buttonEl.textContent = defaultLabel || buttonEl.dataset.defaultLabel || '🔊 播放';
                }
            };

            const speakNext = () => {
                if (token !== speechSequenceToken) return;
                const segment = segments[index];
                if (!segment) {
                    clearPlayingState();
                    return;
                }
                const utterance = new SpeechSynthesisUtterance(segment);
                utterance.lang = voice?.lang || 'en-US';
                utterance.rate = tuning.rate;
                utterance.pitch = tuning.pitch;
                utterance.volume = tuning.volume;
                if (voice) utterance.voice = voice;
                utterance.onstart = setPlayingState;
                utterance.onerror = clearPlayingState;
                utterance.onend = () => {
                    if (token !== speechSequenceToken) return;
                    index += 1;
                    if (index >= segments.length) {
                        clearPlayingState();
                        return;
                    }
                    window.setTimeout(speakNext, mode === 'story' ? TTS_NATURAL_PAUSE_MS + 120 : TTS_NATURAL_PAUSE_MS);
                };
                window.speechSynthesis.speak(utterance);
            };

            window.speechSynthesis.cancel();
            setPlayingState();
            window.setTimeout(speakNext, 40);
        }

        function pronounceWord(word, audioUrl = '', buttonEl = null, defaultLabel = '', options = {}) {
            const setPlayingState = () => {
                if (buttonEl) {
                    buttonEl.disabled = true;
                    buttonEl.textContent = '正在播放';
                }
            };
            const clearPlayingState = () => {
                if (buttonEl) {
                    buttonEl.disabled = false;
                    buttonEl.textContent = defaultLabel || buttonEl.dataset.defaultLabel || '🔊 播放';
                }
            };

            if (audioUrl) {
                const audio = new Audio(audioUrl);
                setPlayingState();
                audio.onended = clearPlayingState;
                audio.onerror = clearPlayingState;
                audio.play().catch(() => {
                    clearPlayingState();
                    pronounceWord(word, '', buttonEl, defaultLabel, options);
                });
                return;
            }

            speakWithBrowserTts(word, buttonEl, defaultLabel, options);
        }

        function pronounceSentenceForWord(word) {
            const sentence = getExampleForWord(word);
            pronounceWord(sentence, getSentenceAudioUrlForWord(word), previewSentenceAudioBtn, '🔊 听句子', { mode: 'sentence' });
        }

        // 初始化应用：兼容本地文件、CDN 延迟和脚本缓存命中后的加载顺序。
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init, { once: true });
        } else {
            init();
        }
