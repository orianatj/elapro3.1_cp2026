import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ResetPasswordSuccess } from "./ResetPasswordSuccess";
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
            <ResetPasswordSuccess />
        </MemoryRouter>
    );

    return { user };
}

test("renders reset password success icon", () => {

    setup()

    expect(screen.getByRole("img", { name: /Reset password success icon/i })).toBeInTheDocument();

});


test("renders proceed to login button", () => {

    setup()

    expect(screen.getByRole("button", { name: /Proceed to login/i })).toBeInTheDocument();

});


test("navigates to login page when button clicked", async () => {

    const { user } = setup();

    await user.click(screen.getByRole("button", {
        name: /Proceed to login/i
    })

    );

    expect(mockNavigate).toHaveBeenCalledWith("/");

});