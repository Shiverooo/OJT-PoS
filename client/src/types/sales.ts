export interface Sale {
  id: string;
  amount: number;
  orderNumber: string;
  date: string;
  time: string;
  paymentType: string;
  change?: number;
  items: {
    name: string;
    qty: number;
    price: number;
  }[];
}

