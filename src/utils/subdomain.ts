import { UserRole } from '../types';

export type SubdomainType = 'landing' | 'coach' | 'athlete' | 'gym' | 'admin' | 'auth';

/**
 * Detects the active subdomain or route context.
 * Supports:
 * - Real production subdomains: coach.domain.com, athlete.domain.com, gym.domain.com, admin.domain.com
 * - Localhost / Path-based routing: /coach, /athlete, /gym, /admin, /auth, /
 */
export function getSubdomain(): SubdomainType {
  const hostname = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  // 1. Check Subdomains (Production multi-domain deployment)
  if (hostname.startsWith('coach.')) return 'coach';
  if (hostname.startsWith('athlete.') || hostname.startsWith('app.')) return 'athlete';
  if (hostname.startsWith('gym.')) return 'gym';
  if (hostname.startsWith('admin.')) return 'admin';
  if (hostname.startsWith('auth.') || hostname.startsWith('login.')) return 'auth';

  // 2. Check Route paths (Single-domain or local development)
  if (path.startsWith('/coach')) return 'coach';
  if (path.startsWith('/athlete')) return 'athlete';
  if (path.startsWith('/gym')) return 'gym';
  if (path.startsWith('/admin')) return 'admin';
  if (path.startsWith('/auth') || path.startsWith('/login')) return 'auth';

  return 'landing';
}

export function getRoleFromSubdomain(subdomain: SubdomainType): UserRole {
  switch (subdomain) {
    case 'coach':
      return 'coach';
    case 'athlete':
      return 'athlete';
    case 'gym':
      return 'gym_owner';
    case 'admin':
      return 'admin';
    default:
      return 'coach';
  }
}
