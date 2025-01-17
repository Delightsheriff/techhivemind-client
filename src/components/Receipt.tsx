import React from "react";
import { format } from "date-fns";
import { ReceiptResponse } from "@/types/payment";
import { formatPrice } from "@/lib/utils";

interface ReceiptProps {
  receipt: ReceiptResponse;
}

export const Receipt: React.FC<ReceiptProps> = ({ receipt }) => {
  const printReceipt = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Receipt #${receipt.receiptDetails.orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .details { margin-bottom: 20px; }
            .items { width: 100%; border-collapse: collapse; }
            .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .total { text-align: right; margin-top: 20px; }
            .payment-info { margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Order Receipt</h1>
            <p>Order #${receipt.receiptDetails.orderId}</p>
            <p>Date: ${format(
              new Date(receipt.receiptDetails.orderDate),
              "PPP"
            )}</p>
          </div>
          
          <div class="details">
            <h2>Shipping Address</h2>
            <p>${receipt.customerDetails.shippingAddress.street}</p>
            <p>${receipt.customerDetails.shippingAddress.city}, ${
      receipt.customerDetails.shippingAddress.state
    }</p>
            <p>${receipt.customerDetails.shippingAddress.country}, ${
      receipt.customerDetails.shippingAddress.postalCode
    }</p>
          </div>

          <table class="items">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${receipt.products
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${formatPrice(item.unitPrice)}</td>
                  <td>${formatPrice(item.totalPrice)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div class="total">
            <p>Subtotal: ${formatPrice(receipt.paymentSummary.subtotal)}</p>
            <p>Processing Fee: ${formatPrice(
              receipt.paymentSummary.processingFee
            )}</p>
            <h3>Total: ${formatPrice(receipt.paymentSummary.total)}</h3>
          </div>

          <div class="payment-info">
            <p>Payment Reference: ${receipt.receiptDetails.paymentReference}</p>
            <p>Payment Method: ${receipt.receiptDetails.paymentMethod}${
      receipt.receiptDetails.last4
        ? ` (**** ${receipt.receiptDetails.last4})`
        : ""
    }</p>
            <p>Payment Date: ${format(
              new Date(receipt.receiptDetails.paymentDate),
              "PPP"
            )}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="mt-4">
      <button
        onClick={printReceipt}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Print Receipt
      </button>
    </div>
  );
};
