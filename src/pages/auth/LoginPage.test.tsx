import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "./LoginPage";
import { vi } from "vitest";

// 1. Test Component Rendering 

// Mock useAuth & login function
const mockLogin = vi.fn()

vi.mock("../../hooks/useAuth", () => ({
    useAuth: () => ({
        login: mockLogin,
    }),
}))

// Clear call history
beforeEach(() => {
    mockLogin.mockReset()
})

test('renders login form fields', () => {

    // Render component prior to testing 
    render(<LoginPage />)

    expect(screen.getByLabelText("Email")).toBeInTheDocument()

    expect(screen.getByLabelText("Password")).toBeInTheDocument()

    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument()

})

test("updates email and password fields when user types", async () => {

    // Configure a user event instance 
    const user = userEvent.setup()

    // Render component prior to testing 
    render(<LoginPage />)

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")

    await user.type(emailInput, "test123@gmail.com")

    await user.type(passwordInput, "password123")

    expect(emailInput).toHaveValue("test123@gmail.com")
    expect(passwordInput).toHaveValue("password123")

})


test('submits entered credentials when login button is clicked', async () => {

    // Configure a user event instance 
    const user = userEvent.setup()

    // Render component prior to testing 
    render(<LoginPage />)

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")
    const loginButton = screen.getByRole("button", { name: /Login/i })

    await user.type(emailInput, "test123@gmail.com")

    await user.type(passwordInput, "password123")

    await user.click(loginButton)

    expect(mockLogin).toHaveBeenCalled()
    expect(mockLogin).toHaveBeenCalledWith({
        emailAddress: "test123@gmail.com",
        password: "password123",
    })

})

test("prevent form submission if both fields are empty", async () => {

    // Configure a user event instance 
    const user = userEvent.setup()

    // Render component prior to testing 
    render(<LoginPage />)

    const loginButton = screen.getByRole("button", { name: /Login/i })

    await user.click(loginButton)

    expect(mockLogin).not.toHaveBeenCalled();

    expect(await screen.findByText("Please enter your email and password.")).toBeInTheDocument()
});



test("prevent form submission if password field is empty", async () => {

    // Configure a user event instance 
    const user = userEvent.setup()

    // Render component prior to testing 
    render(<LoginPage />)

    const emailInput = screen.getByLabelText("Email")

    const loginButton = screen.getByRole("button", { name: /Login/i })

    await user.type(emailInput, "test123@gmail.com")

    await user.click(loginButton)

    expect(mockLogin).not.toHaveBeenCalled();

    expect(await screen.findByText("Please enter your email and password.")).toBeInTheDocument()
});


test("prevent form submission if email field is empty", async () => {

    // Configure a user event instance 
    const user = userEvent.setup()

    // Render component prior to testing 
    render(<LoginPage />)

    const passwordInput = screen.getByLabelText("Password")

    const loginButton = screen.getByRole("button", { name: /Login/i })

    await user.type(passwordInput, "password123")

    await user.click(loginButton)

    expect(mockLogin).not.toHaveBeenCalled();

    expect(await screen.findByText("Please enter your email and password.")).toBeInTheDocument()
});



describe('trigger each error handled by the login page', () => {

    test.each([
        [401, "Invalid email or password"],
        [404, "It looks like you don't have an account yet. Sign up to get started."],
        [422, "Please enter a valid email and password"],
        [500, "Something went wrong. Please try again."]
    ])(

        'renders correct error message for status %s',
        async (statusCode, expectedMessage) => {

            // Configure a user event instance 
            const user = userEvent.setup()

            // Set-up the mock error object prior to rendering 

            // Match the shape of the error object caught
            mockLogin.mockRejectedValue({
                response: {
                    status: statusCode,
                },
            })

            // Render component prior to testing 
            render(<LoginPage />)


            const emailInput = screen.getByLabelText("Email")

            const passwordInput = screen.getByLabelText("Password")

            const loginButton = screen.getByRole("button", { name: /Login/i })

            await user.type(passwordInput, "password123")

            await user.type(emailInput, "test123@gmail.com")

            // Submit form
            await user.click(loginButton)

            expect(
                await screen.findByText(expectedMessage)).toBeInTheDocument()

        }

    )
})


