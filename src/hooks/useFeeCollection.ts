import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  feeCollectionService,
  Fee,
  FeeType,
  Payment,
  CollectionSummary,
  ProjectPerformance,
  OverdueReport,
  ApiResponse,
  PaginatedResponse,
} from "@/services/feeCollectionService";

interface UseFeesOptions {
  page?: number;
  limit?: number;
  status?: string;
  projectId?: string;
  clientId?: string;
  search?: string;
}

interface UseFeeTypesOptions {
  page?: number;
  limit?: number;
  isActive?: boolean;
  projectId?: string;
  frequency?: string;
  search?: string;
}

interface UsePaymentsOptions {
  page?: number;
  limit?: number;
  status?: string;
  feeId?: string;
  clientId?: string;
  paymentMethod?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const useFees = (options: UseFeesOptions = {}) => {
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  // Use ref to store latest options to avoid dependency loops
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const fetchFees = useCallback(
    async (newOptions: UseFeesOptions = {}) => {
      const maxRetries = 3;
      let retryCount = 0;

      const attemptFetch = async (): Promise<void> => {
        try {
          setLoading(true);
          setError(null);

          // Add loading timeout to prevent infinite loading
          const loadingTimeout = setTimeout(() => {
            console.warn(
              "Fee fetch loading timeout - forcing loading to false"
            );
            setLoading(false);
          }, 30000); // 30 seconds timeout

          const mergedOptions = { ...optionsRef.current, ...newOptions };
          const response = await feeCollectionService.fees.getAll(
            mergedOptions
          );

          // Clear timeout on success
          clearTimeout(loadingTimeout);

          if (response.success) {
            setFees(response.data.data);
            setPagination(response.data.pagination);
          } else {
            setError(response.message || "Failed to fetch fees");
            toast.error(response.message || "Failed to fetch fees");
          }
        } catch (error) {
          retryCount++;
          if (retryCount < maxRetries) {
            console.log(`Retrying fee fetch (${retryCount}/${maxRetries})`);
            // Wait before retrying
            await new Promise((resolve) =>
              setTimeout(resolve, 1000 * retryCount)
            );
            return attemptFetch();
          }

          const errorMessage = feeCollectionService.handleError(error);
          setError(errorMessage);
          toast.error(errorMessage);
        } finally {
          setLoading(false);
        }
      };

      await attemptFetch();
    },
    [] // No dependencies to avoid infinite loops
  );

  const createFee = useCallback(
    async (feeData: Partial<Fee>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await feeCollectionService.fees.create(feeData);

        if (response.success) {
          toast.success("Fee created successfully");
          await fetchFees(); // Refresh the list
          return response.data;
        } else {
          setError(response.message || "Failed to create fee");
          toast.error(response.message || "Failed to create fee");
          return null;
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchFees]
  );

  const updateFee = useCallback(
    async (id: string, updateData: Partial<Fee>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await feeCollectionService.fees.update(id, updateData);

        if (response.success) {
          toast.success("Fee updated successfully");
          await fetchFees(); // Refresh the list
          return response.data;
        } else {
          setError(response.message || "Failed to update fee");
          toast.error(response.message || "Failed to update fee");
          return null;
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchFees]
  );

  const deleteFee = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await feeCollectionService.fees.delete(id);

        if (response.success) {
          toast.success("Fee deleted successfully");
          await fetchFees(); // Refresh the list
          return true;
        } else {
          setError(response.message || "Failed to delete fee");
          toast.error(response.message || "Failed to delete fee");
          return false;
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchFees]
  );

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  return {
    fees,
    loading,
    error,
    pagination,
    fetchFees,
    createFee,
    updateFee,
    deleteFee,
    refetch: () => fetchFees(),
  };
};

export const useFeeTypes = (options: UseFeeTypesOptions = {}) => {
  const [feeTypes, setFeeTypes] = useState<FeeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  // Use ref to store latest options to avoid dependency loops
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const fetchFeeTypes = useCallback(
    async (newOptions: UseFeeTypesOptions = {}) => {
      try {
        setLoading(true);
        setError(null);

        // Add loading timeout to prevent infinite loading
        const loadingTimeout = setTimeout(() => {
          console.warn(
            "Fee types fetch loading timeout - forcing loading to false"
          );
          setLoading(false);
        }, 30000); // 30 seconds timeout

        const mergedOptions = { ...optionsRef.current, ...newOptions };

        const response = await feeCollectionService.feeTypes.getAll(
          mergedOptions
        );

        // Clear timeout on success
        clearTimeout(loadingTimeout);

        if (response.success) {
          setFeeTypes(response.data.data);
          setPagination(response.data.pagination);
        } else {
          setError(response.message || "Failed to fetch fee types");
          toast.error(response.message || "Failed to fetch fee types");
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [] // No dependencies to avoid infinite loops
  );

  const createFeeType = useCallback(
    async (feeTypeData: Partial<FeeType>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await feeCollectionService.feeTypes.create(
          feeTypeData
        );

        if (response.success) {
          toast.success("Fee type created successfully");
          await fetchFeeTypes(); // Refresh the list
          return response.data;
        } else {
          setError(response.message || "Failed to create fee type");
          toast.error(response.message || "Failed to create fee type");
          return null;
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchFeeTypes]
  );

  const updateFeeType = useCallback(
    async (id: string, updateData: Partial<FeeType>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await feeCollectionService.feeTypes.update(
          id,
          updateData
        );

        if (response.success) {
          toast.success("Fee type updated successfully");
          await fetchFeeTypes(); // Refresh the list
          return response.data;
        } else {
          setError(response.message || "Failed to update fee type");
          toast.error(response.message || "Failed to update fee type");
          return null;
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchFeeTypes]
  );

  useEffect(() => {
    fetchFeeTypes();
  }, [fetchFeeTypes]);

  return {
    feeTypes,
    loading,
    error,
    pagination,
    fetchFeeTypes,
    createFeeType,
    updateFeeType,
    refetch: () => fetchFeeTypes(),
  };
};

export const usePayments = (options: UsePaymentsOptions = {}) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  // Use ref to store latest options to avoid dependency loops
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const fetchPayments = useCallback(
    async (newOptions: UsePaymentsOptions = {}) => {
      try {
        setLoading(true);
        setError(null);

        // Add loading timeout to prevent infinite loading
        const loadingTimeout = setTimeout(() => {
          console.warn(
            "Payments fetch loading timeout - forcing loading to false"
          );
          setLoading(false);
        }, 30000); // 30 seconds timeout

        const mergedOptions = { ...optionsRef.current, ...newOptions };
        const response = await feeCollectionService.payments.getAll(
          mergedOptions
        );

        // Clear timeout on success
        clearTimeout(loadingTimeout);

        if (response.success) {
          setPayments(response.data.data);
          setPagination(response.data.pagination);
        } else {
          setError(response.message || "Failed to fetch payments");
          toast.error(response.message || "Failed to fetch payments");
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [] // No dependencies to avoid infinite loops
  );

  const recordPayment = useCallback(
    async (paymentData: Partial<Payment>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await feeCollectionService.payments.record(
          paymentData
        );

        if (response.success) {
          toast.success("Payment recorded successfully");
          await fetchPayments(); // Refresh the list
          return response.data;
        } else {
          setError(response.message || "Failed to record payment");
          toast.error(response.message || "Failed to record payment");
          return null;
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchPayments]
  );

  const updatePaymentStatus = useCallback(
    async (paymentId: string, status: string, notes?: string) => {
      try {
        setLoading(true);
        setError(null);

        const response = await feeCollectionService.payments.updateStatus(
          paymentId,
          status,
          notes
        );

        if (response.success) {
          toast.success("Payment status updated successfully");
          await fetchPayments(); // Refresh the list
          return response.data;
        } else {
          setError(response.message || "Failed to update payment status");
          toast.error(response.message || "Failed to update payment status");
          return null;
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchPayments]
  );

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    loading,
    error,
    pagination,
    fetchPayments,
    recordPayment,
    updatePaymentStatus,
    refetch: () => fetchPayments(),
  };
};

export const useAnalytics = () => {
  const [collectionSummary, setCollectionSummary] =
    useState<CollectionSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollectionSummary = useCallback(
    async (
      filters: {
        dateFrom?: string;
        dateTo?: string;
        projectId?: string;
        clientId?: string;
      } = {}
    ) => {
      try {
        setLoading(true);
        setError(null);

        // Add loading timeout to prevent infinite loading
        const loadingTimeout = setTimeout(() => {
          console.warn(
            "Analytics fetch loading timeout - forcing loading to false"
          );
          setLoading(false);
        }, 30000); // 30 seconds timeout

        const response =
          await feeCollectionService.analytics.getCollectionSummary(filters);

        // Clear timeout on success
        clearTimeout(loadingTimeout);

        if (response.success) {
          setCollectionSummary(response.data);
        } else {
          setError(response.message || "Failed to fetch collection summary");
          toast.error(response.message || "Failed to fetch collection summary");
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchProjectPerformance = useCallback(
    async (
      projectId: string,
      period: "daily" | "weekly" | "monthly" | "yearly" = "monthly"
    ) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await feeCollectionService.analytics.getProjectPerformance(
            projectId,
            period
          );

        if (response.success) {
          return response.data;
        } else {
          setError(response.message || "Failed to fetch project performance");
          toast.error(
            response.message || "Failed to fetch project performance"
          );
          return null;
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchOverdueReport = useCallback(
    async (
      filters: {
        daysOverdue?: number;
        projectId?: string;
        clientId?: string;
        limit?: number;
      } = {}
    ) => {
      try {
        setLoading(true);
        setError(null);

        const response = await feeCollectionService.analytics.getOverdueReport(
          filters
        );

        if (response.success) {
          return response.data;
        } else {
          setError(response.message || "Failed to fetch overdue report");
          toast.error(response.message || "Failed to fetch overdue report");
          return null;
        }
      } catch (error) {
        const errorMessage = feeCollectionService.handleError(error);
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    collectionSummary,
    loading,
    error,
    fetchCollectionSummary,
    fetchProjectPerformance,
    fetchOverdueReport,
    refetch: () => fetchCollectionSummary(),
  };
};
