import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  Document,
  DocumentCategory,
  DocumentSearchQuery,
  PaginatedResponse,
  ExportResponse,
} from "@/types";
import DocumentService from "@/services/documentService";

export interface UseDocumentsReturn {
  // State
  loading: boolean;
  error: string | null;

  // Data
  documents: Document[];
  categories: DocumentCategory[];
  storageStats: {
    totalDocuments: number;
    totalSize: string;
    documentsByCategory: Array<{
      category: string;
      count: number;
      size: string;
      percentage: number;
    }>;
    documentsByType: Array<{
      fileType: string;
      count: number;
      size: string;
      percentage: number;
    }>;
    storageTrend: Array<{
      month: string;
      documentsAdded: number;
      storageUsed: string;
    }>;
  } | null;
  usageAnalytics: {
    totalUploads: number;
    totalDownloads: number;
    averageUploadsPerDay: number;
    averageDownloadsPerDay: number;
    mostDownloadedDocuments: Array<{
      document: Document;
      downloadCount: number;
    }>;
    uploadTrend: Array<{
      date: string;
      uploads: number;
    }>;
    downloadTrend: Array<{
      date: string;
      downloads: number;
    }>;
  } | null;

  // Filters
  filters: {
    category?: string;
    linkedTo?: string;
    linkedId?: string;
    search?: string;
    fileType?: string;
    uploadedBy?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  setFilters: (filters: Partial<UseDocumentsReturn["filters"]>) => void;

  // Actions
  fetchDocuments: (filters?: any) => Promise<void>;
  uploadDocument: (
    file: File,
    metadata: {
      title: string;
      category: string;
      linkedTo: "client" | "project";
      linkedId: string;
      linkedName: string;
      tags?: string[];
      description?: string;
    }
  ) => Promise<Document>;
  downloadDocument: (documentId: string) => Promise<void>;
  updateDocumentMetadata: (
    documentId: string,
    updates: Partial<Document>
  ) => Promise<Document>;
  deleteDocument: (documentId: string) => Promise<void>;

  // Search & Categories
  searchDocuments: (searchQuery: DocumentSearchQuery) => Promise<void>;
  fullTextSearch: (
    query: string,
    filters?: {
      category?: string;
      linkedTo?: string;
      fileType?: string;
      dateRange?: {
        start: string;
        end: string;
      };
    }
  ) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createCategory: (
    categoryData: Partial<DocumentCategory>
  ) => Promise<DocumentCategory>;
  updateCategory: (
    categoryId: string,
    updates: Partial<DocumentCategory>
  ) => Promise<DocumentCategory>;
  deleteCategory: (categoryId: string) => Promise<void>;

  // Analytics
  fetchStorageStats: () => Promise<void>;
  fetchUsageAnalytics: (dateRange?: {
    start: string;
    end: string;
  }) => Promise<void>;

  // Bulk Operations
  bulkDeleteDocuments: (documentIds: string[]) => Promise<void>;
  bulkUpdateMetadata: (
    documentIds: string[],
    updates: Partial<Document>
  ) => Promise<Document[]>;
  exportDocumentsList: (
    format: "csv" | "pdf" | "excel",
    filters?: any
  ) => Promise<ExportResponse>;

  // Utilities
  clearError: () => void;
  resetFilters: () => void;
}

export function useDocuments(): UseDocumentsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [storageStats, setStorageStats] =
    useState<UseDocumentsReturn["storageStats"]>(null);
  const [usageAnalytics, setUsageAnalytics] =
    useState<UseDocumentsReturn["usageAnalytics"]>(null);

  const [filters, setFilters] = useState<UseDocumentsReturn["filters"]>({});

  // ===== Document Operations =====

