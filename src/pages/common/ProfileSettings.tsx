import { useCurrentUser } from "../../hooks/useCurrentUser";

// User profile component that contains general account settings and prefernces - all user roles
export function ProfileSettings() {
    const { data: user } = useCurrentUser(["profile-settings"]);

    // AxiosResponse data is in user.data
    const userData = user?.data;

    return (
        <div>
            <div>This is where profile settings will go</div>
            <div>{userData?.emailAddress || "No email found"}</div>
        </div>
    );


};