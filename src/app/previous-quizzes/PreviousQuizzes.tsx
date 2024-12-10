import React, { Dispatch, SetStateAction } from "react";
import { useAppContext } from "@/src/context";
import { QuestionData, QuizAnswerData, QuizSummaryData } from "../types/types";
import { fetchPreviousQuiz } from "../actions/generateQuiz";

type PreviousQuizzesProps = {
	currentQuiz: number;
	setQuizSummaryData: Dispatch<SetStateAction<QuizSummaryData | undefined>>;
  setQuestionDataList:  Dispatch<SetStateAction<QuestionData[] | []>>;
  setAnswerDataList:  Dispatch<SetStateAction<QuizAnswerData[] | []>>;
};

export const PreviousQuizzes = ({
	currentQuiz,
	setQuizSummaryData,
  setQuestionDataList,
  setAnswerDataList
}: PreviousQuizzesProps) => {
	const { previousQuizzes, materials } = useAppContext();

	const filterSubject = (id: number) => {
		return materials.find((m) => m.id === id);
	};

	const fetchQuizSummaryData = async (quizId: number) => {
		if (quizId !== currentQuiz) {
			const response = await fetchPreviousQuiz(quizId);
      if (response !== undefined){
				setQuizSummaryData(response);
				setQuestionDataList(response.quizData.questionDataList);
        setAnswerDataList(response.quizResultData.quizAnswerDataList);
      }
		}
	};

	return (
		<>
			{previousQuizzes.map((q) => {
				return (
					<button
						key={q.quizId}
						className="w-[99%] h-20 border p-2 border-none rounded-lg mb-2 bg-gray-100 shadow-md hover:bg-blue-100"
						onClick={() => fetchQuizSummaryData(q.quizId)}
					>
						<p className="text-xs text-right">
							{new Date(q.quizResultData.datetime).toLocaleDateString()}
						</p>
						<p className="pt-3 pl-3 text-left">
							{
								filterSubject(q.quizData.lectureId > 0 ? q.quizData.lectureId : 1)
									?.label
							}
						</p>
					</button>
				);
			})}
		</>
	);
};
