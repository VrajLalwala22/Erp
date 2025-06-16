import { useUserStore } from '../store/user';
import { rolePermissions } from '../config/permissions';

export const useUserRole = () => {
  const { user } = useUserStore();
  return rolePermissions[user.role] || rolePermissions.Viewer;
};
