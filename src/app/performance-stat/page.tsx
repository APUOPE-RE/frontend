"use client";

import QuizBarChart from "@/src/components/charts/barChart";
import QuizLineChart from "@/src/components/charts/lineChart";
import QuizPieChart from "@/src/components/charts/pieChart";
import { useAppContext } from "@/src/context";
import { useState, useMemo } from "react";

export default function Performance() {
  const { previousQuizzes, materials } = useAppContext();
  const [numberOfQuizzes, setNumberOfQuizzes] = useState<number>(5);

  // Function to fetch the previous quizzes based on the selected number of quizzes
  function fetchPreviousQuizzes(params: number) {
    const sortedQuizzes = previousQuizzes
      .sort(
        (a, b) =>
          new Date(b.quizResultData.datetime).getTime() -
          new Date(a.quizResultData.datetime).getTime()
      )
      .slice(0, params);

    const getSubjectLabel = (id: number) => {
      return materials.find((m) => m.id === id);
    };

    return sortedQuizzes.map((q) => ({
      ...q,
      subjectLabel: getSubjectLabel(q.quizData.lectureId)?.label,
    }));
  }
  console.log(fetchPreviousQuizzes(numberOfQuizzes));

  // Handle dropdown change
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfQuizzes(Number(e.target.value));
  };

  // Calculate the average grade for the selected quizzes reactively
  const averageGrade = useMemo(() => {
    const quizzes = fetchPreviousQuizzes(numberOfQuizzes);
    const totalScore = quizzes.reduce((sum, quiz) => sum + quiz.quizResultData.score, 0);
    const totalMaxScore = quizzes.reduce(
      (sum, quiz) => sum + quiz.quizResultData.maxScore,
      0
    );
    return totalMaxScore > 0 ? (totalScore / totalMaxScore) * 10 : 0;
  }, [numberOfQuizzes, previousQuizzes]);

  /* const chartData = useMemo(() => {
    return fetchPreviousQuizzes(numberOfQuizzes).map((quiz) => ({
      name: quiz.subjectLabel || "Unknown Subject",
      score: quiz.quizResultData.score,
    }));
  }, [numberOfQuizzes, previousQuizzes]); */


  const lineChartData = useMemo(() => {
    return fetchPreviousQuizzes(numberOfQuizzes)
      .sort((a, b) => new Date(a.quizResultData.datetime).getTime() - new Date(b.quizResultData.datetime).getTime())
      .map((quiz) => ({
        date: new Date(quiz.quizResultData.datetime).toLocaleDateString(),
        score: quiz.quizResultData.score,
        subject: quiz.subjectLabel || "Unknown Subject",
      }));
  }, [numberOfQuizzes, previousQuizzes]);


  const barChartData = useMemo(() => {
    const subjectScores: Record<string, { totalScore: number; count: number }> = {};
    
    fetchPreviousQuizzes(numberOfQuizzes).forEach((quiz) => {
      const subject = quiz.subjectLabel || "Unknown Subject";
      if (!subjectScores[subject]) {
        subjectScores[subject] = { totalScore: 0, count: 0 };
      }
      subjectScores[subject].totalScore += quiz.quizResultData.score;
      subjectScores[subject].count += 1;
    });
  
    return Object.keys(subjectScores).map((subject) => ({
      name: subject,
      avgScore: subjectScores[subject].totalScore / subjectScores[subject].count,
    }));
  }, [numberOfQuizzes, previousQuizzes]);


  const pieChartData = useMemo(() => {
    const subjectScores: Record<string, number> = {};
  
    fetchPreviousQuizzes(numberOfQuizzes).forEach((quiz) => {
      const subject = quiz.subjectLabel || "Unknown Subject";
      subjectScores[subject] = (subjectScores[subject] || 0) + quiz.quizResultData.score;
    });
  
    return Object.entries(subjectScores).map(([subject, totalScore]) => ({
      name: subject,
      score: totalScore,
    }));
  }, [numberOfQuizzes, previousQuizzes]);

  return (
    <div className="p-8">
      <div className="flex flex-col items-center sm:flex-row justify-between gap-2">
        <div className="flex flex-col w-48 min-h-24 items-start shadow-md p-2 border rounded-md text-lg text-nowrap font-semibold">
          Number of Quizzes
          <div className="m-2  text-base text-gray-500">{numberOfQuizzes}</div>
        </div>
        <div className="flex flex-col w-48 min-h-24 items-start shadow-md p-2 border rounded-md text-lg text-nowrap font-semibold">
          Average Grade
          <div className="mt-2 text-base text-gray-500">{averageGrade.toFixed(1)} / 10</div>
        </div>
        <div className="flex flex-col w-48 min-h-24 items-start shadow-md p-2 border rounded-md text-lg text-nowrap font-semibold">
          <label htmlFor="quiz-count" className="text-sm font-semibold">
            Select Number of Quizzes
          </label>
          <select
            id="quiz-count"
            value={numberOfQuizzes}
            onChange={handleDropdownChange}
            className="mt-2 p-2 border rounded-md text-sm font-medium"
          >
            <option value={5}>Last 5 Quizzes</option>
            <option value={10}>Last 10 Quizzes</option>
            <option value={20}>Last 20 Quizzes</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10 px-8">
        <QuizLineChart data={lineChartData}/>
        <QuizBarChart data={barChartData}/>
      </div>

      <div className="mt-10 px-8">
        <QuizPieChart data={pieChartData}/>
      </div>
    </div>
  );
}
