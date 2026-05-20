import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { VerifyEmailPage } from "./VerifyEmailPage";


// Reset mock states before each test
beforeEach(() => {

    vi.clearAllMocks();

    mockVerifyEmailMutation.isPending = false;
    mockVerifyEmailMutation.isError = false;
    mockVerifyEmailMutation.isSuccess = false;

});

// Mock the mutation function
const mockMutate = vi.fn()

// Mock the mutation object
const mockVerifyEmailMutation = {
    mutate: mockMutate,
    isPending: false,
    isError: false,
    isSuccess: false,
};


vi.mock("../../hooks/useVerifyEmail", () => ({
    useVerifyEmail: () => (mockVerifyEmailMutation)
}))


// Mock InvalidVerificationLink
vi.mock("./InvalidVerificationLink", () => ({
    InvalidVerificationLink: () => (
        <div>
            <p>Your account verification link is invalid or has expired.</p>

            <button>Resend verification email</button>
        </div>
    )
}))

// Mock VerifyEmailLoading 
vi.mock("./VerifyEmailLoading", () => ({
    VerifyEmailLoading: () => (
        <div>
            <p>Verifying your email...</p>
        </div>
    )
}))

// Mock VerifyEmailSuccess
vi.mock("./VerifyEmailSuccess", () => ({
    VerifyEmailSuccess: () => (
        <div>
            <p>Your email has been successfully verified. You can now login to your account!</p>
        </div>
    )
}))

// Define helper function
function setup(url = "/verify-email?token=abc123") {

    const user = userEvent.setup();

    render(
        <MemoryRouter initialEntries={[url]}>
            <VerifyEmailPage />
        </MemoryRouter>);

    return { user };
};


test("renders loading component while verification is pending", () => {

    mockVerifyEmailMutation.isPending = true;

    setup();

    expect(screen.getByText(/Verifying your email.../i)).toBeInTheDocument();

});

test("renders success component when verification succeeds", () => {

    mockVerifyEmailMutation.isSuccess = true;

    setup();

    expect(screen.getByText(/Your email has been successfully verified. You can now login to your account!/i)).toBeInTheDocument();

});

test("renders invlaid verification component when verification fails", () => {

    mockVerifyEmailMutation.isError = true;

    setup();

    expect(screen.getByText(/Your account verification link is invalid or has expired./i)).toBeInTheDocument();

});

test("renders invlaid verification component when token is missing", () => {

    setup("/verify-email");

    expect(screen.getByText(/Your account verification link is invalid or has expired./i)).toBeInTheDocument();

});

test("calls verify email mutation with token from URL", () => {

    setup();

    expect(mockMutate).toHaveBeenCalledWith({ token: "abc123" })

});