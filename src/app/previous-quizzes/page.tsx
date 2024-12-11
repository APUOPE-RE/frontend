"use client";
import Image from "next/image";
import { useState } from "react";
import { QuestionData, QuizAnswerData, QuizSummaryData } from "../types/types";
import { CgSoftwareDownload } from "react-icons/cg";
import { downloadQuizPdf } from "../actions/quizDownloader";
import { PreviousQuizzes } from "./PreviousQuizzes";

export default function Quiz() {
	const [quizSummaryData, setQuizSummaryData] = useState<QuizSummaryData>();
	const [questionDataList, setQuestionDataList] = useState<QuestionData[]>(
		[]
	);
	const [answerDataList, setAnswerDataList] = useState<QuizAnswerData[]>([]);
	const [title, setTitle] = useState("");

	return (
		<div
			className="flex w-full bg-gray-100 p-3"
			style={{ height: "88dvh" }}
		>
			<div className="basis-1/4 me-3  bg-white p-3 h-full rounded overflow-auto">
				<div className="">
					<input
						type="search"
						placeholder="Search title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full bg-slate-200 p-4 rounded-2xl outline-none"
					/>
				</div>
				<div className="overflow-auto mt-1" style={{ height: "90%" }}>
					<PreviousQuizzes
						currentQuiz={quizSummaryData?.quizId ?? 0}
						setQuizSummaryData={setQuizSummaryData}
						setQuestionDataList={setQuestionDataList}
						setAnswerDataList={setAnswerDataList}
					/>
				</div>
			</div>

			<div className="basis-3/4 flex flex-col bg-white p-3 h-full rounded">
				{quizSummaryData ? (
					<div
						className="basis-2/12 flex flex-row justify-between"
						style={{ height: "10%" }}
					>
						<div className="flex flex-col justify-center">
							<p className="ml-2">
								{new Date(
									quizSummaryData?.quizResultData.datetime
								).toLocaleDateString()}
							</p>
						</div>
						<div className="flex items-center font-bold text-2xl">
							<p>
								Questions for lecture{" "}
								{quizSummaryData?.quizData.lectureId}
							</p>
						</div>
						<div className="flex items-center">
							<p>
								Score:{" "}
								<span className="bg-blue-500 text-white rounded-md px-2 py-1">
									{quizSummaryData?.quizResultData.score >= 0
										? quizSummaryData?.quizResultData
												.score +
										  "/" +
										  quizSummaryData?.quizResultData
												.maxScore
										: ""}
								</span>
							</p>
						</div>
					</div>
				) : (
					<div
						className="basis-2/12 flex flex-row justify-center items-center"
						style={{ height: "10%" }}
					>
						<div className="text-center font-bold text-2xl">
							<p>Select previous quiz</p>
						</div>
					</div>
				)}
				{quizSummaryData?.quizId !== 0 && (
					<div className="w-full h-full rounded-xl border p-4 border-gray-400 bg-white shadow-lg overflow-auto">
						{questionDataList.length > 0 &&
							questionDataList.map((question, index) => (
								<div
									key={question.id}
									className="mb-4 border-b-2 p-2 py-4"
								>
									<p className="font-semibold pb-2">
										{index + 1}. {question.question}
									</p>
									<div className="flex flex-col">
										<div
											className="inline mb-2"
											key={"option_a"}
										>
											<span
												className="mr-2 p-2"
												style={
													answerDataList.at(
														question.question_number-1
													)?.answer === "option_a" &&
													answerDataList.at(
														question.question_number-1
													)?.answer ===
														question.correct_option
														? {
																border: "1px solid green",
																borderRadius:
																	"5px",
														  }
														: answerDataList.at(
																question.question_number-1
														  )?.answer ===
																"option_a" &&
														  answerDataList.at(
																question.question_number-1
														  )?.answer !==
																question.correct_option
														? {
																border: "1px solid red",
																borderRadius:
																	"5px",
														  }
														: {}
												}
											>
												a. {question.option_a}
											</span>
											{"option_a" ===
											question.correct_option ? (
												<Image
													className="inline mb-0.5"
													src="/correct.png"
													alt="Correct"
													width={20}
													height={20}
												/>
											) : (
												<Image
													className="inline"
													src="/incorrect.png"
													alt="Incorrect"
													width={20}
													height={20}
												/>
											)}
										</div>
										<div
											className="inline mb-2"
											key={"option_b"}
										>
											<span
												className="mr-2 p-2"
												style={
													answerDataList.at(
														question.question_number-1
													)?.answer === "option_b" &&
													answerDataList.at(
														question.question_number-1
													)?.answer ===
														question.correct_option
														? {
																border: "1px solid green",
																borderRadius:
																	"5px",
														  }
														: answerDataList.at(
																question.question_number-1
														  )?.answer ===
																"option_b" &&
														  answerDataList.at(
																question.question_number-1
														  )?.answer !==
																question.correct_option
														? {
																border: "1px solid red",
																borderRadius:
																	"5px",
														  }
														: {}
												}
											>
												b. {question.option_b}
											</span>
											{"option_b" ===
											question.correct_option ? (
												<Image
													className="inline mb-0.5"
													src="/correct.png"
													alt="Correct"
													width={20}
													height={20}
												/>
											) : (
												<Image
													className="inline"
													src="/incorrect.png"
													alt="Incorrect"
													width={20}
													height={20}
												/>
											)}
										</div>
										<div
											className="inline"
											key={"option_c"}
										>
											<span
												className="mr-2 p-2"
												style={
													answerDataList.at(
														question.question_number-1
													)?.answer === "option_c" &&
													answerDataList.at(
														question.question_number-1
													)?.answer ===
														question.correct_option
														? {
																border: "1px solid green",
																borderRadius:
																	"5px",
														  }
														: answerDataList.at(
																question.question_number-1
														  )?.answer ===
																"option_c" &&
														  answerDataList.at(
																question.question_number-1
														  )?.answer !==
																question.correct_option
														? {
																border: "1px solid red",
																borderRadius:
																	"5px",
														  }
														: {}
												}
											>
												c. {question.option_c}
											</span>
											{"option_c" ===
											question.correct_option ? (
												<Image
													className="inline mb-0.5"
													src="/correct.png"
													alt="Correct"
													width={20}
													height={20}
												/>
											) : (
												<Image
													className="inline"
													src="/incorrect.png"
													alt="Incorrect"
													width={20}
													height={20}
												/>
											)}
										</div>
									</div>
								</div>
							))}
						{quizSummaryData?.quizId && (
							<button
								className="bg-blue-500 text-white p-4 m-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 flex align-middle justify-center "
								onClick={() => downloadQuizPdf(quizSummaryData.quizId)}
							>
								<CgSoftwareDownload className="w-6 h-6" />
								<span>Download as PDF</span>
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
