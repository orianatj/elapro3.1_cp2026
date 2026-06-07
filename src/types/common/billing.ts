
// Define type for subscription in payload GET /billing/plan
export type Subscription = {
    currentPlanName: string;
    currentPlanPrice: number;
    pendingPlanName: string | null;
    pendingPlanPrice: number | null;
    subscriptionTerm: number;
    currentPeriodEnd: string;
    cancellationDate: string | null;
    pastSubmissionNumber: number;
    remainingSubmissionNumber: number;
    planSubmissionLimit: number;
};


// Define type for plan names
export type PlanNames = "free_trial" | "general" | "academic" | "ukvi_academic" | "ukvi_general" | "life_skills" | "retake";

// Define type for request body for updating subscription (POST /billing/plan) 

export type UpdateSubscription = {
    newPlanName: PlanNames;
    password: string;
};

// Define the payload returned on successful subscription change 


// Define type for (GET /payment-method)
export type PaymentMethod = {
    payment_provider: string;
    user_id: string;
    is_active: boolean;
    payment_method_id: string;
    payment_token: string;
    default_method: boolean;
    created_at: string;
    last_updated: string;
};

// Define request body for adding a payment method (POST /billing/payment-method) 
export type AddPaymentMethod = {
    paymentProvider: string;
    paymentToken: string;
    defaultMethod: boolean;
};

// Define response body for PATCH /billing/payment-method
export type UpdateExistingPayMethod = {
    paymentMethodId: string;
    paymentProvider: string;
    paymentToken: string;
    isActive: boolean;
    defaultMethod: boolean;
};

// Define type for request body for DELETE /billing/payment-method
export type DeletePaymentMethod = {
    paymentMethodId: string;
};

// Define type for GET /billing/history query parameters 
export type BillingHistoryQuery = {
    date_range?: "7d" | "30d" | "90d" | "6m" | "1y" | "3y" | "all";
    sort_by?: "billingDate" | "amount" | "status";
    sort_order?: "asc" | "desc";
    limit?: number;
    page?: number;
};

// Define type for item in payload GET /billing/history 
export type BillingHistoryItem = {
    plan_cost: number;
    billing_period_start: string;
    billing_period_end: string;
    billing_status: string;
    user_id: string;
    plan_id: string;
    billing_id: string;
    currency: string;
    billing_date: string;
};

export type BillingPagination = {
    total: number;
    total_pages: number;
    limit: number;
    page: number;
};