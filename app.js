/* ==========================================================================
   KHIFFA (خِفَّة) — UNIFIED FOOD HUB, HUNGER TOOLKIT & ANALYTICS ENGINE
   ========================================================================== */

const STORAGE_KEY = 'khiffa_ios_state_v4_zero';

const LEVEL_RANKS = [
  { level: 1, title: 'كاسر العادة', minXp: 0, maxXp: 300, badge: '🌱', desc: 'بداية الوعي بالسعرات وإيقاف الأكل العشوائي' },
  { level: 2, title: 'حارس الميزانية', minXp: 300, maxXp: 700, badge: '🛡️', desc: 'التحكم بحجم الوجبات وشرب الماء قبل الأكل' },
  { level: 3, title: 'مُروّض الشهية', minXp: 700, maxXp: 1200, badge: '🌊', desc: 'التغلب على الجوع العاطفي وموجات آخر الليل' },
  { level: 4, title: 'مُذيب الدهون', minXp: 1200, maxXp: 1800, badge: '🔥', desc: 'تحقيق عجز حراري يومي يذيب الدهون الصافية' },
  { level: 5, title: 'مهندس الأيض', minXp: 1800, maxXp: 2600, badge: '🧬', desc: 'إتقان كثافة الشبع: شبع أعلى بسعرات أقل' },
  { level: 6, title: 'سيد الخِفّة', minXp: 2600, maxXp: 3600, badge: '🦅', desc: 'خسارة ملموسة في المقاسات ونشاط يومي مضاعف' },
  { level: 7, title: 'قاهر السكريات', minXp: 3600, maxXp: 4800, badge: '💎', desc: 'تحرر كامل من السعرات السائلة والحلويات' },
  { level: 8, title: 'نحّات القوام', minXp: 4800, maxXp: 6200, badge: '⚡', desc: 'تحويل العجز الحراري إلى أسلوب حياة مريح' },
  { level: 9, title: 'ملهم التغيير', minXp: 6200, maxXp: 8000, badge: '👑', desc: 'الاقتراب الكبير من الوزن المثالي بثبات نفسي' },
  { level: 10, title: 'أسطورة التحوّل', minXp: 8000, maxXp: 12000, badge: '🌟', desc: 'السيطرة الكاملة على الطاقة والوزن مدى الحياة' }
];

// Comprehensive Researched Food & Smart-Swap Database (46 Items in 6 Categories)
const FOOD_DATABASE = [
  // 1. Breakfast, Eggs & Dairy (فطور وبيض وأجبان)
  { id: 'bf1', cat: 'breakfast', name: 'بيضتان مسلوقتان مع خيار وطماطم', portion: 'فطور عالي البروتين والشبع', kcal: 165, emoji: '🥚', type: 'meal', window: 'morning' },
  { id: 'bf2', cat: 'breakfast', name: 'شكشوكة بيضتين بالطماطم والبصل (زيت خفيف)', portion: 'طبق صغير بدون خبز أبيض', kcal: 210, emoji: '🍳', type: 'meal', window: 'morning' },
  { id: 'bf3', cat: 'breakfast', name: 'فول مدمس سادة بالليمون والكمون', portion: 'طبق صغير (180 جرام) مشبع جداً', kcal: 210, emoji: '🫘', type: 'meal', window: 'morning' },
  { id: 'bf4', cat: 'breakfast', name: 'لبنة لايت مع زعتر وشريحة توست أسمر', portion: 'ملعقتان لبنة + خضار ورقية', kcal: 190, emoji: '🫓', type: 'meal', window: 'morning' },
  { id: 'bf5', cat: 'breakfast', name: 'جبن قريش أو فيتا لايت مع طماطم وخيار', portion: '100 جرام جبن عالي البروتين', kcal: 145, emoji: '🧀', type: 'meal', window: 'morning' },
  { id: 'bf6', cat: 'breakfast', name: 'جبن حلوم مشوي مع زعتر وطماطم', portion: '3 شرائح متوسطة مشوية', kcal: 240, emoji: '🧀', type: 'meal', window: 'morning' },
  { id: 'bf7', cat: 'breakfast', name: 'علبة زبادي يوناني سادة أو بالتوت', portion: 'علبة 170 جرام غنية بالبروتين', kcal: 130, emoji: '🥣', type: 'meal', window: 'morning' },
  { id: 'bf8', cat: 'breakfast', name: 'شوفان مطبوخ بالحليب قليل الدسم والقرفة', portion: 'نصف كوب شوفان مشبع لـ 4 ساعات', kcal: 215, emoji: '🌾', type: 'meal', window: 'morning' },
  { id: 'bf9', cat: 'breakfast', name: 'ربع رغيف تميس عادي (حصة مضبوطة)', portion: 'قطعة بحجم الكف بدون سمن', kcal: 140, emoji: '🥖', type: 'meal', window: 'morning' },

  // 2. Gulf & Arabic Traditional Dishes (كبسة وشعبيات)
  { id: 'gf1', cat: 'gulf', name: 'كبسة دجاج (حصة واعية: 6 ملاعق أرز + ربع دجاجة)', portion: 'صدر دجاج بدون جلد + سلطة', kcal: 480, emoji: '🍛', type: 'meal', window: 'afternoon' },
  { id: 'gf2', cat: 'gulf', name: 'كبسة لحم (حصة معتدلة مع إزالة الدهن)', portion: '6 ملاعق أرز + قطعة لحم بحجم الكف', kcal: 560, emoji: '🍖', type: 'meal', window: 'afternoon' },
  { id: 'gf3', cat: 'gulf', name: 'جريش باللبن القليل الدسم (بدون سمن علوي)', portion: 'زبدية متوسطة (250 جرام)', kcal: 340, emoji: '🥣', type: 'meal', window: 'afternoon' },
  { id: 'gf4', cat: 'gulf', name: 'قرصان بالخضار ومرق اللحم أو الدجاج', portion: 'طبق متوسط غني بالخضار', kcal: 420, emoji: '🍲', type: 'meal', window: 'afternoon' },
  { id: 'gf5', cat: 'gulf', name: 'مرقوق بالخضار واللحم (حصة متوسطة)', portion: 'زبدية متوسطة (250 جرام)', kcal: 390, emoji: '🥘', type: 'meal', window: 'afternoon' },
  { id: 'gf6', cat: 'gulf', name: 'ملوخية بالدجاج المسلوق أو المشوي', portion: 'زبدية ملوخية + صدر دجاج', kcal: 310, emoji: '🌿', type: 'meal', window: 'afternoon' },
  { id: 'gf7', cat: 'gulf', name: 'بامية أو فاصوليا خضراء بمرق الطماطم واللحم', portion: 'طبق متوسط عالي الألياف', kcal: 290, emoji: '🍅', type: 'meal', window: 'afternoon' },
  { id: 'gf8', cat: 'gulf', name: '5 ملاعق أرز بسمتي أو أبيض مطبوخ', portion: 'حصة نشويات محسوبة بدقة', kcal: 160, emoji: '🍚', type: 'meal', window: 'afternoon' },

  // 3. Grilled Proteins & Sandwiches (مشويات وسندويتشات)
  { id: 'pr1', cat: 'protein', name: 'صدر دجاج مشوي أو بالفرن (200 جرام)', portion: 'بروتين صافي يشبع لـ 5 ساعات', kcal: 280, emoji: '🍗', type: 'meal', window: 'afternoon' },
  { id: 'pr2', cat: 'protein', name: 'سيخين شيش طاووق أو كباب دجاج مشوي', portion: 'مع بصل وطماطم مشوية', kcal: 320, emoji: '🍢', type: 'meal', window: 'evening' },
  { id: 'pr3', cat: 'protein', name: 'سمك فيليه مشوي بالليمون والبهارات', portion: 'قطعة كبيرة (220 جرام)', kcal: 290, emoji: '🐟', type: 'meal', window: 'afternoon' },
  { id: 'pr4', cat: 'protein', name: 'علبة تونة بالماء مصفاة مع ليمون وخس', portion: 'وجبة عشاء عالية البروتين', kcal: 165, emoji: '🥫', type: 'meal', window: 'evening' },
  { id: 'pr5', cat: 'protein', name: 'ساندويتش شاورما دجاج صغير (خبز خفيف)', portion: 'بدون بطاطس وثومية خفيفة', kcal: 380, emoji: '🌯', type: 'meal', window: 'evening' },
  { id: 'pr6', cat: 'protein', name: '3 حبات فلافل مشوية أو بالهوائية + طحينة خفيفة', portion: 'مع خس ومخلل بدون خبز', kcal: 195, emoji: '🧆', type: 'meal', window: 'morning' },
  { id: 'pr7', cat: 'protein', name: 'حبتان سمبوسة دجاج أو جبن بالفرن/الهوائية', portion: 'مقرمشة بدون قلي غزير', kcal: 170, emoji: '🥟', type: 'meal', window: 'evening' },
  { id: 'pr8', cat: 'protein', name: 'برجر لحم أو دجاج مشوي منزلي (خبز بر)', portion: 'بدون مايونيز أو بطاطس مقلية', kcal: 390, emoji: '🍔', type: 'meal', window: 'evening' },

  // 4. Soups & Salads — High Volume Stomach Fillers (شوربات وسلطات)
  { id: 'sp1', cat: 'soups', name: 'زبدية شوربة عدس دافئة بالليمون', portion: 'تملأ المعدة وتغلق الشهية', kcal: 180, emoji: '🍲', type: 'meal', window: 'evening' },
  { id: 'sp2', cat: 'soups', name: 'شوربة شوفان بالطماطم والدجاج', portion: 'غنية بالألياف الذائبة المشبعة', kcal: 190, emoji: '🥣', type: 'meal', window: 'evening' },
  { id: 'sp3', cat: 'soups', name: 'شوربة خضار مشكلة بمرق الدجاج الصافي', portion: 'حجم كبير بسعرات منخفضة جداً', kcal: 95, emoji: '🥦', type: 'meal', window: 'evening' },
  { id: 'sp4', cat: 'soups', name: 'صحن سلطة خضراء كبير بالليمون وزيت زيتون خفيف', portion: 'خيار + خس + طماطم + جرجير', kcal: 75, emoji: '🥗', type: 'meal', window: 'afternoon' },
  { id: 'sp5', cat: 'soups', name: 'سلطة خيار بالزبادي والنعناع والثوم', portion: 'زبدية باردة ومنعشة', kcal: 110, emoji: '🥒', type: 'meal', window: 'evening' },
  { id: 'sp6', cat: 'soups', name: 'صحن تبولة بالبقدونس والليمون (برغل خفيف)', portion: 'غني بالألياف والفيتامينات', kcal: 150, emoji: '🌿', type: 'meal', window: 'evening' },

  // 5. Drinks, Coffee, Fruits & Light Snacks (قهوة وسناك وفواكه)
  { id: 'dr1', cat: 'drinks', name: 'قهوة عربية بالهيل والزعفران (3 فناجين)', portion: 'شبه خالية من السعرات وتكبح الجوع', kcal: 10, emoji: '☕', type: 'meal', window: 'afternoon' },
  { id: 'dr2', cat: 'drinks', name: 'قهوة سوداء أمريكانو أو إسبريسو بدون سكر', portion: 'ترفع الحرق وتخفض هرمون الجوع', kcal: 5, emoji: '☕', type: 'meal', window: 'morning' },
  { id: 'dr3', cat: 'drinks', name: 'لاتيه أو كابتشينو بحليب قليل الدسم (بدون سكر)', portion: 'كوب وسط', kcal: 105, emoji: '🥛', type: 'meal', window: 'morning' },
  { id: 'dr4', cat: 'drinks', name: '3 تمرات متوسطة مع القهوة', portion: 'حصة طاقة طبيعية مضبوطة', kcal: 70, emoji: '🌴', type: 'meal', window: 'afternoon' },
  { id: 'dr5', cat: 'drinks', name: 'تفاحة خضراء أو برتقالة أو جريب فروت', portion: 'ألياف البكتين تبطئ الجوع', kcal: 80, emoji: '🍏', type: 'meal', window: 'evening' },
  { id: 'dr6', cat: 'drinks', name: 'كوبان مكعبات بطيخ أحمر بارد', portion: 'حجم مائي كبير بسعرات قليلة', kcal: 90, emoji: '🍉', type: 'meal', window: 'evening' },
  { id: 'dr7', cat: 'drinks', name: '3 أكواب فشار محضر بالهواء بدون زيت', portion: 'قرمشة عالية الحجم تشبع العين والمعدة', kcal: 95, emoji: '🍿', type: 'meal', window: 'evening' },
  { id: 'dr8', cat: 'drinks', name: 'قبضة صغيرة لوز نيء (10 حبات)', portion: 'دهون صحية تكبح الجوع', kcal: 75, emoji: '🥜', type: 'meal', window: 'afternoon' },

  // 6. Smart Calorie-Saving Decisions ("وفّرت وما أكلت!" — +80 XP)
  { id: 'sw1', cat: 'smart_swap', name: 'استبدلت المشروب الغازي بماء فوار أو دايت', portion: 'قرار توفير فوري • مكافأة 80 XP', kcal: 160, emoji: '🥤', type: 'saved', window: 'afternoon' },
  { id: 'sw2', cat: 'smart_swap', name: 'تركت نصف كمية الأرز أو الخبز في الصحن', portion: 'قرار توفير ذكي • مكافأة 80 XP', kcal: 250, emoji: '🍚', type: 'saved', window: 'afternoon' },
  { id: 'sw3', cat: 'smart_swap', name: 'ألغيت طلب وجبة مطعم سريعة آخر الليل', portion: 'انتصار كبير • مكافأة 80 XP', kcal: 780, emoji: '🍔', type: 'saved', window: 'night' },
  { id: 'sw4', cat: 'smart_swap', name: 'اكتفيت بلقمة أو قطعة صغيرة بدل صحن الحلى', portion: 'توفير سكريات • مكافأة 80 XP', kcal: 320, emoji: '🍰', type: 'saved', window: 'evening' },
  { id: 'sw5', cat: 'smart_swap', name: 'طلبت المشوي بدون بطاطس مقلية أو مايونيز', portion: 'توفير زيوت • مكافأة 80 XP', kcal: 380, emoji: '🍟', type: 'saved', window: 'evening' },
  { id: 'sw6', cat: 'smart_swap', name: 'شربت قهوة سادة بدل الموكا/الكراميل السكري', portion: 'توفير سعرات سائلة • مكافأة 80 XP', kcal: 340, emoji: '🧊', type: 'saved', window: 'morning' },
  { id: 'sw7', cat: 'smart_swap', name: 'اكتفيت بـ 3 تمرات بدل صحن لقيمات أو معجنات', portion: 'توفير ضيافة • مكافأة 80 XP', kcal: 260, emoji: '🌴', type: 'saved', window: 'afternoon' }
];

