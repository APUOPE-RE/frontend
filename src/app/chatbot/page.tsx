"use client";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/src/context";
import { chatBotRequest } from "../actions/chatbot";
import { useForm } from "react-hook-form";
import {
	ChatBotRequestData,
	ChatBotResponseData,
	Message,
} from "../types/types";
import { IoSendSharp } from "react-icons/io5";
import { Conversations } from "./Conversations";

export default function Chatbot() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isModelOpen, setIsModelOpen] = useState(false);
	const [topic, setTopic] = useState("");
	const [selectedTopic, setSelectedTopic] = useState(0);
	const { addAppError, setFetchData, materials } = useAppContext();

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		watch,
		formState: { },
	} = useForm<ChatBotRequestData>();

	const lectureId = watch("lectureId");
	const conversationId = watch("conversationId");
	const disableInputField =
		isModelOpen || lectureId === undefined || lectureId === 0;

	const filteredItems = materials.filter((item) =>
		item.label.toLowerCase().includes(topic.toLowerCase())
	);

	const handleRequest = async (data: ChatBotRequestData) => {
		if (!data.content.trim() || !lectureId) return;

		setMessages((list) => [
			...list,
			{ from: "user", message: data.content },
		]);

		try {
			const inputData = { ...data, conversationId: conversationId };
			const response = await chatBotRequest(inputData);
			if (typeof response !== "string") {
				const responseData: ChatBotResponseData = response;

				setMessages((list) => [
					...list,
					{ from: "bot", message: responseData.content },
				]);
				setFetchData(true);

				if (conversationId === undefined) {
					setValue("conversationId", response.conversationId);
				}
			} else {
				addAppError(response);
			}
		} catch (error) {
			console.error("Error fetching chatbot response:", error);

			setMessages((list) => [
				...list,
				{ from: "bot", message: "Sorry, something went wrong." },
			]);
		}
		setValue("content", "");
	};

	return (
		<div
			className="flex flex-row bg-gray-100 py-3"
			style={{ height: "88dvh" }}
		>
			<div className="basis-1/4 bg-white p-3 h-full mx-3 rounded">
				<div className="flex justify-between items-center w-full">
					<h1 className="font-extrabold text-[4vw]">Chatbot</h1>
					<Image
						src="/new_conversation.png"
						alt="Icon for creating new conversation"
						width={36}
						height={36}
						className="cursor-pointer object-contain"
						onClick={() => setIsModelOpen(true)}
					/>
				</div>
				<div className="overflow-auto" style={{ height: "90%" }}>
					<Conversations
						currentConversation={conversationId}
						setMessages={setMessages}
						setValue={setValue}
					/>
				</div>
			</div>

			<div className="basis-3/4 bg-white p-3 me-3 h-full rounded">
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
					className="flex w-full items-center"
					style={{ height: "10dvh" }}
				>
					<form
						className="w-full"
						onSubmit={handleSubmit(handleRequest)}
					>
						<div className="flex">
							<input
								type="text"
								id="input"
								className={`basis-11/12 me-2 p-4 text-sm border border-gray-300 rounded-lg 
									${disableInputField ? "bg-white font-bold" : "bg-gray-50 text-gray-900"}`}
								placeholder={disableInputField ? "Please select a topic from '+' button on the left side bar" : "Say something..."}
								{...register("content", { required: true })}
								disabled={disableInputField}
							/>
							<button
								type="submit"
								className="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 basis-1/12 flex justify-center items-center"
							>
								<IoSendSharp className="text-2xl" />
							</button>
						</div>
					</form>
				</div>
			</div>
			{isModelOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="bg-white flex flex-col justify-center items-center p-6 rounded-lg shadow-lg w-[40%] h-[70%] text-center">
						<div>
							<h2 className="text-2xl font-bold mb-2">
								New Conversation
							</h2>
							<p className="mb-6">
								Select a topic for your next conversation:
							</p>
						</div>

						<div className="flex flex-col items-center border rounded-lg w-[80%] h-[70%] overflow-auto">
							<form
								className="w-full relative"
								style={{
									position: "sticky",
									top: 0,
									zIndex: 10,
									backdropFilter: "blur(10px)",
								}}
							>
								<div>
									<input
										type="search"
										placeholder="Search topic"
										value={topic}
										onChange={(e) =>
											setTopic(e.target.value)
										}
										className="w-full bg-slate-100 p-2 rounded-md outline-none"
									/>
								</div>
							</form>
							{filteredItems.map((item) => (
								<div
									className="flex justify-between items-center my-1 px-4 w-[98%] h-20 rounded-xl py-2 bg-gray-100 shadow-md cursor-pointer hover:bg-blue-100"
									key={item.id}
									onClick={() => setSelectedTopic(item.id)}
								>
									<label
										htmlFor={item.label}
										className="cursor-pointer"
									>
										{item.label}
									</label>
									<input
										id={item.label}
										type="radio"
										value={item.id}
										checked={selectedTopic === item.id}
										readOnly
									/>
								</div>
							))}
							<div></div>
						</div>
						<div className="w-full flex justify-end pt-4 gap-4 px-4">
							<button
								className="bg-rose-500 text-white py-2 px-4 rounded"
								onClick={() => (
									setSelectedTopic(0), setIsModelOpen(false)
								)}
							>
								Close
							</button>
							<button
								className="bg-blue-500 text-white py-2 px-4 rounded"
								onClick={() => (
									reset(),
									setValue("lectureId", selectedTopic),
									setIsModelOpen(false),
									setSelectedTopic(0),
									setMessages([])
								)}
							>
								Create
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
