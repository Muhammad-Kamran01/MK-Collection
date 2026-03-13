import React, { useState } from 'react';
import { Routes, Route, Link, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, KeyRound, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export default function Auth() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-9rem)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[32rem] max-w-7xl items-center justify-center rounded-[2rem] border border-brand-gold/15 bg-white shadow-[0_24px_80px_rgba(35,31,32,0.08)]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-gold/25 border-t-brand-gold" />
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f8f3ea_0%,#fdfbf7_28%,#ffffff_100%)] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top_left,rgba(190,155,80,0.22),transparent_55%)]" />
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-brand-dark/5 blur-3xl" />

      <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-7xl flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-brand-gold/15 bg-white shadow-[0_34px_110px_rgba(35,31,32,0.14)]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(190,155,80,0.18),transparent_65%)]" />
          <div className="relative flex h-full flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
              <AuthTabLink to="/auth/login">Log In</AuthTabLink>
              <AuthTabLink to="/auth/signup">Sign Up</AuthTabLink>
              <AuthTabLink to="/auth/forgot-password">Forgot Password</AuthTabLink>
            </div>

            <div className="flex-1">
              <Routes>
                <Route index element={<Navigate to="login" replace />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<Navigate to="login" replace />} />
              </Routes>
            </div>

            <div className="mt-8 flex justify-center border-t border-brand-dark/8 pt-6">
              <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gray transition-colors hover:text-brand-dark">
                Back Home
                <ArrowRight size={14} strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function AuthTabLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'inline-flex min-h-12 min-w-[11rem] items-center justify-center rounded-xl border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] transition-all duration-300',
          isActive
            ? 'border-brand-dark bg-brand-dark text-white shadow-[0_10px_30px_rgba(35,31,32,0.16)]'
            : 'border-brand-dark/12 bg-white text-brand-gray hover:border-brand-gold/40 hover:text-brand-dark'
        )
      }
    >
      {children}
    </NavLink>
  );
}

function AuthPanel({
  title,
  description,
  centerHeader = false,
  children,
}: {
  title: string;
  description: string;
  centerHeader?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
      <div className={cn('mb-8 max-w-xl', centerHeader && 'mx-auto text-center')}>
        <h2 className="text-3xl leading-tight sm:text-[2.2rem] text-brand-gold">{title}</h2>
        {description && <p className="mt-3 text-sm leading-7 text-brand-gray sm:text-base">{description}</p>}
      </div>
      {children}
    </motion.div>
  );
}

function AuthMessage({ type, children }: { type: 'error' | 'success'; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-[1.25rem] border px-4 py-3 text-sm leading-6',
        type === 'error'
          ? 'border-state-error/15 bg-state-error/5 text-state-error'
          : 'border-state-success/15 bg-state-success/5 text-state-success'
      )}
    >
      {children}
    </div>
  );
}

function AuthInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  icon,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  icon: React.ReactNode;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  return (
    <label className="block space-y-3">
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gray">{label}</span>
      <div className="group flex items-center gap-3 rounded-[1.25rem] border border-brand-dark/10 bg-[#fcfaf7] px-4 py-3.5 transition-all duration-300 focus-within:border-brand-gold focus-within:bg-white focus-within:shadow-[0_14px_34px_rgba(190,155,80,0.12)] hover:border-brand-gold/40">
        <div className="text-brand-gold/80 transition-colors group-focus-within:text-brand-gold">{icon}</div>
        <input
          type={isPasswordField && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-sm text-brand-dark outline-none placeholder:text-brand-gray/65"
          required
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="text-brand-gray transition-colors hover:text-brand-dark"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
          </button>
        )}
      </div>
    </label>
  );
}

function AuthSubmitButton({ loading, idleLabel, loadingLabel }: { loading: boolean; idleLabel: string; loadingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition-all duration-300 hover:bg-brand-gold disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? loadingLabel : idleLabel}
      {!loading && <ArrowRight size={16} strokeWidth={1.8} />}
    </button>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <AuthPanel
      title="Welcome Back"
      description="Sign in to continue."
      centerHeader
    >
      <form onSubmit={handleLogin} className="space-y-5">
        {error && <AuthMessage type="error">{error}</AuthMessage>}

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          icon={<Mail size={18} strokeWidth={1.8} />}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          icon={<LockKeyhole size={18} strokeWidth={1.8} />}
        />

        <div className="pt-2">
          <AuthSubmitButton loading={loading} idleLabel="Log In" loadingLabel="Signing In..." />
        </div>
      </form>

      <div className="mt-6 flex flex-col gap-3 border-t border-brand-dark/8 pt-6 text-sm text-brand-gray sm:flex-row sm:items-center sm:justify-between">
        <Link to="/auth/forgot-password" className="transition-colors hover:text-brand-dark">
          Forgot your password?
        </Link>
        <Link to="/auth/signup" className="font-medium text-brand-dark transition-colors hover:text-brand-gold">
          New here? Create an account
        </Link>
      </div>
    </AuthPanel>
  );
}

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, name, email, role: 'customer' }]);

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    navigate('/auth/login');
    setLoading(false);
  };

  return (
    <AuthPanel
      title="Create New Account"
      description="Simple. Secure. Ready."
      centerHeader
    >
      <form onSubmit={handleSignup} className="space-y-5">
        {error && <AuthMessage type="error">{error}</AuthMessage>}

        <AuthInput
          label="Full Name"
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          icon={<UserRound size={18} strokeWidth={1.8} />}
        />

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          icon={<Mail size={18} strokeWidth={1.8} />}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Create a secure password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          icon={<LockKeyhole size={18} strokeWidth={1.8} />}
        />

        <div className="pt-2">
          <AuthSubmitButton loading={loading} idleLabel="Create Account" loadingLabel="Creating Account..." />
        </div>
      </form>

      <div className="mt-6 border-t border-brand-dark/8 pt-6 text-sm text-brand-gray">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-medium text-brand-dark transition-colors hover:text-brand-gold">
          Log in instead
        </Link>
      </div>
    </AuthPanel>
  );
}

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/login`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSuccess('A password reset link has been sent to your email address. Please check your inbox.');
    setLoading(false);
  };

  return (
    <AuthPanel
      title="Reset Password | Password Help"
      description="We will send you a reset link."
      centerHeader
    >
      <form onSubmit={handleReset} className="space-y-5">
        {error && <AuthMessage type="error">{error}</AuthMessage>}
        {success && <AuthMessage type="success">{success}</AuthMessage>}

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          icon={<KeyRound size={18} strokeWidth={1.8} />}
        />

        <div className="pt-2">
          <AuthSubmitButton loading={loading} idleLabel="Send Reset Link" loadingLabel="Sending Link..." />
        </div>
      </form>

      <div className="mt-6 flex flex-col gap-3 border-t border-brand-dark/8 pt-6 text-sm text-brand-gray sm:flex-row sm:items-center sm:justify-between">
        <Link to="/auth/login" className="transition-colors hover:text-brand-dark">
          Back to log in
        </Link>
        <Link to="/auth/signup" className="font-medium text-brand-dark transition-colors hover:text-brand-gold">
          Need an account? Sign up
        </Link>
      </div>
    </AuthPanel>
  );
}
