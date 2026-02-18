# Specification

## Summary
**Goal:** Add a simple Internet Identity login flow with clear authenticated/unauthenticated states and an authorization gate that prevents unauthorized users from seeing broken pages.

**Planned changes:**
- Add a dedicated login screen shown when the user is not authenticated (instead of rendering the main AppShell/routes).
- Add an initialization/loading state while Internet Identity is starting up, before rendering the app shell.
- Add a post-login authorization gate that detects Unauthorized backend responses and shows an “Access Denied / Not Authorized” screen with the user’s Principal ID and guidance to contact an admin for role assignment.
- Ensure logout works from both the main app and access-denied screen, returning to the login screen and clearing cached queries so no authenticated data remains visible.
- Adjust onboarding so ProfileSetupModal only appears when the user is authenticated, authorized, and the backend profile is missing (null); show clear, user-friendly errors if profile creation fails (Unauthorized vs other errors).

**User-visible outcome:** Users see a login screen until they sign in with Internet Identity; after login they either access the app normally (and only see profile setup if needed) or see a friendly access-denied page with their Principal ID and logout option if they lack permissions.
