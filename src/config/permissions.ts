// Role-based permission matrix for the ERP system

export type Permission = 
  | 'dashboard.view'
  | 'products.view'
  | 'products.create'
  | 'products.edit'
  | 'products.delete'
  | 'products.bulk_edit'
  | 'invoices.view'
  | 'invoices.create'
  | 'invoices.edit'
  | 'invoices.delete'
  | 'invoices.send'
  | 'customers.view'
  | 'customers.create'
  | 'customers.edit'
  | 'customers.delete'
  | 'customers.export'
  | 'stock.view'
  | 'stock.adjust'
  | 'stock.transfer'
  | 'stock.audit'
  | 'reports.view'
  | 'reports.export'
  | 'reports.schedule'
  | 'settings.view'
  | 'settings.edit'
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete'
  | 'stores.switch'
  | 'stores.create'
  | 'stores.edit'
  | 'system.backup'
  | 'system.restore';

export type Role = 'super_admin' | 'admin' | 'manager' | 'sales' | 'inventory' | 'viewer';

// Permission matrix defining what each role can do
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [
    // Dashboard
    'dashboard.view',
    
    // Products
    'products.view',
    'products.create',
    'products.edit',
    'products.delete',
    'products.bulk_edit',
    
    // Invoices
    'invoices.view',
    'invoices.create',
    'invoices.edit',
    'invoices.delete',
    'invoices.send',
    
    // Customers
    'customers.view',
    'customers.create',
    'customers.edit',
    'customers.delete',
    'customers.export',
    
    // Stock
    'stock.view',
    'stock.adjust',
    'stock.transfer',
    'stock.audit',
    
    // Reports
    'reports.view',
    'reports.export',
    'reports.schedule',
    
    // Settings
    'settings.view',
    'settings.edit',
    
    // Users
    'users.view',
    'users.create',
    'users.edit',
    'users.delete',
    
    // Stores
    'stores.switch',
    'stores.create',
    'stores.edit',
    
    // System
    'system.backup',
    'system.restore',
  ],

  admin: [
    // Dashboard
    'dashboard.view',
    
    // Products
    'products.view',
    'products.create',
    'products.edit',
    'products.delete',
    'products.bulk_edit',
    
    // Invoices
    'invoices.view',
    'invoices.create',
    'invoices.edit',
    'invoices.delete',
    'invoices.send',
    
    // Customers
    'customers.view',
    'customers.create',
    'customers.edit',
    'customers.delete',
    'customers.export',
    
    // Stock
    'stock.view',
    'stock.adjust',
    'stock.transfer',
    'stock.audit',
    
    // Reports
    'reports.view',
    'reports.export',
    'reports.schedule',
    
    // Settings
    'settings.view',
    'settings.edit',
    
    // Users (limited)
    'users.view',
    'users.create',
    'users.edit',
    
    // Stores
    'stores.switch',
  ],

  manager: [
    // Dashboard
    'dashboard.view',
    
    // Products
    'products.view',
    'products.create',
    'products.edit',
    'products.bulk_edit',
    
    // Invoices
    'invoices.view',
    'invoices.create',
    'invoices.edit',
    'invoices.send',
    
    // Customers
    'customers.view',
    'customers.create',
    'customers.edit',
    'customers.export',
    
    // Stock
    'stock.view',
    'stock.adjust',
    'stock.transfer',
    
    // Reports
    'reports.view',
    'reports.export',
    
    // Settings (limited)
    'settings.view',
    
    // Users (view only)
    'users.view',
    
    // Stores
    'stores.switch',
  ],

  sales: [
    // Dashboard
    'dashboard.view',
    
    // Products (view and basic edit)
    'products.view',
    'products.edit',
    
    // Invoices
    'invoices.view',
    'invoices.create',
    'invoices.edit',
    'invoices.send',
    
    // Customers
    'customers.view',
    'customers.create',
    'customers.edit',
    'customers.export',
    
    // Stock (view only)
    'stock.view',
    
    // Reports (limited)
    'reports.view',
    'reports.export',
    
    // Settings (view only)
    'settings.view',
  ],

  inventory: [
    // Dashboard
    'dashboard.view',
    
    // Products
    'products.view',
    'products.create',
    'products.edit',
    'products.bulk_edit',
    
    // Invoices (view only)
    'invoices.view',
    
    // Customers (view only)
    'customers.view',
    
    // Stock (full access)
    'stock.view',
    'stock.adjust',
    'stock.transfer',
    'stock.audit',
    
    // Reports (stock related)
    'reports.view',
    'reports.export',
    
    // Settings (view only)
    'settings.view',
  ],

  viewer: [
    // Dashboard
    'dashboard.view',
    
    // Products (view only)
    'products.view',
    
    // Invoices (view only)
    'invoices.view',
    
    // Customers (view only)
    'customers.view',
    
    // Stock (view only)
    'stock.view',
    
    // Reports (view only)
    'reports.view',
    
    // Settings (view only)
    'settings.view',
  ],
};

