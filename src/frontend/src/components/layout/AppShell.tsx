import { type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Home, FolderOpen, ListTodo, Activity, Package, User, LogOut, Building2, BookOpen, Users, Shield } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { SiCaffeine } from 'react-icons/si';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin = false } = useIsCallerAdmin();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/cases', label: 'Cases', icon: FolderOpen },
    { path: '/tasks', label: 'Tasks', icon: ListTodo },
    { path: '/activity-logs', label: 'Activity Logs', icon: Activity },
    { path: '/evidence', label: 'Evidence', icon: Package },
    { path: '/accused-information', label: 'Accused Info', icon: Users },
    { path: '/antf-structure', label: 'ANTF Structure', icon: Building2 },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src="/assets/generated/narc_eye_logo.png.dim_1024x1024.jpeg" alt="NARC EYE Logo" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-lg font-bold leading-tight text-foreground">NARC EYE</h1>
              <p className="text-xs text-muted-foreground">Anti-Narcotics Task Force (Ops)</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <Link key={item.path} to={item.path}>
                  <Button variant={isActive ? 'default' : 'ghost'} size="sm" className="gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Reference
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/antf-reference/laws">
                  <DropdownMenuItem>Laws</DropdownMenuItem>
                </Link>
                <Link to="/antf-reference/procedures">
                  <DropdownMenuItem>Procedures</DropdownMenuItem>
                </Link>
                <Link to="/antf-reference/modules">
                  <DropdownMenuItem>Modules</DropdownMenuItem>
                </Link>
                <Link to="/antf-reference/ndps-substances">
                  <DropdownMenuItem>NDPS Substances & Quantity</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{userProfile?.name || 'Officer'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{userProfile?.name}</p>
                  <p className="text-xs text-muted-foreground">{userProfile?.rank}</p>
                  <p className="text-xs text-muted-foreground">Badge: {userProfile?.badgeNumber}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isAdmin && (
                <>
                  <Link to="/admin/roles">
                    <DropdownMenuItem>
                      <Shield className="mr-2 h-4 w-4" />
                      Role Management
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="border-t border-border md:hidden">
          <nav className="container mx-auto flex items-center justify-around px-2 py-2">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <Link key={item.path} to={item.path}>
                  <Button variant={isActive ? 'default' : 'ghost'} size="sm" className="flex-col gap-1 h-auto py-2">
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{item.label.split(' ')[0]}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} NARC EYE. Built with{' '}
            <SiCaffeine className="inline h-4 w-4 text-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
