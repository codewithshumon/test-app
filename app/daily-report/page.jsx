'use client'

import { useRef } from "react";
import DailyReport from "./components/DailyReport";
import { dailyReportData, storeData } from "./data";

const page = () => {
  const pdfRef = useRef();

  const handleGeneratePDF = async () => {
    const htmlContent = pdfRef.current;
    const htmlContentString = htmlContent.innerHTML;

    const response = await fetch("/api/daily-report", {
      method: "POST",
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
      link.download = `${orderDetails.saleId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Failed to generate PDF");
    }
  };
  return (
    <div className=" w-full h-full p-10">
      <div className=" w-full h-full py-10 px-20">
        <DailyReport
          setting={storeData.setting}
          orderDetails={dailyReportData}
          pdfRef={pdfRef}
        />
      </div>
      {/* <div className=" w-full flex justify-center mt-5">
        <button onClick={handleGeneratePDF} className="w-fit p-2 bg-blue-500">Download</button>
      </div> */}
    </div>
  );
};

export default page;
