import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
  permissions: string[];
}

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface UserState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // UI state
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';

  // Store management
  currentStore: Store | null;
  availableStores: Store[];

  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrentStore: (store: Store) => void;
  setAvailableStores: (stores: Store[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      sidebarCollapsed: false,
      theme: 'light',
      currentStore: {
        id: '1',
        name: 'Main Store',
        address: '123 Business St, City, State',
        phone: '+1 (555) 123-4567'
      },
      availableStores: [
        {
          id: '1',
          name: 'Main Store',
          address: '123 Business St, City, State',
          phone: '+1 (555) 123-4567'
        },
        {
          id: '2',
          name: 'Branch Store',
          address: '456 Commerce Ave, City, State',
          phone: '+1 (555) 987-6543'
        }
      ],

      // Actions
      setUser: (user: User) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setTheme: (theme: 'light' | 'dark') =>
        set({ theme }),

      setCurrentStore: (store: Store) =>
        set({ currentStore: store }),

      setAvailableStores: (stores: Store[]) =>
        set({ availableStores: stores }),

      setLoading: (loading: boolean) =>
        set({ isLoading: loading }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
        currentStore: state.currentStore,
        availableStores: state.availableStores,
      }),
    }
  )
);

// Initialize with mock user for demo
export const initializeDemoUser = () => {
  const { setUser } = useUserStore.getState();
  
  const demoUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'manager',
    permissions: [
      'view_dashboard',
      'manage_products',
      'manage_invoices',
      'view_customers',
      'manage_stock',
      'view_reports',
      'manage_settings'
    ]
  };

  setUser(demoUser);
};

// Call this in your app initialization
setTimeout(() => {
  initializeDemoUser();
}, 100);