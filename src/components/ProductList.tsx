import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';
import { products, purchaseHistory } from '../data/mockData';
import { Product } from '../types';

export default function ProductList() {
  const { user } = useAuth();

  const getUserPurchasedCategories = (userId: number): Set<string> => {
    const purchasedProductIds = purchaseHistory
      .filter((ph) => ph.UserID === userId)
      .map((ph) => ph.ProductID);
    
    const purchasedProducts = products.filter((p) => 
      purchasedProductIds.includes(p.ProductID)
    );
    
    return new Set(purchasedProducts.map((p) => p.Category));
  };

  const sortProducts = (): Product[] => {
    if (!user) return [];

    const purchasedCategories = getUserPurchasedCategories(user.UserID);
    
    const [unpurchasedProducts, purchasedProducts] = products.reduce<[Product[], Product[]]>(
      ([unpurchased, purchased], product) => {
        if (purchasedCategories.has(product.Category)) {
          purchased.push(product);
        } else {
          unpurchased.push(product);
        }
        return [unpurchased, purchased];
      },
      [[], []]
    );

    return [
      ...unpurchasedProducts.sort((a, b) => a.ProductName.localeCompare(b.ProductName)),
      ...purchasedProducts.sort((a, b) => a.ProductName.localeCompare(b.ProductName))
    ];
  };

  const sortedProducts = sortProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.ProductID} product={product} />
        ))}
      </div>
    </div>
  );
}