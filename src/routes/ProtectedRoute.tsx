import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/common/User";
import { ROLE_DASHBOARD_MAP } from "../constants/auth";

// Define props for protected route component 
type ProtectedRouteProps = {
    allowedRoles: UserRole[];
};

// Define ProtectedRoute component to enforce authentication and RBAC
export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {

    // Access global authentication state
    const {
        user,
        isAuthenticated,
        isAuthLoading
    } = useAuth();

    // Prevent redirect whilst authentication state is resolving
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
        );
    }

    // Redirect users with account states other than 'active'
    if (!allowedRoles.includes(user.userRole)) {

        // Redirect user back to their own dashboard
        return (
            <Navigate to={ROLE_DASHBOARD_MAP[user.userRole]} replace />
        );
    }

    // Render nested protected routes when access is authorised 
    return <Outlet />

}

