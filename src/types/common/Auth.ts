// Define a type for user login credentials
export type Credentials = {
    emailAddress: string;
    password: string;
};

// Define a type for user registration data
export type Registration = {
    firstName: string;
    middleName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
};

// Define a type for password reset 
export type PasswordReset = {
    newPassword: string;
    confirmPassword: string;
};

// Define a type used for resending verification email and for resetting a user's password
export type EmailRequest = {
    emailAddress: string;
};

