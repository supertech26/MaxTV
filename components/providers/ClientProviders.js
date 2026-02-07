"use client";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

export default function ClientProviders({ children }) {
    return (
        <AuthProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </AuthProvider>
    );
}
