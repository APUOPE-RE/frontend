"use client";
import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";
import { fetchAllConversations } from "../app/actions/chatbot";
import { ConversationData } from "../app/types/types";

interface AppContextType {
	isAuthenticated: boolean;
	setAuthenticated: (auth: boolean) => void;
	registerSuccess: string;
	setRegisterSuccess: (register: string) => void;
	materials: { id: number; label: string }[];
	setFetchData: (value: boolean) => void;
	conversations: ConversationData[];
	appErrors: string[];
	addAppError: (error: string) => void;
	removeAppError: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [registerSuccess, setRegisterSuccess] = useState("");
	const [fetchData, setFetchData] = useState(false);
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const [appErrors, setAppErrors] = useState<string[]>([]);

	const setAuthenticated = (auth: boolean) => {
		setIsAuthenticated(auth);
	};

	const materials: { id: number; label: string }[] = [
		{ id: 2, label: "Lecture 2" },
		{ id: 3, label: "Lecture 3" },
		{ id: 4, label: "Lecture 4" },
		{ id: 5, label: "Lecture 5" },
		{ id: 6, label: "Lecture 6" },
		{ id: 7, label: "Lecture 7" },
		{ id: 8, label: "Lecture 8" },
		{ id: 9, label: "Lecture 9" },
		{ id: 10, label: "Lecture 10" },
	];

	useEffect(() => {
		const fetchConversations = async () => {
			const response = await fetchAllConversations();
			if (response.length > 0) {
				response.sort((a, b) => b.id - a.id);
				setConversations(response);
			}
		};

		if (fetchData) {
			fetchConversations();
			setFetchData(false);
		}
	}, [fetchData]);

	const addAppError = (error: string) => {
		setAppErrors(errors => [...errors, error]);
	}

	const removeAppError = () => {
		if (appErrors.length === 1) {
			setAppErrors([]);
		} else {
			setAppErrors(appErrors.slice(0, 1));
		}
	}

	return (
		<AppContext.Provider
			value={{
				isAuthenticated,
				setAuthenticated,
				registerSuccess,
				setRegisterSuccess,
				materials,
				setFetchData,
				conversations,
				appErrors,
				addAppError,
				removeAppError,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error(
			"useAppContext must be used within an AppContextProvider"
		);
	}
	return context;
}
