'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState({
    profileVisibility: 'public', // public, friends, private
    showEmail: false,
    showBirthday: false,
    showReadingActivity: true,
    showHighlights: 'public', // public, friends, private
    showComments: true,
    allowMessages: 'everyone', // everyone, friends, nobody
    allowFollows: true,
    showInSearch: true,
    showGenrePreferences: true,
    dataSharing: false,
    analyticsTracking: true,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const handleSelect = (setting: keyof typeof settings, value: string) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };

  const handleSaveSettings = () => {
    // TODO: Save to database
    alert('Privacy settings saved successfully!');
  };

  return (
    <main style={{ backgroundColor: '#F5F3F0', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #E5E3DF',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/" style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#2D2A26',
            textDecoration: 'none',
            fontFamily: 'Georgia, serif',
          }}>
            Verso
          </Link>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link href="/discover" style={{
              color: '#6B6560',
              textDecoration: 'none',
              fontSize: '15px',
              transition: 'color 0.2s',
            }}>
              Discover
            </Link>
            <Link href="/author" style={{
              color: '#6B6560',
              textDecoration: 'none',
              fontSize: '15px',
              transition: 'color 0.2s',
            }}>
              Authors
            </Link>
            <Link href="/library" style={{
              color: '#6B6560',
              textDecoration: 'none',
              fontSize: '15px',
              transition: 'color 0.2s',
            }}>
              Library
            </Link>
            <Link href="/groups" style={{
              color: '#6B6560',
              textDecoration: 'none',
              fontSize: '15px',
              transition: 'color 0.2s',
            }}>
              Groups
            </Link>
            <Link href="/write" style={{
              color: '#6B6560',
              textDecoration: 'none',
              fontSize: '15px',
              transition: 'color 0.2s',
            }}>
              Write
            </Link>
            <Link href="/profile" style={{
              color: '#6B6560',
              textDecoration: 'none',
              fontSize: '15px',
              transition: 'color 0.2s',
            }}>
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 40px 40px',
      }}>
        <Link
          href="/profile"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6B6560',
            textDecoration: 'none',
            fontSize: '15px',
            marginBottom: '32px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#800020';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6B6560';
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: '18px', height: '18px' }}
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Profile
        </Link>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '42px',
          fontWeight: '500',
          color: '#2D2A26',
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}>
          Privacy Settings
        </h1>
        <p style={{
          fontSize: '17px',
          color: '#6B6560',
          lineHeight: '1.6',
          marginBottom: '40px',
        }}>
          Control who can see your profile, activity, and content on Verso.
        </p>

        {/* Profile Privacy */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E5E3DF',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '22px',
            fontWeight: '500',
            color: '#2D2A26',
            marginBottom: '24px'
          }}>
            Profile Privacy
          </h2>

          {/* Profile Visibility */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '20px 0',
            borderBottom: '1px solid #E5E3DF'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Profile Visibility
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Control who can view your profile and reading activity
              </div>
            </div>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleSelect('profileVisibility', e.target.value)}
              style={{
                padding: '10px 16px',
                fontSize: '14px',
                color: '#2D2A26',
                backgroundColor: 'white',
                border: '1px solid #E5E3DF',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '140px'
              }}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Show Email */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #E5E3DF'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Show Email Address
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Display your email on your public profile
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.showEmail}
                onChange={() => handleToggle('showEmail')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.showEmail ? '#9CAF88' : '#E5E3DF',
                transition: 'all 0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: settings.showEmail ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>

          {/* Show Birthday */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #E5E3DF'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Show Birthday
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Display your birthday on your profile
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.showBirthday}
                onChange={() => handleToggle('showBirthday')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.showBirthday ? '#9CAF88' : '#E5E3DF',
                transition: 'all 0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: settings.showBirthday ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>

          {/* Show Genre Preferences */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Show Genre Preferences
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Display your favorite genres on your profile
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.showGenrePreferences}
                onChange={() => handleToggle('showGenrePreferences')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.showGenrePreferences ? '#9CAF88' : '#E5E3DF',
                transition: 'all 0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: settings.showGenrePreferences ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>
        </div>

        {/* Activity Privacy */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E5E3DF',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '22px',
            fontWeight: '500',
            color: '#2D2A26',
            marginBottom: '24px'
          }}>
            Activity & Content
          </h2>

          {/* Reading Activity */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #E5E3DF'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Show Reading Activity
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Let others see what you're currently reading and your reading history
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.showReadingActivity}
                onChange={() => handleToggle('showReadingActivity')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.showReadingActivity ? '#9CAF88' : '#E5E3DF',
                transition: 'all 0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: settings.showReadingActivity ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>

          {/* Highlights Visibility */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '20px 0',
            borderBottom: '1px solid #E5E3DF'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Default Highlight Visibility
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Choose who can see your highlights by default
              </div>
            </div>
            <select
              value={settings.showHighlights}
              onChange={(e) => handleSelect('showHighlights', e.target.value)}
              style={{
                padding: '10px 16px',
                fontSize: '14px',
                color: '#2D2A26',
                backgroundColor: 'white',
                border: '1px solid #E5E3DF',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '140px'
              }}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Show Comments */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Show Comments Publicly
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Display your comments on stories publicly
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.showComments}
                onChange={() => handleToggle('showComments')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.showComments ? '#9CAF88' : '#E5E3DF',
                transition: 'all 0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: settings.showComments ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>
        </div>

        {/* Interaction Settings */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E5E3DF',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '22px',
            fontWeight: '500',
            color: '#2D2A26',
            marginBottom: '24px'
          }}>
            Interactions
          </h2>

          {/* Allow Messages */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '20px 0',
            borderBottom: '1px solid #E5E3DF'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Who Can Message You
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Control who can send you direct messages
              </div>
            </div>
            <select
              value={settings.allowMessages}
              onChange={(e) => handleSelect('allowMessages', e.target.value)}
              style={{
                padding: '10px 16px',
                fontSize: '14px',
                color: '#2D2A26',
                backgroundColor: 'white',
                border: '1px solid #E5E3DF',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '140px'
              }}
            >
              <option value="everyone">Everyone</option>
              <option value="friends">Friends Only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>

          {/* Allow Follows */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #E5E3DF'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Allow Others to Follow You
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Let other readers follow your activity on Verso
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.allowFollows}
                onChange={() => handleToggle('allowFollows')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.allowFollows ? '#9CAF88' : '#E5E3DF',
                transition: 'all 0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: settings.allowFollows ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>

          {/* Show in Search */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Appear in Search Results
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Allow your profile to appear in Verso search results
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.showInSearch}
                onChange={() => handleToggle('showInSearch')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.showInSearch ? '#9CAF88' : '#E5E3DF',
                transition: 'all 0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: settings.showInSearch ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>
        </div>

        {/* Data & Tracking */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E5E3DF',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '22px',
            fontWeight: '500',
            color: '#2D2A26',
            marginBottom: '24px'
          }}>
            Data & Tracking
          </h2>

          {/* Data Sharing */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #E5E3DF'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Share Data with Partners
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Allow Verso to share anonymized data with trusted partners
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.dataSharing}
                onChange={() => handleToggle('dataSharing')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.dataSharing ? '#9CAF88' : '#E5E3DF',
                transition: 'all 0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: settings.dataSharing ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>

          {/* Analytics Tracking */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0'
          }}>
            <div style={{ flex: 1, marginRight: '32px' }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '6px'
              }}>
                Analytics Tracking
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                Help us improve Verso by allowing anonymous usage analytics
              </div>
            </div>
            <label style={{
              position: 'relative',
              display: 'inline-block',
              width: '52px',
              height: '28px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.analyticsTracking}
                onChange={() => handleToggle('analyticsTracking')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.analyticsTracking ? '#9CAF88' : '#E5E3DF',
                transition: 'all 0.3s',
                borderRadius: '28px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '20px',
                  width: '20px',
                  left: settings.analyticsTracking ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s',
                  borderRadius: '50%'
                }} />
              </span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'flex-end'
        }}>
          <Link
            href="/profile"
            style={{
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: '500',
              color: '#6B6560',
              backgroundColor: 'transparent',
              border: '1px solid #E5E3DF',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F3F0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Cancel
          </Link>
          <button
            onClick={handleSaveSettings}
            style={{
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: '500',
              color: 'white',
              backgroundColor: '#800020',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#660019';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#800020';
            }}
          >
            Save Privacy Settings
          </button>
        </div>
      </div>
    </main>
  );
}
