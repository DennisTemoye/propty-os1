import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  DollarSign,
  Users,
} from "lucide-react";
import { formatCurrencyKPI, formatCurrencyChart } from "@/utils/formatCurrency";

const projectData = [
  {
    name: "Victoria Gardens",
    collected: 8500000,
    outstanding: 3200000,
    overdue: 1200000,
    target: 12000000,
  },
  {
    name: "Emerald Heights",
    collected: 6200000,
    outstanding: 4800000,
    overdue: 800000,
    target: 11000000,
  },
  {
    name: "Golden View",
    collected: 9100000,
    outstanding: 2100000,
    overdue: 400000,
    target: 11500000,
  },
  {
    name: "Sunset Heights",
    collected: 4300000,
    outstanding: 5600000,
    overdue: 1800000,
    target: 10000000,
  },
];

const monthlyTrend = [
  { month: "Jan", collected: 15000000, target: 18000000 },
  { month: "Feb", collected: 18000000, target: 20000000 },
  { month: "Mar", collected: 22000000, target: 25000000 },
  { month: "Apr", collected: 28000000, target: 30000000 },
  { month: "May", collected: 24000000, target: 28000000 },
  { month: "Jun", collected: 26000000, target: 32000000 },
];

const feeTypeData = [
  { name: "Infrastructure Fee", value: 75, amount: 42000000, color: "#3b82f6" },
  { name: "Service Charge", value: 20, amount: 8000000, color: "#10b981" },
  { name: "Maintenance Fee", value: 5, amount: 2800000, color: "#f59e0b" },
];

const collectionEfficiency = [
  { project: "Victoria Gardens", efficiency: 85, target: 90 },
  { project: "Emerald Heights", efficiency: 78, target: 85 },
  { project: "Golden View", efficiency: 92, target: 90 },
  { project: "Sunset Heights", efficiency: 65, target: 80 },
];

export function EnhancedMonitoringDashboard() {
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("collection-rate");

  const totalCollected = projectData.reduce(
    (sum, project) => sum + Number(project.collected),
    0
  );
  const totalTarget = projectData.reduce(
    (sum, project) => sum + Number(project.target),
    0
  );
  const totalOutstanding = projectData.reduce(
    (sum, project) => sum + Number(project.outstanding),
    0
  );
  const totalOverdue = projectData.reduce(
    (sum, project) => sum + Number(project.overdue),
    0
  );

  const collectionRate = (totalCollected / totalTarget) * 100;
  const avgEfficiency =
    collectionEfficiency.reduce((sum, item) => sum + item.efficiency, 0) /
    collectionEfficiency.length;

  return (
    <div className="space-y-6">
      {/* Enhanced Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Performance Analytics
          </h2>
          <p className="text-gray-600">
            Comprehensive insights into fee collection performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {collectionRate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500">Collection Rate</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">
                    +2.5% vs target
                  </span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <Progress value={collectionRate} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {avgEfficiency.toFixed(0)}%
                </div>
                <div className="text-sm text-gray-500">Avg Efficiency</div>
                <div className="flex items-center mt-1">
                  <Activity className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">
                    Across all projects
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <Progress value={avgEfficiency} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {formatCurrencyKPI(totalOverdue)}
                </div>
                <div className="text-sm text-gray-500">Overdue Amount</div>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 text-orange-500 mr-1" />
                  <span className="text-xs text-orange-600">
                    Needs attention
                  </span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrencyKPI(totalCollected)}
                </div>
                <div className="text-sm text-gray-500">Total Collected</div>
                <div className="flex items-center mt-1">
                  <DollarSign className="h-3 w-3 text-purple-500 mr-1" />
                  <span className="text-xs text-purple-600">
                    YTD performance
                  </span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collection Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Collection vs Target Trend</span>
              </CardTitle>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collection-rate">
                    Collection Rate
                  </SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="efficiency">Efficiency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => formatCurrencyChart(Number(value), 1)}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stackId="1"
                  stroke="#e5e7eb"
                  fill="#f3f4f6"
                  name="Target"
                />
                <Area
                  type="monotone"
                  dataKey="collected"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="Collected"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5 text-green-600" />
              <span>Fee Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={feeTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {feeTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `${value}%`,
                    formatCurrencyChart(props.payload.amount, 1),
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {feeTypeData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm">{entry.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatCurrencyKPI(entry.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            <span>Project Performance Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={projectData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => formatCurrencyChart(Number(value), 1)}
              />
              <Bar dataKey="target" fill="#e5e7eb" name="Target" />
              <Bar dataKey="collected" fill="#10b981" name="Collected" />
              <Bar dataKey="outstanding" fill="#f59e0b" name="Outstanding" />
              <Bar dataKey="overdue" fill="#ef4444" name="Overdue" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Collection Efficiency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Collection Efficiency by Project</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collectionEfficiency.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{project.project}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Target: {project.target}%
                    </span>
                    <Badge
                      className={
                        project.efficiency >= project.target
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }
                    >
                      {project.efficiency}%
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={project.efficiency} className="h-2" />
                  <div
                    className="absolute top-0 h-2 w-0.5 bg-red-500 opacity-60"
                    style={{ left: `${project.target}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
