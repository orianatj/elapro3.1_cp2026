import { useState, useEffect } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useUpdateMe } from "../../hooks/useUpdateMe";
import { useUpdateEmail } from "../../hooks/useUpdateEmail";

// User profile component that contains general account settings and prefernces - all user roles
export function ProfileSettings() {
    const { data: user } = useCurrentUser(["profile-settings"]);
    const updateMe = useUpdateMe();
    const updateEmail = useUpdateEmail();

    // AxiosResponse data is in user.data
    const userData = user?.data;

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

    const handleEmailFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailFormData({ ...emailFormData, [e.target.name]: e.target.value });
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
                <label>Email</label>
                <div>
                    <span>{userData?.emailAddress || "No email found"}</span>
                    <button
                        type="button"
                        onClick={() => setShowEmailForm(!showEmailForm)}
                        style={{ marginLeft: "1rem", padding: "0.25rem 0.5rem", fontSize: "0.875rem" }}
                    >
                        {showEmailForm ? "Cancel" : "Update Email"}
                    </button>
                </div>
                {emailSuccess && (
                    <p style={{ color: "green", fontSize: "0.875rem", marginTop: "0.5rem" }}>
                        {emailSuccess}
                    </p>
                )}
            </div>

            {showEmailForm && (
                <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
                    <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>Update Email Address</h3>
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
        </div>
    );


};