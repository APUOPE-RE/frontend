"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface AppContextType {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  registerSuccess: string;
  setRegisterSuccess: (register: string) => void;
  materials: { value: string; label: string }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState("");

  const setAuthenticated = (auth: boolean) => {
    setIsAuthenticated(auth);
  };

  const materials: { value: string; label: string }[] = [
    { value: "2", label: "Lecture 2" },
    { value: "3", label: "Lecture 3" },
    { value: "4", label: "Lecture 4" },
    { value: "5", label: "Lecture 5" },
    { value: "6", label: "Lecture 6" },
    { value: "7", label: "Lecture 7" },
    { value: "8", label: "Lecture 8" },
    { value: "9", label: "Lecture 9" },
    { value: "10", label: "Lecture 10" },
  ];

  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthenticated, registerSuccess, setRegisterSuccess, materials }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}