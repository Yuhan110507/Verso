'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Firebase password reset will go here
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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

        margin: 0,
        padding: 0,
        border: 'none',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,300&display=swap');

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

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
      `}</style>


      {/* Main Content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        padding: '32px 24px'
      }}>
        {/* Card */}
        <div style={{
          background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
          border: '1px solid rgba(229, 227, 223, 0.25)',
          borderRadius: '24px',
          boxShadow: '0 12px 32px rgba(45, 42, 38, 0.08), 0 4px 12px rgba(45, 42, 38, 0.04)',
          padding: '48px',
          width: '100%',
          maxWidth: '440px',
          animation: 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {!submitted ? (
            <>
              {/* Back Link */}
              <Link
                href="/auth/login"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#75716B',
                  textDecoration: 'none',
                  marginBottom: '24px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#800020';
                  (e.target as HTMLElement).style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = '#75716B';
                  (e.target as HTMLElement).style.transform = 'translateX(0)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 12L6 8L10 4" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                Back to Sign In
              </Link>

              {/* Title */}
              <h1 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '32px',
                fontWeight: '400',
                color: '#2D2A26',
                marginBottom: '8px',
                margin: '0 0 8px 0',
                letterSpacing: '-0.01em',
                textAlign: 'center'
              }}>
                Reset Password
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: '16px',
                fontWeight: '300',
                color: '#75716B',
                marginBottom: '32px',
                margin: '0 0 32px 0',
                textAlign: 'center'
              }}>
                Enter your email and we'll send you instructions to reset your password.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#2D2A26'
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    height: '48px',
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
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div style={{
              textAlign: 'center',
              padding: '24px 0',
              animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <div style={{
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{
                  animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <circle cx="24" cy="24" r="22" stroke="#9CAF88" strokeWidth="2"/>
                  <path d="M16 24L21 29L32 18" stroke="#9CAF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: '400',
                color: '#2D2A26',
                marginBottom: '12px',
                letterSpacing: '-0.01em'
              }}>
                Check Your Email
              </h2>

              <p style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '15px',
                color: '#75716B',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                We've sent password reset instructions to <strong style={{ color: '#2D2A26', fontWeight: '500' }}>{email}</strong>
              </p>

              <p style={{
                fontSize: '14px',
                color: '#9B9690',
                lineHeight: '1.6',
                marginBottom: '32px'
              }}>
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleResend}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#800020',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0,
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#660033';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#800020';
                  }}
                >
                  resend link
                </button>
              </p>

              <Link
                href="/auth/login"
                style={{
                  display: 'inline-block',
                  width: '100%',
                  height: '48px',
                  background: '#800020',
                  color: 'white',
                  border: 'none',
                  borderRadius: '24px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '15px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  lineHeight: '48px',
                  boxShadow: '0 4px 12px rgba(128, 0, 32, 0.15)',
                  transition: 'all 0.3s ease',
                  marginTop: '24px',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#660033';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(128, 0, 32, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#800020';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(128, 0, 32, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
