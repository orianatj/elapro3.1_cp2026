import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ResendVerificationForm } from "./ResendVerificationForm";
import { vi } from "vitest";


// Mock useResendVerify 
const mockResendVerifyMutation = vi.fn()

vi.mock("../../hooks/useResendVerify", () => ({
    useResendVerify: () => ({ mutateAsync: mockResendVerifyMutation, }),
}))


// Clear call history
beforeEach(() => {
    vi.resetAllMocks();
});


// Reusable helper 
function setup() {

    const user = userEvent.setup();

    const mockOnSuccess = vi.fn();

    render(
        <MemoryRouter>
            <ResendVerificationForm onSuccess={mockOnSuccess} />
        </MemoryRouter>
    );

    return {
        user,
        mockOnSuccess
    };
}


test("renders verification expired icon", () => {

    setup();

    expect(screen.getByRole("img", { name: /Verification email expired icon/i })).toBeInTheDocument();
});

test("renders email form field", () => {

    setup();

    // Email field
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

});

test("renders resend verification link button", () => {

    setup();

    expect(screen.getByRole("button", { name: /Resend verification link/i })).toBeInTheDocument();

});


test("email input updates with user interaction", async () => {

    const { user } = setup();

    const emailInput = screen.getByLabelText("Email");

    await user.type(emailInput, "test@example.com")

    expect(emailInput).toHaveValue("test@example.com")
});

test("prevents submission when email field is empty", async () => {

    const { user } = setup();

    // Submit form
    await user.click(screen.getByRole("button", { name: /Resend verification link/i }));

    expect(mockResendVerifyMutation).not.toHaveBeenCalled();

    expect(await screen.findByText("Please enter an email address.")).toBeInTheDocument();

});

test("calls onSuccess after successful resend request", async () => {

    mockResendVerifyMutation.mockResolvedValue({});

    const { user, mockOnSuccess } = setup();

    const emailInput = screen.getByLabelText("Email");

    await user.type(emailInput, "test@example.com")

    await user.click(screen.getByRole("button", { name: /Resend verification link/i })
    );

    expect(mockResendVerifyMutation).toHaveBeenCalledWith({ emailAddress: "test@example.com" })

    expect(mockOnSuccess).toHaveBeenCalledWith("test@example.com");

});

test(
    "displays error message when backend returns 422", async () => {

        mockResendVerifyMutation.mockRejectedValue({
            response: {
                status: 422,
            },
        });

        const { user } = setup();

        const emailInput = screen.getByLabelText("Email");

        await user.type(emailInput, "test@example.com");

        await user.click(screen.getByRole("button", { name: /resend verification link/i })
        );

        expect(await screen.findByText("Please enter a valid email address.")).toBeInTheDocument();

    }
);