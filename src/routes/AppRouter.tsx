import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";
import AuthLayout from "../layouts/AuthLayout";


// TODO: Confirm if student are the only user type that require an account management page

// Defines the application's routing structure, including public and protected routes and nested dashboard layouts  
export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                // Public Routes
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                // Protected Routes
                <Route element={<ProtectedRoute />}>
                    // Studnet Dashboard
                    <Route path="/student" element={<StudentLayout />}>
                        <Route index element={<StudentHome />} />
                        <Route path="essay-submission" element={<EssaySubmissionPage />} />
                        <Route path="practice-writing" element={<PracticeWritingPage />} />
                        <Route path="reports" element={<ReportsPage />}>
                            <Route
                                path="submission-analysis"
                                element={<SubmissionAnalysisPage />}
                            />
                        </Route>
                    </Route>
                    // Teacher Dashboard
                    <Route path="/teacher" element={<TeacherLayout />}>
                        <Route index element={<TeacherHome />} />
                        <Route path="page-1" element={<Teacher />} />
                    </Route>
                    // Admin Dashboard
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminHome />} />
                        <Route path="users" element={<UsersPage />} />
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}