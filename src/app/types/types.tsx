export type ChatBotRequestData = {
	conversationId: number;
	lectureId: number;
	content: string;
};

export type ChatBotResponseData = {
	conversationId: number;
	messageId: number;
	content: string;
	source: number;
	timeStamp: Date;
};

export type ConversationData = {
	id: number;
	accountId: number;
	chapterId: number;
	dateTime: Date;
	subject: string;
};

export type EmailforPassReset = {
	email: string;
	errors: string;
};

export type MessageData = {
	conversationId: number;
	messageId: number;
	content: string;
	source: number;
	timeStamp: Date;
};

export type Message = {
	from: string;
	message: string;
};

export type NewPasswordData = {
	uuid: string;
	passwordFirst: string;
	passwordSecond: string;
	errors: string;
};

export type QuizSubmitAnswerData = {
	questionNumber: number;
	answer: string;
  };

export type QuizSubmitData = {
	quizId: number;
	quizSubmitAnswerDataList: QuizSubmitAnswerData[];
  };
  
export type QuestionData = {
    id: number;
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    correct_option: string;
    points: number;
	question_number: number;
}

export type QuizAnswerData = {
    id: number;
    quizResultId: number;
    questionId: number;
    answer: string;
    correct: boolean;
    points: number;
}

export type QuizData = {
    id: number;
    accountId: number;
    lectureId: number;
    maxPoints: number;
    questionDataList: QuestionData[];
}

export type QuizResultData = {
    id: number;
    accountId: number;
    quizId: number;
    score: number;
    maxScore: number;
    datetime: Date;
    quizAnswerDataList: QuizAnswerData[];
}

export type QuizSummaryData = {
    quizId: number;
    quizData: QuizData;
    quizResultData: QuizResultData;
}

export type RegistrationData = {
	email: string;
	username: string;
	passwordFirst: string;
	passwordSecond: string;
	errors: string;
};

export type ResponseData<T> = {
	success: boolean;
	data: T;
};

export type UserCredentials = {
	email: string;
	passwordHash: string;
	errors: string;
};
