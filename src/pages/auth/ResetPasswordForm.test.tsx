import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { vi } from "vitest";


// Clear call history
beforeEach(() => {
    vi.clearAllMocks();
});

// Mock useResetPassword mutation function 
const mockResetPassword = vi.fn()

vi.mock("../../hooks/useResetPassword", () => ({
    useResetPassword: () => ({
        mutateAsync: mockResetPassword,
    }),
}))


// Helper function 
function setup() {

    const user = userEvent.setup();

    // Mock ResetForm props
    const token = "token";

    const mockOnSuccess = vi.fn();

    const mockInvalidToken = vi.fn();

    render(<MemoryRouter><ResetPasswordForm token={token} onSuccess={mockOnSuccess} onInvalidToken={mockInvalidToken} /></MemoryRouter>);

    return {
        user,
        token,
        mockOnSuccess,
        mockInvalidToken,
        passwordInput: screen.getByLabelText("New passowrd"),
        confirmPassword: screen.getByLabelText("Confirm passowrd"),
        submitButton: screen.getByRole("button", { name: /Reset password/i })
    };
}

test("renders form fields and submit button", () => {

    const {
        passwordInput,
        confirmPassword,
        submitButton
    } = setup();

    // New password field
    expect(passwordInput).toBeInTheDocument()

    // Confirm new password field
    expect(confirmPassword).toBeInTheDocument()

    // Confirm button 
    expect(submitButton).toBeInTheDocument()
});

test("password fields update with user input", async () => {
    const {
        user,
        passwordInput,
        confirmPassword,
    } = setup();

    await user.type(passwordInput, "password123");

    await user.type(confirmPassword, "password123");

    expect(passwordInput).toHaveValue("password123");

    expect(confirmPassword).toHaveValue("password123");

})

test("prevents submission when required fields are missing", async () => {

    const {
        user,
        passwordInput,
        submitButton
    } = setup();

    // Provide input for password but not confirm password
    await user.type(passwordInput, "password123")

    // Submit form
    await user.click(submitButton)

    expect(mockResetPassword).not.toHaveBeenCalled();

    expect(await screen.findByText("Please complete all required fields.")).toBeInTheDocument()

});

test("prevents submission when passwords do not match", async () => {

    const {
        user,
        passwordInput,
        confirmPassword,
        submitButton
    } = setup();


    // Enter passwords that do not match
    await user.type(passwordInput, "password123")

    await user.type(confirmPassword, "password1234")

    // Submit form
    await user.click(submitButton)

    expect(mockResetPassword).not.toHaveBeenCalled();

    expect(await screen.findByText("Passwords do not match.")).toBeInTheDocument();

});

test("submits reset password payload and calls onSuccess on successful submission", async () => {

    const {
        user,
        mockOnSuccess,
        passwordInput,
        confirmPassword,
        submitButton
    } = setup();

    /* Simulate a successful resolved promise from the mocked reset password mutation */
    mockResetPassword.mockResolvedValue({});

    // Fill required fields 
    await user.type(passwordInput, "password123");

    await user.type(confirmPassword, "password123");

    // Submit form
    await user.click(submitButton);

    // Verify parent callback triggered 
    expect(mockOnSuccess).toHaveBeenCalled();

    // Verify payload 
    expect(mockResetPassword).toHaveBeenCalledWith({
        token: "token",
        newPassword: "password123",
        confirmPassword: "password123",
    });

    // Check form clearing 
    expect(passwordInput).toHaveValue("");

    expect(confirmPassword).toHaveValue("");

});

test("calls onInvalidToken after 400 status code is returned", async () => {

    mockResetPassword.mockRejectedValue({
        response: {
            status: 400
        }
    })

    const {
        user,
        mockInvalidToken,
        passwordInput,
        confirmPassword,
        submitButton
    } = setup();

    // Fill required fields 
    await user.type(passwordInput, "password123");

    await user.type(confirmPassword, "password123");

    // Submit form
    await user.click(submitButton);

    // Verify parent callback triggered 
    expect(mockInvalidToken).toHaveBeenCalled();

});

test("Returns expected UI error message based on backend status code", async () => {

    mockResetPassword.mockRejectedValue({
        response: {
            status: 422
        }
    })

    const {
        user,
        passwordInput,
        confirmPassword,
        submitButton
    } = setup();

    // Fill required fields 
    await user.type(passwordInput, "password123");

    await user.type(confirmPassword, "password123");

    // Submit form
    await user.click(submitButton);

    expect(mockResetPassword).toHaveBeenCalled();

    expect(await screen.findByText("Your password does not match the complexity requirements.")).toBeInTheDocument();

});