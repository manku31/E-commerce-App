import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { products, purchaseHistory } from '../data/mockData';
import { User } from 'lucide-react';

export default function UserProfile() {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price / 100);
  };

  const orders = getUserOrders();
  const historicalPurchases = purchaseHistory
    .filter((ph) => ph.UserID === user?.UserID)
    .map((ph) => ({
      ...ph,
      product: products.find((p) => p.ProductID === ph.ProductID)!
    }))
    .sort((a, b) => new Date(b.PurchaseDate).getTime() - new Date(a.PurchaseDate).getTime());

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-indigo-600" />
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-bold">{user?.Username}</h2>
          <p className="text-gray-500">User ID: {user?.UserID}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
      <div className="space-y-4 mb-8">
        {orders.map((order) => (
          <div key={order.orderId} className="border rounded-lg p-4">
            <div className="mb-2">
              <p className="text-sm text-gray-500">Order ID: {order.orderId}</p>
              <p className="text-sm text-gray-500">Date: {formatDate(order.orderDate)}</p>
              <p className="font-medium text-indigo-600">Total: {formatPrice(order.totalAmount)}</p>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.product.ProductID} className="flex items-center">
                  <img
                    src={item.product.ImageURL}
                    alt={item.product.ProductName}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="ml-3">
                    <p className="font-medium">{item.product.ProductName}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-4">Purchase History</h3>
      <div className="space-y-4">
        {historicalPurchases.map((purchase) => (
          <div
            key={`${purchase.ProductID}-${purchase.PurchaseDate}`}
            className="border rounded-lg p-4"
          >
            <div className="flex items-center">
              <img
                src={purchase.product.ImageURL}
                alt={purchase.product.ProductName}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <h4 className="font-medium">{purchase.product.ProductName}</h4>
                <p className="text-gray-500">{purchase.product.Category}</p>
                <p className="text-indigo-600 font-medium">
                  {formatPrice(purchase.product.Price)}
                </p>
                <p className="text-sm text-gray-500">
                  Purchased on {formatDate(purchase.PurchaseDate)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}