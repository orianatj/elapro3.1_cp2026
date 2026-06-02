import type { UserRole } from "../types/common/User";


export const USER_ROLE_LABELS: Record<UserRole, string> = {
    student: "Student",
    supervisory_teacher: "Teacher",
    external_teacher: "Teacher",
    admin: "Administrator",
};