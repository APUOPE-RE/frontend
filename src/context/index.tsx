"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface AppContextType {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  registerSuccess: string;
  setRegisterSuccess: (register: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState("");

  const setAuthenticated = (auth: boolean) => {
    setIsAuthenticated(auth);
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthenticated, registerSuccess, setRegisterSuccess }}>
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