"use client";

import { useState } from "react";
import { fetchQuiz } from "../actions/generateQuiz";
import { useAppContext } from "@/src/context";
import { QuestionData } from "../types/types";

export default function Quiz() {
  const { materials } = useAppContext();
  const date = new Date();
  const currentDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const [topic, setTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<number | null>(0);
  const [response, setResponse] = useState<QuestionData[]>([]);

  const filteredItems = materials.filter((item) =>
    item.label.toLowerCase().includes(topic.toLowerCase())
  );

  const generateQuiz = async (value: number | null): Promise<void> => {
    const quizResponse = await fetchQuiz(value);
    if (quizResponse) {
      setResponse(quizResponse);
      console.log(quizResponse);
    } else {
      console.error("Failed to fetch quiz.");
    }
  };

  const submitQuiz = async(): Promise<void> => {

  }

  return (
    <div className="flex w-full bg-gray-100 p-3" style={{ height: "88dvh" }}>
      <div className="basis-1/4 me-3 bg-white px-3 h-full rounded overflow-auto">
        <form
          className="w-full relative py-3"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backdropFilter: "blur(1px)",
          }}
        >
          <div className="relative">
            <input
              type="search"
              placeholder="Search topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-200 p-4 rounded-2xl outline-none"
            />
          </div>
        </form>

        {filteredItems.map((item) => (
          <div
            className={`flex justify-between items-center w-[99%] h-20 p-2 mb-2 rounded-lg 
            ${
              selectedTopic === item.id
                ? "border border-gray-400 bg-blue-100"
                : "bg-gray-100"
            }
            shadow-md hover:bg-blue-100`}
            key={item.id}
            onClick={() => setSelectedTopic(item.id)}
          >
            <label htmlFor={item.label} className="cursor-pointer">
              {item.label}
            </label>
            <input
              id={item.label}
              type="radio"
              value={item.label}
              checked={selectedTopic === item.id}
              onChange={() => setSelectedTopic(item.id)}
            />
          </div>
        ))}
      </div>

      <div className="basis-3/4 flex flex-col p-3 h-full rounded bg-white">
        <div
          className="basis-2/12 flex flex-row justify-between"
          style={{ height: "10%" }}
        >
          <div className="flex flex-col justify-center">
            <p>{currentDate}</p>
          </div>
          <div className="flex items-center font-bold text-2xl">
            {response.length === 0 ? (
                <p>Selected Topic</p>
            ) : (
                <p>Questions for lecture{" "}
                  {selectedTopic}
                </p>
            )}
            
          </div>
          <div className="flex items-center">
            <p>
              Score:{" "}
              {response.length === 0 ? (
                <span className="bg-blue-500 text-white rounded-md px-2 py-1">
                  0/0
                </span>
              ) : (
                <span className="bg-blue-500 text-white rounded-md px-2 py-1">
                  0/{response.length}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="basis-10/12 py-10" style={{ height: "90%" }}>
          {response.length === 0 ? (
            <div className="flex flex-col justify-between w-full h-full p-4 border bg-gray-100 border-gray-300 rounded-lg">
              {selectedTopic === 0 ? (
                <p className="flex align-middle justify-center font-semibold text-3xl">
                  Please Select a Topic{" "}
                </p>
              ) : (
                <p className="flex align-middle justify-center font-semibold text-3xl">
                  Click the button below to Generate questions for lecture{" "}
                  {selectedTopic}
                </p>
              )}

              <div className="flex justify-center align-middle">
                <button
                  className="bg-blue-500 text-white p-4 m-4 rounded-lg"
                  disabled={selectedTopic === 0}
                  onClick={() => generateQuiz(selectedTopic)}
                >
                  Generate quiz!
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full rounded-xl border p-4 border-gray-400 bg-white shadow-lg overflow-auto">
              {/* Display Quiz Questions */}
              {response.map((question, index) => (
                <div key={question.id} className="mb-4 border-b-2 p-2 py-4">
                  <p className="font-semibold pb-2">
                    {index + 1}. {question.question}
                  </p>
                  <div className="flex flex-col pl-6">
                    <div>
                      <input
                        id={`${question.id}_a`}
                        name={`question_${question.id}`}
                        value="option_a"
                        type="radio"
                        className="mr-3"
                      />
                      {question.option_a}
                    </div>

                    <div>
                      <input
                        id={`${question.id}_b`}
                        name={`question_${question.id}`}
                        value="option_b"
                        type="radio"
                        className="mr-3"
                      />
                      {question.option_b}
                    </div>

                    <div>
                      <input
                        id={`${question.id}_c`}
                        name={`question_${question.id}`}
                        value="option_c"
                        type="radio"
                        className="mr-3"
                      />
                      {question.option_c}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <button className="bg-blue-500 text-white p-4 m-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 "
                  onClick={() => submitQuiz()}>
                  Send Answers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
