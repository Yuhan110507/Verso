'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (pass.length >= 12) strength += 25;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(pass)) strength += 10;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const getStrengthColor = () => {
    if (passwordStrength < 30) return '#DC2626';
    if (passwordStrength < 60) return '#F59E0B';
    if (passwordStrength < 80) return '#FBBF24';
    return '#10B981';
  };

  const getStrengthText = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Fair';
    if (passwordStrength < 80) return 'Good';
    return 'Strong';
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setError('Username must be between 3 and 20 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      console.log('Starting signup process...');
      await signUp(email, password, username);
      console.log('Signup successful, redirecting to onboarding...');
      router.push('/onboarding');
    } catch (err: any) {
      console.error('Signup error:', err);
      console.error('Error message:', err.message);
      console.error('Full error object:', JSON.stringify(err, null, 2));

      const errorMessage = err.message?.toLowerCase() || '';

      if (errorMessage.includes('already registered') || errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (errorMessage.includes('invalid email')) {
        setError('Invalid email address');
      } else if (errorMessage.includes('password') && errorMessage.includes('weak')) {
        setError('Password is too weak. Use at least 6 characters');
      } else if (errorMessage.includes('password') && errorMessage.includes('short')) {
        setError('Password must be at least 6 characters long');
      } else {
        setError(err.message || 'Failed to create account. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FCFBF9', backgroundImage: 'radial-gradient(circle 1000px at 15% 10%, rgba(156, 175, 136, 0.15) 0%, rgba(156, 175, 136, 0.08) 30%, transparent 75%), radial-gradient(circle 800px at 85% 15%, rgba(128, 0, 32, 0.10) 0%, transparent 65%), radial-gradient(ellipse 1400px 900px at 50% 65%, rgba(250, 243, 237, 0.5) 0%, transparent 75%), radial-gradient(circle 700px at 10% 90%, rgba(156, 175, 136, 0.10) 0%, transparent 70%)', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: '100% 100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '32px', padding: '64px 56px', maxWidth: '480px', width: '100%', boxShadow: '0 8px 40px rgba(45, 42, 38, 0.12)', border: '1px solid rgba(229, 227, 223, 0.3)' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '300', color: '#2D2A26', marginBottom: '12px', fontFamily: 'Georgia, serif', textAlign: 'center' }}>Join Verso</h1>
        <p style={{ fontSize: '16px', color: '#75716B', marginBottom: '40px', textAlign: 'center' }}>Create your account and begin your literary journey</p>
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: '#2D2A26', letterSpacing: '0.02em' }}>Username</label>
            <input type="text" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} style={{ width: '100%', height: '48px', padding: '0 20px', background: '#FDFCFA', borderRadius: '24px', border: '1.5px solid rgba(229, 227, 223, 0.4)', fontSize: '15px', color: '#2D2A26', outline: 'none', transition: 'all 0.2s' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: '#2D2A26', letterSpacing: '0.02em' }}>Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} style={{ width: '100%', height: '48px', padding: '0 20px', background: '#FDFCFA', borderRadius: '24px', border: '1.5px solid rgba(229, 227, 223, 0.4)', fontSize: '15px', color: '#2D2A26', outline: 'none', transition: 'all 0.2s' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: '#2D2A26', letterSpacing: '0.02em' }}>Password</label>
            <input type="password" placeholder="Create a strong password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} disabled={loading} style={{ width: '100%', height: '48px', padding: '0 20px', background: '#FDFCFA', borderRadius: '24px', border: '1.5px solid rgba(229, 227, 223, 0.4)', fontSize: '15px', color: '#2D2A26', outline: 'none', transition: 'all 0.2s' }} />
            {password && (
              <div style={{ marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#75716B' }}>Password strength:</span>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: getStrengthColor() }}>{getStrengthText()}</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(229, 227, 223, 0.4)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${passwordStrength}%`, height: '100%', background: getStrengthColor(), transition: 'all 0.3s' }}></div>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: '#2D2A26', letterSpacing: '0.02em' }}>Confirm Password</label>
            <input type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} style={{ width: '100%', height: '48px', padding: '0 20px', background: '#FDFCFA', borderRadius: '24px', border: '1.5px solid rgba(229, 227, 223, 0.4)', fontSize: '15px', color: '#2D2A26', outline: 'none', transition: 'all 0.2s' }} />
          </div>
          {error && (<div style={{ background: 'rgba(128, 0, 32, 0.08)', color: '#800020', padding: '12px 16px', borderRadius: '16px', fontSize: '14px', textAlign: 'center', border: '1px solid rgba(128, 0, 32, 0.2)' }}>{error}</div>)}
          <button type="submit" disabled={loading} style={{ width: '100%', height: '52px', background: loading ? '#9B9690' : '#800020', color: 'white', border: 'none', borderRadius: '26px', fontSize: '16px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(128, 0, 32, 0.2)', transition: 'all 0.3s', opacity: loading ? 0.7 : 1 }}>{loading ? 'Creating Account...' : 'Create Account'}</button>
        </form>
        <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '15px', color: '#75716B' }}>Already have an account? <Link href="/auth/login" style={{ color: '#800020', textDecoration: 'none', fontWeight: '500' }}>Sign In</Link></p>
      </div>
    </div>
  );
}
