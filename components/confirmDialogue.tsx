import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean; 
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "تأكيد الحذف",
  message = "هل أنت متأكد من رغبتك في حذف هذا العنصر؟ لا يمكن التراجع عن هذه العملية.",
  confirmText = "نعم، احذف",
  cancelText = "إلغاء",
  isDangerous = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 animate-fade-in">
      {/* الخلفية المعتمة (Backdrop) */}
      <div 
        className="absolute inset-0 bg-deep/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* نافذة الحوار (Modal) */}
      <div className="relative w-full max-w-md bg-white/90 dark:bg-[#292524]/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-white/10 p-8 md:p-10 transform transition-all animate-fade-in-up overflow-hidden">
        
        {/* تأثير إضاءة خفيفة في الخلفية */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none ${isDangerous ? 'bg-danger' : 'bg-olive'}`}></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* أيقونة التنبيه */}
          <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center mb-6 shadow-xl ${
            isDangerous 
              ? 'bg-danger/10 text-danger border border-danger/20' 
              : 'bg-olive/10 text-olive border border-olive/20'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>

          {/* العناوين */}
          <h3 className="text-2xl font-heading font-black text-ink dark:text-white mb-3">
            {title}
          </h3>
          <p className="text-inkLight dark:text-gray-400 font-serif text-lg leading-relaxed mb-8">
            {message}
          </p>

          {/* الأزرار */}
          <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-bold text-inkLight dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                isDangerous 
                  ? 'bg-danger hover:bg-red-600 shadow-danger/20' 
                  : 'bg-olive hover:bg-olive-dark shadow-olive/20'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};