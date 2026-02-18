import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppShell from './components/layout/AppShell';
import AuthGate from './components/auth/AuthGate';
import DashboardPage from './pages/DashboardPage';
import CasesListPage from './pages/CasesListPage';
import CaseDetailPage from './pages/CaseDetailPage';
import TasksPage from './pages/TasksPage';
import ActivityLogsPage from './pages/ActivityLogsPage';
import EvidencePage from './pages/EvidencePage';
import AntfStructurePage from './pages/AntfStructurePage';
import LawsPage from './pages/antf-reference/LawsPage';
import ProceduresPage from './pages/antf-reference/ProceduresPage';
import ModulesPage from './pages/antf-reference/ModulesPage';
import NdpsSubstancesQuantityPage from './pages/antf-reference/NdpsSubstancesQuantityPage';
import AccusedInformationPage from './pages/AccusedInformationPage';
import AdminRoleManagementPage from './pages/AdminRoleManagementPage';

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthGate>
        <AppShell>
          <Outlet />
        </AppShell>
      </AuthGate>
      <Toaster />
    </ThemeProvider>
  ),
});

// Define routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const casesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cases',
  component: CasesListPage,
});

const caseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cases/$caseId',
  component: CaseDetailPage,
});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks',
  component: TasksPage,
});

const activityLogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/activity-logs',
  component: ActivityLogsPage,
});

const evidenceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/evidence',
  component: EvidencePage,
});

const antfStructureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/antf-structure',
  component: AntfStructurePage,
});

const lawsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/antf-reference/laws',
  component: LawsPage,
});

const proceduresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/antf-reference/procedures',
  component: ProceduresPage,
});

const modulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/antf-reference/modules',
  component: ModulesPage,
});

const ndpsSubstancesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/antf-reference/ndps-substances',
  component: NdpsSubstancesQuantityPage,
});

const accusedInformationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/accused-information',
  component: AccusedInformationPage,
});

const adminRoleManagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/roles',
  component: AdminRoleManagementPage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  casesRoute,
  caseDetailRoute,
  tasksRoute,
  activityLogsRoute,
  evidenceRoute,
  antfStructureRoute,
  lawsRoute,
  proceduresRoute,
  modulesRoute,
  ndpsSubstancesRoute,
  accusedInformationRoute,
  adminRoleManagementRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
