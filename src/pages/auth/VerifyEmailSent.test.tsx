import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { VerifyEmailSent } from "./VerifyEmailSent";
import { vi } from "vitest";


// Reusable helper 

function setup() {

    const user = userEvent.setup();

    const mockEmail = "test@example.com";

    const mockOnResendRequested = vi.fn();

    render(
        <MemoryRouter>
            <VerifyEmailSent
                email={mockEmail}
                onResendRequested={mockOnResendRequested}
            />
        </MemoryRouter>
    );

    return {
        user,
        mockEmail,
        mockOnResendRequested,
    };
}

// Clear call history
beforeEach(() => {
    vi.clearAllMocks();
});


test("renders verification email sent icon", () => {

    setup()

    expect(screen.getByRole("img", { name: /Verification email sent icon/i })).toBeInTheDocument();

});

test("renders email passed via props", () => {

    setup()

    expect(screen.getByText(/test@example.com./i)).toBeInTheDocument();

});

test("renders resend verification button", () => {

    setup()

    expect(screen.getByRole("button", { name: /Resend verification email/i })).toBeInTheDocument();

});

test("calls callback function when resend button is clicked", async () => {

    const { user, mockOnResendRequested } = setup();

    await user.click(screen.getByRole("button", { name: /Resend verification email/i })
    );

    expect(mockOnResendRequested).toHaveBeenCalled();

})

test("renders login link and has correct destination", () => {

    setup();

    expect(screen.getByRole("link", {
        name: /Login/i
    })).toBeInTheDocument();

    expect(screen.getByRole("link", {
        name: /Login/i
    })).toHaveAttribute("href", "/");


});

