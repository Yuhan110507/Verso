'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthorPage() {
  const params = useParams();
  const authorId = params.id as string;
  const { user } = useAuth();

  const [author, setAuthor] = useState<any>(null);
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    const fetchAuthorData = async () => {
      setLoading(true);
      try {
        // Fetch author profile by username or ID
        let query = supabase
          .from('users')
          .select('*');

        // Check if authorId is a UUID or username
        if (authorId.includes('-') && authorId.length > 30) {
          // Looks like a UUID
          query = query.eq('uid', authorId);
        } else {
          // Looks like a username
          query = query.eq('username', authorId);
        }

        const { data: authorData, error: authorError } = await query.single();

        if (authorError) {
          console.error('Error fetching author:', authorError);
          setLoading(false);
          return;
        }

        setAuthor(authorData);

        // Fetch author's published works
        const { data: worksData, error: worksError } = await supabase
          .from('works')
          .select('*')
          .eq('author_id', authorData.uid)
          .eq('visibility', 'public')
          .order('published_at', { ascending: false });

        if (worksError) {
          console.error('Error fetching works:', worksError);
        } else {
          setWorks(worksData || []);
        }

        // TODO: Fetch follow status and follower count
        // For now, set to 0
        setFollowerCount(0);

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  const handleFollowToggle = () => {
    // TODO: Implement follow/unfollow functionality with database
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
    setIsFollowing(!isFollowing);
  };

  if (loading) {
    return (
      <main style={{
        backgroundColor: '#F5F3F0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ fontSize: '18px', color: '#6B6560' }}>Loading...</p>
      </main>
    );
  }

  if (!author) {
    return (
      <main style={{
        backgroundColor: '#F5F3F0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '32px',
          color: '#2D2A26'
        }}>Author Not Found</h1>
        <Link href="/discover" style={{
          color: '#800020',
          textDecoration: 'none',
          fontSize: '16px'
        }}>
          Return to Discover
        </Link>
      </main>
    );
  }

  const isOwnProfile = user && (user.id === author.uid);

  return (
    <main style={{ backgroundColor: '#F5F3F0', minHeight: '100vh' }}>
      {/* Author Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #E5E3DF',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '60px 40px',
        }}>
          {/* Back Button */}
          <Link
            href="/discover"
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
            Back to Discover
          </Link>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
            {/* Avatar */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: author.avatar_url
                ? `url(${author.avatar_url})`
                : 'linear-gradient(135deg, #9CAF88 0%, #7A9B6E 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: '500',
              flexShrink: '0',
              fontFamily: 'Georgia, serif',
            }}>
              {!author.avatar_url && (author.display_name || author.username).charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '42px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '12px',
                letterSpacing: '-0.02em',
              }}>
                {author.display_name || author.username}
              </h1>
              {author.bio && (
                <p style={{
                  fontSize: '18px',
                  color: '#6B6560',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                }}>
                  {author.bio}
                </p>
              )}
              <div style={{
                display: 'flex',
                gap: '20px',
                fontSize: '15px',
                color: '#9B9690',
                marginBottom: '20px',
              }}>
                <span>{works.length} {works.length === 1 ? 'work' : 'works'} published</span>
                <span>•</span>
                <span>{followerCount.toLocaleString()} followers</span>
              </div>
              {isOwnProfile ? (
                <Link
                  href="/settings"
                  style={{
                    display: 'inline-block',
                    padding: '8px 24px',
                    backgroundColor: 'white',
                    color: '#800020',
                    border: '1.5px solid #800020',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  Edit Profile
                </Link>
              ) : (
                <button
                  onClick={handleFollowToggle}
                  style={{
                    padding: '8px 24px',
                    backgroundColor: isFollowing ? 'white' : '#800020',
                    color: isFollowing ? '#800020' : 'white',
                    border: isFollowing ? '1.5px solid #800020' : 'none',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    outline: 'none',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    if (isFollowing) {
                      e.currentTarget.style.backgroundColor = '#F5F3F0';
                    } else {
                      e.currentTarget.style.backgroundColor = '#660033';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFollowing) {
                      e.currentTarget.style.backgroundColor = 'white';
                    } else {
                      e.currentTarget.style.backgroundColor = '#800020';
                    }
                  }}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 40px',
      }}>
        {/* About Section */}
        {(author.writing_philosophy || (author.influences && author.influences.length > 0)) && (
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px',
              fontWeight: '500',
              color: '#2D2A26',
              marginBottom: '20px',
            }}>
              About
            </h2>
            {author.writing_philosophy && (
              <p style={{
                fontSize: '17px',
                color: '#4A4640',
                lineHeight: '1.8',
                marginBottom: '24px',
              }}>
                {author.writing_philosophy}
              </p>
            )}
            {author.influences && author.influences.length > 0 && (
              <div>
                <h3 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '18px',
                  fontWeight: '500',
                  color: '#2D2A26',
                  marginBottom: '12px',
                }}>
                  Literary Influences
                </h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {author.influences.map((influence: string, idx: number) => (
                    <span
                      key={idx}
                      style={{
                        padding: '6px 16px',
                        backgroundColor: '#F5F3F0',
                        borderRadius: '20px',
                        fontSize: '14px',
                        color: '#6B6560',
                        border: '1px solid #E5E3DF',
                      }}
                    >
                      {influence}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Published Works */}
        <section>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '28px',
            fontWeight: '500',
            color: '#2D2A26',
            marginBottom: '24px',
          }}>
            Published Works
          </h2>
          {works.length === 0 ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '48px',
              textAlign: 'center',
              border: '1px solid #E5E3DF',
            }}>
              <p style={{
                fontSize: '16px',
                color: '#9B9690',
              }}>
                {isOwnProfile ? "You haven't published any works yet." : "This author hasn't published any works yet."}
              </p>
              {isOwnProfile && (
                <Link
                  href="/write"
                  style={{
                    display: 'inline-block',
                    marginTop: '20px',
                    padding: '10px 24px',
                    backgroundColor: '#800020',
                    color: 'white',
                    borderRadius: '20px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  Start Writing
                </Link>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {works.map((work: any) => (
                <Link
                  key={work.id}
                  href={`/work/${work.id}`}
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
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {work.genre && (
                    <div style={{
                      fontSize: '13px',
                      color: '#9B9690',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                      fontFamily: 'system-ui, sans-serif',
                    }}>
                      {work.genre}
                    </div>
                  )}
                  <h3 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#2D2A26',
                    marginBottom: '12px',
                  }}>
                    {work.title}
                  </h3>
                  {work.description && (
                    <p style={{
                      fontSize: '15px',
                      color: '#6B6560',
                      marginBottom: '12px',
                      lineHeight: '1.6',
                    }}>
                      {work.description}
                    </p>
                  )}
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '14px',
                    color: '#9B9690',
                  }}>
                    <span>{work.word_count?.toLocaleString() || 0} words</span>
                    <span>·</span>
                    <span>{work.reading_time_minutes || 0} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
