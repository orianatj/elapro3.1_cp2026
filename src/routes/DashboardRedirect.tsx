import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/common/User";
import { LoginPage } from "../pages/auth/LoginPage";

const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
    student: "/student",
    admin: "/admin",
    "supervisory_teacher": "/teacher",
    "external_teacher": "/teacher"
};

export function DashboardRedirect() {

    const {
        user,
        isAuthenticated,
        isAuthLoading
    } = useAuth();


    // Prevent redirect before auth state resolves
    if (isAuthLoading) {
        return (
            <div>Loading...</div>
        )
    }

    // Redirect unauthenticated users to login
    if (!isAuthenticated || !user) {
        return (
            <LoginPage />
        )
    }

    // Redirect users with restricted account states
    if (user.accountStatus !== "active") {
        return (
            <LoginPage />
        )
    }

    // Redirect authenticated, active users to role-specific dashboard
    return (
        <Navigate to={ROLE_DASHBOARD_MAP[user.userRole]}
            replace />
    )
}

