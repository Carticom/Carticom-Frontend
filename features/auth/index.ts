// ============================================================
// CARTICOM AUTHENTICATION — Main Barrel Export
// ============================================================

// Types
export * from './types';

// Schemas
export * from './schemas';

// Services
export { authService, default as authServiceDefault } from './services/auth.service';

// Store
export { useAuthStore, selectUser, selectIsAuthenticated, selectIsLoading, selectUserRole, selectIsBusinessOwner } from './store/auth.store';

// Hooks
export { useAuth, useInitializeAuth, useSessionMonitor, useToken } from './hooks';

// Components
export { AuthGuard, PublicOnlyGuard } from './components/AuthGuard';
export { RoleGuard, usePermission, BUSINESS_OWNER_ONLY, STAFF_AND_ABOVE, ADMIN_AND_ABOVE, SUPER_ADMIN_ONLY, AUTHENTICATED_USERS } from './components/RoleGuard';
export { AuthLayout } from './components/AuthLayout';