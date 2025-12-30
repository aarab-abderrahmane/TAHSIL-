
import React from 'react';
import { translations, Language } from '../translations';

import {UnlinkIcon} from "./icons/UnlinkIcon"
import { Link } from 'react-router-dom';

interface NotFoundProps {
  onGoHome: () => void;
  lang: Language;
}

export const NotFound: React.FC<NotFoundProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="min-h-screen flex items-center justify-center p-6  relative overflow-hidden selection:bg-red-500/30 font-sans transition-colors duration-700">
      
      {/* Intense Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] -z-10 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] -z-10 animate-float pointer-events-none"></div>
      
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] -z-5 bg-[linear-gradient(rgba(255,0,0,0)_50%,rgba(255,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      <div className="max-w-2xl w-full text-center relative z-10 animate-fade-in-up">
        
        {/* Dynamic Warning Symbol */}
      
        {/* Glitchy 404 Text */}
        <div className="relative mb-6">
            <div className="flex  justify-center gap-4 ">
            <h1 className="text-[12rem] md:text-[18rem] font-heading font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-900 to-transparent select-none opacity-80 filter drop-shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                4
            </h1>

            <div className="relative mb-8 inline-block  ">
                <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 animate-pulse "></div>
                <div className="w-24 h-24  md:w-32 md:h-48 rounded-[3rem] bg-gradient-to-br from-red-500 to-red-800 shadow-[0_0_50px_rgba(239,68,68,0.3)] flex items-center justify-center text-white text-5xl md:text-6xl border-2 border-white/10 relative z-10 animate-float">
                <UnlinkIcon  className="w-32 h-32 text-black"/>
                </div>
            </div>

            <h1 className="text-[12rem] md:text-[18rem] font-heading font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-900 to-transparent select-none opacity-80 filter drop-shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                4
            </h1>
            </div>
            <div className="absolute inset-0 flex items-center justify-center -translate-y-4 z-50">
                <p className=" font-black font-heading text-sm md:text-lg uppercase tracking-[0.5em] opacity-40 animate-pulse">
                    System Error / {lang === 'ar' ? 'خطأ في النظام' : 'Erreur Système'}
                </p>
            </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6 max-w-lg mx-auto">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-4 tracking-tight leading-none uppercase">
                {lang === 'ar' ? 'منطقة محظورة' : 'Zone Interdite'}
            </h2>
            
            <p className="text-lg md:text-xl font-serif text-gray-400 leading-relaxed italic border-x-2 border-red-900/30 px-6">
                {lang === 'ar' 
                    ? 'لقد تجاوزت حدود المسار المألوف. الصفحة التي تطلبها فُقدت في أرشيفات الزمن أو لم تُخلق بعد.' 
                    : 'Vous avez franchi les limites du chemin balisé. La page demandée a été perdue dans les archives du temps.'}
            </p>
        </div>

        {/* Action Button */}
        <div className="mt-12 flex  gap-6 justify-center ">
            <Link to="/app">
            <button 
                // onClick={onGoHome}
                className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-red-600 hover:bg-red-700 text-white rounded-full font-heading font-black text-2xl shadow-[0_20px_40px_rgba(220,38,38,0.2)] transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden"
            >
                {/* Internal Shine Effect */}
                <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[30deg] -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7 rtl:rotate-180 ltr:rotate-0 group-hover:-translate-x-2 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>{t.home}</span>
            </button>
            </Link>
        </div>

        {/* Technical Footer */}
        <div className="mt-24 pt-10 border-t border-white/5">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 grayscale opacity-50">
                    <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-heading font-black">ت</div>
                    <span className="font-heading font-bold text-[10px] uppercase tracking-[0.4em] text-white">{t.appName}</span>
                </div>
      
            </div>
        </div>
      </div>

      {/* Atmospheric Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)] -z-5"></div>
    </div>
  );
};

export default NotFound;
