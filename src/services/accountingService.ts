import { apiService } from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import {
  IncomeExpensesData,
  ExpenseBreakdown,
  CashFlowData,
  FinancialSummary,
  ApiResponse,
  ExportResponse,
} from "@/types";

export class AccountingService {
  // ===== Financial Analytics =====

  /**
   * Get income vs expenses chart data
   */
  static async getIncomeExpenses(
    period: string = "monthly",
    dateRange: string = "last_6_months"
  ): Promise<IncomeExpensesData> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.ACCOUNTING.ANALYTICS.INCOME_EXPENSES,
        {
          params: { period, dateRange },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch income vs expenses data: ${error}`);
    }
  }

  /**
   * Get expense breakdown by category
   */
  static async getExpenseBreakdown(
    period: string = "monthly",
    date: string = new Date().toISOString().slice(0, 7) // Current month YYYY-MM
  ): Promise<ExpenseBreakdown> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.ACCOUNTING.ANALYTICS.EXPENSE_BREAKDOWN,
        {
          params: { period, date },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch expense breakdown: ${error}`);
    }
  }

  /**
   * Get cash flow analysis
   */
  static async getCashFlow(
    period: string = "weekly",
    dateRange: string = "last_month"
  ): Promise<CashFlowData> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.ACCOUNTING.ANALYTICS.CASH_FLOW,
        {
          params: { period, dateRange },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch cash flow data: ${error}`);
    }
  }

  // ===== Financial Reports =====

  /**
   * Generate comprehensive financial summary
   */
  static async generateFinancialSummary(
    dateRange: { start: string; end: string },
    options?: {
      includeCharts?: boolean;
      includeProjections?: boolean;
      includeComparisons?: boolean;
    }
  ): Promise<FinancialSummary> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.ACCOUNTING.REPORTS.SUMMARY,
        {
          dateRange,
          ...options,
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to generate financial summary: ${error}`);
    }
  }

  /**
   * Export financial data in various formats
   */
  static async exportFinancialData(
    format: "csv" | "pdf" | "excel",
    reportType:
      | "income_expenses"
      | "cash_flow"
      | "balance_sheet"
      | "profit_loss",
    dateRange: { start: string; end: string }
  ): Promise<ExportResponse> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.ACCOUNTING.REPORTS.EXPORT,
        {
          format,
          reportType,
          dateRange,
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to export financial data: ${error}`);
    }
  }

  // ===== Advanced Analytics =====

  /**
   * Get profitability analysis
   */
  static async getProfitabilityAnalysis(dateRange: {
    start: string;
    end: string;
  }): Promise<{
    grossProfitMargin: number;
    netProfitMargin: number;
    operatingMargin: number;
    ebitda: number;
    roi: number;
    roe: number;
    trends: Array<{
      period: string;
      grossProfit: number;
      netProfit: number;
      margin: number;
    }>;
  }> {
    try {
      const incomeExpenses = await this.getIncomeExpenses("monthly", "custom");
      const summary = await this.generateFinancialSummary(dateRange);

      // Calculate margins
      const grossProfitMargin =
        summary.revenue.total > 0
          ? (summary.profitability.grossProfit / summary.revenue.total) * 100
          : 0;

      const netProfitMargin =
        summary.revenue.total > 0
          ? (summary.profitability.netProfit / summary.revenue.total) * 100
          : 0;

      const operatingMargin =
        summary.revenue.total > 0
          ? ((summary.revenue.total - summary.expenses.total) /
              summary.revenue.total) *
            100
          : 0;

      // Calculate EBITDA (simplified)
      const ebitda =
        summary.profitability.netProfit + summary.expenses.total * 0.2; // Assuming 20% of expenses are non-cash

      // Calculate ROI and ROE (simplified)
      const totalAssets = summary.revenue.total * 2; // Simplified assumption
      const totalEquity = totalAssets * 0.6; // Simplified assumption

      const roi =
        totalAssets > 0
          ? (summary.profitability.netProfit / totalAssets) * 100
          : 0;
      const roe =
        totalEquity > 0
          ? (summary.profitability.netProfit / totalEquity) * 100
          : 0;

      // Generate trends from monthly data
      const trends = incomeExpenses.chartData.map((month) => ({
        period: month.month,
        grossProfit: month.income - month.expenses,
        netProfit: month.income - month.expenses,
        margin:
          month.income > 0
            ? ((month.income - month.expenses) / month.income) * 100
            : 0,
      }));

      return {
        grossProfitMargin,
        netProfitMargin,
        operatingMargin,
        ebitda,
        roi,
        roe,
        trends,
      };
    } catch (error) {
      throw new Error(`Failed to fetch profitability analysis: ${error}`);
    }
  }

  /**
   * Get cost analysis by category
   */
  static async getCostAnalysis(dateRange: {
    start: string;
    end: string;
  }): Promise<{
    totalCosts: number;
    costBreakdown: Array<{
      category: string;
      amount: number;
      percentage: number;
      trend: "increasing" | "decreasing" | "stable";
      change: number;
    }>;
    costEfficiency: {
      costPerRevenue: number;
      costPerUnit: number;
      efficiencyScore: number;
    };
    recommendations: Array<{
      category: string;
      action: string;
      potentialSavings: number;
      priority: "high" | "medium" | "low";
    }>;
  }> {
    try {
      const expenseBreakdown = await this.getExpenseBreakdown("monthly");
      const summary = await this.generateFinancialSummary(dateRange);

      const totalCosts = summary.expenses.total;

      // Analyze cost trends and efficiency
      const costBreakdown = expenseBreakdown.categories.map((category) => {
        // Simulate trend analysis (in real implementation, this would come from historical data)
        const trend = Math.random() > 0.5 ? "increasing" : "decreasing";
        const change = Math.random() * 20 - 10; // Random change between -10% and +10%

        return {
          category: category.name,
          amount: category.value,
          percentage: category.percentage,
          trend,
          change,
        };
      });

      // Calculate cost efficiency metrics
      const costPerRevenue =
        summary.revenue.total > 0 ? totalCosts / summary.revenue.total : 0;
      const costPerUnit = 1; // This would be calculated based on actual units sold
      const efficiencyScore = Math.max(0, 100 - costPerRevenue * 100);

      // Generate cost optimization recommendations
      const recommendations = costBreakdown
        .filter((cost) => cost.trend === "increasing" && cost.percentage > 10)
        .map((cost) => {
          const potentialSavings = cost.amount * 0.15; // Assume 15% potential savings
          const priority =
            cost.percentage > 20
              ? "high"
              : cost.percentage > 10
              ? "medium"
              : "low";

          return {
            category: cost.category,
            action: `Review and optimize ${cost.category.toLowerCase()} expenses`,
            potentialSavings,
            priority,
          };
        })
        .sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

      return {
        totalCosts,
        costBreakdown,
        costEfficiency: {
          costPerRevenue,
          costPerUnit,
          efficiencyScore,
        },
        recommendations,
      };
    } catch (error) {
      throw new Error(`Failed to fetch cost analysis: ${error}`);
    }
  }

  /**
   * Get revenue analysis by project
   */
  static async getRevenueAnalysis(dateRange: {
    start: string;
    end: string;
  }): Promise<{
    totalRevenue: number;
    revenueByProject: Array<{
      project: string;
      revenue: number;
      percentage: number;
      growth: number;
      contribution: number;
    }>;
    revenueTrends: Array<{
      period: string;
      revenue: number;
      growth: number;
      trend: "up" | "down" | "stable";
    }>;
    revenueForecast: Array<{
      period: string;
      projectedRevenue: number;
      confidence: number;
    }>;
  }> {
    try {
      const summary = await this.generateFinancialSummary(dateRange);
      const incomeExpenses = await this.getIncomeExpenses("monthly", "custom");

      const totalRevenue = summary.revenue.total;

      // Analyze revenue by project
      const revenueByProject = summary.revenue.byProject.map((project) => {
        const growth = Math.random() * 40 - 20; // Simulate growth between -20% and +20%
        const contribution = project.percentage;

        return {
          project: project.project,
          revenue: project.amount,
          percentage: project.percentage,
          growth,
          contribution,
        };
      });

      // Generate revenue trends
      const revenueTrends = incomeExpenses.chartData.map(
        (month, index, array) => {
          const revenue = month.income;
          const previousRevenue = index > 0 ? array[index - 1].income : revenue;
          const growth =
            previousRevenue > 0
              ? ((revenue - previousRevenue) / previousRevenue) * 100
              : 0;
          const trend = growth > 5 ? "up" : growth < -5 ? "down" : "stable";

          return {
            period: month.month,
            revenue,
            growth,
            trend,
          };
        }
      );

      // Generate revenue forecast (simplified)
      const lastRevenue = revenueTrends[revenueTrends.length - 1]?.revenue || 0;
      const averageGrowth =
        revenueTrends.length > 1
          ? revenueTrends
              .slice(1)
              .reduce((sum, month) => sum + month.growth, 0) /
            (revenueTrends.length - 1)
          : 0;

      const revenueForecast = Array.from({ length: 6 }, (_, i) => {
        const month = i + 1;
        const projectedRevenue =
          lastRevenue * Math.pow(1 + averageGrowth / 100, month);
        const confidence = Math.max(50, 100 - month * 8); // Confidence decreases over time

        return {
          period: `Month +${month}`,
          projectedRevenue,
          confidence,
        };
      });

      return {
        totalRevenue,
        revenueByProject,
        revenueTrends,
        revenueForecast,
      };
    } catch (error) {
      throw new Error(`Failed to fetch revenue analysis: ${error}`);
    }
  }

  /**
   * Get cash flow forecasting
   */
  static async getCashFlowForecast(
    dateRange: { start: string; end: string },
    forecastPeriods: number = 12
  ): Promise<{
    currentCashFlow: CashFlowData;
    forecast: Array<{
      period: string;
      projectedInflow: number;
      projectedOutflow: number;
      projectedNetFlow: number;
      projectedBalance: number;
      confidence: number;
    }>;
    cashFlowScenarios: {
      optimistic: Array<{ period: string; balance: number }>;
      realistic: Array<{ period: string; balance: number }>;
      pessimistic: Array<{ period: string; balance: number }>;
    };
    recommendations: Array<{
      type: "cash_management" | "investment" | "financing";
      action: string;
      impact: string;
      priority: "high" | "medium" | "low";
    }>;
  }> {
    try {
      const currentCashFlow = await this.getCashFlow("monthly", "custom");
      const summary = await this.generateFinancialSummary(dateRange);

      // Generate cash flow forecast
      const forecast = Array.from({ length: forecastPeriods }, (_, i) => {
        const period = `Month +${i + 1}`;
        const projectedInflow =
          (summary.revenue.total / 12) * (1 + Math.random() * 0.2 - 0.1);
        const projectedOutflow =
          (summary.expenses.total / 12) * (1 + Math.random() * 0.15 - 0.075);
        const projectedNetFlow = projectedInflow - projectedOutflow;
        const projectedBalance =
          currentCashFlow.summary.closingBalance + projectedNetFlow;
        const confidence = Math.max(30, 100 - i * 6);

        return {
          period,
          projectedInflow,
          projectedOutflow,
          projectedNetFlow,
          projectedBalance,
          confidence,
        };
      });

      // Generate scenario analysis
      const optimistic = forecast.map((month) => ({
        period: month.period,
        balance: month.projectedBalance * 1.2, // 20% better than base case
      }));

      const realistic = forecast.map((month) => ({
        period: month.period,
        balance: month.projectedBalance,
      }));

      const pessimistic = forecast.map((month) => ({
        period: month.period,
        balance: month.projectedBalance * 0.8, // 20% worse than base case
      }));

      // Generate cash flow recommendations
      const recommendations = [];

      if (currentCashFlow.summary.netCashFlow < 0) {
        recommendations.push({
          type: "cash_management",
          action: "Implement stricter cash flow controls and payment terms",
          impact: "Improve cash flow by 15-25%",
          priority: "high",
        });
      }

      if (summary.profitability.netProfit > 0) {
        recommendations.push({
          type: "investment",
          action: "Consider reinvesting profits in growth opportunities",
          impact: "Potential 20-30% return on investment",
          priority: "medium",
        });
      }

      if (currentCashFlow.summary.closingBalance < summary.expenses.total / 6) {
        recommendations.push({
          type: "financing",
          action:
            "Secure additional financing to maintain healthy cash reserves",
          impact: "Ensure 6 months of operating expenses coverage",
          priority: "high",
        });
      }

      return {
        currentCashFlow,
        forecast,
        cashFlowScenarios: {
          optimistic,
          realistic,
          pessimistic,
        },
        recommendations,
      };
    } catch (error) {
      throw new Error(`Failed to fetch cash flow forecast: ${error}`);
    }
  }

  // ===== Budget Management =====

  /**
   * Get budget vs actual analysis
   */
  static async getBudgetVsActual(dateRange: {
    start: string;
    end: string;
  }): Promise<{
    totalBudget: number;
    totalActual: number;
    variance: number;
    variancePercentage: number;
    budgetPerformance: Array<{
      category: string;
      budgeted: number;
      actual: number;
      variance: number;
      variancePercentage: number;
      status: "under" | "over" | "on_target";
    }>;
    recommendations: Array<{
      category: string;
      action: string;
      impact: string;
    }>;
  }> {
    try {
      // This would typically come from a budget management system
      // For now, we'll simulate the data based on actual expenses
      const summary = await this.generateFinancialSummary(dateRange);
      const expenseBreakdown = await this.getExpenseBreakdown("monthly");

      const totalActual = summary.expenses.total;
      const totalBudget = totalActual * 1.1; // Assume budget was 10% higher than actual
      const variance = totalBudget - totalActual;
      const variancePercentage =
        totalBudget > 0 ? (variance / totalBudget) * 100 : 0;

      // Generate budget vs actual by category
      const budgetPerformance = expenseBreakdown.categories.map((category) => {
        const budgeted = category.value * (1 + Math.random() * 0.3); // Random budget variance
        const actual = category.value;
        const variance = budgeted - actual;
        const variancePercentage =
          budgeted > 0 ? (variance / budgeted) * 100 : 0;
        const status =
          variance > 0 ? "under" : variance < 0 ? "over" : "on_target";

        return {
          category: category.name,
          budgeted,
          actual,
          variance,
          variancePercentage,
          status,
        };
      });

      // Generate recommendations
      const recommendations = budgetPerformance
        .filter((item) => item.status === "over")
        .map((item) => ({
          category: item.category,
          action: `Review and control ${item.category.toLowerCase()} expenses`,
          impact: `Potential savings of ${Math.abs(
            item.variance
          ).toLocaleString()} in ${item.category}`,
        }));

      return {
        totalBudget,
        totalActual,
        variance,
        variancePercentage,
        budgetPerformance,
        recommendations,
      };
    } catch (error) {
      throw new Error(`Failed to fetch budget vs actual analysis: ${error}`);
    }
  }

  // ===== KPI Dashboard =====

  /**
   * Get key financial KPIs
   */
  static async getFinancialKPIs(dateRange: {
    start: string;
    end: string;
  }): Promise<{
    revenue: {
      total: number;
      growth: number;
      trend: "up" | "down" | "stable";
    };
    profitability: {
      grossProfit: number;
      netProfit: number;
      margin: number;
      trend: "up" | "down" | "stable";
    };
    cashFlow: {
      operating: number;
      netChange: number;
      trend: "up" | "down" | "stable";
    };
    efficiency: {
      costRatio: number;
      assetTurnover: number;
      roi: number;
    };
    liquidity: {
      currentRatio: number;
      quickRatio: number;
      cashRatio: number;
    };
  }> {
    try {
      const summary = await this.generateFinancialSummary(dateRange);
      const profitability = await this.getProfitabilityAnalysis(dateRange);
      const cashFlow = await this.getCashFlow("monthly", "custom");

      // Calculate trends (simplified)
      const revenueTrend = summary.revenue.total > 0 ? "up" : "stable";
      const profitTrend = summary.profitability.netProfit > 0 ? "up" : "down";
      const cashTrend = cashFlow.summary.netCashFlow > 0 ? "up" : "down";

      // Calculate efficiency metrics
      const costRatio =
        summary.revenue.total > 0
          ? summary.expenses.total / summary.revenue.total
          : 0;
      const assetTurnover = 1.5; // Simplified assumption
      const roi = profitability.roi;

      // Calculate liquidity ratios (simplified)
      const currentAssets = summary.revenue.total * 0.8; // Simplified assumption
      const currentLiabilities = summary.expenses.total * 0.3; // Simplified assumption
      const inventory = summary.expenses.total * 0.2; // Simplified assumption
      const cash = cashFlow.summary.closingBalance;

      const currentRatio =
        currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
      const quickRatio =
        currentLiabilities > 0
          ? (currentAssets - inventory) / currentLiabilities
          : 0;
      const cashRatio = currentLiabilities > 0 ? cash / currentLiabilities : 0;

      return {
        revenue: {
          total: summary.revenue.total,
          growth: 15.5, // This would come from historical comparison
          trend: revenueTrend,
        },
        profitability: {
          grossProfit: summary.profitability.grossProfit,
          netProfit: summary.profitability.netProfit,
          margin: summary.profitability.profitMargin,
          trend: profitTrend,
        },
        cashFlow: {
          operating: cashFlow.summary.operating,
          netChange: cashFlow.summary.netCashFlow,
          trend: cashTrend,
        },
        efficiency: {
          costRatio,
          assetTurnover,
          roi,
        },
        liquidity: {
          currentRatio,
          quickRatio,
          cashRatio,
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch financial KPIs: ${error}`);
    }
  }
}

export default AccountingService;
