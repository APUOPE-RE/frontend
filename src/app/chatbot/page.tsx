"use client";
import { useState } from "react";
import { useAppContext } from "@/src/context";
import { fetchConversation } from "../actions/conversationSelection";
import { chatBotRequest } from "../actions/chatbot";
import { useForm } from "react-hook-form";
import { ChatBotRequestData, ChatBotResponseData } from "../types/types";
import { IoSendSharp } from "react-icons/io5";

type Message = {
    from: string;
    message: string;
};

export default function Chatbot() {
    const {
        handleSubmit,
        reset,
        register,
        formState: {},
    } = useForm<ChatBotRequestData>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>("");
    const [topic, setTopic] = useState("");
    const { materials } = useAppContext();
    const [lectureId, setLectureId] = useState<number | null>(null); // Track selected lectureId

    const filteredItems = materials.filter((item) =>
        item.label.toLowerCase().includes(topic.toLowerCase())
    );

    const handleRequest = async (data: ChatBotRequestData) => {
        if (!data.content.trim() || !lectureId) return;

        setMessages((list) => [...list, { from: "user", message: data.content }]);

        try {
            const response = await chatBotRequest({ ...data, lectureId }); // Include lectureId
            if (response.success && typeof response.data !== "string") {
                const responseData: ChatBotResponseData = response.data;
                setMessages((list) => [...list, { from: "bot", message: responseData.content }]);
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages((list) => [...list, { from: "bot", message: "Sorry, something went wrong." }]);
        }

        reset();
    };

    const selectConversation = async () => {
        if (!value) return;

        setLectureId(Number(value));
        setIsModelOpen(false);
    };

    return (
        <div className="flex flex-row bg-gray-100 py-3" style={{ height: "88dvh" }}>
            <div className="basis-1/4 bg-white p-3 h-full mx-3 rounded">
                <div className="flex justify-between py-3" style={{ height: "10%" }}>
                    <h1 className="text-4xl font-extrabold">Chatbot</h1>
                    <button
                        onClick={() => setIsModelOpen(true)}
                        className="bg-blue-500 text-white text-xl h-50 font-bold rounded w-10 min-h-10"
                    >
                        +
                    </button>
                </div>
                <div className="overflow-auto" style={{ height: "90%" }} />
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

                <div className="flex w-full items-center" style={{ height: "10dvh" }}>
                    <form className="w-full" onSubmit={handleSubmit(handleRequest)}>
                        <div className="flex">
                            <input
                                type="text"
                                id="input"
                                className="basis-11/12 me-2 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                placeholder="Say something..."
                                {...register("content", { required: true })}
                            />
                            <button
                                type="submit"
                                className="text-white bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 basis-1/12 flex justify-center items-center"
                                disabled={!lectureId}
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
                            <h2 className="text-2xl font-bold mb-2">New Conversation</h2>
                            <p className="mb-6">Select a topic for your next conversation:</p>
                        </div>

                        <div className="flex flex-col items-center border rounded-lg w-[80%] h-[70%] overflow-auto">
                            <form className="w-full relative" style={{ position: "sticky", top: 0, zIndex: 10 }}>
                                <div>
                                    <input
                                        type="search"
                                        placeholder="Search topic"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="w-full bg-slate-100 p-2 rounded-md outline-none"
                                    />
                                </div>
                            </form>
                            {filteredItems.map((item) => (
                                <div
                                    className="flex justify-between items-center w-full px-4 h-20 rounded-xl mt-3 py-2 bg-gray-100 shadow-lg cursor-pointer"
                                    key={item.value}
                                    onClick={() => setValue(item.value)}
                                >
                                    <label htmlFor={item.value} className="cursor-pointer">
                                        {item.label}
                                    </label>
                                    <input
                                        name="topics"
                                        type="radio"
                                        value={item.value}
                                        id={item.value}
                                        checked={value === item.value}
                                        onChange={(e) => setValue(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            ))}
                            <div></div>
                        </div>
                        <div className="w-full flex justify-end pt-4 gap-4 px-4">
                            <button
                                className="bg-rose-500 text-white py-2 px-4 rounded"
                                onClick={() => setIsModelOpen(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={selectConversation}
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

