
import { toast } from 'sonner';

export interface DownloadOptions {
  filename: string;
  data: any;
  type: 'pdf' | 'csv' | 'xlsx';
  template?: 'receipt' | 'statement' | 'report' | 'invoice';
  watermark?: {
    logo?: string;
    companyName: string;
  };
}

export class DownloadService {
  static async generatePDF(options: DownloadOptions) {
    try {
      // Simulate PDF generation with real data
      const pdfContent = this.createPDFContent(options);
      
      // Create blob and download
      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      this.triggerDownload(blob, options.filename);
      
      toast.success(`${options.filename} downloaded successfully`);
    } catch (error) {
      toast.error('Failed to generate PDF');
      console.error('PDF generation error:', error);
    }
  }

  static async generateCSV(options: DownloadOptions) {
    try {
      const csvContent = this.createCSVContent(options.data);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      this.triggerDownload(blob, options.filename);
      
      toast.success(`${options.filename} downloaded successfully`);
    } catch (error) {
      toast.error('Failed to generate CSV');
      console.error('CSV generation error:', error);
    }
  }

  static async generateExcel(options: DownloadOptions) {
    try {
      // For now, generate CSV format - can be enhanced with actual Excel library
      const csvContent = this.createCSVContent(options.data);
      const blob = new Blob([csvContent], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      this.triggerDownload(blob, options.filename.replace('.csv', '.xlsx'));
      
      toast.success(`Excel file downloaded successfully`);
    } catch (error) {
      toast.error('Failed to generate Excel file');
      console.error('Excel generation error:', error);
    }
  }

  private static createPDFContent(options: DownloadOptions): string {
    const { data, template, watermark } = options;
    
    // Simulated PDF content with watermark
    let content = `%PDF-1.4\n`;
    content += `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
    content += `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
    content += `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n`;
    
    // Add watermark if provided
    if (watermark) {
      content += `Watermark: ${watermark.companyName}\n`;
    }
    
    // Add actual data based on template
    switch (template) {
      case 'receipt':
        content += this.formatReceiptData(data);
        break;
      case 'statement':
        content += this.formatStatementData(data);
        break;
      case 'report':
        content += this.formatReportData(data);
        break;
      default:
        content += JSON.stringify(data, null, 2);
    }
    
    return content;
  }

  private static createCSVContent(data: any[]): string {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ];
    
    return csvRows.join('\n');
  }

  private static formatReceiptData(data: any): string {
    return `
Receipt #${data.id}
Date: ${data.date}
Client: ${data.clientName}
Amount: ${data.amount}
Payment Method: ${data.paymentMethod}
Project: ${data.project}
    `;
  }

  private static formatStatementData(data: any): string {
    return `
Statement for ${data.clientName}
Period: ${data.startDate} - ${data.endDate}
Total Paid: ${data.totalPaid}
Outstanding: ${data.outstanding}
Next Due: ${data.nextDueDate}
    `;
  }

  private static formatReportData(data: any): string {
    return `
Report: ${data.title}
Generated: ${new Date().toISOString()}
Period: ${data.period}
Total Records: ${data.records?.length || 0}
    `;
  }

  private static triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