// Hunger Toolkit Data: 1. Diagnosis
const HUNGER_DIAGNOSIS_ITEMS = [
  {
    id: 'hd1',
    emoji: '🍔',
    title: 'شهية مفاجئة لمطعم أو أكل مقلي ومالح',
    cause: 'السبب العلمي: انخفاض الدوبامين أو التوتر وليس جوع معدة حقيقي!',
    action: 'الحل الفوري: اشرب كوب ماء كبير بارد مع عصرة ليمون ورشة ملح خفيفة + انتظر 10 دقائق.',
    savedKcal: 650,
    xp: 70
  },
  {
    id: 'hd2',
    emoji: '🍫',
    title: 'رغبة ملحة في الحلى أو الشوكولاتة بعد الأكل',
    cause: 'السبب العلمي: عادة شرطية في الدماغ أو ارتفاع سريع في الإنسولين.',
    action: 'الحل الفوري: فرّش أسنانك بمعجون النعناع الآن أو اشرب فنجان قهوة/قرفة دافئة.',
    savedKcal: 350,
    xp: 70
  },
  {
    id: 'hd3',
    emoji: '🕳️',
    title: 'قرصات وفراغ حقيقي في المعدة قبل موعد الوجبة',
    cause: 'السبب العلمي: المعدة فارغة وتفرز هرمون «الغريلين» وتحتاج لتمدد ميكانيكي.',
    action: 'الحل الفوري: اشرب كوبين ماء دافئ أو كل خيارتين مقطعتين لتفعيل مستقبلات التمدد.',
    savedKcal: 250,
    xp: 60
  },
  {
    id: 'hd4',
    emoji: '🌙',
    title: 'جوع السهر والملل أمام التلفاز أو الجوال ليلاً',
    cause: 'السبب العلمي: إرهاق الجهاز العصبي يترجمه الدماغ خطأً على أنه حاجة للسعرات.',
    action: 'الحل الفوري: طبّق اختبار البيض المسلوق؛ إن لم تشتهِ البيض فاشرب يانسون/نعناع دافئ ونم مبكراً.',
    savedKcal: 500,
    xp: 80
  }
];

// Hunger Toolkit Data: 2. 5 Science-Backed Stomach Tricks
const HUNGER_SCIENCE_TRICKS = [
  {
    id: 'ht1',
    emoji: '💧',
    title: 'صدمة التمدد الميكانيكي (كوبان ماء + ليمون)',
    desc: 'شرب 500 مل ماء دفعة واحدة يمدد جدار المعدة ويرسل إشارة شبع فورية عبر العصب الحائر للدماغ.',
    xp: 50,
    savedKcal: 200
  },
  {
    id: 'ht2',
    emoji: '🪥',
    title: 'خدعة النعناع العصبية (تفريش الأسنان فوراً)',
    desc: 'نكهة المنثول القوية تغلق مستقبلات طلب السكر في اللسان وتكسر حلقة الشهية خلال 60 ثانية.',
    xp: 50,
    savedKcal: 300
  },
  {
    id: 'ht3',
    emoji: '☕',
    title: 'قاطع هرمون الغريلين (قهوة سادة أو شاي بالنعناع)',
    desc: 'المشروبات الدافئة المرة تبطئ حركة المعدة وتخفض هرمون الجوع لمدة ساعتين إلى 3 ساعات.',
    xp: 50,
    savedKcal: 220
  },
  {
    id: 'ht4',
    emoji: '🥣',
    title: 'هلام الألياف المتمدد (ملعقة شيا أو شوفان في ماء)',
    desc: 'تمتص الألياف الذائبة الماء وتتضاعف 10 مرات داخل المعدة لتعطي امتلاءً ثقيلاً وطويل الأمد.',
    xp: 60,
    savedKcal: 280
  },
  {
    id: 'ht5',
    emoji: '🚶‍♂️',
    title: 'تشتيت الدوبامين الحركي (مشي 5 دقائق في المكان)',
    desc: 'الحركة الخفيفة تفرز أدرينالين يحرر طاقة من مخزون الدهون فيختفي الشعور بالهبوط والجوع فوراً.',
    xp: 60,
    savedKcal: 250
  }
];

// Hunger Toolkit Data: 4. Emergency Low-Calorie High-Volume Rescue Foods
const HUNGER_RESCUE_FOODS = [
  { id: 'hr1', name: 'صحن خيار وخس كبير بالليمون والكمون', portion: 'حجم ضخم يملأ المعدة بالكامل', kcal: 35, emoji: '🥒' },
  { id: 'hr2', name: 'بيضة مسلوقة واحدة مع شرائح خيار', portion: 'بروتين صافي يوقف هرمون الغريلين', kcal: 85, emoji: '🥚' },
  { id: 'hr3', name: 'زبدية شوربة خضار أو مرق دافئ', portion: 'الحرارة والسوائل تمنح شبعاً فورياً', kcal: 75, emoji: '🍲' },
  { id: 'hr4', name: '3 أكواب فشار بالهواء بدون زيت', portion: 'يمضغ طويلاً ويشبع رغبة القرمشة', kcal: 90, emoji: '🍿' },
  { id: 'hr5', name: 'علبة زبادي قليل الدسم مع رشة قرفة', portion: 'يرطب المعدة ويضبط سكر الدم', kcal: 95, emoji: '🥣' }
];

function createDefaultState() {
  return {
    theme: 'dark',
    ambientFireLight: true,
    profile: {
      startWeight: 139.0,
      currentWeight: 139.0,
      goalWeight: 95.0,
      heightCm: 175,
      age: 34,
      tdee: 2950,
      dailyDeficitGoal: 1000,
      dailyTargetKcal: 1950
    },
    xp: {
      basePoints: 0,
      streakDays: 0,
      shields: 0
    },
    today: {
      waterGlasses: 0,
      selectedFoodCat: 'breakfast',
      searchQuery: '',
      entries: [],
      quests: [
        { id: 'q1', title: 'شرب كوبين ماء قبل الوجبة الرئيسية', desc: 'يملأ المعدة ويقلل السعرات الداخلة تلقائياً', xp: 40, done: false },
        { id: 'q2', title: 'قاعدة 80% شبع (تصغير حصة واحدة)', desc: 'اترك ربع الصحن أو صغّر وجبتك مرة اليوم', xp: 80, done: false },
        { id: 'q3', title: 'يوم خالٍ من المشروبات الغازية السكرية', desc: 'استبدال السعرات السائلة بالماء أو القهوة', xp: 60, done: false },
        { id: 'q4', title: 'البقاء تحت الهدف اليومي (1,950 سعرة)', desc: 'الحفاظ على منطقة إذابة الدهون النشطة', xp: 150, done: false },
        { id: 'q5', title: 'إغلاق المطبخ بعد الساعة 8:30 مساءً', desc: 'منع سعرات السهر وتنشيط حرق الدهون ليلاً', xp: 90, done: false },
        { id: 'q6', title: 'إكمال 8 أكواب ماء خلال اليوم', desc: 'طرد السوائل المحتبسة وكبح الجوع الكاذب', xp: 50, done: false }
      ]
    },
    history14d: []
  };
}

