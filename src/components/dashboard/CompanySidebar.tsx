
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  Building,
  Users,
  UserCheck,
  DollarSign,
  Calculator,
  FileText,
  Truck,
  UserCog,
  Shield,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';

interface CompanySidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: Home },
  { id: 'projects', label: 'Projects & Units', icon: Building },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'agents', label: 'Agents & Marketers', icon: UserCheck },
  { id: 'commissions', label: 'Commissions', icon: DollarSign },
  { id: 'accounting', label: 'Accounting', icon: Calculator },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'vendors', label: 'Vendors & Expenses', icon: Truck },
  { id: 'staff', label: 'Staff & Payroll', icon: UserCog },
  { id: 'roles', label: 'Roles & Permissions', icon: Shield },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

export function CompanySidebar({ activeModule, setActiveModule }: CompanySidebarProps) {
  const { collapsed } = useSidebar();

  const handleLogout = () => {
    // Handle logout logic
    window.location.href = '/login';
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-purple-600">ProptyOS</h2>
              <p className="text-xs text-gray-500">Company Dashboard</p>
            </div>
          )}
        </div>
        <SidebarTrigger className="ml-auto" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeModule === item.id}
                    onClick={() => setActiveModule(item.id)}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  {!collapsed && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
