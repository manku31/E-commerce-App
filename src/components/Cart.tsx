import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, checkout } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price / 100);
  };

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      {items.map((item) => (
        <div
          key={item.product.ProductID}
          className="flex items-center justify-between py-4 border-b"
        >
          <div className="flex items-center">
            <img
              src={item.product.ImageURL}
              alt={item.product.ProductName}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="ml-4">
              <h3 className="text-lg font-medium">{item.product.ProductName}</h3>
              <p className="text-gray-500">{formatPrice(item.product.Price)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.product.ProductID, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.ProductID, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.product.ProductID)}
              className="p-1 rounded-full hover:bg-gray-100 text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-medium">Total:</span>
        <span className="text-xl font-bold text-indigo-600">{formatPrice(total)}</span>
      </div>
      <button 
        onClick={checkout}
        className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}