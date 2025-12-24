
import React, { useState, useEffect } from 'react';
import { Subject, Assessment } from '../types';
import { Language, translations } from '../translations';
import { ConfirmDialog } from './confirmDialogue';


interface GradeInputRowProps {
  subject: Subject;
  assessments: Assessment[];
  activitiesMark?: string;
  isPending?: boolean;
  onUpdate: (subjectId: string, assessments: Assessment[], activitiesMark?: string, isPending?: boolean) => void;
  onDeleteSubject?: () => void;
  isCustomMode?: boolean;
  isExamMode?: boolean;
  onUpdateSubjectDetails?: (id: string, name: string, coeff: number, hasActivities: boolean) => void;
  lang: Language;
}

export const GradeInputRow: React.FC<GradeInputRowProps> = ({ 
    subject, 
    assessments, 
    activitiesMark, 
    isPending = false, 
    onUpdate, 
    onDeleteSubject,
    isCustomMode = false,
    isExamMode = false,
    onUpdateSubjectDetails,
    lang
}) => {
  const t = translations[lang];
  const [localName, setLocalName] = useState(subject.name);
  const [localCoeff, setLocalCoeff] = useState(subject.coefficient.toString());
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  


  useEffect(() => {
      setLocalName(subject.name);
      setLocalCoeff(subject.coefficient.toString());
  }, [subject.name, subject.coefficient]);

  const handleAddAssessment = () => {
    if (assessments.length >= 5) return;
    const newId = Math.random().toString(36).substr(2, 9);
    const count = assessments.length + 1;
    const label = lang === 'ar' ? `فرض ${count}` : `Devoir ${count}`;
    const newAssessment: Assessment = { id: newId, label, value: '' };
    onUpdate(subject.id, [...assessments, newAssessment], activitiesMark, isPending);
  };

  const handleRemoveAssessment = (id: string) => {
    onUpdate(subject.id, assessments.filter(a => a.id !== id), activitiesMark, isPending);
  };

  const handleChange = (id: string, value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) return;
    if (parseFloat(value) > 20) return; 
    const updated = assessments.map(a => a.id === id ? { ...a, value } : a);
    onUpdate(subject.id, updated, activitiesMark, isPending);
  };

  const handleActivitiesChange = (value: string) => {
      if (!/^\d*\.?\d*$/.test(value)) return;
      if (parseFloat(value) > 20) return;
      onUpdate(subject.id, assessments, value, isPending);
  }

  const togglePending = () => {
      onUpdate(subject.id, assessments, activitiesMark, !isPending);
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onDeleteSubject) {
      // setShowDeleteModal(true)
      // const message = lang === 'ar' ? `هل أنت متأكد من حذف مادة "${subject.name}"؟` : `Voulez-vous supprimer "${subject.name}" ?`;
      // if (window.confirm(message)) {
        onDeleteSubject();
      // }
    }
  };

  const handleBlurName = () => {
      if (onUpdateSubjectDetails && localName.trim() !== "") {
          onUpdateSubjectDetails(subject.id, localName, subject.coefficient, subject.hasActivities ?? true);
      }
  };

  const handleBlurCoeff = () => {
      if (onUpdateSubjectDetails) {
          const val = parseFloat(localCoeff) || 1;
          onUpdateSubjectDetails(subject.id, subject.name, val, subject.hasActivities ?? true);
      }
  };

  const toggleActivities = () => {
      if (onUpdateSubjectDetails) {
          onUpdateSubjectDetails(subject.id, subject.name, subject.coefficient, !(subject.hasActivities ?? true));
      }
  };

  const showActivities = isExamMode ? false : (subject.hasActivities ?? true);

  return (
    <>
    
    <div className={`glass-card rounded-[2rem] p-6 md:p-8 transition-all relative ${isPending ? 'opacity-90' : 'hover:-translate-y-1'}`}>
      {onDeleteSubject && (
        <button type="button" onClick={handleDeleteClick} className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-danger rounded-full transition-all z-50`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
        </button>
      )}


      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
        <div className="md:w-1/4 flex flex-col justify-center w-full text-start">
            {isCustomMode ? (
                <div className="space-y-3 mb-4 md:mb-0">
                    <div>
                        <label className="text-xs text-gray-400 font-bold mb-1 block">{t.subjectName}</label>
                        <input type="text" value={localName} onChange={(e) => setLocalName(e.target.value)} onBlur={handleBlurName} className="w-full bg-transparent border-b-2 font-heading font-bold text-lg outline-none pb-1" />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold mb-1 block">{t.coefficient}</label>
                        <input type="number" value={localCoeff} onChange={(e) => setLocalCoeff(e.target.value)} onBlur={handleBlurCoeff} className="w-full bg-transparent border-b-2 text-center outline-none" />
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="text-xl font-heading font-bold text-ink dark:text-gray-100 mb-2">{subject.name}</h3>
                    <div className="text-sm font-serif text-inkLight dark:text-gray-400">{t.coefficient}: {subject.coefficient}</div>
                </>
            )}
            
            <div className="flex flex-wrap gap-2 mt-4">
                <button type="button" onClick={togglePending} className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${isPending ? 'bg-amber text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-400'}`}>
                    {isPending ? <span>{t.isPending}</span> : <span>{t.pending}</span>}
                </button>
                
                {!isExamMode && (
                    <button type="button" onClick={toggleActivities} className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${showActivities ? 'bg-olive/10 border border-olive/30 text-olive' : 'bg-gray-100 dark:bg-white/10 text-gray-400'}`}>
                        {showActivities ? (lang === 'ar' ? 'الأنشطة: مفعلة' : 'Activités: ON') : (lang === 'ar' ? 'بدون أنشطة' : 'Sans activités')}
                    </button>
                )}
            </div>
        </div>

        <div className={`flex-1 w-full transition-opacity duration-300 ${isPending ? 'opacity-40 pointer-events-none grayscale' : 'opacity-100'}`}>
          <div className={`grid grid-cols-1 ${isExamMode ? 'md:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-5`}>
            {assessments.map((assessment) => (
              <div key={assessment.id} className="relative text-start">
                <label className="block text-xs text-inkLight/70 dark:text-gray-500 mb-2 mr-2 font-medium">{isExamMode ? (lang === 'ar' ? 'نقطة الامتحان' : 'Note Examen') : assessment.label}</label>
                <div className="relative">
                  <input type="text" inputMode="decimal" value={isPending ? '---' : assessment.value} onChange={(e) => handleChange(assessment.id, e.target.value)} placeholder="00" className="w-full h-14 pl-6 pr-12 rounded-2xl bg-white/50 dark:bg-black/20 text-center font-sans font-semibold text-lg outline-none" />
                  {!isPending && !isExamMode && assessments.length > 1 && (
                    <button type="button" onClick={() => handleRemoveAssessment(assessment.id)} className={`absolute top-1/2 ${lang === 'ar' ? 'right-3' : 'left-3'} -translate-y-1/2 text-gray-300 hover:text-danger p-1.5`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                  )}
                </div>
              </div>
            ))}
            {showActivities && (
                <div className="relative text-start animate-fade-in">
                    <label className="block text-xs text-olive mb-2 mr-2 font-medium">{t.activities}</label>
                    <div className="relative">
                        <input type="text" inputMode="decimal" value={isPending ? '---' : (activitiesMark || '')} onChange={(e) => handleActivitiesChange(e.target.value)} placeholder="00" className="w-full h-14 pl-6 pr-12 rounded-2xl bg-olive/5 border border-olive/10 text-center font-sans font-semibold text-lg outline-none focus:border-olive/30 transition-all" />
                    </div>
                </div>
            )}
            {!isPending && !isExamMode && assessments.length < 5 && (
                <div className="flex items-end">
                    <button type="button" onClick={handleAddAssessment} className="h-14 w-full rounded-2xl border border-dashed border-gray-300 text-gray-400 hover:text-olive hover:bg-olive/5 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                        <span>{t.addAssessment}</span>
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>

    </>
  );
};
