import { getErrorMessage } from "../utils/errorHandling";

/*
 * QueryStateHandler
 *
 * A reusable component that standardises how pages handle asynchronous 
 * TanStack Query (TSQ) to prevent duplication across pages. 
 * States include: 
 * - Loading state
 * - Error state
 * - Empty / missing data state
 */

type QueryStateHandlerProps<T> = {
    // Indicates that the query is currently loading
    isPending: boolean;

    // Indicates that the query has encountered an error
    isError: boolean;

    // The error object returned by TSQ
    error: unknown;

    // The transformed data returned from the query (ViewData)
    data: T | undefined;

    // Optional message to display when no data is available.
    // Falls back to a default message if not provided.
    emptyMessage?: string;

    // Optional function to determine if the data is considered "empty" for the page context.
    isEmpty?: (data: T) => boolean;

    // Optional function to determine if any filters are currently active based on the data.
    hasActiveFilters?: (data: T) => boolean;

    // Children is a render function that receives the query data and 
    // returns React nodes to render the page UI.
    children: (data: T) => React.ReactNode;
};

export function QueryStateHandler<T>({
    isPending,
    isError,
    error,
    data,
    emptyMessage,
    isEmpty,
    hasActiveFilters,
    children,
}: QueryStateHandlerProps<T>) {



    /* ==================== LOADING STATE ==================== */
    // Render a loading indicator while the query is in progress.
    // Prevents the page from attempting to render incomplete data.
    if (isPending) {
        return <div>Loading...</div>;
    }


    /* ==================== ERROR STATE ==================== */
    // Render a user-friendly error message when the query fails.
    // Delegates formatting of the error to a shared utility
    // to ensure consistency across the application.
    if (isError) {
        return (
            <div className="error-state">
                {getErrorMessage(error)}
            </div>
        );
    }

    /* ==================== EMPTY DATA STATE ==================== */

    // Guard against undefined or missing data
    if (!data) {
        return (
            <div className="empty-state">
                {emptyMessage ?? "No data available."}
            </div>
        );
    }


    // Determine empty and filter states
    const empty = isEmpty ? isEmpty(data) : false;
    const filtered = hasActiveFilters?.(data);


return (
   <>
        {children(data)}

        {empty && (
            <div className="empty-state">
                {filtered
                    ? "No data matches your filter selections."
                    : emptyMessage ?? "No data available."}
            </div>
        )}
    </>
);

}

