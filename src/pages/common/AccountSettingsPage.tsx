import { useAuth } from "../../hooks/useAuth";
import { ProfileSettings } from "./ProfileSettings";
import { SubscriptionBillingSettings } from "./SubscriptionBillingSettings";
import "../../pages/auth/authpages.css";
import "../../pages/common/accountsettings.css";
import { useNavigate } from "react-router-dom";

export default function AccountSettingsPage() {

    // Get logged-in user's info
    const { user } = useAuth();

    const navigate = useNavigate();

    // Create boolean variable to support conditional rendering 
    const showBillingSubs = user?.userRole === "student";

    const handleBackToDashboard = () => {

        if (user?.userRole === "student") {
            navigate("/student");
        } else if (
            user?.userRole === "supervisory_teacher" ||
            user?.userRole === "external_teacher"
        ) {
            navigate("/teacher");
        } else if (user?.userRole === "admin") {
            navigate("/admin");
        }
    };

    return (

        <div className="style-settings-container">

            <button
                className="auth-button"
                onClick={handleBackToDashboard}
            >
                Back to Dashboard
            </button>

            {/* Render Profile Settings sub-component */}
            <ProfileSettings />

            {/* Render Subcription & Billing sub-component if user role is student */}
            {showBillingSubs && <SubscriptionBillingSettings />}

        </div>
    )
}