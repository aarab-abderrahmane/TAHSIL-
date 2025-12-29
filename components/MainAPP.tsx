import React, { useState } from 'react';
import { translations, Language } from '../translations';
import { Stepper } from './Stepper';
import { CountdownPage } from './CountdownPage';
import { GradeInputRow } from './GradeInputRow';
import { CoachTips } from './CoachTips';
import { AIAnalysis } from './AIAnalysis';
import { AppStep, Level, Stream, Subject, GradeMap } from '../types';
import { STREAMS_1BAC, STREAMS_2BAC, EXTRA_SUBJECTS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface MainAppProps {
    showCustomIntro: boolean;
    setShowCustomIntro: (value: boolean) => void;
    lang: Language;
    // Main Navigation States
    currentStep: AppStep;
    setCurrentStep: (step: AppStep) => void;
    selectedLevel: Level | null;
    setSelectedLevel: (level: Level | null) => void;
    selectedStream: Stream | null;
    setSelectedStream: (stream: Stream | null) => void;
    calcMode: 'continuous' | 'general' | 'simulator' | 'national_exam' | 'regional_exam' | 'custom_exam' | null;
    setCalcMode: (mode: 'continuous' | 'general' | 'simulator' | 'national_exam' | 'regional_exam' | 'custom_exam' | null) => void;
    examYear: string;
    setExamYear: (year: string) => void;
    
    // Subject & Grades States
    activeSubjects: Subject[];
    setActiveSubjects: (subjects: Subject[]) => void;
    grades: GradeMap;
    setGrades: (grades: GradeMap) => void;
    
    // General Bac Grades
    nationalGrade: string;
    setNationalGrade: (grade: string) => void;
    regionalGrade: string;
    setRegionalGrade: (grade: string) => void;
    continuousGrade: string;
    setContinuousGrade: (grade: string) => void;
    
    // Exam Grades
    nationalExamGrades: Record<string, string>;
    setNationalExamGrades: (grades: Record<string, string>) => void;
    regionalExamGrades: Record<string, string>;
    setRegionalExamGrades: (grades: Record<string, string>) => void;
    
    // Simulator State
    simConfig: { national: boolean; regional: boolean; continuous: boolean };
    setSimConfig: (config: { national: boolean; regional: boolean; continuous: boolean }) => void;
    simTarget: number;
    setSimTarget: (target: number) => void;
    
    // Custom Mode State
    activitiesWeight: number;
    setActivitiesWeight: (weight: number) => void;
    customType: 'continuous' | 'exam';
    setCustomType: (type: 'continuous' | 'exam') => void;
    isTemplateSaved: boolean;
    setIsTemplateSaved: (saved: boolean) => void;
    
    // Semester States
    s1Continuous: string;
    setS1Continuous: (grade: string) => void;
    s2Continuous: string;
    setS2Continuous: (grade: string) => void;
    continuousInputMode: 'annual' | 'semesters';
    setContinuousInputMode: (mode: 'annual' | 'semesters') => void;
    
    // UI States
    isStreamDropdownOpen: boolean;
    setIsStreamDropdownOpen: (open: boolean) => void;
    isYearDropdownOpen: boolean;
    setIsYearDropdownOpen: (open: boolean) => void;
    isMainStreamDropdownOpen: boolean;
    setIsMainStreamDropdownOpen: (open: boolean) => void;
    subjectToAdd: string;
    setSubjectToAdd: (id: string) => void;
    customCoefficient: string;
    setCustomCoefficient: (coeff: string) => void;
    isExtraDropdownOpen: boolean;
    setIsExtraDropdownOpen: (open: boolean) => void;
    
    // Refs
    dropdownRef?: React.RefObject<HTMLDivElement>;
    streamRef?: React.RefObject<HTMLDivElement>;
    yearRef?: React.RefObject<HTMLDivElement>;
    mainStreamRef?: React.RefObject<HTMLDivElement>;
    
    // Helper Functions
    getStreamVisuals: (id: string, name: string) => any;
    currentLiveGeneralAvg?: number;
    getSelectedSubjectName?: () => string;
    toggleSimCard?: (key: 'national' | 'regional' | 'continuous') => void;
    
    // Results & Analysis
    finalAverage: number;
    setFinalAverage: (avg: number) => void;
    coachData: {
        pendingSubjects: Subject[];
        currentTotalScore: number;
        completedCoeffs: number;
        totalCoeffs: number;
    };
    setCoachData: (data: any) => void;
    schoolAnalysis: any;
    isAnalyzingSchools: boolean;
    isDownloadingSchools: boolean;
    
    // Handlers
    handleSelectLevel: (level: Level) => void;
    handleSelectMode: (mode: 'continuous' | 'general' | 'simulator' | 'national_exam' | 'regional_exam') => void;
    handleSelectStream: (stream: Stream) => void;
    handleAddCustomSubject: () => void;
    handleDeleteSubject: (id: string) => void;
    handleUpdateGrades: (subjectId: string, assessments: any[], activitiesMark?: string, isPending?: boolean) => void;
    handleUpdateSubjectDetails: (id: string, name: string, coeff: number, hasActivities: boolean) => void;
    handleNationalExamInput: (subjectId: string, value: string) => void;
    handleRegionalExamInput: (subjectId: string, value: string) => void;
    handleSelectExtraSubject: (id: string) => void;
    handleAddExtraSubject: () => void;
    handleSaveTemplate: () => void;
    handleSaveTemplateWithGrades: () => void;
    handleDeleteAllSubjects: () => void;
    handleClearAllGrades: () => void;
    calculateResults: () => void;
    calculateGeneralBacResult: () => void;
    calculateNationalExamResult: () => void;
    calculateRegionalExamResult: () => void;
    handleDownloadSchoolsImage: () => void;
    enterCustomMode: (type: 'continuous' | 'exam') => void;
    
    // Other
    darkMode: boolean;
    chartData: any[];
    simResult: { type: 'done' | 'needed'; val: number };
    isSimImpossible: boolean;
}

export const MainApp : React.FC<MainAppProps> = ({
    showCustomIntro,
    setShowCustomIntro,
    lang,
    currentStep,
    setCurrentStep,
    selectedLevel,
    selectedStream,
    calcMode,
    setCalcMode,
    examYear,
    setExamYear,
    activeSubjects,
    setActiveSubjects,
    grades,
    setGrades,
    nationalGrade,
    setNationalGrade,
    regionalGrade,
    setRegionalGrade,
    continuousGrade,
    setContinuousGrade,
    nationalExamGrades,
    setNationalExamGrades,
    regionalExamGrades,
    setRegionalExamGrades,
    simConfig,
    setSimConfig,
    simTarget,
    setSimTarget,
    activitiesWeight,
    setActivitiesWeight,
    customType,
    setCustomType,
    isTemplateSaved,
    setIsTemplateSaved,
    s1Continuous,
    setS1Continuous,
    s2Continuous,
    setS2Continuous,
    continuousInputMode,
    setContinuousInputMode,
    isStreamDropdownOpen,
    setIsStreamDropdownOpen,
    isYearDropdownOpen,
    setIsYearDropdownOpen,
    isMainStreamDropdownOpen,
    setIsMainStreamDropdownOpen,
    subjectToAdd,
    setSubjectToAdd,
    customCoefficient,
    setCustomCoefficient,
    isExtraDropdownOpen,
    setIsExtraDropdownOpen,
    finalAverage,
    setFinalAverage,
    coachData,
    setCoachData,
    schoolAnalysis,
    isAnalyzingSchools,
    isDownloadingSchools,
    handleSelectLevel,
    handleSelectMode,
    handleSelectStream,
    handleAddCustomSubject,
    handleDeleteSubject,
    handleUpdateGrades,
    handleUpdateSubjectDetails,
    handleNationalExamInput,
    handleRegionalExamInput,
    handleSelectExtraSubject,
    handleAddExtraSubject,
    handleSaveTemplate,
    handleSaveTemplateWithGrades,
    handleDeleteAllSubjects,
    handleClearAllGrades,
    calculateResults,
    calculateGeneralBacResult,
    calculateNationalExamResult,
    calculateRegionalExamResult,
    handleDownloadSchoolsImage,
    enterCustomMode,
    darkMode,
    chartData,
    simResult,
    isSimImpossible,
    dropdownRef,
    streamRef,
    yearRef,
    mainStreamRef,
    getStreamVisuals,
    currentLiveGeneralAvg = 0,
    getSelectedSubjectName = () => '',
    toggleSimCard = (key?: string) => {},
    setSelectedLevel = () => {},
    setSelectedStream = () => {},
})=>{

    const t = translations[lang];

    return (
        <>
        {/* Custom Mode Intro Modal */}
         {showCustomIntro && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
              <div className="bg-white dark:bg-[#292524] rounded-[2.5rem] max-w-2xl w-full p-8 md:p-10 shadow-2xl border border-white/20 relative overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-ai/10 rounded-full blur-3xl -z-10"></div>
                  
                  <div className="text-center mb-8 shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-ai to-ai-purple rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-ai/30 text-white">
                          🛠️
                      </div>
                      <h3 className="text-3xl font-heading font-bold text-ink dark:text-white mb-2">{t.customIntroTitle}</h3>
                      <p className="text-inkLight dark:text-gray-400 font-serif text-lg">
                          {t.customIntroDesc}
                      </p>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 no-scrollbar space-y-8 pb-4">
                      {/* Step by Step Guide */}
                      <div className="space-y-4">
                          <div className="flex gap-4 items-start bg-gray-50 dark:bg-white/5 p-4 rounded-3xl border border-gray-100 dark:border-white/5">
                              <span className="w-10 h-10 rounded-full bg-olive/10 text-olive flex items-center justify-center font-bold font-heading shrink-0">1</span>
                              <p className="text-sm md:text-base font-serif text-ink dark:text-gray-300 leading-relaxed">{t.customStep1}</p>
                          </div>
                          <div className="flex gap-4 items-start bg-gray-50 dark:bg-white/5 p-4 rounded-3xl border border-gray-100 dark:border-white/5">
                              <span className="w-10 h-10 rounded-full bg-amber/10 text-amber flex items-center justify-center font-bold font-heading shrink-0">2</span>
                              <p className="text-sm md:text-base font-serif text-ink dark:text-gray-300 leading-relaxed">{t.customStep2}</p>
                          </div>
                          <div className="flex gap-4 items-start bg-gray-50 dark:bg-white/5 p-4 rounded-3xl border border-gray-100 dark:border-white/5">
                              <span className="w-10 h-10 rounded-full bg-ai/10 text-ai flex items-center justify-center font-bold font-heading shrink-0">3</span>
                              <p className="text-sm md:text-base font-serif text-ink dark:text-gray-300 leading-relaxed">{t.customStep3}</p>
                          </div>
                      </div>

                      {/* Buttons Explanation */}
                      <div className="space-y-4">
                         <h4 className="font-heading font-bold text-lg text-ink dark:text-white mb-4 px-2">{lang === 'ar' ? 'شرح الأزرار الإضافية:' : 'Guide des boutons :'}</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                                 <div className="text-ai font-bold text-xs uppercase mb-1">{t.saveTemplate}</div>
                                 <p className="text-xs text-inkLight dark:text-gray-500 font-serif leading-relaxed">{t.btnDescSave}</p>
                             </div>
                             <div className="p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                                 <div className="text-success font-bold text-xs uppercase mb-1">{t.saveWithGrades}</div>
                                 <p className="text-xs text-inkLight dark:text-gray-500 font-serif leading-relaxed">{t.btnDescSaveGrades}</p>
                             </div>
                             <div className="p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                                 <div className="text-amber font-bold text-xs uppercase mb-1">{t.clearGrades}</div>
                                 <p className="text-xs text-inkLight dark:text-gray-500 font-serif leading-relaxed">{t.btnDescClear}</p>
                             </div>
                             <div className="p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                                 <div className="text-danger font-bold text-xs uppercase mb-1">{t.deleteAll}</div>
                                 <p className="text-xs text-inkLight dark:text-gray-500 font-serif leading-relaxed">{t.btnDescDelete}</p>
                             </div>
                         </div>
                      </div>
                  </div>

                  <button 
                    onClick={() => setShowCustomIntro(false)}
                    className="w-full py-5 bg-deep dark:bg-white text-white dark:text-deep rounded-2xl font-bold text-xl shadow-2xl hover:bg-olive transition-all shrink-0 mt-6"
                  >
                      {t.understand}
                  </button>
              </div>
          </div>
      )}


           
      <main className="container mx-auto px-4 py-8 mt-20 md:mt-0 max-w-5xl relative z-10">
        <div className="print:hidden">
            {currentStep !== AppStep.CUSTOM_MODE && currentStep !== AppStep.CUSTOM_EXAM_MODE && currentStep !== AppStep.CUSTOM_CHOICE && currentStep !== AppStep.COUNTDOWN && <Stepper currentStep={currentStep} isGeneralMode={calcMode === 'general'} lang={lang} />}
        </div>

        {currentStep === AppStep.COUNTDOWN && (
            <CountdownPage onBack={() => setCurrentStep(AppStep.LEVEL_SELECT)} lang={lang} />
        )}

        {currentStep === AppStep.LEVEL_SELECT && (
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-center mb-4 text-ink dark:text-white tracking-tight">{t.levelSelectTitle}</h2>
            <p className="text-center text-inkLight dark:text-gray-400 mb-12 font-serif text-xl">{t.levelSelectDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              {/* Card 1: 1ere Bac */}
              <button
                onClick={() => handleSelectLevel('1ere_bac')}
                className="group relative overflow-hidden rounded-[2.5rem] text-start transition-all duration-700  hover:-translate-y-2 border border-white/40 dark:border-white/10 h-[380px] flex flex-col justify-end p-8"
              >
                {/* Background Image with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                  <img 
                  src='/assets/988e6ecabc6330f9c95a0ba9807422f5.jpg'
                    alt="Education" 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-olive/10 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10">
                  <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} -translate-y-[240px]`}>
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl group-hover:bg-olive transition-colors duration-500">
                      <span className="font-heading font-black text-white text-3xl">1</span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-3 group-hover:text-olive-light transition-colors">{t.firstBac}</h3>
                  <p className="text-base text-gray-300 font-serif leading-relaxed opacity-90">{t.firstBacDesc}</p>
                </div>
              </button>

              {/* Card 2: 2eme Bac */}
              <div
                className="group relative overflow-hidden rounded-[2.5rem] text-start transition-all duration-700 border border-white/40 dark:border-white/10 h-[380px] flex flex-col justify-end p-8 cursor-pointer  hover:-translate-y-2"
                onClick={() => handleSelectLevel('2eme_bac')}
              >
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img 
                    src='/assets/Two Photos .jpeg'
                    alt="Study Focus" 
                    className="w-full h-full  object-cover grayscale-[20%] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-amber/10 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>

                <div className="relative z-10 pointer-events-none">
                  <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} -translate-y-[240px] pointer-events-auto`}>
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl group-hover:bg-amber transition-colors duration-500">
                      <span className="font-heading font-black text-white text-3xl">2</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-3 group-hover:text-amber-glow transition-colors">{t.secondBac}</h3>
                  <p className="text-base text-gray-300 font-serif leading-relaxed opacity-90">{t.secondBacDesc}</p>
                </div>

                {/* Countdown Entry Button - Independent */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentStep(AppStep.COUNTDOWN);
                    }}
                    className={`absolute top-6 ${lang === 'ar' ? 'right-6' : 'left-6'} z-50 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-3 py-2 rounded-xl flex items-center gap-2 transition-all border border-white/30 shadow-lg group/btn`}
                    title={t.openCountdown}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover/btn:scale-110 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">{t.openCountdown}</span>
                </button>
              </div>

              {/* Card 3: Custom */}
              <button
                onClick={() => handleSelectLevel('custom')}
                className="group relative overflow-hidden rounded-[2.5rem] text-start transition-all duration-700 hover:-translate-y-2 border border-white/40 dark:border-white/10 h-[380px] flex flex-col justify-end p-8"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                  src='/assets/2e5fb94fca0c970f0dccdda6d1a324b0.jpg'
                    alt="Custom Path" 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-ai/10 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>

                <div className="relative z-10">
                  <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} -translate-y-[210px]`}>
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl group-hover:bg-ai transition-colors duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-3 group-hover:text-ai-purple transition-colors">{t.customStream}</h3>
                  <p className="text-base text-gray-300 font-serif leading-relaxed opacity-90">{t.customStreamDesc}</p>
                </div>
              </button>
            </div>
          </div>
        )}
        
        {currentStep === AppStep.CUSTOM_CHOICE && (
            <div className="animate-fade-in-up max-w-5xl mx-auto">
                 <button onClick={() => setCurrentStep(AppStep.LEVEL_SELECT)} className="mb-8 flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                     {t.back}
                 </button>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-center mb-16 text-ink dark:text-white tracking-tight">{t.customChoiceTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
                     <button onClick={() => enterCustomMode('continuous')} className="group relative overflow-hidden rounded-[3rem] p-12 text-center transition-all duration-700 border border-white/40 dark:border-white/10 shadow-xl hover:shadow-ai/20 hover:-translate-y-3 glass-card">
                        <div className="absolute inset-0 bg-gradient-to-br from-ai/5 to-ai-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-ai to-ai-purple flex items-center justify-center mb-8 shadow-2xl shadow-ai/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 relative z-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-heading font-black text-ink dark:text-white mb-4 group-hover:text-ai transition-colors">{t.customContinuous}</h3>
                            <p className="text-base text-gray-500 dark:text-gray-400 font-serif leading-relaxed max-w-[250px] mx-auto opacity-80">{t.customContinuousDesc}</p>
                            <div className="mt-8 px-6 py-2 rounded-full border border-ai/20 text-ai text-xs font-black uppercase tracking-widest group-hover:bg-ai group-hover:text-white transition-all">
                                {lang === 'ar' ? 'اختيار المسار' : 'Sélectionner'}
                            </div>
                        </div>
                    </button>

                     <button onClick={() => enterCustomMode('exam')} className="group relative overflow-hidden rounded-[3rem] p-12 text-center transition-all duration-700 border border-white/40 dark:border-white/10 shadow-xl hover:shadow-amber/20 hover:-translate-y-3 glass-card">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber/5 to-amber-glow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-amber to-amber-glow flex items-center justify-center mb-8 shadow-2xl shadow-amber/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 text-white relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 relative z-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-heading font-black text-ink dark:text-white mb-4 group-hover:text-amber transition-colors">{t.customExamTemplate}</h3>
                            <p className="text-base text-gray-500 dark:text-gray-400 font-serif leading-relaxed max-w-[250px] mx-auto opacity-80">{t.customExamTemplateDesc}</p>
                            <div className="mt-8 px-6 py-2 rounded-full border border-amber/20 text-amber text-xs font-black uppercase tracking-widest group-hover:bg-amber group-hover:text-white transition-all">
                                {lang === 'ar' ? 'اختيار المسار' : 'Sélectionner'}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        )}

        {currentStep === AppStep.MODE_SELECT && (
          <div className="animate-fade-in-up max-w-6xl mx-auto">
             <button onClick={() => setCurrentStep(AppStep.LEVEL_SELECT)} className="mb-8 flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                 {t.backToLevel}
             </button>
             <h2 className="text-3xl font-heading font-bold text-center mb-10 text-ink dark:text-white">{t.selectModeTitle}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button onClick={() => handleSelectMode('continuous')} className="group relative glass-card p-8 rounded-[2.5rem] text-start border-2 border-transparent hover:border-olive/50 transition-all duration-500">
                    <div className="w-14 h-14 bg-olive/10 text-olive rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-olive group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" /></svg>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-ink dark:text-white mb-2">{t.continuousMode}</h3>
                    <p className="text-sm text-inkLight dark:text-gray-400 font-serif leading-relaxed">{t.continuousModeDesc}</p>
                </button>
                {selectedLevel === '2eme_bac' && (
                <button onClick={() => handleSelectMode('general')} className="group relative glass-card p-8 rounded-[2.5rem] text-start border-2 border-transparent hover:border-amber/50 transition-all duration-500">
                    <div className="w-14 h-14 bg-amber/10 text-amber rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-amber group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75" /></svg>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-ink dark:text-white mb-2">{t.generalMode}</h3>
                    <p className="text-sm text-inkLight dark:text-gray-400 font-serif leading-relaxed">{t.generalModeDesc}</p>
                </button>
                )}
                {selectedLevel === '2eme_bac' && (
                    <button onClick={() => handleSelectMode('national_exam')} className="group relative glass-card p-8 rounded-[2.5rem] text-start border-2 border-transparent hover:border-deep/50 transition-all duration-500">
                        <div className="w-14 h-14 bg-deep/10 dark:bg-white/10 text-deep dark:text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-deep group-hover:text-white group-hover:dark:bg-white group-hover:dark:text-deep transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </div>
                        <div className="absolute top-4 left-4">
                            <span className="bg-amber text-white text-[10px] font-bold px-2 py-1 rounded-md">{t.new}</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-ink dark:text-white mb-2">{t.nationalExam}</h3>
                        <p className="text-sm text-inkLight dark:text-gray-400 font-serif leading-relaxed">{t.nationalExamDesc}</p>
                    </button>
                )}
                {selectedLevel === '1ere_bac' && (
                    <button onClick={() => handleSelectMode('regional_exam')} className="group relative glass-card p-8 rounded-[2.5rem] text-start border-2 border-transparent hover:border-deep/50 transition-all duration-500">
                        <div className="w-14 h-14 bg-olive/10 text-olive rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-olive group-hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        <div className="absolute top-4 left-4">
                            <span className="bg-olive text-white text-[10px] font-bold px-2 py-1 rounded-md">{t.new}</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-ink dark:text-white mb-2">{t.regionalExam}</h3>
                        <p className="text-sm text-inkLight dark:text-gray-400 font-serif leading-relaxed">{t.regionalExamDesc}</p>
                    </button>
                )}
                {selectedLevel === '2eme_bac' && (
                <button onClick={() => handleSelectMode('simulator')} className="group relative glass-card p-8 rounded-[2.5rem] text-start border-2 border-transparent hover:border-ai-purple/50 transition-all duration-500">
                    <div className="w-14 h-14 bg-ai/10 text-ai-purple rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-ai-purple group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-ink dark:text-white mb-2">{t.simulator}</h3>
                    <p className="text-sm text-inkLight dark:text-gray-400 font-serif leading-relaxed">{t.simulatorDesc}</p>
                </button>
                )}
             </div>
          </div>
        )}

        {currentStep === AppStep.SIMULATOR && (
            <div className="animate-fade-in-up max-w-4xl mx-auto">
                <button onClick={() => setCurrentStep(AppStep.MODE_SELECT)} className="mb-8 flex items-center gap-2 text-ai-purple dark:text-ai font-medium hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    {t.back}
                </button>
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-heading font-black text-ink dark:text-white mb-4">{t.simulator}</h2>
                    <p className="text-inkLight dark:text-gray-400 text-lg font-serif max-w-2xl mx-auto leading-relaxed">
                        {lang === 'ar' ? `قم بتعطيل البطاقات التي لم تجتزها بعد (بحد أقصى بطاقتين)، وسنقوم بحساب المعدل الأدنى الذي يجب أن تحصل عليه فيها لتضمن النجاح بمعدل ${simTarget}/20.` : `Désactivez les cartes que vous n'avez pas encore passées, nous calculerons la moyenne minimale requise pour atteindre ${simTarget}/20.`}
                    </p>
                </div>
                <div className="mb-10 mx-auto max-w-2xl relative group">
                    <div className="relative glass-card rounded-[2.5rem] p-8 border border-white/40 dark:border-white/10 shadow-2xl flex flex-col items-center gap-6 overflow-hidden">
                         <label className="text-lg font-heading font-bold text-ink/80 dark:text-white/90 flex items-center gap-2 z-10">
                            {t.simTarget}
                         </label>
                         <div className="flex items-center gap-6 w-full px-2 z-10">
                             <div className="flex-1 relative h-10 flex items-center">
                                <input type="range" min="10" max="20" step="0.25" value={simTarget} onChange={(e) => setSimTarget(parseFloat(e.target.value))} className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-ai hover:accent-ai-purple transition-all shadow-inner" />
                             </div>
                         </div>
                         <div className="relative z-10">
                             <div className="text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-ai to-ai-purple drop-shadow-sm">
                                 {simTarget.toFixed(2)}
                             </div>
                         </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                     <div className={`glass-card p-8 rounded-[2.5rem] relative transition-all duration-500 border-2 ${simConfig.national ? 'border-amber shadow-xl shadow-amber/10 opacity-100' : 'border-gray-200 dark:border-white/5 opacity-60 grayscale'}`}>
                        <div className="flex justify-between items-start mb-6">
                            <div><h3 className="text-xl font-heading font-bold text-ink dark:text-gray-100">{t.nationalExam}</h3><p className={`text-sm font-bold ${simConfig.national ? 'text-amber' : 'text-gray-400'}`}>{lang === 'ar' ? 'الوزن: 50%' : 'Poids: 50%'}</p></div>
                            <button onClick={() => toggleSimCard('national')} className={`w-12 h-8 rounded-full p-1 transition-colors flex items-center ${simConfig.national ? 'bg-amber justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}><div className="w-6 h-6 rounded-full bg-white shadow-sm"></div></button>
                        </div>
                        {simConfig.national ? (<><input type="text" inputMode="decimal" value={nationalGrade} onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && (parseFloat(e.target.value) <= 20 || e.target.value === '')) setNationalGrade(e.target.value)}} placeholder="00.00" className="w-full h-16 rounded-2xl bg-white/50 dark:bg-black/20 border border-transparent focus:bg-white dark:focus:bg-black/40 focus:border-amber focus:shadow-lg focus:shadow-amber/10 transition-all font-sans font-black text-2xl text-center text-ink dark:text-white outline-none" /><input type="range" min="0" max="20" step="0.01" value={nationalGrade || 0} onChange={(e) => setNationalGrade(e.target.value)} className="w-full mt-6 accent-amber cursor-pointer" /></>) : (<div className="h-24 flex items-center justify-center bg-gray-100/50 dark:bg-black/10 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700"><span className="text-gray-400 font-bold text-lg">؟</span></div>)}
                    </div>
                    <div className={`glass-card p-8 rounded-[2.5rem] relative transition-all duration-500 border-2 ${simConfig.regional ? 'border-olive shadow-xl shadow-olive/10 opacity-100' : 'border-gray-200 dark:border-white/5 opacity-60 grayscale'}`}>
                        <div className="flex justify-between items-start mb-6">
                            <div><h3 className="text-xl font-heading font-bold text-ink dark:text-gray-100">{t.regionalExam}</h3><p className={`text-sm font-bold ${simConfig.regional ? 'text-olive' : 'text-gray-400'}`}>{lang === 'ar' ? 'الوزن: 25%' : 'Poids: 25%'}</p></div>
                            <button onClick={() => toggleSimCard('regional')} className={`w-12 h-8 rounded-full p-1 transition-colors flex items-center ${simConfig.regional ? 'bg-olive justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}><div className="w-6 h-6 rounded-full bg-white shadow-sm"></div></button>
                        </div>
                        {simConfig.regional ? (<><input type="text" inputMode="decimal" value={regionalGrade} onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && (parseFloat(e.target.value) <= 20 || e.target.value === '')) setRegionalGrade(e.target.value)}} placeholder="00.00" className="w-full h-16 rounded-2xl bg-white/50 dark:bg-black/20 border border-transparent focus:bg-white dark:focus:bg-black/40 focus:border-olive focus:shadow-lg focus:shadow-olive/10 transition-all font-sans font-black text-2xl text-center text-ink dark:text-white outline-none" /><input type="range" min="0" max="20" step="0.01" value={regionalGrade || 0} onChange={(e) => setRegionalGrade(e.target.value)} className="w-full mt-6 accent-olive cursor-pointer" /></>) : (<div className="h-24 flex items-center justify-center bg-gray-100/50 dark:bg-black/10 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700"><span className="text-gray-400 font-bold text-lg">؟</span></div>)}
                    </div>
                    <div className={`glass-card p-8 rounded-[2.5rem] relative transition-all duration-500 border-2 ${simConfig.continuous ? 'border-ai shadow-xl shadow-ai/10 opacity-100' : 'border-gray-200 dark:border-white/5 opacity-60 grayscale'}`}>
                        <div className="flex justify-between items-start mb-6">
                            <div><h3 className="text-xl font-heading font-bold text-ink dark:text-gray-100">{t.continuousMode}</h3><p className={`text-sm font-bold ${simConfig.continuous ? 'text-ai' : 'text-gray-400'}`}>{lang === 'ar' ? 'الوزن: 25%' : 'Poids: 25%'}</p></div>
                            <button onClick={() => toggleSimCard('continuous')} className={`w-12 h-8 rounded-full p-1 transition-colors flex items-center ${simConfig.continuous ? 'bg-ai justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}><div className="w-6 h-6 rounded-full bg-white shadow-sm"></div></button>
                        </div>
                        {simConfig.continuous ? (<><input type="text" inputMode="decimal" value={continuousGrade} onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && (parseFloat(e.target.value) <= 20 || e.target.value === '')) setContinuousGrade(e.target.value)}} placeholder="00.00" className="w-full h-16 rounded-2xl bg-white/50 dark:bg-black/20 border border-transparent focus:bg-white dark:focus:bg-black/40 focus:border-ai focus:shadow-lg focus:shadow-amber/10 transition-all font-sans font-black text-2xl text-center text-ink dark:text-white outline-none" /><input type="range" min="0" max="20" step="0.01" value={continuousGrade || 0} onChange={(e) => setContinuousGrade(e.target.value)} className="w-full mt-6 accent-ai cursor-pointer" /></>) : (<div className="h-24 flex items-center justify-center bg-gray-100/50 dark:bg-black/10 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700"><span className="text-gray-400 font-bold text-lg">؟</span></div>)}
                    </div>
                </div>
                <div className={`relative overflow-hidden rounded-[3rem] bg-gradient-to-br transition-all duration-500 text-white p-10 shadow-2xl mb-12 ${isSimImpossible ? 'from-red-600 to-red-800 shadow-red-500/20 border-4 border-red-500/30' : 'from-ai to-ai-purple shadow-ai/30'}`}>
                    <div className="text-center relative z-10">
                        {simResult.type === 'done' ? (
                            <>
                                <p className="text-white/80 font-serif text-lg mb-2">{t.simDone}</p>
                                <div className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-4">{simResult.val.toFixed(2)}</div>
                                <div className={`inline-flex px-6 py-2 rounded-full font-bold text-lg ${simResult.val >= simTarget ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-100'}`}>
                                    {simResult.val >= simTarget ? t.simGoalMet : t.simBelowGoal}
                                </div>
                            </>
                        ) : (
                            <>
                                {isSimImpossible ? (
                                    <div className="animate-fade-in-up">
                                        <h3 className="text-3xl md:text-4xl font-heading font-black mb-4">{t.coachImpossible}</h3>
                                        <p className="text-white/80 font-serif text-xl leading-relaxed max-w-2xl mx-auto">{t.simImpossibleDesc.replace('{target}', simTarget.toString())}</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-white/80 font-serif text-lg mb-4">{t.simRemaining.replace('{target}', simTarget.toString())}</p>
                                        <div className="flex items-center justify-center gap-4"><div className="text-7xl md:text-9xl font-heading font-black tracking-tighter drop-shadow-md">{Math.max(0, simResult.val).toFixed(2)}</div><span className="text-2xl text-white/60 font-light">/ 20</span></div>
                                        <div className="mt-6">{simResult.val <= 0 ? <span className="bg-green-400/20 text-green-100 px-6 py-2 rounded-full font-bold">{t.simGuaranteed}</span> : <span className="bg-white/20 px-6 py-2 rounded-full font-bold">{t.simNextGoal}</span>}</div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        )}

        {currentStep === AppStep.STREAM_SELECT && (
          <div className="animate-fade-in-up max-w-5xl mx-auto">
             <button onClick={() => selectedLevel === '1ere_bac' ? setCurrentStep(AppStep.LEVEL_SELECT) : setCurrentStep(AppStep.MODE_SELECT)} className="mb-8 flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                 {t.back}
             </button>
            <h2 className="text-3xl font-heading font-black text-center mb-4 text-ink dark:text-white">{t.streamSelectTitle}</h2>
            <p className="text-center text-inkLight dark:text-gray-400 mb-12 font-serif text-xl px-4">{t.streamSelectDesc}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {(selectedLevel === '1ere_bac' ? STREAMS_1BAC : STREAMS_2BAC).map((stream) => {
                     const theme = getStreamVisuals(stream.id, stream.name);
                     return (
                        <button 
                            key={stream.id} 
                            onClick={() => handleSelectStream(stream)} 
                            className={`group relative overflow-hidden rounded-[3.5rem] p-10 text-start transition-all duration-700 border border-white/40 dark:border-white/10 ${theme.shadow} hover:-translate-y-3 glass-card flex flex-col items-center text-center`}
                        >
                            {/* Thematic Background Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-40 group-hover:opacity-100 transition-opacity duration-700`}></div>
                            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] ${theme.glowColor} transition-all duration-700`}></div>
                            
                            <div className="relative z-10 flex flex-col items-center h-full">
                                {/* Enhanced Icon Container */}
                                <div className={`w-24 h-24 rounded-[2rem] ${theme.iconBg} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative ring-4 ring-white/20`}>
                                    {theme.icon}
                                </div>
                                
                                <h3 className="text-2xl font-heading font-black text-ink dark:text-white mb-6 leading-tight group-hover:scale-105 transition-transform">
                                    {lang === 'ar' ? stream.name : (stream.id.toUpperCase())}
                                </h3>
                                
                                <div className="mt-auto">
                                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 dark:bg-black/40 border border-white/20 shadow-inner group-hover:border-white/50 transition-all">
                                        <span className={`text-xs font-black uppercase tracking-widest ${theme.iconColor}`}>
                                            {stream.subjects.length} {lang === 'ar' ? 'مواد دراسية' : 'Matières'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </button>
                     );
                 })}
                 
                 {/* Special Custom Path Card */}
                 <button 
                    onClick={() => setCurrentStep(AppStep.CUSTOM_CHOICE)} 
                    className="group relative overflow-hidden rounded-[3.5rem] p-10 text-start transition-all duration-700 border border-dashed border-gray-400/50 dark:border-white/20 hover:border-ai/50 hover:shadow-ai/20 hover:-translate-y-3 glass-card flex flex-col items-center text-center"
                 >
                    <div className="absolute inset-0 bg-gradient-to-br from-ai/5 to-ai-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col items-center h-full">
                        <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-gray-400 to-slate-600 dark:from-white/10 dark:to-white/5 flex items-center justify-center mb-8 shadow-xl group-hover:from-ai group-hover:to-ai-purple group-hover:scale-110 transition-all duration-500 ring-4 ring-gray-100 dark:ring-white/5">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.967 8.967 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                        </div>
                        <h3 className="text-2xl font-heading font-black text-ink dark:text-white mb-6 leading-tight group-hover:text-ai transition-colors">{t.customStream}</h3>
                        <div className="mt-auto">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-100/50 dark:bg-black/40 border border-gray-200/50 group-hover:bg-ai/10 group-hover:border-ai/30 transition-all">
                                <span className="text-xs font-black text-gray-500 group-hover:text-ai uppercase tracking-widest">{t.manualCustom}</span>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
          </div>
        )}

        {currentStep === AppStep.NATIONAL_EXAM && selectedStream && (
            <div className="animate-fade-in-up max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <button onClick={() => setCurrentStep(AppStep.STREAM_SELECT)} className="flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                        {t.back}
                    </button>
                    <div className="px-4 py-2 bg-deep/10 dark:bg-white/10 rounded-full border border-deep/20 dark:border-white/20 text-deep dark:text-white font-bold font-heading text-sm">
                        {lang === 'ar' ? selectedStream.name : (selectedStream.id.toUpperCase())} - {t.nationalExam}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    {selectedStream.national_exam_subjects?.map((subject) => (
                        <div key={subject.id} className="glass-card rounded-[2rem] p-6 flex flex-row items-center justify-between gap-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex-1 text-start">
                                <h3 className="font-heading font-bold text-lg text-ink dark:text-gray-100 mb-1">{subject.name}</h3>
                                <span className="text-xs font-bold text-amber bg-amber/10 px-2 py-1 rounded-md">{t.coefficient}: {subject.coefficient}</span>
                            </div>
                            <div className="w-24">
                                <input type="text" inputMode="decimal" value={nationalExamGrades[subject.id] || ''} onChange={(e) => handleNationalExamInput(subject.id, e.target.value)} placeholder="00" className="w-full h-14 text-center rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-amber focus:shadow-md focus:bg-white dark:focus:bg-black/40 transition-all font-sans font-black text-xl text-ink dark:text-white outline-none placeholder:text-gray-300" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center pb-10">
                    <button onClick={calculateNationalExamResult} className="bg-deep dark:bg-white text-white dark:text-deep hover:bg-olive dark:hover:bg-gray-200 text-xl font-heading font-bold py-5 px-20 rounded-[2rem] shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-4">
                        <span>{t.calculate}</span>
                    </button>
                </div>
            </div>
        )}

        {currentStep === AppStep.REGIONAL_EXAM && selectedStream && (
            <div className="animate-fade-in-up max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <button onClick={() => setCurrentStep(AppStep.STREAM_SELECT)} className="flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                        {t.back}
                    </button>
                    <div className="px-4 py-2 bg-olive/10 dark:bg-white/10 rounded-full border border-olive/20 dark:border-white/20 text-olive dark:text-white font-bold font-heading text-sm">
                        {lang === 'ar' ? selectedStream.name : (selectedStream.id.toUpperCase())} - {t.regionalExam}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    {selectedStream.subjects.filter(s => ['fr', 'ar', 'hg', 'ei'].includes(s.id)).map((subject) => (
                        <div key={subject.id} className="glass-card rounded-[2rem] p-6 flex flex-row items-center justify-between gap-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                            <div className="flex-1 text-start">
                                <h3 className="font-heading font-bold text-lg text-ink dark:text-gray-100 mb-1">{subject.name}</h3>
                                <span className="text-xs font-bold text-olive bg-olive/10 px-2 py-1 rounded-md">{t.coefficient}: {subject.coefficient}</span>
                            </div>
                            <div className="w-24">
                                <input type="text" inputMode="decimal" value={regionalExamGrades[subject.id] || ''} onChange={(e) => handleRegionalExamInput(subject.id, e.target.value)} placeholder="00" className="w-full h-14 text-center rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-olive focus:shadow-md focus:bg-white dark:focus:bg-black/40 transition-all font-sans font-black text-xl text-ink dark:text-white outline-none placeholder:text-gray-300" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center pb-10">
                    <button onClick={calculateRegionalExamResult} className="bg-olive dark:bg-white text-white dark:text-deep hover:bg-olive-dark dark:hover:bg-gray-200 text-xl font-heading font-bold py-5 px-20 rounded-[2rem] shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-4">
                        <span>{t.calculate}</span>
                    </button>
                </div>
            </div>
        )}

        {currentStep === AppStep.GENERAL_CALC && (
            <div className="animate-fade-in-up max-w-4xl mx-auto">
                <button onClick={() => setCurrentStep(AppStep.MODE_SELECT)} className="mb-8 flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    {t.backToMode}
                </button>
                <div className="text-center mb-12"><h2 className="text-4xl font-heading font-black text-ink dark:text-white mb-4">{t.resultGeneralTitle}</h2><p className="text-inkLight dark:text-gray-400 text-lg font-serif">{t.generalModeDesc}</p></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div className="glass-card p-8 rounded-[2.5rem] border-t-8 border-t-amber relative overflow-hidden group"><h3 className="text-xl font-heading font-bold text-ink dark:text-gray-100 mb-2">{t.nationalExam}</h3><p className="text-sm text-amber font-bold mb-6">50%</p><input type="text" inputMode="decimal" value={nationalGrade} onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && (parseFloat(e.target.value) <= 20 || e.target.value === '')) setNationalGrade(e.target.value)}} placeholder="00.00" className="w-full h-16 rounded-2xl bg-white/50 dark:bg-black/20 border border-transparent focus:bg-white dark:focus:bg-black/40 focus:border-amber focus:shadow-lg focus:shadow-amber/10 transition-all font-sans font-black text-2xl text-center text- ink dark:text-white outline-none" /><input type="range" min="0" max="20" step="0.01" value={nationalGrade || 0} onChange={(e) => setNationalGrade(e.target.value)} className="w-full mt-6 accent-amber cursor-pointer" /></div>
                    <div className="glass-card p-8 rounded-[2.5rem] border-t-8 border-t-olive relative overflow-hidden group"><h3 className="text-xl font-heading font-bold text-ink dark:text-gray-100 mb-2">{t.regionalExam}</h3><p className="text-sm text-olive font-bold mb-6">25%</p><input type="text" inputMode="decimal" value={regionalGrade} onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && (parseFloat(e.target.value) <= 20 || e.target.value === '')) setRegionalGrade(e.target.value)}} placeholder="00.00" className="w-full h-16 rounded-2xl bg-white/50 dark:bg-black/20 border border-transparent focus:bg-white dark:focus:bg-black/40 focus:border-olive focus:shadow-lg focus:shadow-olive/10 transition-all font-sans font-black text-2xl text-center text-ink dark:text-white outline-none" /><input type="range" min="0" max="20" step="0.01" value={regionalGrade || 0} onChange={(e) => setRegionalGrade(e.target.value)} className="w-full mt-6 accent-olive cursor-pointer" /></div>
                    
                    {/* Updated Continuous Assessment Card with Mode Switch */}
                    <div className="glass-card p-8 rounded-[2.5rem] border-t-8 border-t-ai relative overflow-hidden group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-heading font-bold text-ink dark:text-gray-100 mb-1">{t.continuousMode}</h3>
                                <p className="text-sm text-ai font-bold">25%</p>
                            </div>
                        </div>

                        {/* Mode Selector Tab */}
                        <div className="flex bg-gray-100/50 dark:bg-black/20 p-1 rounded-xl mb-6 relative z-10">
                            <button 
                                onClick={() => setContinuousInputMode('annual')} 
                                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${continuousInputMode === 'annual' ? 'bg-white dark:bg-ai text-ink dark:text-white shadow-sm' : 'text-gray-400 hover:text-ink dark:hover:text-gray-200'}`}
                            >
                                {lang === 'ar' ? 'معدل سنوي' : 'Annuel'}
                            </button>
                            <button 
                                onClick={() => setContinuousInputMode('semesters')} 
                                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${continuousInputMode === 'semesters' ? 'bg-white dark:bg-ai text-ink dark:text-white shadow-sm' : 'text-gray-400 hover:text-ink dark:hover:text-gray-200'}`}
                            >
                                {lang === 'ar' ? 'بالدورات' : 'Semestres'}
                            </button>
                        </div>
                        
                        <div className="space-y-4 mb-6 flex-1 flex flex-col justify-center">
                            {continuousInputMode === 'semesters' ? (
                                <div className="animate-fade-in space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="text-start">
                                            <label className="text-[10px] font-bold text-gray-400 mb-1 block uppercase tracking-wider">{lang === 'ar' ? 'الدورة 1' : 'Sem 1'}</label>
                                            <input 
                                                type="text" 
                                                inputMode="decimal" 
                                                value={s1Continuous} 
                                                onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && (parseFloat(e.target.value) <= 20 || e.target.value === '')) setS1Continuous(e.target.value)}} 
                                                placeholder="00" 
                                                className="w-full h-12 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 focus:border-ai transition-all font-sans font-bold text-lg text-center text-ink dark:text-white outline-none" 
                                            />
                                        </div>
                                        <div className="text-start">
                                            <label className="text-[10px] font-bold text-gray-400 mb-1 block uppercase tracking-wider">{lang === 'ar' ? 'الدورة 2' : 'Sem 2'}</label>
                                            <input 
                                                type="text" 
                                                inputMode="decimal" 
                                                value={s2Continuous} 
                                                onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && (parseFloat(e.target.value) <= 20 || e.target.value === '')) setS2Continuous(e.target.value)}} 
                                                placeholder="00" 
                                                className="w-full h-12 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5 focus:border-ai transition-all font-sans font-bold text-lg text-center text-ink dark:text-white outline-none" 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-gray-100 dark:border-white/5 text-center">
                                        <label className="text-[10px] font-bold text-ai mb-2 block uppercase tracking-wider">
                                            {lang === 'ar' ? 'المعدل المحسوب' : 'Moyenne calculée'}
                                        </label>
                                        <div className="text-3xl font-heading font-black text-ink dark:text-white opacity-90 drop-shadow-sm">
                                            {continuousGrade || '00.00'}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="animate-fade-in flex-1 flex flex-col justify-center">
                                    <label className="text-[10px] font-bold text-gray-400 mb-3 block uppercase tracking-wider text-start">
                                        {lang === 'ar' ? 'أدخل المعدل السنوي مباشرة' : 'Saisir moyenne annuelle'}
                                    </label>
                                    <input 
                                        type="text" 
                                        inputMode="decimal" 
                                        value={continuousGrade} 
                                        onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value) && (parseFloat(e.target.value) <= 20 || e.target.value === '')) setContinuousGrade(e.target.value)}} 
                                        placeholder="00.00" 
                                        className="w-full h-16 rounded-2xl bg-white/50 dark:bg-black/20 border border-transparent focus:bg-white dark:focus:bg-black/40 focus:border-ai focus:shadow-lg transition-all font-sans font-black text-2xl text-center text-ink dark:text-white outline-none" 
                                    />
                                </div>
                            )}
                        </div>
                        
                        <input type="range" min="0" max="20" step="0.01" value={continuousGrade || 0} onChange={(e) => setContinuousGrade(e.target.value)} className="w-full accent-ai cursor-pointer mt-auto" />
                    </div>
                </div>

                <div className={`glass-card rounded-[2.5rem] p-10 mb-12 border border-gray-100 dark:border-white/5 shadow-xl transition-all duration-300 relative ${(isStreamDropdownOpen || isYearDropdownOpen) ? 'z-[100]' : 'z-10'}`}>
                    <div className="flex items-center gap-3 mb-8"><div className="w-1.5 h-8 bg-olive rounded-full"></div><h3 className="text-2xl font-heading font-bold text-ink dark:text-white">{t.additionalInfo}</h3></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="relative text-start" ref={streamRef}>
                            <label className="block text-sm font-bold text-inkLight dark:text-gray-400 mb-3">{t.streamSelectTitle}</label>
                            <div onClick={() => setIsStreamDropdownOpen(!isStreamDropdownOpen)} className={`w-full h-16 px-6 rounded-2xl bg-white dark:bg-black/20 border-2 transition-all cursor-pointer flex items-center justify-between group ${isStreamDropdownOpen ? 'border-olive shadow-lg shadow-olive/10' : 'border-gray-100 dark:border-gray-800'}`}><span className={`font-heading font-bold text-lg ${selectedStream ? 'text-ink dark:text-white' : 'text-gray-400'}`}>{selectedStream ? (lang === 'ar' ? selectedStream.name : selectedStream.id.toUpperCase()) : t.streamSelectTitle}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isStreamDropdownOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg></div>
                            {isStreamDropdownOpen && (<div className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-deepSurface/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl border border-white/60 dark:border-white/10 overflow-hidden z-[120] animate-fade-in-up"><div className="max-h-[40vh] overflow-y-auto no-scrollbar">{STREAMS_2BAC.map(s => (<div key={s.id} onClick={() => handleSelectStream(s)} className={`px-6 py-4 hover:bg-olive/5 cursor-pointer flex items-center justify-between transition-colors border-b border-gray-5 dark:border-white/5 last:border-0 ${selectedStream?.id === s.id ? 'bg-olive/10 text-olive' : 'text-inkLight dark:text-gray-300'}`}><span className="font-heading font-bold">{lang === 'ar' ? s.name : s.id.toUpperCase()}</span>{selectedStream?.id === s.id && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 text-olive"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}</div>))}</div></div>)}
                        </div>
                        <div className="relative text-start" ref={yearRef}>
                            <label className="block text-sm font-bold text-inkLight dark:text-gray-400 mb-3">{t.schoolYear}</label>
                            <div onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)} className={`w-full h-16 px-6 rounded-2xl bg-white dark:bg-black/20 border-2 transition-all cursor-pointer flex items-center justify-between group ${isYearDropdownOpen ? 'border-amber shadow-lg shadow-amber/10' : 'border-gray-100 dark:border-gray-800'}`}><span className={`font-heading font-bold text-lg text-ink dark:text-white`}>{examYear === '2025' ? t.schoolYear2025 : t.schoolYearOther.replace('{year}', examYear)}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isYearDropdownOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg></div>
                             {isYearDropdownOpen && (<div className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-deepSurface/95 backdrop-blur-xl rounded-[1.5rem] shadow-2xl border border-white/60 dark:border-white/10 overflow-hidden z-[120] animate-fade-in-up">{['2025', '2024', '2023'].map(year => (<div key={year} onClick={() => { setExamYear(year); setIsYearDropdownOpen(false); }} className={`px-6 py-4 hover:bg-amber/5 cursor-pointer flex items-center justify-between transition-colors border-b border-gray-5 dark:border-white/5 last:border-0 ${examYear === year ? 'bg-amber/10 text-amber' : 'text-inkLight dark:text-gray-300'}`}><span className="font-heading font-bold">{year === '2025' ? t.schoolYear2025 : t.schoolYearOther.replace('{year}', year)}</span>{examYear === year && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 text-amber"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}</div>))}</div>)}
                        </div>
                    </div>
                </div>

                 <div className="relative glass-card rounded-[3.5rem] p-10 md:p-14 bg-gradient-to-br from-paper via-white to-paperDark dark:from-deepSurface dark:via-[#2b2726] dark:to-deep flex flex-col md:flex-row items-center justify-between gap-10 border border-amber/20 shadow-2xl overflow-hidden mb-12 z-0 group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-[100px] pointer-events-none transition-all group-hover:bg-amber/10"></div>
                    <div className="relative z-10 text-center md:text-start flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber/10 rounded-full mb-6 border border-amber/20">
                            <span className="w-2 h-2 rounded-full bg-amber animate-pulse"></span>
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">{t.stats}</span>
                        </div>
                        <h4 className="text-3xl md:text-4xl font-heading font-black text-ink dark:text-white mb-4 leading-tight">{t.approximateAvg}</h4>
                        <p className="text-inkLight dark:text-gray-400 font-serif text-lg leading-relaxed max-w-md opacity-80">
                            {lang === 'ar' ? 'يتم تحديث هذه القيمة فورياً بناءً على النقط المدخلة أعلاه. اضغط على الزر أدناه للتحليل الكامل.' : 'Cette valeur est mise à jour instantanément. Appuyez sur le bouton ci-dessous pour l\'analyse complète.'}
                        </p>
                    </div>
                    <div className="relative z-10 w-52 h-52 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-amber via-amber-glow to-[#B8860B] shadow-2xl shadow-amber/40 flex flex-col items-center justify-center text-white scale-110 border-[12px] border-white/30 dark:border-black/30 transform transition-transform group-hover:scale-115">
                        <span className="text-6xl md:text-7xl font-heading font-black tracking-tighter drop-shadow-lg">{currentLiveGeneralAvg.toFixed(2)}</span>
                        <div className="h-[2px] w-12 bg-white/40 my-2 rounded-full"></div>
                        <span className="text-base md:text-lg font-bold opacity-90 uppercase tracking-widest font-heading">{t.points}</span>
                    </div>
                </div>

                <div className="flex justify-center z-0 pb-10">
                    <button onClick={calculateGeneralBacResult} className="group relative bg-deep dark:bg-white text-white dark:text-deep hover:bg-olive dark:hover:bg-gray-200 text-2xl font-heading font-extrabold py-6 px-24 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all hover:scale-105 active:scale-95 flex items-center gap-5">
                        <span>{t.confirmResults}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 rtl:rotate-180 ltr:rotate-0 group-hover:translate-x-2 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </button>
                </div>
            </div>
        )}

        {currentStep === AppStep.CUSTOM_MODE && (
             <div className="animate-fade-in-up max-w-4xl mx-auto">
                 <div className="flex justify-between items-center mb-8">
                    <button onClick={() => setCurrentStep(AppStep.CUSTOM_CHOICE)} className="flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                        {t.back}
                    </button>
                    <div className="flex items-center gap-4">
                         <div className="px-4 py-2 bg-ai/10 rounded-full border border-ai/20 text-ai font-bold font-heading text-sm">{t.manualCustom}</div>
                         <button onClick={handleSaveTemplate} disabled={isTemplateSaved} className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all ${isTemplateSaved ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/10 hover:bg-white'}`}>{isTemplateSaved ? t.saved : t.saveTemplate}</button>
                    </div>
                 </div>

                 {/* New: Global Activities Weight Controller */}
                 <div className="glass-card p-6 rounded-[2.5rem] border border-ai/20 shadow-xl mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ai/5 rounded-full blur-2xl group-hover:bg-ai/10 transition-all"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-start">
                             <h4 className="font-heading font-black text-ink dark:text-white flex items-center gap-2 text-lg">
                                <span className="w-2 h-6 bg-ai rounded-full"></span>
                                {t.activitiesWeight}
                             </h4>
                             <p className="text-xs text-inkLight dark:text-gray-400 font-serif mt-1">{lang === 'ar' ? 'يتم تطبيق هذا الوزن على جميع المواد التي تتضمن أنشطة.' : 'Ce poids s\'applique à toutes les matières avec activités.'}</p>
                        </div>
                        <div className="flex-1 w-full flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-400 w-24 text-center">{t.assessmentsWeight}: {Math.round((1 - activitiesWeight) * 100)}%</span>
                            <div className="flex-1 relative h-6 flex items-center">
                                <input 
                                    type="range" 
                                    min="0.01" 
                                    max="0.99" 
                                    step="0.01" 
                                    value={activitiesWeight} 
                                    onChange={(e) => { setActivitiesWeight(parseFloat(e.target.value)); setIsTemplateSaved(false); }} 
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-ai" 
                                />
                            </div>
                            <span className="text-xs font-bold text-ai w-24 text-center">{t.activitiesWeight}: {Math.round(activitiesWeight * 100)}%</span>
                        </div>
                        <div className="bg-ai text-white px-4 py-2 rounded-2xl font-black font-sans text-xl shadow-lg shadow-ai/20">
                            {activitiesWeight.toFixed(2)}
                        </div>
                    </div>
                 </div>

                 {activeSubjects.length === 0 ? (
                     <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-[3rem]">
                         <h3 className="text-xl font-heading font-bold text-inkLight dark:text-gray-400 mb-2">{lang === 'ar' ? 'لا توجد مواد بعد' : 'Aucune matière'}</h3>
                         <button onClick={handleAddCustomSubject} className="bg-ai text-white px-8 py-3 rounded-2xl font-bold">{lang === 'ar' ? '+ إضافة مادة جديدة' : '+ Ajouter une matière'}</button>
                     </div>
                 ) : (
                     <div className="space-y-5 mb-10">
                         <div className="flex flex-wrap gap-3 mb-8 bg-gray-50 dark:bg-white/5 p-3 rounded-3xl border border-gray-100 dark:border-white/5">
                            <button onClick={handleDeleteAllSubjects} title={t.btnDescDelete} className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-black/20 text-danger font-bold transition-all hover:bg-danger/10">{t.deleteAll}</button>
                            <button onClick={handleClearAllGrades} title={t.btnDescClear} className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-black/20 text-amber font-bold transition-all hover:bg-amber/10">{t.clearGrades}</button>
                            <button onClick={handleSaveTemplateWithGrades} title={t.btnDescSaveGrades} className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-black/20 text-ai font-bold transition-all hover:bg-ai/10">{t.saveWithGrades}</button>
                         </div>
                        {activeSubjects.map((subject) => (
                            <GradeInputRow key={subject.id} subject={subject}  assessments={grades[subject.id]?.assessments || []} activitiesMark={grades[subject.id]?.activitiesMark} isPending={grades[subject.id]?.isPending} onUpdate={handleUpdateGrades} onDeleteSubject={() => handleDeleteSubject(subject.id)} isCustomMode={true} onUpdateSubjectDetails={handleUpdateSubjectDetails} lang={lang} />
                        ))}
                     </div>
                 )}
                 {activeSubjects.length > 0 && (
                     <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
                         <button onClick={handleAddCustomSubject} className="w-full md:w-auto h-14 px-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 font-bold flex items-center justify-center gap-2"><span>{t.addSubject}</span></button>
                        <button onClick={calculateResults} className="w-full md:w-auto bg-deep dark:bg-white text-white dark:text-deep text-xl font-heading font-bold h-16 px-16 rounded-[2rem] shadow-2xl"><span>{t.calculate}</span></button>
                     </div>
                 )}
             </div>
        )}
        
        {currentStep === AppStep.CUSTOM_EXAM_MODE && (
             <div className="animate-fade-in-up max-w-4xl mx-auto">
                 <div className="flex justify-between items-center mb-8">
                    <button onClick={() => setCurrentStep(AppStep.CUSTOM_CHOICE)} className="flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                        {t.back}
                    </button>
                    <div className="flex items-center gap-4">
                         <div className="px-4 py-2 bg-amber/10 rounded-full border border-amber/20 text-amber font-bold font-heading text-sm">{t.customExamTemplate}</div>
                         <button onClick={handleSaveTemplate} disabled={isTemplateSaved} className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all ${isTemplateSaved ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/10 hover:bg-white'}`}>{isTemplateSaved ? t.saved : t.saveTemplate}</button>
                    </div>
                 </div>
                 {activeSubjects.length === 0 ? (
                     <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-white/5 rounded-[3rem]">
                         <h3 className="text-xl font-heading font-bold text-inkLight dark:text-gray-400 mb-2">{lang === 'ar' ? 'لا توجد مواد بعد' : 'Aucune matière'}</h3>
                         <button onClick={handleAddCustomSubject} className="bg-amber text-white px-8 py-3 rounded-2xl font-bold">{lang === 'ar' ? '+ إضافة مادة جديدة' : '+ Ajouter une matière'}</button>
                     </div>
                 ) : (
                     <div className="space-y-5 mb-10">
                         <div className="flex flex-wrap gap-3 mb-8 bg-gray-50 dark:bg-white/5 p-3 rounded-3xl border border-gray-100 dark:border-white/5">
                            <button onClick={handleDeleteAllSubjects} title={t.btnDescDelete} className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-black/20 text-danger font-bold transition-all hover:bg-danger/10">{t.deleteAll}</button>
                            <button onClick={handleClearAllGrades} title={t.btnDescClear} className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-black/20 text-amber font-bold transition-all hover:bg-amber/10">{t.clearGrades}</button>
                            <button onClick={handleSaveTemplateWithGrades} title={t.btnDescSaveGrades} className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-black/20 text-ai font-bold transition-all hover:bg-ai/10">{t.saveWithGrades}</button>
                         </div>
                        {activeSubjects.map((subject) => (
                            <GradeInputRow key={subject.id} subject={subject} assessments={grades[subject.id]?.assessments || []} activitiesMark={grades[subject.id]?.activitiesMark} isPending={grades[subject.id]?.isPending} onUpdate={handleUpdateGrades} onDeleteSubject={() => handleDeleteSubject(subject.id)} isCustomMode={true} isExamMode={true} onUpdateSubjectDetails={handleUpdateSubjectDetails} lang={lang} />
                        ))}
                     </div>
                 )}
                 {activeSubjects.length > 0 && (
                     <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
                         <button onClick={handleAddCustomSubject} className="w-full md:w-auto h-14 px-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 font-bold flex items-center justify-center gap-2"><span>{t.addSubject}</span></button>
                        <button onClick={calculateResults} className="w-full md:w-auto bg-amber text-white text-xl font-heading font-bold h-16 px-16 rounded-[2rem] shadow-2xl"><span>{t.calculate}</span></button>
                     </div>
                 )}
             </div>
        )}

        {currentStep === AppStep.GRADE_INPUT && selectedStream && (
          <div className="animate-fade-in-up max-w-4xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <button onClick={() => setCurrentStep(AppStep.STREAM_SELECT)} className="flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                    {t.back}
                </button>
                <div className="px-4 py-2 bg-olive/10 rounded-full border border-olive/20 text-olive dark:text-olive-light font-bold font-heading text-sm">{lang === 'ar' ? selectedStream.name : selectedStream.id.toUpperCase()}</div>
             </div>
            <div className="space-y-5 mb-10">
              {activeSubjects.map((subject) => {
                const isBaseSubject = selectedStream.subjects.some(s => s.id === subject.id);
                return <GradeInputRow key={subject.id} subject={subject} assessments={grades[subject.id]?.assessments || []} activitiesMark={grades[subject.id]?.activitiesMark} isPending={grades[subject.id]?.isPending} onUpdate={handleUpdateGrades} onDeleteSubject={!isBaseSubject ? () => handleDeleteSubject(subject.id) : undefined} lang={lang} onUpdateSubjectDetails={handleUpdateSubjectDetails} />;
              })}
            </div>
            <div className={`mb-10 p-6 glass-card rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-600 flex flex-col lg:flex-row items-end lg:items-center gap-4 justify-between relative transition-all duration-300 ${isExtraDropdownOpen ? 'z-50' : 'z-10'}`}>
                <div className="flex-1 w-full lg:w-auto relative text-start" ref={dropdownRef}>
                    <label className="block text-sm font-medium text-inkLight dark:text-gray-400 mb-2">{t.extraSubject}</label>
                    <div onClick={() => setIsExtraDropdownOpen(!isExtraDropdownOpen)} className="w-full h-14 px-5 rounded-2xl bg-white/50 dark:bg-black/20 border transition-all cursor-pointer flex items-center justify-between text-ink dark:text-gray-100 select-none">
                        <span className={!subjectToAdd ? 'text-gray-400' : ''}>{getSelectedSubjectName()}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 text-gray-400 transition-transform ${isExtraDropdownOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                    {isExtraDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-deepSurface/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 dark:border-white/10 max-h-60 overflow-y-auto z-[60] animate-fade-in no-scrollbar">
                             {EXTRA_SUBJECTS.filter(s => !activeSubjects.find(active => active.id === s.id)).map(s => (
                                <div key={s.id} onClick={() => handleSelectExtraSubject(s.id)} className="px-5 py-3 hover:bg-olive/5 cursor-pointer text-ink dark:text-gray-200 transition-colors border-b border-gray-50 dark:border-white/5 last:border-0 flex justify-between items-center">
                                    <span>{s.name}</span>
                                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-black/30 rounded-md text-gray-500">{t.coefficient}: {s.coefficient}</span>
                                </div>
                             ))}
                        </div>
                    )}
                </div>
                <div className="w-full lg:w-32 text-start">
                    <label className="block text-sm font-medium text-inkLight dark:text-gray-400 mb-2">{t.coefficient}</label>
                    <input type="text" inputMode="decimal" value={customCoefficient} onChange={(e) => { if (/^\d*\.?\d*$/.test(e.target.value)) setCustomCoefficient(e.target.value); }} className="w-full h-14 px-6 rounded-2xl bg-white/50 dark:bg-black/20 border text-center outline-none" placeholder="1" />
                </div>
                <button onClick={handleAddExtraSubject} disabled={!subjectToAdd} className="w-full lg:w-auto h-14 px-8 rounded-2xl bg-olive text-white font-bold disabled:opacity-50">
                    <span>{t.addSubject}</span>
                </button>
            </div>
            <div className="flex justify-center px-4 pb-8 print:hidden relative z-0">
                <button onClick={calculateResults} className="bg-deep dark:bg-white text-white dark:text-deep hover:bg-olive dark:hover:bg-gray-200 text-xl font-heading font-bold py-4 px-16 rounded-[2rem] shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                    <span>{t.calculate}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </button>
            </div>
          </div>
        )}

        {currentStep === AppStep.RESULTS && (
          <div id="printable-results" className="animate-fade-in-up max-w-4xl mx-auto pb-10">
            <button 
                onClick={() => {
                    if (calcMode === 'general') setCurrentStep(AppStep.GENERAL_CALC);
                    else if (calcMode === 'national_exam') setCurrentStep(AppStep.NATIONAL_EXAM);
                    else if (calcMode === 'regional_exam') setCurrentStep(AppStep.REGIONAL_EXAM);
                    else if (selectedLevel === 'custom') {
                        if (calcMode === 'continuous') setCurrentStep(AppStep.CUSTOM_MODE);
                        else setCurrentStep(AppStep.CUSTOM_EXAM_MODE);
                    }
                    else if (calcMode === 'continuous' && selectedStream) setCurrentStep(AppStep.GRADE_INPUT);
                    else enterCustomMode(calcMode === 'custom_exam' ? 'exam' : 'continuous');
                }} 
                className="mb-8 flex items-center gap-2 text-inkLight dark:text-gray-400 hover:text-olive transition-colors print:hidden" 
                data-html2canvas-ignore="true"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                {t.editGrades}
            </button>
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#E6C685] via-[#D4AF37] to-[#B8860B] text-white p-10 md:p-14 text-center shadow-2xl mb-10 print:shadow-none print:border print:border-amber-500">
                <div className="relative z-10">
                    <h2 className="text-amber-100 font-serif text-xl mb-4 tracking-wider uppercase">
                        {calcMode === 'general' ? t.resultGeneralTitle : 
                         calcMode === 'national_exam' ? t.resultNationalTitle :
                         calcMode === 'regional_exam' ? t.resultRegionalTitle :
                         calcMode === 'custom_exam' ? t.resultCustomTitle :
                         t.resultTitle}
                    </h2>
                    <div className="flex items-end justify-center gap-2 mb-6">
                        <span className="text-7xl md:text-9xl font-heading font-black tracking-tighter drop-shadow-md">{finalAverage.toFixed(2)}</span>
                        <span className="text-3xl md:text-5xl font-light text-amber-100/80 mb-3">/20</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg print:text-black">
                        <span className="font-heading font-bold text-lg md:text-xl">
                        {finalAverage >= 16 ? t.distinction.excellent : finalAverage >= 14 ? t.distinction.good : finalAverage >= 12 ? t.distinction.prettyGood : finalAverage >= 10 ? t.distinction.passable : t.distinction.needsEffort}
                        </span>
                    </div>
                </div>
            </div>

            {(calcMode === 'continuous' || calcMode === 'custom_exam') && (
                <>
                <CoachTips pendingSubjects={coachData.pendingSubjects} currentTotalScore={coachData.currentTotalScore} completedCoeffs={coachData.completedCoeffs} totalCoeffs={coachData.totalCoeffs} lang={lang} />
                <div className="glass-card rounded-[2.5rem] p-8 mb-8 print:shadow-none">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-heading font-bold text-xl text-ink dark:text-white print:text-black">{t.performanceDistribution}</h3>
                        <span className="text-xs font-bold text-olive bg-olive/10 px-3 py-1 rounded-full uppercase tracking-wider print:hidden">{t.stats}</span>
                    </div>
                    <div className="h-[350px] w-full" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{top: 20, right: 10, left: 10, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#333" : "#eee"} />
                                <XAxis dataKey="name" tick={{fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 11}} axisLine={false} tickLine={false} dy={10} />
                                <YAxis domain={[0, 20]} tick={{fill: darkMode ? '#9CA3AF' : '#6B7280'}} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: darkMode ? '#292524' : 'rgba(255,255,255,0.95)' }} cursor={{fill: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}} />
                                <Bar dataKey="average" fill="url(#colorGradient)" radius={[8, 8, 8, 8]} barSize={40} />
                                <defs><linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#556B2F" stopOpacity={0.8}/><stop offset="100%" stopColor="#556B2F" stopOpacity={0.4}/></linearGradient></defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                </>
            )}

            {(calcMode === 'general' || calcMode === 'national_exam' || calcMode === 'regional_exam') ? (
                <>
                    {calcMode === 'general' && (
                    <div className="space-y-8">
                        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-amber/10 relative overflow-hidden">
                            <h3 className="text-2xl font-heading font-bold text-ink dark:text-white mb-6 flex items-center gap-3">
                                {t.additionalInfo}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 rounded-3xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                                    <p className="text-sm text-inkLight dark:text-gray-400 mb-2">{t.nationalExam} (50%)</p>
                                    <p className="text-3xl font-heading font-black text-amber">{parseFloat(nationalGrade).toFixed(2) || '0.00'}</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                                    <p className="text-sm text-inkLight dark:text-gray-400 mb-2">{t.regionalExam} (25%)</p>
                                    <p className="text-3xl font-heading font-black text-olive">{parseFloat(regionalGrade).toFixed(2) || '0.00'}</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/50 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                                    <p className="text-sm text-inkLight dark:text-gray-400 mb-2">{t.continuousMode} (25%)</p>
                                    <p className="text-3xl font-heading font-black text-ai">{parseFloat(continuousGrade).toFixed(2) || '0.00'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    
                    {(calcMode === 'national_exam' || calcMode === 'regional_exam') && (
                        <div className="glass-card rounded-[2.5rem] p-8 mb-8 print:shadow-none">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-heading font-bold text-xl text-ink dark:text-white print:text-black">{t.performanceDistribution}</h3>
                                <span className="text-xs font-bold text-amber bg-amber/10 px-3 py-1 rounded-full uppercase tracking-wider print:hidden">{t.stats}</span>
                            </div>
                            <div className="h-[350px] w-full" dir="ltr">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{top: 20, right: 10, left: 10, bottom: 0}}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#333" : "#eee"} />
                                        <XAxis dataKey="name" tick={{fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 11}} axisLine={false} tickLine={false} dy={10} />
                                        <YAxis domain={[0, 20]} tick={{fill: darkMode ? '#9CA3AF' : '#6B7280'}} axisLine={false} tickLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: darkMode ? '#292524' : 'rgba(255,255,255,0.95)' }} cursor={{fill: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}} />
                                        <Bar dataKey="average" fill="url(#colorGradientAmber)" radius={[8, 8, 8, 8]} barSize={40} />
                                        <defs><linearGradient id="colorGradientAmber" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity={0.8}/><stop offset="100%" stopColor="#D4AF37" stopOpacity={0.4}/></linearGradient></defs>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {calcMode === 'general' && (
                    <div id="school-analysis-section" className="animate-fade-in-up mt-12 mb-20 relative p-4 -m-4">
                        <div className="flex items-center gap-4 mb-8 text-start">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75" /></svg>
                            </div>
                            <div>
                                <h3 className="text-3xl font-heading font-bold text-ink dark:text-white">{t.schoolProspects}</h3>
                                <p className="text-inkLight dark:text-gray-400 font-serif">{t.schoolProspectsDesc}</p>
                            </div>
                            <div className="mr-auto flex items-center gap-3">
                                {isAnalyzingSchools && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-bold">
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                        <span className="hidden md:inline">{t.analyzing}</span>
                                    </div>
                                )}
                                {schoolAnalysis && !isAnalyzingSchools && (
                                    <button onClick={handleDownloadSchoolsImage} disabled={isDownloadingSchools} data-html2canvas-ignore="true" className="glass px-4 py-2 rounded-xl border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 transition-all flex items-center gap-2 font-bold text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                                        <span className="hidden md:inline">{t.saveImage}</span>
                                    </button>
                                )}
                            </div>
                        </div>
                        {schoolAnalysis && (
                            <div className="space-y-8 text-start">
                                <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-white/40 group relative overflow-hidden">
                                    <div className="relative z-10 flex items-start gap-6">
                                        <div className="text-5xl opacity-20 font-serif text-indigo-500">❝</div>
                                        <div className="flex-1 pt-2">
                                            <p className="text-xl leading-relaxed text-ink dark:text-gray-200 font-serif">{schoolAnalysis.summary}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {schoolAnalysis.suggestedSchools?.map((school, i) => {
                                        const chanceLabel = school.chance === 'High' ? t.schoolChanceStrong : school.chance === 'Medium' ? t.schoolChanceMedium : t.schoolChanceLow;
                                        const chanceColor = school.chance === 'High' ? 'bg-green-100 text-green-700' : school.chance === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
                                        return (
                                            <div key={i} className="glass-card p-8 rounded-[2.5rem] border-2 border-transparent hover:border-indigo-400/50 transition-all duration-300 relative overflow-hidden group">
                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <h4 className="text-lg font-heading font-bold text-ink dark:text-white leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{school.name}</h4>
                                                        <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${chanceColor}`}>{chanceLabel}</span>
                                                    </div>
                                                    <p className="text-sm text-inkLight dark:text-gray-400 font-serif leading-relaxed opacity-90 mb-4">{school.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    )}
                </>
            ) : (
                (selectedLevel === 'custom' || calcMode === 'custom_exam') ? (
                    <div className="mt-8 text-center text-gray-400">
                        <p>{lang === 'ar' ? 'التحليل الذكي غير متاح للمسارات المخصصة حالياً.' : 'L\'analyse intelligente n\'est pas disponible pour les parcours personnalisés.'}</p>
                    </div>
                ) : (
                    <AIAnalysis grades={grades} stream={{...selectedStream!, subjects: activeSubjects}} level={selectedLevel === '1ere_bac' ? 'أولى باكالوريا' : 'ثانية باكالوريا'} lang={lang} />
                )
            )}
          </div>
        )}
      </main>

      </>

    )

}