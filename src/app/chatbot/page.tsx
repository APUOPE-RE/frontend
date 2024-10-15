"use client";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Chatbot() {
	const [messages, setMessages] = useState([
		{
		  from: "bot",
		  text: "Hey! How's it going? How can I assist you today?",
		},
		{
			from: "user",
			text: "Hi could you tell me something about elephants?",
		},
		{
		  from: "bot",
		  text: "Elephants are the largest land animals on Earth, known for their intelligence, emotional depth, and strong social bonds. There are two main species: African and Asian elephants. African elephants, larger with big fan-like ears, roam the savannas, while smaller Asian elephants with rounded ears inhabit forests and grasslands. Both species use their trunks for various tasks, such as grasping objects, drinking water, and communicating.",
		},
		{
			from: "user",
			text: "Could you tell me more about elephants?",
		},
		{
			from: "bot",
			text: "Elephants live in matriarchal herds, led by the eldest female, and are known for their incredible memory, which helps them navigate vast landscapes and remember crucial water sources. Sadly, they are endangered due to poaching and habitat destruction, making conservation efforts critical for their survival.",
		},
		{
			from: "user",
			text: "Thank you so much!",
		},
	]);	const [userInput, setUserInput] = useState("");



	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!userInput.trim()) return;
	
		setMessages((prevMessages) => [
		  ...prevMessages,
		  { from: "bot", text: "Chatbot test message" },
		  { from: "user", text: userInput },
		]);
	
		try {
		  const response = await fetch(`${API_BASE_URL}/api/Chatbot`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  message: userInput,
			}),
		  });
	
		  const data = await response.json();
		  if (data?.response) {
			setMessages((prevMessages) => [
			  ...prevMessages,
			  { from: "bot", text: data.response },
			]);
		  } else {
			throw new Error("No response from API");
		  }
		} catch (error) {
		  console.error("Error during chat request:", error);
		}
	
		setUserInput("");
	};

	return (
		<div className="flex flex-row bg-gray-100 py-3 h-screen">
			<div className="basis-1/4 bg-white p-3 h-full mx-3 rounded">

				<div className="flex justify-between py-3" style={{height: "10%"}}>
					<h1 className="text-4xl font-extrabold">
						Chatbot
					</h1>
					<button className="bg-blue-500 text-white text-xl h-50 font-bold rounded w-10">
						+	
					</button>
				</div>

				<div className="overflow-auto" style={{height: "90%"}}>

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
				<div className="w-100" style={{height: "90%"}}>
					<div className="h-full w-full p-4 border bg-gray-100 border-gray-300 rounded-lg space-y-4 overflow-auto">
						{messages.map((msg, idx) => (
						<div key={idx}>
							{msg.from === "user" && (
								<div className="flex justify-end">
								<div className="w-1/2 border p-2 bg-white border-gray-300 rounded-lg">
									{msg.text}
								</div>
								</div>
							)}
							{msg.from === "bot" && (
								<div className="w-1/2 border text-white p-2 bg-blue-500 border-gray-300 rounded-lg">
								{msg.text}
								</div>
							)}
						</div>
						))}
					</div>
				</div>
				<div className="d-flex items-end py-2" style={{height: "10%"}}>

					<form 
					onSubmit={handleSubmit}
					>
						<div className="flex align-center">
							<input
							type="search"
							id="search"
							className="basis-11/12 me-2 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
							placeholder="Say something..."
							value={userInput}
                			onChange={(e) => setUserInput(e.target.value)}
                			required
							/>
							<button type="submit" className="text-white right-2.5 bottom-2.5 bg-blue-700 font-medium rounded-lg text-sm px-4 py-2">
							Submit
							</button>
						</div>
					</form>

				</div>
			</div>
		</div>
	);
}
