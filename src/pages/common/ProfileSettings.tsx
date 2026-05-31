import { useState, useEffect } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useUpdateMe } from "../../hooks/useUpdateMe";
import { useUpdateEmail } from "../../hooks/useUpdateEmail";
import { useChangePassword } from "../../hooks/useChangePassword";
import { useAuth } from "../../hooks/useAuth";

// User profile component that contains general account settings and prefernces - all user roles
export function ProfileSettings() {
    const { data: user } = useCurrentUser(["profile-settings"]);
    const updateMe = useUpdateMe();
    const updateEmail = useUpdateEmail();
    const changePassword = useChangePassword();
    const { user: authUser } = useAuth();

    // AxiosResponse data is in user.data
    const userData = user?.data;

    // Email update is only available for students
    const isStudent = authUser?.userRole === "student";

    const [formData, setFormData] = useState({
        firstName: userData?.firstName || "",
        middleName: userData?.middleName || "",
        lastName: userData?.lastName || "",
        phoneNumber: userData?.phoneNumber || "",
    });

    const [error, setError] = useState("");

    const [showEmailForm, setShowEmailForm] = useState(false);
    const [emailFormData, setEmailFormData] = useState({
        password: "",
        newEmailAddress: "",
        confirmEmailAddress: "",
    });
    const [emailError, setEmailError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordFormData, setPasswordFormData] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

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
        // Only send fields that have changed from their original values
        const changedData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => {
                const originalValue = userData?.[key as keyof typeof userData] || "";
                return value !== originalValue;
            })
        );
        updateMe.mutate(changedData, {
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

    const handleEmailFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailFormData({ ...emailFormData, [e.target.name]: e.target.value });
    };

    const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordFormData({ ...passwordFormData, [e.target.name]: e.target.value });
    };

    const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError("");

        if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        if (!passwordFormData.password || !passwordFormData.newPassword || !passwordFormData.confirmPassword) {
            setPasswordError("Please fill in all fields.");
            return;
        }

        changePassword.mutate(passwordFormData, {
            onSuccess: () => {
                setShowPasswordForm(false);
                setPasswordFormData({
                    password: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setPasswordSuccess("Password updated successfully.");
                setTimeout(() => setPasswordSuccess(""), 5000);
            },
            onError: (error: any) => {
                if (error.response?.status === 400) {
                    setPasswordError("Invalid current password.");
                } else if (error.response?.status === 422) {
                    const detail = error.response?.data?.detail;
                    if (Array.isArray(detail) && detail.length > 0) {
                        const messages = detail.map((d: any) => d.msg || d.message).join(". ");
                        setPasswordError(messages);
                    } else {
                        setPasswordError("Invalid password format or validation failed.");
                    }
                } else {
                    setPasswordError("Something went wrong. Please try again.");
                }
            },
        });
    };

    const handleEmailUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");

        if (emailFormData.newEmailAddress !== emailFormData.confirmEmailAddress) {
            setEmailError("Email addresses do not match.");
            return;
        }

        if (!emailFormData.password || !emailFormData.newEmailAddress || !emailFormData.confirmEmailAddress) {
            setEmailError("Please fill in all fields.");
            return;
        }

        updateEmail.mutate(
            { password: emailFormData.password, emailAddress: emailFormData.newEmailAddress, confirmEmailAddress: emailFormData.confirmEmailAddress },
            {
            onSuccess: () => {
                setShowEmailForm(false);
                setEmailFormData({
                    password: "",
                    newEmailAddress: "",
                    confirmEmailAddress: "",
                });
                setEmailSuccess("Email update initiated. Please check your email for the confirmation link.");
                setTimeout(() => setEmailSuccess(""), 5000);
            },
            onError: (error: any) => {
                if (error.response?.status === 400) {
                    setEmailError("Invalid password or email address.");
                } else if (error.response?.status === 422) {
                    // Extract error messages from detail array
                    const detail = error.response?.data?.detail;
                    if (Array.isArray(detail) && detail.length > 0) {
                        const messages = detail.map((d: any) => d.msg || d.message).join(". ");
                        setEmailError(messages);
                    } else {
                        setEmailError("Invalid email format or validation failed.");
                    }
                } else {
                    setEmailError("Something went wrong. Please try again.");
                }
            },
        });
    };

    return (
        <div className="auth-card">
            <div className="auth-header">
                <h2 className="auth-title">Profile Settings</h2>
                <p className="auth-instruction">Update your personal information</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }} className="auth-form">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
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
                </div>

                {error && <p className="auth-error">{error}</p>}

                <button className="auth-button" type="submit" disabled={updateMe.isPending}>
                    {updateMe.isPending ? "Updating..." : "Update Details"}
                </button>
            </form>

            <div className="form-group">
                <label style={{ marginTop: "1rem" }}>Email</label>
                <div>
                    <span>{userData?.emailAddress || "No email found"}</span>
                    {isStudent && (
                        <button
                            type="button"
                            onClick={() => setShowEmailForm(!showEmailForm)}
                            style={{ marginLeft: "1rem", padding: "0.25rem 0.5rem", fontSize: "0.875rem" }}
                        >
                            {showEmailForm ? "Cancel" : "Update Email"}
                        </button>
                    )}
                </div>
                {emailSuccess && (
                    <p style={{ color: "green", fontSize: "0.875rem", marginTop: "0.5rem" }}>
                        {emailSuccess}
                    </p>
                )}
            </div>

            {showEmailForm && (
                <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <form onSubmit={handleEmailUpdateSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="password" className="required">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={emailFormData.password}
                                onChange={handleEmailFormChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newEmailAddress" className="required">New Email Address</label>
                            <input
                                id="newEmailAddress"
                                type="email"
                                name="newEmailAddress"
                                value={emailFormData.newEmailAddress}
                                onChange={handleEmailFormChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmEmailAddress" className="required">Confirm Email Address</label>
                            <input
                                id="confirmEmailAddress"
                                type="email"
                                name="confirmEmailAddress"
                                value={emailFormData.confirmEmailAddress}
                                onChange={handleEmailFormChange}
                            />
                        </div>

                        {emailError && <p className="auth-error">{emailError}</p>}

                        <button
                            className="auth-button"
                            type="submit"
                            disabled={updateEmail.isPending}
                            style={{ marginTop: "0.5rem" }}
                        >
                            {updateEmail.isPending ? "Updating..." : "Update Email"}
                        </button>
                    </form>
                </div>
            )}

            <div className="form-group">
                <label style={{ marginTop: "1rem" }}>Password</label>
                <div>
                    <button
                        type="button"
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        style={{ padding: "0.25rem 0.5rem", fontSize: "0.875rem" }}
                    >
                        {showPasswordForm ? "Cancel" : "Change Password"}
                    </button>
                </div>
                {passwordSuccess && (
                    <p style={{ color: "green", fontSize: "0.875rem", marginTop: "0.5rem" }}>
                        {passwordSuccess}
                    </p>
                )}
            </div>

            {showPasswordForm && (
                <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <form onSubmit={handlePasswordChangeSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="currentPassword" className="required">Current Password</label>
                            <input
                                id="currentPassword"
                                type="password"
                                name="password"
                                value={passwordFormData.password}
                                onChange={handlePasswordFormChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword" className="required">New Password</label>
                            <input
                                id="newPassword"
                                type="password"
                                name="newPassword"
                                value={passwordFormData.newPassword}
                                onChange={handlePasswordFormChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="required">Confirm New Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={passwordFormData.confirmPassword}
                                onChange={handlePasswordFormChange}
                            />
                        </div>

                        {passwordError && <p className="auth-error">{passwordError}</p>}

                        <button
                            className="auth-button"
                            type="submit"
                            disabled={changePassword.isPending}
                            style={{ marginTop: "0.5rem" }}
                        >
                            {changePassword.isPending ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );


};