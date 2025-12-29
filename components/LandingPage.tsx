
import React from 'react';
import { translations, Language } from '../translations';
import {PrivacyPolicy} from './PrivacyPolicy';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  onStart: () => void;
  lang: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, lang }) => {
  const t = translations[lang];
  
  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-ink dark:text-white pb-0">
      <div className="absolute inset-0 bg-zellige opacity-40 pointer-events-none -z-20"></div>
      
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-olive/20 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.1s' }}>
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-sm font-bold text-inkLight dark:text-gray-300 font-heading">{t.platformBadge}</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter mb-6 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-[#FDE68A] via-[#D4AF37] to-[#92400E] drop-shadow-md animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
          {t.heroTitle}
        </h1>
        
        <p className="text-xl md:text-2xl font-serif text-inkLight dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
          {t.heroDesc}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up opacity-0 items-center justify-center w-full sm:w-auto" style={{ animationDelay: '0.6s' }}>
            <Link to="/app" >

                      <button 
                    // onClick={onStart}
                    className="group relative px-10 py-5 bg-deep dark:bg-white text-white dark:text-deep rounded-full font-heading font-bold text-xl shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto"
                >
                    <span className="relative flex items-center justify-center gap-3">
                    {t.startJourney}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5-7.5M21 12H3" /></svg>
                    </span>
                </button>
            
            </Link>
          {/* <button 
            // onClick={onStart}
            className="group relative px-10 py-5 bg-deep dark:bg-white text-white dark:text-deep rounded-full font-heading font-bold text-xl shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto"
          >
            <span className="relative flex items-center justify-center gap-3">
               {t.startJourney}
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5-7.5M21 12H3" /></svg>
            </span>
          </button> */}

          <a href="#" className="group/android relative px-8 py-5 bg-gradient-to-b from-[#10B981] via-[#10B981] to-[#059669] rounded-full font-heading font-bold text-xl text-white animate-glow-pulse hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.5)]">
             {/* Glossy Top Highlight */}
             <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
             
             {/* Shimmer / Shine Effect */}
             <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg] -translate-x-full animate-shimmer pointer-events-none"></div>

             <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white transition-colors relative z-10">
                <path d="M16.6066 4.96574L18.4239 1.81598C18.5297 1.63285 18.4674 1.3986 18.2842 1.29285C18.1011 1.18709 17.8669 1.24939 17.7611 1.43252L15.9084 4.64369C13.4347 3.51139 10.5653 3.51139 8.09156 4.64369L6.23886 1.43252C6.13311 1.24939 5.89886 1.18709 5.71573 1.29285C5.53259 1.3986 5.4703 1.63285 5.57605 1.81598L7.39343 4.96574C3.65585 7.00949 1.09673 10.9572 1.00049 15.5H22.9995C22.9033 10.9572 20.3441 7.00949 16.6066 4.96574ZM6.5 11.5C5.94772 11.5 5.5 11.0523 5.5 10.5C5.5 9.94772 5.94772 9.5 6.5 9.5C7.05228 9.5 7.5 9.94772 7.5 10.5C7.5 11.0523 7.05228 11.5 6.5 11.5ZM17.5 11.5C16.9477 11.5 16.5 11.0523 16.5 10.5C16.5 9.94772 16.9477 9.5 17.5 9.5C18.0523 9.5 18.5 9.94772 18.5 10.5C18.5 11.0523 18.0523 11.5 17.5 11.5Z" />
             </svg>
             <span className="relative z-10">{t.downloadApp}</span>

             {/* Inner border glow */}
             <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"></div>
          </a>
          
          <button onClick={scrollToFeatures} className="px-10 py-5 glass rounded-full font-heading font-bold text-xl text-ink dark:text-white border border-white/20 hover:bg-white/50 transition-all duration-300 w-full sm:w-auto hidden lg:block">
            {t.discoverFeatures}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 relative">
        <div className="text-center mb-24">
             <div className="inline-block mb-4 px-4 py-1 rounded-full bg-olive/10 text-olive font-bold text-sm tracking-wider uppercase">{t.roadmap}</div>
             <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 text-ink dark:text-white tracking-tight">{t.howItWorks}</h2>
             <p className="text-xl text-inkLight dark:text-gray-400 font-serif max-w-2xl mx-auto">{t.howItWorksDesc}</p>
        </div>

        {/* Roadmap Map Container */}
        <div className="relative">
            
            {/* The Path Lines */}
            {/* Desktop Horizontal Line */}
            <div className="hidden md:block absolute top-[60px] left-[5%] right-[5%] h-1">
                <div className="absolute inset-0 bg-gradient-to-r from-olive via-amber to-ai opacity-20 dark:opacity-40 rounded-full"></div>
                <div className="absolute inset-0 w-full h-full border-t-2 border-dashed border-gray-300 dark:border-white/20"></div>
                {/* Animated traveler dot */}
                <div className="absolute top-1/2 left-0 w-3 h-3 bg-olive rounded-full -translate-y-[60%] animate-[shimmer_4s_infinite_linear]" style={{ offsetPath: 'path("M0,0 H1000")' }}></div>
            </div>

            {/* Mobile Vertical Line */}
            <div className="md:hidden absolute top-0 bottom-0 right-10 rtl:right-10 ltr:left-10 w-1">
                <div className="absolute inset-0 bg-gradient-to-b from-olive via-amber to-ai opacity-30 rounded-full"></div>
                <div className="absolute inset-0 w-full h-full border-l-2 rtl:border-r-2 ltr:border-l-2 border-dashed border-gray-300 dark:border-white/20"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
                {[
                    { title: t.steps.step1Title, desc: t.steps.step1Desc, icon: "🎯", gradient: "from-olive-light to-olive", step: 1 },
                    { title: t.steps.step2Title, desc: t.steps.step2Desc, icon: "✍️", gradient: "from-amber-glow to-amber", step: 2 },
                    { title: t.steps.step3Title, desc: t.steps.step3Desc, icon: "🧠", gradient: "from-ai to-ai-purple", step: 3 },
                    { title: t.steps.step4Title, desc: t.steps.step4Desc, icon: "🏆", gradient: "from-green-400 to-success", step: 4 }
                ].map((item, idx) => (
                    <div key={idx} className="group relative flex flex-row-reverse md:flex-col items-center md:items-center text-right md:text-center justify-end md:justify-start gap-6 md:gap-0">
                        
                        {/* Map Node / Marker */}
                        <div className="relative shrink-0 order-2 md:order-1">
                            <div className={`w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${item.gradient} p-1 shadow-xl shadow-gray-200 dark:shadow-black/50 group-hover:scale-110 transition-transform duration-500 z-20 relative flex items-center justify-center`}>
                                <div className="absolute inset-1 bg-white dark:bg-[#1C1917] rounded-full flex items-center justify-center">
                                    <span className="text-3xl md:text-5xl">{item.icon}</span>
                                </div>
                                {/* Step Number Badge */}
                                <div className="absolute -top-1 -right-1 md:top-0 md:right-0 w-8 h-8 rounded-full bg-ink dark:bg-white text-white dark:text-ink font-bold font-heading flex items-center justify-center border-2 border-white dark:border-deep shadow-lg">
                                    {item.step}
                                </div>
                            </div>
                            
                            {/* Dropline for Desktop visual connection */}
                            <div className="hidden md:block absolute top-full left-1/2 w-0.5 h-8 bg-gray-200 dark:bg-white/10 -translate-x-1/2 group-hover:bg-current transition-colors"></div>
                        </div>

                        {/* Content Card (Paper/Note style) */}
                        <div className="flex-1 md:mt-8 order-1 md:order-2 w-full">
                            <div className="glass-card p-6 rounded-[2rem] border-2 border-transparent hover:border-white/50 dark:hover:border-white/10 group-hover:-translate-y-2 transition-transform duration-300 relative bg-white/60 dark:bg-white/5">
                                {/* Connector arrow for mobile */}
                                <div className="md:hidden absolute top-1/2 -right-3 rtl:-right-3 ltr:-left-3 w-3 h-3 bg-white/60 dark:bg-[#292524] rotate-45 border-t border-r border-transparent group-hover:border-white/50 -translate-y-1/2"></div>
                                
                                <h3 className="text-xl font-heading font-black mb-3 text-ink dark:text-white leading-tight">{item.title}</h3>
                                <p className="text-sm text-inkLight dark:text-gray-400 font-serif leading-relaxed opacity-90">{item.desc}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
      </div>

      <div id="features-section" className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Precision Card */}
              <div className="glass-card p-10 rounded-[3rem] relative overflow-hidden group transition-all duration-700 hover:shadow-success/10 border-2 border-transparent hover:border-success/20">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-success/5 rounded-full blur-3xl group-hover:bg-success/10 transition-all"></div>
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 dark:from-success/20 dark:to-success/5 text-success rounded-[1.8rem] flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <span className="text-4xl">📊</span>
                  </div>
                  <h3 className="text-3xl font-heading font-black mb-4 text-ink dark:text-white">{t.features.precisionTitle}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-serif leading-relaxed text-lg">{t.features.precisionDesc}</p>
              </div>

              {/* AI Card - Larger */}
              <div className="glass-card p-10 rounded-[3rem] relative overflow-hidden group lg:col-span-2 border-2 border-transparent hover:border-ai/30 shadow-xl hover:shadow-ai/10 transition-all duration-700">
                  <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-ai/10 rounded-full blur-[100px] group-hover:bg-ai/20 transition-all"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-10">
                      <div className="w-28 h-28 bg-gradient-to-br from-ai to-ai-purple text-white rounded-[2.2rem] flex items-center justify-center shadow-2xl shadow-ai/30 text-5xl shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 relative">
                          <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                          <span className="relative z-10">✨</span>
                      </div>
                      <div className="text-start">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai/10 border border-ai/20 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-ai animate-pulse"></span>
                            <span className="text-[10px] font-black text-ai uppercase tracking-widest">Advanced Analysis</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-heading font-black mb-4 text-ink dark:text-white leading-tight">{t.features.aiTitle}</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-serif leading-relaxed text-xl opacity-90">{t.features.aiDesc}</p>
                      </div>
                  </div>
              </div>

              {/* Simulator Card */}
              <div className="glass-card p-10 rounded-[3rem] relative overflow-hidden group transition-all duration-700 hover:shadow-amber/10 border-2 border-transparent hover:border-amber/20">
                  <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber/5 rounded-full blur-3xl group-hover:bg-amber/10 transition-all"></div>
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber/20 dark:to-amber/5 text-amber rounded-[1.8rem] flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                      <span className="text-4xl">🎯</span>
                  </div>
                  <h3 className="text-3xl font-heading font-black mb-4 text-ink dark:text-white">{t.features.simTitle}</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-serif leading-relaxed text-lg">{t.features.simDesc}</p>
              </div>

              {/* Custom Path Card */}
              <div className="glass-card p-10 rounded-[3rem] relative overflow-hidden group lg:col-span-2 border-2 border-transparent hover:border-deep/10 dark:hover:border-white/10 transition-all duration-700">
                  <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10">
                      <div className="w-full md:w-1/3 h-40 bg-gradient-to-br from-gray-100 to-slate-200 dark:from-white/10 dark:to-white/5 rounded-[2.5rem] border-2 border-dashed border-gray-300 dark:border-white/10 flex items-center justify-center text-6xl group-hover:border-olive transition-all duration-500 shadow-inner">
                        🛠️
                      </div>
                      <div className="flex-1 text-start">
                        <h3 className="text-3xl font-heading font-black mb-4 text-ink dark:text-white leading-tight">{t.features.customTitle}</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-serif leading-relaxed text-xl opacity-90">{t.features.customDesc}</p>
                        <div className="mt-8 flex gap-3">
                            <span className="w-3 h-3 rounded-full bg-olive/20"></span>
                            <span className="w-3 h-3 rounded-full bg-amber/20"></span>
                            <span className="w-3 h-3 rounded-full bg-ai/20"></span>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <footer className="relative mt-32 pt-20 pb-10 px-4 border-t border-amber-200/50 dark:border-amber-900/30 bg-gradient-to-b from-white via-amber-50/80 to-amber-100/80 dark:from-[#1C1917] dark:via-[#1C1917] dark:to-amber-900/20 backdrop-blur-xl">
        {/* Shiny Edge Effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
            <div className="md:col-span-2 space-y-6 text-start">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-olive to-olive-dark rounded-[1rem] text-white shadow-xl rotate-3">
                        <span className="font-heading font-bold text-xl pt-1">{lang === 'ar' ? 'ت' : 'T'}</span>
                    </div>
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-ink dark:text-white leading-none">{t.appName}</h2>
                        <span className="text-xs text-olive font-bold tracking-widest uppercase">Tahsil App</span>
                    </div>
                </div>
                <p className="text-inkLight dark:text-gray-400 font-serif text-lg leading-relaxed max-w-sm">{t.footerBrandDesc}</p>
            </div>
            <div className="text-start">
                <h3 className="font-heading font-bold text-xl text-ink dark:text-white mb-6 flex items-center gap-2"><span className="w-8 h-1 bg-olive rounded-full"></span>{t.quickLinks}</h3>
                <ul className="space-y-4 font-serif text-lg text-inkLight dark:text-gray-400">
                    <li><button className="hover:text-olive transition-all">{t.home}</button></li>
                    <li><button onClick={scrollToFeatures} className="hover:text-olive transition-all">{t.featuresLabel}</button></li>
                    <li><button className="hover:text-olive transition-all" >{t.privacy}</button></li>
                </ul>
            </div>
            <div className="text-start">
                 <h3 className="font-heading font-bold text-xl text-ink dark:text-white mb-6 flex items-center gap-2"><span className="w-8 h-1 bg-amber rounded-full"></span>{t.contactUs}</h3>
                 <div className="flex gap-4">
                     <button className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 hover:bg-olive hover:text-white transition-all shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                     </button>
                 </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200/50 dark:border-white/5 text-center md:text-start flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
            <p className="text-inkLight dark:text-gray-500 font-heading text-sm font-bold opacity-60">
                {t.copyright.replace('{year}', new Date().getFullYear().toString())}
            </p>
        </div>
      </footer>
    </div>
  );
};
