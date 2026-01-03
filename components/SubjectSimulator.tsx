
import React, { useState, useEffect } from 'react';
import { Language, translations } from '../translations';



type CalcResult =
  | { type: 'current'; val: number }
  | { type: 'needed'; val: number };

export function calculateResult(
  grades: Record<string, number>,
  disabled: Record<string, boolean>,
  target: number,
  actWeight: number,
  hasActivities: boolean,
  numAssessments: number
): CalcResult {
  const testWeight = 1 - (hasActivities ? actWeight : 0);

  console.log("grades,,,,,,,",grades)
  const tests: number[] = [];
  let act = 0;

  let missingTest = false;
  let missingAct = false;

  for (let i = 1; i <= numAssessments; i++) {
    const key = `t${i}`;
    if (disabled[key]) missingTest = true;
    tests.push(parseFloat(grades[key]) ?? 0);
  }


  if (hasActivities) {
    if (disabled.act) missingAct = true;
    else act = parseFloat(grades.act) ?? 0;
  }

  const sumTests = tests.reduce((a, b) => a + b, 0);
  const avgTests = tests.length ? sumTests / tests.length : 0;

  if (missingTest) {
    console.log(target, act , actWeight , testWeight , tests,sumTests)
    const needed = ((target - (act*actWeight)) / testWeight ) * tests.length - sumTests
    return { type: 'needed', val: needed };

  }

  if (missingAct && hasActivities) {
    const needed =
      (target - avgTests * testWeight) / actWeight;
    return { type: 'needed', val: needed };
  }

  return {
    type: 'current',
    val: avgTests * testWeight + act * actWeight,
  };
}


interface SubjectSimulatorProps {
  onBack: () => void;
  lang: Language;
}

export const SubjectSimulator: React.FC<SubjectSimulatorProps> = ({ onBack, lang }) => {
  const t = translations[lang];

  // Config
  const [name, setName] = useState('');
  const [coeff, setCoeff] = useState(2);
  const [numAssessments, setNumAssessments] = useState(2);
  const [hasActivities, setHasActivities] = useState(true);
  const [actWeight, setActWeight] = useState(0.25);
  const [target, setTarget] = useState(10);

  // Values
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [disabledGrades, setDisabledGrades] = useState<Record<string, boolean>>({});



   const  handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: string) => {
    const value = e.target.value;


    if(value ===""){
      setGrades({...grades ,[i] : 0 })
      return;
    }

    if (!/^\d*\.?\d*$/.test(e.target.value)) return;
    if (parseFloat(e.target.value) > 20) return; 

    // const updated = assessments.map(a => a.id === id ? { ...a, value } : a);
    // onUpdate(subject.id, updated, activitiesMark, isPending);
    setGrades({...grades ,[i] : e.target.value })
  };

  useEffect(()=>{

      setGrades(prev=>{
        const next = {...prev};
        for (let i = 1 ; i <= numAssessments ; i++){
          if (next[`t${i}`]===undefined) next[`t${i}`] = 0;
        }

        if(hasActivities && next.act === undefined) next.act = 0
        
        return next
      })

  },[numAssessments , hasActivities])



  const updateCoeff = (value: string) => {

    if (!/^\d*$/.test(value)) return;
    if (parseInt(value) <= 0 || parseInt(value) > 20) return; 

    setCoeff(value);

  }


