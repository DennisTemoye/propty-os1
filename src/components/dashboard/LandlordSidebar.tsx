
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Building, 
  Users, 
  CreditCard, 
  Calculator, 
  FileText, 
  HardHat, 
  Settings, 
  LogOut 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard Overview', url: '/landlord/dashboard', icon: Home },
  { title: 'Properties & Units', url: '/landlord/properties', icon: Building },
  { title: 'Tenants', url: '/landlord/tenants', icon: Users },
  { title: 'Rent Collection', url: '/landlord/rent-collection', icon: CreditCard },
  { title: 'Accounting', url: '/landlord/accounting', icon: Calculator },
  { title: 'Lease Documents', url: '/landlord/lease-documents', icon: FileText },
  { title: 'Staff & Vendors', url: '/landlord/staff-vendors', icon: HardHat },
  { title: 'Settings', url: '/landlord/settings', icon: Settings },
];

export function LandlordSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg text-purple-600">ProptyOS</h2>
                <p className="text-xs text-gray-500">Landlord Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                {!isCollapsed && <span>Logout</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <SidebarTrigger className="absolute -right-3 top-4 bg-white border border-gray-300 rounded-full p-1" />
      </SidebarContent>
    </Sidebar>
  );
}
