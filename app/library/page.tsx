'use client';

import { useState } from 'react';
import Link from 'next/link';

// TODO: Add authentication check - this page should only be accessible to logged-in users
// TODO: Fetch user-specific data from Supabase based on authenticated user ID
// This is a PRIVATE page - each user should only see their own library content

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'highlights' | 'appreciated'>('bookmarks');

  // Sample data - in production, this would come from Supabase
  const bookmarkedStories = [
    {
      id: '1',
      title: 'The Last Library',
      author: 'Sarah Chen',
      genre: 'Science Fiction',
      wordCount: 2847,
      readingTime: 12,
      bookmarkedDate: '2024-12-10',
    },
    {
      id: '3',
      title: 'Clockwork Hearts',
      author: 'Elena Volkov',
      genre: 'Fantasy',
      wordCount: 2943,
      readingTime: 13,
      bookmarkedDate: '2024-12-12',
    },
  ];

  const highlights = [
    {
      id: '1',
      storyId: '1',
      storyTitle: 'The Last Library',
      author: 'Sarah Chen',
      text: "Every reader is a writer. The question is whether you'll accept the invitation.",
      annotation: 'Beautiful reminder about the power of reading and creating.',
      type: 'private',
      date: '2024-12-10',
    },
    {
      id: '2',
      storyId: '5',
      storyTitle: 'Whispers of Tomorrow',
      author: 'Ava Summers',
      text: "Some love stories aren't written in days or years. Some are written in whispers of tomorrow.",
      annotation: '',
      type: 'public',
      date: '2024-12-13',
    },
  ];

  const appreciatedStories = [
    {
      id: '2',
      title: 'Beneath the Surface',
      author: 'James Mitchell',
      genre: 'Literary',
      wordCount: 2156,
      readingTime: 9,
      appreciatedDate: '2024-12-11',
    },
  ];

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
              color: '#800020',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '500',
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
          </div>
        </div>
      </nav>

      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 40px 40px',
      }}>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#6B6560',
            textDecoration: 'none',
            fontSize: '15px',
            marginBottom: '32px',
            transition: 'color 0.2s',
            fontFamily: 'system-ui, sans-serif',
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
          Back to Home
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '48px',
            fontWeight: '500',
            color: '#2D2A26',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            My Library
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            backgroundColor: 'rgba(128, 0, 32, 0.08)',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#800020',
            fontWeight: '500',
          }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '14px', height: '14px' }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Private
          </div>
        </div>
        <p style={{
          fontSize: '18px',
          color: '#6B6560',
          lineHeight: '1.6',
          maxWidth: '600px',
          marginTop: '12px',
        }}>
          Your personal collection of bookmarked stories, highlights, and appreciated works. Only you can see this content.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px',
        borderBottom: '1px solid #E5E3DF',
      }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          <button
            onClick={() => setActiveTab('bookmarks')}
            style={{
              padding: '16px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'bookmarks' ? '2px solid #800020' : '2px solid transparent',
              color: activeTab === 'bookmarks' ? '#800020' : '#6B6560',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              outline: 'none',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Bookmarks ({bookmarkedStories.length})
          </button>
          <button
            onClick={() => setActiveTab('highlights')}
            style={{
              padding: '16px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'highlights' ? '2px solid #800020' : '2px solid transparent',
              color: activeTab === 'highlights' ? '#800020' : '#6B6560',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              outline: 'none',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Highlights ({highlights.length})
          </button>
          <button
            onClick={() => setActiveTab('appreciated')}
            style={{
              padding: '16px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'appreciated' ? '2px solid #800020' : '2px solid transparent',
              color: activeTab === 'appreciated' ? '#800020' : '#6B6560',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              outline: 'none',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Appreciated ({appreciatedStories.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 40px 80px',
      }}>
        {/* Bookmarks Tab */}
        {activeTab === 'bookmarks' && (
          <div>
            {bookmarkedStories.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
              }}>
                <p style={{
                  fontSize: '18px',
                  color: '#9B9690',
                  marginBottom: '24px',
                }}>
                  No bookmarked stories yet
                </p>
                <Link
                  href="/discover"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    backgroundColor: '#800020',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#660033';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#800020';
                  }}
                >
                  Discover Stories
                </Link>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '24px',
              }}>
                {bookmarkedStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/work/${story.id}`}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '28px',
                      textDecoration: 'none',
                      border: '1px solid #E5E3DF',
                      transition: 'all 0.3s ease',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      fontSize: '13px',
                      color: '#9B9690',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                      fontFamily: 'system-ui, sans-serif',
                    }}>
                      {story.genre}
                    </div>
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '22px',
                      fontWeight: '500',
                      color: '#2D2A26',
                      marginBottom: '8px',
                    }}>
                      {story.title}
                    </h3>
                    <p style={{
                      fontSize: '15px',
                      color: '#6B6560',
                      marginBottom: '16px',
                    }}>
                      by {story.author}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                      color: '#9B9690',
                    }}>
                      <span>{story.wordCount.toLocaleString()} words • {story.readingTime} min</span>
                      <span style={{ fontSize: '12px' }}>
                        Saved {new Date(story.bookmarkedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Highlights Tab */}
        {activeTab === 'highlights' && (
          <div>
            {highlights.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
              }}>
                <p style={{
                  fontSize: '18px',
                  color: '#9B9690',
                }}>
                  No highlights yet. Start highlighting passages in stories!
                </p>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                maxWidth: '800px',
              }}>
                {highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '28px',
                      border: '1px solid #E5E3DF',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                    }}>
                      <Link
                        href={`/work/${highlight.storyId}`}
                        style={{
                          textDecoration: 'none',
                        }}
                      >
                        <h4 style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '18px',
                          fontWeight: '500',
                          color: '#2D2A26',
                          marginBottom: '4px',
                        }}>
                          {highlight.storyTitle}
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: '#6B6560',
                        }}>
                          by {highlight.author}
                        </p>
                      </Link>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: highlight.type === 'private' ? 'rgba(255, 235, 156, 0.2)' : 'rgba(156, 175, 136, 0.2)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#6B6560',
                        fontFamily: 'system-ui, sans-serif',
                      }}>
                        {highlight.type === 'private' ? '🔒 Private' : '🌐 Public'}
                      </span>
                    </div>
                    <blockquote style={{
                      margin: '20px 0',
                      padding: '16px 20px',
                      backgroundColor: '#F5F3F0',
                      borderLeft: '3px solid #9CAF88',
                      borderRadius: '8px',
                      fontFamily: 'Georgia, serif',
                      fontSize: '16px',
                      lineHeight: '1.7',
                      color: '#2D2A26',
                      fontStyle: 'italic',
                    }}>
                      "{highlight.text}"
                    </blockquote>
                    {highlight.annotation && (
                      <p style={{
                        fontSize: '15px',
                        color: '#4A4640',
                        lineHeight: '1.6',
                        marginTop: '16px',
                      }}>
                        <strong>Note:</strong> {highlight.annotation}
                      </p>
                    )}
                    <p style={{
                      fontSize: '13px',
                      color: '#9B9690',
                      marginTop: '16px',
                    }}>
                      {new Date(highlight.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Appreciated Tab */}
        {activeTab === 'appreciated' && (
          <div>
            {appreciatedStories.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
              }}>
                <p style={{
                  fontSize: '18px',
                  color: '#9B9690',
                }}>
                  No appreciated stories yet
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '24px',
              }}>
                {appreciatedStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/work/${story.id}`}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '28px',
                      textDecoration: 'none',
                      border: '1px solid #E5E3DF',
                      transition: 'all 0.3s ease',
                      display: 'block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      fontSize: '13px',
                      color: '#9B9690',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                      fontFamily: 'system-ui, sans-serif',
                    }}>
                      {story.genre}
                    </div>
                    <h3 style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '22px',
                      fontWeight: '500',
                      color: '#2D2A26',
                      marginBottom: '8px',
                    }}>
                      {story.title}
                    </h3>
                    <p style={{
                      fontSize: '15px',
                      color: '#6B6560',
                      marginBottom: '16px',
                    }}>
                      by {story.author}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '14px',
                      color: '#9B9690',
                    }}>
                      <span>{story.wordCount.toLocaleString()} words • {story.readingTime} min</span>
                      <span style={{ fontSize: '12px' }}>
                        ❤️ {new Date(story.appreciatedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
