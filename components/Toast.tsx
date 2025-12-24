
import React, { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    onClose: () => void;
    type?: 'error' | 'success';
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, type = 'error' }) => {
    // Start with false (hidden state) to allow the "enter" transition to play
    const [isVisible, setIsVisible] = useState(false);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for the exit transition to finish before unmounting
        setTimeout(onClose, 500); 
    };

    useEffect(() => {
        // Trigger the enter animation shortly after mount
        const enterTimer = setTimeout(() => setIsVisible(true), 10);
        
        // Auto dismiss after 4 seconds
        const dismissTimer = setTimeout(() => {
            handleClose();
        }, 4000);

        return () => {
            clearTimeout(enterTimer);
            clearTimeout(dismissTimer);
        };
    }, []);

    return (
        <div className="fixed top-6 left-0 right-0 z-[200] flex justify-center pointer-events-none px-4">
            <div 
                className={`
                    pointer-events-auto 
                    flex items-center gap-4 
                    px-6 py-4 rounded-[2rem] 
                    shadow-2xl backdrop-blur-2xl border
                    transform transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1)
                    ${isVisible 
                        ? 'opacity-100 translate-y-0 scale-100 blur-none' 
                        : 'opacity-0 -translate-y-8 scale-95 blur-sm'}
                    ${type === 'error' 
                        ? 'bg-white/90 dark:bg-black/80 border-red-500/20 text-red-600 dark:text-red-400 shadow-red-500/10' 
                        : 'bg-white/90 dark:bg-black/80 border-green-500/20 text-green-600 dark:text-green-400 shadow-green-500/10'}
                `}
            >
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-inner ${
                     type === 'error' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'
                 }`}>
                     {type === 'error' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                     ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                     )}
                 </div>
                 <div className="flex-1 min-w-[200px] text-center md:text-right">
                     <p className="font-heading font-bold text-base leading-tight">{message}</p>
                 </div>
                 <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 opacity-40">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
            </div>
        </div>
    );
};
