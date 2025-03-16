"use client";

import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    checkAuth: () => void;
}

export const authContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth/checkAuth");
            const data = await res.json();

    
    setIsAuthenticated(data.isAuthenticated); 

        } catch (error) {
            console.error("Auth check failed:", error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        console.log("Updated isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <authContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuth }}>
            {children}
        </authContext.Provider>
    );
};
