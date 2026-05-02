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

