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