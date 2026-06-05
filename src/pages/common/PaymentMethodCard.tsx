import { usePaymentMethod } from "../../hooks/usePaymentMethod";
import { useAddPaymentMethod } from "../../hooks/useAddPaymentMethod";
import { useUpdatePaymentMethod } from "../../hooks/useUpdatePaymentMethod";
import { useDeletePaymentMethod } from "../../hooks/useDeletePaymentMethod";
import axios from "axios";
import { useState } from "react";
import { billingDateTranform } from "../../utils/billingDateConversion";
import type { PaymentMethod } from "../../types/common/billing";

export function PaymentMethodCard() {

    const [showAdd, setShowAdd] = useState(false);
    const [provider, setProvider] = useState("");
    const [isDefault, setIsDefault] = useState(true);
    const [editingMethodId, setEditingMethodId] = useState<string | null>(null);
    const [deletingMethodId, setDeletingMethodId] =
        useState<string | null>(null);

    const paymentMethodQuery = usePaymentMethod();

    const addPaymentMutation = useAddPaymentMethod();

    const handleAddPaymentMethod = async () => {
        await addPaymentMutation.mutateAsync({
            paymentProvider: provider,
            paymentToken: "test",
            defaultMethod: isDefault,
        });

        setShowAdd(false);
    };

    const updateMutation = useUpdatePaymentMethod();

    const handleUpdate = async (paymentMethodId: string) => {

        await updateMutation.mutateAsync({
            paymentMethodId,
            paymentProvider: provider,
            paymentToken: "test",
            isActive: true,
            defaultMethod: isDefault,
        });

        setEditingMethodId(null);
    };

    const deleteMutation = useDeletePaymentMethod();

    const handleDelete = async (paymentMethodId: string) => {

        await deleteMutation.mutateAsync({
            paymentMethodId,
        });
    };

    if (paymentMethodQuery.isLoading) {
        return (
            <div className="auth-card">
                <h2 className="auth-title">Payment Details</h2>
                <p className="auth-p">Loading payment details...</p>
            </div>
        )
    }

    if (axios.isAxiosError(paymentMethodQuery.error)) {

        const status = paymentMethodQuery.error.response?.status;

        if (status === 401) {
            return (
                <p className="auth-error">You must be logged in to access this feature.</p>
            )
        }


        if (status === 403) {
            return (
                <p className="auth-error">You must have a student account to access this feature.</p>
            )
        }


        if (status === 500) {
            return (
                <p className="auth-error">A database error has occurred. Retry your request.</p>
            )
        }

        return (
            <p className="auth-error">Unable to load subscription details.</p>
        );

    }

    // Extract subscription object 
    const paymentMethods = paymentMethodQuery.data ?? [];

    if (paymentMethods.length === 0) {

        return (
            <div className="auth-card">

                <h2 className="auth-title">Payment Method</h2>
                <p className="billing-info">No payment methods to show.</p>

            </div>)
    }


    return (

        <div className="billing-component-card">

            <h2 className="billing-title">Payment Method</h2>

            {paymentMethods.map((method: PaymentMethod) => (

                <div className={`billing-card ${method.default_method ? "billing-card-default" : ""}`}>

                    <p className="billing-p"><strong>Provider:</strong>{" "}{method.payment_provider}</p>

                    <p className="billing-p"><strong>Default Method:</strong>{" "}{method.default_method ? "Yes" : "No"}</p>

                    <p className="billing-p"><strong>Status:</strong>{" "}{method.is_active ? "Active" : "Inactive"}</p>

                    <p className="billing-p"><strong>Added:</strong>{" "}{billingDateTranform(method.created_at)}</p>

                    <div className="sub-button-container">
                        <button className="auth-button .auth-button-small" onClick={() => {
                            setShowAdd(false);
                            setEditingMethodId(method.payment_method_id);
                            setProvider(method.payment_provider);
                            setIsDefault(method.default_method);
                        }}>
                            Update
                        </button>
                    </div>

                    {editingMethodId === method.payment_method_id && (

                        <div className="payment-update-form">

                            <p className="auth-p">
                                <strong>Payment Provider</strong>
                            </p>


                            <input
                                className="billing-form-input"
                                type="text"
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                            />

                            <div className="default-method-container">
                                <input
                                    className="billing-form-input"
                                    type="checkbox"
                                    checked={isDefault}
                                    onChange={(e) => setIsDefault(e.target.checked)} />

                                <label className="billing-p">Default Payment Method</label>
                            </div>


                            <div className="sub-button-container">
                                <button
                                    className="auth-button"
                                    onClick={() => handleUpdate(method.payment_method_id)}
                                >
                                    Save
                                </button>
                            </div>

                            <button
                                className="auth-button"
                                onClick={() => setEditingMethodId(null)}
                            >
                                Cancel
                            </button>

                        </div>
                    )}

                    <div className="sub-button-container">
                        <button className="sub-cancel-button" onClick={() => {
                            setShowAdd(false);
                            setDeletingMethodId(method.payment_method_id);
                        }}>
                            Delete
                        </button>
                    </div>

                    {deletingMethodId === method.payment_method_id && (

                        <div className="billing-delete-confirmation">

                            <p className="billing-p">
                                Are you sure you want to delete this
                                payment method?
                            </p>

                            <div className="sub-button-container">
                                <button
                                    className="sub-cancel-button"
                                    onClick={() =>
                                        handleDelete(
                                            method.payment_method_id
                                        )
                                    }
                                >
                                    Confirm Delete
                                </button></div >

                            <button
                                className="auth-button"
                                onClick={() =>
                                    setDeletingMethodId(null)
                                }
                            >
                                Cancel
                            </button>

                        </div>
                    )}



                </div>
            ))}

            <div className="sub-button-container">
                <button className="auth-button" onClick={() => { setShowAdd(true); }}>
                    Add Payment Method
                </button>
            </div>

            {showAdd && (
                <div className="billing-card">
                    <p className="auth-p">
                        <strong>Payment Provider</strong>
                    </p>

                    <input
                        className="billing-form-input"
                        type="text"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        placeholder="e.g. Mastercard"
                    />

                    <label className="auth-p">
                        <input
                            type="checkbox"
                            checked={isDefault}
                            onChange={(e) => setIsDefault(e.target.checked)}
                        />
                        {" "}
                        Default Payment Method
                    </label>

                    <div className="sub-button-container">
                        <button
                            className="auth-button"
                            onClick={handleAddPaymentMethod}
                        >
                            Save
                        </button>
                    </div>

                    <div className="sub-button-container">
                        <button
                            className="auth-button"
                            onClick={() => setShowAdd(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}



        </div>)

}