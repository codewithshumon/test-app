import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineCall,
  MdOutlineMapsHomeWork,
  MdQrCode2,
} from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

import "@/public/css/invoiceStyle.css";
import { numberToWords } from "number-to-text";
// import { numberToCurrencyWords } from "@codeshumon/number-to-words";

const NewInvoice = ({ invoiceRef }) => {
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
        lg: "storage/store-logo/36212973072453-lg.webp",
        md: "storage/store-logo/36212973072453-md.webp",
        sm: "storage/store-logo/36212973072453-sm.webp",
      },
      phone: "+8801725326327",
      email: "shumon@gmail.com",
      address: "Uttara, Dhaka",
    },
  };

  const [showTableDiscount, setShwoTableDiscount] = useState(false);

  useEffect(() => {
    setShwoTableDiscount(
      orderDetails?.lineItems?.some((p) => p.discount?.value > 0)
    );
  }, [orderDetails]);

  // console.log('[###### orderDetails]', orderDetails);
  // console.log('[###### store]', store);
  return (
    <>
      {orderDetails && (
        <div
          ref={invoiceRef}
          className="content-container"
        >
          <header className="w-full">
            <div className="invoice-header-banner">
              <div className="invoice-banner-left">
                <img
                  src={`https://bazrin.com/${orderDetails.store.logo.lg}`}
                  alt={orderDetails.store.name}
                  className="logo"
                />
              </div>
              <div className="invoice-banner-right">
                <div className="invoice-details ">
                  <h1 className="invoice-title">INVOICE</h1>
                  <img
                    src={`https://bazrin.com/images/barcode.png`}
                    alt="barcode"
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
                      <span>Time: {orderDetails.saleDate.split("T")[1]}</span>
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
                  {orderDetails?.totalAmount + (orderDetails?.otherCost || 0)}
                </p>
              </div>

              <div className="point-summary flex-table flex flex-row gap-5">
                <div className="qr-code ">
                  <MdQrCode2 size={24} className="w-24 h-24 " />
                </div>
                <div>
                  <table className="summary-table points">
                    <tbody>
                      <tr className="row-light">
                        <td className="">Previous Point Balance </td>
                        <td>{orderDetails.subtotal || 0}</td>
                      </tr>
                      <tr>
                        <td className="row-light">Current Point Balance </td>
                        <td>{orderDetails.discount?.value || 0}</td>
                      </tr>
                      <tr className="row-light">
                        <td className="">Total Point Balance</td>
                        <td>{orderDetails.vat?.amount || 0}</td>
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
                    <td>{orderDetails.subtotal || 0}</td>
                  </tr>
                  <tr>
                    <td className="uppercase">Discount</td>
                    <td>{orderDetails.discount?.value || 0}</td>
                  </tr>
                  <tr className="row-light">
                    <td className="uppercase">Vat</td>
                    <td>{orderDetails.vat?.amount || 0}</td>
                  </tr>
                  <tr>
                    <td className="uppercase">Labor Charge</td>
                    <td>{orderDetails.laborCost || 0}</td>
                  </tr>
                  <tr className="due-row ">
                    <td className="uppercase">Delivery Charge</td>
                    <td>{orderDetails.deliveryCost || 0}</td>
                  </tr>
                  <tr className="grand-total bg-[#71bafb]">
                    <td className="uppercase">Grand Total</td>
                    <td>{orderDetails.totalAmount || 0}</td>
                  </tr>
                  <tr className="paid-amount bg-[#71bafb]">
                    <td className="uppercase">Paid Amout</td>
                    <td>{orderDetails.totalPaid || 0}</td>
                  </tr>
                  <tr className="due-row">
                    <td className="uppercase">Current Due</td>
                    <td>{orderDetails.totalRemaining || 0}</td>
                  </tr>
                  <tr className="due-row">
                    <td className="uppercase">Total Due</td>
                    <td>{orderDetails.totalRemaining || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="invoice-shape">
            <img
              src={`https://bazrin.com/images/invoice-bottom-shape.png`}
              alt="shape"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NewInvoice;
