'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WelcomePage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FCFBF9'
      }}>
        <p style={{ fontSize: '18px', color: '#75716B' }}>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div style={{
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%'
      }}>
        {/* Welcome Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '300',
            color: '#2D2A26',
            marginBottom: '16px',
            fontFamily: 'Georgia, serif'
          }}>
            Welcome to Verso, {profile?.username || 'Writer'}
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#75716B',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            A refined space for literary expression, where words find their home and readers discover stories worth savoring.
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {/* Discover Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px 28px',
            border: '1px solid rgba(229, 227, 223, 0.3)',
            boxShadow: '0 4px 24px rgba(45, 42, 38, 0.08)',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onClick={() => handleNavigate('/discover')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(45, 42, 38, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(45, 42, 38, 0.08)';
          }}>
            <div style={{
              fontSize: '32px',
              marginBottom: '16px'
            }}>📚</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#2D2A26',
              marginBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>Discover Stories</h3>
            <p style={{
              fontSize: '15px',
              color: '#75716B',
              lineHeight: '1.5'
            }}>
              Explore curated works from talented writers across genres
            </p>
          </div>

          {/* Write Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px 28px',
            border: '1px solid rgba(229, 227, 223, 0.3)',
            boxShadow: '0 4px 24px rgba(45, 42, 38, 0.08)',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onClick={() => handleNavigate('/write')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(45, 42, 38, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(45, 42, 38, 0.08)';
          }}>
            <div style={{
              fontSize: '32px',
              marginBottom: '16px'
            }}>✍️</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#2D2A26',
              marginBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>Start Writing</h3>
            <p style={{
              fontSize: '15px',
              color: '#75716B',
              lineHeight: '1.5'
            }}>
              Craft your narrative with our elegant editor designed for writers
            </p>
          </div>

          {/* Profile Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px 28px',
            border: '1px solid rgba(229, 227, 223, 0.3)',
            boxShadow: '0 4px 24px rgba(45, 42, 38, 0.08)',
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onClick={() => handleNavigate(`/author/${profile?.username || user.id}`)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(45, 42, 38, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(45, 42, 38, 0.08)';
          }}>
            <div style={{
              fontSize: '32px',
              marginBottom: '16px'
            }}>👤</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#2D2A26',
              marginBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>Your Profile</h3>
            <p style={{
              fontSize: '15px',
              color: '#75716B',
              lineHeight: '1.5'
            }}>
              Customize your literary presence and showcase your works
            </p>
          </div>
        </div>

        {/* Main CTA */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          padding: '40px 48px',
          border: '1px solid rgba(229, 227, 223, 0.3)',
          boxShadow: '0 4px 24px rgba(45, 42, 38, 0.08)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '400',
            color: '#2D2A26',
            marginBottom: '16px',
            fontFamily: 'Georgia, serif'
          }}>
            Begin Your Literary Journey
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#75716B',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Verso is a community dedicated to the craft of writing. Share your stories,
            engage with thoughtful readers, and discover works that resonate.
          </p>
          <button
            onClick={() => handleNavigate('/discover')}
            style={{
              background: '#800020',
              color: 'white',
              border: 'none',
              borderRadius: '26px',
              padding: '16px 48px',
              fontSize: '17px',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(128, 0, 32, 0.2)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(128, 0, 32, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(128, 0, 32, 0.2)';
            }}
          >
            Explore Discover
          </button>
        </div>
      </div>
    </div>
  );
}
