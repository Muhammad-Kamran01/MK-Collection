import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import Contact from '@/pages/Contact';
import TrackOrder from '@/pages/TrackOrder';
import ShippingReturns from '@/pages/ShippingReturns';
import TermsOfService from '@/pages/TermsOfService';
import PaymentMethods from '@/pages/PaymentMethods';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Sustainability from '@/pages/Sustainability';
import About from '@/pages/About';
import Wishlist from '@/pages/Wishlist';
import { WishlistProvider } from '@/contexts/WishlistContext';

const Success = () => (
  <div className="py-32 text-center max-w-xl mx-auto px-4">
    <div className="w-20 h-20 bg-state-success/10 text-state-success rounded-full flex items-center justify-center mx-auto mb-8">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    </div>
    <h1 className="text-4xl font-display mb-4">Order Successful!</h1>
    <p className="text-gray-500 mb-10">Thank you for shopping with MK COLLECTION. Your order has been placed successfully and is being processed.</p>
    <a href="/" className="btn-primary">Back to Home</a>
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Helmet>
        <title>MK COLLECTION | Premium Pakistani Women Clothing</title>
        <meta name="description" content="Shop the latest collection of premium Pakistani women's clothing. Ready-to-wear, unstitched, and formal collections from MK COLLECTION." />
        <meta property="og:title" content="MK COLLECTION | Premium Pakistani Women Clothing" />
        <meta property="og:description" content="Shop the latest collection of premium Pakistani women's clothing." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mkcollection.pk" />
      </Helmet>
      
      {!isAdminRoute && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<Success />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/shipping" element={<ShippingReturns />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/payment" element={<PaymentMethods />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/about" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