const App = {
  state: null,
  activeTab: 'today',
  cravingTimerInterval: null,
  cravingSecondsLeft: 600,
  audioCtx: null,

  init() {
    this.loadState();
    this.applyTheme();
    this.updateClock();
    setInterval(() => this.updateClock(), 30000);
    this.initFireEngine();
    this.renderAll();
    this.renderHungerCenterContent();
    this.checkFirstTimeWelcome();

    if (location.hash) {
      const t = location.hash.slice(1);
      if (['today', 'analytics', 'xp', 'profile'].includes(t)) {
        this.switchTab(t);
      } else if (t === 'foodhub') {
        this.openFoodHub('gulf');
      } else if (t === 'hungercenter') {
        this.openHungerCenter();
      } else if (t === 'fire_heavy') {
        this.previewFireIntake('heavy');
      } else if (t === 'fire_over') {
        this.previewFireIntake('over');
      } else if (t === 'fire_fasting') {
        this.previewFireIntake('fasting');
      }
    }

    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  },

  checkFirstTimeWelcome() {
    try {
      const seen = localStorage.getItem('khiffa_welcome_seen_v1');
      if (!seen) {
        const modal = document.getElementById('welcomeModal');
        if (modal) {
          setTimeout(() => modal.classList.add('open'), 120);
        }
      }
    } catch (e) {}
  },

  dismissWelcomeModal() {
    try {
      localStorage.setItem('khiffa_welcome_seen_v1', 'true');
    } catch (e) {}
    const modal = document.getElementById('welcomeModal');
    if (modal) {
      modal.classList.remove('open');
    }
    this.playFeedback('success');
    if (this.fireEngine && this.fireEngine.spawnBurst) {
      this.fireEngine.spawnBurst(22);
    }
    this.showToast('أهلاً بك في خِفَّة! شعلة الحرق جاهزة للانطلاق 🔥', '✨');
  },

  loadState() {
    try {
      localStorage.removeItem('khiffa_ios_state_v1');
      localStorage.removeItem('khiffa_ios_state_v2');
      localStorage.removeItem('khiffa_ios_state_v3');
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.state = JSON.parse(raw);
        if (!localStorage.getItem('khiffa_dark_default_v27')) {
          this.state.theme = 'dark';
          this.state.ambientFireLight = true;
          localStorage.setItem('khiffa_dark_default_v27', 'true');
          this.saveState();
        }
        if (typeof this.state.ambientFireLight !== 'boolean') {
          this.state.ambientFireLight = true;
        }
        if (!this.state.theme) {
          this.state.theme = 'dark';
        }
        if (!this.state.uiStyle) {
                  }
        if (typeof this.state.glassTransparency !== 'number') {
          this.state.glassTransparency = 72;
        }
        if (typeof this.state.glassRefraction !== 'number') {
          this.state.glassRefraction = 70;
        }
      } else {
        this.state = createDefaultState();
        localStorage.setItem('khiffa_dark_default_v27', 'true');
        this.saveState();
      }
    } catch (e) {
      this.state = createDefaultState();
    }
  },

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {}
  },

  playFeedback(type = 'tap') {
    try {
      if (navigator.vibrate) {
        navigator.vibrate(type === 'success' ? [15, 40, 25] : 10);
      }
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) this.audioCtx = new AudioContext();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;
      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.14);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch (e) {}
  },

  showToast(text, icon = '✨') {
    const toast = document.getElementById('xpToast');
    const iconEl = document.getElementById('xpToastIcon');
    const textEl = document.getElementById('xpToastText');
    if (!toast) return;
    iconEl.textContent = icon;
    textEl.textContent = text;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  },

  updateClock() {
    const now = new Date();
    const hrs = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const h12 = hrs % 12 || 12;
    const clockEl = document.getElementById('iosClock');
    if (clockEl) clockEl.textContent = `${h12}:${mins}`;
  },

  toggleTheme() {
    this.setThemeMode(this.state.theme === 'dark' ? 'light' : 'dark');
  },

  setThemeMode(mode) {
    this.playFeedback('tap');
    this.state.theme = mode === 'light' ? 'light' : 'dark';
    this.applyTheme();
    this.saveState();
    this.renderAnalytics();
    this.showToast(
      this.state.theme === 'dark'
        ? 'تم تفعيل الوضع الليلي الأساسي  🌙'
        : 'تم تفعيل الوضع النهاري الدافئ ☀️',
      this.state.theme === 'dark' ? '🌙' : '☀️'
    );
  },

  toggleAmbientFireLight() {
    this.playFeedback('tap');
    this.state.ambientFireLight = this.state.ambientFireLight === false ? true : false;
    this.applyTheme();
    this.saveState();
    this.showToast(
      this.state.ambientFireLight
        ? 'تم تفعيل إضاءة الواجهة التفاعلية مع حركة النار 🔥'
        : 'تم إيقاف الإضاءة المحيطية التفاعلية',
      '🔥'
    );
  },

  applyTheme() {
    const theme = this.state.theme || 'dark';
    const ambientOn = this.state.ambientFireLight !== false;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-ambient-fire', ambientOn ? 'on' : 'off');
    document.documentElement.removeAttribute('data-ui-style');
    ['--glass-alpha', '--glass-sheet-alpha', '--glass-sub-alpha', '--glass-blur', '--glass-pill-blur', '--glass-refraction-norm', '--glass-specular'].forEach((p) => document.documentElement.style.removeProperty(p));

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#111714' : '#F4F1EA');
    }

    const darkBtn = document.getElementById('themeOptDark');
    const lightBtn = document.getElementById('themeOptLight');
    if (darkBtn) darkBtn.classList.toggle('active', theme === 'dark');
    if (lightBtn) lightBtn.classList.toggle('active', theme === 'light');

    const ambientPill = document.getElementById('ambientLightStatusPill');
    if (ambientPill) {
      ambientPill.textContent = ambientOn ? 'مفعّلة' : 'مغلقة';
      ambientPill.classList.toggle('off', !ambientOn);
    }
  },

  openSettingsSheet() {
    this.applyTheme();
    this.renderProfileTab();
    this.openSheet('settingsSheet');
  },

  exportUserDataJson() {
    this.playFeedback('success');
    try {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const exportPayload = {
        app: 'khiffa-ios',
        version: '2.5.0',
        exportedAt: now.toISOString(),
        state: this.state
      };
      const jsonStr = JSON.stringify(exportPayload, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `khiffa-backup-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 150);
      this.showToast('تم تصدير نسختك الاحتياطية بنجاح (JSON) 📥', '📥');
    } catch (e) {
      this.showToast('تعذر تصدير الملف في هذا المتصفح', '⚠️');
    }
  },

  importUserDataJson(event) {
    const file = event && event.target && event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const importedState = parsed && parsed.state ? parsed.state : parsed;
        if (!importedState || !importedState.profile || !importedState.today) {
          throw new Error('Invalid format');
        }
        this.state = {
          ...createDefaultState(),
          ...importedState,
          profile: { ...createDefaultState().profile, ...importedState.profile },
          xp: { ...createDefaultState().xp, ...(importedState.xp || {}) },
          today: { ...createDefaultState().today, ...importedState.today }
        };
        this.saveState();
        this.applyTheme();
        this.renderAll();
        this.closeSheet('settingsSheet');
        this.playFeedback('success');
        this.showToast('تم استيراد بياناتك واستعادة السجل بنجاح! ✨', '📂');
      } catch (err) {
        this.showToast('ملف النسخة الاحتياطية غير صالح أو تالف', '⚠️');
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  },

  copySummaryReport() {
    this.playFeedback('success');
    const p = this.state.profile;
    const m = this.getTodayMetrics();
    const xp = this.getXpState();
    const lostKg = Math.max(0, +(p.startWeight - p.currentWeight).toFixed(1));
    const report = [
      '🔥 تقرير خِفَّة اليومي:',
      `• الوزن الحالي: ${p.currentWeight.toFixed(1)} كجم (النزول: ${lostKg} كجم | الهدف: ${p.goalWeight.toFixed(1)} كجم)`,
      `• المستوى: ${xp.currentRank.level} (${xp.currentRank.title}) — ${xp.totalXp.toLocaleString()} XP | الستريك: ${this.state.xp.streakDays} يوم`,
      `• سعرات اليوم: أكلت ${m.consumedKcal} من ${m.dailyTargetKcal} سعرة | وفّرت ${m.savedBankKcal} سعرة`,
      `• العجز الحراري الصافي اليوم: ${m.netDeficitFromTdee} سعرة (أذابت ${m.fatGramsMeltedToday} جم دهن صافي)`
    ].join('\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(report).then(() => {
        this.showToast('تم نسخ ملخص تقدمك إلى الحافظة 📋', '📋');
      }).catch(() => {
        this.showToast('تم تجهيز الملخص بنجاح 📋', '📋');
      });
    } else {
      this.showToast('تم نسخ الملخص النصي 📋', '📋');
    }
  },

  checkForAppUpdates() {
    this.playFeedback('tap');
    const statusEl = document.getElementById('appUpdateStatusText');
    const iconEl = document.getElementById('checkUpdateBtnIcon');
    const btnEl = document.getElementById('checkUpdateBtn');

    if (iconEl) iconEl.classList.add('spin-anim');
    if (btnEl) btnEl.disabled = true;
    if (statusEl) {
      statusEl.textContent = 'جاري الاتصال والتحقق من آخر التحديثات...';
      statusEl.style.color = 'var(--gold)';
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => {
          if (reg && typeof reg.update === 'function') reg.update().catch(() => {});
        });
      }).catch(() => {});
    }

    setTimeout(() => {
      if (iconEl) iconEl.classList.remove('spin-anim');
      if (btnEl) btnEl.disabled = false;
      if (statusEl) {
        statusEl.textContent = 'أنت تعمل على أحدث إصدار (v2.7) ✓';
        statusEl.style.color = 'var(--sage)';
      }
      this.playFeedback('success');
      this.showToast('تطبيق خِفَّة محدّث بالكامل لآخر إصدار (v2.7) ✨', '🔄');
    }, 900);
  },

  switchTab(tabId) {
    this.playFeedback('tap');
    this.activeTab = tabId;
    document.querySelectorAll('.screen').forEach((el) => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach((el) => el.classList.remove('active'));

    const targetScreen = document.getElementById(`tab-${tabId}`);
    const targetNav = document.getElementById(`nav-${tabId}`);
    if (targetScreen) targetScreen.classList.add('active');
    if (targetNav) targetNav.classList.add('active');

    const viewport = document.getElementById('appViewport');
    if (viewport) viewport.scrollTop = 0;

    if (tabId === 'analytics') {
      this.renderAnalytics();
    } else if (tabId === 'xp') {
      this.renderXpTab();
    } else if (tabId === 'profile') {
      this.renderProfileTab();
    }
  },

  getTodayMetrics() {
    const { tdee, dailyTargetKcal } = this.state.profile;
    const mealEntries = this.state.today.entries.filter((e) => e.type === 'meal');
    const savedEntries = this.state.today.entries.filter((e) => e.type === 'saved');

    const consumedKcal = mealEntries.reduce((sum, e) => sum + e.kcal, 0);
    const savedBankKcal = savedEntries.reduce((sum, e) => sum + e.kcal, 0);
    const remainingToTarget = dailyTargetKcal - consumedKcal;
    const hasActivityToday = this.state.today.entries.length > 0;
    const netDeficitFromTdee = hasActivityToday ? Math.max(0, tdee - consumedKcal) : 0;

    const fatGramsMeltedToday = Math.round(netDeficitFromTdee / 7.7);
    const deficitXpBonus = Math.floor(netDeficitFromTdee / 10);

    return {
      tdee,
      dailyTargetKcal,
      consumedKcal,
      savedBankKcal,
      remainingToTarget,
      netDeficitFromTdee,
      fatGramsMeltedToday,
      deficitXpBonus,
      mealsCount: mealEntries.length,
      savedCount: savedEntries.length
    };
  },

  getXpState() {
    const metrics = this.getTodayMetrics();
    const completedQuestsXp = this.state.today.quests
      .filter((q) => q.done)
      .reduce((s, q) => s + q.xp, 0);
    const waterXp = this.state.today.waterGlasses * 15;
    const totalXp = this.state.xp.basePoints + metrics.deficitXpBonus + completedQuestsXp + waterXp;

    let currentRank = LEVEL_RANKS[0];
    for (const r of LEVEL_RANKS) {
      if (totalXp >= r.minXp) currentRank = r;
    }
    const nextRankNum = Math.min(10, currentRank.level + 1);
    const span = Math.max(1, currentRank.maxXp - currentRank.minXp);
    const progressInLevel = Math.min(span, totalXp - currentRank.minXp);
    const pct = Math.min(100, Math.round((progressInLevel / span) * 100));

    return {
      totalXp,
      currentRank,
      nextRankNum,
      pct,
      remainingToNext: Math.max(0, currentRank.maxXp - totalXp)
    };
  },

  renderAll() {
    this.renderHeader();
    this.renderTodayTab();
    this.renderAnalytics();
    this.renderXpTab();
    this.renderProfileTab();
  },

  renderHeader() {
    const xpState = this.getXpState();
    const streakEl = document.getElementById('headerStreakText');
    if (streakEl) streakEl.textContent = this.state.xp.streakDays;
    const xpCompactEl = document.getElementById('headerXpCompact');
    if (xpCompactEl) xpCompactEl.textContent = `${xpState.totalXp.toLocaleString()}XP`;
    const xpLineEl = document.getElementById('headerXpLine');
    if (xpLineEl) xpLineEl.textContent = `المستوى ${xpState.currentRank.level} (${xpState.currentRank.title}) • ${xpState.totalXp.toLocaleString()} XP`;
    const xpFillEl = document.getElementById('headerXpFill');
    if (xpFillEl) xpFillEl.style.width = `${xpState.pct}%`;
    const lvlPctEl = document.getElementById('headerLevelPct');
    if (lvlPctEl) lvlPctEl.textContent = `${xpState.pct}% للمستوى ${xpState.nextRankNum}`;
  },

  renderTodayTab() {
    const m = this.getTodayMetrics();

    document.getElementById('heroTdeeVal').textContent = m.tdee.toLocaleString();
    document.getElementById('ledgerTargetKcal').textContent = m.dailyTargetKcal.toLocaleString();
    document.getElementById('ledgerConsumedKcal').textContent = m.consumedKcal.toLocaleString();
    const fatEl = document.getElementById('heroFatGramsMelted');
    if (fatEl) fatEl.textContent = `🔥 أذبت ${m.fatGramsMeltedToday} جم دهن`;

    const intakeBarFill = document.getElementById('heroIntakeBarFill');
    if (intakeBarFill) {
      const intakePct = m.consumedKcal <= 0 ? 8 : Math.min(100, Math.max(8, Math.round((m.consumedKcal / Math.max(1, m.dailyTargetKcal)) * 100)));
      intakeBarFill.style.width = `${intakePct}%`;
    }
    const tdeeBarFill = document.getElementById('heroTdeeBarFill');
    if (tdeeBarFill) {
      tdeeBarFill.style.width = '100%';
    }

    // Reset fire preview mode to 'actual' whenever real data renders
    this.firePreviewMode = 'actual';
    this.updateFireHudAndTarget(m.consumedKcal, m.dailyTargetKcal, m.tdee, 'actual');

    this.renderWaterCups();
    this.renderTodayTimeline();
  },

  // ==========================================================================
  // INTERACTIVE TOUCH-RESPONSIVE FAT-BURNING FIRE ENGINE
  // (تكبر وتتوهج كلما قل الأكل، وتصغر ويخفت توهجها كلما أكلت سعرات أكثر)
  // ==========================================================================
  computeFlamePower(consumedKcal, targetKcal, tdee) {
    if (consumedKcal <= 0) return 1.0;
    if (consumedKcal <= targetKcal) {
      const ratio = consumedKcal / Math.max(1, targetKcal);
      return +(1.0 - ratio * 0.56).toFixed(2);
    }
    const overRatio = Math.min(1, (consumedKcal - targetKcal) / Math.max(1, tdee - targetKcal));
    return +(0.44 - overRatio * 0.30).toFixed(2);
  },

  updateFireHudAndTarget(consumedKcal, targetKcal, tdee, modeKey = 'actual') {
    const power = this.computeFlamePower(consumedKcal, targetKcal, tdee);
    const remainingToTarget = targetKcal - consumedKcal;
    const netDeficit = Math.max(0, tdee - consumedKcal);

    if (this.fireEngine) {
      this.fireEngine.targetPower = power;
    }

    const badge = document.getElementById('deficitStatusBadge');
    const badgeText = document.getElementById('deficitStatusText');
    const ringCaption = document.getElementById('ringCenterCaption');
    const ringBig = document.getElementById('ringRemainingKcal');
    const ringSub = document.getElementById('ringSubStatus');
    const ambientEl = document.getElementById('fireAmbientGlow');

    if (ambientEl) {
      ambientEl.style.opacity = (0.10 + Math.pow(power, 1.4) * 0.70).toFixed(2);
      ambientEl.style.transform = `scale(${(0.55 + power * 0.55).toFixed(2)})`;
    }

    if (remainingToTarget >= 0) {
      if (badge) badge.className = 'zone-pill';
      if (badgeText) badgeText.textContent = power >= 0.7 ? 'شعلة الحرق في أوج توهجها!' : 'منطقة حرق الدهون النشطة';
      if (ringCaption) ringCaption.textContent = modeKey === 'actual' ? 'المتبقي من هدف اليوم' : `معاينة: لو أكلت ${consumedKcal.toLocaleString()} سعرة`;
      if (ringBig) ringBig.textContent = remainingToTarget.toLocaleString();
      if (ringSub) {
        ringSub.textContent = 'سعرة مسموحة';
        ringSub.style.color = 'var(--sage)';
      }
    } else if (consumedKcal <= tdee) {
      if (badge) badge.className = 'zone-pill warn';
      if (badgeText) badgeText.textContent = 'الشعلة صغرت — اقتربت من سقف الحرق';
      if (ringCaption) ringCaption.textContent = `معاينة: أكلت ${consumedKcal.toLocaleString()} سعرة`;
      if (ringBig) ringBig.textContent = netDeficit.toLocaleString();
      if (ringSub) {
        ringSub.textContent = 'عجز متبقٍ ضعيف';
        ringSub.style.color = 'var(--gold)';
      }
    } else {
      if (badge) badge.className = 'zone-pill over';
      if (badgeText) badgeText.textContent = 'انطفأ وهج الحرق — سعرات زائدة!';
      if (ringCaption) ringCaption.textContent = 'تجاوزت حرق جسمك بـ';
      if (ringBig) ringBig.textContent = (consumedKcal - tdee).toLocaleString();
      if (ringSub) {
        ringSub.textContent = 'سعرة أطفأت الشعلة';
        ringSub.style.color = 'var(--flame)';
      }
    }
  },

  previewFireIntake(mode) {
    this.playFeedback('tap');
    const m = this.getTodayMetrics();
    this.firePreviewMode = mode;

    let simConsumed = m.consumedKcal;

    if (mode === 'fasting') {
      simConsumed = 200;
    } else if (mode === 'actual') {
      simConsumed = m.consumedKcal;
    } else if (mode === 'heavy') {
      simConsumed = Math.round(m.dailyTargetKcal * 1.15); // ~2240 kcal
    } else if (mode === 'over') {
      simConsumed = m.tdee + 250; // ~3200 kcal
    }

    this.updateFireHudAndTarget(simConsumed, m.dailyTargetKcal, m.tdee, mode);

    if (this.fireEngine) {
      // Immediately reflect the new flame size & trim excess sparks when shrinking
      this.fireEngine.currentPower = this.fireEngine.targetPower;
      if (this.fireEngine.targetPower < 0.45) {
        this.fireEngine.sparks = this.fireEngine.sparks.slice(0, 4);
      } else if (this.fireEngine.spawnBurst) {
        this.fireEngine.spawnBurst(14);
      }
    }
  },

  initFireEngine() {
    const canvas = document.getElementById('heroFireCanvas');
    const stage = document.getElementById('fireHearthStage');
    if (!canvas || !stage || typeof canvas.getContext !== 'function') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const engine = {
      currentPower: 0.72,
      targetPower: 0.72,
      time: 1.4,
      lastTs: 0,
      isTouching: false,
      touchX: 0,
      touchY: 0,
      lastTouchX: 0,
      lastTouchY: 0,
      targetWindX: 0,
      windX: 0,
      windVelX: 0,
      targetStretchY: 0,
      stretchY: 0,
      stretchVelY: 0,
      touchBoost: 0,
      plumes: [],
      sparks: [],
      smoke: [],
      spawnBurst: (count = 12, cx = null, cy = null) => {
        const w = canvas.clientWidth || 340;
        const h = canvas.clientHeight || 174;
        const originX = cx !== null ? cx : w * 0.5;
        const originY = cy !== null ? cy : h - 45;
        for (let i = 0; i < count; i++) {
          engine.sparks.push({
            x: originX + (Math.random() - 0.5) * 32,
            y: originY + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2.8 + engine.windX * 0.05,
            vy: -(1.2 + Math.random() * 2.4),
            r: 1.4 + Math.random() * 2.3,
            alpha: 0.95,
            hue: 15 + Math.random() * 32
          });
        }
      }
    };
    this.fireEngine = engine;

    const getPos = (ev) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = ev.touches && ev.touches[0] ? ev.touches[0].clientX : ev.clientX;
      const clientY = ev.touches && ev.touches[0] ? ev.touches[0].clientY : ev.clientY;
      return {
        x: Math.max(12, Math.min(rect.width - 12, clientX - rect.left)),
        y: Math.max(12, Math.min(rect.height - 12, clientY - rect.top)),
        w: rect.width,
        h: rect.height
      };
    };

    const onDown = (ev) => {
      const pos = getPos(ev);
      engine.isTouching = true;
      engine.touchX = pos.x;
      engine.touchY = pos.y;
      engine.lastTouchX = pos.x;
      engine.lastTouchY = pos.y;
      engine.targetWindX = (pos.x - pos.w * 0.5) * 0.48;
      engine.targetStretchY = (pos.h * 0.58 - pos.y) * 0.28;
      engine.touchBoost = 0.12;
      engine.spawnBurst(8, pos.x, pos.y);
      this.playFeedback('tap');
    };

    const onMove = (ev) => {
      if (!engine.isTouching) return;
      if (ev.cancelable) ev.preventDefault();
      const pos = getPos(ev);
      const dx = pos.x - engine.lastTouchX;
      const dy = pos.y - engine.lastTouchY;
      engine.lastTouchX = pos.x;
      engine.lastTouchY = pos.y;
      engine.touchX = pos.x;
      engine.touchY = pos.y;

      // Feed finger position & swipe momentum smoothly into spring target
      engine.targetWindX = (pos.x - pos.w * 0.5) * 0.52 + dx * 1.6;
      engine.targetStretchY = Math.max(-22, Math.min(28, (pos.h * 0.58 - pos.y) * 0.34 - dy * 0.6));
      engine.touchBoost = Math.min(0.18, engine.touchBoost + Math.hypot(dx, dy) * 0.003);

      if (Math.random() < 0.75) {
        engine.spawnBurst(2, pos.x, pos.y);
      }
    };

    const onUp = () => {
      if (!engine.isTouching) return;
      engine.isTouching = false;
      engine.targetWindX = 0;
      engine.targetStretchY = 0;
    };

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    stage.addEventListener('pointerleave', onUp);
    stage.addEventListener('touchstart', onDown, { passive: true });
    stage.addEventListener('touchmove', onMove, { passive: false });
    stage.addEventListener('touchend', onUp);

    // Draws a pure, lush, iconic S-curved teardrop flame (modeled on the exact proportions of the top-bar flame icon)
    const traceLushTeardropPath = (
      cx,
      baseY,
      w,
      h,
      bellySway,
      upperSway,
      tipSway,
      sideLickMode = 'none', // 'left', 'right', 'both', or 'none'
      t = 0
    ) => {
      const halfW = w * 0.5;
      const bellyY = baseY - h * 0.355;
      const tipX = cx + tipSway;
      const tipY = baseY - h;

      const leftBellyX = cx - halfW + bellySway;
      const rightBellyX = cx + halfW + bellySway;

      // Tilt of the vertical tangent at the belly crests so the curve is 100% C1-smooth
      const bellyTilt = (upperSway - bellySway) * 0.28;

      ctx.beginPath();
      // Start at bottom center (0, 0)
      ctx.moveTo(cx, baseY);

      // 1. Bottom center -> Left belly crest (quarter-ellipse rounded base)
      ctx.bezierCurveTo(
        cx - halfW * 0.56,
        baseY,
        leftBellyX - bellyTilt * 0.38,
        baseY - h * 0.14,
        leftBellyX,
        bellyY
      );

      // 2. Left belly crest -> Main Tip (either with an iconic side-lick + smooth U-valley, or a pure sweeping S-curve)
      if (sideLickMode === 'left' || sideLickMode === 'both') {
        const lPulse = 0.68 + Math.sin(t * 3.8 + 0.9) * 0.055;
        const lickX = cx - halfW * 0.80 + upperSway * 0.55 + Math.sin(t * 3.8) * (halfW * 0.05);
        const lickY = baseY - h * lPulse;

        const valH = lPulse - 0.14;
        const valX = cx - halfW * 0.56 + upperSway * 0.65;
        const valY = baseY - h * valH;

        // 2a. Sweep smoothly upward from Left Belly Crest to Left Side-Lick Peak
        ctx.bezierCurveTo(
          leftBellyX + bellyTilt * 0.40,
          baseY - h * 0.50,
          lickX - halfW * 0.12,
          lickY + h * 0.10,
          lickX,
          lickY
        );

        // 2b. Inner slope of Left Side-Lick curving down into the U-Valley
        ctx.bezierCurveTo(
          lickX + halfW * 0.06,
          lickY + h * 0.07,
          valX - halfW * 0.06,
          valY + h * 0.01,
          valX,
          valY
        );

        // 2c. Lush upward S-curve from the Valley up into the tall Main Tip
        ctx.bezierCurveTo(
          valX + halfW * 0.02,
          valY - h * 0.15,
          cx - halfW * 0.30 + upperSway,
          baseY - h * 0.80,
          tipX,
          tipY
        );
      } else {
        // Pure, lush S-curve sweep from Left Belly to Main Tip
        ctx.bezierCurveTo(
          leftBellyX + bellyTilt * 0.65,
          baseY - h * 0.59,
          cx - halfW * 0.42 + upperSway,
          baseY - h * 0.76,
          tipX,
          tipY
        );
      }

      // 3. Main Tip -> Right belly crest (either with a secondary side-lick + U-valley, or a pure sweeping S-curve)
      if (sideLickMode === 'right' || sideLickMode === 'both') {
        const rBasePulse = sideLickMode === 'both' ? 0.60 : 0.66;
        const rPulse = rBasePulse + Math.cos(t * 3.5 + 2.1) * 0.055;
        const lickX = cx + halfW * 0.80 + upperSway * 0.55 + Math.cos(t * 3.5) * (halfW * 0.05);
        const lickY = baseY - h * rPulse;

        const valH = rPulse - 0.13;
        const valX = cx + halfW * 0.56 + upperSway * 0.65;
        const valY = baseY - h * valH;

        // 3a. Lush S-curve from Main Tip down into the Right Valley
        ctx.bezierCurveTo(
          cx + halfW * 0.30 + upperSway,
          baseY - h * 0.80,
          valX - halfW * 0.02,
          valY - h * 0.15,
          valX,
          valY
        );

        // 3b. Rise from Right Valley up to Right Side-Lick Peak
        ctx.bezierCurveTo(
          valX + halfW * 0.06,
          valY + h * 0.01,
          lickX - halfW * 0.06,
          lickY + h * 0.07,
          lickX,
          lickY
        );

        // 3c. Sweep smoothly downward from Right Side-Lick Peak to Right Belly Crest
        ctx.bezierCurveTo(
          lickX + halfW * 0.12,
          lickY + h * 0.10,
          rightBellyX + bellyTilt * 0.40,
          baseY - h * 0.50,
          rightBellyX,
          bellyY
        );
      } else {
        // Pure, lush S-curve sweep from Main Tip to Right Belly
        ctx.bezierCurveTo(
          cx + halfW * 0.42 + upperSway,
          baseY - h * 0.76,
          rightBellyX + bellyTilt * 0.65,
          baseY - h * 0.59,
          rightBellyX,
          bellyY
        );
      }

      // 4. Right belly crest -> Bottom center (quarter-ellipse rounded base)
      ctx.bezierCurveTo(
        rightBellyX - bellyTilt * 0.38,
        baseY - h * 0.14,
        cx + halfW * 0.56,
        baseY,
        cx,
        baseY
      );

      ctx.closePath();
    };

    // Draws a unified, glowing volumetric thermal layer
    const drawUnifiedFireLayer = (
      cx,
      baseY,
      wScale,
      hScale,
      flameW,
      flameH,
      swayX,
      colBottom,
      colMid,
      colTop,
      glowColor,
      glowBlur,
      phaseLag,
      sideLickMode = 'none'
    ) => {
      const w = flameW * wScale;
      const h = flameH * hScale;
      if (h < 8 || w < 6) return;

      const t = engine.time - phaseLag;

      // Upward-traveling wave phases (belly -> upper body -> tip) for true fluid upward S-wave motion!
      const heightBreath = 1.0 + Math.sin(t * 4.2) * 0.038 + Math.cos(t * 2.7) * 0.022;
      const curH = h * heightBreath;

      const waveBelly = Math.sin(t * 3.4) * (w * 0.045);
      const waveUpper = Math.sin(t * 3.4 - 0.95) * (w * 0.095);
      const waveTip = Math.sin(t * 3.4 - 1.90) * (w * 0.15) + Math.cos(t * 5.0) * (w * 0.04);

      const bellySway = swayX * 0.28 * hScale + waveBelly;
      const upperSway = swayX * 0.64 * hScale + waveUpper;
      const mainTipSway = swayX * hScale + waveTip;

      const grad = ctx.createLinearGradient(
        cx,
        baseY,
        cx + mainTipSway * 0.6,
        baseY - curH * 1.02
      );
      grad.addColorStop(0, colBottom);
      grad.addColorStop(0.46, colMid);
      grad.addColorStop(1, colTop);

      ctx.save();
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = grad;
      if (glowBlur > 0) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowBlur;
      }

      const effectiveMode = pVisual < 0.25 ? 'none' : sideLickMode;
      traceLushTeardropPath(
        cx,
        baseY,
        w,
        curH,
        bellySway,
        upperSway,
        mainTipSway,
        effectiveMode,
        t
      );

      ctx.fill();
      ctx.restore();
    };

    let pVisual = 0.72;
    const urlT = new URLSearchParams(window.location.search).get('t');
    if (urlT !== null && !Number.isNaN(parseFloat(urlT))) {
      engine.time = parseFloat(urlT);
    }

    const renderFrame = (nowTs = 0) => {
      const w = canvas.clientWidth || 346;
      const h = canvas.clientHeight || 174;
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }

      const dt = engine.lastTs ? Math.min(0.033, Math.max(0.008, (nowTs - engine.lastTs) * 0.001)) : 0.016;
      engine.lastTs = nowTs;
      engine.time += dt * 1.05;

      // Smoothly interpolate calorie-deficit flame power
      engine.currentPower += (engine.targetPower - engine.currentPower) * 0.09;

      // Second-order spring-damper physics for buttery-smooth touch response
      const springK = 0.12;
      const damping = 0.82;
      engine.windVelX = (engine.windVelX + (engine.targetWindX - engine.windX) * springK) * damping;
      engine.windX += engine.windVelX;

      engine.stretchVelY = (engine.stretchVelY + (engine.targetStretchY - engine.stretchY) * springK) * damping;
      engine.stretchY += engine.stretchVelY;

      if (!engine.isTouching) {
        engine.touchBoost *= 0.92;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const p = Math.max(0.12, Math.min(1.15, engine.currentPower + engine.touchBoost));
      pVisual = Math.pow(p, 1.25);
      const cx = w * 0.5;
      const baseY = Math.round(h * 0.85);

      // Flame physical dimensions scaled to the larger central canvas in the Hero Card
      const maxFlameH = Math.min(225, Math.round(h * 0.72));
      const flameH = Math.max(36, Math.min(maxFlameH, 28 + pVisual * (maxFlameH - 28) + engine.stretchY));
      const flameW = Math.max(32, 26 + pVisual * Math.round(maxFlameH * 0.72));
      const swayX = engine.windX;

      // Dynamic Ambient Fire Lighting synchronization (60fps gentle reaction)
      if (!this.state || this.state.ambientFireLight !== false) {
        const microFlicker = Math.sin(engine.time * 3.6) * 0.024 + Math.cos(engine.time * 5.9) * 0.014;
        const microSwayPct = Math.sin(engine.time * 3.4 - 0.9) * 2.4;
        const normX = Math.max(22, Math.min(78, 50 + (swayX / Math.max(120, w)) * 58 + microSwayPct));
        const normY = Math.max(24, Math.min(62, 46 - pVisual * 9 - (engine.stretchY / Math.max(90, h)) * 18 + Math.cos(engine.time * 2.8) * 1.4));
        const glowAlpha = Math.max(0.05, Math.min(0.42, 0.09 + pVisual * 0.22 + microFlicker));
        const cardGlowAlpha = Math.max(0.04, Math.min(0.32, 0.06 + pVisual * 0.16 + microFlicker * 0.8));
        const rimAlpha = Math.max(0.10, Math.min(0.46, 0.14 + pVisual * 0.24 + microFlicker));

        const fireAngleDeg = Math.round(135 + (normX - 50) * 1.4 + Math.sin(engine.time * 2.6) * 12);
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty('--fire-x', `${normX.toFixed(1)}%`);
        rootStyle.setProperty('--fire-y', `${normY.toFixed(1)}%`);
        rootStyle.setProperty('--fire-angle', `${fireAngleDeg}deg`);
        rootStyle.setProperty('--fire-power', pVisual.toFixed(3));
        rootStyle.setProperty('--fire-glow-alpha', glowAlpha.toFixed(3));
        rootStyle.setProperty('--fire-card-glow', `rgba(249, 115, 22, ${cardGlowAlpha.toFixed(3)})`);
        rootStyle.setProperty('--fire-rim-tint', `rgba(251, 146, 60, ${rimAlpha.toFixed(3)})`);

        const svgLight = document.getElementById('svgFirePointLight');
        if (svgLight) {
          svgLight.setAttribute('x', String(Math.round(normX * 3.9)));
          svgLight.setAttribute('y', String(Math.round(normY * 4.2)));
        }
      }

      // 1. Soft Warm Golden-Orange Halo behind the Flame (scales with burn power)
      const glowRadius = 32 + pVisual * 96;
      const glowGrad = ctx.createRadialGradient(
        cx + swayX * 0.25,
        baseY - flameH * 0.45,
        6,
        cx + swayX * 0.15,
        baseY - flameH * 0.40,
        glowRadius
      );
      glowGrad.addColorStop(0, `rgba(251, 146, 60, ${(0.18 + pVisual * 0.36).toFixed(2)})`);
      glowGrad.addColorStop(0.55, `rgba(253, 224, 71, ${(0.08 + pVisual * 0.18).toFixed(2)})`);
      glowGrad.addColorStop(1, 'rgba(251, 146, 60, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx + swayX * 0.15, baseY - flameH * 0.40, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Soft Warm Floor Reflection (No ugly black oval!)
      ctx.save();
      const baseShadowW = Math.max(24, flameW * 0.62);
      const floorGrad = ctx.createRadialGradient(cx, baseY + 2, 2, cx, baseY + 2, baseShadowW);
      floorGrad.addColorStop(0, `rgba(234, 88, 12, ${(0.28 + pVisual * 0.32).toFixed(2)})`);
      floorGrad.addColorStop(0.6, `rgba(245, 158, 11, ${(0.12 + pVisual * 0.15).toFixed(2)})`);
      floorGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.ellipse(cx, baseY + 3, baseShadowW, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Four Crisp, Seamless Nested Flame Layers (100% Opaque Gradients + Soft Incandescent Bloom)
      // Layer 1 (Outer): Deep Crimson-Red to Vibrant Orange (Iconic asymmetric left/right side-licks)
      drawUnifiedFireLayer(
        cx,
        baseY,
        1.0,
        1.0,
        flameW,
        flameH,
        swayX,
        '#DC2626',
        '#EA580C',
        '#F97316',
        'rgba(249, 115, 22, 0.36)',
        14,
        0.0,
        'both'
      );

      // Layer 2 (Mid): Rich Tangelo Orange to Golden Amber (Concentrically nested side-licks with phase lag)
      drawUnifiedFireLayer(
        cx,
        baseY - 1,
        0.76,
        0.83,
        flameW,
        flameH,
        swayX * 0.85,
        '#EA580C',
        '#F59E0B',
        '#FBBF24',
        'rgba(245, 158, 11, 0.34)',
        10,
        0.18,
        'both'
      );

      // Layer 3 (Inner): Bright Amber to Sun-Yellow (Pure lush S-wave teardrop)
      drawUnifiedFireLayer(
        cx,
        baseY - 2,
        0.48,
        0.63,
        flameW,
        flameH,
        swayX * 0.62,
        '#F59E0B',
        '#FACC15',
        '#FEF08A',
        'rgba(250, 204, 21, 0.38)',
        8,
        0.38,
        'none'
      );

      // Layer 4 (Heart): Warm Lemon to Pure White-Hot Core (Pure incandescent heart)
      if (p > 0.20) {
        drawUnifiedFireLayer(
          cx,
          baseY - 3,
          0.30,
          0.40,
          flameW,
          flameH,
          swayX * 0.36,
          '#FEF08A',
          '#FEF9C3',
          '#FFFFFF',
          'rgba(254, 240, 138, 0.65)',
          10,
          0.66,
          'none'
        );
      }

      // 4. Sculpted Rising Flame Wisps (2 gentle teardrop embers rising above the crown)
      if (pVisual > 0.28) {
        for (let wIdx = 0; wIdx < 2; wIdx++) {
          const wPhase = ((engine.time * 0.72 + wIdx * 0.5) % 1 + 1) % 1;
          const wEnv = Math.sin(wPhase * Math.PI);
          if (wEnv > 0.14) {
            const wOffsetDir = wIdx === 0 ? -1 : 1;
            const wBaseX =
              cx +
              wOffsetDir * flameW * 0.16 * (1 - wPhase * 0.3) +
              swayX * (0.75 + wPhase * 0.35) +
              Math.sin(engine.time * 3.0 + wIdx * 2.1) * (flameW * 0.06);
            const wBaseY =
              baseY -
              flameH * (0.78 + wPhase * 0.28);
            const wW = Math.max(2.0, flameW * 0.085 * wEnv);
            const wH = Math.max(3.5, flameH * 0.13 * wEnv);

            ctx.save();
            ctx.globalAlpha = (0.82 * Math.pow(wEnv, 0.75)).toFixed(2);
            ctx.fillStyle = wIdx === 0 ? '#F97316' : '#FBBF24';
            traceLushTeardropPath(
              wBaseX,
              wBaseY,
              wW,
              wH,
              swayX * 0.05 * wEnv,
              swayX * 0.10 * wEnv,
              swayX * 0.15 * wEnv + Math.sin(engine.time * 3.6 + wIdx) * 2.0,
              'none',
              0
            );
            ctx.fill();
            ctx.restore();
          }
        }
      }

      // Crisp Golden Embers on Touch / High Burn (kept tight around the flame axis, never dusty)
      if (engine.isTouching && Math.random() < 0.45) {
        engine.sparks.push({
          x: cx + (Math.random() - 0.5) * flameW * 0.35 + swayX * 0.5,
          y: baseY - flameH * (0.65 + Math.random() * 0.25),
          vx: (Math.random() - 0.5) * 0.6 + swayX * 0.02,
          vy: -(0.9 + Math.random() * 1.2),
          r: 1.4 + Math.random() * 1.4,
          alpha: 0.9,
          hue: 24 + Math.random() * 22
        });
      }

      for (let i = engine.sparks.length - 1; i >= 0; i--) {
        const sp = engine.sparks[i];
        sp.x += sp.vx + Math.sin(engine.time * 3.2 + i) * 0.18;
        sp.y += sp.vy;
        sp.r *= 0.985;
        sp.alpha -= 0.028;
        if (sp.alpha <= 0.02 || sp.y < 8 || sp.r < 0.4) {
          engine.sparks.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.fillStyle = `hsla(${sp.hue}, 96%, 54%, ${sp.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Smoke Puffs when Flame Shrinks due to Eating High Calories (p < 0.48)
      if (p < 0.48 && Math.random() < (0.55 - p) * 0.65) {
        engine.smoke.push({
          x: cx + swayX * 0.7 + (Math.random() - 0.5) * 14,
          y: baseY - flameH - 4,
          vx: (Math.random() - 0.5) * 0.6 + swayX * 0.015,
          vy: -(0.6 + Math.random() * 0.8),
          r: 6 + Math.random() * 6,
          alpha: 0.26
        });
      }

      for (let i = engine.smoke.length - 1; i >= 0; i--) {
        const sm = engine.smoke[i];
        sm.x += sm.vx;
        sm.y += sm.vy;
        sm.r += 0.18;
        sm.alpha -= 0.005;
        if (sm.alpha <= 0.01 || sm.y < 8) {
          engine.smoke.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.fillStyle = `rgba(168, 162, 158, ${sm.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(sm.x, sm.y, sm.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 6. Interactive Finger Touch Halo when User Touches/Drags on the Fire
      if (engine.isTouching) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const touchGrad = ctx.createRadialGradient(
          engine.touchX,
          engine.touchY,
          2,
          engine.touchX,
          engine.touchY,
          28
        );
        touchGrad.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
        touchGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.45)');
        touchGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
        ctx.fillStyle = touchGrad;
        ctx.beginPath();
        ctx.arc(engine.touchX, engine.touchY, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();

      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();
  },

  renderWaterCups() {
    const count = this.state.today.waterGlasses;
    document.getElementById('waterCountText').textContent = `${count} من 8 أكواب`;
    const container = document.getElementById('waterCupsContainer');
    if (!container) return;

    let html = '';
    for (let i = 1; i <= 8; i++) {
      const filled = i <= count;
      html += `
        <button class="cup-btn ${filled ? 'filled' : ''}" onclick="App.setWaterGlasses(${i})" aria-label="كوب ماء ${i}">
          ${filled ? '💧' : '🥛'}
        </button>
      `;
    }
    container.innerHTML = html;
  },

  setWaterGlasses(num) {
    const prev = this.state.today.waterGlasses;
    this.state.today.waterGlasses = num === prev ? Math.max(0, num - 1) : num;
    if (this.state.today.waterGlasses >= 8) {
      const q6 = this.state.today.quests.find((q) => q.id === 'q6');
      if (q6) q6.done = true;
    }
    this.playFeedback('tap');
    this.showToast(`شرب الماء: ${this.state.today.waterGlasses} من 8 أكواب`, '💧');
    this.saveState();
    this.renderAll();
  },

  renderTodayTimeline() {
    const listEl = document.getElementById('todayTimelineList');
    const badgeEl = document.getElementById('timelineSummaryBadge');
    const countBadge = document.getElementById('journalCountBadge');
    const m = this.getTodayMetrics();
    if (badgeEl) {
      badgeEl.textContent = `أكلت ${m.consumedKcal} سعرة • وفّرت ${m.savedBankKcal} سعرة`;
    }
    if (countBadge) {
      countBadge.textContent = this.state.today.entries.length;
    }
    if (!listEl) return;

    if (this.state.today.entries.length === 0) {
      listEl.innerHTML = `<div class="empty-journal-state">لم تسجّل أي وجبة اليوم بعد. اختر من تبويب «الأكلات» بالأعلى للبدء!</div>`;
      return;
    }

    listEl.innerHTML = this.state.today.entries.map((entry) => {
      const isSaved = entry.type === 'saved';
      const kcalLabel = isSaved ? `وفّرت ${entry.kcal} سعرة` : `${entry.kcal} سعرة`;
      return `
        <div class="log-row ${isSaved ? 'saved-row' : ''}">
          <div class="log-row-right">
            <div class="log-row-icon">${entry.emoji}</div>
            <div class="log-row-info">
              <span class="log-row-name">${entry.name}</span>
              <span class="log-row-meta">${entry.time} • ${isSaved ? 'مكافأة +80 XP في بنك التوفير' : `تعادل ${Math.round(entry.kcal / 7.7)} جرام دهن`}</span>
            </div>
          </div>
          <div class="log-row-left">
            <span class="log-kcal-tag">${kcalLabel}</span>
            <button class="del-btn" onclick="App.deleteTimelineEntry('${entry.id}')" title="حذف">✕</button>
          </div>
        </div>
      `;
    }).join('');
  },

  deleteTimelineEntry(entryId) {
    this.playFeedback('tap');
    this.state.today.entries = this.state.today.entries.filter((e) => e.id !== entryId);
    this.saveState();
    this.renderAll();
  },

  // ==========================================================================
  // UNIFIED FOOD HUB (تسجيل وجبة جديدة رئيسي + تصفح أكلات وسجل اليوم)
  // ==========================================================================
  openFoodHub(defaultCat = 'breakfast', defaultMode = 'custom') {
    this.playFeedback('tap');
    this.state.today.selectedFoodCat = defaultCat;
    this.state.today.searchQuery = '';
    const searchInput = document.getElementById('foodSearchInput');
    if (searchInput) searchInput.value = '';
    const customInput = document.getElementById('customFoodName');
    if (customInput) customInput.value = '';

    const kcalInput = document.getElementById('customFoodKcalInput');
    const slider = document.getElementById('customFoodKcalSlider');
    if (kcalInput) kcalInput.value = 350;
    if (slider) slider.value = 350;
    this.updateCustomSubmitButtons(350);

    this.switchFoodSheetMode(defaultMode, false);
    this.renderFoodHubList();
    this.openSheet('logSheet');
  },

  switchFoodSheetMode(mode = 'custom', playSound = true) {
    if (playSound) this.playFeedback('tap');
    const modes = ['custom', 'menu', 'journal'];
    modes.forEach((mKey) => {
      const btn = document.getElementById(`modeBtn-${mKey}`);
      const pane = document.getElementById(`foodPane-${mKey}`);
      if (btn) btn.classList.toggle('active', mKey === mode);
      if (pane) {
        pane.style.display = mKey === mode ? 'flex' : 'none';
        pane.classList.toggle('active', mKey === mode);
      }
    });
  },

  onModalDirectKcalInput(val) {
    let num = parseInt(val, 10);
    if (isNaN(num) || num < 0) num = 0;
    const slider = document.getElementById('customFoodKcalSlider');
    if (slider) slider.value = Math.min(1400, Math.max(30, num));
    this.updateCustomSubmitButtons(num);
    document.querySelectorAll('.portion-preset-btn').forEach((b) => {
      const pKcal = parseInt(b.querySelector('.preset-kcal')?.textContent, 10);
      b.classList.toggle('active', pKcal === num);
    });
  },

  onModalSliderChange(val) {
    const num = parseInt(val, 10) || 0;
    const input = document.getElementById('customFoodKcalInput');
    if (input && document.activeElement !== input) {
      input.value = num;
    }
    this.updateCustomSubmitButtons(num);
    document.querySelectorAll('.portion-preset-btn').forEach((b) => {
      const pKcal = parseInt(b.querySelector('.preset-kcal')?.textContent, 10);
      b.classList.toggle('active', pKcal === num);
    });
  },

  updateCustomSubmitButtons(val) {
    const btn = document.getElementById('modalSubmitBtn');
    if (btn) btn.textContent = `+ تسجيل كوجبة (${val.toLocaleString()} سعرة)`;
  },

  setCustomPreset(kcalVal, btnEl) {
    this.playFeedback('tap');
    const input = document.getElementById('customFoodKcalInput');
    const slider = document.getElementById('customFoodKcalSlider');
    if (input) input.value = kcalVal;
    if (slider) slider.value = kcalVal;
    this.updateCustomSubmitButtons(kcalVal);
    document.querySelectorAll('.portion-preset-btn').forEach((b) => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  },

  selectFoodHubCat(cat) {
    this.playFeedback('tap');
    this.state.today.selectedFoodCat = cat;
    this.state.today.searchQuery = '';
    const searchInput = document.getElementById('foodSearchInput');
    if (searchInput) searchInput.value = '';
    this.renderFoodHubList();
  },

  onFoodSearch(query) {
    this.state.today.searchQuery = (query || '').trim();
    this.renderFoodHubList();
  },

  renderFoodHubList() {
    const cat = this.state.today.selectedFoodCat || 'breakfast';
    const q = (this.state.today.searchQuery || '').toLowerCase();

    const catBtns = document.querySelectorAll('#foodHubCategories .food-cat-chip');
    const mapIdx = { breakfast: 0, gulf: 1, protein: 2, soups: 3, drinks: 4, smart_swap: 5 };
    catBtns.forEach((b, idx) => {
      if (!q && idx === mapIdx[cat]) b.classList.add('active');
      else b.classList.remove('active');
    });

    const filtered = q
      ? FOOD_DATABASE.filter((item) => item.name.includes(q) || item.portion.includes(q))
      : FOOD_DATABASE.filter((item) => item.cat === cat);

    const listEl = document.getElementById('unifiedFoodList');
    if (!listEl) return;

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="empty-search-state">
          <span>لم نجد أكلة مطابقة لبحثك</span>
          <button type="button" class="empty-switch-btn" onclick="App.switchFoodSheetMode('custom')">+ أدخلها كوجبة مخصصة</button>
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered.map((item) => {
      const isSaved = item.type === 'saved';
      const kcalNum = item.kcal;
      const badgeLabel = isSaved ? `وفّرت ${kcalNum}` : `${kcalNum} سعرة`;
      return `
        <button class="clean-food-item ${isSaved ? 'is-saved-item' : ''}" onclick="App.logFoodDatabaseItem('${item.id}')">
          <div class="clean-food-right">
            <div class="clean-food-avatar">${item.emoji}</div>
            <div class="clean-food-info">
              <span class="clean-food-title">${item.name}</span>
              <span class="clean-food-sub">${item.portion}</span>
            </div>
          </div>
          <div class="clean-food-action">
            <span class="clean-food-kcal num">${badgeLabel}</span>
            <span class="clean-food-plus">${isSaved ? '🛡️' : '+'}</span>
          </div>
        </button>
      `;
    }).join('');
  },

  logFoodDatabaseItem(itemId) {
    const item = FOOD_DATABASE.find((p) => p.id === itemId);
    if (!item) return;

    const now = new Date();
    const hrs = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const period = hrs >= 12 ? 'م' : 'ص';
    const h12 = hrs % 12 || 12;

    this.state.today.entries.unshift({
      id: 'e_' + Date.now(),
      name: item.type === 'saved' ? `وفّرت: ${item.name}` : item.name,
      kcal: item.kcal,
      time: `${h12}:${mins} ${period}`,
      emoji: item.type === 'saved' ? '🛡️' : item.emoji,
      type: item.type,
      window: item.window || 'afternoon'
    });

    if (item.type === 'saved') {
      this.state.xp.basePoints += 80;
      const q2 = this.state.today.quests.find((q) => q.id === 'q2');
      if (q2) q2.done = true;
      this.playFeedback('success');
      this.showToast(`مكافأة 80 XP! وفّرت ${item.kcal} سعرة في بنك العجز`, '🛡️');
    } else {
      this.state.xp.basePoints += 25;
      this.playFeedback('tap');
      this.showToast(`اكسبت 25 XP — تم تسجيل «${item.name}» (${item.kcal} سعرة)`, '🍽️');
    }

    this.closeSheet('logSheet');
    this.saveState();
    this.renderAll();
  },

  applyQuarterPlateCut() {
    const input = document.getElementById('customFoodKcalInput');
    const slider = document.getElementById('customFoodKcalSlider');
    const oldVal = parseInt(input && input.value ? input.value : (slider ? slider.value : 400), 10) || 400;
    const savedKcal = Math.round(oldVal * 0.25);
    const newVal = Math.max(30, oldVal - savedKcal);
    if (input) input.value = newVal;
    if (slider) slider.value = newVal;
    this.updateCustomSubmitButtons(newVal);

    const now = new Date();
    const h12 = now.getHours() % 12 || 12;
    const mins = String(now.getMinutes()).padStart(2, '0');
    const period = now.getHours() >= 12 ? 'م' : 'ص';

    this.state.today.entries.unshift({
      id: 'e_cut_' + Date.now(),
      name: 'وفّرت: ترك ربع الصحن (خصم 25% ذكي)',
      kcal: savedKcal,
      time: `${h12}:${mins} ${period}`,
      emoji: '🛡️',
      type: 'saved',
      window: 'afternoon'
    });
    this.state.xp.basePoints += 60;
    const q2 = this.state.today.quests.find((q) => q.id === 'q2');
    if (q2) q2.done = true;
    this.playFeedback('success');
    this.showToast(`بطل! تم خصم ${savedKcal} سعرة ومكافأتك بـ 60 XP`, '🛡️');
    this.saveState();
    this.renderAll();
  },

  submitCustomLog(mode = 'meal') {
    const nameInput = document.getElementById('customFoodName').value.trim();
    const input = document.getElementById('customFoodKcalInput');
    const slider = document.getElementById('customFoodKcalSlider');
    const kcal = parseInt(input && input.value ? input.value : (slider ? slider.value : 350), 10) || 350;
    const now = new Date();
    const hrs = now.getHours();
    const h12 = hrs % 12 || 12;
    const mins = String(now.getMinutes()).padStart(2, '0');
    const period = hrs >= 12 ? 'م' : 'ص';
    const windowSlot = hrs < 12 ? 'morning' : hrs < 17 ? 'afternoon' : hrs < 21 ? 'evening' : 'night';

    if (mode === 'saved') {
      const finalName = nameInput ? `وفّرت: ${nameInput}` : 'وفّرت: قرار تقليل الحصة ومقاومة الشهية';
      this.state.today.entries.unshift({
        id: 'e_' + Date.now(),
        name: finalName,
        kcal,
        time: `${h12}:${mins} ${period}`,
        emoji: '🛡️',
        type: 'saved',
        window: windowSlot
      });
      this.state.xp.basePoints += 80;
      const q2 = this.state.today.quests.find((q) => q.id === 'q2');
      if (q2) q2.done = true;
      this.playFeedback('success');
      this.showToast(`مكافأة 80 XP! أودعت ${kcal} سعرة في بنك التوفير`, '🛡️');
    } else {
      const finalName = nameInput || 'وجبة مخصصة';
      this.state.today.entries.unshift({
        id: 'e_' + Date.now(),
        name: finalName,
        kcal,
        time: `${h12}:${mins} ${period}`,
        emoji: '🍽️',
        type: 'meal',
        window: windowSlot
      });
      this.state.xp.basePoints += 25;
      this.playFeedback('tap');
      this.showToast(`اكسبت 25 XP — تم تسجيل ${kcal} سعرة`, '🍽️');
    }

    this.closeSheet('logSheet');
    this.saveState();
    this.renderAll();
  },

  // ==========================================================================
  // SIMPLE, CALM HUNGER RELIEF SHIELD (درع كبح الجوع الفوري المبسّط)
  // ==========================================================================
  openHungerCenter() {
    this.playFeedback('tap');
    this.openSheet('cravingSheet');
  },

  renderHungerCenterContent() {
    // Kept for backward compatibility
  },

  applyHungerWaterAction() {
    this.state.today.waterGlasses = Math.min(8, this.state.today.waterGlasses + 2);
    if (this.state.today.waterGlasses >= 8) {
      const q6 = this.state.today.quests.find((q) => q.id === 'q6');
      if (q6) q6.done = true;
    }
    const now = new Date();
    const h12 = now.getHours() % 12 || 12;
    const mins = String(now.getMinutes()).padStart(2, '0');
    const period = now.getHours() >= 12 ? 'م' : 'ص';

    this.state.today.entries.unshift({
      id: 'e_wtr_' + Date.now(),
      name: 'وفّرت بكبح الجوع: شربت كوبين ماء',
      kcal: 250,
      time: `${h12}:${mins} ${period}`,
      emoji: '💧',
      type: 'saved',
      window: 'evening'
    });
    this.state.xp.basePoints += 50;
    this.closeSheet('cravingSheet');
    this.playFeedback('success');
    this.showToast('مكافأة +50 XP! شربت كوبين ماء وهدأ الجوع 💧', '💧');
    this.saveState();
    this.renderAll();
  },

  logQuickRescue(name, kcal, emoji) {
    const now = new Date();
    const h12 = now.getHours() % 12 || 12;
    const mins = String(now.getMinutes()).padStart(2, '0');
    const period = now.getHours() >= 12 ? 'م' : 'ص';

    this.state.today.entries.unshift({
      id: 'e_rsc_' + Date.now(),
      name: `منقذ شبع: ${name}`,
      kcal,
      time: `${h12}:${mins} ${period}`,
      emoji,
      type: 'meal',
      window: 'evening'
    });
    this.state.xp.basePoints += 40;
    this.closeSheet('cravingSheet');
    this.playFeedback('success');
    this.showToast(`+40 XP! اختيار ذكي يشبع بـ ${kcal} سعرة فقط ${emoji}`, emoji);
    this.saveState();
    this.renderAll();
  },

  applyDirectCravingSave() {
    const now = new Date();
    const h12 = now.getHours() % 12 || 12;
    const mins = String(now.getMinutes()).padStart(2, '0');
    const period = now.getHours() >= 12 ? 'م' : 'ص';

    this.state.today.entries.unshift({
      id: 'e_crave_win_' + Date.now(),
      name: 'وفّرت: انتصار في كبح الشهية وموجة الجوع',
      kcal: 400,
      time: `${h12}:${mins} ${period}`,
      emoji: '🛡️',
      type: 'saved',
      window: 'evening'
    });
    this.state.xp.basePoints += 80;
    const q2 = this.state.today.quests.find((q) => q.id === 'q2');
    if (q2) q2.done = true;
    this.closeSheet('cravingSheet');
    this.playFeedback('success');
    this.showToast('مكافأة 80 XP! انتصرت على الشهية ووفّرت وجبة كاملة 🛡️', '🛡️');
    this.saveState();
    this.renderAll();
  },
  // ==========================================================================
  // ANALYTICS LAB (مذيب قوالب الدهون المطور + فجوة العجز الحراري الواضحة)
  // ==========================================================================
  renderAnalytics() {
    const m = this.getTodayMetrics();
    const { tdee, dailyTargetKcal, currentWeight } = this.state.profile;
    const hasTodayEntries = this.state.today.entries.length > 0;

    const full14d = [
      ...this.state.history14d,
      {
        dayLabel: 'اليوم',
        arDay: 'اليوم',
        consumed: m.consumedKcal,
        saved: m.savedBankKcal,
        active: hasTodayEntries,
        scaleWeight: currentWeight,
        trueWeight: currentWeight
      }
    ];

    const activeDays = full14d.filter((d) => d.active !== false);
    const totalDeficit14d = activeDays.reduce((sum, d) => sum + Math.max(0, tdee - d.consumed), 0);
    const totalFatGrams14d = Math.round(totalDeficit14d / 7.7);
    const totalFatKg14d = (totalFatGrams14d / 1000).toFixed(2);
    const totalSavedBank14d = full14d.reduce((sum, d) => sum + (d.saved || 0), 0);
    const avgConsumed = activeDays.length > 0
      ? Math.round(activeDays.reduce((s, d) => s + d.consumed, 0) / activeDays.length)
      : 0;
    const avgReductionPct = activeDays.length > 0
      ? Math.round(((tdee - avgConsumed) / tdee) * 100)
      : 0;

    document.getElementById('kpiTotalDeficit').textContent = `${totalDeficit14d.toLocaleString()} سعرة`;
    document.getElementById('kpiTotalFatKg').textContent = `${totalFatKg14d} كجم`;
    document.getElementById('kpiTotalFatGramsSub').textContent = `تعادل ${totalFatGrams14d.toLocaleString()} جرام دهن صافي`;
    document.getElementById('kpiSavedBankKcal').textContent = `${totalSavedBank14d.toLocaleString()} سعرة`;
    document.getElementById('kpiAvgReduction').textContent = `${avgReductionPct}% أقل`;

    // 1. Showcase Butter / Fat Block Melter
    const meltedBlocksFloat = totalFatGrams14d / 250;
    const meltedBlocksCount = Math.floor(meltedBlocksFloat);
    const activeBlockNum = meltedBlocksCount + 1;
    const gramsInActiveCube = totalFatGrams14d % 250;
    const activeCubePct = Math.round((gramsInActiveCube / 250) * 100);
    const remainingGramsForCube = 250 - gramsInActiveCube;
    const remainingKcalForCube = Math.round(remainingGramsForCube * 7.7);

    document.getElementById('butterBlocksCountLabel').textContent = `${meltedBlocksFloat.toFixed(1)} قوالب ذابت`;
    document.getElementById('activeCubePctText').textContent = `${activeCubePct}%`;
    document.getElementById('activeCubeTitleText').textContent = `القالب رقم ${activeBlockNum} يذوب الآن!`;
    document.getElementById('activeCubeGramsText').textContent = `ذاب ${gramsInActiveCube} من 250 جرام`;
    document.getElementById('activeCubeProgressBar').style.width = `${activeCubePct}%`;
    document.getElementById('activeCubeRemainingHint').textContent = `باقي توفير ${remainingKcalForCube.toLocaleString()} سعرة فقط ليذوب القالب رقم ${activeBlockNum} بالكامل!`;

    const butterGrid = document.getElementById('butterBlocksGrid');
    if (butterGrid) {
      let bHtml = '';
      for (let i = 1; i <= 8; i++) {
        const isMelted = i <= meltedBlocksCount;
        const isCurrent = i === activeBlockNum;
        const cellClass = isMelted ? 'melted' : isCurrent ? 'melting-now' : '';
        const icon = isMelted ? '🧈✨' : isCurrent ? '🧈🔥' : '🧈';
        const title = isMelted ? `القالب ${i} ✓` : isCurrent ? `القالب ${i} (${activeCubePct}%)` : `القالب ${i}`;
        const sub = isMelted ? 'ذاب بالكامل (250 جم)' : isCurrent ? `يذوب الآن (${gramsInActiveCube} جم)` : '250 جرام دهن';

        bHtml += `
          <div class="butter-cell ${cellClass}">
            <span style="font-size:16px;">${icon}</span>
            <span class="butter-cell-title">${title}</span>
            <span class="butter-cell-sub">${sub}</span>
          </div>
        `;
      }
      butterGrid.innerHTML = bHtml;
    }

    // 2. Upgraded 7-Day Deficit Gap Chart
    this.renderWeeklyDeficitSvg(full14d.slice(-7), tdee, dailyTargetKcal);

    // 3. Future Simulator
    const simSlider = document.getElementById('deficitSimSlider');
    this.updateSimulator(simSlider ? simSlider.value : 1000);

    // 4. True Weight Chart
    this.renderTrueWeightSvg(full14d);

    // 5. Calorie Leaks
    this.renderCalorieLeaks();
  },

  renderWeeklyDeficitSvg(days7, tdee, target) {
    const box = document.getElementById('weeklyDeficitChartBox');
    if (!box) return;

    const activeDays7 = days7.filter((d) => d.active !== false);
    const avgIntake7d = activeDays7.length > 0
      ? Math.round(activeDays7.reduce((s, d) => s + d.consumed, 0) / activeDays7.length)
      : 0;
    const avgDeficit7d = activeDays7.length > 0 ? Math.max(0, tdee - avgIntake7d) : 0;
    document.getElementById('gapStatTdee').textContent = `${tdee.toLocaleString()} سعرة`;
    document.getElementById('gapStatAvgIntake').textContent = `${avgIntake7d.toLocaleString()} سعرة`;
    document.getElementById('gapStatAvgDeficit').textContent = `${avgDeficit7d.toLocaleString()} سعرة/يوم`;

    const w = 320;
    const h = 182;
    const padTop = 24;
    const padBot = 26;
    const chartH = h - padTop - padBot;
    const maxKcal = Math.max(tdee * 1.08, 3200);

    const yFor = (val) => padTop + chartH - (Math.min(maxKcal, val) / maxKcal) * chartH;
    const yTdee = yFor(tdee);

    const colW = w / days7.length;
    const barW = 28;

    const barsSvg = days7.map((d, idx) => {
      const cx = idx * colW + colW / 2;
      const bx = cx - barW / 2;
      const yConsumed = yFor(d.consumed);
      const barH = Math.max(14, padTop + chartH - yConsumed);
      const deficitVal = d.active === false ? 0 : Math.max(0, tdee - d.consumed);
      const deficitH = d.active === false ? 0 : Math.max(0, yConsumed - yTdee);
      const isUnderTarget = d.consumed <= target;
      const barColor = isUnderTarget ? 'var(--sage)' : 'var(--gold)';
      const midGapY = yTdee + deficitH / 2 + 3;

      return `
        <g>
          <!-- Highlighted Deficit Gap Pillar (The Fat Burn Zone) -->
          <rect x="${bx}" y="${yTdee}" width="${barW}" height="${deficitH}" rx="5" fill="var(--sage-light)" stroke="var(--sage-border)" stroke-width="1" stroke-dasharray="2 2" />
          ${deficitH > 22 ? `
            <text x="${cx}" y="${midGapY}" text-anchor="middle" direction="ltr" unicode-bidi="embed" font-size="8.5" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" fill="var(--sage)">-${deficitVal}</text>
          ` : ''}

          <!-- Consumed Calories Solid Pillar -->
          <rect x="${bx}" y="${yConsumed}" width="${barW}" height="${barH}" rx="5" fill="${barColor}" />
          <text x="${cx}" y="${padTop + chartH - 5}" text-anchor="middle" font-size="8" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" fill="#FFFFFF">${d.consumed}</text>

          <!-- Day Name -->
          <text x="${cx}" y="${h - 8}" text-anchor="middle" font-size="9.5" font-family="Readex Pro, sans-serif" font-weight="700" fill="var(--ink-2)">${d.arDay}</text>
        </g>
      `;
    }).join('');

    box.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" width="100%" height="182">
        <line x1="6" y1="${yTdee}" x2="${w - 6}" y2="${yTdee}" stroke="var(--flame)" stroke-width="1.5" stroke-dasharray="4 3" />
        <text x="${w / 2}" y="${yTdee - 6}" text-anchor="middle" font-size="9.5" font-family="Readex Pro, sans-serif" font-weight="700" fill="var(--flame)">سقف حرق الجسم اليومي (${tdee} سعرة)</text>
        ${barsSvg}
      </svg>
    `;
  },

  updateSimulator(cutValue) {
    const dailyCut = parseInt(cutValue, 10) || 1000;
    const { tdee, currentWeight, goalWeight } = this.state.profile;
    const targetIntake = Math.max(1200, tdee - dailyCut);
    const dailyFatGrams = Math.round(dailyCut / 7.7);

    document.getElementById('simBadgeValue').textContent = `توفير ${dailyCut.toLocaleString()} سعرة/يوم`;
    document.getElementById('simTargetIntakeLabel').textContent = `${targetIntake.toLocaleString()} سعرة`;
    document.getElementById('simDailyFatBurnLabel').textContent = `يذيب ${dailyFatGrams} جرام دهن/يوم`;

    const loss30 = +((dailyCut * 30) / 7700).toFixed(1);
    const loss90 = +((dailyCut * 90) / 7700).toFixed(1);
    const loss180 = +((dailyCut * 180) / 7700).toFixed(1);

    document.getElementById('simLoss30d').textContent = `ينزل ${loss30} كجم`;
    document.getElementById('simWeight30d').textContent = `الوزن: ${(currentWeight - loss30).toFixed(1)} كجم`;

    document.getElementById('simLoss90d').textContent = `ينزل ${loss90} كجم`;
    document.getElementById('simWeight90d').textContent = `الوزن: ${(currentWeight - loss90).toFixed(1)} كجم`;

    document.getElementById('simLoss180d').textContent = `ينزل ${loss180} كجم`;
    document.getElementById('simWeight180d').textContent = `الوزن: ${(currentWeight - loss180).toFixed(1)} كجم`;

    const kgToGoal = Math.max(1, currentWeight - goalWeight);
    const daysToGoal = Math.round((kgToGoal * 7700) / dailyCut);
    document.getElementById('simGoalWeightText').textContent = `${goalWeight} كجم`;
    document.getElementById('simGoalDateText').textContent = `خلال ${(daysToGoal / 30).toFixed(1)} شهر (${daysToGoal} يوم)`;
  },

  renderTrueWeightSvg(days14) {
    const box = document.getElementById('trueWeightChartBox');
    if (!box) return;

    const w = 320;
    const h = 145;
    const padX = 24;
    const padY = 20;
    const chartW = w - padX * 2;
    const chartH = h - padY * 2;

    const allWeights = days14.flatMap((d) => [d.scaleWeight, d.trueWeight]);
    const minW = Math.min(...allWeights) - 0.4;
    const maxW = Math.max(...allWeights) + 0.4;
    const spanW = Math.max(0.1, maxW - minW);

    const xFor = (i) => days14.length <= 1 ? w / 2 : padX + (i / (days14.length - 1)) * chartW;
    const yFor = (val) => padY + chartH - ((val - minW) / spanW) * chartH;

    const truePoints = days14.map((d, i) => `${xFor(i).toFixed(1)},${yFor(d.trueWeight).toFixed(1)}`).join(' ');
    const scalePoints = days14.map((d, i) => `${xFor(i).toFixed(1)},${yFor(d.scaleWeight).toFixed(1)}`).join(' ');

    const dotsSvg = days14.map((d, i) => {
      const cx = xFor(i).toFixed(1);
      const cyScale = yFor(d.scaleWeight).toFixed(1);
      const cyTrue = yFor(d.trueWeight).toFixed(1);
      return `
        <circle cx="${cx}" cy="${cyScale}" r="2.5" fill="var(--ink-4)" />
        ${i === 0 || i === days14.length - 1 ? `
          <circle cx="${cx}" cy="${cyTrue}" r="4" fill="var(--sage)" />
          <text x="${cx}" y="${cyTrue - 7}" text-anchor="middle" font-size="9.5" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" fill="var(--sage)">${d.trueWeight}</text>
        ` : ''}
      `;
    }).join('');

    box.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" width="100%" height="145">
        <polyline fill="none" stroke="var(--ink-4)" stroke-width="1.4" stroke-dasharray="3 3" points="${scalePoints}" />
        <polyline fill="none" stroke="var(--sage)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" points="${truePoints}" />
        ${dotsSvg}
      </svg>
      <div class="chart-legend-row" style="margin-top:4px;">
        <span><span class="dot-indicator" style="background:var(--sage);"></span>الوزن الدهني الحقيقي (نزول ثابت)</span>
        <span><span class="dot-indicator" style="background:var(--ink-4);"></span>وزن الميزان اليومي</span>
      </div>
    `;
  },

  renderCalorieLeaks() {
    const container = document.getElementById('calorieLeaksContainer');
    if (!container) return;

    const windows = {
      morning: { label: '🌅 الصباح والفطور', kcal: 0, color: 'var(--sage)', tip: 'ابدأ يومك ببروتين مشبع صباحاً لكبح الجوع طوال النهار.' },
      afternoon: { label: '☀️ الظهيرة والغداء', kcal: 0, color: 'var(--gold)', tip: 'تطبيق قاعدة «نصف الصحن سلطة وترك ربع النشويات» يوفر لك 280 سعرة يومياً!' },
      evening: { label: '🌆 المساء والعشاء', kcal: 0, color: 'var(--flame)', tip: 'توفير 250 سعرة من وجبة المساء واستبدالها ببروتين خفيف يختصر 1.1 كجم دهون إضافية هذا الشهر!' },
      night: { label: '🌙 سهر آخر الليل', kcal: 0, color: 'var(--ocean)', tip: 'إغلاق المطبخ بعد 8:30 مساءً يمنع السعرات الخفية التي تتحول مباشرة لدهون مخزنة!' }
    };

    this.state.today.entries.forEach((e) => {
      if (e.type === 'meal' && windows[e.window]) {
        windows[e.window].kcal += e.kcal;
      }
    });

    const rawTotal = Object.values(windows).reduce((s, w) => s + w.kcal, 0);
    const total = Math.max(1, rawTotal);
    let topWin = windows.afternoon;
    for (const w of Object.values(windows)) {
      if (w.kcal > topWin.kcal) topWin = w;
    }

    const adviceBox = document.getElementById('smartCoachAdviceBox');
    if (adviceBox) {
      adviceBox.innerHTML = rawTotal === 0
        ? `💡 <strong>توصية المحلل الذكي:</strong> لم تسجّل أي وجبات بعد اليوم — سجل وجباتك ليحلل الرادار أوقات استهلاكك للسعرات.`
        : `💡 <strong>توصية المحلل الذكي:</strong> ${topWin.tip}`;
    }

    container.innerHTML = Object.values(windows).map((w) => {
      const pct = rawTotal === 0 ? 0 : Math.round((w.kcal / total) * 100);
      return `
        <div class="leak-item">
          <div class="leak-item-top">
            <span>${w.label}</span>
            <span>${w.kcal} سعرة (${pct}%)</span>
          </div>
          <div class="leak-track">
            <div class="leak-fill" style="width:${pct}%; background:${w.color};"></div>
          </div>
        </div>
      `;
    }).join('');
  },

  // ==========================================================================
  // XP & QUESTS SCREEN
  // ==========================================================================
  renderXpTab() {
    const xpState = this.getXpState();
    const m = this.getTodayMetrics();

    document.getElementById('xpTabRankTitle').textContent = `المستوى ${xpState.currentRank.level}: ${xpState.currentRank.title}`;
    document.getElementById('xpTabSubDesc').textContent = `باقي ${xpState.remainingToNext.toLocaleString()} نقطة XP للرتبة التالية`;
    document.getElementById('xpTabTotalPoints').textContent = xpState.totalXp.toLocaleString();
    document.getElementById('xpTabProgressBar').style.width = `${xpState.pct}%`;
    document.getElementById('xpStatStreak').textContent = `${this.state.xp.streakDays} يوماً`;
    document.getElementById('xpStatShields').textContent = `${this.state.xp.shields} دروع`;
    document.getElementById('xpStatSavedCount').textContent = `${m.savedCount} مرات`;

    const quests = this.state.today.quests;
    const doneCount = quests.filter((q) => q.done).length;
    document.getElementById('questsProgressLabel').textContent = `${doneCount} من ${quests.length} مكتملة`;

    const questsEl = document.getElementById('dailyQuestsList');
    if (questsEl) {
      questsEl.innerHTML = quests.map((q) => `
        <div class="quest-row ${q.done ? 'done' : ''}" onclick="App.toggleQuest('${q.id}')">
          <div style="display:flex; align-items:center; gap:8px; flex:1;">
            <div class="quest-check-circle">${q.done ? '✓' : ''}</div>
            <div class="log-row-info">
              <span class="log-row-name">${q.title}</span>
              <span class="log-row-meta">${q.desc}</span>
            </div>
          </div>
          <span class="quest-xp-badge">مكافأة ${q.xp} XP</span>
        </div>
      `).join('');
    }

    const roadmapEl = document.getElementById('levelRoadmapList');
    if (roadmapEl) {
      roadmapEl.innerHTML = LEVEL_RANKS.map((r) => {
        const unlocked = xpState.totalXp >= r.minXp;
        return `
          <div class="log-row ${unlocked ? 'saved-row' : ''}" style="opacity:${unlocked ? '1' : '0.6'};">
            <div class="log-row-right">
              <div class="log-row-icon" style="font-weight:800; font-family:var(--font-num);">${r.level}</div>
              <div class="log-row-info">
                <span class="log-row-name">${r.badge} ${r.title} ${unlocked ? '✓' : ''}</span>
                <span class="log-row-meta">${r.desc}</span>
              </div>
            </div>
            <span class="log-kcal-tag">${r.minXp.toLocaleString()} نقطة</span>
          </div>
        `;
      }).join('');
    }
  },

  toggleQuest(questId) {
    const q = this.state.today.quests.find((item) => item.id === questId);
    if (!q) return;
    q.done = !q.done;
    if (q.done) {
      this.playFeedback('success');
      this.showToast(`مكافأة ${q.xp} XP — أنجزت مهمة «${q.title}»`, '🎯');
    } else {
      this.playFeedback('tap');
    }
    this.saveState();
    this.renderAll();
  },

  // ==========================================================================
  // UPGRADED MY BODY (جسمي الشامل: مكاسب صحية، محطات مرحلية، احتياجات يومية)
  // ==========================================================================
  renderProfileTab() {
    const p = this.state.profile;
    const lostKg = Math.max(0, +(p.startWeight - p.currentWeight).toFixed(1));
    const totalToLose = Math.max(1, +(p.startWeight - p.goalWeight).toFixed(1));
    const remainingKg = Math.max(0, +(p.currentWeight - p.goalWeight).toFixed(1));
    const journeyPct = Math.min(100, Math.round((lostKg / totalToLose) * 100));

    document.getElementById('profileWeightLostBadge').textContent = `خسرت ${lostKg} كجم`;
    document.getElementById('quickWeightInput').value = p.currentWeight;
    document.getElementById('profileStartWeight').textContent = p.startWeight.toFixed(1);
    document.getElementById('profileCurrentWeight').textContent = p.currentWeight.toFixed(1);
    document.getElementById('profileGoalWeight').textContent = p.goalWeight.toFixed(1);

    document.getElementById('journeyProgressText').textContent = `أنجزت ${journeyPct}% من رحلة التخلص من الوزن الزائد`;
    document.getElementById('journeyRemainingKgText').textContent = `باقي ${remainingKg} كجم`;
    document.getElementById('journeyProgressBar').style.width = `${Math.max(4, journeyPct)}%`;

    // Real Biological Health Gains
    const kneeReliefKg = (lostKg * 4).toFixed(1);
    const waistCmLost = (lostKg * 0.9).toFixed(1);
    const butterCubesTotal = (lostKg * 4).toFixed(1);
    const heightM = (p.heightCm || 175) / 100;
    const startBmi = p.startWeight / (heightM * heightM);
    const currentBmi = p.currentWeight / (heightM * heightM);
    const bmiDrop = Math.max(0, startBmi - currentBmi).toFixed(1);

    document.getElementById('gainKneePressure').textContent = `أزلت ${kneeReliefKg} كجم`;
    document.getElementById('gainWaistCm').textContent = `ناقص ${waistCmLost} سم`;
    document.getElementById('gainButterTotal').textContent = `${butterCubesTotal} قالب دهن`;
    document.getElementById('gainBmiVal').textContent = `BMI: ${currentBmi.toFixed(1)}`;
    document.getElementById('gainBmiDelta').textContent = `انخفض مؤشر كتلة جسمك بمقدار ${bmiDrop} نقطة لصحة قلبك.`;

    // Step-by-Step 5 kg Milestones Roadmap
    const milestonesEl = document.getElementById('bodyMilestonesList');
    if (milestonesEl) {
      const steps = [
        { targetW: +(p.startWeight - 4).toFixed(0), label: 'المحطة الأولى: كسر حاجز البداية', benefit: 'تخفيف 16 كجم ضغط عن الركبتين وطرد السوائل' },
        { targetW: +(p.startWeight - 9).toFixed(0), label: 'المحطة الثانية: خفة الحركة والنفس', benefit: 'انكماش محيط الخصر 8 سم وتحسن النوم ليلاً' },
        { targetW: +(p.startWeight - 15).toFixed(0), label: 'المحطة الثالثة: تغير مقاس الملابس', benefit: 'تخفيف 60 كجم ضغط عن المفاصل ونشاط مضاعف' },
        { targetW: +(p.startWeight - 22).toFixed(0), label: 'المحطة الرابعة: التحول الأيضي العميق', benefit: 'توازن الإنسولين واختفاء الجوع العاطفي' }
      ];

      let foundActive = false;
      milestonesEl.innerHTML = steps.map((st) => {
        const achieved = p.currentWeight <= st.targetW;
        const isCurrent = !achieved && !foundActive;
        if (isCurrent) foundActive = true;
        const kgLeft = Math.max(0, +(p.currentWeight - st.targetW).toFixed(1));
        const daysEst = Math.round((kgLeft * 7700) / Math.max(500, p.dailyDeficitGoal || 1000));

        return `
          <div class="milestone-row ${achieved ? 'achieved' : isCurrent ? 'current-target' : ''}">
            <div class="log-row-right">
              <div class="log-row-icon">${achieved ? '✅' : isCurrent ? '🎯' : '🏁'}</div>
              <div class="log-row-info">
                <span class="log-row-name">${st.label} (${st.targetW} كجم)</span>
                <span class="log-row-meta">${st.benefit}</span>
              </div>
            </div>
            <span class="log-kcal-tag" style="color:${achieved ? 'var(--sage)' : isCurrent ? 'var(--gold)' : 'var(--ink-3)'};">
              ${achieved ? 'تحققت ✓' : `باقي ${kgLeft} كجم (خلال ${daysEst} يوم)`}
            </span>
          </div>
        `;
      }).join('');
    }

    // Daily Biological Needs
    const proteinNeed = Math.round(p.currentWeight * 1.0);
    const waterNeedLiters = (p.currentWeight * 0.028).toFixed(1);
    document.getElementById('needProteinGrams').textContent = `${proteinNeed} جرام`;
    document.getElementById('needWaterLiters').textContent = `${waterNeedLiters} لتر`;
    document.getElementById('needStepsCount').textContent = '4,500';

    document.getElementById('profHeight').value = p.heightCm;
    document.getElementById('profAge').value = p.age;
    document.getElementById('profGoalWeightInput').value = p.goalWeight;
    document.getElementById('profDeficitTarget').value = String(p.dailyDeficitGoal || 1000);
    document.getElementById('profCalculatedTdee').textContent = `${p.tdee.toLocaleString()} سعرة`;
    document.getElementById('profCalculatedTarget').textContent = `${p.dailyTargetKcal.toLocaleString()} سعرة`;
  },

  logNewWeight() {
    const val = parseFloat(document.getElementById('quickWeightInput').value);
    if (isNaN(val) || val < 40 || val > 350) return;
    this.state.profile.currentWeight = +val.toFixed(1);
    this.state.xp.basePoints += 50;
    this.recomputeTdee();
    this.playFeedback('success');
    this.showToast(`مكافأة 50 XP — تم تحديث الوزن إلى ${val.toFixed(1)} كجم`, '⚖️');
    this.saveState();
    this.renderAll();
  },

  recomputeTdee() {
    const p = this.state.profile;
    const bmr = 10 * p.currentWeight + 6.25 * p.heightCm - 5 * p.age + 5;
    const tdee = Math.round((bmr * 1.28) / 10) * 10;
    p.tdee = Math.max(1800, tdee);
    p.dailyTargetKcal = Math.max(1300, p.tdee - p.dailyDeficitGoal);
  },

  saveProfileSettings() {
    const h = parseInt(document.getElementById('profHeight').value, 10) || 175;
    const age = parseInt(document.getElementById('profAge').value, 10) || 34;
    const goalW = parseFloat(document.getElementById('profGoalWeightInput').value) || 95;
    const def = parseInt(document.getElementById('profDeficitTarget').value, 10) || 1000;

    this.state.profile.heightCm = h;
    this.state.profile.age = age;
    this.state.profile.goalWeight = goalW;
    this.state.profile.dailyDeficitGoal = def;
    this.recomputeTdee();

    this.playFeedback('success');
    this.showToast(`تم تحديث الميزانية: هدفك اليومي ${this.state.profile.dailyTargetKcal} سعرة`, '🧬');
    this.saveState();
    this.renderAll();
    this.closeSheet('settingsSheet');
  },

  resetToFreshDay() {
    this.playFeedback('tap');
    this.state.today.entries = [];
    this.state.today.waterGlasses = 0;
    this.state.today.quests.forEach((q) => (q.done = false));
    this.saveState();
    this.renderAll();
    this.closeSheet('settingsSheet');
    this.switchTab('today');
    this.showToast('تم تصفير وجبات اليوم للبدء من جديد', '🔄');
  },

  restoreDemoData() {
    this.playFeedback('success');
    this.state = createDefaultState();
    this.saveState();
    this.applyTheme();
    this.renderAll();
    this.closeSheet('settingsSheet');
    this.switchTab('today');
    this.showToast('تمت استعادة البيانات التوضيحية الكاملة', '✨');
  },

  openSheet(sheetId) {
    this.playFeedback('tap');
    const el = document.getElementById(sheetId);
    if (el) el.classList.add('open');
  },

  closeSheet(sheetId) {
    const el = document.getElementById(sheetId);
    if (el) el.classList.remove('open');
    if (sheetId === 'logSheet') {
      document.querySelectorAll('.nav-btn').forEach((btn) => btn.classList.remove('active'));
      const activeNav = document.getElementById(`nav-${this.activeTab || 'today'}`);
      if (activeNav) activeNav.classList.add('active');
    }
    if (sheetId === 'cravingSheet' && this.cravingTimerInterval) {
      clearInterval(this.cravingTimerInterval);
      this.cravingTimerInterval = null;
    }
  },

  backdropClick(event, sheetId) {
    if (event.target.id === sheetId) {
      this.closeSheet(sheetId);
    }
  },

  toggleCravingTimer() {
    const btn = document.getElementById('cravingStartBtn');
    const display = document.getElementById('cravingTimerDisplay');
    const guide = document.getElementById('breathingGuideText');

    if (this.cravingTimerInterval) {
      clearInterval(this.cravingTimerInterval);
      this.cravingTimerInterval = null;
      btn.textContent = 'استئناف المؤقت';
      return;
    }

    this.playFeedback('tap');
    btn.textContent = 'إيقاف مؤقت';
    this.cravingTimerInterval = setInterval(() => {
      this.cravingSecondsLeft = Math.max(0, this.cravingSecondsLeft - 1);
      const m = String(Math.floor(this.cravingSecondsLeft / 60)).padStart(2, '0');
      const s = String(this.cravingSecondsLeft % 60).padStart(2, '0');
      display.textContent = `${m}:${s}`;

      const cycle = this.cravingSecondsLeft % 8;
      guide.textContent = cycle >= 4 ? 'شهيق عميق (4 ث)...' : 'زفير بطيء (4 ث)...';

      if (this.cravingSecondsLeft === 0) {
        clearInterval(this.cravingTimerInterval);
        this.cravingTimerInterval = null;
        this.completeCravingVictory();
      }
    }, 1000);
  },

  completeCravingVictory() {
    if (this.cravingTimerInterval) {
      clearInterval(this.cravingTimerInterval);
      this.cravingTimerInterval = null;
    }
    this.cravingSecondsLeft = 600;
    document.getElementById('cravingTimerDisplay').textContent = '10:00';
    document.getElementById('cravingStartBtn').textContent = 'تشغيل المؤقت';

    const now = new Date();
    const h12 = now.getHours() % 12 || 12;
    const mins = String(now.getMinutes()).padStart(2, '0');
    const period = now.getHours() >= 12 ? 'م' : 'ص';

    this.state.today.entries.unshift({
      id: 'e_crave_' + Date.now(),
      name: 'وفّرت: انتصار في موجة كسر الشهية (10 دقائق)',
      kcal: 450,
      time: `${h12}:${mins} ${period}`,
      emoji: '🌊',
      type: 'saved',
      window: 'evening'
    });
    this.state.xp.basePoints += 100;
    this.closeSheet('cravingSheet');
    this.playFeedback('success');
    this.showToast('مكافأة 100 XP! انتصرت على موجة الجوع العاطفي', '🌊');
    this.saveState();
    this.renderAll();
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
