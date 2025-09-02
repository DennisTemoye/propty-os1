import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  IncomeExpensesData,
  ExpenseBreakdown,
  CashFlowData,
  FinancialSummary,
  ExportResponse,
} from "@/types";
import AccountingService from "@/services/accountingService";

export interface UseAccountingReturn {
  loading: boolean;
  error: string | null;
  incomeExpenses: IncomeExpensesData | null;
  expenseBreakdown: ExpenseBreakdown | null;
  cashFlow: CashFlowData | null;
  financialSummary: FinancialSummary | null;
  filters: {
    period?: string;
    dateRange?: string;
    startDate?: string;
    endDate?: string;
  };
  setFilters: (filters: Partial<UseAccountingReturn["filters"]>) => void;
  fetchIncomeExpenses: (period: string, dateRange: string) => Promise<void>;
  fetchExpenseBreakdown: (period: string, date: string) => Promise<void>;
  fetchCashFlow: (period: string, dateRange: string) => Promise<void>;
  generateFinancialSummary: (
    dateRange: { start: string; end: string },
    options?: any
  ) => Promise<void>;
  exportFinancialData: (
    format: "csv" | "pdf" | "excel",
    reportType:
      | "income_expenses"
      | "cash_flow"
      | "balance_sheet"
      | "profit_loss",
    dateRange: { start: string; end: string }
  ) => Promise<ExportResponse>;
  getProfitabilityAnalysis: (dateRange: {
    start: string;
    end: string;
  }) => Promise<any>;
  getCostAnalysis: (dateRange: { start: string; end: string }) => Promise<any>;
  getRevenueAnalysis: (dateRange: {
    start: string;
    end: string;
  }) => Promise<any>;
  getCashFlowForecast: (
    dateRange: { start: string; end: string },
    forecastPeriods: number
  ) => Promise<any>;
  getBudgetVsActual: (dateRange: {
    start: string;
    end: string;
  }) => Promise<any>;
  getFinancialKPIs: (dateRange: { start: string; end: string }) => Promise<any>;
  clearError: () => void;
  resetFilters: () => void;
}

export function useAccounting(): UseAccountingReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [incomeExpenses, setIncomeExpenses] =
    useState<IncomeExpensesData | null>(null);
  const [expenseBreakdown, setExpenseBreakdown] =
    useState<ExpenseBreakdown | null>(null);
  const [cashFlow, setCashFlow] = useState<CashFlowData | null>(null);
  const [financialSummary, setFinancialSummary] =
    useState<FinancialSummary | null>(null);
  const [filters, setFilters] = useState<UseAccountingReturn["filters"]>({});

  const fetchIncomeExpenses = useCallback(
    async (period: string, dateRange: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await AccountingService.getIncomeExpenses(
          period,
          dateRange
        );
        setIncomeExpenses(response);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch income vs expenses data";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchExpenseBreakdown = useCallback(
    async (period: string, date: string) => {
      try {
        setError(null);

        const response = await AccountingService.getExpenseBreakdown(
          period,
          date
        );
        setExpenseBreakdown(response);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch expense breakdown";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const fetchCashFlow = useCallback(
    async (period: string, dateRange: string) => {
      try {
        setError(null);

        const response = await AccountingService.getCashFlow(period, dateRange);
        setCashFlow(response);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch cash flow data";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const generateFinancialSummary = useCallback(
    async (dateRange: { start: string; end: string }, options?: any) => {
      try {
        setLoading(true);
        setError(null);

        const response = await AccountingService.generateFinancialSummary(
          dateRange,
          options
        );
        setFinancialSummary(response);
        toast.success("Financial summary generated successfully");
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to generate financial summary";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const exportFinancialData = useCallback(
    async (
      format: "csv" | "pdf" | "excel",
      reportType:
        | "income_expenses"
        | "cash_flow"
        | "balance_sheet"
        | "profit_loss",
      dateRange: { start: string; end: string }
    ) => {
      try {
        setError(null);

        const response = await AccountingService.exportFinancialData(
          format,
          reportType,
          dateRange
        );
        toast.success("Financial data exported successfully");
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to export financial data";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const getProfitabilityAnalysis = useCallback(
    async (dateRange: { start: string; end: string }) => {
      try {
        setError(null);

        const analysis = await AccountingService.getProfitabilityAnalysis(
          dateRange
        );
        return analysis;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch profitability analysis";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const getCostAnalysis = useCallback(
    async (dateRange: { start: string; end: string }) => {
      try {
        setError(null);

        const analysis = await AccountingService.getCostAnalysis(dateRange);
        return analysis;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message || "Failed to fetch cost analysis";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const getRevenueAnalysis = useCallback(
    async (dateRange: { start: string; end: string }) => {
      try {
        setError(null);

        const analysis = await AccountingService.getRevenueAnalysis(dateRange);
        return analysis;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch revenue analysis";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const getCashFlowForecast = useCallback(
    async (
      dateRange: { start: string; end: string },
      forecastPeriods: number
    ) => {
      try {
        setError(null);

        const forecast = await AccountingService.getCashFlowForecast(
          dateRange,
          forecastPeriods
        );
        return forecast;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch cash flow forecast";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const getBudgetVsActual = useCallback(
    async (dateRange: { start: string; end: string }) => {
      try {
        setError(null);

        const comparison = await AccountingService.getBudgetVsActual(dateRange);
        return comparison;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch budget vs actual comparison";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const getFinancialKPIs = useCallback(
    async (dateRange: { start: string; end: string }) => {
      try {
        setError(null);

        const kpis = await AccountingService.getFinancialKPIs(dateRange);
        return kpis;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error?.message ||
          "Failed to fetch financial KPIs";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Initial data fetch with default filters
  useEffect(() => {
    if (filters.period && filters.dateRange) {
      fetchIncomeExpenses(filters.period, filters.dateRange);
    }
  }, [filters.period, filters.dateRange, fetchIncomeExpenses]);

  return {
    loading,
    error,
    incomeExpenses,
    expenseBreakdown,
    cashFlow,
    financialSummary,
    filters,
    setFilters,
    fetchIncomeExpenses,
    fetchExpenseBreakdown,
    fetchCashFlow,
    generateFinancialSummary,
    exportFinancialData,
    getProfitabilityAnalysis,
    getCostAnalysis,
    getRevenueAnalysis,
    getCashFlowForecast,
    getBudgetVsActual,
    getFinancialKPIs,
    clearError,
    resetFilters,
  };
}
