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
	dropdownOpen: boolean;
	setDropdownOpen: (value: boolean) => void;
	selectedQuizId: number;
	setSelectedQuizId: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [registerSuccess, setRegisterSuccess] = useState("");
	const [fetchData, setFetchData] = useState(false);
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedQuizId, setSelectedQuizId] = useState(0);

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
			if (Array.isArray(response)) {
				response.sort((a, b) => b.id - a.id);
				setConversations(response);
			}
		};

		if (fetchData) {
			fetchConversations();
			setFetchData(false);
		}
	}, [fetchData]);

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
				dropdownOpen,
				setDropdownOpen,
				selectedQuizId,
				setSelectedQuizId,
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
