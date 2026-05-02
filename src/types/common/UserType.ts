// Define type for data associated with an authenticated user
export type User = {
    userId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    emailAddress: string;
    phoneNumber?: string;
    userRole: string;
};

// Define a type for user login credentials
export type UserCredentials = {
    emailAddress: string;
    password: string;
};

// Define a type for user registration data
export type UserRegistration = {
    firstName: string;
    middleName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
};