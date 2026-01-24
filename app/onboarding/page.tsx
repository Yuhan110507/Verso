'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const GENRES = [
  'Contemporary',
  'Essays',
  'Fantasy',
  'Historical',
  'Horror',
  'Literary',
  'Memoir',
  'Mystery',
  'Poetry',
  'Romance',
  'Science Fiction',
  'Short Stories',
  'Thriller',
  'Adventure',
  'Anthropology',
  'Art & Aesthetics',
  'Biography',
  'Crime',
  'Cultural Studies',
  'Drama',
  'Dystopian',
  'Economics',
  'Education',
  'Environmental',
  'Ethics',
  'History',
  'Humor',
  'Journalism',
  'Law & Justice',
  'Literary Criticism',
  'Magical Realism',
  'Philosophy',
  'Politics',
  'Psychology',
  'Religion & Spirituality',
  'Science',
  'Sociology',
  'Technology',
  'Young Adult'
];

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  // Form state
  const [userType, setUserType] = useState<'reader' | 'writer' | 'both'>('reader');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [writingPhilosophy, setWritingPhilosophy] = useState('');
  const [influences, setInfluences] = useState('');

  useEffect(() => {
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

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleComplete = async () => {
    console.log('handleComplete called');
    setSaving(true);
    try {
      console.log('Getting session...');
      // Get authenticated session
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session:', session ? 'Found' : 'Not found');

      if (!session) {
        alert('Session expired. Please sign in again.');
        router.push('/auth/login');
        setSaving(false);
        return;
      }

      // Determine roles based on userType
      let roles = ['reader'];
      if (userType === 'writer') {
        roles = ['writer', 'reader'];
      } else if (userType === 'both') {
        roles = ['writer', 'reader'];
      }

      // Parse influences
      const influencesList = influences
        .split(',')
        .map(i => i.trim())
        .filter(i => i.length > 0);

      const payload = {
        roles,
        liked_genres: selectedGenres,
        writing_philosophy: writingPhilosophy || null,
        influences: influencesList.length > 0 ? influencesList : null,
      };

      console.log('Sending update request with payload:', payload);

      // Update user profile using authenticated client
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('Error response:', error);
        alert('Failed to save preferences: ' + (error.error || 'Unknown error'));
        setSaving(false);
        return;
      }

      const result = await response.json();
      console.log('Success! Result:', result);

      // Redirect to welcome page
      console.log('Redirecting to welcome page...');
      router.push('/welcome');
    } catch (error: any) {
      console.error('Exception in handleComplete:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      alert('An error occurred: ' + (error.message || 'Unknown error'));
      setSaving(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return userType !== null;
    if (step === 2) return selectedGenres.length > 0;
    if (step === 3) return true; // Optional step
    return false;
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
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '64px 56px',
        maxWidth: '680px',
        width: '100%',
        boxShadow: '0 8px 40px rgba(45, 42, 38, 0.12)',
        border: '1px solid rgba(229, 227, 223, 0.3)'
      }}>
        {/* Progress Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '48px'
        }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                width: '80px',
                height: '4px',
                background: s <= step ? '#800020' : 'rgba(229, 227, 223, 0.5)',
                borderRadius: '2px',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>

        {/* Step 1: User Type */}
        {step === 1 && (
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '300',
              color: '#2D2A26',
              marginBottom: '12px',
              fontFamily: 'Georgia, serif',
              textAlign: 'center'
            }}>
              Welcome to Verso
            </h1>
            <p style={{
              fontSize: '17px',
              color: '#75716B',
              marginBottom: '40px',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              Let's personalize your experience. How would you describe yourself?
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {[
                { value: 'reader' as const, label: 'Reader', desc: 'I am here to discover and enjoy great literature' },
                { value: 'writer' as const, label: 'Writer', desc: 'I am here to share my work and connect with readers' },
                { value: 'both' as const, label: 'Both', desc: 'I love to read and write in equal measure' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setUserType(option.value)}
                  style={{
                    background: userType === option.value ? 'rgba(128, 0, 32, 0.08)' : 'rgba(255, 255, 255, 0.5)',
                    border: userType === option.value ? '2px solid #800020' : '2px solid rgba(229, 227, 223, 0.4)',
                    borderRadius: '20px',
                    padding: '24px 28px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (userType !== option.value) {
                      e.currentTarget.style.borderColor = 'rgba(128, 0, 32, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (userType !== option.value) {
                      e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.4)';
                    }
                  }}
                >
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '500',
                    color: '#2D2A26',
                    marginBottom: '6px',
                    fontFamily: 'Georgia, serif'
                  }}>
                    {option.label}
                  </div>
                  <div style={{
                    fontSize: '15px',
                    color: '#75716B',
                    lineHeight: '1.5'
                  }}>
                    {option.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Genre Preferences */}
        {step === 2 && (
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '300',
              color: '#2D2A26',
              marginBottom: '12px',
              fontFamily: 'Georgia, serif',
              textAlign: 'center'
            }}>
              Literary Tastes
            </h1>
            <p style={{
              fontSize: '17px',
              color: '#75716B',
              marginBottom: '40px',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              Which genres resonate with you? Select all that apply.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '12px',
              marginBottom: '8px'
            }}>
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  style={{
                    background: selectedGenres.includes(genre) ? '#800020' : 'rgba(255, 255, 255, 0.5)',
                    color: selectedGenres.includes(genre) ? 'white' : '#2D2A26',
                    border: selectedGenres.includes(genre) ? 'none' : '1.5px solid rgba(229, 227, 223, 0.4)',
                    borderRadius: '16px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedGenres.includes(genre)) {
                      e.currentTarget.style.borderColor = '#800020';
                      e.currentTarget.style.color = '#800020';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedGenres.includes(genre)) {
                      e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.4)';
                      e.currentTarget.style.color = '#2D2A26';
                    }
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
            <p style={{
              fontSize: '13px',
              color: '#9B9690',
              textAlign: 'center',
              marginTop: '16px'
            }}>
              Selected: {selectedGenres.length} {selectedGenres.length === 1 ? 'genre' : 'genres'}
            </p>
          </div>
        )}

        {/* Step 3: Additional Details (Optional) */}
        {step === 3 && (
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '300',
              color: '#2D2A26',
              marginBottom: '12px',
              fontFamily: 'Georgia, serif',
              textAlign: 'center'
            }}>
              Tell Us More
            </h1>
            <p style={{
              fontSize: '17px',
              color: '#75716B',
              marginBottom: '40px',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              Help us understand your literary perspective <span style={{ color: '#9B9690' }}>(optional)</span>
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
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
                <p style={{
                  fontSize: '13px',
                  color: '#75716B',
                  marginBottom: '10px'
                }}>
                  Which authors or works have shaped your taste? (separate with commas)
                </p>
                <input
                  type="text"
                  placeholder="e.g., Virginia Woolf, Jorge Luis Borges, Toni Morrison"
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

              {(userType === 'writer' || userType === 'both') && (
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
                  <p style={{
                    fontSize: '13px',
                    color: '#75716B',
                    marginBottom: '10px'
                  }}>
                    What drives your creative work?
                  </p>
                  <textarea
                    placeholder="Share your thoughts on what writing means to you..."
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
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '48px',
          gap: '16px'
        }}>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              disabled={saving}
              style={{
                padding: '14px 32px',
                background: 'transparent',
                color: '#75716B',
                border: '1.5px solid rgba(229, 227, 223, 0.6)',
                borderRadius: '24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                opacity: saving ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!saving) {
                  e.currentTarget.style.borderColor = '#800020';
                  e.currentTarget.style.color = '#800020';
                }
              }}
              onMouseLeave={(e) => {
                if (!saving) {
                  e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.6)';
                  e.currentTarget.style.color = '#75716B';
                }
              }}
            >
              Back
            </button>
          )}

          <button
            onClick={() => {
              if (step < 3) {
                setStep(step + 1);
              } else {
                handleComplete();
              }
            }}
            disabled={!canProceed() || saving}
            style={{
              flex: 1,
              padding: '14px 32px',
              background: (!canProceed() || saving) ? '#9B9690' : '#800020',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: (!canProceed() || saving) ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(128, 0, 32, 0.2)',
              transition: 'all 0.3s',
              opacity: (!canProceed() || saving) ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (canProceed() && !saving) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(128, 0, 32, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (canProceed() && !saving) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(128, 0, 32, 0.2)';
              }
            }}
          >
            {saving ? 'Saving...' : step < 3 ? 'Continue' : 'Complete'}
          </button>
        </div>

        {step === 3 && (
          <p style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#9B9690',
            marginTop: '16px'
          }}>
            You can update these preferences anytime in your settings
          </p>
        )}
      </div>
    </div>
  );
}
