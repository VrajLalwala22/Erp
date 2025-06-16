import { useUserRole } from "../hooks/useUserRole";
import { useUserStore } from "../store/user";

const RoleBasedLayout = () => {
  const role = useUserRole();
  const { user } = useUserStore();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {user.name}</h1>
      <p className="text-sm text-gray-500">Role: {user.role}</p>

      {role.allModules && <p className="mt-4">Access: Full ERP Modules</p>}
      {role.readOnly && (
        <p className="mt-4 text-yellow-600">Access: Read-Only</p>
      )}
    </div>
  );
};

export default RoleBasedLayout;
