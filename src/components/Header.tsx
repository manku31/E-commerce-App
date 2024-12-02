import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { LogOut, ShoppingBag, User, ShoppingCart } from 'lucide-react';
import Cart from './Cart';
import UserProfile from './UserProfile';

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-bold text-gray-900 ml-2">E-Commerce Store</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
            >
              <User className="w-5 h-5" />
              <span>{user?.Username}</span>
            </button>

            <button
              onClick={() => setShowCart(!showCart)}
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {showCart && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <Cart />
        </div>
      )}

      {showProfile && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <UserProfile />
        </div>
      )}
    </header>
  );
}