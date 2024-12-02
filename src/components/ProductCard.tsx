import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, buyNow } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price / 100);
  };

  const handleBuyNow = () => {
    buyNow(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.ImageURL}
        alt={product.ProductName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.ProductName}</h3>
        <p className="text-sm text-gray-500">{product.Category}</p>
        <p className="mt-2 text-lg font-bold text-indigo-600">
          {formatPrice(product.Price)}
        </p>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}