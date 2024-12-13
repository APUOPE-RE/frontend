import React, { Dispatch, SetStateAction } from "react";
import { useAppContext } from "@/src/context";
import { QuestionData, QuizAnswerData, QuizSummaryData } from "../types/types";
import { fetchPreviousQuiz } from "../actions/generateQuiz";

type PreviousQuizzesProps = {
	currentQuiz: number;
	setQuizSummaryData: Dispatch<SetStateAction<QuizSummaryData | undefined>>;
	setQuestionDataList: Dispatch<SetStateAction<QuestionData[] | []>>;
	setAnswerDataList: Dispatch<SetStateAction<QuizAnswerData[] | []>>;
};

export const PreviousQuizzes = ({
	currentQuiz,
	setQuizSummaryData,
	setQuestionDataList,
	setAnswerDataList
}: PreviousQuizzesProps) => {
	const { previousQuizzes, materials } = useAppContext();
	const { setDropdownOpen } = useAppContext();

	const filterSubject = (id: number) => {
		return materials.find((m) => m.id === id);
	};

	const fetchQuizSummaryData = async (quizId: number) => {
		if (quizId !== currentQuiz) {
			const response = await fetchPreviousQuiz(quizId);
			if (response !== undefined) {
				setQuizSummaryData(response);
				setQuestionDataList(response.quizData.questionDataList);
				setAnswerDataList(response.quizResultData.quizAnswerDataList);
			}
		}
	};

	return (
		<>
			<div className="hidden md:block">
				{previousQuizzes.map((q) => {
					return (
						<button
							key={q.quizId}
							className="w-[99%] h-20 border p-2 border-none rounded-lg mb-2 bg-gray-100 shadow-md hover:bg-blue-100"
							onClick={() => fetchQuizSummaryData(q.quizId)}
						>
							<div className="flex items-center justify-between">
								<p className="text-xs text-left">
									{new Date(q.quizResultData.datetime).toLocaleDateString()}
								</p>
								<div className="basis-1/4 flex flex-col justify-between">
									<p className="bg-blue-500 text-center text-white rounded-xl">
										{q.quizResultData.score}/{q.quizResultData.maxScore}
									</p>
								</div>
							</div>
							<p className="pt-3 pl-3 text-left">
								{
									filterSubject(q.quizData.lectureId > 0 ? q.quizData.lectureId : 1)
										?.label
								}
							</p>
						</button>
					);
				})}
			</div>

			{/* mobile */}
			<div className="md:hidden">
				{/* <div className="flex justify-center md:hidden">

					<input
						type="search"
						placeholder="Search title"
						value={title}
						ref={searchInputRef}
						onChange={(e) => setTitle(e.target.value)}
						className="w-[90%] h-8 mt-2 mb-2 mx-auto bg-slate-200 p-2 outline-none border border-gray-500"
					/>
				</div> */}
				<ul>
					{previousQuizzes.map((q) => (
						<li
							key={q.quizId}
							className="p-2 cursor-pointer hover:bg-gray-200 rounded-lg"
							onClick={() => {
								fetchQuizSummaryData(q.quizId);
								setDropdownOpen(false);
							}}
						>
							{filterSubject(q.quizData.lectureId > 0 ? q.quizData.lectureId : 1)
								?.label}
							<div className="flex justify-between items-center mt-2">
								<p className="text-sm text-gray-500">{new Date(q.quizResultData.datetime).toLocaleDateString()}</p>
								<p className="bg-blue-500 text-center text-white rounded-xl px-2 py-1">
									{q.quizResultData.score}/{q.quizResultData.maxScore}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
