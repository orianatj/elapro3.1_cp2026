import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { VerifyEmailLoading } from "./VerifyEmailLoading";


// Reusable helper 
function setup() {

    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <VerifyEmailLoading />
        </MemoryRouter>
    );

    return { user };
}

test("renders verify email loading state", () => {

    setup();

    // Image
    expect(screen.getByRole("img", { name: /Email verification loading icon/i })).toBeInTheDocument();

    // Title
    expect(screen.getByRole("heading", { level: 2, name: /Verifying your email.../i })).toBeInTheDocument();

});