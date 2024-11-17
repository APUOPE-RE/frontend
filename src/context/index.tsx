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
	materials: { id: number; value: string; label: string }[];
	setFetchData: (value: boolean) => void;
	conversations: ConversationData[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [registerSuccess, setRegisterSuccess] = useState("");
	const [fetchData, setFetchData] = useState(false);
	const [conversations, setConversations] = useState<ConversationData[]>([]);

	const setAuthenticated = (auth: boolean) => {
		setIsAuthenticated(auth);
	};

	const materials: { id: number; value: string; label: string }[] = [
		{ id: 1, value: "Lecture_1_introdcution", label: "L1_introdcution" },
		{ id: 2, value: "Lecture_2_product value", label: "L2_product value" },
		{
			id: 3,
			value: "Lecture_3_vision_scope_stakeholders",
			label: "L3_vision_scope_stakeholders",
		},
		{ id: 4, value: "Lecture_4_types of req.", label: "L4_types of req." },
		{
			id: 5,
			value: "Lecture_5_elicitation techniques",
			label: "L5_elicitation techniques",
		},
		{
			id: 6,
			value: "Lecture_6_good requirements",
			label: "L6_good requirements",
		},
		{
			id: 7,
			value: "Lecture_7_prioritization",
			label: "L7_prioritization",
		},
		{ id: 8, value: "Lecture_8_validation", label: "L8_validation" },
		{ id: 9, value: "Lecture_9_RM", label: "L9_RM" },
		{
			id: 10,
			value: "Lecture_10_traceability&research",
			label: "L10_traceability&research",
		},
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
