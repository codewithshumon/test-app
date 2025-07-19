// 'use client' // Add this directive if you are using Next.js App Router

import React, { useEffect, useState } from "react";
import {
  MdOutlineCall,
  MdOutlineMapsHomeWork,
  MdQrCode2,
} from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

// Ensure this path is correct for your project's CSS
import "@/public/css/testInvoiceStyle.css";
// Make sure 'number-to-text' is installed: npm install number-to-text
// import { toWords } from 'number-to-text'; // You'll need to import this if you use it

const TestInvoice = ({ invoiceRef }) => {
  // Your static orderDetails data
  const orderDetails = {
    id: "6875fcd33e37d17c790e9794",
    saleId: 53449519960133,
    quotationInfo: {
      quotationId: "6874f061a9b0fe5154ae4e04",
      quotationNumber: "MYR-25898485688",
    },
    saleDate: "2025-07-15T07:01:39.209Z",
    currency: "MYR",
    customerInfo: {
      customerId: "6851119b84bd0e63175277c4",
      phone: "+8801311254681",
      email: "rahim@gmail.com",
      name: "Rahim",
      address: "12 new house",
    },
    lineItems: [
      {
        productId: "6873590a82294701d9f1ba3f",
        name: "HydraGlow Ultra-Moisturizing Cream – Deep Hydration for 24 Hours",
        attributes: ["white"],
        quantity: 3,
        returnedQuantity: 0,
        unitPrice: 13.89,
        discount: null,
        unit: {
          unitId: "6851126c84bd0e63175277c7",
          name: "Kg",
        },
        totalAmount: 41.67,
        totalDiscount: 0,
        totalAfterDiscount: 41.67,
      },
      {
        productId: "686cdfdbac83204a1187c587",
        name: "Mercedes-AMG C 63 Saloon – Performance Redefined",
        attributes: ["black"],
        quantity: 2,
        returnedQuantity: 0,
        unitPrice: 8.33,
        discount: null,
        unit: {
          unitId: "6851126c84bd0e63175277c7",
          name: "Kg",
        },
        totalAmount: 16.66,
        totalDiscount: 0,
        totalAfterDiscount: 16.66,
      },
      {
        productId: "6860b6e22cc8cc3eadcea272",
        name: "MacBook Pro 16-inch (M4 Pro, 2024) - Ultimate Performance & Portability",
        attributes: ["blue"],
        quantity: 5,
        returnedQuantity: 0,
        unitPrice: 16.67,
        discount: null,
        unit: {
          unitId: "6851126c84bd0e63175277c7",
          name: "Kg",
        },
        totalAmount: 83.35,
        totalDiscount: 0,
        totalAfterDiscount: 83.35,
      },
      {
        productId: "6851125884bd0e63175277c5",
        name: "Men's Stylish Blue Pen-Stripe Shirt (Multiple Sizes) | Latest Trendy Design | Premium China Import",
        attributes: ["l", "red"],
        quantity: 10,
        returnedQuantity: 0,
        unitPrice: 4.17,
        discount: null,
        unit: {
          unitId: "6851126c84bd0e63175277c7",
          name: "Kg",
        },
        totalAmount: 41.7,
        totalDiscount: 0,
        totalAfterDiscount: 41.7,
      },
    ],
    payments: [],
    subtotal: 183.38,
    discount: {
      type: "FIXED",
      value: 16.67,
    },
    totalAfterDiscount: 166.71,
    vat: null,
    totalAfterVat: 166.71,
    deliveryCost: null,
    laborCost: null,
    totalAmount: 166.71,
    totalPaid: 0,
    totalRemaining: 166.71,
    installmentConfig: null,
    installments: [],
    installmentStatus: null,
    installmentDocuments: [],
    cashTenders: [
      {
        receivedAmount: 0,
        returnAmount: 0,
        timestamp: "2025-07-15T07:01:39.209Z",
      },
    ],
    paymentStatus: "UNPAID",
    note: null,
    saleBy: {
      id: "68510fc684bd0e63175277c3",
      name: "Admin",
    },
    store: {
      id: "68510fc684bd0e63175277c1",
      name: "Shumon Shop",
      logo: {
        lg: "https://via.placeholder.com/150x50?text=Store+Logo", // Placeholder for store logo
        md: "https://via.placeholder.com/100x30?text=Store+Logo",
        sm: "https://via.placeholder.com/50x20?text=Store+Logo",
      },
      phone: "+8801725326327",
      email: "shumon@gmail.com",
      address: "Uttara, Dhaka",
    },
  };

  const [showTableDiscount, setShwoTableDiscount] = useState(false);
  // State variables to store Base64 encoded image data
  const [logoBase64, setLogoBase64] = useState("");
  const [barcodeBase64, setBarcodeBase64] = useState("");
  const [bottomShapeBase64, setBottomShapeBase64] = useState("");

  // Helper function to fetch an image and convert it to Base64
  const fetchImageAsBase64 = async (url, setStateFunction) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          `Failed to fetch image from ${url}: Status ${response.status} - ${response.statusText}`
        );
        setStateFunction(""); // Set to empty string on error
        return;
      }
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setStateFunction(reader.result);
        console.log(
          `Successfully converted ${url} to Base64. Data length: ${reader.result.length}`
        );
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        setStateFunction("");
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error during fetch or Base64 conversion:", error);
      setStateFunction(""); // Ensure state is cleared on error
    }
  };

  useEffect(() => {
    setShwoTableDiscount(
      orderDetails?.lineItems?.some((p) => p.discount?.value > 0)
    );

    const loadAllImages = async () => {
      // Use placeholder URL directly for the logo
      await fetchImageAsBase64(
        orderDetails.store.logo.lg, // This is now a placeholder URL
        setLogoBase64
      );

      // Using a local barcode image if you have one, otherwise a placeholder
      // If you have a barcode.png in your public/images folder:
      await fetchImageAsBase64(
        `/images/barcode.png`, // Assuming this is a local asset in your public folder
        setBarcodeBase64
      );
      // If you DON'T have a local barcode.png, use a placeholder like this:
      // await fetchImageAsBase64(
      //   `https://via.placeholder.com/100x50?text=Barcode`,
      //   setBarcodeBase64
      // );

      // Use placeholder URL directly for the bottom shape
      await fetchImageAsBase64(
        `https://via.placeholder.com/800x100?text=Invoice+Bottom+Shape`, // Placeholder for bottom shape
        setBottomShapeBase64
      );
    };

    loadAllImages();
  }, [orderDetails]); 

  // Convert total amount to words using the 'number-to-text' library
  // You need to ensure 'number-to-text' is correctly imported and used.
  // For demonstration, I'll keep it as a simple string if the library isn't fully set up.
  const amountInWords = orderDetails?.totalAmount
    ? // toWords(orderDetails.totalAmount, { currency: orderDetails.currency }) // Example usage if toWords is imported
      `One Hundred Sixty-Six and Seventy-One ${orderDetails.currency}` // Placeholder for amount in words
    : "";

  return (
    <>
      {orderDetails && (
        <div
          ref={invoiceRef} // Attach the ref here for html2canvas to capture
          className="content-container"
        >
          <header className="w-full">
            <div className="invoice-header-banner">
              <div className="invoice-banner-left">
                {/* Conditionally render logo using Base64 data */}
                {logoBase64 ? (
                  <img
                    src={logoBase64} // Use the Base64 data directly
                    alt={orderDetails.store.name}
                    className="logo"
                  />
                ) : (
                  // Placeholder while logo is loading or if there's an error
                  <div className="logo-placeholder">Loading Logo...</div>
                )}
              </div>
              <div className="invoice-banner-right">
                <div className="invoice-details ">
                  <h1 className="invoice-title">INVOICE</h1>
                  <img
                      src={'/images/barcode.png'} // Use the Base64 data directly
                      alt="barcode"
                      className=""
                    />
                
                  <p className="invoice-number">
                    Order No: #{orderDetails?.saleId}
                  </p>
                </div>
              </div>
            </div>
            <div className="invoice-header ">
              <div className="invoice-from">
                <p className="label">Invoice From:</p>
                <h2 className="title">{orderDetails.store.name}</h2>
                <div className="contact-details">
                  <p className="contact-item">
                    <MdOutlineCall size={24} className="svg-icon" />{" "}
                    <span>{orderDetails.store.phone}</span>
                  </p>
                  <p className="contact-item">
                    <FaRegEnvelope size={24} className="svg-icon" />{" "}
                    <span>{orderDetails.store.email}</span>
                  </p>
                  <p className="contact-item">
                    <MdOutlineMapsHomeWork size={24} className="svg-icon" />{" "}
                    <span>{orderDetails.store.address}</span>
                  </p>
                </div>
              </div>
              <div className="invoice-to">
                <div className="bill-to-section">
                  <p className="label">Invoice To:</p>
                  <h2 className="title">{orderDetails.store.name}</h2>
                  <div className="contact-details">
                    <p className="contact-item">
                      <MdOutlineCall size={24} className="svg-icon" />{" "}
                      <span>{orderDetails.store.phone}</span>
                    </p>
                    <p className="contact-item">
                      <FaRegEnvelope size={24} className="svg-icon" />{" "}
                      <span>{orderDetails.store.email}</span>
                    </p>
                    <p className="contact-item ">
                      <MdOutlineMapsHomeWork size={24} className="svg-icon" />{" "}
                      <span>{orderDetails.store.address}</span>
                    </p>
                    <p className="contact-item invoice-date-time ">
                      <SlCalender size={24} className="w-6 h-6 svg-icon" />
                      <span className="">
                        {orderDetails.saleDate.split("T")[0]}
                      </span>
                      <span>
                        Time: {orderDetails.saleDate.split("T")[1].slice(0, 8)}
                      </span>{" "}
                      {/* Adjusted time display */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="table-wrapper">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th className="table-header text-left">SL</th>
                  <th className="table-header text-left">Product Name</th>
                  <th className="table-header text-center">Qty</th>
                  <th className="table-header text-center">Unit Price</th>
                  {showTableDiscount && (
                    <th className="table-header text-center">Discount</th>
                  )}
                  <th className="table-header text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.lineItems.map((p, indx) => (
                  <tr
                    className={`table-row ${indx % 2 === 0 ? "even" : "odd"}`}
                    key={indx}
                  >
                    <td className="table-cell">{indx + 1}</td>
                    <td className="table-cell description">
                      {p.name}
                      {p?.attributes?.length
                        ? ` (${p.attributes.join("|")})`
                        : ""}
                    </td>
                    <td className="table-cell text-center">{p.quantity}</td>
                    <td className="table-cell text-center">{p.unitPrice}</td>
                    {p.discount?.value > 0 && (
                      <td className="table-cell text-center">
                        {p.discount?.value}
                      </td>
                    )}
                    <td className="table-cell text-right">
                      {p.totalAfterDiscount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary-grid">
            <div className="summary-left">
              <div>
                <h3 className="summary-label">Payment Method:</h3>
                <p className="summary-value">
                  {orderDetails.payments[orderDetails.payments.length - 1]
                    ?.account?.type || "Cash on delivery"}
                </p>
              </div>
              <div>
                <h3 className="summary-label">Terms and Conditions:</h3>
                <p className="summary-value">
                  {orderDetails.terms ||
                    "Delivery timelines are estimates and not guaranteed. Seller is not liable for delays caused by third-party carriers."}
                </p>
              </div>
              <div className="in-words">
                <p>In Words:</p>
                <p>
                  {amountInWords
                    ? `${amountInWords} ${orderDetails.currency}`
                    : "Zero"}
                </p>
              </div>

              <div className="point-summary flex-table flex flex-row gap-5">
                <div className="qr-code ">
                  {/* You might want to generate an actual QR code here based on some data */}
                  <MdQrCode2 size={24} className="w-24 h-24 " />
                </div>
                <div>
                  <table className="summary-table points">
                    <tbody>
                      <tr className="row-light">
                        <td className="">Previous Point Balance </td>
                        <td>{orderDetails.subtotal || 0}</td>{" "}
                        {/* This seems like a placeholder for point balance */}
                      </tr>
                      <tr>
                        <td className="row-light">Current Point Balance </td>
                        <td>{orderDetails.discount?.value || 0}</td>{" "}
                        {/* This seems like a placeholder for point balance */}
                      </tr>
                      <tr className="row-light">
                        <td className="">Total Point Balance</td>
                        <td>{orderDetails.vat?.amount || 0}</td>{" "}
                        {/* This seems like a placeholder for point balance */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="summary-right">
              <table className="summary-table summary-box">
                <tbody>
                  <tr className="row-light">
                    <td className="uppercase">SubTotal</td>
                    <td>{orderDetails.subtotal?.toFixed(2) || "0.00"}</td>
                  </tr>
                  <tr>
                    <td className="uppercase">Discount</td>
                    <td>
                      {orderDetails.discount?.value?.toFixed(2) || "0.00"}
                    </td>
                  </tr>
                  <tr className="row-light">
                    <td className="uppercase">Vat</td>
                    <td>{orderDetails.vat?.amount?.toFixed(2) || "0.00"}</td>
                  </tr>
                  <tr>
                    <td className="uppercase">Labor Charge</td>
                    <td>{orderDetails.laborCost?.toFixed(2) || "0.00"}</td>
                  </tr>
                  <tr className="due-row ">
                    <td className="uppercase">Delivery Charge</td>
                    <td>{orderDetails.deliveryCost?.toFixed(2) || "0.00"}</td>
                  </tr>
                  <tr className="grand-total bg-[#71bafb]">
                    <td className="uppercase">Grand Total</td>
                    <td>{orderDetails.totalAmount?.toFixed(2) || "0.00"}</td>
                  </tr>
                  <tr className="paid-amount bg-[#71bafb]">
                    <td className="uppercase">Paid Amount</td>
                    <td>{orderDetails.totalPaid?.toFixed(2) || "0.00"}</td>
                  </tr>
                  <tr className="due-row">
                    <td className="uppercase">Current Due</td>
                    <td>{orderDetails.totalRemaining?.toFixed(2) || "0.00"}</td>
                  </tr>
                  <tr className="due-row">
                    <td className="uppercase">Total Due</td>
                    <td>{orderDetails.totalRemaining?.toFixed(2) || "0.00"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="invoice-shape">
            {/* Conditionally render bottom shape using Base64 data */}
            {bottomShapeBase64 ? (
              <img
                src={bottomShapeBase64} // Use the Base64 data directly
                alt="shape"
              />
            ) : (
              // Placeholder while bottom shape is loading or if there's an error
              <div className="shape-placeholder">Loading Shape...</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TestInvoice;