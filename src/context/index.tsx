"use client";
import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
	useRef,
} from "react";
import { fetchAllConversations } from "../app/actions/chatbot";
import { ConversationData, QuizSummaryData } from "../app/types/types";
import { fetchPreviousQuizzes } from "../app/actions/generateQuiz";

interface AppContextType {
	isAuthenticated: boolean;
	setAuthenticated: (auth: boolean) => void;
	registerSuccess: string;
	setRegisterSuccess: (register: string) => void;
	materials: { id: number; label: string }[];
	setFetchConversationsData: (value: boolean) => void;
	setFetchPreviousQuizzesData: (value: boolean) => void;
	conversations: ConversationData[];
	appErrors: string[];
	addAppError: (error: string) => void;
	removeAppError: () => void;
	dropdownOpen: boolean;
	setDropdownOpen: (value: boolean) => void;
	selectedQuizId: number;
	setSelectedQuizId: (id: number) => void;
	title: string;
	setTitle: (value: string) => void;
	searchInputRef: React.RefObject<HTMLInputElement>;
	previousQuizzes: QuizSummaryData[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [registerSuccess, setRegisterSuccess] = useState("");
	const [fetchConversationsData, setFetchConversationsData] = useState(false);
	const [fetchPreviousQuizzesData, setFetchPreviousQuizzesData] = useState(false);
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const [appErrors, setAppErrors] = useState<string[]>([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedQuizId, setSelectedQuizId] = useState(0);
	const [title, setTitle] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);
	const [previousQuizzes, setPreviousQuizzes] = useState<QuizSummaryData[]>([]);

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

		if (fetchConversationsData) {
			fetchConversations();
			setFetchConversationsData(false);
		}
	}, [fetchConversationsData]);

	useEffect(() => {
		const fetchQuizzes = async () => {
			const response = await fetchPreviousQuizzes();
			if (Array.isArray(response)) {
				response.sort((a, b) => b.quizId - a.quizId);
				setPreviousQuizzes(response);
			}
		};

		if (fetchPreviousQuizzesData) {
			fetchQuizzes();
			setFetchPreviousQuizzesData(false);
		}
	}, [fetchPreviousQuizzesData]);

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
				setFetchConversationsData,
				setFetchPreviousQuizzesData,
				conversations,
				appErrors,
				addAppError,
				removeAppError,
				dropdownOpen,
				setDropdownOpen,
				selectedQuizId,
				setSelectedQuizId,
				title,
				setTitle,
				searchInputRef,
				previousQuizzes,
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
