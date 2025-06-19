
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const monthlyData = [
  { month: 'Jan', income: 15200000, expenses: 3400000 },
  { month: 'Feb', income: 18500000, expenses: 4200000 },
  { month: 'Mar', income: 22100000, expenses: 5100000 },
  { month: 'Apr', income: 19800000, expenses: 4800000 },
  { month: 'May', income: 25400000, expenses: 6200000 },
  { month: 'Jun', income: 28900000, expenses: 7100000 },
];

const expenseCategories = [
  { name: 'Marketing & Advertising', value: 8500000, color: '#8b5cf6' },
  { name: 'Legal & Registration', value: 4200000, color: '#06b6d4' },
  { name: 'Office Supplies', value: 2100000, color: '#10b981' },
  { name: 'Utilities', value: 3200000, color: '#f59e0b' },
  { name: 'Professional Services', value: 5800000, color: '#ef4444' },
  { name: 'Other Admin Costs', value: 6700000, color: '#6366f1' },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "#10b981",
  },
  expenses: {
    label: "Expenses",
    color: "#ef4444",
  },
};

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Income vs Expense Chart */}
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Income vs Expenses (Monthly)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => [`₦${(value / 1000000).toFixed(2)}M`, '']}
                />
                <Bar dataKey="income" fill="var(--color-income)" name="Income" />
                <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip 
                formatter={(value: number) => [`₦${(value / 1000000).toFixed(2)}M`, 'Amount']}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Net Profit Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Net Profit Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
              <ChartTooltip 
                formatter={(value: number) => [`₦${(value / 1000000).toFixed(2)}M`, 'Net Profit']}
              />
              <Line 
                type="monotone" 
                dataKey={(data) => data.income - data.expenses}
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="Net Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
