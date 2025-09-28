import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const WelcomePopup = () => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 opacity-100`}
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div 
        className={`bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 text-center transform transition-all duration-300 scale-100 opacity-100`}
      >
        <div className="flex justify-center items-center mb-6">
          <svg className="w-16 h-16 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19z" />
            <path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            <path d="M12 12a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t('welcome.title')}</h2>
        <p className="text-slate-300 mb-4 text-lg">{t('welcome.madeBy')}</p>
        <div className="text-slate-400 text-md space-y-2 mb-8">
          <p>{t('welcome.class')}</p>
          <p>{t('welcome.school')}</p>
        </div>
        <button
          onClick={handleClose}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {t('welcome.close')}
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;