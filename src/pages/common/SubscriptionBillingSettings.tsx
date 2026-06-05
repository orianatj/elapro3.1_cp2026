import { SubscriptionCard } from "./SubscriptionCard";
import { BillingHistoryCard } from "./BillingHistoryCard";


// Profile component that contains Billing & Subcription functionality - Student Role only 
export function SubscriptionBillingSettings() {




    return (
        <div className="subscription-billing-container">

            <SubscriptionCard />

            <BillingHistoryCard />

        </div>


    );

}; 