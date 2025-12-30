
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, GradeMap, Stream } from "../types";

const parseGradeMap = (grades: GradeMap, stream: Stream) => {
  return stream.subjects.map(sub => {
    const subData = grades[sub.id];
    if (!subData) return null;
    
    const validGrades = subData.assessments
      .map(a => parseFloat(a.value))
      .filter(v => !isNaN(v));
    
    const activities = subData.activitiesMark ? parseFloat(subData.activitiesMark) : null;
    const allValid = activities !== null ? [...validGrades, activities] : validGrades;
    
    if (allValid.length === 0) return null;
    
    const average = allValid.reduce((a, b) => a + b, 0) / allValid.length;
    return {
      subject: sub.name,
      average: average.toFixed(2),
      coefficient: sub.coefficient,
      individual_notes: validGrades,
      activities_note: activities
    };
  }).filter(Boolean);
};

export const analyzeGrades = async (
  grades: GradeMap, 
  stream: Stream,
  level: string,
  lang: string = 'ar'
): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const processedGrades = parseGradeMap(grades, stream);
    const targetLang = lang === 'ar' ? 'Arabic' : 'French';


    console.log(grades , stream , level   , lang )
    
    const prompt = `
      You are a high-level Moroccan Academic Counselor and Data Analyst.
      Level: ${level}
      Stream: ${stream.name}
      Grades Data (JSON): ${JSON.stringify(processedGrades)}
      
      Your mission is to provide a deep, encouraging, and strategic analysis of the student's performance.
      
      MANDATORY REQUIREMENTS:
      1. prediction: A catchy professional sentence like "Excellent success expected" or "Good chance for Mention Bien" based on the weighted average.
      2. summary: A 2-3 sentence academic synthesis. Be eloquent.
      3. strengths/weaknesses: Provide exactly 3 of each. If data is sparse, base them on typical challenges for the "${stream.name}" stream.
      4. plan: A detailed 4-week roadmap (4 distinct steps) focusing on critical subjects with high coefficients.
      
      Response MUST be valid JSON in ${targetLang}. Use high-quality professional vocabulary.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            plan: { type: Type.ARRAY, items: { type: Type.STRING } },
            prediction: { type: Type.STRING }
          },
          required: ["summary", "strengths", "weaknesses", "plan", "prediction"]
        }
      }
    });

    const result = JSON.parse(response.text);
    // Fallback for empty arrays
    if (!result.strengths || result.strengths.length === 0) {
        result.strengths = lang === 'ar' ? ["المثابرة في المراجعة", "الرغبة في التفوق", "الوعي بأهمية المعاملات"] : ["Persévérance", "Volonté de réussite", "Conscience des coeffs"];
    }
    if (!result.weaknesses || result.weaknesses.length === 0) {
        result.weaknesses = lang === 'ar' ? ["تحسين إدارة وقت الامتحانات", "تقوية المنهجية في المواد العلمية", "التركيز على لغات التواصل"] : ["Gestion du temps", "Méthodologie scientifique", "Langues de communication"];
    }
    if (!result.plan || result.plan.length === 0) {
        result.plan = lang === 'ar' ? ["الأسبوع 1: مراجعة القواعد الأساسية", "الأسبوع 2: حل التمارين التطبيقية", "الأسبوع 3: نماذج امتحانات سابقة", "الأسبوع 4: المراجعة النهائية والتلخيص"] : ["Sem 1: Bases", "Sem 2: Exercices", "Sem 3: Examens", "Sem 4: Synthèse"];
    }
    
    return result as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      summary: lang === 'ar' ? "تحليل مبدئي: أدائك يتطلب استراتيجية مخصصة للتركيز على المواد ذات المعاملات المرتفعة لضمان أفضل ميزة ممكنة." : "Analyse préliminaire : votre performance nécessite une stratégie ciblée sur les matières à hauts coefficients.",
      strengths: lang === 'ar' ? ["الوعي الدراسي", "الرغبة في التحسن"] : ["Conscience académique", "Désir d'amélioration"],
      weaknesses: lang === 'ar' ? ["تنظيم مجهود المراجعة", "التركيز على المواد العلمية"] : ["Organisation des révisions", "Focus matières scientifiques"],
      plan: lang === 'ar' ? ["تحديد المواد ذات الأولوية", "وضع جدول زمني يومي", "التدرب على الامتحانات", "تقييم التقدم الأسبوعي"] : ["Identifier priorités", "Planning quotidien", "Pratique examens", "Bilan hebdo"],
      prediction: lang === 'ar' ? "توقع إيجابي مبدئي" : "Pronostic positif"
    };
  }
};

export const getSchoolSuggestions = async (
  average: number,
  streamName: string,
  year: string,
  lang: string = 'ar'
): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const targetLang = lang === 'ar' ? 'Arabic' : 'French';

    const prompt = `
      Act as a Moroccan Career Path Consultant.
      Student Data:
      - Bac Average: ${average}/20
      - Stream: ${streamName}
      - Graduation Year: ${year}
      
      Task: Suggest 5 specific Moroccan schools/universities (ENSA, ENCG, FST, Medicine, CPGE, etc.) based on real thresholds (Seuils).
      Include a summary evaluating the overall competitiveness of the student.
      Language: ${targetLang}.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            suggestedSchools: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  chance: { type: Type.STRING, description: "High, Medium, or Low" }
                }
              }
            }
          },
          required: ["summary", "suggestedSchools"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return {
      summary: data.summary,
      strengths: [], weaknesses: [], plan: [], prediction: "",
      suggestedSchools: data.suggestedSchools
    };
  } catch (error) {
    console.error(error);
    return { 
      summary: lang === 'ar' ? "حدث خطأ في جلب التوقعات." : "Une erreur est survenue lors de la récupération des prévisions.", 
      strengths: [], weaknesses: [], plan: [], prediction: "" 
    };
  }
};