  const fetchDocuments = useCallback(
    async (additionalFilters?: any) => {
      try {
        setLoading(true);
        setError(null);

        const allFilters = { ...filters, ...additionalFilters };
        const response = await DocumentService.getDocuments(allFilters);
        setDocuments(response.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch documents";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const uploadDocument = useCallback(
    async (
      file: File,
      metadata: {
        title: string;
        category: string;
        linkedTo: "client" | "project";
        linkedId: string;
        linkedName: string;
        tags?: string[];
        description?: string;
      }
    ): Promise<Document> => {
      try {
        setLoading(true);
        setError(null);

        const newDocument = await DocumentService.uploadDocument(
          file,
          metadata
        );
        setDocuments((prev) => [...prev, newDocument]);
        toast.success("Document uploaded successfully");
        return newDocument;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to upload document";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const downloadDocument = useCallback(
    async (documentId: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const blob = await DocumentService.downloadDocument(documentId);

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Find the document to get the filename
        const docItem = documents.find((doc) => doc.id === documentId);
        link.download = docItem?.fileName || "document";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success("Document download started");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to download document";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [documents]
  );

  const updateDocumentMetadata = useCallback(
    async (
      documentId: string,
      updates: Partial<Document>
    ): Promise<Document> => {
      try {
        setLoading(true);
        setError(null);

        const updatedDocument = await DocumentService.updateDocumentMetadata(
          documentId,
          updates
        );
        setDocuments((prev) =>
          prev.map((doc) => (doc.id === documentId ? updatedDocument : doc))
        );
        toast.success("Document metadata updated successfully");
        return updatedDocument;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to update document metadata";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteDocument = useCallback(
    async (documentId: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        await DocumentService.deleteDocument(documentId);
        setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
        toast.success("Document deleted successfully");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete document";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ===== Search & Categories =====

  const searchDocuments = useCallback(
    async (searchQuery: DocumentSearchQuery): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const response = await DocumentService.searchDocuments(searchQuery);
        setDocuments(response.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to search documents";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fullTextSearch = useCallback(
    async (
      query: string,
      additionalFilters?: {
        category?: string;
        linkedTo?: string;
        fileType?: string;
        dateRange?: {
          start: string;
          end: string;
        };
      }
    ): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const results = await DocumentService.fullTextSearch(
          query,
          additionalFilters
        );
        setDocuments(results);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to perform full-text search";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchCategories = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const documentCategories = await DocumentService.getDocumentCategories();
      setCategories(documentCategories);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch document categories";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(
    async (
      categoryData: Partial<DocumentCategory>
    ): Promise<DocumentCategory> => {
      try {
        setLoading(true);
        setError(null);

        const newCategory = await DocumentService.createDocumentCategory(
          categoryData
        );
        setCategories((prev) => [...prev, newCategory]);
        toast.success("Document category created successfully");
        return newCategory;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to create document category";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateCategory = useCallback(
    async (
      categoryId: string,
      updates: Partial<DocumentCategory>
    ): Promise<DocumentCategory> => {
      try {
        setLoading(true);
        setError(null);

        const updatedCategory = await DocumentService.updateDocumentCategory(
          categoryId,
          updates
        );
        setCategories((prev) =>
          prev.map((category) =>
            category.id === categoryId ? updatedCategory : category
          )
        );
        toast.success("Document category updated successfully");
        return updatedCategory;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to update document category";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteCategory = useCallback(
    async (categoryId: string): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        await DocumentService.deleteDocumentCategory(categoryId);
        setCategories((prev) =>
          prev.filter((category) => category.id !== categoryId)
        );
        toast.success("Document category deleted successfully");
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to delete document category";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ===== Analytics =====

  const fetchStorageStats = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const stats = await DocumentService.getDocumentStorageStats();
      setStorageStats(stats);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch storage statistics";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsageAnalytics = useCallback(
    async (dateRange?: { start: string; end: string }): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const analytics = await DocumentService.getDocumentUsageAnalytics(
          dateRange
        );
        setUsageAnalytics(analytics);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch usage analytics";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ===== Bulk Operations =====

  const bulkDeleteDocuments = useCallback(
    async (documentIds: string[]): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        await DocumentService.bulkDeleteDocuments(documentIds);
        setDocuments((prev) =>
          prev.filter((doc) => !documentIds.includes(doc.id))
        );
        toast.success(`${documentIds.length} documents deleted successfully`);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to bulk delete documents";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const bulkUpdateMetadata = useCallback(
    async (
      documentIds: string[],
      updates: Partial<Document>
    ): Promise<Document[]> => {
      try {
        setLoading(true);
        setError(null);

        const updatedDocuments =
          await DocumentService.bulkUpdateDocumentMetadata(
            documentIds,
            updates
          );

        // Update local state
        setDocuments((prev) =>
          prev.map((doc) => {
            const updated = updatedDocuments.find(
              (updated) => updated.id === doc.id
            );
            return updated || doc;
          })
        );

        toast.success(`${documentIds.length} documents updated successfully`);
        return updatedDocuments;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to bulk update document metadata";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const exportDocumentsList = useCallback(
    async (
      format: "csv" | "pdf" | "excel",
      additionalFilters?: any
    ): Promise<ExportResponse> => {
      try {
        setLoading(true);
        setError(null);

        const allFilters = { ...filters, ...additionalFilters };
        const exportResponse = await DocumentService.exportDocumentsList(
          format,
          allFilters
        );

        // Open download link
        window.open(exportResponse.downloadUrl, "_blank");
        toast.success("Document list export started");

        return exportResponse;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to export documents list";
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // ===== Utilities =====

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // ===== Effects =====

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
    fetchStorageStats();
    fetchUsageAnalytics();
  }, [fetchDocuments, fetchCategories, fetchStorageStats, fetchUsageAnalytics]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      fetchDocuments();
    }
  }, [filters, fetchDocuments]);

  return {
    // State
    loading,
    error,

    // Data
    documents,
    categories,
    storageStats,
    usageAnalytics,

    // Filters
    filters,
    setFilters,

    // Actions
    fetchDocuments,
    uploadDocument,
    downloadDocument,
    updateDocumentMetadata,
    deleteDocument,

    // Search & Categories
    searchDocuments,
    fullTextSearch,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,

    // Analytics
    fetchStorageStats,
    fetchUsageAnalytics,

    // Bulk Operations
    bulkDeleteDocuments,
    bulkUpdateMetadata,
    exportDocumentsList,

    // Utilities
    clearError,
    resetFilters,
  };
}
