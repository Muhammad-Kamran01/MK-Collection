import { Routes, Route } from 'react-router-dom';
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
import Contact from '@/pages/Contact';
import TrackOrder from '@/pages/TrackOrder';

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

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Helmet>
              <title>MK COLLECTION | Premium Pakistani Women Clothing</title>
              <meta name="description" content="Shop the latest collection of premium Pakistani women's clothing. Ready-to-wear, unstitched, and formal collections from MK COLLECTION." />
              <meta property="og:title" content="MK COLLECTION | Premium Pakistani Women Clothing" />
              <meta property="og:description" content="Shop the latest collection of premium Pakistani women's clothing." />
              <meta property="og:type" content="website" />
              <link rel="canonical" href="https://mkcollection.pk" />
            </Helmet>
            
            <Header />
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
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