console.log(coeff)

  const result = calculateResult(
    grades ,
    disabledGrades,
    target,
    actWeight,
    hasActivities,
    numAssessments
  );
  const isImpossible = result.type === 'needed' && result.val > 20;

  return (
    <div className="animate-fade-in-up max-w-4xl mx-auto pb-20">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-olive dark:text-olive-light font-medium hover:opacity-80 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 rtl:rotate-180 ltr:rotate-0"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        {t.back}
      </button>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-heading font-black text-ink dark:text-white mb-2">{lang === 'ar' ? 'لؤلؤة التوقعات' : 'Perle des Prévisions'}</h2>
        <p className="text-inkLight dark:text-gray-400 font-serif text-lg">{lang === 'ar' ? 'حدد هدفك في المادة وسنخبرك بما تحتاجه بدقة' : 'Fixez votre objectif et laissez la perle calculer le reste.'}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Settings Pearl (Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
           <div className="relative p-6 rounded-[2.5rem] bg-gradient-to-br from-white via-indigo-50/30 to-pink-50/30 dark:from-white/5 dark:to-transparent backdrop-blur-xl border border-white/60 dark:border-white/5 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/40 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
              <h3 className="font-heading font-black text-sm uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-olive animate-pulse"></span> {lang === 'ar' ? 'إعدادات المادة' : 'Configuration'}
              </h3>
              
              <div className="space-y-5">
                <div className="text-start">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">{t.subjectName}</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="..." className="w-full h-11 px-4 rounded-xl bg-white/50 dark:bg-black/20 border-none outline-none font-bold text-ink dark:text-white" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-start">
                   <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">{t.coefficient}</label>
                    <input type="number" value={coeff}  onChange={e => updateCoeff(e.target.value)} 
                    className="w-full h-11 px-4 rounded-xl bg-white/50 dark:bg-black/20 border-none outline-none font-bold text-center
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                   </div>
                   <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block">{lang === 'ar' ? 'الفروض' : 'Devoirs'}</label>
                    <div className="flex bg-white/50 dark:bg-black/20 rounded-xl p-1 h-11 items-center">
                        <button onClick={() => {
                          if(numAssessments<=1) return;

                          const updatedGrades =Object.fromEntries( Object.entries(grades).filter(([key,_])=>key!==`t${numAssessments}`));
                          setGrades(updatedGrades)
                          setNumAssessments(Math.max(1, numAssessments-1))

                          }} className="w-8 h-full flex items-center justify-center font-black">-</button>
                        <span className="flex-1 text-center font-black">{numAssessments}</span>
                        <button onClick={() => {
                            if (numAssessments >= 5) return;
                          setNumAssessments(Math.min(5, numAssessments+1));
                          const updatedGrades = Object.fromEntries([...Object.entries(grades), [`t${numAssessments+1}`,0]]);
                          setGrades(updatedGrades)

                          }} className="w-8 h-full flex items-center justify-center font-black">+</button>

                    </div>
                   </div>
                </div>

                <div className="pt-2">
                    <button onClick={() => setHasActivities(!hasActivities)} className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${hasActivities ? 'bg-olive text-white shadow-lg shadow-olive/20' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${hasActivities ? 'bg-white animate-pulse' : 'bg-gray-300'}`}></div>
                        {lang === 'ar' ? 'الأنشطة المندمجة' : 'Activités'}
                    </button>
                    {hasActivities && (
                        <div className="mt-4 px-2 animate-fade-in">
                            <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase mb-2">
                                <span>{lang === 'ar' ? 'وزن الأنشطة' : 'Poids Act.'}</span>
                                <span>{Math.round(actWeight * 100)}%</span>
                            </div>
                            <input type="range" min="0.1" max="0.5" step="0.05" value={actWeight} onChange={e => setActWeight(parseFloat(e.target.value))} className="w-full h-1.5 accent-olive bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer" />
                        </div>
                    )}
                </div>
              </div>
           </div>

           {/* The Target Orb */}
           <div className=" relative p-8 rounded-[3rem] bg-gradient-to-br from-[#1C1917] to-black text-white shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber/10 via-transparent to-transparent opacity-50"></div>
              <div className="relative z-10 flex flex-col items-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-4">{lang === 'ar' ? 'المعدل المستهدف' : 'Objectif Global'}</p>
                  <div className="text-6xl font-heading font-black mb-6 tabular-nums">{target.toFixed(2)}</div>
                  <input type="range" min="0" max="20" step="0.25" value={target} onChange={e => setTarget(parseFloat(e.target.value))} className="w-full accent-amber cursor-pointer" />
                  <div className="mt-4 text-[9px] text-gray-500 italic">{lang === 'ar' ? 'حرك اللؤلؤة لتغيير الهدف' : 'Faites glisser pour changer'}</div>
              </div>
           </div>
        </div>

        {/* Input Pearl Cards */}
        <div className="lg:col-span-8 space-y-8  ">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
              {Array.from({length: numAssessments}).map((_, i) => (
                <div key={i} className={`relative p-6 rounded-[2.5rem] bg-white/70 dark:bg-black/40  backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg transition-all duration-500 ${disabledGrades[`t${i+1}`] ? 'dark:bg-gray-900 bg-gray-900' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{lang === 'ar' ? `الفرض ${i+1}` : `Devoir ${i+1}`}</span>
                        <button onClick={() => {
                            const newState = { [`t${i+1}`]: !disabledGrades[`t${i+1}`] };
                            setDisabledGrades(newState); // Only one can be missing for "needed" logic
                            setGrades(prevGrades=>({...prevGrades,[`t${i+1}`]  : 0 }))
                        }} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${disabledGrades[`t${i+1}`] ? 'bg-ai text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-ai'}`}>
                            {disabledGrades[`t${i+1}`] ? '✨' : '?'}
                        </button>
                    </div>
                    <div className="relative">
                        <input 
                            disabled={disabledGrades[`t${i+1}`]}
                            type="number" 
                            value={disabledGrades[`t${i+1}`] ? (result.type === 'needed' && result.val>=0 ? result.val.toFixed(2) : '...') : (grades[`t${i+1}`] || '')} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                              console.log('onChange triggered'); // Debug
                              handleChange(e, `t${i+1}`);
                            }}
                            placeholder="00.00"
                            className={`w-full h-16  rounded-2xl bg-white dark:bg-black/40 text-center font-heading font-black text-2xl transition-all border-none outline-none ${disabledGrades[`t${i+1}`] ? 'text-ai bg-ai/5' : 'text-ink dark:text-white'}  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none` }
                        />
                        {/* {disabledGrades[`t${i+1}`] && <div className="absolute inset-0 bg-white/5 animate-shimmer pointer-events-none rounded-2xl z-1"></div>} */}
                    </div>
                </div>
              ))}

              {hasActivities && (
                <div className={`relative p-6 rounded-[2.5rem] bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg transition-all duration-500 ${disabledGrades['act'] ? 'dark:bg-green-900 bg-green-900' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{t.activities}</span>
                        <button onClick={() => setDisabledGrades({ 'act': !disabledGrades['act'] })} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${disabledGrades['act'] ? 'bg-ai text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-ai'}`}>
                            {disabledGrades['act'] ? '✨' : '?'}
                        </button>
                    </div>
                    <div className="relative">
                        <input 
                            disabled={disabledGrades['act']}
                            type="number" 
                            value={disabledGrades['act'] ? (result.type === 'needed' ? result.val.toFixed(2) : '...') : (grades['act'] || 0)} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "act")}
                            placeholder="00.00"
                            className={`w-full h-16 rounded-2xl bg-white dark:bg-black/40 text-center font-heading font-black text-2xl transition-all border-none outline-none ${disabledGrades['act'] ? 'text-ai bg-ai/5' : 'text-ink dark:text-white'}
                            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                        />
                    </div>
                </div>
              )}
           </div>

           {/* Result Pearl */}
           <div className={`relative  overflow-hidden rounded-[3.5rem] p-10 text-center transition-all duration-700 shadow-2xl ${isImpossible ? 'bg-red-500 text-white' : 'bg-white dark:bg-[#292524] border border-white/60'}`}>
                {Object.keys(disabledGrades).some(k => disabledGrades[k]) ? (
                    <div className="animate-fade-in">
                        {isImpossible ? (
                            <>
                                <div className="text-4xl mb-4">🚫</div>
                                <h3 className="text-2xl font-heading font-black mb-2">{lang === 'ar' ? 'هدف مستحيل حالياً' : 'Objectif Impossible'}</h3>
                                <p className="font-serif opacity-80">{lang === 'ar' ? `تحتاج إلى ${result.val.toFixed(2)} وهذا غير ممكن.` : `Il vous faut ${result.val.toFixed(2)}.`}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">{lang === 'ar' ? 'تحتاج في المكون المفقود إلى:' : 'Note requise dans le champ manquant:'}</p>
                                <div className="flex items-center justify-center gap-4">
                                    <div className={`text-8xl font-heading font-black tracking-tighter tabular-nums ${result.val > 15 ? 'text-orange-500' : result.val > 10 ? 'text-ai' : 'text-success'}`}>{Math.max(0, result.val).toFixed(2)}</div>
                                    <span className="text-2xl text-gray-300 font-light pt-8">/ 20</span>
                                </div>
                                <div className="mt-8 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-ai/10 text-ai text-[10px] font-black uppercase tracking-widest">
                                    {result.val <= 0 ? (lang === 'ar' ? 'النجاح مضمون!' : 'Succès Garanti!') : (lang === 'ar' ? 'بالتوفيق في الدراسة' : 'Bonne chance')}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">{lang === 'ar' ? 'المعدل الحالي للمادة' : 'Moyenne Actuelle'}</p>
                        <div className="flex items-center justify-center gap-2 pt-6 md:pt-0">
                            <div className="text-8xl font-heading font-black tracking-tighter tabular-nums text-ink dark:text-white">{result.val.toFixed(2)}</div>
                            <span className="text-2xl text-gray-300 font-light pt-8">/ 20</span>
                        </div>
                        <div className="mt-4 text-sm font-serif italic text-gray-500">{lang === 'ar' ? 'اضغط على علامة الاستفهام أعلاه لتعطيل إدخال وتوقع نتيجته.' : 'Désactivez une note pour voir ce qu\'il vous manque.'}</div>
                       
                        <div className={`${result.val >= target ? "bg-success/10 text-success" : "bg-ai/10 text-ai"} mt-4 inline-flex items-center gap-2 px-6 py-4 rounded-full   text-[15px] font-black uppercase tracking-widest`}>
                                    {result.val >= target ? (lang === 'ar' ? '🎉 هدفك محقق' : '🎉 Objectif Atteint') : (lang === 'ar' ? '🚧 أقل من الهدف' : "🚧 Sous l'objectif")}
                        </div>
                    </div>
                )}

                 <div className=" wavy-circle flex justify-center items-center absolute bg-gradient-to-br  from-black/10  via-amber-300 to-black/10 shadow-2xl shadow-amber/40 top-0 right-0 m-2">
                          
                          <div>
                          <h2 className="font-bold text-amber-900 text-xl">{((result.val * (coeff ?  parseFloat(coeff) : 1 ) )).toFixed(2)}</h2>
                            <p className="text-md text-amber-800">pt</p>
                          </div>
                  </div>
                
                {/* Decorative Pearl Glow */}
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-ai/5 rounded-full blur-[60px]"></div>
           </div>
        </div>
      </div>
    </div>
  );
};