// Helper function to check if a role has a specific permission
export const hasPermission = (role: Role, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};

// Helper function to check multiple permissions
export const hasAllPermissions = (role: Role, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(role, permission));
};

// Helper function to check if user has any of the specified permissions
export const hasAnyPermission = (role: Role, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(role, permission));
};

// Get all permissions for a role
export const getRolePermissions = (role: Role): Permission[] => {
  return ROLE_PERMISSIONS[role] || [];
};

// Role hierarchy (higher roles inherit permissions from lower roles)
export const ROLE_HIERARCHY: Record<Role, number> = {
  viewer: 1,
  inventory: 2,
  sales: 3,
  manager: 4,
  admin: 5,
  super_admin: 6,
};

// Check if one role is higher than another
export const isRoleHigher = (role1: Role, role2: Role): boolean => {
  return ROLE_HIERARCHY[role1] > ROLE_HIERARCHY[role2];
};

// Get role display name
export const getRoleDisplayName = (role: Role): string => {
  const roleNames: Record<Role, string> = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    manager: 'Manager',
    sales: 'Sales',
    inventory: 'Inventory',
    viewer: 'Viewer',
  };
  
  return roleNames[role];
};

// Get role description
export const getRoleDescription = (role: Role): string => {
  const descriptions: Record<Role, string> = {
    super_admin: 'Full system access with all permissions including user management and system operations',
    admin: 'Administrative access with most permissions except system-level operations',
    manager: 'Management-level access with oversight capabilities for products, sales, and inventory',
    sales: 'Sales-focused access with customer and invoice management capabilities',
    inventory: 'Inventory-focused access with stock management and product catalog capabilities',
    viewer: 'Read-only access to view data without modification capabilities',
  };
  
  return descriptions[role];
};

// Permission categories for UI organization
export const PERMISSION_CATEGORIES = {
  Dashboard: ['dashboard.view'],
  Products: ['products.view', 'products.create', 'products.edit', 'products.delete', 'products.bulk_edit'],
  Invoices: ['invoices.view', 'invoices.create', 'invoices.edit', 'invoices.delete', 'invoices.send'],
  Customers: ['customers.view', 'customers.create', 'customers.edit', 'customers.delete', 'customers.export'],
  Stock: ['stock.view', 'stock.adjust', 'stock.transfer', 'stock.audit'],
  Reports: ['reports.view', 'reports.export', 'reports.schedule'],
  Settings: ['settings.view', 'settings.edit'],
  Users: ['users.view', 'users.create', 'users.edit', 'users.delete'],
  Stores: ['stores.switch', 'stores.create', 'stores.edit'],
  System: ['system.backup', 'system.restore'],
} as const;

// Get permission category
export const getPermissionCategory = (permission: Permission): string => {
  for (const [category, permissions] of Object.entries(PERMISSION_CATEGORIES)) {
    if ((permissions as unknown as string[]).includes(permission)) {
      return category;
    }
  }
  return 'Other';
};