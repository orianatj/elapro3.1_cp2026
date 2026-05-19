// Maps API errors to user-friendly messages for UI display
export function getErrorMessage(error: any): string {
  const status = error?.response?.status;

  // Default fallback message for unexpected errors
  let message = "Something went wrong. Please try again.";

  // Map known HTTP status codes to specific messages
  if (status === 401) {
    return "You are not authorised. Please log in.";
  }

  if (status === 403) {
    return "Access denied. You do not have permission to view this content.";
  }

  if (status === 404) {
    return "No submissions found.";
  }

  if (status === 500) {
    return "Server error. Please try again later.";
  }

  return message;
}