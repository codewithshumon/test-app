"use client";

import {
  CurrencyToWords,
  formateDate,
  formateTime,
  toCapitalize,
} from "../currencyToWords";
import { address, calander, email, padiStamp, phone, qrCode } from "../iconSet";
import SvgIcon from "./SvgIcon";

const DailyReport = ({ setting, orderDetails, pdfRef, className }) => {
  const showTableDiscount =
    orderDetails?.lineItems?.some((p) => p.discount?.value > 0) ?? false;

    console.log('[### setting]', setting);
    console.log('[### orderDetails]', orderDetails);
    

  return (
    <>
      {setting && orderDetails && (
        <div
          ref={pdfRef}
          className="relative content-container bg-white p-12 shadow-[0_1px_4px_rgba(0,0,0,0.12)] print:shadow-none pb-52"
        >
          <header className="w-full main-header">
            <div className="invoice-header-banner flex items-end justify-between pb-10">
              <div className="invoice-banner-left w-1/2">
                <img
                  src={`https://bazrin.com/${setting.invoice.invoiceInfo.logo.lg}`}
                  alt={setting.invoice.invoiceInfo.name}
                  className="logo h-[200px] w-[250px] object-contain"
                />
              </div>
              <div className="invoice-banner-right w-1/2 h-full flex items-end flex-col">
                <div className="invoice-details h-[70%] flex flex-col justify-end items-end gap-3">
                  <h1 className="invoice-title text-[1.5rem]">INVOICE</h1>
                  <img
                    src={`https://bazrin.com/images/barcode.png`}
                    alt="barcode"
                    className="w-[100%]"
                  />
                  <p className="invoice-number text-[1.5rem]">
                    {orderDetails?.saleId}
                  </p>
                </div>
              </div>
            </div>
            <div className="invoice-header flex items-start gap-20 invoice-to-and-from">
              <div className="invoice-from w-1/2">
                <p className="label text-[1.25rem] text-[#403f3f] font-normal uppercase">
                  Invoice From:
                </p>
                <h2 className="title text-[1.5rem]  font-semibold uppercase my-4">
                  {setting.invoice.invoiceInfo.name || "N/A"}
                </h2>
                <div className="contact-details pt-6 border-t border-[#808080]">
                  <p className="contact-item flex items-center gap-2 text-base text-[#808080] font-medium mb-1">
                    <SvgIcon
                      data={phone}
                      size={24}
                      className="w-6 h-6 svg-icon"
                    />{" "}
                    <span>
                      {setting.invoice.invoiceInfo.phones[0] || "N/A"}
                    </span>
                  </p>
                  <p className="contact-item flex items-center gap-2 text-base text-[#808080] font-medium mb-1">
                    <SvgIcon
                      data={email}
                      size={24}
                      className="w-6 h-6 svg-icon"
                    />{" "}
                    <span>{setting.invoice.invoiceInfo.email || "N/A"}</span>
                  </p>
                  <p className="contact-item flex items-center gap-2 text-base text-[#808080] font-medium mb-1">
                    <SvgIcon
                      data={address}
                      size={24}
                      className="w-6 h-6 svg-icon"
                    />{" "}
                    <span>{setting.invoice.invoiceInfo.address || "N/A"}</span>
                  </p>
                  <p className="contact-item invoice-date-time flex items-center gap-2 text-base text-[#808080] font-medium mb-1">
                    <SvgIcon
                      data={calander}
                      size={24}
                      className="w-6 h-6 svg-icon"
                    />
                    <span className="">
                      {formateDate(orderDetails.saleDate.split("T")[0])}
                    </span>
                    <span>
                      Time: {formateTime(orderDetails.saleDate.split("T")[1])}
                    </span>
                  </p>
                </div>
              </div>
              <div className="invoice-to w-1/2">
                <div className="bill-to-section">
                  <p className="label text-[1.25rem] text-[#403f3f] font-normal uppercase">
                    Invoice To:
                  </p>
                  <h2 className="title text-[1.5rem] font-semibold uppercase my-4">
                    {orderDetails.customerInfo?.name || "Guest"}
                  </h2>
                  <div className="qr-code w-28 h-28 mb-4">
                    <SvgIcon
                      data={qrCode}
                      size={24}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="table-wrapper mt-10">
            <table className="invoice-table w-full border border-[#d9d9d9]">
              <thead>
                <tr className="invoice-table-bg">
                  <th className="table-header text-left p-3 text-white bg-blue-500 font-medium border-b border-[#d9d9d9]">
                    SL
                  </th>
                  <th className="table-header text-left p-3 text-white bg-blue-500  font-medium border-b border-[#d9d9d9]">
                    Product Name
                  </th>
                  <th className="table-header text-center p-3 text-white bg-blue-500  font-medium border-b border-[#d9d9d9]">
                    Qty
                  </th>
                  <th
                    className="table-header text-center p-3 text-white bg-blue-500  font-medium border-b border-[#d9d9d9]"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Unit Price
                  </th>
                  {showTableDiscount && (
                    <th className="table-header text-center p-3 text-white bg-blue-500  font-medium border-b border-[#d9d9d9]">
                      Discount
                    </th>
                  )}
                  <th className="table-header text-right p-3 text-white bg-blue-500  font-medium border-b border-[#d9d9d9]">
                    Total
                  </th>
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
                    <td className="table-cell p-3 border-b border-[#d9d9d9]">
                      {indx + 1}
                    </td>
                    <td className="table-cell p-3 border-b border-[#d9d9d9] max-w-[20rem] whitespace-break-spaces">
                      {p.name}
                      {p?.attributes?.length
                        ? ` (${toCapitalize(p.attributes.join("|"))})`
                        : ""}
                    </td>
                    <td className="table-cell p-3 border-b border-[#d9d9d9] text-center">
                      {p.quantity}
                    </td>
                    <td className="table-cell p-3 border-b border-[#d9d9d9] text-center">
                      {p.unitPrice}
                    </td>
                    {showTableDiscount && (
                      <td className="table-cell p-3 border-b border-[#d9d9d9] text-center">
                        {p.discount?.value}
                      </td>
                    )}
                    <td className="table-cell p-3 border-b border-[#d9d9d9] text-right">
                      {p.totalAfterDiscount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary-grid grid grid-cols-2 gap-3">
            <div className="summary-left flex flex-col gap-5 justify-center">
              <div className="summary-margin-payment flex flex-col gap-3">
                <h3 className="summary-label text-base text-[#252525] font-medium">
                  Payment Method:
                </h3>
                <p className="summary-value text-[0.875rem] text-[#808080] font-medium -mt-2">
                  {orderDetails.payments[orderDetails.payments.length - 1]
                    ?.account?.type || "Cash on delivery"}
                </p>
              </div>
              <div className=" summary-margin-up in-words flex flex-col gap-3">
                <p className="text-[0.7rem] font-semibold uppercase">
                  In Words:
                </p>
                <p className="in-words-value cursive-font text-[0.7rem] font-semibold ">
                  {CurrencyToWords(
                    orderDetails?.totalAmount + (orderDetails?.otherCost || 0)
                  )}
                </p>
              </div>

              <div className="point-summary flex-table flex flex-row gap-5 mt-3">
                <div className="qr-code w-28 h-28 mb-4">
                  <SvgIcon data={qrCode} size={24} className="w-full h-full" />
                </div>
                <div>
                  <table className="summary-table points w-full border border-[#D9D9D9]">
                    <tbody>
                      <tr className="bg-[#f5f5f7]">
                        <td className="p-2 border-b border-[#D9D9D9] text-[0.7rem] text-[#1e1e1ede]">
                          Previous Point Balance
                        </td>
                        <td className="p-2 border-b border-[#D9D9D9] text-[0.7rem] text-[#1e1e1ede] text-right">
                          {orderDetails.subtotal || 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border-b border-[#D9D9D9] text-[0.7rem] text-[#1e1e1ede]">
                          Current Point Balance
                        </td>
                        <td className="p-2 border-b border-[#D9D9D9] text-[0.7rem] text-[#1e1e1ede] text-right">
                          {orderDetails.discount?.value || 0}
                        </td>
                      </tr>
                      <tr className="bg-[#f5f5f7]">
                        <td className="p-2 border-b border-[#D9D9D9] text-[0.7rem] text-[#1e1e1ede]">
                          Total Point Balance
                        </td>
                        <td className="p-2 border-b border-[#D9D9D9] text-[0.7rem] text-[#1e1e1ede] text-right">
                          {orderDetails.vat?.amount || 0}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="summary-margin-up flex flex-col gap-3 ">
                <h3 className="summary-label text-base text-[#252525] font-medium">
                  Terms and Conditions:
                </h3>
                <p className="summary-value text-[0.875rem] text-[#808080] font-medium -mt-2">
                  {orderDetails.terms ||
                    "Delivery timelines are estimates and not guaranteed. Seller is not liable for delays caused by third-party carriers."}
                </p>
              </div>
            </div>

            <div className="summary-right">
              <table className="summary-table summary-box w-full border border-[#D9D9D9]">
                <tbody>
                  <tr className="">
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] uppercase">
                      SubTotal
                    </td>
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] text-right">
                      {orderDetails.subtotal || 0}
                    </td>
                  </tr>
                  <tr className="bg-[#f5f5f7]">
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] uppercase">
                      Discount
                    </td>
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] text-right">
                      {(
                        orderDetails.subtotal - orderDetails.totalAfterDiscount
                      ).toFixed(2) || 0}
                    </td>
                  </tr>
                  <tr className="">
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] uppercase">
                      Vat
                    </td>
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] text-right">
                      {orderDetails.vat?.amount || 0}
                    </td>
                  </tr>
                  <tr className="bg-[#f5f5f7]">
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] uppercase">
                      Labor Charge
                    </td>
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] text-right">
                      {orderDetails.laborCost || 0}
                    </td>
                  </tr>
                  <tr className="due-row ">
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] uppercase">
                      Delivery Charge
                    </td>
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] text-right">
                      {orderDetails.deliveryCost || 0}
                    </td>
                  </tr>
                  <tr className="grand-total bg-blue-500 ">
                    <td className="p-3 border-b border-[#D9D9D9] text-[1.25rem] text-white font-semibold uppercase">
                      Grand Total
                    </td>
                    <td className="p-3 border-b border-[#D9D9D9] text-[1.25rem] text-white font-semibold text-right">
                      {orderDetails.totalAmount || 0}
                    </td>
                  </tr>
                  <tr className="paid-amount bg-[#b7dbfa] ">
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] font-medium uppercase">
                      Paid Amout
                    </td>
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] font-medium text-right">
                      {orderDetails.totalPaid || 0}
                    </td>
                  </tr>
                  <tr className="due-row ">
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] uppercase">
                      Current Due
                    </td>
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] text-right">
                      {orderDetails.totalRemaining || 0}
                    </td>
                  </tr>
                  <tr className="due-row bg-[#f5f5f7]">
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] uppercase">
                      Total Due
                    </td>
                    <td className="p-3 border-b border-[#D9D9D9] text-base text-[#1e1e1ede] text-right">
                      {orderDetails.totalRemaining || 0}
                    </td>
                  </tr>
                </tbody>
              </table>
              {orderDetails.totalRemaining <= 0 && (
                <div className="paid-stamp mt-10 w-full flex justify-center">
                  <SvgIcon
                    data={padiStamp}
                    size={24}
                    className="w-24 h-24 paid-stamp-icon"
                    color="#1678CF"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="invoice-shape absolute left-0 bottom-0 w-full h-48">
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
