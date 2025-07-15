'use client'

import ModernInvoice from "../components/ModernInvoice";
import { useRef } from 'react';

const Page = () => {
  const image = "https://thumbs.dreamstime.com/b/filled-blogger-influencer-icon-set-contain-flat-statistics-communication-comment-world-home-selfie-vinyl-placeholder-207085026.jpg";
  const invoiceRef = useRef(null);

  // const generatePDF = () => {
  //   // Get the invoice content
  //   const invoiceContent = invoiceRef.current.innerHTML;
    
  //   // Create a new window for printing
  //   const printWindow = window.open('', '', 'width=800,height=600');
    
  //   // Write the corrected content with watermark to the new window
  //   printWindow.document.write(`
  //     <!DOCTYPE html>
  //     <html>
  //     <head>
  //       <title>Invoice PDF</title>
  //       <style>
  //         @page {
  //           size: A4;
  //           /* 1. Remove margin from the page itself */
  //           margin: 0; 
  //           background-color: red;
  //         }
  //         body {
  //           font-family: Arial, sans-serif;
  //           margin: 0;
  //           padding: 0;
  //         }
  //         .watermark {
  //           position: fixed;
  //           bottom: 0;
  //           left: 0;
  //           width: 100%;
  //           height: 100px; /* As requested */
  //           opacity: 0.3;
  //           z-index: -1;
  //         }
  //         .watermark img {
  //           width: 100%;
  //           height: 100%;
  //           object-fit: cover;
  //         }
  //         .invoice-container {
  //           /* 2. Apply margins as padding to the content container */
  //           padding: 10mm; 
  //           /* 3. Add the specific bottom padding to make space for the watermark */
  //           padding-bottom: 110px; 
  //         }
  //         @media print {
  //           .no-print {
  //             display: none !important;
  //           }
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <div class="invoice-container">${invoiceContent}</div>
  //       <div class="watermark">
  //         <img src="${image}" alt="Watermark" />
  //       </div>
  //       <script>
  //         window.onload = function() {
  //           setTimeout(function() {
  //             window.print();
  //             window.close();
  //           }, 500);
  //         };
  //       </script>
  //     </body>
  //     </html>
  //   `);
    
  //   printWindow.document.close();
  // };

  const generatePDF = () => {
  // Get the invoice content
  const invoiceContent = invoiceRef.current.innerHTML;
  
  // Create a new window for printing
  const printWindow = window.open('', '', 'width=800,height=600');
  
  // Write the corrected content with watermark to the new window
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Invoice PDF</title>
      <style>
        @page {
          size: A4;
          margin: 0;
        }
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: red;
        }
        .watermark {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100px;
          opacity: 0.3;
          z-index: -1;
          overflow: hidden;
          background-color: red;
        }
        .watermark img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .invoice-container {
          padding: 10mm;
          padding-bottom: 110px;
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">${invoiceContent}</div>
      <div class="watermark">
        <img src="${image}" alt="Watermark" />
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            window.close();
          }, 500);
        };
      </script>
    </body>
    </html>
  `);
  
  printWindow.document.close();
};

  return (
    <div className="w-full h-full bg-[#f3efef]">
      <div className="pt-20 bg-[#f3efef]">
        <div ref={invoiceRef}>
          <ModernInvoice />
        </div>
        <div className="mt-10">
          <button  
            onClick={generatePDF}
            className="text-center text-[#222121] cursor-pointer w-full no-print"
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