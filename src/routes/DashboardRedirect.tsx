import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/common/User";

const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
    student: "/student",
    admin: "/admin",
    "supervisory-teacher": "/teacher",
    "external-teacher": "/teacher"
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
            <Navigate to="/" replace />
        )
    }

    // Redirect users with restricted account states
    if (user.accountStatus !== "active") {
        return (
            <Navigate to="/" replace />
        )
    }

    // Redirect authenticated, active users to role-specific dashboard
    return (
        <Navigate to={ROLE_DASHBOARD_MAP[user.userRole]}
            replace />
    )
}

