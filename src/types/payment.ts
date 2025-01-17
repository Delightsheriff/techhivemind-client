interface ReceiptProduct {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  images: string[];
}

export interface ReceiptResponse {
  receiptDetails: {
    orderId: string;
    orderDate: string;
    paymentDate: string;
    paymentReference: string;
    paymentMethod: string;
    cardType?: string;
    last4?: string;
  };
  customerDetails: {
    email: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  products: ReceiptProduct[];
  paymentSummary: {
    subtotal: number;
    processingFee: number;
    total: number;
    currency: string;
  };
}
