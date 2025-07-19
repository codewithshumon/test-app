'use client'

import React, { useRef } from 'react';

import html2canvas from 'html2canvas';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import NewInvoice from '../components/NewInvoice';

const App = () => {
  const invoiceRef = useRef(null); // Create a ref to attach to the invoice component

  const downloadPdf = async () => {
    if (invoiceRef.current) {
      // 1. Capture the React component as a canvas
      const canvas = await html2canvas(invoiceRef.current, {
        useCORS: true, // Important for images loaded from different origins (like your logos)
        scale: 2, // Increase scale for better resolution in PDF
      });

      // Get the image data URL from the canvas
      const imageDataUrl = canvas.toDataURL('image/png');

      // 2. Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      // 3. Embed the PNG image
      const pngImage = await pdfDoc.embedPng(imageDataUrl);

      // Calculate dimensions to fit the image on the PDF page while maintaining aspect ratio
      const imgWidth = pngImage.width;
      const imgHeight = pngImage.height;
      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();

      const aspectRatio = imgWidth / imgHeight;

      let scaledWidth = pageWidth * 0.9; // Use 90% of page width
      let scaledHeight = scaledWidth / aspectRatio;

      // If scaled height exceeds page height, adjust to fit vertically
      if (scaledHeight > pageHeight * 0.9) {
        scaledHeight = pageHeight * 0.9; // Use 90% of page height
        scaledWidth = scaledHeight * aspectRatio;
      }

      // Center the image on the page
      const x = (pageWidth - scaledWidth) / 2;
      const y = (pageHeight - scaledHeight) / 2;

      page.drawImage(pngImage, {
        x,
        y,
        width: scaledWidth,
        height: scaledHeight,
      });

      // Optional: Add a footer or header text if needed, separate from the image
      // const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      // page.drawText('Invoice Generated on ' + new Date().toLocaleDateString(), {
      //   x: 50,
      //   y: 30,
      //   font,
      //   size: 10,
      //   color: rgb(0, 0.53, 0.71),
      // });

      // 4. Save the PDF and trigger download
      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${new Date().toISOString().slice(0, 10)}.pdf`; // Dynamic filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up the object URL
    } else {
      console.error("Invoice component ref is not attached.");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Invoice Preview</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={downloadPdf}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginBottom: '20px'
          }}
        >
          Download Invoice as PDF 📥
        </button>
      </div>
      <NewInvoice invoiceRef={invoiceRef} /> 
    </div>
  );
};

export default App;