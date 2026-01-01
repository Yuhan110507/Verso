'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [writingPhilosophy, setWritingPhilosophy] = useState('');
  const [influences, setInfluences] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setBio(profile.bio || '');
      setWritingPhilosophy(profile.writing_philosophy || '');
      setInfluences(profile.influences ? profile.influences.join(', ') : '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setMessage('Session expired. Please sign in again.');
        router.push('/auth/login');
        return;
      }

      // Parse influences
      const influencesList = influences
        .split(',')
        .map(i => i.trim())
        .filter(i => i.length > 0);

      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          display_name: displayName.trim() || null,
          bio: bio.trim() || null,
          writing_philosophy: writingPhilosophy.trim() || null,
          influences: influencesList.length > 0 ? influencesList : null,
          avatar_url: avatarUrl.trim() || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setMessage('Failed to save: ' + (error.error || 'Unknown error'));
        setSaving(false);
        return;
      }

      // Refresh the profile in the auth context
      await refreshProfile();

      setMessage('Profile updated successfully!');
      setSaving(false);

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setMessage('An error occurred: ' + (error.message || 'Unknown error'));
      setSaving(false);
    }
  };

  if (authLoading) {
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

  return (
    <div style={{
      backgroundColor: '#FCFBF9',
      minHeight: '100vh',
      padding: '80px 20px 60px'
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <Link
            href={`/author/${profile?.username || user.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#75716B',
              textDecoration: 'none',
              fontSize: '15px',
              marginBottom: '24px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#800020'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#75716B'}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: '18px', height: '18px' }}
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Profile
          </Link>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '42px',
            fontWeight: '300',
            color: '#2D2A26',
            marginBottom: '8px'
          }}>
            Edit Profile
          </h1>
          <p style={{
            fontSize: '17px',
            color: '#75716B',
            lineHeight: '1.6'
          }}>
            Update your profile information and preferences
          </p>
        </div>

        {/* Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 4px 24px rgba(45, 42, 38, 0.08)',
          border: '1px solid rgba(229, 227, 223, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px'
          }}>
            {/* Username (read-only) */}
            <div>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
                display: 'block'
              }}>
                Username
              </label>
              <input
                type="text"
                value={profile?.username || ''}
                disabled
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: '#F5F3F0',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(229, 227, 223, 0.4)',
                  fontSize: '15px',
                  color: '#9B9690',
                  cursor: 'not-allowed'
                }}
              />
              <p style={{
                fontSize: '13px',
                color: '#9B9690',
                marginTop: '6px'
              }}>
                Username cannot be changed
              </p>
            </div>

            {/* Display Name */}
            <div>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
                display: 'block'
              }}>
                Display Name
              </label>
              <input
                type="text"
                placeholder="Your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: '#FDFCFA',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(229, 227, 223, 0.4)',
                  fontSize: '15px',
                  color: '#2D2A26',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
            </div>

            {/* Bio */}
            <div>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
                display: 'block'
              }}>
                Bio
              </label>
              <textarea
                placeholder="A brief description about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: '#FDFCFA',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(229, 227, 223, 0.4)',
                  fontSize: '15px',
                  color: '#2D2A26',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Writing Philosophy */}
            <div>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
                display: 'block'
              }}>
                Writing Philosophy
              </label>
              <textarea
                placeholder="What drives your creative work..."
                value={writingPhilosophy}
                onChange={(e) => setWritingPhilosophy(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: '#FDFCFA',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(229, 227, 223, 0.4)',
                  fontSize: '15px',
                  color: '#2D2A26',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Influences */}
            <div>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
                display: 'block'
              }}>
                Literary Influences
              </label>
              <input
                type="text"
                placeholder="e.g., Virginia Woolf, Jorge Luis Borges (separate with commas)"
                value={influences}
                onChange={(e) => setInfluences(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: '#FDFCFA',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(229, 227, 223, 0.4)',
                  fontSize: '15px',
                  color: '#2D2A26',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
                display: 'block'
              }}>
                Avatar URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: '#FDFCFA',
                  borderRadius: '16px',
                  border: '1.5px solid rgba(229, 227, 223, 0.4)',
                  fontSize: '15px',
                  color: '#2D2A26',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
              <p style={{
                fontSize: '13px',
                color: '#9B9690',
                marginTop: '6px'
              }}>
                Link to your profile picture
              </p>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div style={{
              marginTop: '24px',
              padding: '14px 20px',
              background: message.includes('success')
                ? 'rgba(156, 175, 136, 0.15)'
                : 'rgba(128, 0, 32, 0.08)',
              color: message.includes('success') ? '#4A5D3F' : '#800020',
              borderRadius: '16px',
              fontSize: '15px',
              border: message.includes('success')
                ? '1px solid rgba(156, 175, 136, 0.3)'
                : '1px solid rgba(128, 0, 32, 0.2)'
            }}>
              {message}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              width: '100%',
              marginTop: '32px',
              padding: '16px 32px',
              background: saving ? '#9B9690' : '#800020',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: saving ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(128, 0, 32, 0.2)',
              transition: 'all 0.3s',
              opacity: saving ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!saving) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(128, 0, 32, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!saving) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(128, 0, 32, 0.2)';
              }
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
