import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { motion } from 'motion/react';

export default function Auth() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display mb-4">Log In</h1>
        <p className="text-brand-gray text-sm uppercase tracking-widest">Welcome back to MK Collection</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-8">
        {error && <div className="text-state-error text-xs uppercase tracking-widest font-bold">{error}</div>}
        <input 
          type="email" 
          placeholder="Email Address" 
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="w-full btn-primary">
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <Link to="/auth/signup" className="block text-[10px] uppercase tracking-widest font-bold text-brand-gray hover:text-brand-dark transition-colors">
          New To MK Collection? Create An Account
        </Link>
        <button className="text-[10px] uppercase tracking-widest font-bold text-brand-gray hover:text-brand-dark transition-colors">
          Forgot Your Password?
        </button>
      </div>
    </motion.div>
  );
}

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { data, error: signupError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { name }
      }
    });
    
    if (signupError) {
      setError(signupError.message);
    } else if (data.user) {
      // Create user profile in public.users
      const { error: profileError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, name, email, role: 'customer' }]);
      
      if (profileError) {
        setError(profileError.message);
      } else {
        navigate('/auth/login');
      }
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display mb-4">Create Account</h1>
        <p className="text-brand-gray text-sm uppercase tracking-widest">Join the MK Collection community</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-8">
        {error && <div className="text-state-error text-xs uppercase tracking-widest font-bold">{error}</div>}
        <input 
          type="text" 
          placeholder="Full Name" 
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="w-full btn-primary">
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link to="/auth/login" className="text-[10px] uppercase tracking-widest font-bold text-brand-gray hover:text-brand-dark transition-colors">
          Already Have An Account? Log In
        </Link>
      </div>
    </motion.div>
  );
}
