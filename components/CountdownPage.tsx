
import React, { useState, useEffect } from 'react';
import { translations, Language } from '../translations';

interface CountdownPageProps {
  onBack: () => void;
  lang: Language;
}

export const CountdownPage: React.FC<CountdownPageProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [examYear, setExamYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // JavaScript months are 0-indexed. June is 5.
      // Target: June 2nd, 8:00 AM
      let year = now.getFullYear();
      let targetDate = new Date(year, 5, 4, 8, 0, 0);

      // If June 2nd has passed this year, set target to next year
      if (now > targetDate) {
        year += 1;
        targetDate = new Date(year, 5, 4, 8, 0, 0);
      }
      
      setExamYear(year);

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    // Initial call
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="animate-fade-in-up min-h-[85vh] flex flex-col items-center justify-center relative z-10 w-full max-w-6xl mx-auto px-4">
      
      {/* Subtle Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-100/40 to-transparent dark:from-amber-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Navigation */}
      <div className="w-full flex justify-start mb-12 relative z-20">
        <button 
            onClick={onBack} 
            className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all shadow-sm hover:shadow-md backdrop-blur-md"
        >
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-ink dark:text-white rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
            </div>
            <span className="font-heading font-bold text-ink dark:text-white text-sm">{t.back}</span>
        </button>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Typography & Context */}
        <div className="text-center lg:text-start space-y-8 relative z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/10 border border-amber/20">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber"></span>
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber tracking-widest uppercase">{t.timeLeft}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-black text-ink dark:text-white leading-[1.1] tracking-tight">
                {t.countdownTitle} <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber to-amber-600 dark:to-amber-300">{examYear}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-inkLight dark:text-gray-400 font-serif leading-relaxed max-w-lg mx-auto lg:mx-0">
                {lang === 'ar' ? 'النجاح يبدأ بتنظيم الوقت. كل دقيقة تستثمرها الآن تقربك خطوة نحو هدفك.' : 'Le succès commence par la gestion du temps. Chaque minute investie vous rapproche de votre objectif.'}
            </p>

            <div className="flex flex-col md:flex-row items-center lg:items-start gap-6 pt-4">
                <div className="px-6 py-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center text-2xl">📅</div>
                    <div className="text-start">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.examDateLabel}</p>
                        <p className="text-lg font-bold text-ink dark:text-white font-heading">{t.examDateValue} {examYear}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: The Clock Cards */}
        <div className="relative z-10 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
                {/* Days */}
                <div className="col-span-2 glass-card rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center border border-white/60 dark:border-white/10 shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-amber/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-8xl md:text-9xl font-heading font-black text-ink dark:text-white mb-2 tabular-nums tracking-tighter drop-shadow-sm">
                        {formatNumber(timeLeft.days)}
                    </span>
                    <span className="text-sm md:text-base font-bold text-amber uppercase tracking-[0.3em]">{t.days}</span>
                </div>

                {/* Hours */}
                <div className="glass-card rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center border border-white/60 dark:border-white/10 shadow-lg group hover:-translate-y-1 transition-transform">
                    <span className="text-5xl md:text-6xl font-heading font-black text-inkLight dark:text-gray-200 mb-1 tabular-nums tracking-tighter">
                        {formatNumber(timeLeft.hours)}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.hours}</span>
                </div>

                {/* Minutes */}
                <div className="glass-card rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center border border-white/60 dark:border-white/10 shadow-lg group hover:-translate-y-1 transition-transform">
                    <span className="text-5xl md:text-6xl font-heading font-black text-inkLight dark:text-gray-200 mb-1 tabular-nums tracking-tighter">
                        {formatNumber(timeLeft.minutes)}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.minutes}</span>
                </div>
            </div>
            
            {/* Seconds (Floating or separate) */}
            <div className="mt-6 flex justify-center">
                 <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/40 dark:bg-black/40 border border-white/20 backdrop-blur-md shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="font-heading font-bold text-ink dark:text-white tabular-nums text-lg">
                        {formatNumber(timeLeft.seconds)}
                    </span>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{t.seconds}</span>
                 </div>
            </div>
        </div>

      </div>

      <div className="mt-auto py-12 text-center max-w-2xl text-gray-400 dark:text-gray-600 font-serif text-sm relative z-10">
          <p>{lang === 'ar' ? 'تذكير: الموعد المحدد هو تقديري بناءً على التاريخ المعتاد للامتحان الوطني (2 يونيو). يرجى دائماً مراجعة المذكرات الوزارية الرسمية.' : 'Rappel : La date est estimée sur la base de la date habituelle (2 Juin). Veuillez toujours consulter les notes ministérielles officielles.'}</p>
      </div>

    </div>
  );
};
