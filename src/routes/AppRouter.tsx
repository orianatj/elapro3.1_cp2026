import { BrowserRouter, Routes, Route } from "react-router-dom";
//import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";
import TeacherLayout from "../layouts/TeacherLayout";
//import AuthLayout from "../layouts/AuthLayout";
import EssaySubmissionPage from "../pages/student/EssaySubmission";
import StudentDashboardPage from "../pages/student/StudentDashboard";
import PracticeWritingPage from "../pages/student/PracticeWriting";
import SubmissionAnalysisPage from "../pages/student/SubmissionAnalysis";
import ReportsPage from "../pages/student/Reports";
import TeacherDashboard from "../pages/teacher/teacher.tsx";

// TODO: Confirm if student are the only user type that require an account management page

// Defines the application's routing structure, including public and protected routes and nested dashboard layouts
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 
                <Route path="/" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                </Route>*/}
        // Protected Routes
        {/*<Route element={<ProtectedRoute />}>*/}
        // Studnet Dashboard
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="essay-submission" element={<EssaySubmissionPage />} />
          <Route path="practice-writing" element={<PracticeWritingPage />} />
          <Route path="reports" element={<ReportsPage />}>
            <Route
              path="submission-analysis"
              element={<SubmissionAnalysisPage />}
            />
          </Route>
          {

            /*</Route>
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
                */
          }
        </Route>
        <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
