import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import ProductList from './components/ProductList';

function MainContent() {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <ProductList />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <MainContent />
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;