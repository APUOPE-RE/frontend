export type ChatBotRequestData = {
	userId: number;
	conversationId: number;
	chapterId: number;
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
    datetime: Date;
    subject: string;
}

export type EmailforPassReset = {
    email: string;
    errors: string;
}

export type MessageData = {
    conversationId: number;
    messageId: number;
    content: string;
    source: number;
    timeStamp: Date;
}

export type NewPasswordData = {
    uuid: string;
    passwordFirst: string;
    passwordSecond: string;
    errors: string;
};

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
}

export type UserCredentials = {
    email: string;
    passwordHash: string;
    errors: string;
};
