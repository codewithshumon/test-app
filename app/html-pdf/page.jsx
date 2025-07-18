'use client';

import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import NewInvoice from '../components/NewInvoice';

const Page = () => {
  const invoiceRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  // Preload images to ensure they're available
  useEffect(() => {
    const preloadImages = async () => {
      const images = invoiceRef.current?.querySelectorAll('img') || [];
      const promises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          // Force crossorigin attribute for CORS images
          if (img.src.startsWith('http') && !img.crossOrigin) {
            img.crossOrigin = 'Anonymous';
          }
        });
      });

      try {
        await Promise.all(promises);
        setImagesReady(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesReady(true); // Continue anyway
      }
    };

    if (invoiceRef.current) {
      preloadImages();
    }
  }, []);

  const handleGeneratePDF = async () => {
    if (!imagesReady) {
      alert('Images are still loading. Please wait a moment and try again.');
      return;
    }

    setIsGenerating(true);
    try {
      const input = invoiceRef.current;
      
      const canvas = await html2canvas(input, {
        scale: 2,
        logging: true, // Enable logging to debug image issues
        useCORS: true, // This is crucial for CORS images
        allowTaint: true, // Allow tainted canvas
        scrollY: -window.scrollY,
        async: true,
        onclone: (clonedDoc) => {
          // Ensure all images have CORS attributes in the cloned document
          const images = clonedDoc.querySelectorAll('img');
          images.forEach((img) => {
            if (img.src.startsWith('http') && !img.crossOrigin) {
              img.crossOrigin = 'Anonymous';
            }
          });
        }
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`invoice-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please check the console for details.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#f3efef]">
      <div className="pt-20 bg-[#f3efef]">
        <div>
          <NewInvoice invoiceRef={invoiceRef} />
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating || !imagesReady}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed no-print"
          >
            {isGenerating ? 'Generating PDF...' : 'Download PDF Invoice'}
          </button>
          {!imagesReady && (
            <p className="text-sm text-gray-500 mt-2">Loading images...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;