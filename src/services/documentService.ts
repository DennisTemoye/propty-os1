import { apiService } from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import {
  Document,
  DocumentCategory,
  DocumentSearchQuery,
  ApiResponse,
  PaginatedResponse,
  ExportResponse,
} from "@/types";

export class DocumentService {
  // ===== Document Operations =====

  /**
   * Fetch documents with optional filters
   */
  static async getDocuments(filters?: {
    category?: string;
    linkedTo?: string;
    linkedId?: string;
    search?: string;
    fileType?: string;
    uploadedBy?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Document>> {
    try {
      const response = await apiService.get(API_ENDPOINTS.DOCUMENTS.BASE, {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch documents: ${error}`);
    }
  }

  /**
   * Upload a new document
   */
  static async uploadDocument(
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
  ): Promise<Document> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Append metadata
      Object.entries(metadata).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await apiService.post(
        API_ENDPOINTS.DOCUMENTS.UPLOAD,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to upload document: ${error}`);
    }
  }

  /**
   * Download a document
   */
  static async downloadDocument(documentId: string): Promise<Blob> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.DOCUMENTS.DOWNLOAD(documentId),
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to download document: ${error}`);
    }
  }

  /**
   * Update document metadata
   */
  static async updateDocumentMetadata(
    documentId: string,
    updates: Partial<Document>
  ): Promise<Document> {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.DOCUMENTS.METADATA(documentId),
        updates
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to update document metadata: ${error}`);
    }
  }

  /**
   * Delete a document
   */
  static async deleteDocument(documentId: string): Promise<void> {
    try {
      await apiService.delete(API_ENDPOINTS.DOCUMENTS.BY_ID(documentId));
    } catch (error) {
      throw new Error(`Failed to delete document: ${error}`);
    }
  }

  // ===== Document Search =====

