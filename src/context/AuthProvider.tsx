import type { ReactNode } from "react";
import { createContext, useState } from "react";
import type { User } from "../types/common/User.ts";
import type { Credentials } from "../types/common/Auth.ts";


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

    /* Create the authentication state of the user. setUser is the function to update the state, user state starts as null (not logged in)
*/


    const [user, setUser] = useState(null);



    return <div>{children}</div>


};



//