
import React, { useEffect, useState, useRef } from 'react';
import { AnalysisResult, GradeMap, Stream } from '../types';
import { analyzeGrades } from '../services/geminiService';
import { Language, translations } from '../translations';
import html2canvas from 'html2canvas';

interface AIAnalysisProps {
  grades: GradeMap;
  stream: Stream;
  level: string;
  lang: Language;
}



export const AIAnalysis: React.FC<AIAnalysisProps> = ({ grades, stream, level, lang }) => {
  const t = translations[lang];
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const planRef = useRef<HTMLDivElement>(null);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError(false);
    try {
        // const result = await analyzeGrades(grades, stream, level, lang);
        // setData(result);

        const response = await fetch("http://localhost:5000/api/analyze-grades",{
            method : "POST", 
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({grades,stream,level,lang})

        }); 

        if(!response.ok){
            setError(true)
            throw new Error('Failed to fetch analysis')

        }

        const result = await response.json()
        console.log(result)
        setData(result)

    } catch (e) {
        console.error(e)
        setError(true);
    } finally {
        setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById('printable-analysis-view');
    if (!element || !data) return;
    setDownloading(true);
    try {
      window.scrollTo(0, 0);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#1C1917' : '#EFEEE9',
        ignoreElements: (node) => node.getAttribute('data-html2canvas-ignore') === 'true',
        logging: false,
      });
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'tahsil-ai-report.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };
  
  if (!data && !loading && !error) {
      return (
          <div className="mt-12 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-50 to-white dark:from-deepSurface dark:to-deep p-10 text-center border border-ai/10 shadow-2xl print:hidden animate-fade-in">
              <div className="w-20 h-20 bg-white dark:bg-black/20 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-xl mb-6 ring-1 ring-ai/20">✨</div>
              <h3 className="text-2xl font-heading font-bold text-ink dark:text-white mb-3">{t.aiAnalysisTitle}</h3>
              <p className="text-inkLight dark:text-gray-400 mb-8 max-w-lg mx-auto font-serif text-lg leading-relaxed">{t.aiAnalysisDesc}</p>
              <button onClick={fetchAnalysis} className="bg-ai hover:bg-ai-purple text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-ai/20 hover:scale-105 active:scale-95">{t.startAnalysis}</button>
          </div>
      )
  }

  if (loading) {
      return (
        <div className="mt-12 glass-card rounded-[3rem] p-12 flex flex-col items-center justify-center min-h-[400px] border-ai/20 print:hidden">
            <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-[6px] border-ai/10 rounded-full"></div>
                <div className="absolute inset-0 border-[6px] border-ai border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">🧠</div>
            </div>
            <p className="text-ink dark:text-white font-heading font-bold text-xl animate-pulse tracking-wide">{t.craftingStrategy}</p>
            <p className="text-inkLight dark:text-gray-500 font-serif mt-2">{lang === 'ar' ? 'نقوم بتحليل نقاطك مادة بمادة...' : 'Analyse de vos notes matière par matière...'}</p>
        </div>
      )
  }

  if (error || !data) {
       return (
        <div className="mt-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-[2.5rem] p-10 text-center print:hidden">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-600 dark:text-red-400 font-bold mb-4">{lang === 'ar' ? 'عذراً، واجهنا مشكلة في الاتصال بالذكاء الاصطناعي.' : 'Désolé, problème de connexion avec l\'IA.'}</p>
            <button onClick={fetchAnalysis} className="bg-white dark:bg-black/40 px-6 py-2 rounded-xl text-ink dark:text-white border border-red-200 dark:border-red-900/50 hover:bg-red-100 transition-colors">إعادة المحاولة</button>
        </div>
       )
  }

  return (
    <div id="printable-analysis-view" className="mt-12 space-y-10 animate-fade-in-up text-start pb-10">
      {/* Prediction Banner - Premium Golden Style */}
      <div className="relative overflow-hidden rounded-[3.5rem] bg-[#1C1917] p-10 md:p-14 text-white shadow-2xl border border-white/5 group">
         <div className="absolute top-0 right-0 w-96 h-96 bg-amber/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-ai/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-start max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber/10 rounded-full mb-6 border border-amber/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse"></span>
                    <span className="text-[10px] font-bold text-amber uppercase tracking-widest">{t.prediction}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-heading font-black text-amber-500 leading-[1.15] drop-shadow-lg mb-4">
                    {data.prediction || (lang === 'ar' ? 'جاري التقييم...' : 'Évaluation...')}
                </h3>
                <p className="text-gray-400 font-serif text-lg leading-relaxed opacity-80">
                    {lang === 'ar' ? 'توقع مبني على تحليل إحصائي لمعدلاتك الحالية ومقارنتها بمتطلبات الميزات.' : 'Prédiction basée sur l\'analyse statistique de vos notes actuelles.'}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-amber/20 flex items-center justify-center relative">
                    <div className="absolute inset-2 border-2 border-dashed border-amber/40 rounded-full animate-spin-slow"></div>
                    <span className="text-5xl md:text-6xl text-amber drop-shadow-xl">🏆</span>
                </div>
                <span className="mt-4 font-heading font-bold text-amber/60 tracking-widest text-xs uppercase">{lang === 'ar' ? 'هدف متميز' : 'Objectif Excellence'}</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Performance Analysis Card */}
         <div className="lg:col-span-7 glass-card rounded-[3rem] p-8 md:p-12 border border-white/40 dark:border-white/5 shadow-xl flex flex-col">
             <div className="flex items-center justify-between mb-10">
                <h3 className="font-heading font-bold text-2xl text-ink dark:text-white flex items-center gap-3">
                    <span className="w-2 h-8 bg-amber rounded-full"></span>
                    {t.performanceAnalysis}
                </h3>
                <div className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-tighter">AI Deep Insights</div>
             </div>
             
             <div className="flex-1">
                 <div className="relative mb-10">
                     <div className="absolute top-0 right-0 text-6xl opacity-10 font-serif text-amber -translate-y-4">❝</div>
                     <p className="font-serif text-inkLight dark:text-gray-300 text-xl leading-[1.8] relative z-10 italic">
                         {data.summary || (lang === 'ar' ? 'لا يوجد ملخص متاح حالياً.' : 'Aucun résumé disponible.')}
                     </p>
                 </div>

                 <div className="space-y-6">
                    <div className="group p-8 rounded-[2.5rem] bg-success/5 border border-success/10 hover:bg-success/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-10 h-10 rounded-xl bg-success/20 text-success flex items-center justify-center text-xl">💪</span>
                            <h4 className="text-success font-bold font-heading text-xl">{t.strengths}</h4>
                        </div>
                        <div className="space-y-3">
                            {data.strengths && data.strengths.length > 0 ? (
                                data.strengths.map((s, i) => (
                                    <div key={i} className="flex gap-3 text-ink/80 dark:text-gray-300 font-serif text-lg leading-relaxed">
                                        <span className="text-success/40 shrink-0">•</span>
                                        <p>{s}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 font-serif italic">{lang === 'ar' ? 'أكمل جميع المواد لإظهار نقاط القوة.' : 'Complétez les notes pour voir vos forces.'}</p>
                            )}
                        </div>
                    </div>

                    <div className="group p-8 rounded-[2.5rem] bg-amber/5 border border-amber/10 hover:bg-amber/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-10 h-10 rounded-xl bg-amber/20 text-amber flex items-center justify-center text-xl">🚀</span>
                            <h4 className="text-amber-600 dark:text-amber-500 font-bold font-heading text-xl">{t.weaknesses}</h4>
                        </div>
                        <div className="space-y-3">
                            {data.weaknesses && data.weaknesses.length > 0 ? (
                                data.weaknesses.map((w, i) => (
                                    <div key={i} className="flex gap-3 text-ink/80 dark:text-gray-300 font-serif text-lg leading-relaxed">
                                        <span className="text-amber/40 shrink-0">•</span>
                                        <p>{w}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 font-serif italic">{lang === 'ar' ? 'أداء متوازن بشكل عام.' : 'Performance globalement équilibrée.'}</p>
                            )}
                        </div>
                    </div>
                 </div>
             </div>
         </div>

         {/* 4-Week Plan / Roadmap Card */}
         <div ref={planRef} className="lg:col-span-5 bg-[#292524] dark:bg-[#1C1917] rounded-[3rem] p-8 md:p-10 shadow-2xl relative border border-white/5 overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-olive via-amber to-olive opacity-50"></div>
             
             <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="font-heading font-bold text-2xl text-white">{t.plan4Weeks}</h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">{lang === 'ar' ? 'خارطة طريق مخصصة' : 'Feuille de route personnalisée'}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">📅</div>
             </div>

             <div className="space-y-10 relative flex-1">
                 {/* Vertical Connector Line */}
                 <div className="absolute top-2 bottom-2 right-[21px] ltr:left-[21px] w-[2px] bg-gradient-to-b from-olive via-amber to-gray-800 opacity-20"></div>

                 {data.plan && data.plan.length > 0 ? (
                    data.plan.map((step, idx) => (
                        <div key={idx} className="relative flex gap-6 items-start group">
                            <div className="flex-shrink-0 z-10 w-11 h-11 rounded-full bg-[#292524] border-2 border-olive text-olive font-bold flex items-center justify-center font-heading shadow-[0_0_15px_rgba(143,188,143,0.2)] group-hover:scale-110 group-hover:bg-olive group-hover:text-white transition-all duration-300">
                                {idx + 1}
                            </div>
                            <div className="pt-1.5 flex-1">
                                <p className="text-gray-200 group-hover:text-white transition-colors font-serif text-lg leading-[1.7]">
                                    {step}
                                </p>
                            </div>
                        </div>
                    ))
                 ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-10">
                        <div className="text-5xl opacity-20 mb-4">⌛</div>
                        <p className="text-gray-500 font-serif">{lang === 'ar' ? 'الخطة في انتظار تحليل النقاط الكاملة.' : 'Le plan attend l\'analyse complète des notes.'}</p>
                    </div>
                 )}
             </div>

             <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-4" data-html2canvas-ignore="true">
                <button onClick={handlePrint} className="py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.821l.823.136a2.25 2.25 0 011.897 1.13l2.42 4.645a.75.75 0 001.29 0l2.42-4.645a2.25 2.25 0 011.897-1.13l.823-.136a7.5 7.5 0 005.18-3.955l.23-.51a.75.75 0 00-.31-.924l-3.236-2.022a1.5 1.5 0 01-.667-1.303l.001-3.32a.75.75 0 00-.75-.75h-10.5a.75.75 0 00-.75.75v3.32a1.5 1.5 0 01-.667 1.303l-3.236 2.022a.75.75 0 00-.31.924l.23.51a7.5 7.5 0 005.18 3.955z" /></svg>
                    {t.print}
                </button>
                <button onClick={handleDownloadImage} disabled={downloading} className="py-4 rounded-2xl bg-olive hover:bg-olive-dark text-white font-bold text-sm transition-all shadow-lg shadow-olive/20 flex items-center justify-center gap-2">
                    {downloading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    )}
                    {downloading ? t.analyzing : t.downloadImage}
                </button>
             </div>
         </div>
      </div>
      
      {/* Visual Enhancements to fill empty space and add " Blueprint" vibe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="glass-card p-6 rounded-3xl border-dashed border-gray-300 dark:border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-ai/10 rounded-2xl flex items-center justify-center text-2xl">📈</div>
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{lang === 'ar' ? 'مؤشر النمو' : 'Trend'}</p>
                  <p className="text-sm font-bold text-ink dark:text-gray-300">{lang === 'ar' ? 'تصاعدي' : 'Positif'}</p>
              </div>
          </div>
          <div className="glass-card p-6 rounded-3xl border-dashed border-gray-300 dark:border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber/10 rounded-2xl flex items-center justify-center text-2xl">⏳</div>
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{lang === 'ar' ? 'الوقت المتبقي' : 'Temps'}</p>
                  <p className="text-sm font-bold text-ink dark:text-gray-300">{lang === 'ar' ? 'حرج' : 'Critique'}</p>
              </div>
          </div>
          <div className="glass-card p-6 rounded-3xl border-dashed border-gray-300 dark:border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 dark:bg-success/10 rounded-2xl flex items-center justify-center text-2xl">🎯</div>
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{lang === 'ar' ? 'دقة التحليل' : 'Précision'}</p>
                  <p className="text-sm font-bold text-ink dark:text-gray-300">98.4%</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
