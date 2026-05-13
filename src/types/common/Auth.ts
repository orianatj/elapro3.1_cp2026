// Define a type for user login credentials
export type Credentials = {
    emailAddress: string;
    password: string;
};

// Define a type for user registration data
export type Registration = {
    firstName: string;
    middleName?: string;
    lastName: string;
    emailAddress: string;
    phoneNumber?: string;
    password: string;
    confirmPassword: string;
};

// Define a type for password reset 
export type PasswordReset = {
    token: string;
    newPassword: string;
    confirmPassword: string;
};

// Define a type used for resending verification email 
export type EmailRequest = {
    emailAddress: string;
};

// Define a type used for sending an email to reset a forgotten password
export type ForgotPassword = {
    emailAddress: string;
};
