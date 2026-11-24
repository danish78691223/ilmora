
const t = (en, ur, ar) => ({ en, ur, ar });

export const defaultContent = {
  settings: {
    brand: t('ILMORA', 'لنگو', 'لينجو'),
    tagline: t(
      'Learn languages. Open worlds.',
      'زبانیں سیکھیں، نئی دنیا سے جڑیں۔',
      'تعلّم اللغات وافتح آفاقاً جديدة'
    ),
    primary: '#142b55',
    accent: '#d9a441',
    email: 'hello@ILMORA.example',
    phone: '+1 555 010 2020',
    address: t(
      'Online institute — learn from anywhere',
      'آن لائن ادارہ — کہیں سے بھی سیکھیں',
      'معهد عبر الإنترنت — تعلّم من أي مكان'
    ),
    hours: t(
      'Monday–Saturday, 9:00 AM–6:00 PM',
      'پیر تا ہفتہ، صبح ۹ تا شام ۶',
      'من الاثنين إلى السبت، ٩ صباحاً–٦ مساءً'
    ),
    lmsUrl: 'https://lms.example.com',
    socials: {
      instagram: '',
      facebook: '',
      youtube: '',
      linkedin: ''
    },
    mapUrl: ''
  },

  nav: {
    home: t('Home', 'صفحۂ اوّل', 'الرئيسية'),
    about: t('About', 'ہمارے بارے میں', 'من نحن'),
    contact: t('Contact', 'رابطہ', 'اتصل بنا'),
    apply: t('Apply Now', 'ابھی درخواست دیں', 'قدّم الآن')
  },

  home: {
    hero: {
      eyebrow: t(
        'ONLINE LANGUAGE INSTITUTE',
        'آن لائن زبانوں کا ادارہ',
        'معهد لغات عبر الإنترنت'
      ),
      title: t(
        'Find your voice. Connect with the world.',
        'اپنی پہچان بنائیں، دنیا سے جڑیں۔',
        'اكتشف صوتك وتواصل مع العالم'
      ),
      subtitle: t(
        'Learn English, Urdu and Arabic with expert teachers, thoughtful lessons and flexible online classes.',
        'ماہر اساتذہ کے ساتھ انگریزی، اردو اور عربی سیکھیں۔',
        'تعلّم الإنجليزية والأردية والعربية مع معلّمين خبراء ودروس مرنة عبر الإنترنت'
      ),
      primary: t('Apply Now', 'ابھی درخواست دیں', 'قدّم الآن'),
      secondary: t('Discover ILMORA', 'لنگو کو جانیں', 'اكتشف لينجو')
    },

    languages: [
      {
        name: t('English', 'انگریزی', 'الإنجليزية'),
        desc: t(
          'Build confidence for study, work and everyday conversations.',
          'تعلیم، کام اور روزمرہ گفتگو کے لیے اعتماد پیدا کریں۔',
          'عزّز ثقتك للدراسة والعمل والمحادثات اليومية.'
        ),
        icon: 'A'
      },
      {
        name: t('Urdu', 'اردو', 'الأردية'),
        desc: t(
          'Explore a rich language through practical, guided learning.',
          'عملی اور رہنمائی پر مبنی اسباق سے خوبصورت زبان سیکھیں۔',
          'اكتشف لغة ثرية من خلال تعلّم عملي وموجّه.'
        ),
        icon: 'ا'
      },
      {
        name: t('Arabic', 'عربی', 'العربية'),
        desc: t(
          'Develop reading, writing and speaking step by step.',
          'مرحلہ وار پڑھنے، لکھنے اور بولنے کی مہارت بڑھائیں۔',
          'طوّر مهارات القراءة والكتابة والتحدث خطوة بخطوة.'
        ),
        icon: 'ع'
      }
    ],

    why: {
      title: t(
        'A better way to learn',
        'سیکھنے کا بہتر طریقہ',
        'طريقة أفضل للتعلّم'
      ),
      items: [
        t('Qualified, experienced teachers', 'قابل اور تجربہ کار اساتذہ', 'معلّمون مؤهلون وذوو خبرة'),
        t('100% live online classes', 'سو فیصد آن لائن کلاسز', 'دروس مباشرة عبر الإنترنت بالكامل'),
        t('Flexible class timings', 'لچکدار اوقات', 'مواعيد مرنة'),
        t('Personal attention and feedback', 'انفرادی توجہ اور رہنمائی', 'اهتمام فردي وملاحظات بنّاءة'),
        t('Structured learning pathways', 'منظم نصاب', 'مسارات تعليمية منظمة')
      ]
    },

    steps: {
      title: t(
        'Your learning journey',
        'آپ کا تعلیمی سفر',
        'رحلتك التعليمية'
      ),
      items: [
        t('Apply online', 'آن لائن درخواست دیں', 'قدّم عبر الإنترنت'),
        t('Receive your LMS ID and password', 'اپنی LMS شناخت اور پاس ورڈ حاصل کریں', 'استلم معرّف الدخول وكلمة المرور'),
        t('Sign in to the LMS', 'LMS میں داخل ہوں', 'سجّل الدخول إلى منصة التعلّم'),
        t('Start learning online', 'آن لائن سیکھنا شروع کریں', 'ابدأ التعلّم عبر الإنترنت')
      ]
    },

    stats: [
      { value: '1200+', label: t('Learners', 'طلبہ', 'متعلّم') },
      { value: '18', label: t('Expert teachers', 'ماہر اساتذہ', 'معلّماً خبيراً') },
      { value: '3', label: t('Language courses', 'زبانوں کے کورسز', 'دورات لغوية') },
      { value: '8+', label: t('Years of experience', 'سال کا تجربہ', 'سنوات من الخبرة') }
    ],

    teachers: [
      {
        name: t('Ayesha Rahman', 'عائشہ رحمان', 'عائشة رحمن'),
        qualification: t('MA English Language Teaching', 'ایم اے انگریزی تدریس', 'ماجستير في تعليم اللغة الإنجليزية'),
        experience: t('8 years of teaching experience', '۸ سالہ تدریسی تجربہ', '٨ سنوات من الخبرة في التدريس'),
        photo: ''
      },
      {
        name: t('Omar Siddiqui', 'عمر صدیقی', 'عمر صديقي'),
        qualification: t('Arabic Language Specialist', 'ماہرِ عربی زبان', 'متخصص في اللغة العربية'),
        experience: t('10 years of teaching experience', '۱۰ سالہ تدریسی تجربہ', '١٠ سنوات من الخبرة في التدريس'),
        photo: ''
      }
    ],

    testimonials: [
      {
        quote: t(
          'The lessons are clear, supportive and easy to fit around my schedule.',
          'اسباق واضح اور میری مصروفیات کے مطابق ہیں۔',
          'الدروس واضحة ومناسبة لجدولي اليومي.'
        ),
        name: t('Sara M.', 'سارہ م۔', 'سارة م.')
      },
      {
        quote: t(
          'I have become much more confident speaking English.',
          'اب مجھے انگریزی بولنے میں زیادہ اعتماد ہے۔',
          'أصبحت أكثر ثقة عند التحدث بالإنجليزية.'
        ),
        name: t('Bilal A.', 'بلال ا۔', 'بلال أ.')
      }
    ],

    faqs: [
      {
        q: t(
          'Are classes fully online?',
          'کیا تمام کلاسز آن لائن ہیں؟',
          'هل جميع الدروس عبر الإنترنت؟'
        ),
        a: t(
          'Yes. Learn live with your teacher from wherever you are.',
          'جی ہاں، آپ کہیں سے بھی استاد کے ساتھ براہِ راست سیکھ سکتے ہیں۔',
          'نعم، تعلّم مباشرة مع معلّمك من أي مكان.'
        )
      },
      {
        q: t(
          'How do I access the LMS?',
          'میں LMS تک کیسے پہنچوں؟',
          'كيف أصل إلى منصة التعلّم؟'
        ),
        a: t(
          'After registration, our team shares your unique LMS ID and password.',
          'رجسٹریشن کے بعد آپ کو منفرد LMS شناخت اور پاس ورڈ دیا جائے گا۔',
          'بعد التسجيل، نرسل إليك معرّف الدخول وكلمة المرور الخاصة بك.'
        )
      }
    ],

    // IMPORTANT: CTA belongs inside home
    cta: {
      title: t(
        'Ready to begin?',
        'کیا آپ آغاز کے لیے تیار ہیں؟',
        'هل أنت مستعد للبدء؟'
      ),
      text: t(
        'Take the first step towards a new language today.',
        'آج ہی نئی زبان سیکھنے کی جانب پہلا قدم اٹھائیں۔',
        'اتخذ اليوم خطوتك الأولى نحو لغة جديدة.'
      )
    }
  },

  about: {
    title: t('About ILMORA', 'لنگو کے بارے میں', 'عن لينجو'),

    story: t(
      'ILMORA is an online language institute built around meaningful communication, expert teaching and accessible learning.',
      'لنگو ایک آن لائن ادارہ ہے جہاں بامقصد گفتگو، معیاری تدریس اور آسان تعلیم کو اہمیت دی جاتی ہے۔',
      'لينجو معهد لغات عبر الإنترنت يركّز على التواصل الهادف والتعليم المتخصص والتعلّم الميسّر.'
    ),

    mission: t(
      'Our mission is to make high-quality language education welcoming and achievable for every learner.',
      'ہمارا مقصد ہر طالب علم کے لیے معیاری زبان کی تعلیم کو آسان بنانا ہے۔',
      'رسالتنا جعل تعليم اللغات عالي الجودة متاحاً وممكناً لكل متعلّم.'
    ),

    vision: t(
      'A world where language brings people, ideas and opportunities closer.',
      'ایسی دنیا جہاں زبان لوگوں اور مواقع کو قریب لائے۔',
      'عالم تقرّب فيه اللغة بين الناس والأفكار والفرص.'
    ),

    method: t(
      'Lessons combine guided practice, conversation, clear learning goals and regular feedback.',
      'اسباق میں رہنمائی کے ساتھ مشق، گفتگو، واضح اہداف اور باقاعدہ رائے شامل ہے۔',
      'تجمع الدروس بين التدريب الموجّه والمحادثة والأهداف الواضحة والتغذية الراجعة المنتظمة.'
    ),

    lms: t(
      'Once your application is reviewed, you receive a unique LMS login ID and password to access your online learning space.',
      'درخواست منظور ہونے کے بعد آپ کو آن لائن تعلیمی پلیٹ فارم کے لیے منفرد LMS شناخت اور پاس ورڈ ملے گا۔',
      'بعد مراجعة طلبك، تحصل على معرّف دخول وكلمة مرور خاصة للوصول إلى بيئة التعلّم الإلكترونية.'
    )
  },

  contact: {
    title: t(
      'Start your learning journey',
      'اپنا تعلیمی سفر شروع کریں',
      'ابدأ رحلتك التعليمية'
    ),

    subtitle: t(
      'Tell us a little about your goals. Our team will be in touch.',
      'اپنے تعلیمی مقاصد بتائیں، ہماری ٹیم آپ سے رابطہ کرے گی۔',
      'أخبرنا قليلاً عن أهدافك وسيتواصل معك فريقنا.'
    ),

    note: t(
      'After registration you will receive your LMS ID and password.',
      'رجسٹریشن کے بعد آپ کو LMS شناخت اور پاس ورڈ موصول ہوگا۔',
      'بعد التسجيل ستتلقى معرّف الدخول وكلمة المرور الخاصة بك.'
    ),

    success: t(
      'Thank you! Your application has been received.',
      'شکریہ! آپ کی درخواست موصول ہو گئی ہے۔',
      'شكراً لك! تم استلام طلبك.'
    ),

    error: t(
      'We could not submit your application. Please try again.',
      'درخواست جمع نہیں ہو سکی۔ دوبارہ کوشش کریں۔',
      'تعذّر إرسال طلبك. يُرجى المحاولة مجدداً.'
    )
  },

  seo: {
    home: {
      en: {
        title: 'ILMORA | Online English, Urdu & Arabic Classes',
        description: 'Learn English, Urdu and Arabic online with experienced teachers.'
      },
      ur: {
        title: 'لنگو | آن لائن انگریزی، اردو اور عربی',
        description: 'تجربہ کار اساتذہ کے ساتھ آن لائن زبانیں سیکھیں۔'
      },
      ar: {
        title: 'لينجو | دروس الإنجليزية والأردية والعربية عبر الإنترنت',
        description: 'تعلّم اللغات عبر الإنترنت مع معلّمين ذوي خبرة.'
      }
    },
    about: {},
    contact: {}
  }
};
