'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/discover');
    } catch (err: any) {
      console.error('Login error:', err);
      
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later');
      } else {
        setError('Failed to sign in. Please try again');
      }
      
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FCFBF9', backgroundImage: 'radial-gradient(circle 1000px at 15% 10%, rgba(156, 175, 136, 0.15) 0%, rgba(156, 175, 136, 0.08) 30%, transparent 75%), radial-gradient(circle 800px at 85% 15%, rgba(128, 0, 32, 0.10) 0%, transparent 65%), radial-gradient(ellipse 1400px 900px at 50% 65%, rgba(250, 243, 237, 0.5) 0%, transparent 75%), radial-gradient(circle 700px at 10% 90%, rgba(156, 175, 136, 0.10) 0%, transparent 70%)', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: '100% 100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '32px', padding: '64px 56px', maxWidth: '480px', width: '100%', boxShadow: '0 8px 40px rgba(45, 42, 38, 0.12)', border: '1px solid rgba(229, 227, 223, 0.3)' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '300', color: '#2D2A26', marginBottom: '12px', fontFamily: 'Georgia, serif', textAlign: 'center' }}>Welcome Back</h1>
        <p style={{ fontSize: '16px', color: '#75716B', marginBottom: '40px', textAlign: 'center' }}>Sign in to continue your literary journey</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: '#2D2A26', letterSpacing: '0.02em' }}>Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} style={{ width: '100%', height: '48px', padding: '0 20px', background: '#FDFCFA', borderRadius: '24px', border: '1.5px solid rgba(229, 227, 223, 0.4)', fontSize: '15px', color: '#2D2A26', outline: 'none', transition: 'all 0.2s' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: '#2D2A26', letterSpacing: '0.02em' }}>Password</label>
              <Link href="/auth/forgot-password" style={{ fontSize: '13px', color: '#800020', textDecoration: 'none', fontWeight: '500' }}>Forgot?</Link>
            </div>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} style={{ width: '100%', height: '48px', padding: '0 20px', background: '#FDFCFA', borderRadius: '24px', border: '1.5px solid rgba(229, 227, 223, 0.4)', fontSize: '15px', color: '#2D2A26', outline: 'none', transition: 'all 0.2s' }} />
          </div>
          {error && (<div style={{ background: 'rgba(128, 0, 32, 0.08)', color: '#800020', padding: '12px 16px', borderRadius: '16px', fontSize: '14px', textAlign: 'center', border: '1px solid rgba(128, 0, 32, 0.2)' }}>{error}</div>)}
          <button type="submit" disabled={loading} style={{ width: '100%', height: '52px', background: loading ? '#9B9690' : '#800020', color: 'white', border: 'none', borderRadius: '26px', fontSize: '16px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(128, 0, 32, 0.2)', transition: 'all 0.3s', opacity: loading ? 0.7 : 1 }}>{loading ? 'Signing In...' : 'Sign In'}</button>
        </form>
        <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '15px', color: '#75716B' }}>Don't have an account? <Link href="/auth/signup" style={{ color: '#800020', textDecoration: 'none', fontWeight: '500' }}>Join Verso</Link></p>
      </div>
    </div>
  );
}
