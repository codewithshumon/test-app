import React from "react";
import '@/public/css/invoiceStyle.css'

const ModernInvoice = () => {
  const invoiceData = {
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
    paymentStatus: "UNPAID",
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="invoice-container">
      {/* Header */}
      <div className="invoice-header">
        <div>
          <div className="invoice-store-info">
            {invoiceData.store.logo && (
              <img
                src={invoiceData.store.logo.md}
                alt="Store Logo"
                className="invoice-store-logo"
              />
            )}
            <h1 className="invoice-store-name">
              {invoiceData.store.name}
            </h1>
          </div>
          <p className="invoice-store-details">{invoiceData.store.address}</p>
          <p className="invoice-store-details">{invoiceData.store.phone}</p>
          <p className="invoice-store-details">{invoiceData.store.email}</p>
        </div>

        <div className="invoice-meta-container">
          <h2 className="invoice-title">INVOICE</h2>
          <p className="invoice-meta">
            Invoice #: {invoiceData.quotationInfo.quotationNumber}
          </p>
          <p className="invoice-meta">
            Date: {formatDate(invoiceData.saleDate)}
          </p>
          <p className="invoice-meta">
            Status:
            <span
              className={`invoice-status ${
                invoiceData.paymentStatus === "PAID"
                  ? "invoice-status-paid"
                  : "invoice-status-unpaid"
              }`}
            >
              {invoiceData.paymentStatus}
            </span>
          </p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="invoice-customer">
        <h3 className="invoice-customer-title">Bill To:</h3>
        <p className="invoice-customer-name">
          {invoiceData.customerInfo.name}
        </p>
        <p className="invoice-customer-details">{invoiceData.customerInfo.address}</p>
        <p className="invoice-customer-details">{invoiceData.customerInfo.phone}</p>
        <p className="invoice-customer-details">{invoiceData.customerInfo.email}</p>
      </div>

      {/* Items Table */}
      <div className="invoice-table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Attributes</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.lineItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="invoice-item-name">
                    {item.name}
                  </div>
                  <div className="invoice-item-id">{item.productId}</div>
                </td>
                <td>
                  {item.attributes.map((attr, i) => (
                    <span
                      key={i}
                      className="invoice-attribute"
                    >
                      {attr}
                    </span>
                  ))}
                </td>
                <td className="invoice-item-qty">
                  {item.quantity} {item.unit.name}
                </td>
                <td className="invoice-item-price">
                  {invoiceData.currency} {item.unitPrice.toFixed(2)}
                </td>
                <td className="invoice-item-total">
                  {invoiceData.currency} {item.totalAfterDiscount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="invoice-totals">
        <div className="invoice-totals-container">
          <div className="invoice-total-row">
            <span className="invoice-total-label">Subtotal:</span>
            <span className="invoice-total-value">
              {invoiceData.currency} {invoiceData.subtotal.toFixed(2)}
            </span>
          </div>
          {invoiceData.discount && (
            <div className="invoice-total-row">
              <span className="invoice-total-label">Discount:</span>
              <span className="invoice-discount-value">
                -{invoiceData.currency} {invoiceData.discount.value.toFixed(2)}
              </span>
            </div>
          )}
          {invoiceData.deliveryCost && (
            <div className="invoice-total-row">
              <span className="invoice-total-label">Delivery:</span>
              <span className="invoice-total-value">
                {invoiceData.currency} {invoiceData.deliveryCost.toFixed(2)}
              </span>
            </div>
          )}
          {invoiceData.vat && (
            <div className="invoice-total-row">
              <span className="invoice-total-label">VAT:</span>
              <span className="invoice-total-value">
                {invoiceData.currency} {invoiceData.vat.toFixed(2)}
              </span>
            </div>
          )}
          <div className="invoice-grand-total">
            <span className="invoice-grand-total-label">Total:</span>
            <span className="invoice-grand-total-value">
              {invoiceData.currency} {invoiceData.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="invoice-total-row">
            <span className="invoice-total-label">Amount Paid:</span>
            <span className="invoice-total-value">
              {invoiceData.currency} {invoiceData.totalPaid.toFixed(2)}
            </span>
          </div>
          <div className="invoice-balance-due">
            <span className="invoice-balance-label">Balance Due:</span>
            <span className="invoice-balance-value">
              {invoiceData.currency} {invoiceData.totalRemaining.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="invoice-footer">
        <p>Thank you for your business!</p>
        <p>
          Please make all checks payable to {invoiceData.store.name}
        </p>
        <p>Invoice generated by: {invoiceData.saleBy.name}</p>
      </div>
    </div>
  );
};

export default ModernInvoice;