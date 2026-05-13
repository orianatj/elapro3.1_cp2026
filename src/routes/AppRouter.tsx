import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import { AdminDashboardPage } from "../pages/admin/adminDashboard.tsx";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import TeacherLayout from "../layouts/TeacherLayout";
import TeacherDashboard from "../pages/teacher/teacher.tsx";
import ViewSubmissions from "../pages/teacher/teacherviewsubmissions.tsx";
import EditStudentScorePage from "../pages/teacher/EditStudentScore.tsx";
import IndividualSubmission from "../pages/teacher/IndividualSubmission.tsx";
import EssaySubmissionPage from "../pages/student/EssaySubmission";
import StudentDashboardPage from "../pages/student/StudentDashboard";
import PracticeWritingPage from "../pages/student/PracticeWriting";
import SubmissionAnalysisPage from "../pages/student/SubmissionAnalysis";
import SubmissionsPage from "../pages/student/StudentSubmissions";
import { LoginPage } from "../pages/auth/LoginPage.tsx"
import { SignupPage } from "../pages/auth/SignupPage.tsx";

// TODO: Confirm if student are the only user type that require an account management page

// Defines the application's routing structure, including public and protected routes and nested dashboard layouts
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />

        {/* Protected Routes */}
        {/*<Route element={<ProtectedRoute />}>*/}

        {/* Studnet Dashboard */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="essay-submission" element={<EssaySubmissionPage />} />
          <Route path="practice-writing" element={<PracticeWritingPage />} />
          <Route path="submissions" element={<SubmissionsPage />} >
            {/*<Route path=":submissionId" element={<SubmissionAnalysisPage />} />*/}
          </Route>
        </Route>

        {/* Teacher Dashboard */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="edit-score" element={<EditStudentScorePage />} />
          <Route path="individual-submission" element={<IndividualSubmission />} />
          <Route path="submissions" element={<ViewSubmissions />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}