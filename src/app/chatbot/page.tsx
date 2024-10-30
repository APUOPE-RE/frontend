"use client";
import { useState } from "react";
import { ChatBotRequestData, chatBotRequest } from "../actions/chatbot/chatbot";
import { useForm } from "react-hook-form";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Message = {
	from: string;
	message: string;
}

export default function Chatbot() {
	const {
		handleSubmit,
		reset,
		register,
		watch,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<ChatBotRequestData>();
	const [messages, setMessages] = useState<Message[]>([]);
	const [userInput, setUserInput] = useState<Message[]>([]);

	const handleRequest = async (data: ChatBotRequestData) => {
		if (!data.data.trim()) return;

		setMessages((list) => [...list, {from: "user", message: data.data}]);

		var response = await chatBotRequest(data);
		setMessages((list) => [...list, {from: "bot", message: response.data}]);
		reset();
	};

	return (
		<div className="flex flex-row bg-gray-100 py-3 h-screen">
			<div className="basis-1/4 bg-white p-3 h-full mx-3 rounded">
				<div
					className="flex justify-between py-3"
					style={{ height: "10%" }}
				>
					<h1 className="text-4xl font-extrabold">Chatbot</h1>
					<button className="bg-blue-500 text-white text-xl h-50 font-bold rounded w-10">
						+
					</button>
				</div>

				<div className="overflow-auto" style={{ height: "90%" }}>
					<p className="mt-2 font-bold">Today</p>
					<div className="w-full p-4 text-gray-500 border bg-gray-50 shadow-lg border-gray-300 rounded-lg mt-2">
						<p>Conversation 1...</p>
					</div>
					<div className="w-full p-4 text-gray-500 border bg-white shadow-lg border-gray-300 rounded-lg mt-2">
						<p>Conversation 2...</p>
					</div>

					<p className="mt-2 font-bold">This week </p>
					<div className="w-full p-4 text-gray-500 border bg-gray-50 shadow-lg border-gray-300 rounded-lg mt-2">
						<p>Conversation 1...</p>
					</div>
					<div className="w-full p-4 text-gray-500 border bg-white shadow-lg border-gray-300 rounded-lg mt-2">
						<p>Conversation 2...</p>
					</div>
					<div className="w-full p-4 text-gray-500 border bg-white shadow-lg border-gray-300 rounded-lg mt-2">
						<p>Conversation 3...</p>
					</div>

					<p className="mt-2 font-bold">This month </p>
					<div className="w-full p-4 text-gray-500 border bg-gray-50 shadow-lg border-gray-300 rounded-lg mt-2">
						<p>Conversation 1...</p>
					</div>
					<div className="w-full p-4 text-gray-500 border bg-gray-50 shadow-lg border-gray-300 rounded-lg mt-2">
						<p>Conversation 2...</p>
					</div>
					<div className="w-full p-4 text-gray-500 border bg-gray-50 shadow-lg border-gray-300 rounded-lg mt-2">
						<p>Conversation 3...</p>
					</div>
				</div>
			</div>
			<div className="basis-3/4 bg-white p-3 h-screen rounded">
				<div className="w-100" style={{ height: "90%" }}>
					<div className="h-full w-full p-4 border bg-gray-100 border-gray-300 rounded-lg space-y-4 overflow-auto">
						{messages.map((msg, idx) => (
							<div key={idx}>
								{msg.from === "user" && (
									<div className="flex justify-end">
										<div className="w-1/2 border p-2 bg-white border-gray-300 rounded-lg">
											{msg.message}
										</div>
									</div>
								)}
								{msg.from === "bot" && (
									<div className="w-1/2 border text-white p-2 bg-blue-500 border-gray-300 rounded-lg">
										{msg.message}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
				<div
					className="d-flex items-end py-2"
					style={{ height: "10%" }}
				>
					<form onSubmit={handleSubmit(handleRequest)}>
						<div className="flex align-center">
							<input
								type="search"
								id="search"
								className="basis-11/12 me-2 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
								placeholder="Say something..."
								{...register("data")}
								required
							/>
							<input
								type="submit"
								className="text-white right-2.5 bottom-2.5 bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
								value={"Submit"}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
