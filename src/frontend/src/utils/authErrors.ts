/**
 * Utility to classify backend errors as authorization-related.
 * Detects common trap messages and error patterns from the backend.
 */

export function isUnauthorizedError(error: unknown): boolean {
  if (!error) return false;

  const errorMessage = getErrorMessage(error);
  
  // Check for common authorization trap messages
  const unauthorizedPatterns = [
    'Unauthorized',
    'Only users can',
    'Only admins can',
    'permission',
    'not authorized',
    'access denied',
  ];

  return unauthorizedPatterns.some(pattern => 
    errorMessage.toLowerCase().includes(pattern.toLowerCase())
  );
}

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'An unknown error occurred';
}

export function getUnauthorizedMessage(): string {
  return 'You are not authorized to perform this action. Please contact an administrator to assign you the appropriate role (User or Admin) via the Role Management page.';
}
