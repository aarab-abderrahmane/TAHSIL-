
import React, { useState, useEffect, useRef } from 'react';

import { translations, Language } from '../translations';
import { Link } from 'react-router-dom';

interface PrivacyPolicyProps {
  onBack: () => void;
  lang: Language;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({  lang }) => {
  const t = translations[lang];
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [lastUpdated] = useState('2025-05-20');

  const sections = [
    { id: 'data', title: t.privacyDataTitle, icon: '🔒' },
    { id: 'ai', title: t.privacyAITitle, icon: '✨' },
    { id: 'storage', title: t.privacyCookiesTitle, icon: '💾' },
    { id: 'rights', title: t.privacyRightsTitle, icon: '✅' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);

      // Active section detection with buffer
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="animate-fade-in min-h-screen bg-paper dark:bg-deep relative selection:bg-olive/20 selection:text-olive-dark font-sans transition-colors duration-500">
      {/* High-Precision Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-[110] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-olive via-amber to-olive-dark transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Professional Minimalist Header */}
      <nav className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-white/5 py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-300">
        {/* <button 
        //   onClick={onBack}   
          className="group flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-olive/10 flex items-center justify-center text-olive transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 rtl:rotate-180 ltr:rotate-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </div>
          <span className="font-heading font-bold text-ink dark:text-white text-sm hidden sm:inline">{t.back}</span>
        </button> */}
        <p></p>
        
        <Link to="/">
            <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-olive to-olive-dark text-white flex items-center justify-center font-heading font-black text-lg shadow-lg rotate-3">ت</div>
             <span className="font-heading font-black text-ink dark:text-white tracking-tight">{t.appName}</span>
            </div>
        </Link>


        <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {lang === 'ar' ? 'تحصيل - الأمان أولاً' : 'Tahsil - Privacy First'}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        
        {/* Table of Contents - Professional Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 h-fit sticky top-32">
          <div className="space-y-8">
            <div className="px-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
                {lang === 'ar' ? 'محتويات الوثيقة' : 'Navigation'}
              </p>
              <nav className="flex flex-col gap-1.5">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all text-start group relative ${activeSection === sec.id ? 'bg-olive/10 text-olive' : 'text-inkLight dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                  >
                    {activeSection === sec.id && (
                        <div className="absolute inset-y-2 left-0 w-1 bg-olive rounded-full ltr:block rtl:hidden"></div>
                    )}
                    {activeSection === sec.id && (
                        <div className="absolute inset-y-2 right-0 w-1 bg-olive rounded-full ltr:hidden rtl:block"></div>
                    )}
                    <span className={`text-xl transition-all duration-500 ${activeSection === sec.id ? 'scale-110 opacity-100' : 'opacity-40 grayscale'}`}>{sec.icon}</span>
                    <span className={`font-heading font-bold text-sm leading-tight transition-colors ${activeSection === sec.id ? 'opacity-100' : 'opacity-70'}`}>{sec.title}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 rounded-[2rem] bg-amber/5 border border-amber/10 text-start">
               <p className="text-[10px] font-bold text-amber-700 dark:text-amber mb-2 uppercase tracking-widest">{lang === 'ar' ? 'تحديث' : 'Mise à jour'}</p>
               <p className="text-sm font-serif text-inkLight dark:text-gray-400 italic">{lastUpdated}</p>
            </div>
          </div>
        </aside>

        {/* Main Editorial Content */}
        <main className="lg:col-span-9 max-w-3xl">
          <header className="mb-24 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-olive/10 rounded-full mb-8 border border-olive/20">
                <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse"></span>
                <span className="text-[10px] font-black text-olive uppercase tracking-[0.15em]">{lang === 'ar' ? 'وثيقة رسمية' : 'Document Officiel'}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black text-ink dark:text-white mb-10 leading-[0.9] tracking-tighter">
              {t.privacyTitle}
            </h1>
            <div className="h-2 w-32 bg-gradient-to-r from-olive via-amber to-transparent rounded-full mb-12"></div>
            <p className="text-2xl md:text-3xl font-serif text-inkLight dark:text-gray-300 leading-[1.65] italic border-l-4 rtl:border-l-0 rtl:border-r-4 border-olive/30 pl-8 rtl:pl-0 rtl:pr-8">
              {t.privacyIntro}
            </p>
          </header>

          <article className="space-y-32">
            {/* Section: Data Processing */}
            <section id="data" className="relative group scroll-mt-32">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black/20 shadow-xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🔒</div>
                <h2 className="text-4xl font-heading font-black text-ink dark:text-white tracking-tight uppercase">{t.privacyDataTitle}</h2>
              </div>
              <div className="font-serif text-xl md:text-2xl leading-[1.8] text-inkLight dark:text-gray-300 text-start space-y-8">
                <p className="opacity-90">{t.privacyDataDesc}</p>
                
                {/* Visual Highlight - Key Takeaway */}
                <div className="relative p-10 rounded-[2.5rem] bg-gradient-to-br from-olive/5 to-amber/5 border border-olive/10 shadow-inner overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-olive/10 rounded-full blur-3xl -z-10"></div>
                    <div className="flex items-start gap-4">
                        <span className="text-2xl text-olive">💡</span>
                        <div className="flex-1">
                            <p className="font-heading font-black text-olive text-sm uppercase tracking-widest mb-2">{lang === 'ar' ? 'بإختصار شديد' : 'En bref'}</p>
                            <p className="font-serif text-xl md:text-2xl text-ink dark:text-gray-200 leading-relaxed font-medium italic">
                                {lang === 'ar' ? 'بياناتك لا تلمس خوادمنا أبداً. كل ما تفعله يبقى داخل هاتفك أو حاسوبك، تماماً كفتر ملاحظات ورقي.' : 'Vos données ne touchent jamais nos serveurs. Tout ce que vous faites reste sur votre appareil, comme un carnet de notes papier.'}
                            </p>
                        </div>
                    </div>
                </div>
              </div>
            </section>

            {/* Section: AI Usage */}
            <section id="ai" className="relative group scroll-mt-32">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black/20 shadow-xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">✨</div>
                <h2 className="text-4xl font-heading font-black text-ink dark:text-white tracking-tight uppercase">{t.privacyAITitle}</h2>
              </div>
              <div className="font-serif text-xl md:text-2xl leading-[1.8] text-inkLight dark:text-gray-300 text-start space-y-6">
                <p className="opacity-90">{t.privacyAIDesc}</p>
                <div className="flex items-center gap-4 py-4 px-6 bg-ai/5 rounded-2xl border border-ai/10">
                    <div className="w-2 h-2 rounded-full bg-ai animate-pulse"></div>
                    <p className="text-xs font-bold text-ai uppercase tracking-widest">{lang === 'ar' ? 'تشفير تام للبيانات المرسلة' : 'Données envoyées de manière anonymisée'}</p>
                </div>
              </div>
            </section>

            {/* Section: Storage Mechanics */}
            <section id="storage" className="relative group scroll-mt-32">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black/20 shadow-xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">💾</div>
                <h2 className="text-4xl font-heading font-black text-ink dark:text-white tracking-tight uppercase">{t.privacyCookiesTitle}</h2>
              </div>
              <div className="font-serif text-xl md:text-2xl leading-[1.8] text-inkLight dark:text-gray-300 text-start">
                <p className="opacity-90">{t.privacyCookiesDesc}</p>
              </div>
            </section>

            {/* Section: User Rights */}
            <section id="rights" className="relative group pb-32 scroll-mt-32">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black/20 shadow-xl border border-gray-100 dark:border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">✅</div>
                <h2 className="text-4xl font-heading font-black text-ink dark:text-white tracking-tight uppercase">{t.privacyRightsTitle}</h2>
              </div>
              <div className="font-serif text-xl md:text-2xl leading-[1.8] text-inkLight dark:text-gray-300 text-start">
                <p className="opacity-90">{t.privacyRightsDesc}</p>
              </div>
            </section>
          </article>

          {/* Detailed Editorial Footer */}
          <footer className="border-t border-gray-200 dark:border-white/5 pt-16 text-start">
            <div className="flex flex-col md:flex-row items-start justify-between gap-12">
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-olive flex items-center justify-center text-white font-heading font-black">ت</div>
                    <p className="font-heading font-black text-2xl text-ink dark:text-white tracking-tight">{t.appName}</p>
                </div>
                <p className="text-sm text-gray-500 font-serif leading-relaxed">{t.privacyContactDesc}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                 <div className="px-6 py-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400">Version 2.0.4 - 2025</div>
                 <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="px-6 py-3 bg-olive text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-olive-dark transition-all shadow-lg shadow-olive/20">
                    {lang === 'ar' ? 'العودة للأعلى' : 'Retour en haut'}
                 </button>
              </div>
            </div>
            <div className="mt-16 text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-40 text-center">
                Built for the Moroccan Student • Made with Professional Care
            </div>
          </footer>
        </main>
      </div>

      {/* Atmospheric Background Art */}
      <div className="fixed top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-olive/10 to-transparent blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-amber/5 to-transparent blur-[120px] -z-10 pointer-events-none"></div>
      
      {/* Decorative Texture Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay -z-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
    </div>
  );
};

export default PrivacyPolicy;