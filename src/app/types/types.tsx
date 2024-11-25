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

export type QuestionData = {
    id: number;
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    correctOption: string;
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
    dateTime: Date;
    quizAnswerDataList: QuizAnswerData[];
}

export type QuizAnswerData = {
    id: number;
    quizResultId: number;
    questionId: number;
    answer: string;
    correct: boolean;
    points: number;
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
