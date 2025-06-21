
import { DownloadService } from './downloadService';
import { toast } from 'sonner';

export class EnhancedDownloadService extends DownloadService {
  private static async safeDownload(
    downloadFn: () => Promise<void> | void,
    fileName: string,
    onProgress?: (progress: number) => void
  ): Promise<void> {
    try {
      onProgress?.(20);
      
      // Simulate progress for user feedback
      const progressInterval = setInterval(() => {
        const currentProgress = Math.min(90, Math.random() * 40 + 40);
        onProgress?.(currentProgress);
      }, 200);

      await Promise.resolve(downloadFn());
      
      clearInterval(progressInterval);
      onProgress?.(100);
      
      // Small delay to show completion
      await new Promise(resolve => setTimeout(resolve, 300));
      
    } catch (error) {
      console.error('Download failed:', error);
      throw new Error(`Failed to download ${fileName}`);
    }
  }

  // Client Downloads with enhanced error handling
  static async downloadClientReceipt(client: any, payment: any): Promise<void> {
    return this.safeDownload(
      () => super.generateClientReceipt(client, payment),
      `Receipt_${client.name}`
    );
  }

  static async downloadClientStatement(client: any, transactions: any[]): Promise<void> {
    return this.safeDownload(
      () => super.generateClientStatement(client, transactions),
      `Statement_${client.name}`
    );
  }

  static async downloadClientKYC(client: any): Promise<void> {
    return this.safeDownload(
      async () => {
        // Simulate KYC bundle creation
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('KYC documents prepared for download');
      },
      `KYC_${client.name}`
    );
  }

  // Project Downloads
  static async downloadProjectDocument(project: any, document: any): Promise<void> {
    return this.safeDownload(
      async () => {
        // Simulate project document download
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log('Downloading project document:', document.name);
      },
      document.name
    );
  }

  static async downloadProjectReport(project: any, reportType: string): Promise<void> {
    return this.safeDownload(
      () => {
        const doc = new (window as any).jsPDF();
        doc.text(`${reportType} Report - ${project.name}`, 15, 25);
        doc.save(`${project.name}_${reportType}_Report.pdf`);
      },
      `${project.name}_${reportType}_Report`
    );
  }

  // Fees Collection Downloads
  static async downloadFeeReceipt(fee: any): Promise<void> {
    return this.safeDownload(
      () => {
        const doc = new (window as any).jsPDF();
        doc.text('FEE RECEIPT', 15, 25);
        doc.text(`Client: ${fee.clientName}`, 15, 40);
        doc.text(`Amount: ${fee.amount}`, 15, 50);
        doc.save(`Fee_Receipt_${fee.clientName}.pdf`);
      },
      `Fee_Receipt_${fee.clientName}`
    );
  }

  static async downloadFeesSummary(fees: any[]): Promise<void> {
    return this.safeDownload(
      () => super.generateFeeStatement(fees),
      'Fees_Summary'
    );
  }

  // Accounting Downloads
  static async downloadAccountingReport(reportData: any): Promise<void> {
    return this.safeDownload(
      () => super.generateAccountingSummary(reportData),
      'Accounting_Report'
    );
  }

  // Marketer Downloads
  static async downloadMarketerReport(marketer: any, commissions: any[]): Promise<void> {
    return this.safeDownload(
      () => super.generateMarketerCommissionReport(marketer, commissions),
      `Commission_Report_${marketer.name}`
    );
  }

  // Report Downloads
  static async downloadSalesReport(salesData: any[]): Promise<void> {
    return this.safeDownload(
      () => super.generateSalesReport(salesData),
      'Sales_Report'
    );
  }

  static async downloadCRMReport(pipelineData: any[]): Promise<void> {
    return this.safeDownload(
      () => super.generateCRMReport(pipelineData),
      'CRM_Pipeline_Report'
    );
  }

  // Generic file viewer data
  static createFileViewerData(type: string, name: string, downloadData?: any) {
    const fileTypeMap: { [key: string]: 'pdf' | 'image' | 'document' | 'csv' | 'excel' } = {
      'pdf': 'pdf',
      'receipt': 'pdf',
      'statement': 'pdf',
      'report': 'pdf',
      'csv': 'csv',
      'excel': 'excel',
      'xlsx': 'excel',
      'image': 'image',
      'jpg': 'image',
      'png': 'image',
      'doc': 'document',
      'docx': 'document'
    };

    return {
      name,
      type: fileTypeMap[type.toLowerCase()] || 'document',
      downloadData,
      size: '1.2 MB' // This would be calculated in real implementation
    };
  }
}
