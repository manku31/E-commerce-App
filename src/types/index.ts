export interface User {
  UserID: number;
  Username: string;
  Password: string;
}

export interface Product {
  ProductID: number;
  ProductName: string;
  Category: string;
  Price: number;
  ImageURL: string;
}

export interface PurchaseHistory {
  UserID: number;
  ProductID: number;
  PurchaseDate: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  orderId: string;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
  status: 'pending' | 'completed';
}