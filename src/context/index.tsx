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
    { value: "Lecture_1_introdcution", label: "L1_introdcution" },
    { value: "Lecture_2_product value", label: "L2_product value" },
    { value: "Lecture_3_vision_scope_stakeholders", label: "L3_vision_scope_stakeholders" },
    { value: "Lecture_4_types of req.", label: "L4_types of req." },
    { value: "Lecture_5_elicitation techniques", label: "L5_elicitation techniques" },
    { value: "Lecture_6_good requirements", label: "L6_good requirements" },
    { value: "Lecture_7_prioritization", label: "L7_prioritization" },
    { value: "Lecture_8_validation", label: "L8_validation" },
    { value: "Lecture_9_RM", label: "L9_RM" },
    { value: "Lecture_10_traceability&research", label: "L10_traceability&research" },
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