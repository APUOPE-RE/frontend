"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface AppContextType {
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuthenticated = (auth: boolean) => {
    setIsAuthenticated(auth);
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>
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