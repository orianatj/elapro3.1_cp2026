import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { SignupForm } from "./SignupForm";
import { vi } from "vitest";


// Reusable helper 
function setup() {

    const user = userEvent.setup();

    // Mock SignupForm props 
    const mockOnSuccess = vi.fn()

    render(<MemoryRouter><SignupForm onSuccess={mockOnSuccess} /></MemoryRouter>);

    return {
        user,
        mockOnSuccess,
        firstNameInput: screen.getByLabelText("First Name"),
        lastNameInput: screen.getByLabelText("Last Name"),
        middleNameInput: screen.getByLabelText("Middle Name(optional)"),
        emailInput: screen.getByLabelText("Email"),
        phoneInput: screen.getByLabelText("Phone number (optional)"),
        passwordInput: screen.getByLabelText("Password"),
        confirmPasswordInput: screen.getByLabelText("Confirm password"),
        signupButton: screen.getByRole("button", { name: /sign-up/i }),
    };
}


// Test Component Rendering 

// Mock useRegister mutation function returned by useRegister hook
const mockRegister = vi.fn()

vi.mock("../../hooks/useRegister", () => ({
    useRegister: () => ({
        mutateAsync: mockRegister,
    }),
}))

// Clear call history
beforeEach(() => {
    vi.clearAllMocks();
});

test('renders sign-up form fields', () => {

    setup()

    // First Name field 
    expect(screen.getByLabelText("First Name")).toBeInTheDocument()

    // Last Name field 
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument()

    // Middle Name field
    expect(screen.getByLabelText("Middle Name(optional)")).toBeInTheDocument()

    // Email field
    expect(screen.getByLabelText("Email")).toBeInTheDocument()

    // Phone field 
    expect(screen.getByLabelText("Phone number (optional)")).toBeInTheDocument()

    // Password field
    expect(screen.getByLabelText("Password")).toBeInTheDocument()

    // Confirm Password field
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument()

})


test("submits valid registration data with required fields only", async () => {

    const {
        user,
        firstNameInput,
        lastNameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        signupButton,
    } = setup();


    // Test user input
    await user.type(firstNameInput, "Joe")

    await user.type(lastNameInput, "Bloggs")

    await user.type(emailInput, "joebloggs@gmail.com")

    await user.type(passwordInput, "testPassword123$")

    await user.type(confirmPasswordInput, "testPassword123$")


    expect(firstNameInput).toHaveValue("Joe")

    expect(lastNameInput).toHaveValue("Bloggs")

    expect(emailInput).toHaveValue("joebloggs@gmail.com")

    expect(passwordInput).toHaveValue("testPassword123$")

    expect(confirmPasswordInput).toHaveValue("testPassword123$")

    // Test submitting the form with all required fields populated
    await user.click(signupButton);


    expect(mockRegister).toHaveBeenCalledWith({

        firstName: "Joe",
        lastName: "Bloggs",
        emailAddress: "joebloggs@gmail.com",
        password: "testPassword123$",
        confirmPassword: "testPassword123$",
    })
});




test("Includes optional fields when provided", async () => {

    const {
        user,
        firstNameInput,
        lastNameInput,
        middleNameInput,
        phoneInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        signupButton,

    } = setup();


    // Required fields 
    await user.type(firstNameInput, "Joe")

    await user.type(lastNameInput, "Bloggs")

    await user.type(emailInput, "joebloggs@gmail.com")

    await user.type(passwordInput, "testPassword123$")

    await user.type(confirmPasswordInput, "testPassword123$")

    // Optional fields

    await user.type(middleNameInput, "Jack")

    await user.type(phoneInput, "0404334269")


    // Submit form
    await user.click(signupButton)

    expect(mockRegister).toHaveBeenCalledWith({
        firstName: "Joe",
        middleName: "Jack",
        lastName: "Bloggs",
        emailAddress: "joebloggs@gmail.com",
        phoneNumber: "0404334269",
        password: "testPassword123$",
        confirmPassword: "testPassword123$",

    });
});


