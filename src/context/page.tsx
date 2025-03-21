"use client";

import React, { createContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    checkAuth: () => Promise<void>;
}

export const authContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const checkAuth = async () => {
        try {
    
            const res = await fetch("/api/auth/checkAuth");
            const data = await res.json();
      
            console.log("Auth status:", data.isAuthenticated);
            setIsAuthenticated(data.isAuthenticated);
         
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsAuthenticated(false);
            
            
        } 
    };

  
    return (
        <authContext.Provider value={{ isAuthenticated, setIsAuthenticated, checkAuth }}>
            {children}
        </authContext.Provider>
    );
};