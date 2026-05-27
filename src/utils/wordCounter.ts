
/*
 * Calculates the number of words in a given text string.
 * - Trims leading and trailing whitespace to avoid counting empty spaces
 * - Splits the text into words based on one or more whitespace characters
 * - Returns 0 for empty or whitespace-only input
 */
export function getWordCount(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

