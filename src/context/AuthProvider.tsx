import type { ReactNode } from "react";
import { createContext } from "react";
import type { User } from "../types/common/User.ts";
import type { Credentials } from "../types/common/Auth.ts";
import { useLogin } from "../hooks/useLogin.ts";
import { useCurrentUser } from "../hooks/useCurrentUser.ts";
import { useQueryClient } from "@tanstack/react-query";


// Define props for AuthContext
type AuthContextProps = {
    // Currently authenticated user's profile information
    user: User | null;

    // Boolean flag indicating whether a valid authenticated user exists
    isAuthenticated: boolean;

    // Indicates whether authentication state is still being resolved
    isAuthLoading: boolean;

    // Function to authenticate a user with login credentials
    login: (Credentials: Credentials) => Promise<void>;

    // Function to clear authentication state and end the session
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

    // Extract async mutation function (returns a promise when called)
    const loginMutation = useLogin().mutateAsync;

    // Extract current authenticated user query state from React Query
    const {
        data,
        isLoading,
        isFetching,
    } = useCurrentUser();

    /* Extract authenticated user data from the API response. Falls back to null when no authenticated user exists */
    const user = data?.data ?? null;

    // Determine whether a valid authenticated user session exists
    const isAuthenticated = user !== null;

    /* Combine query loading states to track whether authentication state is still being resolved */
    const isAuthLoading = isLoading || isFetching;


    // Define async function to handle login result and update global state  
    async function login(credentials: Credentials) {

        try {

            // Call the mutation and store the resolved response 
            const res = await loginMutation(credentials);

            // Extract data propery containing token and assign to variable 
            const { accessToken } = res.data.data;

            // Persist access token for the current session to authenticate API calls
            sessionStorage.setItem("token", accessToken);

            /* Trigger refetch of authenticated user data after login succeeds. Ensures the latest user profile is loaded into global auth state */
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

        /* Remove cached authenticated user data after logout. Prevents stale user information persisting across sessions */
        queryClient.removeQueries({ queryKey: ["me"] });
    };

    /* Provide authentication state and auth actions globally
    to all descendant components within the application */
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAuthLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};
