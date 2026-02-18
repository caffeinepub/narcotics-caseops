import { type ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import ProfileSetupModal from './ProfileSetupModal';
import LoginButton from './LoginButton';
import { Shield } from 'lucide-react';

interface AuthGateProps {
  children: ReactNode;
}

export default function AuthGate({ children }: AuthGateProps) {
  const { identity, loginStatus } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isInitializing = loginStatus === 'initializing';

  // Show loading during initialization
  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[oklch(0.25_0_0)] to-[oklch(0.15_0_0)]">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 animate-pulse text-[oklch(0.85_0_0)]" />
          <p className="mt-4 text-lg text-[oklch(0.75_0_0)]">Initializing...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[oklch(0.25_0_0)] to-[oklch(0.15_0_0)]">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-card p-8 shadow-2xl">
          <div className="text-center">
            <img
              src="/assets/generated/narc_eye_logo.png.dim_1024x1024.jpeg"
              alt="NARC EYE Logo"
              className="mx-auto h-24 w-24 object-contain"
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">NARC EYE</h1>
            <p className="mt-2 text-sm text-muted-foreground">Anti-Narcotics Task Force (Ops)</p>
          </div>
          <div className="mt-8">
            <LoginButton />
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Authorized personnel only. All access is logged and monitored.
          </p>
        </div>
      </div>
    );
  }

  // Show profile setup if user is authenticated but has no profile
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      {showProfileSetup && <ProfileSetupModal />}
      {children}
    </>
  );
}
