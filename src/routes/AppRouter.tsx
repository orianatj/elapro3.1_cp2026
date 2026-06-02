import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import { AdminDashboardPage } from "../pages/admin/adminDashboard.tsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import { AdminSubscriptionsPage } from "../pages/admin/AdminSubscriptionsPage";
import AdminReportsPage from "../pages/admin/AdminReportsPage";
import TeacherLayout from "../layouts/TeacherLayout";
import TeacherDashboard from "../pages/teacher/teacher.tsx";
import ViewSubmissions from "../pages/teacher/teacherviewsubmissions.tsx";
import EditStudentScorePage from "../pages/teacher/EditStudentScore.tsx";
import IndividualSubmission from "../pages/teacher/IndividualSubmission.tsx";
import EssaySubmissionPage from "../pages/student/EssaySubmission";
import StudentDashboardPage from "../pages/student/StudentDashboard";
import CreateAssignment from "../pages/teacher/createAssignment.tsx";
import PracticeWritingPage from "../pages/student/PracticeWriting";
import SubmissionsPage from "../pages/student/StudentSubmissions";
import SubmissionAnalysisPage from "../pages/student/SubmissionAnalysis";
import AccountSettingsPage from "../pages/common/AccountSettingsPage";
import { ConfirmEmailChangePage } from "../pages/common/ConfirmEmailChangePage";
import { CancelEmailChangePage } from "../pages/common/CancelEmailChangePage";
import { ConfirmDeleteAccountPage } from "../pages/common/ConfirmDeleteAccountPage";
import { LoginPage } from "../pages/auth/LoginPage.tsx";
import { SignupPage } from "../pages/auth/SignupPage.tsx";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage.tsx";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage.tsx";
import { VerifyEmailPage } from "../pages/auth/VerifyEmailPage.tsx";
import { DashboardRedirect } from "./DashboardRedirect.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

// Defines the application's routing structure, including public and protected routes and nested dashboard layouts
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/confirm-email-change" element={<ConfirmEmailChangePage />} />
        <Route path="/cancel-email-change" element={<CancelEmailChangePage />} />
        <Route path="/confirm-delete-account" element={<ConfirmDeleteAccountPage />} />

        {/* Dashboard Redirect */}
        <Route path="/" element={<DashboardRedirect />} />

        {/* Student Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboardPage />} />
            <Route path="essay-submission" element={<EssaySubmissionPage />} />
            <Route path="practice-writing" element={<PracticeWritingPage />} />
            <Route path="submissions" element={<SubmissionsPage />} />
            <Route path="submission/:submissionId" element={<SubmissionAnalysisPage />} />
          </Route>
        </Route>

        {/* Teacher Protected Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["supervisory_teacher", "external_teacher"]}
            />
          }
        >
          <Route path="/teacher" element={<TeacherLayout />}>
            {/* Shared Teacher Routes */}
            <Route index element={<TeacherDashboard />} />
            <Route path="submissions" element={<ViewSubmissions />} />
            <Route
              path="individual-submission/:submissionId/:firstName?/:lastName?"
              element={<IndividualSubmission />}
            />

            {/* Supervisory Teacher Only Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["supervisory_teacher"]} />
              }
            >
              <Route path="edit-score/:submissionId/:firstName?/:lastName?" element={<EditStudentScorePage />} />
              <Route path="create-assignment" element={<CreateAssignment />} />
            </Route>

            {/* External Teacher Only Routes */}
            <Route
              element={<ProtectedRoute allowedRoles={["external_teacher"]} />}
            >
              <Route path="create-assignment" element={<CreateAssignment />} />
            </Route>
          </Route>
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
          </Route>
        </Route>

        {/* Common Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "student", "supervisory_teacher", "external_teacher"]} />}>
          <Route path="/settings" element={<AccountSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}