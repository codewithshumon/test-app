'use client';

import InvoiceGenerator from "../components/InvoiceGenerator";
import ModernInvoice from "../components/ModernInvoice";
import { useRef } from 'react';

const Page = () => {
  const invoiceRef = useRef(null);

  const generatePDF = () => {
    // Store original document contents
    const originalContents = document.body.innerHTML;
    
    // Get the invoice HTML
    const invoiceElement = invoiceRef.current.querySelector('.invoice-container');
    
    // Create a print-specific document
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceRef.current.querySelector('.invoice-number').textContent}</title>
        <meta charset="UTF-8">
        <style>
          /* Preserve your Tailwind-like styles */
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
          .max-w-4xl { max-width: 56rem; margin: 0 auto; }
          .p-6 { padding: 1.5rem; }
          .rounded-lg { border-radius: 0.5rem; }
          .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          .flex { display: flex; }
          .justify-between { justify-content: space-between; }
          .items-start { align-items: flex-start; }
          .mb-8 { margin-bottom: 2rem; }
          /* Add all other classes used in your ModernInvoice component */
          
          /* Print-specific styles */
          @media print {
            body { 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              padding: 0;
              margin: 0;
            }
            .no-print { display: none !important; }
            .invoice-container { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        ${invoiceElement.outerHTML}
        <script>
          // Automatically trigger print when loaded
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 200);
          };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
    
    // Fallback in case print window is blocked
    setTimeout(() => {
      if (printWindow.closed || typeof printWindow.closed === 'undefined') {
        // If popup was blocked, use iframe method
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.srcdoc = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Invoice</title>
            <style>
              ${document.querySelector('style[data-styled]')?.innerHTML || ''}
              /* Include the same styles as above */
            </style>
          </head>
          <body>
            ${invoiceElement.outerHTML}
          </body>
          </html>
        `;
        document.body.appendChild(iframe);
        
        iframe.onload = () => {
          setTimeout(() => {
            iframe.contentWindow.print();
            document.body.removeChild(iframe);
          }, 500);
        };
      }
    }, 500);
  };

  return (
    <div className="w-full h-full bg-[#f3efef]">
    <div className="pt-20 bg-[#f3efef]">
      <InvoiceGenerator />
    </div>
      <div className="pt-20 bg-[#f3efef]">
        <div ref={invoiceRef}>
          <ModernInvoice />
        </div>
        <div className="mt-10 text-center">
          <button   
            onClick={generatePDF}
            className="no-print bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-200"
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;