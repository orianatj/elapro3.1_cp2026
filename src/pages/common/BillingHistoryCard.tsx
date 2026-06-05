import { useState } from "react";
import axios from "axios";
import { useBillingHistory } from "../../hooks/useBillingHistory";
import type { BillingHistoryQuery, BillingHistoryItem } from "../../types/common/billing";
import { billingDateTranform } from "../../utils/billingDateConversion";


export function BillingHistoryCard() {

    const [dateRange, setDateRange] = useState<BillingHistoryQuery["date_range"]>("30d");
    const [sortBy, setSortBy] = useState<BillingHistoryQuery["sort_by"]>("billingDate");
    const [sortOrder, setSortOrder] = useState<BillingHistoryQuery["sort_order"]>("desc");

    const queryParams = {
        date_range: dateRange,
        sort_by: sortBy,
        sort_order: sortOrder,
        limit: 10,
        page: 1
    };

    const billingHistQuery = useBillingHistory(queryParams);

    if (billingHistQuery.isLoading) {
        return (
            <div className="auth-card">
                <h2 className="auth-title">Billing History</h2>
                <p className="auth-p">Loading billing history...</p>
            </div>
        )
    }


    if (axios.isAxiosError(billingHistQuery.error)) {

        const status = billingHistQuery.error.response?.status;

        if (status === 401) {
            return (
                <p className="auth-error">You must be logged in to access this feature.</p>
            )
        }

        return (
            <p className="auth-error">Unable to load billing history.</p>
        );

    };

    const billingItems = billingHistQuery.data?.data?.items ?? [];

    return (
        <div className="auth-card">

            <h2 className="auth-title">Billing History</h2>

            <div className="billing-filters">

                <div className="filter-group">

                    <p className="auth-p"><strong>Date Range</strong></p>

                    <select className="billing-select"
                        value={dateRange}
                        onChange={(e) =>
                            setDateRange(
                                e.target.value as BillingHistoryQuery["date_range"]
                            )
                        }
                    >
                        <option value="all">All</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                        <option value="6m">Last 6 Months</option>
                        <option value="1y">Last Year</option>
                        <option value="3y">Last 3 Years</option>
                    </select>
                </div>

                <div className="filter-group">

                    <p className="auth-p"><strong>Sort By</strong></p>

                    <select className="billing-select"
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value as BillingHistoryQuery["sort_by"]
                            )
                        }
                    >
                        <option value="billingDate">Date</option>
                        <option value="amount">Amount</option>
                        <option value="status">Status</option>
                    </select>
                </div>

                <div className="filter-group">

                    <p className="auth-p"><strong>Order</strong></p>

                    <select className="billing-select"
                        value={sortOrder}
                        onChange={(e) =>
                            setSortOrder(
                                e.target.value as BillingHistoryQuery["sort_order"]
                            )
                        }
                    >
                        <option value="desc">Newest First</option>
                        <option value="asc">Oldest First</option>
                    </select>
                </div>

            </div>

            {billingItems.length === 0 ? (

                <p className="billing-info">No billing history available.</p>) : (

                <table className="billing-table">

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Billing Period</th>
                        </tr>
                    </thead>

                    <tbody>
                        {billingItems.map((item: BillingHistoryItem) => (
                            <tr key={item.billing_id}>

                                <td>
                                    {billingDateTranform(item.billing_date)}
                                </td>

                                <td>
                                    {item.currency} ${item.plan_cost}
                                </td>

                                <td>
                                    {item.billing_status}
                                </td>

                                <td>
                                    {billingDateTranform(item.billing_period_start)}
                                    {" - "}
                                    {billingDateTranform(item.billing_period_end)}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            )}

        </div>

    );


};