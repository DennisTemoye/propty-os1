import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Home,
  CreditCard,
  Building2,
  UserPlus,
  Bell,
  Plus
} from 'lucide-react';
import { NewClientForm } from './forms/NewClientForm';
import { NewAllocationForm } from './forms/NewAllocationForm';
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom';

export function DashboardOverview() {
  const navigate = useNavigate();
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showNewAllocationModal, setShowNewAllocationModal] = useState(false);
  const { toast } = useToast()

  const handleNewClientClose = () => {
    setShowNewClientModal(false);
  };

  const handleNewAllocationClose = () => {
    setShowNewAllocationModal(false);
  };

  const handleNewProject = () => {
    navigate('/company/projects/new');
  };

  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Track key metrics and recent activity across your projects</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Quick Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleNewProject}>
                <Building2 className="h-4 w-4 mr-2" />
                New Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowNewClientModal(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                New Client
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowNewAllocationModal(true)}>
                <Home className="h-4 w-4 mr-2" />
                New Allocation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">32</div>
            <p className="text-sm text-gray-500 mt-1">Active and completed developments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,458</div>
            <p className="text-sm text-gray-500 mt-1">Residential and commercial units</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Allocated Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">987</div>
            <p className="text-sm text-gray-500 mt-1">Units currently under allocation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₦7.5B</div>
            <p className="text-sm text-gray-500 mt-1">Projected revenue from unit sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A summary of recent activities and transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Jan 9, 2024</TableCell>
                <TableCell>Unit A-15 allocated to John Doe</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell className="text-right">N/A</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Jan 8, 2024</TableCell>
                <TableCell>Payment received for Unit B-08</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell className="text-right">₦2,500,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Jan 7, 2024</TableCell>
                <TableCell>Document uploaded: Survey Plan</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell className="text-right">N/A</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">₦2,500,000</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* New Client Modal */}
      {showNewClientModal && (
        <NewClientForm onClose={handleNewClientClose} />
      )}

      {/* New Allocation Modal */}
      {showNewAllocationModal && (
        <NewAllocationForm onClose={handleNewAllocationClose} />
      )}
    </div>
  );
}
