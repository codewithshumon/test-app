import React from "react";

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
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center mb-4">
            {invoiceData.store.logo && (
              <img
                src={invoiceData.store.logo.md}
                alt="Store Logo"
                className="h-12 w-12 mr-3"
              />
            )}
            <h1 className="text-2xl font-bold text-gray-800">
              {invoiceData.store.name}
            </h1>
          </div>
          <p className="text-gray-600">{invoiceData.store.address}</p>
          <p className="text-gray-600">{invoiceData.store.phone}</p>
          <p className="text-gray-600">{invoiceData.store.email}</p>
        </div>

        <div className="text-right">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">INVOICE</h2>
          <p className="text-gray-600">
            Invoice #: {invoiceData.quotationInfo.quotationNumber}
          </p>
          <p className="text-gray-600">
            Date: {formatDate(invoiceData.saleDate)}
          </p>
          <p className="text-gray-600">
            Status:
            <span
              className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                invoiceData.paymentStatus === "PAID"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {invoiceData.paymentStatus}
            </span>
          </p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Bill To:</h3>
        <p className="font-medium text-gray-800">
          {invoiceData.customerInfo.name}
        </p>
        <p className="text-gray-600">{invoiceData.customerInfo.address}</p>
        <p className="text-gray-600">{invoiceData.customerInfo.phone}</p>
        <p className="text-gray-600">{invoiceData.customerInfo.email}</p>
      </div>

      {/* Items Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attributes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoiceData.lineItems.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500">{item.productId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.attributes.map((attr, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1"
                    >
                      {attr}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity} {item.unit.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoiceData.currency} {item.unitPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoiceData.currency} {item.totalAfterDiscount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64">
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">
              {invoiceData.currency} {invoiceData.subtotal.toFixed(2)}
            </span>
          </div>
          {invoiceData.discount && (
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Discount:</span>
              <span className="font-medium text-red-500">
                -{invoiceData.currency} {invoiceData.discount.value.toFixed(2)}
              </span>
            </div>
          )}
          {invoiceData.deliveryCost && (
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Delivery:</span>
              <span className="font-medium">
                {invoiceData.currency} {invoiceData.deliveryCost.toFixed(2)}
              </span>
            </div>
          )}
          {invoiceData.vat && (
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">VAT:</span>
              <span className="font-medium">
                {invoiceData.currency} {invoiceData.vat.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between py-4 border-b-2 border-gray-300">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold">
              {invoiceData.currency} {invoiceData.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium">
              {invoiceData.currency} {invoiceData.totalPaid.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between py-2 bg-gray-50 px-2 rounded">
            <span className="text-gray-800 font-semibold">Balance Due:</span>
            <span className="font-bold text-indigo-600">
              {invoiceData.currency} {invoiceData.totalRemaining.toFixed(2)}
            </span>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              Please make all checks payable to {invoiceData.store.name}
            </p>
            <p className="mt-4">
              Invoice generated by: {invoiceData.saleBy.name}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>Thank you for your business!</p>
        <p className="mt-1">
          Please make all checks payable to {invoiceData.store.name}
        </p>
        <p className="mt-4">Invoice generated by: {invoiceData.saleBy.name}</p>
      </div>
    </div>
  );
};

export default ModernInvoice;
