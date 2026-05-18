import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { ResetPasswordPage } from "./ResetPasswordPage";



// Clear call history
beforeEach(() => {
    vi.clearAllMocks();
});

// Mock ResetPasswordForm
vi.mock("./ResetPasswordForm", () => ({
    ResetPasswordForm: ({
        onSuccess,
        onInvalidToken,
        token, }: any) => (
        <div>
            <p>{token}</p>

            <button
                onClick={() =>
                    onSuccess("test@example.com")
                }
            >Mock Success
            </button>

            <button
                onClick={() =>
                    onInvalidToken()
                }
            >Mock Invalid Token
            </button>
        </div>
    ),
}));

// Mock ResetPassswordSuccess
vi.mock("./ResetPasswordSuccess", () => ({
    ResetPasswordSuccess: () => (
        <div>
            <p>Your password has been successfully changed!</p>

            <button>Proceed to login</button>
        </div>
    ),
}))

// Mock InvalidResetLink
vi.mock("./InvalidResetLink", () => ({
    InvalidResetLink: () => (
        <div>
            <p>Your password reset link is invalid or has expired.</p>

            <button>Request a new reset link</button>
        </div>
    ),
}))


// Define helper function
function setup(url = "/reset-password?token=abc123") {

    const user = userEvent.setup();

    render(
        <MemoryRouter initialEntries={[url]}>
            <ResetPasswordPage />
        </MemoryRouter>);

    return { user };
};

// Test token extraction 
test("extracts token from URL query parameters", () => {

    setup("/reset-password?token=test-token");

    expect(screen.getByText("test-token")).toBeInTheDocument();
});

// Missing token renders InvalidResetLink
test("renders invalid reset link when token is missing", () => {

    setup("/reset-password");

    expect(screen.getByText("Your password reset link is invalid or has expired.")).toBeInTheDocument();
});

// Success workflow
test("renders success screen after succesful password reset", async () => {

    const { user } = setup();

    await user.click(screen.getByText("Mock Success"));

    expect(screen.getByText("Your password has been successfully changed!")).toBeInTheDocument();
});

// Invalid token workflow 
test("renders invalid reset link after invalid token callback", async () => {

    const { user } = setup();

    await user.click(screen.getByText("Mock Invalid Token"));

    expect(screen.getByText("Your password reset link is invalid or has expired.")).toBeInTheDocument();
})
