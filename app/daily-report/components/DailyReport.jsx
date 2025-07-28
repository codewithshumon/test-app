"use client";

import {
  CurrencyToWords,
  formateDate,
  formateTime,
  toCapitalize,
} from "../utils";
import { address, calander, email, padiStamp, phone, qrCode } from "../iconSet";
import SvgIcon from "./SvgIcon";
import "../css/style.css";

const DailyReport = ({ setting, orderDetails, pdfRef, className }) => {
  const showTableDiscount =
    orderDetails?.lineItems?.some((p) => p.discount?.value > 0) ?? false;

  console.log("[### setting]", setting);
  console.log("[### orderDetails]", orderDetails);

  return (
    <>
      {setting && orderDetails && (
        <div ref={pdfRef} className="content-container">
          <header className="main-header">
            <div className="invoice-header-banner">
              <div className="invoice-banner-left">
                <img
                  src={`https://bazrin.com/${setting.invoice.invoiceInfo.logo.lg}`}
                  alt={setting.invoice.invoiceInfo.name}
                  className="logo"
                />
              </div>
              <div className="invoice-banner-right">
                <div className="invoice-details">
                  <h1 className="invoice-title">REPORT</h1>
                  <img
                    src={`https://bazrin.com/images/barcode.png`}
                    alt="barcode"
                    className="w-[100%]"
                  />
                  <p className="invoice-number">{orderDetails?.saleId}</p>
                </div>
              </div>
            </div>
            <div className="invoice-header invoice-to-and-from">
              <div className="invoice-from">
                <h2 className="title">
                  {setting.invoice.invoiceInfo.name || "N/A"}
                </h2>
                <div className="contact-details">
                  <p className="contact-item">
                    <SvgIcon data={phone} size={24} className="svg-icon" />{" "}
                    <span>
                      {setting.invoice.invoiceInfo.phones[0] || "N/A"}
                    </span>
                  </p>
                  <p className="contact-item">
                    <SvgIcon data={email} size={24} className="svg-icon" />{" "}
                    <span>{setting.invoice.invoiceInfo.email || "N/A"}</span>
                  </p>
                  <p className="contact-item">
                    <SvgIcon data={address} size={24} className="svg-icon" />{" "}
                    <span>{setting.invoice.invoiceInfo.address || "N/A"}</span>
                  </p>
                  <p className="contact-item invoice-date-time">
                    <SvgIcon data={calander} size={24} className="svg-icon" />
                    <span className="">
                      {formateDate(orderDetails.saleDate.split("T")[0])}
                    </span>
                    <span>
                      Time: {formateTime(orderDetails.saleDate.split("T")[1])}
                    </span>
                  </p>
                </div>
              </div>
              <div className="invoice-to">
                <div className="bill-to-section">
                  <div className="qr-code">
                    <SvgIcon
                      data={qrCode}
                      size={24}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="">
                    <div>
                      <p>Report Generated Time</p>
                      <div className="report-generate-date-time">
                        <span className="">
                          {formateDate(orderDetails.saleDate.split("T")[0])}
                        </span>
                        <span>
                          Time:{" "}
                          {formateTime(orderDetails.saleDate.split("T")[1])}
                        </span>
                      </div>
                    </div>
                    <div className="report-delivery-date-time">
                      <p>Report Generated Time</p>
                      <div className="report-generate-date-time">
                        <span className="">
                          {formateDate(orderDetails.saleDate.split("T")[0])}
                        </span>
                        <span>
                          Time:{" "}
                          {formateTime(orderDetails.saleDate.split("T")[1])}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="table-wrapper">
            <table className="invoice-table">
              <thead>
                <tr className="invoice-table-bg">
                  <th className="table-header">SL</th>
                  <th className="table-header">Customer Name</th>
                  <th className="table-header">Balance</th>
                  <th className="table-header" style={{ whiteSpace: "nowrap" }}>
                    Suc. Requests
                  </th>

                  <th className="table-header">Suc. Messages</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.lineItems.map((p, indx) => (
                  <tr
                    className={`table-row ${
                      indx % 2 === 0 ? "bg-white" : "bg-[#f5f5f7]"
                    }`}
                    key={indx}
                  >
                    <td className="table-cell">{indx + 1}</td>
                    <td className="table-cell max-w-[20rem] whitespace-break-spaces">
                      {p.name}
                      {p?.attributes?.length
                        ? ` (${toCapitalize(p.attributes.join("|"))})`
                        : ""}
                    </td>
                    <td className="table-cell text-center">{p.quantity}</td>
                    <td className="table-cell text-center">{p.unitPrice}</td>
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
              <div className="summary-margin-up in-words">
                <p className="text-[0.7rem] font-semibold uppercase">
                  In Words:
                </p>
                <p className="in-words-value cursive-font">
                  {CurrencyToWords(
                    orderDetails?.totalAmount + (orderDetails?.otherCost || 0)
                  )}
                </p>
              </div>

            

              <div className="summary-margin-up">
                <h3 className="summary-label">Terms and Conditions:</h3>
                <p className="summary-value">
                  {orderDetails.terms ||
                    "Delivery timelines are estimates and not guaranteed. Seller is not liable for delays caused by third-party carriers."}
                </p>
              </div>
            </div>

            <div className="summary-right">
              <table className="summary-table summary-box">
                <tbody>
                  <tr className="">
                    <td className="text-[#1e1e1ede] uppercase">
                      Last Day Messages
                    </td>
                    <td className="text-[#1e1e1ede] text-right">
                      {orderDetails.subtotal || 0}
                    </td>
                  </tr>
                  <tr className="due-row ">
                    <td className="text-[#1e1e1ede] uppercase">
                      Previous Messages
                    </td>
                    <td className="text-[#1e1e1ede] text-right">
                      {orderDetails.deliveryCost || 0}
                    </td>
                  </tr>
                  <tr className="grand-total">
                    <td className="text-white font-semibold uppercase">
                      Grand Total
                    </td>
                    <td className="text-white font-semibold text-right">
                      {orderDetails.totalAmount || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
              {orderDetails.totalRemaining <= 0 && (
                <div className="paid-stamp">
                  <SvgIcon
                    data={padiStamp}
                    size={24}
                    className="paid-stamp-icon"
                    color="#1678CF"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="invoice-shape">
            <img
              src={`https://bazrin.com/images/invoice-bottom-shape.png`}
              alt="shape"
              className="w-full border-none object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DailyReport;
