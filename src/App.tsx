import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./app/layouts/MainLayout";
import { ProtectedRoute } from "./app/components/ProtectedRoute";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import LoginPage from "./pages/auth/LoginPage";
import PatientsPage from "./pages/patients/PatientsPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
