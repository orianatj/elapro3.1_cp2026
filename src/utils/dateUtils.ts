
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


/**
 * Formats a number of seconds into mm:ss format.
 * Used for countdown timers (e.g. 1200 → "20:00")
 */
export function formatTimer(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
}
