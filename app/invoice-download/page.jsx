'use client';

import { useRef } from 'react';
import NewInvoice from "../components/NewInvoice";

const Page = () => {
  const invoiceRef = useRef(null);
  const image = "https://thumbs.dreamstime.com/b/filled-blogger-influencer-icon-set-contain-flat-statistics-communication-comment-world-home-selfie-vinyl-placeholder-207085026.jpg";

 
    const handleGeneratePDF = async () => {

        const htmlContent = invoiceRef.current;
        const htmlContentString = htmlContent.innerHTML;
        
        const response = await fetch('/api/pdf', {
            method: 'POST',
            body: JSON.stringify({ htmlContent: htmlContentString }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `6873590a82294701d9f1ba3f.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Failed to generate PDF');
        }
    }


  return (
    <div className="w-full h-full bg-[#f3efef]">
      <div className="pt-20 bg-[#f3efef]">
        <div>
          <NewInvoice invoiceRef={invoiceRef} />
        </div>
        <div className="mt-10">
          <button   
            onClick={handleGeneratePDF}
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