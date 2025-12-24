import { Stream, Subject } from './types';

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

    ]


  },
  {
    id: 'svt',
    name: 'علوم الحياة والأرض (SVT)',
    subjects: [
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 7 },
      { id: 'math', name: 'الرياضيات', coefficient: 7 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 5 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'arabic', name: 'اللغة العربية', coefficient: 2 },
      { id: 'french', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
      { id: 'islamic', name: 'التربية الإسلامية', coefficient: 2 },
      { id: 'behavior', name: 'المواظبة والسلوك', coefficient: 1 },
    ]
  },
  {
    id: 'sm_a',
    name: 'العلوم الرياضية (أ)',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 9 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 7 },
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 3 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 },
    ]
  },
  {
    id: 'eco',
    name: 'العلوم الاقتصادية',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 4 },
      { id: 'compta', name: 'المحاسبة والرياضيات المالية', coefficient: 4 },
      { id: 'eco_gen', name: 'الاقتصاد العام والإحصاء', coefficient: 6 },
      { id: 'orga', name: 'التنظيم الإداري', coefficient: 3 },
      { id: 'philo', name: 'الفلسفة', coefficient: 2 },
      { id: 'eng', name: 'اللغة الإنجليزية', coefficient: 2 }, // Usually higher in Eco but simplified
    ]
  }
];

export const STREAMS_1BAC: Stream[] = [
  {
    id: 'sci_ex',
    name: 'العلوم التجريبية',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 5 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 5 },
      { id: 'svt', name: 'علوم الحياة والأرض', coefficient: 3 },
      { id: 'fr', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'hg', name: 'التاريخ والجغرافيا', coefficient: 2 },
      { id: 'ar', name: 'اللغة العربية', coefficient: 2 },
      { id: 'ei', name: 'التربية الإسلامية', coefficient: 2 },
    ]
  },
  {
    id: 'sci_math',
    name: 'العلوم الرياضية',
    subjects: [
      { id: 'math', name: 'الرياضيات', coefficient: 7 },
      { id: 'pc', name: 'الفيزياء والكيمياء', coefficient: 5 },
      { id: 'fr', name: 'اللغة الفرنسية', coefficient: 4 },
      { id: 'ar', name: 'اللغة العربية', coefficient: 2 },
      { id: 'hg', name: 'التاريخ والجغرافيا', coefficient: 2 },
      { id: 'ei', name: 'التربية الإسلامية', coefficient: 2 },
    ]
  }
];