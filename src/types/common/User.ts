// Define a union type to strongly type user roles
export type UserRole = "student" | "admin" | "supervisory_teacher" | "external_teacher";

// Define a union type to strongly type account status
export type AccountStatus = "active" | "pending" | "inactive" | "active" | "cancelled";


// Define type for data associated with an authenticated user
export type User = {
    userId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    emailAddress: string;
    phoneNumber?: string;
    userRole: UserRole;
    accountStatus: AccountStatus;
};
