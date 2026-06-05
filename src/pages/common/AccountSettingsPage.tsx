import { useAuth } from "../../hooks/useAuth";
import { ProfileSettings } from "./ProfileSettings";
import { SubscriptionBillingSettings } from "./SubscriptionBillingSettings";
import "../../pages/auth/authpages.css";
import "../../pages/common/accountsettings.css";

export default function AccountSettingsPage() {

    // Get logged-in user's info
    const { user } = useAuth();

    // Create boolean variable to support conditional rendering 
    const showBillingSubs = user?.userRole === "student";

    return (

        <div className="style-settings-container">

            {/* Render Profile Settings sub-component */}
            <ProfileSettings />

            {/* Render Subcription & Billing sub-component if user role is student */}
            {showBillingSubs && <SubscriptionBillingSettings />}

        </div>
    )
}