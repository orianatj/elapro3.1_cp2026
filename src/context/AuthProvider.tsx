import type { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";
import type { User } from "../types/common/User.ts";
import type { Credentials } from "../types/common/Auth.ts";
import { useLogin } from "../hooks/useLogin.ts";
import { useCurrentUser } from "../hooks/useCurrentUser.ts";
import { useQueryClient } from "@tanstack/react-query";

// 
const queryClient = useQueryClient();

// Define props for AuthContext
type AuthContextProps = {
    user: User | null;
    login: (Credentials: Credentials) => Promise<void>;
    logout: () => void;
};

// Define a global authentication context to manage authentication state
const AuthContext = createContext<AuthContextProps | null>(null);

// Define props for AuthProvider
type AuthProviderProps = {
    children: ReactNode;
};

// Define context provider component - role to pass on global context to children 
export function AuthProvider({ children }: AuthProviderProps) {

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

    /* Define async function to handle login result and update global state  */
    async function login(credentials: Credentials) {

        const res = await loginMutation(credentials);

        const { accessToken } = res.data;

        sessionStorage.setItem("token", accessToken);

        /* Invalidates current user data by marking it as stale and triggers refetching */
        queryClient.invalidateQueries({ queryKey: ["me"] });
    };

    function logout() {
        sessionStorage.removeItem("token");

        setUser(null);

        /* Clear cached data*/
        queryClient.removeQueries({ queryKey: ["me"] });
    }


    return <div>{children}</div>


};



//