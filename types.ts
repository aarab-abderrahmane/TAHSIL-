

export type Level = '1ere_bac' | '2eme_bac' | 'custom';

export interface Subject {
  id: string;
  name: string;
  coefficient: number;
  hasActivities?: boolean; // New: Toggle activities per subject
  isCustom?: boolean;      // New: Identify custom subjects
}

export interface Stream {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Assessment {
  id: string;
  label: string;
  value: string;
}

export interface SubjectData {
  assessments: Assessment[];
  activitiesMark?: string;
  isPending?: boolean;
}

export type GradeMap = Record<string, SubjectData>;

export interface AnalysisResult {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  plan: string[];
  prediction: string;
  suggestedSchools?: {
    name: string;
    description: string;
    chance: 'High' | 'Medium' | 'Low';
  }[];
}

export enum AppStep {
  LANDING = -1, // New Step
  LEVEL_SELECT = 0,
  MODE_SELECT = 1,
  STREAM_SELECT = 2,
  GRADE_INPUT = 3,
  GENERAL_CALC = 4, 
  RESULTS = 5,
  SIMULATOR = 6,
  CUSTOM_MODE = 7,
  NATIONAL_EXAM = 8, // New Step for National Exam Calculation
  REGIONAL_EXAM = 9, // New Step for Regional Exam Calculation
  CUSTOM_CHOICE = 10, // New Step for choosing custom type
  CUSTOM_EXAM_MODE = 11, // New Step for Custom Exam Template
  COUNTDOWN = 12 // New Step for Exam Timer
}