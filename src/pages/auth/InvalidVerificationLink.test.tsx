import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { InvalidVerificationLink } from "./InvalidVerificationLink";
import { vi } from "vitest";

// Clear call history
beforeEach(() => {
    vi.clearAllMocks();
});

// Helper function 
function setup() {

    const user = userEvent.setup();

    render(<MemoryRouter><InvalidVerificationLink /></MemoryRouter>)

    return { user }
};

// Mock ResendVerificationForm
vi.mock("./ResendVerificationForm", () => ({
    ResendVerificationForm: ({
        onSuccess }: any) => (
        <div>
            <p>Mock Resend Form</p>

            <button
                onClick={() =>
                    onSuccess("test@example.com")
                }
            >Mock Resend Submit
            </button>
        </div>
    ),
}));

test("renders invalid verification link state", () => {

    setup();

    // Image
    expect(screen.getByRole("img", { name: /Invalid Verification Link/i })).toBeInTheDocument();

    // Title
    expect(screen.getByRole("heading", { level: 2, name: /Account Verification Link Expired/i })).toBeInTheDocument();

    // Instruction text
    expect(screen.getByText(/Your account verification link is invalid or has expired./i)).toBeInTheDocument();

    // Resend button
    expect(screen.getByRole("button", { name: /Resend verification email/i })).toBeInTheDocument();

});

test("renders resend verification form when resend button is clicked", async () => {

    const { user } = setup();

    await user.click(
        screen.getByRole("button", { name: /Resend verification email/i })
    );

    expect(screen.getByText(/Mock Resend Form/i)).toBeInTheDocument();
});

test("renders success conformation after resend succeeds", async () => {

    const { user } = setup();

    await user.click(
        screen.getByRole("button", { name: /Resend verification email/i })
    );

    await user.click(
        screen.getByRole("button", { name: /Mock Resend Submit/i })
    );

    expect(screen.getByText("test@example.com")).toBeInTheDocument();

});
