
import React from 'react';
import { AppStep } from '../types';
import { translations, Language } from '../translations';

interface StepperProps {
  currentStep: AppStep;
  isGeneralMode?: boolean;
  lang: Language;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, isGeneralMode, lang }) => {
  const t = translations[lang];

  const baseSteps = [
    { id: AppStep.LEVEL_SELECT, label: lang === 'ar' ? 'المستوى' : 'Niveau' },
    { id: AppStep.MODE_SELECT, label: lang === 'ar' ? 'الخيار' : 'Calcul' },
  ];

  let flowSteps = [
    { id: AppStep.STREAM_SELECT, label: lang === 'ar' ? 'الشعبة' : 'Filière' },
    { id: AppStep.GRADE_INPUT, label: lang === 'ar' ? 'النقاط' : 'Notes' },
    { id: AppStep.RESULTS, label: lang === 'ar' ? 'النتائج' : 'Résultats' },
  ];

  if (currentStep === AppStep.GENERAL_CALC || (currentStep === AppStep.RESULTS && isGeneralMode)) {
     flowSteps = [
        { id: AppStep.GENERAL_CALC, label: lang === 'ar' ? 'الحساب' : 'Calcul' },
        { id: AppStep.RESULTS, label: lang === 'ar' ? 'النتائج' : 'Résultats' },
     ];
  } else if (currentStep === AppStep.SIMULATOR) {
      flowSteps = [
          { id: AppStep.SIMULATOR, label: t.simulator },
      ];
  }

  const steps = [...baseSteps, ...flowSteps];
  const activeStepIndex = steps.findIndex(s => s.id === currentStep);
  const totalSteps = steps.length;
  const progress = Math.min(100, Math.max(0, (activeStepIndex / (totalSteps - 1)) * 100));

  return (
    <div className="w-full max-w-3xl mx-auto mb-14 px-4 animate-fade-in-up print:hidden">
      <div className="relative rounded-full glass px-6 py-4 shadow-2xl border border-white/60 dark:border-white/10 overflow-hidden">
        <div className="absolute top-1/2 left-10 right-10 h-1.5 -translate-y-1/2 -z-10">
            <div className="absolute inset-0 bg-gray-100 dark:bg-white/5 rounded-full" />
            <div className={`absolute top-0 bottom-0 bg-gradient-to-l from-olive to-amber rounded-full transition-all duration-700 ease-out ${lang === 'ar' ? 'right-0' : 'left-0'}`} style={{ width: `${progress}%` }} />
        </div>

        <div className="flex justify-between items-center relative z-10">
            {steps.map((step, index) => {
            const isCompleted = activeStepIndex > index;
            const isCurrent = currentStep === step.id;
            
            return (
                <div key={step.id} className="flex flex-col items-center group cursor-default relative">
                    <div className={`relative w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center text-[10px] md:text-sm font-bold transition-all duration-500 border-[3px]  ${isCurrent ? 'bg-olive text-white border-white dark:border-deepSurface scale-110' : isCompleted ? 'bg-olive text-white border-white' : 'bg-gray-50 text-gray-300 dark:bg-deepSurface border-none'}`}>
                        {isCompleted ? (
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
                        ) : (<span>{index + 1}</span>)}
                    </div>
                    <span className={`absolute -bottom-4 whitespace-nowrap text-[9px] md:text-[11px] font-heading font-bold uppercase tracking-wider transition-all duration-500 ${isCurrent ? 'text-olive opacity-100' : 'text-gray-400 opacity-60'}`}>
                        {step.label}
                    </span>
                </div>
            );
            })}
        </div>
      </div>
    </div>
  );
};
