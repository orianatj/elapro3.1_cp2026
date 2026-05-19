import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { InvalidResetLink } from "./InvalidResetLink";
import { vi } from "vitest";


// Clear call history
beforeEach(() => {
    vi.clearAllMocks();
});

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {

    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,

        useNavigate: () => mockNavigate
    }
});


// Reusable helper 
function setup() {

    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <InvalidResetLink />
        </MemoryRouter>
    );

    return { user };
}

test("renders reset password link expired icon", () => {

    setup()

    expect(screen.getByRole("img", { name: /Reset password link expired icon/i })).toBeInTheDocument();

});

test("renders request a new reset link button", () => {

    setup()

    expect(screen.getByRole("button", { name: /Request a new reset link/i })).toBeInTheDocument();

});


test("navigates to forgot-password page when button clicked", async () => {

    const { user } = setup();

    await user.click(screen.getByRole("button", {
        name: /Request a new reset link/i
    })

    );

    expect(mockNavigate).toHaveBeenCalledWith("/forgot-password");

});