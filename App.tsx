
import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Stepper } from './components/Stepper';
import { GradeInputRow } from './components/GradeInputRow';
import { AIAnalysis } from './components/AIAnalysis';
import { CoachTips } from './components/CoachTips';
import { Toast } from './components/Toast';
import { LandingPage } from './components/LandingPage';
import { CountdownPage } from './components/CountdownPage';
import { AppStep, Level, Stream, GradeMap, Subject, AnalysisResult } from './types';
import { STREAMS_1BAC, STREAMS_2BAC, EXTRA_SUBJECTS } from './constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { translations, Language } from './translations';

import {NotFound} from './components/NotFound';

import html2canvas from 'html2canvas';

import {Routes, Route} from 'react-router-dom';
import { MainApp } from './components/MainAPP';
import PrivacyPolicy from './components/PrivacyPolicy';

import axios from 'axios';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LEVEL_SELECT);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [calcMode, setCalcMode] = useState<'continuous' | 'general' | 'simulator' | 'national_exam' | 'regional_exam' | 'custom_exam' | null>(null);
  const [examYear, setExamYear] = useState<string>(new Date().getFullYear().toString());
  
  const t = translations[lang];

  // General Bac Calculation States
  const [nationalGrade, setNationalGrade] = useState<string>('');
  const [regionalGrade, setRegionalGrade] = useState<string>('');
  const [continuousGrade, setContinuousGrade] = useState<string>('');
  
  // New States for Semesters
  const [s1Continuous, setS1Continuous] = useState<string>('');
  const [s2Continuous, setS2Continuous] = useState<string>('');
  const [continuousInputMode, setContinuousInputMode] = useState<'annual' | 'semesters'>('annual');

  const [isAnalyzingSchools, setIsAnalyzingSchools] = useState(false);
  const [schoolAnalysis, setSchoolAnalysis] = useState<AnalysisResult | null>(null);
  const [isDownloadingSchools, setIsDownloadingSchools] = useState(false);

  // National & Regional Exam States
  const [nationalExamGrades, setNationalExamGrades] = useState<Record<string, string>>({});
  const [regionalExamGrades, setRegionalExamGrades] = useState<Record<string, string>>({});

  // Simulator State
  const [simConfig, setSimConfig] = useState({
      national: true,
      regional: true,
      continuous: true
  });
  const [simTarget, setSimTarget] = useState<number>(10);

  // Custom Mode State
  const [showCustomIntro, setShowCustomIntro] = useState(false);
  const [isTemplateSaved, setIsTemplateSaved] = useState(false);
  const [customType, setCustomType] = useState<'continuous' | 'exam'>('continuous');
  const [activitiesWeight, setActivitiesWeight] = useState<number>(0.25);

  // State for active subjects
  const [activeSubjects, setActiveSubjects] = useState<Subject[]>([]);
  
  // UI States for Custom Selects
  const [isStreamDropdownOpen, setIsStreamDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMainStreamDropdownOpen, setIsMainStreamDropdownOpen] = useState(false);
  const [subjectToAdd, setSubjectToAdd] = useState<string>('');
  const [customCoefficient, setCustomCoefficient] = useState<string>('1');
  const [isExtraDropdownOpen, setIsExtraDropdownOpen] = useState(false);
  
  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const mainStreamRef = useRef<HTMLDivElement>(null);

  const [grades, setGrades] = useState<GradeMap>({});
  const [darkMode, setDarkMode] = useState(false);
  const [finalAverage, setFinalAverage] = useState<number>(0);
  
  // Coach Data
  const [coachData, setCoachData] = useState<{
      pendingSubjects: Subject[];
      currentTotalScore: number;
      completedCoeffs: number;
      totalCoeffs: number;
  }>({ pendingSubjects: [], currentTotalScore: 0, completedCoeffs: 0, totalCoeffs: 0 });

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
        document.documentElement.classList.add('dark');
    }
    
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) {
        setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Effect to calculate average of semesters
  useEffect(() => {
    if (continuousInputMode === 'semesters') {
        const s1 = parseFloat(s1Continuous);
        const s2 = parseFloat(s2Continuous);

        if (!isNaN(s1) && !isNaN(s2)) {
          setContinuousGrade(((s1 + s2) / 2).toFixed(2));
        }
    }
  }, [s1Continuous, s2Continuous, continuousInputMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExtraDropdownOpen(false);
      }
      if (streamRef.current && !streamRef.current.contains(event.target as Node)) {
        setIsStreamDropdownOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
      if (mainStreamRef.current && !mainStreamRef.current.contains(event.target as Node)) {
        setIsMainStreamDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
      const newMode = !darkMode;
      setDarkMode(newMode);
      localStorage.setItem('darkMode', String(newMode));
      if (newMode) {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  }

  useEffect(() => {
    if (selectedStream) {
      setActiveSubjects(selectedStream.subjects);
      
      const initialGrades: GradeMap = {};
      selectedStream.subjects.forEach(subject => {
        initialGrades[subject.id] = {
          assessments: [
            { id: '1', label: lang === 'ar' ? 'فرض 1' : 'Devoir 1', value: '' },
            { id: '2', label: lang === 'ar' ? 'فرض 2' : 'Devoir 2', value: '' }
          ],
          activitiesMark: '',
          isPending: false
        };
      });
      setGrades(initialGrades);

      const initialNationalGrades: Record<string, string> = {};
      selectedStream.subjects.forEach(subject => {
          initialNationalGrades[subject.id] = '';
      });
      setNationalExamGrades(initialNationalGrades);

      const initialRegionalGrades: Record<string, string> = {};
      selectedStream.subjects.forEach(subject => {
          initialRegionalGrades[subject.id] = '';
      });
      setRegionalExamGrades(initialRegionalGrades);

      setSubjectToAdd('');
      setCustomCoefficient('1');
    }
  }, [selectedStream, lang]);

  const handleStartApp = () => {
      setCurrentStep(AppStep.LEVEL_SELECT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLevel = (level: Level) => {
      setSelectedLevel(level);
      if (level === 'custom') {
          setCurrentStep(AppStep.CUSTOM_CHOICE);
      } else {
          setCurrentStep(AppStep.MODE_SELECT);
      }
  };

  const enterCustomMode = (type: 'continuous' | 'exam') => {
      setCustomType(type);
      
      if (type === 'continuous') {
        setCalcMode('continuous');
        setCurrentStep(AppStep.CUSTOM_MODE);
      } else {
        setCalcMode('custom_exam');
        setCurrentStep(AppStep.CUSTOM_EXAM_MODE);
      }
      
      const storageKey = type === 'continuous' ? 'tahsil_custom_template' : 'tahsil_custom_exam_template';

      const savedTemplate = localStorage.getItem(storageKey);
      if (savedTemplate) {
          try {
              const parsed = JSON.parse(savedTemplate);
              setActiveSubjects(parsed.subjects);
              
              if (parsed.activitiesWeight !== undefined) {
                  setActivitiesWeight(parsed.activitiesWeight);
              }

              if (parsed.grades) {
                  setGrades(parsed.grades);
              } else {
                  const initialGrades: GradeMap = {};
                  parsed.subjects.forEach((s: Subject) => {
                      initialGrades[s.id] = {
                          assessments: type === 'continuous' 
                            ? [{ id: '1', label: lang === 'ar' ? 'فرض 1' : 'Devoir 1', value: '' }]
                            : [{ id: 'exam', label: lang === 'ar' ? 'نقطة الامتحان' : 'Note Examen', value: '' }],
                          activitiesMark: '',
                          isPending: false
                      };
                  });
                  setGrades(initialGrades);
              }
              setIsTemplateSaved(true);
          } catch(e) {
              setActiveSubjects([]);
              setIsTemplateSaved(false);
          }
      } else {
          setActiveSubjects([]);
          const hasSeenIntro = localStorage.getItem(`tahsil_seen_custom_intro_${type}`);
          if (!hasSeenIntro) {
              setShowCustomIntro(true);
              localStorage.setItem(`tahsil_seen_custom_intro_${type}`, 'true');
          }
          setIsTemplateSaved(false);
      }
  };

  const handleAddCustomSubject = () => {
      const newId = `custom_${Date.now()}`;
      const newSubject: Subject = {
          id: newId,
          name: lang === 'ar' ? 'مادة جديدة' : 'Nouvelle matière',
          coefficient: 1,
          hasActivities: customType === 'continuous',
          isCustom: true
      };
      setActiveSubjects(prev => [...prev, newSubject]);
      
      const assessmentTemplate = customType === 'continuous' 
        ? [{ id: '1', label: lang === 'ar' ? 'فرض 1' : 'Devoir 1', value: '' }]
        : [{ id: 'exam', label: lang === 'ar' ? 'نقطة الامتحان' : 'Note Examen', value: '' }];

      setGrades(prev => ({
          ...prev,
          [newId]: {
              assessments: assessmentTemplate,
              activitiesMark: '',
              isPending: false
          }
      }));
      setIsTemplateSaved(false);
  };

  const handleUpdateSubjectDetails = (id: string, name: string, coeff: number, hasActivities: boolean) => {
      setActiveSubjects(prev => prev.map(s => s.id === id ? { ...s, name, coefficient: coeff, hasActivities } : s));
      setIsTemplateSaved(false);
  };

  const handleSaveTemplate = () => {
      if (activeSubjects.length === 0) {
          setToastMessage(lang === 'ar' ? 'لا توجد مواد لحفظها' : 'Aucune matière à sauvegarder');
          setShowToast(true);
          return;
      }
      const template = {
          date: new Date().toISOString(),
          subjects: activeSubjects,
          activitiesWeight: activitiesWeight
      };
      const storageKey = customType === 'continuous' ? 'tahsil_custom_template' : 'tahsil_custom_exam_template';
      localStorage.setItem(storageKey, JSON.stringify(template));
      setIsTemplateSaved(true);
      setToastMessage(lang === 'ar' ? 'تم حفظ القالب بنجاح!' : 'Modèle sauvegardé avec succès !');
      setShowToast(true); 
  };
  
  const handleSaveTemplateWithGrades = () => {
      if (activeSubjects.length === 0) {
          setToastMessage(lang === 'ar' ? 'لا توجد مواد لحفظها' : 'Aucune matière à sauvegarder');
          setShowToast(true);
          return;
      }
      const template = {
          date: new Date().toISOString(),
          subjects: activeSubjects,
          activitiesWeight: activitiesWeight,
          grades: grades
      };
      const storageKey = customType === 'continuous' ? 'tahsil_custom_template' : 'tahsil_custom_exam_template';
      localStorage.setItem(storageKey, JSON.stringify(template));
      setIsTemplateSaved(true);
      setToastMessage(lang === 'ar' ? 'تم حفظ القالب مع النقط بنجاح!' : 'Modèle et notes sauvegardés !');
      setShowToast(true);
  };

  const handleDeleteAllSubjects = () => {
      if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف جميع المواد؟' : 'Supprimer toutes les matières ?')) {
          setActiveSubjects([]);
          setGrades({});
          setIsTemplateSaved(false);
          setToastMessage(lang === 'ar' ? 'تم حذف جميع المواد' : 'Matières supprimées');
          setShowToast(true);
      }
  };

  const handleClearAllGrades = () => {
      if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من تفريغ جميع النقط؟' : 'Vider toutes les notes ?')) {
          setGrades(prev => {
              const newGrades = { ...prev };
              Object.keys(newGrades).forEach(key => {
                  if (newGrades[key]) {
                      newGrades[key] = {
                          ...newGrades[key],
                          assessments: newGrades[key].assessments.map(a => ({ ...a, value: '' })),
                          activitiesMark: ''
                      };
                  }
              });
              return newGrades;
          });
          setToastMessage(lang === 'ar' ? 'تم تفريغ النقط' : 'Notes vidées');
          setShowToast(true);
      }
  };
  
  const handleSelectMode = (mode: 'continuous' | 'general' | 'simulator' | 'national_exam' | 'regional_exam') => {
    setCalcMode(mode);
    if (mode === 'general') {
        setCurrentStep(AppStep.GENERAL_CALC);
    } else if (mode === 'simulator') {
        setCurrentStep(AppStep.SIMULATOR);
    } else {
        setCurrentStep(AppStep.STREAM_SELECT);
    }
  };

  const handleSelectStream = (stream: Stream) => {
    setSelectedStream(stream);
    setIsStreamDropdownOpen(false);
    setIsMainStreamDropdownOpen(false);
    
    if (currentStep === AppStep.STREAM_SELECT) {
        if (calcMode === 'continuous') {
            setCurrentStep(AppStep.GRADE_INPUT);
        } else if (calcMode === 'national_exam') {
            setCurrentStep(AppStep.NATIONAL_EXAM);
        } else if (calcMode === 'regional_exam') {
            setCurrentStep(AppStep.REGIONAL_EXAM);
        }
    }
  };

  const handleSelectExtraSubject = (id: string) => {
      setSubjectToAdd(id);
      const subject = EXTRA_SUBJECTS.find(s => s.id === id);
      if (subject) {
          setCustomCoefficient(subject.coefficient.toString());
      }
      setIsExtraDropdownOpen(false);
  }

  const handleAddExtraSubject = () => {
    if (!subjectToAdd) return;
    const subjectTemplate = EXTRA_SUBJECTS.find(s => s.id === subjectToAdd);
    if (subjectTemplate && !activeSubjects.find(s => s.id === subjectTemplate.id)) {
        const finalCoeff = parseFloat(customCoefficient) || subjectTemplate.coefficient;
        const newSubject: Subject = { ...subjectTemplate, coefficient: finalCoeff };
        setActiveSubjects(prev => [...prev, newSubject]);
        setGrades(prev => ({
            ...prev,
            [newSubject.id]: {
                assessments: [{ id: '1', label: lang === 'ar' ? 'فرض 1' : 'Devoir 1', value: '' }],
                activitiesMark: '',
                isPending: false
            }
        }));
        setSubjectToAdd('');
        setCustomCoefficient('1');
    }
  };

  const handleDeleteSubject = (subjectId: string) => {
      setActiveSubjects(prev => prev.filter(s => s.id !== subjectId));
      setGrades(prev => {
          const nextGrades = { ...prev };
          delete nextGrades[subjectId];
          return nextGrades;
      });
      setIsTemplateSaved(false);
  };

  const handleUpdateGrades = (subjectId: string, assessments: any[], activitiesMark?: string, isPending?: boolean) => {
    setGrades(prev => ({
      ...prev,
      [subjectId]: { assessments, activitiesMark, isPending }
    }));
  };

  const handleNationalExamInput = (subjectId: string, value: string) => {
      if (!/^\d*\.?\d*$/.test(value)) return;
      if (parseFloat(value) > 20) return;
      setNationalExamGrades(prev => ({
          ...prev,
          [subjectId]: value
      }));
  };

  const handleRegionalExamInput = (subjectId: string, value: string) => {
      if (!/^\d*\.?\d*$/.test(value)) return;
      if (parseFloat(value) > 20) return;
      setRegionalExamGrades(prev => ({
          ...prev,
          [subjectId]: value
      }));
  };


  const calculateGeneralBacResult = async () => {
      if (!selectedStream) {
          alert(lang === 'ar' ? "الرجاء اختيار الشعبة أولاً" : "Veuillez choisir une filière");
          return;
      }
      const en = parseFloat(nationalGrade) || 0;
      const er = parseFloat(regionalGrade) || 0;
      const cc = parseFloat(continuousGrade) || 0;
      const avg = (en * 0.5) + (er * 0.25) + (cc * 0.25);
      setFinalAverage(avg);
      setCurrentStep(AppStep.RESULTS);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setIsAnalyzingSchools(true);
      try {
        

        const response = await axios.post(
            `${import.meta.env.VITE_TAHSIL_BACKEND_URL}school-suggestions`,
            {avg,stream: selectedStream.name,examYear,lang},
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_TAHSIL_AUTH_KEY}`,
                    "Content-Type" : "application/json",
                }
            }
        )

        const suggestions = await response.data
        setSchoolAnalysis(suggestions);


      } catch (err) {
          console.error(err);
      } finally {
          setIsAnalyzingSchools(false);
      }
  };

  const calculateNationalExamResult = () => {
      if (!selectedStream) return;
      
      let totalScore = 0;
      let totalCoeffs = 0;
      let hasError = false;

      selectedStream.national_exam_subjects?.forEach(sub => {
          const gradeStr = nationalExamGrades[sub.id];
          if (gradeStr && gradeStr !== '') {
              totalScore += parseFloat(gradeStr) * sub.coefficient;
              totalCoeffs += sub.coefficient;
          } else {
              hasError = true;
          }
      });

      if (hasError) {
          setToastMessage(lang === 'ar' ? 'المرجو إدخال جميع النقط' : 'Veuillez saisir toutes les notes');
          setShowToast(true);
          return;
      }

      setFinalAverage(totalCoeffs > 0 ? totalScore / totalCoeffs : 0);
      setCurrentStep(AppStep.RESULTS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateRegionalExamResult = () => {
      if (!selectedStream) return;
      
      const regionalSubjects = ['fr', 'ar', 'hg', 'ei'];
      const subjectsToCalc = selectedStream.subjects.filter(s => regionalSubjects.includes(s.id));

      let totalScore = 0;
      let totalCoeffs = 0;
      let hasError = false;

      subjectsToCalc.forEach(sub => {
          const gradeStr = regionalExamGrades[sub.id];
          if (gradeStr && gradeStr !== '') {
              totalScore += parseFloat(gradeStr) * sub.coefficient;
              totalCoeffs += sub.coefficient;
          } else {
              hasError = true;
          }
      });

      if (hasError) {
          setToastMessage(lang === 'ar' ? 'المرجو إدخال جميع النقط' : 'Veuillez saisir toutes les notes');
          setShowToast(true);
          return;
      }

      setFinalAverage(totalCoeffs > 0 ? totalScore / totalCoeffs : 0);
      setCurrentStep(AppStep.RESULTS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadSchoolsImage = async () => {
    const element = document.getElementById('school-analysis-section');
    if (!element) return;
    
    setIsDownloadingSchools(true);

    try {
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
      link.download = 'tahsil-school-prospects.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      setToastMessage(lang === 'ar' ? 'حدث خطأ أثناء حفظ الصورة' : 'Erreur lors de la capture');
      setShowToast(true);
    } finally {
      setIsDownloadingSchools(false);
    }
  };

  const calculateResults = () => {
    if (currentStep !== AppStep.CUSTOM_MODE && currentStep !== AppStep.CUSTOM_EXAM_MODE && !selectedStream) return;

    if (activeSubjects.length === 0) {
        setToastMessage(lang === 'ar' ? 'المرجو إضافة مادة واحدة على الأقل' : 'Ajoutez au moins une matière');
        setShowToast(true);
        return;
    }

    console.log(activeSubjects)
    const missingFields = activeSubjects.filter(subject => {
        const data = grades[subject.id];
        console.log(data)
        if (!data) return true;
        if (data.isPending) return false;
        
        const assessmentsFilled = data.assessments.every(a => a.value.trim() !== '');
        const needsActivities = subject.hasActivities ?? true;
        const activitiesFilled = !needsActivities || (data.activitiesMark !== undefined && data.activitiesMark.trim() !== '');
        
        return !assessmentsFilled || !activitiesFilled;
    });

    console.log(missingFields)

    if (missingFields.length > 0) {
        setToastMessage(lang === 'ar' ? 'المرجو ملء جميع النقط أو تحديد المادة كـ "غير مكتملة"' : 'Veuillez remplir toutes les notes');
        setShowToast(true);
        return;
    }

    let totalPoints = 0;
    let totalCoeffs = 0; 
    let absoluteTotalCoeffs = 0; 
    let scoreDone = 0; 
    let completedCoeffs = 0; 
    const pendingSubjectsList: Subject[] = [];

    console.log(grades)

    activeSubjects.forEach(subject => {
      const subjectData = grades[subject.id];
      absoluteTotalCoeffs += subject.coefficient;
      if (subjectData) {
        if (subjectData.isPending) {
            pendingSubjectsList.push(subject);
            totalCoeffs += subject.coefficient;
        } else {
            const assessmentGrades = subjectData.assessments
            .map(a => parseFloat(a.value))
            .filter(v => !isNaN(v));
            
            const hasActivities = subject.hasActivities ?? true;
            const activityMark = (hasActivities && subjectData.activitiesMark && !isNaN(parseFloat(subjectData.activitiesMark))) ? parseFloat(subjectData.activitiesMark) : null;
            
            let subjectAverage = 0;
            const testsAvg = assessmentGrades.length > 0 ? assessmentGrades.reduce((a, b) => a + b, 0) / assessmentGrades.length : null;

            if (testsAvg !== null && activityMark !== null && (currentStep === AppStep.CUSTOM_MODE || currentStep === AppStep.CUSTOM_EXAM_MODE)) {
                // Use custom weighted average
                subjectAverage = (testsAvg * (1 - activitiesWeight)) + (activityMark * activitiesWeight);
            } else if (testsAvg !== null && activityMark !== null) {

                // Default Morocco system (Tests *0.75 + Activity  *0. 25) 


                subjectAverage =  (testsAvg * 0.75) + (activityMark*0.25)
                console.log(subjectAverage)

            } else if (testsAvg !== null) {
                subjectAverage = testsAvg;
            } else if (activityMark !== null) {
                subjectAverage = activityMark;
            }

            totalPoints += subjectAverage * subject.coefficient;
            totalCoeffs += subject.coefficient;
            scoreDone += subjectAverage * subject.coefficient;
            completedCoeffs += subject.coefficient;
        }
      }
    });

    const average = totalCoeffs > 0 ? totalPoints / totalCoeffs : 0;
    setCoachData({
        pendingSubjects: pendingSubjectsList,
        currentTotalScore: scoreDone,
        completedCoeffs: completedCoeffs,
        totalCoeffs: absoluteTotalCoeffs
    });
    setFinalAverage(average);
    setCurrentStep(AppStep.RESULTS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const chartData = activeSubjects.map(sub => {
      if (calcMode === 'national_exam') {
          const val = parseFloat(nationalExamGrades[sub.id]);
          if (isNaN(val)) return null;
          return { name: sub.name, average: val, fullMark: 20 };
      }
      if (calcMode === 'regional_exam') {
        const val = parseFloat(regionalExamGrades[sub.id]);
        if (isNaN(val)) return null;
        return { name: sub.name, average: val, fullMark: 20 };
      }

      const data = grades[sub.id];
      if (data?.isPending) return null; 
      const assessmentGrades = data?.assessments.map(a => parseFloat(a.value)).filter(v => !isNaN(v)) || [];
      
      const hasActivities = sub.hasActivities ?? true;
      const activityMark = (hasActivities && data?.activitiesMark && !isNaN(parseFloat(data.activitiesMark))) ? parseFloat(data.activitiesMark) : null;
      
      let avg = 0;
      const testsAvg = assessmentGrades.length ? assessmentGrades.reduce((a,b)=>a+b,0)/assessmentGrades.length : null;

      if (testsAvg !== null && activityMark !== null && (currentStep === AppStep.CUSTOM_MODE || currentStep === AppStep.CUSTOM_EXAM_MODE)) {
        avg = (testsAvg * (1 - activitiesWeight)) + (activityMark * activitiesWeight);
      } else if (testsAvg !== null && activityMark !== null) {
        
        avg = (testsAvg * 0.75) + (activityMark * 0.25)
        
      } else if (testsAvg !== null) {
        avg = testsAvg;
      } else if (activityMark !== null) {
        avg = activityMark;
      }

      return {
          name: sub.name,
          average: parseFloat(avg.toFixed(2)),
          fullMark: 20
      };
  }).filter(Boolean) || [];

  const getSelectedSubjectName = () => {
      const s = EXTRA_SUBJECTS.find(sub => sub.id === subjectToAdd);
      return s ? s.name : t.chooseFromList;
  }

  const currentLiveGeneralAvg = (parseFloat(nationalGrade) || 0) * 0.5 + (parseFloat(regionalGrade) || 0) * 0.25 + (parseFloat(continuousGrade) || 0) * 0.25;

  const getStreamIcon = (name: string) => {
      if (name.includes('الرياضيات') || name.includes('Math')) return '📐';
      if (name.includes('الفيزيائية') || name.includes('Physique')) return '⚛️';
      if (name.includes('الحياة') || name.includes('Vie')) return '🌿';
      if (name.includes('الاقتصاد') || name.includes('Eco')) return '📊';
      return '📝';
  };

  const getStreamVisuals = (id: string, name: string) => {
      if (id.includes('pc') || id.includes('sci_ex')) {
          return {
              bgGradient: 'from-cyan-500/20 via-blue-600/10 to-transparent dark:from-cyan-500/10 dark:via-blue-600/5 dark:to-transparent',
              borderHover: 'hover:border-blue-400/50',
              iconBg: 'bg-gradient-to-br from-cyan-400 to-blue-600',
              iconColor: 'text-blue-500 dark:text-blue-400',
              shadow: 'hover:shadow-blue-500/30',
              glowColor: 'group-hover:bg-blue-500/20',
              icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.306 15.152a23.832 23.832 0 01-4.706 3.155m-4.707-13.81a23.825 23.825 0 014.707 3.155M8.401 5.345a23.836 23.836 0 00-4.707 3.155m15.613 9.808a23.84 23.84 0 01-4.707 3.155m-6.2-9.61h.01M12 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
              )
          };
      }
      if (id.includes('svt')) {
          return {
              bgGradient: 'from-emerald-500/20 via-teal-600/10 to-transparent dark:from-emerald-500/10 dark:via-teal-600/5 dark:to-transparent',
              borderHover: 'hover:border-emerald-400/50',
              iconBg: 'bg-gradient-to-br from-emerald-400 to-teal-600',
              iconColor: 'text-emerald-500 dark:text-emerald-400',
              shadow: 'hover:shadow-emerald-500/30',
              glowColor: 'group-hover:bg-emerald-500/20',
              icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
                  </svg>
              )
          };
      }
      if (id.includes('math')) {
          return {
              bgGradient: 'from-rose-500/20 via-red-600/10 to-transparent dark:from-rose-500/10 dark:via-red-600/5 dark:to-transparent',
              borderHover: 'hover:border-rose-400/50',
              iconBg: 'bg-gradient-to-br from-rose-400 to-red-600',
              iconColor: 'text-rose-500 dark:text-rose-400',
              shadow: 'hover:shadow-rose-500/30',
              glowColor: 'group-hover:bg-rose-500/20',
              icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                  </svg>
              )
          };
      }
      if (id.includes('eco')) {
          return {
              bgGradient: 'from-amber-500/20 via-orange-600/10 to-transparent dark:from-amber-500/10 dark:via-orange-600/5 dark:to-transparent',
              borderHover: 'hover:border-amber-400/50',
              iconBg: 'bg-gradient-to-br from-amber-400 to-orange-600',
              iconColor: 'text-amber-500 dark:text-amber-400',
              shadow: 'hover:shadow-amber-500/30',
              glowColor: 'group-hover:bg-amber-500/20',
              icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
              )
          };
      }
      
      return {
          bgGradient: 'from-gray-500/20 via-slate-600/10 to-transparent dark:from-gray-500/10 dark:via-slate-600/5 dark:to-transparent',
          borderHover: 'hover:border-gray-400/50',
          iconBg: 'bg-gradient-to-br from-gray-400 to-slate-600',
          iconColor: 'text-gray-500 dark:text-gray-400',
          shadow: 'hover:shadow-gray-500/30',
          glowColor: 'group-hover:bg-gray-500/20',
          icon: (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.967 8.967 0 016-2.292c1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
             </svg>
          )
      };
  }

  const toggleSimCard = (key: 'national' | 'regional' | 'continuous') => {
      const currentlyDisabled = Object.values(simConfig).filter(v => !v).length;
      if (simConfig[key]) {
          if (currentlyDisabled >= 2) return;
          setSimConfig({ ...simConfig, [key]: false });
      } else {
          setSimConfig({ ...simConfig, [key]: true });
      }
  };

  const getSimulatorResult = () => {
      const weights = { national: 0.5, regional: 0.25, continuous: 0.25 };
      let currentScore = 0;
      let missingWeight = 0;

      if (simConfig.national) currentScore += (parseFloat(nationalGrade) || 0) * weights.national;
      else missingWeight += weights.national;

      if (simConfig.regional) currentScore += (parseFloat(regionalGrade) || 0) * weights.regional;
      else missingWeight += weights.regional;

      if (simConfig.continuous) currentScore += (parseFloat(continuousGrade) || 0) * weights.continuous;
      else missingWeight += weights.continuous;
      
      if (missingWeight === 0) return { type: 'done', val: currentScore };
      
      const needed = (simTarget - currentScore) / missingWeight;
      return { type: 'needed', val: needed };
  };

  const simResult = getSimulatorResult();
  const isSimImpossible = simResult.type === 'needed' && simResult.val > 20;

  return (
    <div className="min-h-screen  relative print:pb-0 print:overflow-visible overflow-x-hidden">
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-olive/10 dark:bg-olive/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-float print:hidden"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-amber/10 dark:bg-amber/5 rounded-full blur-[150px] translate-x-1/2 translate-y-1/3 pointer-events-none animate-pulse-slow print:hidden"></div>
      
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} type={toastMessage.includes('بنجاح') || toastMessage.includes('succès') ? 'success' : 'error'} />}

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} lang={lang} setLang={setLang} />

        <Routes>
            <Route path="*" element={<NotFound lang={lang} />}></Route>
            <Route path="/" element={<LandingPage onStart={handleStartApp} lang={lang} />} />
            <Route path="/privacy" element={<PrivacyPolicy  lang={lang}/>} />
            <Route path="/app" element={
                <MainApp 
                    // Main Props
                    showCustomIntro={showCustomIntro}
                    setShowCustomIntro={setShowCustomIntro}
                    lang={lang}
                    darkMode={darkMode}
                    
                    // Navigation States
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    selectedLevel={selectedLevel}
                    setSelectedLevel={setSelectedLevel}
                    selectedStream={selectedStream}
                    setSelectedStream={setSelectedStream}
                    calcMode={calcMode}
                    setCalcMode={setCalcMode}
                    examYear={examYear}
                    setExamYear={setExamYear}
                    
                    // Subject & Grades
                    activeSubjects={activeSubjects}
                    setActiveSubjects={setActiveSubjects}
                    grades={grades}
                    setGrades={setGrades}
                    nationalGrade={nationalGrade}
                    setNationalGrade={setNationalGrade}
                    regionalGrade={regionalGrade}
                    setRegionalGrade={setRegionalGrade}
                    continuousGrade={continuousGrade}
                    setContinuousGrade={setContinuousGrade}
                    nationalExamGrades={nationalExamGrades}
                    setNationalExamGrades={setNationalExamGrades}
                    regionalExamGrades={regionalExamGrades}
                    setRegionalExamGrades={setRegionalExamGrades}
                    
                    // Simulator
                    simConfig={simConfig}
                    setSimConfig={setSimConfig}
                    simTarget={simTarget}
                    setSimTarget={setSimTarget}
                    simResult={simResult}
                    isSimImpossible={isSimImpossible}
                    
                    // Custom Mode
                    activitiesWeight={activitiesWeight}
                    setActivitiesWeight={setActivitiesWeight}
                    customType={customType}
                    setCustomType={setCustomType}
                    isTemplateSaved={isTemplateSaved}
                    setIsTemplateSaved={setIsTemplateSaved}
                    
                    // Semester States
                    s1Continuous={s1Continuous}
                    setS1Continuous={setS1Continuous}
                    s2Continuous={s2Continuous}
                    setS2Continuous={setS2Continuous}
                    continuousInputMode={continuousInputMode}
                    setContinuousInputMode={setContinuousInputMode}
                    
                    // UI States
                    isStreamDropdownOpen={isStreamDropdownOpen}
                    setIsStreamDropdownOpen={setIsStreamDropdownOpen}
                    isYearDropdownOpen={isYearDropdownOpen}
                    setIsYearDropdownOpen={setIsYearDropdownOpen}
                    isMainStreamDropdownOpen={isMainStreamDropdownOpen}
                    setIsMainStreamDropdownOpen={setIsMainStreamDropdownOpen}
                    subjectToAdd={subjectToAdd}
                    setSubjectToAdd={setSubjectToAdd}
                    customCoefficient={customCoefficient}
                    setCustomCoefficient={setCustomCoefficient}
                    isExtraDropdownOpen={isExtraDropdownOpen}
                    setIsExtraDropdownOpen={setIsExtraDropdownOpen}
                    
                    // Refs
                    dropdownRef={dropdownRef}
                    streamRef={streamRef}
                    yearRef={yearRef}
                    mainStreamRef={mainStreamRef}
                    
                    // Results & Analysis
                    finalAverage={finalAverage}
                    setFinalAverage={setFinalAverage}
                    coachData={coachData}
                    setCoachData={setCoachData}
                    schoolAnalysis={schoolAnalysis}
                    isAnalyzingSchools={isAnalyzingSchools}
                    isDownloadingSchools={isDownloadingSchools}
                    
                    // Handlers
                    handleSelectLevel={handleSelectLevel}
                    handleSelectMode={handleSelectMode}
                    handleSelectStream={handleSelectStream}
                    handleAddCustomSubject={handleAddCustomSubject}
                    handleDeleteSubject={handleDeleteSubject}
                    handleUpdateGrades={handleUpdateGrades}
                    handleUpdateSubjectDetails={handleUpdateSubjectDetails}
                    handleNationalExamInput={handleNationalExamInput}
                    handleRegionalExamInput={handleRegionalExamInput}
                    handleSelectExtraSubject={handleSelectExtraSubject}
                    handleAddExtraSubject={handleAddExtraSubject}
                    handleSaveTemplate={handleSaveTemplate}
                    handleSaveTemplateWithGrades={handleSaveTemplateWithGrades}
                    handleDeleteAllSubjects={handleDeleteAllSubjects}
                    handleClearAllGrades={handleClearAllGrades}
                    calculateResults={calculateResults}
                    calculateGeneralBacResult={calculateGeneralBacResult}
                    calculateNationalExamResult={calculateNationalExamResult}
                    calculateRegionalExamResult={calculateRegionalExamResult}
                    handleDownloadSchoolsImage={handleDownloadSchoolsImage}
                    enterCustomMode={enterCustomMode}
                    
                    // Helper Functions
                    chartData={chartData}
                    getStreamVisuals={getStreamVisuals}
                    currentLiveGeneralAvg={currentLiveGeneralAvg}
                    getSelectedSubjectName={getSelectedSubjectName}
                    toggleSimCard={toggleSimCard}
                />
            } />
        </Routes>


      
 
    </div>
  );
};

export default App;
