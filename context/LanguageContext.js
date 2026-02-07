"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('EN');

    useEffect(() => {
        // Load saved language
        const saved = localStorage.getItem('language');
        if (saved) setLanguage(saved);
    }, []);

    const switchLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        // In a real app, this would trigger i18n/routing changes
        // For now, we simulate the switch
        console.log(`Language switched to ${lang}`);
    };

    const t = (key) => {
        return translations[language]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);

// Simple dictionary for key elements
const translations = {
    EN: {
        home: "Home",
        plans: "IPTV Plans",
        apps: "Apps",
        howItWorks: "How It Works",
        contact: "Contact",
        login: "Login",
        getStarted: "Create Account",
        myProfile: "My Dashboard"
    },
    FR: {
        home: "Accueil",
        plans: "Forfaits IPTV",
        apps: "Applications",
        howItWorks: "Comment ça marche",
        contact: "Contact",
        login: "Connexion",
        getStarted: "Créer un compte",
        myProfile: "Mon Tableau de bord"
    },
    AR: {
        home: "الرئيسية",
        plans: "الاشتراكات",
        apps: "التطبيقات",
        howItWorks: "كيف يعمل",
        contact: "اتصل بنا",
        login: "دخول",
        getStarted: "إنشاء حساب",
        myProfile: "لوحة التحكم"
    }
};
