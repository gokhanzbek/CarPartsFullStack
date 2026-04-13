import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider, CartContext } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import VehicleDetail from './pages/VehicleDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Car, ShoppingCart } from 'lucide-react';
import { useContext } from 'react';

function AppContent() {
  const { cartItems } = useContext(CartContext);
  const { token, role } = useContext(AuthContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isAdmin = role === 'Admin';

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-slate-900/90 text-white backdrop-blur shadow-sm">
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 lg:px-6">
            <Link to="/" className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight">
              <span className="rounded-lg bg-slate-700/80 p-2">
                <Car className="h-5 w-5 text-orange-400" />
              </span>
              <span>CarParts Store</span>
            </Link>
            <nav className="flex items-center gap-5 font-semibold">
              <Link to="/" className="text-slate-100 transition-colors hover:text-orange-300">Ana Sayfa</Link>
              {!isAdmin && (
                <Link to="/cart" className="relative rounded-lg p-2 text-slate-100 transition-colors hover:bg-slate-800 hover:text-orange-300" title="Sepetim">
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold leading-none text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token ? (
                <Link to="/profile" className="text-slate-100 transition-colors hover:text-orange-300">Profilim</Link>
              ) : (
                <Link to="/login" className="text-slate-100 transition-colors hover:text-orange-300">Giriş</Link>
              )}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 lg:px-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/vehicle/:make/:model/:engine" element={<VehicleDetail />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<ProtectedRoute requiredRole="Admin" />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
