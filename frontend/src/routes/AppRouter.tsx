import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { ExportPage } from "../pages/ExportPage";
import { LeadDetailPage } from "../pages/LeadDetailPage";
import { LeadsPage } from "../pages/LeadsPage";
import { LoginPage } from "../pages/LoginPage";
import { MonitoringPage } from "../pages/MonitoringPage";
import { UsersPage } from "../pages/UsersPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="/leads" element={<LeadsPage />} />
            <Route path="/leads/:id" element={<LeadDetailPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/export" element={<ExportPage />} />
            <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
              <Route path="/users" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
