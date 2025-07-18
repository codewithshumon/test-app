import React, { useRef } from 'react';
import ModernInvoice from './ModernInvoice';

const InvoiceGenerator = () => {
  const invoiceRef = useRef(null);

  const generatePDF = () => {
    // Get the HTML content of the invoice
    const invoiceElement = invoiceRef.current;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice</title>
        <meta charset="UTF-8">
        <style>
          /* Include all your Tailwind-like styles */
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; }
          .max-w-4xl { max-width: 56rem; margin: 0 auto; }
          .p-6 { padding: 1.5rem; }
          /* Add all other classes used in your invoice */
          
          /* Ensure proper printing */
          @page { size: A4; margin: 0; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        ${invoiceElement.innerHTML}
      </body>
      </html>
    `;

    // Create a blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create an iframe
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    
    document.body.appendChild(iframe);
    
    iframe.onload = () => {
      setTimeout(() => {
        // Trigger print which will open browser's save as PDF dialog
        iframe.contentWindow.print();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(iframe);
          URL.revokeObjectURL(url);
        }, 1000);
      }, 500);
    };
  };

  return (
    <div>
      <div ref={invoiceRef}>
        <ModernInvoice />
      </div>
      <div className="text-center mt-4 no-print">
        <button 
          onClick={generatePDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;