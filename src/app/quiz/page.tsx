"use client";

import { useState } from "react";
import { fetchQuiz } from "../actions/generateQuiz";
import { useAppContext } from "@/src/context";

export default function Quiz() {
  const { materials } = useAppContext();
  const date = new Date();
  const currentDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;

  const [value, setValue] = useState<string | null>("");
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState<string | null>("");

  const filteredItems = materials.filter((item) =>
    item.label.toLowerCase().includes(topic.toLowerCase())
  );

  const generateQuiz = async (value: string | null): Promise<void> => {
    const quizResponse = await fetchQuiz(value);
    setResponse(quizResponse);
  };

  return (
    <div className="flex w-full bg-gray-100 p-3" style={{ height: "88dvh" }}>
      <div className="basis-1/4 me-3 shadow-lg bg-white px-3 h-full rounded overflow-auto">
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
            {/*             <button className="right-1 absolute top-1/2 -translate-y-1/2 p-2">
              <CiSearch size={40} color="gray" />
            </button> */}
          </div>
        </form>

        <div>
          {filteredItems.map((item) => (
            <div
              className="flex justify-between items-center w-100 h-20 rounded-xl mt-3 p-3 bg-gray-100 shadow-lg cursor-pointer"
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
        </div>
      </div>

      <div className="basis-3/4 flex flex-col shadow-lg p-3 h-full rounded">
        <div
          className="basis-2/12 flex flex-row justify-between"
          style={{ height: "10%" }}
        >
          <div className="flex flex-col justify-center">
            <p>{currentDate}</p>
          </div>
          <div className="flex items-center font-bold text-2xl">
            <p>Selected Topic</p>
          </div>
          <div className="flex items-center">
            <p>
              Score:{" "}
              <span className="bg-blue-500 text-white rounded-md px-2 py-1">
                4/5
              </span>
            </p>
          </div>
        </div>
        <div className="basis-10/12 py-10" style={{ height: "90%" }}>
          {response === "" ? (
            <div className=" flex flex-col justify-between w-full h-full p-4 rounded-xl bg-gray-200 shadow-lg">
              {value === "" ? (
                <p className="flex align-middle justify-center font-semibold text-3xl">
                  Please Select a Topic{" "}
                </p>
              ) : (
                <p className="flex align-middle justify-center font-semibold text-3xl">
                  {value}
                </p>
              )}

              <div className="flex justify-center align-middle">
                <button
                  className="bg-blue-500 text-white p-4 m-4 rounded-lg"
                  disabled={value === ""}
                  onClick={() => generateQuiz(value)}
                >
                  Generate quiz!
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full rounded-xl border p-4 border-gray-400 bg-white shadow-lg">
              <p>Something Went Wrong!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
