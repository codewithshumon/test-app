'use client';
import { useRef } from 'react';
import NewInvoice from "../components/NewInvoice";
const Page = () => {
  const invoiceRef = useRef(null);

  const handleGeneratePDF = () => {
    // Check if the invoiceRef is available
    if (!invoiceRef.current) {
      return;
    }

    // Clone the invoice element to preserve its current styles and content
    const invoiceContent = invoiceRef.current.cloneNode(true);

    // Create a temporary print container
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow pop-ups for printing.');
      return;
    }

    // Write the basic HTML structure to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice Print</title>
          <style>
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              /* Add any specific print styles for your invoice here */
              /* For example, to ensure tables and cells have borders */
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ddd; /* Example border */
                padding: 8px;
                text-align: left;
              }
              /* Hide elements that shouldn't be printed, like the "Generate PDF" button */
              .no-print {
                display: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div id="invoice-print-container"></div>
        </body>
      </html>
    `);

    // Append the cloned invoice content to the temporary print container
    printWindow.document.getElementById('invoice-print-container').appendChild(invoiceContent);

    // Get all the stylesheets from the main document and inject them into the print window
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        const rules = sheet.cssRules;
        if (rules) {
          const style = printWindow.document.createElement('style');
          Array.from(rules).forEach(rule => {
            style.appendChild(printWindow.document.createTextNode(rule.cssText));
          });
          printWindow.document.head.appendChild(style);
        }
      } catch (e) {
        console.warn('Could not read rules from stylesheet:', sheet.href, e);
      }
    });

    // Close the document to ensure all content is loaded
    printWindow.document.close();

    // Focus and print the new window
    printWindow.focus();
    printWindow.print();

    // Close the window after printing (with a slight delay)
    setTimeout(() => {
      printWindow.close();
    }, 500);
  };

  return (
    <div className="w-full h-full bg-[#f3efef]">
      <div className="pt-20 bg-[#f3efef]">
        <div>
          <div ref={invoiceRef}>
            <NewInvoice />
          </div>
        </div>
        <div className="mt-10 no-print">
          <button
            onClick={handleGeneratePDF}
            className="text-center text-[#222121] cursor-pointer w-full"
          >
            Generate PDF
          </button>
        </div>
      </div>
      <div className="h-screen"></div>
    </div>
  );
};
export default Page;