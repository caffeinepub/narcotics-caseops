import { Link, useRouterState } from '@tanstack/react-router';
import { Home, FolderOpen, ListTodo, Activity, Package, Users, Building2, BookOpen, MoreHorizontal, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsCallerAdmin } from '../../hooks/useQueries';

export default function MobileNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { data: isAdmin = false } = useIsCallerAdmin();

  const primaryNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/cases', label: 'Cases', icon: FolderOpen },
    { path: '/tasks', label: 'Tasks', icon: ListTodo },
    { path: '/activity-logs', label: 'Activity', icon: Activity },
  ];

  const moreNavItems = [
    { path: '/evidence', label: 'Evidence', icon: Package },
    { path: '/accused-information', label: 'Accused Info', icon: Users },
    { path: '/antf-structure', label: 'ANTF Structure', icon: Building2 },
  ];

  const referenceItems = [
    { path: '/antf-reference/laws', label: 'Laws' },
    { path: '/antf-reference/procedures', label: 'Procedures' },
    { path: '/antf-reference/modules', label: 'Modules' },
    { path: '/antf-reference/ndps-substances', label: 'NDPS Substances' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return currentPath === path;
    return currentPath.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card shadow-lg safe-bottom md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link key={item.path} to={item.path} className="flex-1">
              <Button
                variant={active ? 'default' : 'ghost'}
                size="sm"
                className="flex h-14 w-full flex-col items-center justify-center gap-1 px-2"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs leading-tight">{item.label}</span>
              </Button>
            </Link>
          );
        })}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex h-14 flex-1 flex-col items-center justify-center gap-1 px-2"
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs leading-tight">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mb-2">
            <DropdownMenuLabel>More Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {moreNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <DropdownMenuItem>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </DropdownMenuItem>
                </Link>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Reference</DropdownMenuLabel>
            {referenceItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  {item.label}
                </DropdownMenuItem>
              </Link>
            ))}
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <Link to="/admin/roles">
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    Role Management
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