  /**
   * Search documents with advanced filters
   */
  static async searchDocuments(
    searchQuery: DocumentSearchQuery
  ): Promise<PaginatedResponse<Document>> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.DOCUMENTS.SEARCH,
        searchQuery
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search documents: ${error}`);
    }
  }

  /**
   * Full-text search across document content
   */
  static async fullTextSearch(
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
  ): Promise<Document[]> {
    try {
      const searchQuery: DocumentSearchQuery = {
        query,
        filters,
        sortBy: "uploadDate",
        sortOrder: "desc",
      };

      const response = await this.searchDocuments(searchQuery);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to perform full-text search: ${error}`);
    }
  }

  // ===== Document Categories =====

  /**
   * Fetch document categories
   */
  static async getDocumentCategories(): Promise<DocumentCategory[]> {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.DOCUMENTS.CATEGORIES.BASE
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch document categories: ${error}`);
    }
  }

  /**
   * Create a new document category
   */
  static async createDocumentCategory(
    categoryData: Partial<DocumentCategory>
  ): Promise<DocumentCategory> {
    try {
      const response = await apiService.post(
        API_ENDPOINTS.DOCUMENTS.CATEGORIES.BASE,
        categoryData
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to create document category: ${error}`);
    }
  }

  /**
   * Update a document category
   */
  static async updateDocumentCategory(
    categoryId: string,
    updates: Partial<DocumentCategory>
  ): Promise<DocumentCategory> {
    try {
      const response = await apiService.put(
        API_ENDPOINTS.DOCUMENTS.CATEGORIES.BY_ID(categoryId),
        updates
      );
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to update document category: ${error}`);
    }
  }

  /**
   * Delete a document category
   */
  static async deleteDocumentCategory(categoryId: string): Promise<void> {
    try {
      await apiService.delete(
        API_ENDPOINTS.DOCUMENTS.CATEGORIES.BY_ID(categoryId)
      );
    } catch (error) {
      throw new Error(`Failed to delete document category: ${error}`);
    }
  }

  // ===== Document Analytics =====

  /**
   * Get document storage statistics
   */
  static async getDocumentStorageStats(): Promise<{
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
  }> {
    try {
      const documents = await this.getDocuments({ limit: 10000 }); // Get all documents for analysis

      const totalDocuments = documents.data.length;

      // Calculate total size (assuming fileSize is in format like "2.5 MB")
      const totalSizeBytes = documents.data.reduce((total, doc) => {
        const sizeStr = doc.fileSize;
        const size = parseFloat(sizeStr);
        const unit = sizeStr.split(" ")[1];

        let multiplier = 1;
        if (unit === "KB") multiplier = 1024;
        else if (unit === "MB") multiplier = 1024 * 1024;
        else if (unit === "GB") multiplier = 1024 * 1024 * 1024;

        return total + size * multiplier;
      }, 0);

      const totalSize = this.formatBytes(totalSizeBytes);

      // Group by category
      const categoryStats = new Map<string, { count: number; size: number }>();
      documents.data.forEach((doc) => {
        const current = categoryStats.get(doc.category) || {
          count: 0,
          size: 0,
        };
        current.count++;
        current.size += this.parseFileSize(doc.fileSize);
        categoryStats.set(doc.category, current);
      });

      const documentsByCategory = Array.from(categoryStats.entries()).map(
        ([category, stats]) => ({
          category,
          count: stats.count,
          size: this.formatBytes(stats.size),
          percentage:
            totalDocuments > 0 ? (stats.count / totalDocuments) * 100 : 0,
        })
      );

      // Group by file type
      const typeStats = new Map<string, { count: number; size: number }>();
      documents.data.forEach((doc) => {
        const current = typeStats.get(doc.fileType) || { count: 0, size: 0 };
        current.count++;
        current.size += this.parseFileSize(doc.fileSize);
        typeStats.set(doc.fileType, current);
      });

      const documentsByType = Array.from(typeStats.entries()).map(
        ([fileType, stats]) => ({
          fileType,
          count: stats.count,
          size: this.formatBytes(stats.size),
          percentage:
            totalDocuments > 0 ? (stats.count / totalDocuments) * 100 : 0,
        })
      );

      // Calculate storage trend (last 6 months)
      const storageTrend = this.calculateStorageTrend(documents.data);

      return {
        totalDocuments,
        totalSize,
        documentsByCategory,
        documentsByType,
        storageTrend,
      };
    } catch (error) {
      throw new Error(`Failed to fetch document storage statistics: ${error}`);
    }
  }

  /**
   * Get document usage analytics
   */
  static async getDocumentUsageAnalytics(dateRange?: {
    start: string;
    end: string;
  }): Promise<{
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
  }> {
    try {
      // This would typically come from a separate analytics endpoint
      // For now, we'll simulate the data based on available document information
      const documents = await this.getDocuments({ limit: 1000 });

      const totalUploads = documents.data.length;
      const totalDownloads = Math.floor(totalUploads * 0.7); // Simulate download data

      // Calculate trends based on upload dates
      const uploadTrend = this.calculateUploadTrend(documents.data, dateRange);

      return {
        totalUploads,
        totalDownloads,
        averageUploadsPerDay:
          uploadTrend.length > 0
            ? uploadTrend.reduce((sum, day) => sum + day.uploads, 0) /
              uploadTrend.length
            : 0,
        averageDownloadsPerDay:
          uploadTrend.length > 0 ? totalDownloads / uploadTrend.length : 0,
        mostDownloadedDocuments: documents.data
          .slice(0, 10)
          .map((doc) => ({
            document: doc,
            downloadCount: Math.floor(Math.random() * 100),
          })),
        uploadTrend,
        downloadTrend: uploadTrend.map((day) => ({
          date: day.date,
          downloads: Math.floor(day.uploads * 0.7), // Simulate download trend
        })),
      };
    } catch (error) {
      throw new Error(`Failed to fetch document usage analytics: ${error}`);
    }
  }

  // ===== Helper Methods =====

  /**
   * Parse file size string to bytes
   */
  private static parseFileSize(sizeStr: string): number {
    const size = parseFloat(sizeStr);
    const unit = sizeStr.split(" ")[1];

    let multiplier = 1;
    if (unit === "KB") multiplier = 1024;
    else if (unit === "MB") multiplier = 1024 * 1024;
    else if (unit === "GB") multiplier = 1024 * 1024 * 1024;

    return size * multiplier;
  }

  /**
   * Format bytes to human readable string
   */
  private static formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * Calculate storage trend over time
   */
  private static calculateStorageTrend(documents: Document[]): Array<{
    month: string;
    documentsAdded: number;
    storageUsed: string;
  }> {
    const trend = new Map<string, { count: number; size: number }>();

    documents.forEach((doc) => {
      const month = new Date(doc.uploadDate).toISOString().slice(0, 7); // YYYY-MM
      const current = trend.get(month) || { count: 0, size: 0 };
      current.count++;
      current.size += this.parseFileSize(doc.fileSize);
      trend.set(month, current);
    });

    return Array.from(trend.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6) // Last 6 months
      .map(([month, stats]) => ({
        month,
        documentsAdded: stats.count,
        storageUsed: this.formatBytes(stats.size),
      }));
  }

  /**
   * Calculate upload trend over time
   */
  private static calculateUploadTrend(
    documents: Document[],
    dateRange?: { start: string; end: string }
  ): Array<{ date: string; uploads: number }> {
    const trend = new Map<string, number>();

    documents.forEach((doc) => {
      const date = doc.uploadDate;
      if (dateRange) {
        const docDate = new Date(date);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);

        if (docDate < startDate || docDate > endDate) return;
      }

      trend.set(date, (trend.get(date) || 0) + 1);
    });

    return Array.from(trend.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, uploads]) => ({ date, uploads }));
  }

  // ===== Bulk Operations =====

  /**
   * Bulk delete documents
   */
  static async bulkDeleteDocuments(documentIds: string[]): Promise<void> {
    try {
      await Promise.all(documentIds.map((id) => this.deleteDocument(id)));
    } catch (error) {
      throw new Error(`Failed to bulk delete documents: ${error}`);
    }
  }

  /**
   * Bulk update document metadata
   */
  static async bulkUpdateDocumentMetadata(
    documentIds: string[],
    updates: Partial<Document>
  ): Promise<Document[]> {
    try {
      const results = await Promise.all(
        documentIds.map((id) => this.updateDocumentMetadata(id, updates))
      );
      return results;
    } catch (error) {
      throw new Error(`Failed to bulk update document metadata: ${error}`);
    }
  }

  /**
   * Export documents list
   */
  static async exportDocumentsList(
    format: "csv" | "pdf" | "excel",
    filters?: any
  ): Promise<ExportResponse> {
    try {
      const response = await apiService.post("/documents/export", {
        format,
        filters,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to export documents list: ${error}`);
    }
  }
}

export default DocumentService;
