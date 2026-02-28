import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
            <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50 flex justify-between">
              <h1 className="text-2xl font-extrabold tracking-tight">CarParts Store</h1>
              <nav className="space-x-4 mt-1 font-semibold">
                <a href="/" className="hover:text-amber-200 transition-colors">Ana Sayfa</a>
                <a href="/cart" className="hover:text-amber-200 transition-colors">Sepetim</a>
                <a href="/login" className="hover:text-amber-200 transition-colors">Giriş</a>
              </nav>
            </header>
            <main className="flex-1 container mx-auto p-4 max-w-7xl w-full">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Route>

                <Route element={<ProtectedRoute requiredRole="Admin" />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
