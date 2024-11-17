"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { UserCredentials, validateUser } from "../actions/login";
import { useEffect, useState } from "react";

const QUIZ_LIST = [
    {
      id: 1,
      title: "Dark patterns",
      date: "15/10/2024",
      time: "15:34",
      score: {
        current: 4,
        total: 5
      },
      questions: [
        {
          id: 1,
          topic: "Question 1 topic",
          text: "Question number 1?",
          type: "open",
          answer: "This is a test answer for open question number 1.",
          feedback: "This is some feedback from the AI.",
          correct: false,
          value: 1,
          score: 0
        },
        {
          id: 2,
          topic: "Question 2 topic",
          text: "Question number 2?",
          type: "multiple_choice",
          options: [
            { text: "Option 1", is_correct: false },
            { text: "Option 2", is_correct: true, is_selected: true },
            { text: "Option 3", is_correct: false }
          ],
          feedback: "This is some feedback from the AI.",
          correct: false,
          value: 1,
          score: 1
        }
      ]
    },
    {
      id: 2,
      title: "User Experience",
      date: "18/10/2024",
      time: "10:20",
      score: {
        current: 3,
        total: 5
      },
      questions: [
        {
          id: 1,
          topic: "Question 1 topic",
          text: "What is User Experience?",
          type: "open",
          answer: "A broad term related to the end-user's interaction with a product.",
          feedback: "Great explanation!",
          correct: true,
          value: 1,
          score: 1
        },
        {
          id: 2,
          topic: "Question 2 topic",
          text: "What affects UX?",
          type: "multiple_choice",
          options: [
            { text: "Company's income", is_correct: false },
            { text: "Aesthetics", is_correct: true },
            { text: "Company's internal process", is_correct: false, is_selected: true }
          ],
          feedback: "Consider the user's perspective.",
          correct: false,
          value: 1,
          score: 0
        }
      ]
    }
  ];
  
  

export default function Quiz() {
    const [selectedQuizId, setSelectedQuizId] = useState(QUIZ_LIST[0].id);

    const selectedQuiz = QUIZ_LIST.find(quiz => quiz.id === selectedQuizId);

	return (
        <div className="flex w-full bg-gray-100 p-3" style={{height: "88dvh"}}>
            <div className="basis-1/4 me-3  bg-white p-3 h-full rounded overflow-auto">
            
                {QUIZ_LIST.map(quiz => (
                    <div
                        key={quiz.id}
                        className={`flex w-100 h-20 rounded-xl mt-3 p-3 cursor-pointer hover:bg-gray-200 shadow-lg ${
                            selectedQuizId === quiz.id ? 'border border-gray-400' : 'bg-white'
                          }`}
                        onClick={() => setSelectedQuizId(quiz.id)}
                    >
                        <div className="basis-3/4">
                            <p>{quiz.title}</p>
                        </div>
                        <div className="basis-1/4 flex flex-col justify-between">
                            <p className="bg-blue-500 text-center text-white rounded-xl">
                                {quiz.score.current}/{quiz.score.total}
                            </p>
                            <p className="text-sm text-gray-500">
                                {quiz.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>


            <div className="basis-3/4 flex flex-col bg-white p-3 h-full rounded">
                {selectedQuiz && (
                    <>
                        <div className="basis-2/12 flex flex-row justify-between" style={{ height: "10%" }}>
                            <div className="flex flex-col justify-center">
                                <p>{selectedQuiz.date}</p>
                                <p>{selectedQuiz.time}</p>
                            </div>
                            <div className="flex items-center font-bold text-2xl">
                                <p>{selectedQuiz.title}</p>
                            </div>
                            <div className="flex items-center">
                                <p>Score: <span className="bg-blue-500 text-white rounded-md px-2 py-1">{selectedQuiz.score.current}/{selectedQuiz.score.total}</span></p>
                            </div>
                        </div>

                        <div className="basis-10/12" style={{ height: "90%" }}>
                            <div className="w-full h-full p-4 rounded-xl bg-gray-200">
                                <div className="w-full h-full rounded-xl border p-4 border-gray-400 bg-white">
                                    <div className="w-full h-full overflow-auto px-3">
                                        {selectedQuiz.questions.map((question, index) => (
                                            <div key={question.id}>
                                                <div className="flex justify-between mb-2">
                                                    <p className="text-gray-500">{question.topic}</p>
                                                    <p className="text-gray-500">{question.score}/{question.value}</p>
                                                </div>
                                                
                                                <p className="mb-2"><strong>{index + 1}. {question.text}</strong></p>

                                                {question.type === 'open' ? (
                                                    <div 
                                                    className={`flex border p-2 mb-2 rounded-xl ${
                                                        question.correct ? "border-lime-500" : "border-red-500"
                                                      }`}
                                                    >
                                                        <div className="basis-11/12">
                                                            <strong>Answer:</strong>
                                                            <p>{question.answer}</p>
                                                        </div>
                                                        <div className="basis-1/12">
                                                            <p className={`${question.correct ? "text-lime-500" : "text-red-500"}`}>
                                                                {question.correct ? "Correct!" : "Incorrect!"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    question.options.map((option, optionIndex) => (
                                                        <div key={optionIndex} className={`flex items-center mb-2 p-2 ${option.is_selected && "border rounded-xl"} ${option.is_selected && option.is_correct ? "border-lime-500" : "border-red-500"}`}>
                                                            <div className="basis-11/12">
                                                                <input 
                                                                    type="radio" 
                                                                    disabled 
                                                                    checked={option.is_selected || false} 
                                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                                                                />
                                                                <label className="ms-2 text-gray-900">
                                                                    {option.text} 
                                                                    {option.is_correct && <span className="ms-3 text-gray-400">Correct answer</span>}
                                                                </label>
                                                            </div>
                                                            {option.is_selected && (
                                                                <div className="basis-1/12">
                                                                    <p className={`${option.is_correct ? "text-lime-500" : "text-red-500"}`}>
                                                                        {option.is_correct ? "Correct!" : "Incorrect!"}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))
                                                )}

                                                <div className="border border-gray-300 p-2 rounded-xl mb-4">
                                                    <strong>AI feedback:</strong>
                                                    <p>{question.feedback}</p>
                                                </div>

                                                {index < selectedQuiz.questions.length - 1 && (
                                                    <hr className="h-px my-8 bg-gray-200 border-0"></hr>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
	);
}
