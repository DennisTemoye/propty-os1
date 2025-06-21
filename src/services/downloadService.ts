
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency, formatDate, addWatermarkToPDF, downloadFile, generateCSV, generateExcel } from '@/utils/downloadUtils';

export class DownloadService {
  // Client Downloads
  static generateClientReceipt(client: any, payment: any) {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('PAYMENT RECEIPT', 15, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('ProptyOS Real Estate Management', 15, 35);
    
    // Receipt details
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    
    const receiptData = [
      ['Receipt #:', payment.id || 'RCP-001'],
      ['Date:', formatDate(payment.date || new Date())],
      ['Client:', client.name],
      ['Email:', client.email],
      ['Phone:', client.phone],
      ['Property:', payment.project || 'N/A'],
      ['Payment Type:', payment.type || 'Property Payment'],
      ['Amount Paid:', formatCurrency(payment.amount)],
      ['Payment Method:', payment.method || 'Bank Transfer'],
      ['Status:', 'Paid']
    ];
    
    let yPosition = 50;
    receiptData.forEach(([label, value]) => {
      doc.text(label, 15, yPosition);
      doc.text(value, 80, yPosition);
      yPosition += 10;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for your payment!', 15, yPosition + 20);
    doc.text('For inquiries, contact support@proptyos.com', 15, yPosition + 30);
    
    addWatermarkToPDF(doc);
    
    const blob = doc.output('blob');
    downloadFile(blob, `Receipt_${client.name}_${payment.id || 'RCP001'}.pdf`);
  }
  
  static generateClientStatement(client: any, transactions: any[]) {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text('CLIENT STATEMENT', 15, 25);
    
    doc.setFontSize(12);
    doc.text(`Client: ${client.name}`, 15, 40);
    doc.text(`Statement Period: ${formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))} - ${formatDate(new Date())}`, 15, 50);
    
    // Transaction table
    const tableData = transactions.map(tx => [
      formatDate(tx.date),
      tx.description || tx.type,
      tx.type === 'payment' ? formatCurrency(tx.amount) : '-',
      tx.type === 'fee' ? formatCurrency(tx.amount) : '-',
      formatCurrency(tx.balance || 0)
    ]);
    
    autoTable(doc, {
      head: [['Date', 'Description', 'Payment', 'Charges', 'Balance']],
      body: tableData,
      startY: 60,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    addWatermarkToPDF(doc);
    
    const blob = doc.output('blob');
    downloadFile(blob, `Statement_${client.name}_${formatDate(new Date())}.pdf`);
  }
  
  // Accounting Downloads
  static generateAccountingSummary(summaryData: any) {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('ACCOUNTING SUMMARY', 15, 25);
    
    doc.setFontSize(12);
    doc.text(`Period: ${formatDate(summaryData.fromDate)} - ${formatDate(summaryData.toDate)}`, 15, 40);
    
    // Summary metrics
    const metrics = [
      ['Total Revenue:', formatCurrency(summaryData.totalRevenue || 0)],
      ['Total Expenses:', formatCurrency(summaryData.totalExpenses || 0)],
      ['Net Profit:', formatCurrency((summaryData.totalRevenue || 0) - (summaryData.totalExpenses || 0))],
      ['Outstanding Receivables:', formatCurrency(summaryData.outstanding || 0)],
      ['Commission Paid:', formatCurrency(summaryData.commissionPaid || 0)]
    ];
    
    let yPos = 60;
    metrics.forEach(([label, value]) => {
      doc.text(label, 15, yPos);
      doc.text(value, 120, yPos);
      yPos += 12;
    });
    
    addWatermarkToPDF(doc);
    
    const blob = doc.output('blob');
    downloadFile(blob, `Accounting_Summary_${formatDate(new Date())}.pdf`);
  }
  
  // Fees Collection Downloads
  static generateFeeStatement(feeData: any[]) {
    const csvData = feeData.map(fee => ({
      'Client Name': fee.clientName,
      'Project': fee.project,
      'Fee Type': fee.feeType,
      'Amount': fee.amount,
      'Paid': fee.paid,
      'Outstanding': fee.outstanding,
      'Status': fee.status,
      'Due Date': fee.dueDate
    }));
    
    generateCSV(csvData, `Fee_Statement_${formatDate(new Date())}`);
  }
  
  // Reports Downloads
  static generateSalesReport(salesData: any[]) {
    const excelData = salesData.map(sale => ({
      'Date': sale.date,
      'Client': sale.clientName,
      'Project': sale.project,
      'Unit': sale.unit,
      'Amount': sale.amount,
      'Commission': sale.commission,
      'Marketer': sale.marketer,
      'Status': sale.status
    }));
    
    generateExcel(excelData, `Sales_Report_${formatDate(new Date())}`, 'Sales Data');
  }
  
  // Marketer Downloads
  static generateMarketerCommissionReport(marketer: any, commissions: any[]) {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('COMMISSION REPORT', 15, 25);
    
    doc.setFontSize(12);
    doc.text(`Marketer: ${marketer.name}`, 15, 40);
    doc.text(`Period: ${formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))} - ${formatDate(new Date())}`, 15, 50);
    
    const tableData = commissions.map(comm => [
      formatDate(comm.date),
      comm.clientName,
      comm.project,
      formatCurrency(comm.saleAmount),
      `${comm.rate}%`,
      formatCurrency(comm.commission),
      comm.status
    ]);
    
    autoTable(doc, {
      head: [['Date', 'Client', 'Project', 'Sale Amount', 'Rate', 'Commission', 'Status']],
      body: tableData,
      startY: 60,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    addWatermarkToPDF(doc);
    
    const blob = doc.output('blob');
    downloadFile(blob, `Commission_Report_${marketer.name}_${formatDate(new Date())}.pdf`);
  }
  
  // CRM Downloads
  static generateCRMReport(pipelineData: any[]) {
    const csvData = pipelineData.map(lead => ({
      'Lead Name': lead.name,
      'Email': lead.email,
      'Phone': lead.phone,
      'Stage': lead.stage,
      'Project Interest': lead.project,
      'Lead Source': lead.source,
      'Assigned To': lead.assignedTo,
      'Created Date': lead.createdDate,
      'Last Contact': lead.lastContact,
      'Status': lead.status
    }));
    
    generateCSV(csvData, `CRM_Pipeline_Report_${formatDate(new Date())}`);
  }
}
