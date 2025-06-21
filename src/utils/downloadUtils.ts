
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const formatCurrency = (amount: string | number): string => {
  if (typeof amount === 'string') {
    // Extract numeric value from string like "₦5,000,000"
    const numericValue = parseFloat(amount.replace(/[₦,]/g, ''));
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(numericValue);
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const addWatermarkToPDF = (doc: jsPDF) => {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Add logo/watermark
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('ProptyOS - Built for Africa', 15, doc.internal.pageSize.height - 10);
    
    // Add generation timestamp
    doc.text(`Generated on ${formatDate(new Date())}`, doc.internal.pageSize.width - 80, doc.internal.pageSize.height - 10);
    
    // Add page numbers
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, 15);
  }
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const generateCSV = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, `${filename}.csv`);
};

export const generateExcel = (data: any[], filename: string, sheetName: string = 'Data') => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  downloadFile(blob, `${filename}.xlsx`);
};