test("omits empty optional fields from registration payload", async () => {

    const {
        user,
        firstNameInput,
        lastNameInput,
        middleNameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        signupButton,
    } = setup();

    // Required fields 
    await user.type(firstNameInput, "Joe")

    await user.type(lastNameInput, "Bloggs")

    await user.type(emailInput, "joebloggs@gmail.com")

    await user.type(passwordInput, "testPassword123$")

    await user.type(confirmPasswordInput, "testPassword123$")

    // Empty optional field 
    await user.type(middleNameInput, "  ")

    // Submit form
    await user.click(signupButton)

    expect(mockRegister).toHaveBeenCalledWith({
        firstName: "Joe",
        lastName: "Bloggs",
        emailAddress: "joebloggs@gmail.com",
        password: "testPassword123$",
        confirmPassword: "testPassword123$",
    });

    expect.not.objectContaining({ middleName: expect.anything(), })

});


test("prevents submission when required fields are missing", async () => {

    const {
        user,
        firstNameInput,
        emailInput,
        passwordInput,
        signupButton,
    } = setup();


    // Missing last name and confirm password
    await user.type(firstNameInput, "Joe")


    await user.type(emailInput, "joebloggs@gmail.com")


    await user.type(passwordInput, "testPassword123$")

    // Submit form
    await user.click(signupButton)

    expect(mockRegister).not.toHaveBeenCalled();

    expect(await screen.findByText("Please complete all required fields.")).toBeInTheDocument()

});


test("prevents submission when passwords do not match", async () => {

    const {
        user,
        firstNameInput,
        lastNameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        signupButton,
    } = setup();


    // Required fields 
    await user.type(firstNameInput, "Joe")

    await user.type(lastNameInput, "Bloggs")

    await user.type(emailInput, "joebloggs@gmail.com")

    await user.type(passwordInput, "testPassword123$")

    await user.type(confirmPasswordInput, "TestPassword123$")


    // Submit form
    await user.click(signupButton)

    expect(mockRegister).not.toHaveBeenCalled();

    expect(await screen.findByText("Passwords do not match.")).toBeInTheDocument()

});

describe("maps backend status code to correct user-facing error message", () => {

    test.each([
        [400, "We couldn’t create your account. Your email may already be registered, or your password may not meet the required criteria."],
        [409, "An account with this email already exists. Try logging in instead."],
        [422, "Some information appears to be invalid. Please review your details and try again."],
        [500, "Something went wrong. Please try again."]
    ])(
        'renders correct error message for status %s',

        async (statusCode, expectedMessage) => {

            // Set-up the mock error object prior to rendering 

            // Match the shape of the error object caught
            mockRegister.mockRejectedValue({
                response: {
                    status: statusCode,
                },
            })

            const {
                user,
                firstNameInput,
                lastNameInput,
                emailInput,
                passwordInput,
                confirmPasswordInput,
                signupButton,
            } = setup()


            // Fill Required fields 
            await user.type(firstNameInput, "Joe")

            await user.type(lastNameInput, "Bloggs")

            await user.type(emailInput, "joebloggs@gmail.com")

            await user.type(passwordInput, "testPassword123$")

            await user.type(confirmPasswordInput, "testPassword123$")


            // Submit form
            await user.click(signupButton)


            expect(
                await screen.findByText(expectedMessage)).toBeInTheDocument()

        }
    )

});

test("calls onSuccess after sign-up form has been succesfully submitted", async () => {

    const {
        user,
        mockOnSuccess,
        firstNameInput,
        lastNameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        signupButton,
    } = setup();

    // Mock successful registration 
    mockRegister.mockResolvedValue({});

    // Fill required fields
    await user.type(firstNameInput, "Joe");

    await user.type(lastNameInput, "Bloggs");

    await user.type(emailInput, "joebloggs@gmail.com");

    await user.type(passwordInput, "testPassword123$");

    await user.type(confirmPasswordInput, "testPassword123$");

    // Submit form
    await user.click(signupButton);

    // Verify parent callback triggered
    expect(mockOnSuccess).toHaveBeenCalledWith(
        "joebloggs@gmail.com"
    );

})