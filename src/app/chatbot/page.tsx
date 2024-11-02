"use client";
import { useState } from "react";
import {chatBotRequest } from "../actions/chatbot/chatbot";
import { useForm } from "react-hook-form";
import { ChatBotRequestData, ChatBotResponseData } from "../types/types";

type Message = {
	from: string;
	message: string;
}

export default function Chatbot() {
	const {
		handleSubmit,
		reset,
		register,
		formState: {},
	} = useForm<ChatBotRequestData>();
	const [messages, setMessages] = useState<Message[]>([]);

	const handleRequest = async (data: ChatBotRequestData) => {
		if (!data.content.trim()) return;

		setMessages((list) => [...list, { from: "user", message: data.content }]);

		try {
			const response = await chatBotRequest(data);
			if (response.success && typeof response.data !== "string") {
				const data:ChatBotResponseData = response.data;
				setMessages((list) => [...list, { from: "bot", message: data.content }]);
			}
		} catch (error) {
			console.error("Error fetching chatbot response:", error);
			setMessages((list) => [...list, { from: "bot", message: "Sorry, something went wrong." }]);
		}

		// Reset form input
		reset();
	};

	return (
		<div className="flex flex-row bg-gray-100 py-3 h-screen">
			<div className="basis-1/4 bg-white p-3 h-full mx-3 rounded">
				<div className="flex justify-between py-3" style={{ height: "10%" }}>
					<h1 className="text-4xl font-extrabold">Chatbot</h1>
				</div>
				<div className="overflow-auto" style={{ height: "90%" }} />
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

				<div className="d-flex items-end py-2" style={{ height: "10%" }}>
					<form onSubmit={handleSubmit(handleRequest)}>
						<div className="flex align-center">
							<input
								type="text"
								id="input"
								className="basis-11/12 me-2 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
								placeholder="Say something..."
								{...register("content", { required: true })}
							/>
							<input
								type="submit"
								className="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
								value="Submit"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}