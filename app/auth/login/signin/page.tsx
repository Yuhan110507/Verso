'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Firebase authentication will go here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div
      style={{
        backgroundColor: '#FCFBF9',
        backgroundImage: `
          radial-gradient(circle 1000px at 15% 10%, rgba(156, 175, 136, 0.15) 0%, rgba(156, 175, 136, 0.08) 30%, transparent 75%),
          radial-gradient(circle 800px at 85% 15%, rgba(128, 0, 32, 0.10) 0%, transparent 65%),
          radial-gradient(ellipse 1400px 900px at 50% 65%, rgba(250, 243, 237, 0.5) 0%, transparent 75%),
          radial-gradient(circle 700px at 10% 90%, rgba(156, 175, 136, 0.10) 0%, transparent 70%)
        `,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: '100% 100%',
        minHeight: '100vh',
        paddingTop: '64px',
        margin: 0,
        padding: 0,
        border: 'none',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,300&display=swap');

        html, body {
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          border-top: none !important;
          background: #FCFBF9 !important;
        }

        body > *:first-child {
          border-top: none !important;
          margin-top: 0 !important;
          padding-top: 0 !important;
        }

        * {
          border-top-color: transparent !important;
        }

        *::before,
        *::after {
          border-top: none !important;
        }

        input::placeholder {
          color: #9B9690;
          opacity: 1;
        }

        input::-webkit-input-placeholder {
          color: #9B9690;
        }

        input:-moz-placeholder {
          color: #9B9690;
        }

        input::-moz-placeholder {
          color: #9B9690;
        }
      `}</style>

      {/* Navigation Bar - Floating Glass Effect */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: '64px',
          padding: '0 48px',
          margin: 0,
          borderTop: 'none',
          background: 'rgba(252, 251, 249, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 2px 8px rgba(45, 42, 38, 0.06)',
          borderBottom: '1px solid rgba(229, 227, 223, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <span className="text-2xl font-serif font-bold text-[#800020]">V</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-6 bg-[#800020]/30 group-hover:h-7 transition-all duration-300"></div>
          </div>
          <span className="text-lg font-serif font-semibold text-[#2D2A26]">verso</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link href="/discover" className="text-[#75716B] hover:text-[#2D2A26] transition-colors duration-200 font-light text-sm">
            Discover
          </Link>
          <Link href="/auth/signup" className="px-6 py-2 bg-[#800020] text-white rounded-lg font-light text-sm transition-all duration-300 hover:bg-[#660033] hover:shadow-md"
            style={{
              boxShadow: '0 2px 8px rgba(128, 0, 32, 0.15)'
            }}
          >
            Join Verso
          </Link>
        </div>

        <button className="md:hidden text-[#36454F]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>

      {/* Main Content Container */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        padding: '32px 24px'
      }}>
        {/* Sign In Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
          border: '1px solid rgba(229, 227, 223, 0.25)',
          borderRadius: '24px',
          boxShadow: '0 12px 32px rgba(45, 42, 38, 0.08), 0 4px 12px rgba(45, 42, 38, 0.04)',
          padding: '48px',
          width: '100%',
          maxWidth: '420px'
        }}>
          {/* Title */}
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            fontWeight: '400',
            color: '#2D2A26',
            margin: '0 0 8px 0',
            letterSpacing: '-0.01em'
          }}>
            Welcome Back
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '15px',
            color: '#75716B',
            marginBottom: '32px',
            margin: '0 0 32px 0'
          }}>
            Sign in to continue your literary journey
          </p>

          {/* Form */}
          <form onSubmit={handleSignIn} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Email Input */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <label style={{
                fontSize: '13px',
                fontWeight: '500',
                color: '#2D2A26',
                letterSpacing: '0.02em'
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 20px',
                  background: '#FDFCFA',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(229, 227, 223, 0.4)',
                  boxShadow: '0 2px 8px rgba(45, 42, 38, 0.02)',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '15px',
                  color: '#2D2A26',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(128, 0, 32, 0.3)';
                  e.target.style.boxShadow = '0 8px 24px rgba(45, 42, 38, 0.08), 0 0 0 4px rgba(128, 0, 32, 0.08)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(229, 227, 223, 0.4)';
                  e.target.style.boxShadow = '0 2px 8px rgba(45, 42, 38, 0.02)';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            {/* Password Input */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <label style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#2D2A26',
                  letterSpacing: '0.02em'
                }}>
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  style={{
                    fontSize: '13px',
                    color: '#800020',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#660033';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = '#800020';
                  }}
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 20px',
                  background: '#FDFCFA',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(229, 227, 223, 0.4)',
                  boxShadow: '0 2px 8px rgba(45, 42, 38, 0.02)',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '15px',
                  color: '#2D2A26',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(128, 0, 32, 0.3)';
                  e.target.style.boxShadow = '0 8px 24px rgba(45, 42, 38, 0.08), 0 0 0 4px rgba(128, 0, 32, 0.08)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(229, 227, 223, 0.4)';
                  e.target.style.boxShadow = '0 2px 8px rgba(45, 42, 38, 0.02)';
                  e.target.style.transform = 'translateY(0)';
                }}
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                height: '48px',
                marginTop: '12px',
                background: '#800020',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '15px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(128, 0, 32, 0.15)',
                opacity: loading ? 0.8 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#660033';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(128, 0, 32, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#800020';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(128, 0, 32, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Footer Text */}
          <div style={{
            textAlign: 'center',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(229, 227, 223, 0.2)'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#75716B',
              margin: 0
            }}>
              Don't have an account?{' '}
              <Link
                href="/auth/signup"
                style={{
                  color: '#800020',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#660033';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = '#800020';
                }}
              >
                Join Verso
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
