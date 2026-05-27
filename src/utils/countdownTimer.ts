
/**
 * Formats a number of seconds into mm:ss format.
 * Used for countdown timers (e.g. 125 to "2:05")
 */
export function formatTimer(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Decrements a timer value by 1 second.
 * Ensures the value does not go below 0.
 */
export function decrementTimer(time: number): number {
    return time > 0 ? time - 1 : 0;
}

/**
 * Determines whether the timer should continue running.
 */
export function shouldContinue(time: number): boolean {
    return time > 0;
}
