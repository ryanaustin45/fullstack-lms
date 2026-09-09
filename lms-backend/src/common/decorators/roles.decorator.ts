import { SetMetadata } from '@nestjs/common';

// Dipakai di atas controller/route: @Roles('admin', 'pemateri')
// Mirip middleware('role:admin') di Laravel.
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
