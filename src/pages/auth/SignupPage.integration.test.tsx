import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { SignupPage } from "./SignupPage";


// Mock SignupForm
vi.mock("./SignupForm", () => ({
    SignupForm: ({ onSuccess }: any) => (
        <button
            onClick={() =>
                onSuccess("test@example.com")
            }
        >
            Mock Signup Submit
        </button>
    ),
}));

// Mock VerifyEmailSent
vi.mock("./VerifyEmailSent", () => ({
    VerifyEmailSent: ({
        email,
        onResendRequested,
    }: any) => (

        <div>
            <p>
                Verify email sent to {email}
            </p>

            <button
                onClick={onResendRequested}
            >
                Resend verification
            </button>
        </div>

    ),
}));

// Mock ResendVerificationForm
vi.mock("./ResendVerificationForm", () => ({
    ResendVerificationForm: ({
        onSuccess }: any) => (
        <button
            onClick={() =>
                onSuccess("test@example.com")
            }
        >Mock Resend Submit
        </button>
    ),
}));


function setup() {

    const user = userEvent.setup();

    render(<MemoryRouter><SignupPage /></MemoryRouter>);

    return { user };

}

// Clear call history
beforeEach(() => {
    vi.clearAllMocks();
});

// Test Signup page conditional rendering 

test("renders SignupForm initially", () => {

    setup()

    expect(screen.getByText("Mock Signup Submit")).toBeInTheDocument();

});

test("renders VerifyEmailSent after successful signup", async () => {


    const { user } = setup();

    await user.click(screen.getByText("Mock Signup Submit"));

    expect(screen.getByText(/verify email sent to test@example.com/i)).toBeInTheDocument();
});

test("renders resend verification form when resend requested", async () => {

    const { user } = setup();

    // Complete signup workflow
    await user.click(screen.getByText("Mock Signup Submit"));

    await user.click(screen.getByText("Resend verification"));

    expect(screen.getByText("Mock Resend Submit")).toBeInTheDocument();


});

test("renders VerifyEmailSent after resening verification", async () => {

    const { user } = setup();

    // Complete signup workflow
    await user.click(screen.getByText("Mock Signup Submit"));

    await user.click(screen.getByText("Resend verification"));

    await user.click(screen.getByText("Mock Resend Submit"));

    expect(screen.getByText(/verify email sent to test@example.com/i)).toBeInTheDocument();
})