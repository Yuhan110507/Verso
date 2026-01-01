'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const MAIN_GENRES = [
  'All',
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
];

const ADDITIONAL_GENRES = [
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
  'Young Adult',
];

export default function DiscoverPage() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [works, setWorks] = useState<any[]>([]);
  const [filteredWorks, setFilteredWorks] = useState<any[]>([]);
  const [showMoreGenres, setShowMoreGenres] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch public works from database
  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/works?visibility=public');
        const result = await response.json();
        if (result.data) {
          setWorks(result.data);
          setFilteredWorks(result.data);
        }
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter works by genre and search term
  useEffect(() => {
    let filtered = works;

    if (selectedGenre !== 'All') {
      filtered = filtered.filter((w) => w.genre === selectedGenre);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (w.author?.display_name || w.author?.username || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredWorks(filtered);
  }, [selectedGenre, searchTerm, works]);

  const allGenres = showMoreGenres ? [...MAIN_GENRES, ...ADDITIONAL_GENRES] : MAIN_GENRES;

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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
          background: scrolled
            ? 'rgba(252, 251, 249, 0.85)'
            : 'rgba(252, 251, 249, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: scrolled
            ? '0 2px 8px rgba(45, 42, 38, 0.06)'
            : '0 1px 3px rgba(45, 42, 38, 0.03)',
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
          <Link href="/author" className="text-[#75716B] hover:text-[#2D2A26] transition-colors duration-200 font-light text-sm">
            Authors
          </Link>
          <Link href="/library" className="text-[#75716B] hover:text-[#2D2A26] transition-colors duration-200 font-light text-sm">
            Library
          </Link>
          <Link href="/groups" className="text-[#75716B] hover:text-[#2D2A26] transition-colors duration-200 font-light text-sm">
            Groups
          </Link>
          <Link href="/write" className="text-[#75716B] hover:text-[#2D2A26] transition-colors duration-200 font-light text-sm">
            Write
          </Link>
          <Link href="/auth/login" className="text-[#75716B] hover:text-[#2D2A26] transition-colors duration-200 font-light text-sm">
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-6 py-2 bg-[#800020] text-white rounded-lg font-light text-sm transition-all duration-300 hover:bg-[#660033] hover:shadow-md"
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

      {/* Page Header with Literary Tagline */}
      <div style={{padding: '100px 48px 48px 48px', maxWidth: '1200px', margin: '0 auto'}}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '56px',
          fontWeight: '400',
          color: '#2D2A26',
          lineHeight: '1.3',
          letterSpacing: '-0.02em',
          marginBottom: '16px',
          margin: 0
        }}>
          Discover
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '36px',
            fontWeight: '300',
            color: 'rgba(128, 0, 32, 0.75)',
            marginLeft: '12px',
            letterSpacing: '0.015em',
            transition: 'color 0.3s ease'
          }}>
            the untold tale
          </span>
        </h1>
        <p style={{
          fontFamily: 'Georgia, serif',
          fontSize: '18px',
          fontWeight: '300',
          color: '#75716B',
          lineHeight: '1.6',
          maxWidth: '600px',
          marginTop: '12px'
        }}>
          Explore stories from our literary community
        </p>
      </div>

      {/* Search Bar */}
      <div style={{maxWidth: '700px', margin: '0 auto 48px auto', padding: '0 48px', position: 'relative'}}>
        <svg
          style={{
            position: 'absolute',
            left: '68px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            color: '#75716B',
            pointerEvents: 'none'
          }}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="9" r="6"></circle>
          <path d="M14 14L18 18" strokeLinecap="round"></path>
        </svg>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            height: '56px',
            padding: '0 24px 0 56px',
            background: '#FDFCFA',
            borderRadius: '28px',
            border: '1.5px solid rgba(229, 227, 223, 0.4)',
            boxShadow: '0 4px 16px rgba(45, 42, 38, 0.04), 0 2px 8px rgba(45, 42, 38, 0.02)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '16px',
            color: '#2D2A26',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(128, 0, 32, 0.3)';
            e.target.style.boxShadow = '0 8px 24px rgba(45, 42, 38, 0.08), 0 0 0 4px rgba(128, 0, 32, 0.08)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(229, 227, 223, 0.4)';
            e.target.style.boxShadow = '0 4px 16px rgba(45, 42, 38, 0.04), 0 2px 8px rgba(45, 42, 38, 0.02)';
            e.target.style.transform = 'translateY(0)';
          }}
        />
      </div>

      {/* Category Pills */}
      <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto 64px auto', padding: '0 48px'}}>
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            style={{
              padding: '10px 24px',
              borderRadius: '20px',
              background: selectedGenre === genre ? '#800020' : 'rgba(255, 255, 255, 0.4)',
              border: selectedGenre === genre ? '1.5px solid #800020' : '1.5px solid rgba(229, 227, 223, 0.3)',
              fontFamily: 'Georgia, serif',
              fontSize: '15px',
              color: selectedGenre === genre ? 'white' : '#75716B',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: selectedGenre === genre ? '0 4px 12px rgba(128, 0, 32, 0.15)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedGenre !== genre) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
                e.currentTarget.style.color = '#2D2A26';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 42, 38, 0.06)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedGenre !== genre) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.3)';
                e.currentTarget.style.color = '#75716B';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={() => setShowMoreGenres(!showMoreGenres)}
          style={{
            padding: '10px 24px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.4)',
            border: '1.5px solid rgba(229, 227, 223, 0.3)',
            fontFamily: 'Georgia, serif',
            fontSize: '15px',
            color: '#75716B',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
            e.currentTarget.style.color = '#2D2A26';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 42, 38, 0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.3)';
            e.currentTarget.style.color = '#75716B';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {showMoreGenres ? 'Less' : 'More'}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: showMoreGenres ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Stories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '32px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 48px 100px 48px'
      }}>
        {loading ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '60px 20px',
            color: '#75716B',
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
          }}>
            Discovering stories...
          </div>
        ) : filteredWorks.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '60px 20px',
          }}>
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px',
              fontWeight: '300',
              color: '#2D2A26',
              marginBottom: '12px',
            }}>
              No Stories Found
            </h3>
            <p style={{
              fontSize: '17px',
              color: '#75716B',
              lineHeight: '1.6',
              fontStyle: 'italic',
            }}>
              The shelves await the first tale to be told
            </p>
          </div>
        ) : filteredWorks.map((work) => (
          <Link key={work.id} href={`/work/${work.id}`}>
            <div
              style={{
                background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
                border: '1px solid rgba(229, 227, 223, 0.25)',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(45, 42, 38, 0.04), 0 1px 3px rgba(45, 42, 38, 0.02)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                setHoveredWork(work.id);
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(45, 42, 38, 0.08), 0 4px 12px rgba(45, 42, 38, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.4)';
              }}
              onMouseLeave={(e) => {
                setHoveredWork(null);
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 42, 38, 0.04), 0 1px 3px rgba(45, 42, 38, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.25)';
              }}
            >
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: '500',
                color: '#2D2A26',
                lineHeight: '1.3',
                letterSpacing: '-0.01em',
                marginBottom: '8px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#800020';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#2D2A26';
              }}>
                {work.title}
              </h3>

              <p style={{
                fontSize: '14px',
                color: '#75716B',
                marginBottom: '16px'
              }}>
                by {work.author?.display_name || work.author?.username || 'Unknown'}
              </p>

              {work.description && (
                <p style={{
                  fontSize: '15px',
                  color: '#75716B',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {work.description}
                </p>
              )}

              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid rgba(229, 227, 223, 0.2)'
              }}>
                {work.genre && (
                  <>
                    <span style={{fontSize: '13px', color: '#800020', fontWeight: '500'}}>
                      {work.genre}
                    </span>
                    <span style={{color: '#D1C4B8'}}>·</span>
                  </>
                )}
                <span style={{fontSize: '13px', color: '#9B9690'}}>
                  {work.word_count?.toLocaleString() || 0} words
                </span>
                <span style={{color: '#D1C4B8'}}>·</span>
                <span style={{fontSize: '13px', color: '#9B9690'}}>
                  {work.reading_time_minutes || 0} min read
                </span>
              </div>

              {/* Hover Overlay */}
              {hoveredWork === work.id && (
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  zIndex: 10,
                  animation: 'slideIn 0.3s ease',
                  pointerEvents: 'none'
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#800020',
                    marginBottom: '12px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    Story Preview
                  </div>
                  <h3 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '22px',
                    fontWeight: '500',
                    color: '#2D2A26',
                    lineHeight: '1.3',
                    marginBottom: '12px'
                  }}>
                    {work.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#75716B',
                    marginBottom: '16px'
                  }}>
                    by {work.author?.display_name || work.author?.username || 'Unknown'}
                  </p>
                  <p style={{
                    fontSize: '15px',
                    color: '#2D2A26',
                    lineHeight: '1.6',
                    fontFamily: 'Georgia, serif',
                    marginBottom: '16px'
                  }}>
                    {work.description || 'A story waiting to be discovered...'}
                  </p>
                  {work.genre && (
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(229, 227, 223, 0.3)',
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: '12px',
                        color: '#800020',
                        padding: '4px 12px',
                        background: 'rgba(128, 0, 32, 0.08)',
                        borderRadius: '12px'
                      }}>
                        {work.genre}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
