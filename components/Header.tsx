
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../translations';
import { Link } from 'react-router-dom';

interface HeaderProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
    lang: Language;
    setLang: (l: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, lang, setLang }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontType, setFontType] = useState<'sans' | 'serif'>('sans');
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const percentage = (fontSize / 16) * 100;
    document.documentElement.style.fontSize = `${percentage}%`;
  }, [fontSize]);

  useEffect(() => {
    const body = document.body;
    if (fontType === 'serif') {
      body.classList.remove('font-sans');
      body.classList.add('font-serif');
    } else {
      body.classList.remove('font-serif');
      body.classList.add('font-sans');
    }
  }, [fontType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed   top-6 z-[100] px-4 print:hidden animate-fade-in-up pointer-events-none mb-6">
      <div className="max-w-5xl mx-auto flex justify-start items-center">
          <div className="pointer-events-auto relative rounded-full glass p-2 pr-4 pl-2 shadow-2xl border border-white/60 dark:border-white/10 flex items-center gap-2 overflow-visible transition-all duration-300">
                
                 <Link to="/">

                <div className="flex items-center gap-3 relative z-10 pl-2">
                    <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-olive to-olive-dark rounded-full shadow-lg shadow-olive/30 text-white shrink-0">
                        <span className="font-heading font-bold text-lg pt-1">{lang === 'ar' ? 'ت' : 'T'}</span>
                    </div>
                </div>
                </Link>

                <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1"></div>

                <div className="relative" ref={settingsRef}>
                    <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className={`w-10 h-10 rounded-full flex  justify-center items-center transition-all duration-300 ${showSettings ? 'bg-olive text-white' : 'bg-gray-100 dark:bg-deepSurface text-inkLight dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                        title={lang === 'ar' ? 'إعدادات العرض' : 'Paramètres d\'affichage'}
                    >
                      
                        <i class="bi bi-gear-wide-connected text-2xl flex items-center justify-center w-5 h-5 "></i>

                    </button>

                    {showSettings && (
                        <div className={`absolute top-full ${lang === 'ar' ? 'right-0' : 'left-0'} mt-4 w-72 bg-white/95 dark:bg-[#292524]/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/10 p-6 z-[100] animate-fade-in-up origin-top`}>
                            <div className="mb-6">
                                <label className="text-xs font-bold text-gray-400 mb-3 block uppercase tracking-wider">{lang === 'ar' ? 'حجم الخط' : 'Taille du texte'}</label>
                                <div className="flex items-center gap-3 bg-gray-100 dark:bg-black/20 p-2 rounded-2xl">
                                    <button onClick={() => setFontSize(Math.max(14, fontSize - 1))} className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-sm font-bold">A-</button>
                                    <div className="flex-1 text-center font-bold text-ink dark:text-white">{Math.round((fontSize/16)*100)}%</div>
                                    <button onClick={() => setFontSize(Math.min(22, fontSize + 1))} className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-lg font-bold">A+</button>
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="text-xs font-bold text-gray-400 mb-3 block uppercase tracking-wider">{lang === 'ar' ? 'نوع الخط' : 'Police'}</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => setFontType('sans')} className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${fontType === 'sans' ? 'bg-olive text-white shadow-lg' : 'bg-gray-100 dark:bg-black/20 text-gray-500'}`}>{lang === 'ar' ? 'عصري' : 'Moderne'}</button>
                                    <button onClick={() => setFontType('serif')} className={`py-3 px-4 rounded-xl text-sm font-bold font-serif transition-all ${fontType === 'serif' ? 'bg-olive text-white shadow-lg' : 'bg-gray-100 dark:bg-black/20 text-gray-500'}`}>{lang === 'ar' ? 'تقليدي' : 'Traditionnel'}</button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 mb-3 block uppercase tracking-wider">{lang === 'ar' ? 'اللغة' : 'Langue'}</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => setLang('ar')} className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${lang === 'ar' ? 'bg-olive text-white shadow-lg' : 'bg-gray-100 dark:bg-black/20 text-gray-500'}`}>العربية</button>
                                    <button onClick={() => setLang('fr')} className={`py-3 px-4 rounded-xl text-sm font-bold transition-all ${lang === 'fr' ? 'bg-olive text-white shadow-lg' : 'bg-gray-100 dark:bg-black/20 text-gray-500'}`}>Français</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button 
                    onClick={toggleDarkMode}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-deepSurface text-inkLight dark:text-amber hover:bg-amber/10 hover:text-amber transition-all duration-300 shadow-inner shrink-0"
                    title={darkMode ? "Mode Jour" : "Mode Nuit"}
                >
                    {darkMode ? (
                      <i class="bi bi-brightness-low-fill text-3xl flex items-center justify-center w-5 h-5 "></i>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" /></svg>
                    )}
                </button>
          </div>
      </div>
    </header>
  );
};
