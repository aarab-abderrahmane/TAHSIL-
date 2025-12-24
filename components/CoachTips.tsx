
import React from 'react';
import { Subject } from '../types';
import { translations, Language } from '../translations';

interface CoachTipsProps {
  pendingSubjects: Subject[];
  currentTotalScore: number;
  completedCoeffs: number;
  totalCoeffs: number;
  lang: Language;
}

export const CoachTips: React.FC<CoachTipsProps> = ({ pendingSubjects, currentTotalScore, completedCoeffs, totalCoeffs, lang }) => {
  const t = translations[lang];
  if (pendingSubjects.length === 0) return null;

  const pendingCoeffs = totalCoeffs - completedCoeffs;
  const targetScore = 10 * totalCoeffs;
  const neededScoreFromPending = targetScore - currentTotalScore;
  const neededGradeRaw = neededScoreFromPending / pendingCoeffs;
  
  const neededGrade = Math.max(0, parseFloat(neededGradeRaw.toFixed(2)));
  const isImpossible = neededGrade > 20;
  const isAlreadyPassed = neededScoreFromPending <= 0;

  return (
    <div className={`relative overflow-hidden rounded-[3rem] p-1 md:p-1.5 transition-all duration-500 mb-10 group ${isImpossible ? 'bg-gradient-to-br from-danger/20 to-danger/5' : 'bg-gradient-to-br from-amber/30 via-amber/10 to-transparent'}`}>
        {/* Glow Effect */}
        <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none transition-all duration-700 ${isImpossible ? 'bg-danger' : 'bg-amber-glow animate-pulse-slow'}`}></div>
        
        <div className={`relative glass-card rounded-[2.8rem] p-8 md:p-10 border-none shadow-2xl flex flex-col lg:flex-row items-center gap-10 text-start overflow-hidden`}>
            {/* Left/Top Section: Icon & Header */}
            <div className="flex flex-col items-center lg:items-start gap-6 shrink-0 z-10">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${isImpossible ? 'bg-gradient-to-br from-danger to-red-700 shadow-danger/30' : 'bg-gradient-to-br from-amber via-amber-glow to-orange-500 shadow-amber/30'}`}>
                    {isImpossible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18L2.25 7.5L12 3L21.75 7.5L12 18Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.5L12 12L21.75 7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12V21" /></svg>
                    )}
                </div>
                <div className="text-center lg:text-start">
                    <h3 className="text-3xl font-heading font-black text-ink dark:text-white mb-2">{t.coachTitle}</h3>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${isImpossible ? 'bg-danger/10 text-danger border border-danger/20' : 'bg-amber/10 text-amber-700 dark:text-amber border border-amber/20'}`}>
                        {isImpossible ? 'Critical Alert' : 'Live Guidance'}
                    </div>
                </div>
            </div>

            {/* Middle Section: Main Content */}
            <div className="flex-1 w-full z-10">
                {isAlreadyPassed ? (
                    <div className="bg-success/5 border border-success/20 p-8 rounded-[2.5rem] text-center lg:text-start animate-fade-in">
                        <span className="text-4xl mb-4 block">🎉</span>
                        <div className="text-success font-heading font-black text-2xl leading-tight">{t.coachSuccess}</div>
                    </div>
                ) : isImpossible ? (
                    <div className="bg-danger/5 border border-danger/20 p-8 rounded-[2.5rem] text-center lg:text-start animate-fade-in">
                        <div className="text-danger font-heading font-black text-2xl leading-tight mb-2">{t.coachImpossible}</div>
                        <p className="text-inkLight dark:text-gray-400 font-serif text-lg">{lang === 'ar' ? 'للوصول للمعدل المطلوب، تحتاج نظرياً إلى أكثر من 20/20.' : 'Théoriquement, il vous faudrait plus de 20/20.'}</p>
                    </div>
                ) : (
                    <div className="space-y-8 animate-fade-in">
                        <p className="text-inkLight dark:text-gray-300 font-serif text-xl leading-relaxed opacity-90">{t.coachNeededGrade}</p>
                        
                        <div className="flex flex-col xl:flex-row items-center gap-8">
                            {/* Score Display */}
                            <div className="relative group/score">
                                <div className="absolute inset-0 bg-amber/20 rounded-[2rem] blur-xl opacity-0 group-hover/score:opacity-100 transition-opacity"></div>
                                <div className="relative bg-white dark:bg-black/40 px-10 py-6 rounded-[2.2rem] border-2 border-amber/30 flex flex-col items-center justify-center shadow-xl">
                                    <span className="text-6xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-amber to-orange-600 drop-shadow-sm">{neededGrade}</span>
                                    <div className="w-16 h-1 bg-amber/20 my-3 rounded-full"></div>
                                    <span className="text-lg font-bold text-gray-400 uppercase tracking-widest">/ 20</span>
                                </div>
                            </div>

                            {/* Pending List */}
                            <div className="flex-1 w-full">
                                <div className="bg-gray-50/50 dark:bg-white/5 p-6 rounded-[2.2rem] border border-gray-100 dark:border-white/5 shadow-inner">
                                    <div className="flex items-center gap-2 mb-4 text-xs font-black text-inkLight dark:text-gray-400 uppercase tracking-tighter">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber"></span>
                                        {t.coachPendingSubjects}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {pendingSubjects.map(s => (
                                            <div key={s.id} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                                                <span className="text-sm font-bold text-ink dark:text-gray-200">{s.name}</span>
                                                <span className="text-[10px] px-1.5 py-0.5 bg-amber/10 text-amber-700 rounded-md font-black">×{s.coefficient}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-serif italic text-center lg:text-start">{t.coachNote}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
