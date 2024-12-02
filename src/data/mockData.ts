import { User, Product, PurchaseHistory } from '../types';

export const users: User[] = [
  { UserID: 1, Username: 'user1', Password: 'password123' },
  { UserID: 2, Username: 'user2', Password: 'password123' },
  { UserID: 3, Username: 'user3', Password: 'password123' },
];

export const products: Product[] = [
  { ProductID: 101, ProductName: 'Classic White Shirt', Category: 'Tops', Price: 2399, ImageURL: 'https://via.placeholder.com/150' },
  { ProductID: 102, ProductName: 'Denim Jeans', Category: 'Bottoms', Price: 3999, ImageURL: 'https://via.placeholder.com/150' },
  { ProductID: 103, ProductName: 'Leather Jacket', Category: 'Outerwear', Price: 7299, ImageURL: 'https://via.placeholder.com/150' },
  { ProductID: 104, ProductName: 'Black T-Shirt', Category: 'Tops', Price: 1599, ImageURL: 'https://via.placeholder.com/150' },
  { ProductID: 105, ProductName: 'Chinos', Category: 'Bottoms', Price: 3199, ImageURL: 'https://via.placeholder.com/150' },
  { ProductID: 106, ProductName: 'Hoodie', Category: 'Outerwear', Price: 4799, ImageURL: 'https://via.placeholder.com/150' },
  { ProductID: 107, ProductName: 'Striped Shirt', Category: 'Tops', Price: 2799, ImageURL: 'https://via.placeholder.com/150' },
  { ProductID: 108, ProductName: 'Shorts', Category: 'Bottoms', Price: 1999, ImageURL: 'https://via.placeholder.com/150' },
  { ProductID: 109, ProductName: 'Blazer', Category: 'Outerwear', Price: 7999, ImageURL: 'https://via.placeholder.com/150' },
  { ProductID: 110, ProductName: 'Graphic Tee', Category: 'Tops', Price: 1999, ImageURL: 'https://via.placeholder.com/150' },
];

export const purchaseHistory: PurchaseHistory[] = [
  { UserID: 1, ProductID: 101, PurchaseDate: '2023-01-15' },
  { UserID: 1, ProductID: 104, PurchaseDate: '2023-02-20' },
  { UserID: 1, ProductID: 105, PurchaseDate: '2023-03-05' },
  { UserID: 2, ProductID: 102, PurchaseDate: '2023-01-25' },
  { UserID: 2, ProductID: 106, PurchaseDate: '2023-04-18' },
  { UserID: 3, ProductID: 103, PurchaseDate: '2023-02-10' },
  { UserID: 3, ProductID: 107, PurchaseDate: '2023-03-22' },
  { UserID: 3, ProductID: 108, PurchaseDate: '2023-05-30' },
];