import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// Define custom hook that gives access to the authentication context
export function useAuth() {

    // Access AuthContext and throw an error if used outside of AuthProvider
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error();
    }

    return context;
}