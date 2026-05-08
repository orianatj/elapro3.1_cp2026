import type { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";
import type { User } from "../types/common/User.ts";
import type { Credentials } from "../types/common/Auth.ts";
import { useLogin } from "../hooks/useLogin.ts";
import { useCurrentUser } from "../hooks/useCurrentUser.ts";
import { useQueryClient } from "@tanstack/react-query";


// Define props for AuthContext
type AuthContextProps = {
    user: User | null;
    login: (Credentials: Credentials) => Promise<void>;
    logout: () => void;
};

// Define a global authentication context to manage authentication state
export const AuthContext = createContext<AuthContextProps | null>(null);

// Define props for AuthProvider
type AuthProviderProps = {
    children: ReactNode;
};

// Define context provider component - role to pass on global context to children 
export function AuthProvider({ children }: AuthProviderProps) {

    const queryClient = useQueryClient();

    /* Holds the currently authenticated user. setUser is the function to update the state, user state starts as null (not logged in) */
    const [user, setUser] = useState(null);

    // Extract async mutation function (returns a promise when called)
    const loginMutation = useLogin().mutateAsync;

    // Call TSQ hook to retrieve autheticated user's data
    const { data } = useCurrentUser();

    /* Sync server data change with updating global auth state. The dependency array ensures the hook is run whevener data changes. */
    useEffect(() => {
        if (data) setUser(data.data);
    }, [data]);

    // Define async function to handle login result and update global state  
    async function login(credentials: Credentials) {

        try {

            // Call the mutation and store the resolved response 
            const res = await loginMutation(credentials);

            // Extract data propery containing token and assign to variable 
            const { accessToken } = res.data.data;

            // Persist access token for the current session to authenticate API calls
            sessionStorage.setItem("token", accessToken);

            // Invalidate current user data by marking it as stale and trigger refetching 
            queryClient.invalidateQueries({ queryKey: ["me"] });

        } catch (error: any) {

            const status = error.response?.status;

            const errors = error.response?.data?.detail?.errors ?? [];

            const hasInvalidCredentials = errors.some(
                (e: any) => e.code === "INVALID_CREDENTIALS"
            );

            // Log invalid credential errors for debugging 
            if (status === 401 && hasInvalidCredentials) {
                console.warn("Login failed: invalid credentials")
            }

            // Pass it upward to the UI component
            throw error;
        }
    };

    // Function to handle logout by clearing auth state and cached user data
    function logout() {

        // Remove access token 
        sessionStorage.removeItem("token");

        // Reset user to unauthenticated - no user details available.
        setUser(null);

        // Clear cached data
        queryClient.removeQueries({ queryKey: ["me"] });
    };

    // Provide auth state and actions (user, login, logout) to all child components via context
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};
