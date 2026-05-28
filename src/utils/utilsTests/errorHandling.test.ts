import { getErrorMessage } from "../errorHandling";

describe("getErrorMessage", () => {

  it("handles 401 error", () => {
    const error = { response: { status: 401 } };
    expect(getErrorMessage(error)).toBe(
      "You are not authorised. Please log in."
    );
  });

  it("handles 403 error", () => {
    const error = { response: { status: 403 } };
    expect(getErrorMessage(error)).toBe(
      "Access denied. You do not have permission to view this content."
    );
  });

  it("handles 404 error", () => {
    const error = { response: { status: 404 } };
    expect(getErrorMessage(error)).toBe(
      "No submissions found."
    );
  });

  it("handles 500 error", () => {
    const error = { response: { status: 500 } };
    expect(getErrorMessage(error)).toBe(
      "Server error. Please try again later."
    );
  });

  it("handles unknown error", () => {
    const error = { response: { status: 999 } };
    expect(getErrorMessage(error)).toBe(
      "Something went wrong. Please try again."
    );
  });
});