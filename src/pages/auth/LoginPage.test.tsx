import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "./LoginPage";
import { vi } from "vitest";
import { useAuth } from "../../hooks/useAuth";

// 1. Test Component Rendering 

// Mock useAuth 



test.only('renders login form fields', () => {

    // Render component prior to testing 
    render(<LoginPage />)

    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button")).toBeInTheDocument()

})