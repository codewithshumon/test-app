'use client';

import ModernInvoice from "../components/ModernInvoice";
import { useRef } from 'react';

const Page = () => {
  const invoiceRef = useRef(null);
  const image = "https://thumbs.dreamstime.com/b/filled-blogger-influencer-icon-set-contain-flat-statistics-communication-comment-world-home-selfie-vinyl-placeholder-207085026.jpg";

  const generatePDF = async () => {
    try {
      if (!invoiceRef.current) {
        throw new Error("Invoice element not found.");
      }
      // Clone the node to avoid manipulating the original element
      const invoiceElement = invoiceRef.current.cloneNode(true);
      
      // Get all computed styles
      const styles = window.getComputedStyle(invoiceRef.current);
      let cssText = "";
      for (const style of styles) {
        cssText += `${style}: ${styles.getPropertyValue(style)};\n`;
      }

      // In-line all the styles
      const elements = invoiceElement.getElementsByTagName('*');
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const elementStyles = window.getComputedStyle(element);
        let elementCssText = "";
        for (const style of elementStyles) {
          elementCssText += `${style}: ${elementStyles.getPropertyValue(style)};\n`;
        }
        element.style.cssText = elementCssText;
      }

      const invoiceContent = invoiceElement.innerHTML;
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            @page {
              size: A4;
              margin: 0;
            }
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .page {
              page-break-after: always;
              position: relative;
              height: 100%;
              padding-bottom: 110px;
              box-sizing: border-box;
            }
            .page:last-child {
              page-break-after: auto;
            }
            .watermark {
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 100px;
              opacity: 0.3;
              z-index: -1;
            }
            .invoice-container {
              padding: 20mm; /* Adjusted padding for better fit */
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="invoice-container">${invoiceContent}</div>
            <div class="watermark">
              <img src="${image}" alt="Watermark" style="width: 100%; height: 100%; object-fit: cover;"/>
            </div>
          </div>
        </body>
        </html>
      `;

      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate PDF: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoice.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. See the console for more details.');
    }
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