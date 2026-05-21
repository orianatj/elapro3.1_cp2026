import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoginPage } from "../pages/auth/LoginPage";
import { ROLE_DASHBOARD_MAP } from "../constants/auth";


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

