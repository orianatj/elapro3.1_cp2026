import { useCurrentUser } from "../../hooks/useCurrentUser";

// User profile component that contains general account settings and prefernces - all user roles
export function ProfileSettings() {
    const { data: user } = useCurrentUser(["profile-settings"]);

    // AxiosResponse data is in user.data
    const userData = user?.data;

    return (
        <div>
            <div>This is where profile settings will go</div>

            <div>{userData?.firstName || "No first name found"}</div>
            <div>{userData?.middleName || "No middle name found"}</div>
            <div>{userData?.lastName || "No last name found"}</div>
            <div>{userData?.phoneNumber || "No phone number found"}</div>
            <div>{userData?.emailAddress || "No email found"}</div>


            <div>{userData?.userId || "No userid found"}</div>
            <div>{userData?.userRole || "No role found"}</div>
            <div>{userData?.accountStatus || "No account status found"}</div>
        </div>
    );


};