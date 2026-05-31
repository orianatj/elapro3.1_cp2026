import { useState, useEffect } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useUpdateMe } from "../../hooks/useUpdateMe";

// User profile component that contains general account settings and prefernces - all user roles
export function ProfileSettings() {
    const { data: user } = useCurrentUser(["profile-settings"]);
    const updateMe = useUpdateMe();

    // AxiosResponse data is in user.data
    const userData = user?.data;

    const [formData, setFormData] = useState({
        firstName: userData?.firstName || "",
        middleName: userData?.middleName || "",
        lastName: userData?.lastName || "",
        phoneNumber: userData?.phoneNumber || "",
    });

    const [error, setError] = useState("");

    // Sync form data with user data when it refetches
    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || "",
                middleName: userData.middleName || "",
                lastName: userData.lastName || "",
                phoneNumber: userData.phoneNumber || "",
            });
        }
    }, [userData]);

    const handleSaveClick = async () => {
        setError("");
        updateMe.mutate(formData, {
            onSuccess: () => {
                // Form will be updated when the query refetches with new data
            },
            onError: (error: any) => {
                if (error.response?.status === 400) {
                    setError("Failed to update profile. Please check your input.");
                } else if (error.response?.status === 422) {
                    setError("Some information appears to be invalid. Please review your details and try again.");
                } else {
                    setError("Something went wrong. Please try again.");
                }
            },
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="auth-card">
            <div className="auth-header">
                <h2 className="auth-title">Profile Settings</h2>
                <p className="auth-instruction">Update your personal information</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }} className="auth-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="middleName">Middle Name (optional)</label>
                    <input
                        id="middleName"
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number (optional)</label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                {error && <p className="auth-error">{error}</p>}

                <button className="auth-button" type="submit" disabled={updateMe.isPending}>
                    {updateMe.isPending ? "Updating..." : "Update Details"}
                </button>

                <div className="form-group">
                    <label>Email</label>
                    <span>{userData?.emailAddress || "No email found"}</span>
                </div>

                <div className="form-group">
                    <label>User ID</label>
                    <span>{userData?.userId || "No userid found"}</span>
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <span>{userData?.userRole || "No role found"}</span>
                </div>

                <div className="form-group">
                    <label>Account Status</label>
                    <span>{userData?.accountStatus || "No account status found"}</span>
                </div>
            </form>
        </div>
    );


};