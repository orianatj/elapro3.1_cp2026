
/**
 * Formats an ISO format timestamp into a readable date/time string.
 *
 * Outputs both date and time components for display in tables and detail views.
 */
export function formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

