import { Stream, Subject ,national_exam_subjects ,regional_exam_subjects} from './types';

export const EXTRA_SUBJECTS: Subject[] = [
  { id: 'info', name: 'المعلوميات (Informatique)', coefficient: 2 },
  { id: 'trans', name: 'الترجمة (Traduction)', coefficient: 2 },
  { id: 'sport_supp', name: 'التربية البدنية (تكميلي)', coefficient: 4 },
  { id: 'lang_3', name: 'لغة أجنبية ثالثة', coefficient: 2 },
  { id: 'arts', name: 'الفنون التشكيلية', coefficient: 1 },
  { id: 'music', name: 'التربية الموسيقية', coefficient: 1 },
  { id: 'assiduite', name: 'المواظبة والسلوك', coefficient: 1 },
];

export const STREAMS_2BAC: Stream[] = [
  {
    id: 'pc',
    name: 'العلوم الفيزيائية (PC)',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 7 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 7 },
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 5 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
      { id: 'arabic', name: 'اللغة العربية', coefficient: 2 },
      { id: 'french', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2 },
      { id: 'history', name: 'التاريخ والجغرافيا', coefficient: 2 },

    ],
    national_exam_subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 7 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 7 },
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 5 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
    ]

  },
  {
    id: 'svt',
    name: 'علوم الحياة والأرض (SVT)',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 7 },
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 7 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 5 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
      { id: 'arabic', name: 'اللغة العربية', coefficient: 2 },
      { id: 'french', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2 },
      { id: 'history', name: 'التاريخ والجغرافيا', coefficient: 2 },
    ],
    national_exam_subjects: [
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 7 },
      { id: 'math', name: 'الرياضيات', coefficient: 7 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 5 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
    ]
  },
  {
    id: 'sci_math',
    name: 'العلوم الرياضية',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 9 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 7 },
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 3 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
      { id: 'arabic', name: 'اللغة العربية', coefficient: 2 },
      { id: 'french', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2 },
      { id: 'history', name: 'التاريخ والجغرافيا', coefficient: 2 },
    ],
    national_exam_subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 9 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 7 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
    ]
  },

  {
    id: 'eco',
    name: 'العلوم الاقتصادية',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 4 },
      { id: 'eco', name: 'الاقتصاد العام والإحصاء', coefficient: 6 },
      { id: 'management', name: 'التنظيم والمحاسبة', coefficient: 6 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
      { id: 'arabic', name: 'اللغة العربية', coefficient: 2 },
      { id: 'french', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2 },
      { id: 'history', name: 'التاريخ والجغرافيا', coefficient: 2 },
    ],
    national_exam_subjects: [
      { id: 'eco', name: 'الاقتصاد العام والإحصاء', coefficient: 6 },
      { id: 'management', name: 'التنظيم والمحاسبة', coefficient: 6 },
      { id: 'math', name: 'الرياضيات', coefficient: 4 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
    ]
  }

];

export const STREAMS_1BAC: Stream[] = [
  {
    id: 'sci_ex',
    name: 'العلوم التجريبية (الأولى باكالوريا)',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 7 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 7 },
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 7 },
      { id: 'arabic', name: 'اللغة العربية', coefficient: 2 },
      { id: 'french', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2 },
      { id: 'history', name: 'التاريخ والجغرافيا', coefficient: 2 }
    ],
    regional_exam_subjects: [
      { id: 'arabic', name: 'اللغة العربية', coefficient: 2 },
      { id: 'french', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'history', name: 'التاريخ والجغرافيا', coefficient: 2 },
      { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2 }
    ]
  },

  {
    id: 'sci_math_1bac',
    name: 'العلوم الرياضية (الأولى باكالوريا)',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 9 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 7 },
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 3 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'arabic', name: 'اللغة العربية', coefficient: 2 },
      { id: 'french', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
      { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2 },
      { id: 'history', name: 'التاريخ والجغرافيا', coefficient: 2 },
      { id: 'pe', name: 'التربية البدنية', coefficient: 1 },
      { id: 'attendance', name: 'المواظبة والسلوك', coefficient: 1 }
    ],
    regional_exam_subjects: [
      { id: 'arabic', name: 'اللغة العربية', coefficient: 2 },
      { id: 'french', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2 },
      { id: 'history', name: 'التاريخ والجغرافيا', coefficient: 2 }
    ]
  }

];