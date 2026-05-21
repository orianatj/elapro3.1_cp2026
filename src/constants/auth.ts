import type { UserRole } from "../types/common/User";

export const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
    student: "/student",
    admin: "/admin",
    "supervisory_teacher": "/teacher",
    "external_teacher": "/teacher"
};
