'use client';

import Link from 'next/link';

export default function NotFound() {
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
          maxWidth: '540px',
          textAlign: 'center',
          animation: 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Error Code */}
          <div style={{
            fontSize: '120px',
            fontFamily: 'Georgia, serif',
            fontWeight: '300',
            color: 'rgba(128, 0, 32, 0.15)',
            lineHeight: '1',
            marginBottom: '24px',
            animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards'
          }}>
            404
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            fontWeight: '400',
            color: '#2D2A26',
            marginBottom: '16px',
            margin: '0 0 16px 0',
            letterSpacing: '-0.01em',
            animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards'
          }}>
            Page Not Found
          </h1>

          {/* Error Message */}
          <p style={{
            fontSize: '18px',
            fontWeight: '300',
            fontFamily: 'Georgia, serif',
            color: '#75716B',
            marginBottom: '40px',
            margin: '0 0 40px 0',
            lineHeight: '1.6',
            animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards'
          }}>
            The page you're looking for seems to have wandered off the beaten path.
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards'
          }}>
            {/* Primary Button - Return Home */}
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                paddingLeft: '32px',
                paddingRight: '32px',
                background: '#800020',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '15px',
                fontWeight: '500',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(128, 0, 32, 0.15)'
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
              Return Home
            </Link>

            {/* Secondary Button - Explore Stories */}
            <Link
              href="/discover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '48px',
                paddingLeft: '32px',
                paddingRight: '32px',
                background: 'transparent',
                color: '#800020',
                border: '1.5px solid rgba(128, 0, 32, 0.3)',
                borderRadius: '24px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '15px',
                fontWeight: '500',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(128, 0, 32, 0.08)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(128, 0, 32, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(128, 0, 32, 0.5)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(128, 0, 32, 0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(128, 0, 32, 0.3)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(128, 0, 32, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Explore Stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
