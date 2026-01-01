'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ProfilePage() {
  // Sample user data - in production, this would come from authentication/database
  const [userData, setUserData] = useState({
    username: 'BookLover_23',
    email: 'reader@verso.com',
    dateJoined: 'November 15, 2024',
    birthday: 'March 12, 1995',
    status: 'Currently reading "The Last Library" by Sarah Chen',
    bio: 'Passionate about literary fiction and poetry. Always searching for stories that challenge perspective and touch the soul.',
    profilePicture: '', // Empty for now, will show initials
    likedGenres: ['Literary', 'Science Fiction', 'Poetry', 'Mystery', 'Fantasy'],
    stats: {
      storiesRead: 47,
      commentsLeft: 89,
      highlightsMade: 134,
      bookshelves: 12
    }
  });

  // Sample published stories - in production, this would come from database filtered by current user
  const [publishedStories, setPublishedStories] = useState([
    {
      id: '1',
      title: 'Echoes of Autumn',
      description: 'A contemplative piece exploring memory and the passage of time through the changing seasons.',
      genre: 'Literary',
      visibility: 'public',
      publishedDate: 'November 20, 2024',
      stats: {
        views: 342,
        comments: 15,
        likes: 67
      }
    },
    {
      id: '2',
      title: 'The Digital Horizon',
      description: 'Science fiction exploring the boundaries between human consciousness and artificial intelligence.',
      genre: 'Science Fiction',
      visibility: 'private',
      publishedDate: 'November 5, 2024',
      stats: {
        views: 0,
        comments: 0,
        likes: 0
      }
    }
  ]);

  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [tempStatus, setTempStatus] = useState(userData.status);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(userData.bio);
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);

  // Literary quotes
  const inspirationalQuotes = [
    {
      quote: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
      author: "George R.R. Martin"
    },
    {
      quote: "There is no friend as loyal as a book.",
      author: "Ernest Hemingway"
    },
    {
      quote: "Books are a uniquely portable magic.",
      author: "Stephen King"
    }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleSaveStatus = () => {
    setUserData({ ...userData, status: tempStatus });
    setIsEditingStatus(false);
  };

  const handleSaveBio = () => {
    setUserData({ ...userData, bio: tempBio });
    setIsEditingBio(false);
  };

  const handleDeleteStory = (storyId: string) => {
    // In production, this would call an API to delete from database
    setPublishedStories(publishedStories.filter(story => story.id !== storyId));
    setStoryToDelete(null);
    // Show success message
    alert('Story deleted successfully');
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
              color: '#800020',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '500',
            }}>
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Profile Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 40px 40px',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '48px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E5E3DF',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
            {/* Profile Picture */}
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #9CAF88 0%, #7A9B6E 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: '500',
              fontFamily: 'Georgia, serif',
              flexShrink: 0
            }}>
              {userData.username.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '36px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
              }}>
                {userData.username}
              </h1>
              <p style={{
                fontSize: '15px',
                color: '#6B6560',
                marginBottom: '24px'
              }}>
                {userData.email}
              </p>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                marginBottom: '32px'
              }}>
                {[
                  { label: 'Stories Read', value: userData.stats.storiesRead },
                  { label: 'Comments', value: userData.stats.commentsLeft },
                  { label: 'Highlights', value: userData.stats.highlightsMade },
                  { label: 'Bookshelves', value: userData.stats.bookshelves }
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    textAlign: 'center',
                    padding: '16px',
                    backgroundColor: '#F5F3F0',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      fontSize: '28px',
                      fontWeight: '600',
                      color: '#800020',
                      fontFamily: 'Georgia, serif',
                      marginBottom: '4px'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#6B6560',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#2D2A26',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    About
                  </h3>
                  {!isEditingBio && (
                    <button
                      onClick={() => {
                        setIsEditingBio(true);
                        setTempBio(userData.bio);
                      }}
                      style={{
                        fontSize: '13px',
                        color: '#800020',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
                {isEditingBio ? (
                  <div>
                    <textarea
                      value={tempBio}
                      onChange={(e) => setTempBio(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '15px',
                        fontFamily: 'Georgia, serif',
                        lineHeight: '1.6',
                        color: '#2D2A26',
                        backgroundColor: 'white',
                        border: '1px solid #E5E3DF',
                        borderRadius: '8px',
                        resize: 'vertical',
                        minHeight: '100px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#9CAF88'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#E5E3DF'}
                    />
                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                      <button
                        onClick={handleSaveBio}
                        style={{
                          padding: '8px 20px',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: 'white',
                          backgroundColor: '#800020',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingBio(false)}
                        style={{
                          padding: '8px 20px',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#6B6560',
                          backgroundColor: 'transparent',
                          border: '1px solid #E5E3DF',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: '#4A4640',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic'
                  }}>
                    {userData.bio}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '32px'
        }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Current Status */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E3DF',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h2 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '20px',
                  fontWeight: '500',
                  color: '#2D2A26',
                }}>
                  Current Status
                </h2>
                {!isEditingStatus && (
                  <button
                    onClick={() => {
                      setIsEditingStatus(true);
                      setTempStatus(userData.status);
                    }}
                    style={{
                      fontSize: '13px',
                      color: '#800020',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
              {isEditingStatus ? (
                <div>
                  <input
                    type="text"
                    value={tempStatus}
                    onChange={(e) => setTempStatus(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      fontSize: '15px',
                      color: '#2D2A26',
                      backgroundColor: 'white',
                      border: '1px solid #E5E3DF',
                      borderRadius: '8px',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#9CAF88'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#E5E3DF'}
                  />
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button
                      onClick={handleSaveStatus}
                      style={{
                        padding: '8px 20px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'white',
                        backgroundColor: '#800020',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingStatus(false)}
                      style={{
                        padding: '8px 20px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#6B6560',
                        backgroundColor: 'transparent',
                        border: '1px solid #E5E3DF',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#4A4640',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  padding: '16px',
                  backgroundColor: '#F5F3F0',
                  borderRadius: '8px',
                  borderLeft: '3px solid #9CAF88'
                }}>
                  {userData.status}
                </p>
              )}
            </div>

            {/* Favorite Genres */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E3DF',
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '20px'
              }}>
                Favorite Genres
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {userData.likedGenres.map((genre, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#F5F3F0',
                      border: '1.5px solid #E5E3DF',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#2D2A26',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#9CAF88';
                      e.currentTarget.style.backgroundColor = 'rgba(156, 175, 136, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E3DF';
                      e.currentTarget.style.backgroundColor = '#F5F3F0';
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Inspirational Quote */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E3DF',
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '20px'
              }}>
                Literary Inspiration
              </h2>
              <blockquote style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#2D2A26',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                margin: '0 0 16px 0',
                padding: '24px',
                backgroundColor: '#F5F3F0',
                borderRadius: '12px',
                borderLeft: '4px solid #800020'
              }}>
                "{inspirationalQuotes[currentQuoteIndex].quote}"
              </blockquote>
              <p style={{
                fontSize: '14px',
                color: '#6B6560',
                textAlign: 'right',
                fontFamily: 'Georgia, serif'
              }}>
                — {inspirationalQuotes[currentQuoteIndex].author}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                {inspirationalQuotes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuoteIndex(idx)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: currentQuoteIndex === idx ? '#800020' : '#E5E3DF',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* My Published Stories */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E3DF',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '20px',
                  fontWeight: '500',
                  color: '#2D2A26',
                }}>
                  My Published Stories
                </h2>
                <span style={{
                  fontSize: '14px',
                  color: '#6B6560',
                  padding: '6px 12px',
                  backgroundColor: '#F5F3F0',
                  borderRadius: '12px',
                  fontWeight: '500'
                }}>
                  {publishedStories.length} {publishedStories.length === 1 ? 'story' : 'stories'}
                </span>
              </div>

              {publishedStories.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  backgroundColor: '#F5F3F0',
                  borderRadius: '12px',
                  border: '2px dashed #E5E3DF'
                }}>
                  <p style={{
                    fontSize: '16px',
                    color: '#6B6560',
                    marginBottom: '16px',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic'
                  }}>
                    You haven't published any stories yet.
                  </p>
                  <Link
                    href="/write"
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      backgroundColor: '#800020',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#5C0015';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#800020';
                    }}
                  >
                    Start Writing
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {publishedStories.map((story) => (
                    <div
                      key={story.id}
                      style={{
                        padding: '20px',
                        backgroundColor: '#F5F3F0',
                        borderRadius: '12px',
                        border: '1px solid #E5E3DF',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '12px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h3 style={{
                              fontFamily: 'Georgia, serif',
                              fontSize: '18px',
                              fontWeight: '500',
                              color: '#2D2A26',
                              margin: 0
                            }}>
                              {story.title}
                            </h3>
                            <span style={{
                              fontSize: '11px',
                              padding: '4px 10px',
                              backgroundColor: story.visibility === 'public' ? 'rgba(156, 175, 136, 0.2)' : 'rgba(128, 0, 32, 0.1)',
                              color: story.visibility === 'public' ? '#7A9B6E' : '#800020',
                              borderRadius: '10px',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {story.visibility === 'public' ? '🌐 Public' : '🔒 Private'}
                            </span>
                          </div>
                          <p style={{
                            fontSize: '14px',
                            color: '#6B6560',
                            lineHeight: '1.5',
                            marginBottom: '12px'
                          }}>
                            {story.description}
                          </p>
                          <div style={{
                            display: 'flex',
                            gap: '16px',
                            fontSize: '13px',
                            color: '#9B9690'
                          }}>
                            <span>📚 {story.genre}</span>
                            <span>👁️ {story.stats.views} views</span>
                            <span>💬 {story.stats.comments} comments</span>
                            <span>❤️ {story.stats.likes} likes</span>
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#9B9690',
                            marginTop: '8px'
                          }}>
                            Published on {story.publishedDate}
                          </div>
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '8px',
                          marginLeft: '16px'
                        }}>
                          <Link
                            href={`/story/${story.id}`}
                            style={{
                              padding: '8px 16px',
                              fontSize: '13px',
                              fontWeight: '500',
                              color: '#800020',
                              backgroundColor: 'white',
                              border: '1px solid #800020',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              transition: 'all 0.2s',
                              display: 'inline-block'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#800020';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white';
                              e.currentTarget.style.color = '#800020';
                            }}
                          >
                            View
                          </Link>
                          <button
                            onClick={() => setStoryToDelete(story.id)}
                            style={{
                              padding: '8px 16px',
                              fontSize: '13px',
                              fontWeight: '500',
                              color: '#D32F2F',
                              backgroundColor: 'white',
                              border: '1px solid #D32F2F',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#D32F2F';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white';
                              e.currentTarget.style.color = '#D32F2F';
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Account Details */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E3DF',
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '24px'
              }}>
                Account Details
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { label: 'Date Joined', value: userData.dateJoined, icon: '📅' },
                  { label: 'Birthday', value: userData.birthday, icon: '🎂' },
                  { label: 'Username', value: userData.username, icon: '👤' },
                  { label: 'Email', value: userData.email, icon: '✉️' }
                ].map((detail, idx) => (
                  <div key={idx} style={{
                    padding: '16px',
                    backgroundColor: '#F5F3F0',
                    borderRadius: '8px',
                  }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#9B9690',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>{detail.icon}</span>
                      {detail.label}
                    </div>
                    <div style={{
                      fontSize: '15px',
                      color: '#2D2A26',
                      fontWeight: '500'
                    }}>
                      {detail.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              border: '1px solid #E5E3DF',
            }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '20px'
              }}>
                Quick Actions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Edit Profile', href: '/profile/edit' },
                  { label: 'Account Settings', href: '/settings' },
                  { label: 'Privacy Settings', href: '/settings/privacy' },
                  { label: 'Sign Out', href: '/auth/logout' }
                ].map((action, idx) => (
                  <Link
                    key={idx}
                    href={action.href}
                    style={{
                      padding: '14px 20px',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#2D2A26',
                      backgroundColor: '#F5F3F0',
                      border: '1px solid #E5E3DF',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      display: 'block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#9CAF88';
                      e.currentTarget.style.backgroundColor = 'rgba(156, 175, 136, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E5E3DF';
                      e.currentTarget.style.backgroundColor = '#F5F3F0';
                    }}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {storyToDelete && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setStoryToDelete(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              backdropFilter: 'blur(4px)'
            }}
          />

          {/* Modal */}
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            zIndex: 1001,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: '1px solid #E5E3DF'
          }}>
            <div style={{
              fontSize: '40px',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              ⚠️
            </div>
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '24px',
              fontWeight: '500',
              color: '#2D2A26',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              Delete Story?
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#6B6560',
              lineHeight: '1.6',
              textAlign: 'center',
              marginBottom: '32px'
            }}>
              Are you sure you want to delete "{publishedStories.find(s => s.id === storyToDelete)?.title}"?
              This action cannot be undone. All comments, likes, and engagement data will be permanently lost.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setStoryToDelete(null)}
                style={{
                  padding: '12px 32px',
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#2D2A26',
                  backgroundColor: 'white',
                  border: '1px solid #E5E3DF',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F3F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteStory(storyToDelete)}
                style={{
                  padding: '12px 32px',
                  fontSize: '15px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: '#D32F2F',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B71C1C';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#D32F2F';
                }}
              >
                Delete Forever
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
