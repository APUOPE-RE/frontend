"use client";
import { useState } from "react";
import { ChatBotRequestData, chatBotRequest } from "../actions/chatbot";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/src/context";
import { fetchConversation } from "../actions/conversationSelection";

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
  const [value, setValue] = useState<String | null>("");
  const [response, setResponse] = useState<String | null>("");
  const [topic, setTopic] = useState("");
  const { materials } = useAppContext();

  const filteredItems = materials.filter((item) =>
    item.label.toLowerCase().includes(topic.toLowerCase())
  );

  const handleRequest = async (data: ChatBotRequestData) => {
    if (!data.data.trim()) return;

    setMessages((list) => [...list, { from: "user", message: data.data }]);

    try {
      const response = await chatBotRequest(data);
      setMessages((list) => [...list, { from: "bot", message: response.data }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((list) => [
        ...list,
        { from: "bot", message: "Sorry, something went wrong." },
      ]);
    }

    // Reset form input
    reset();
  };

	const selectConversation = async (value: String | null): Promise<void> => {
		const conversation = await fetchConversation(value);
		setResponse(conversation);					// use the respone later to display old conversation
	}

  return (
    <div className="flex flex-row bg-gray-100 py-3 h-screen">
      <div className="basis-1/4 bg-white p-3 h-full mx-3 rounded">
        <div className="flex justify-between py-3" style={{ height: "10%" }}>
          <h1 className="text-4xl font-extrabold">Chatbot</h1>
          <button
            onClick={() => setIsModelOpen(true)}
            className="bg-blue-500 text-white text-xl h-50 font-bold rounded w-10"
          >
            +
          </button>
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
                {...register("data", { required: true })}
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
      {isModelOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white flex flex-col justify-center items-center p-6 rounded-lg shadow-lg w-[33%] h-[50%] text-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">New Conversation</h2>
              <p className="mb-6">
                Select topic for your new conversation context:
              </p>
            </div>

            <div className="flex flex-col items-center border rounded-lg w-[80%] h-[60%] overflow-auto">
              <form
                className="w-full relative"
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className=" ">
                  <input
                    type="search"
                    placeholder="Search topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-100 p-2 rounded-md mb-4"
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
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => setIsModelOpen(false)}
              >
                Close
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>selectConversation(value)}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
