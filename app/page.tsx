'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  const quotes = [
    {
      text: 'A reader lives a thousand lives before he dies. The man who never reads lives only one.',
      author: 'George R.R. Martin',
    },
    {
      text: 'So we beat on, boats against the current, borne back ceaselessly into the past.',
      author: 'F. Scott Fitzgerald',
      source: 'The Great Gatsby',
    },
    {
      text: 'Writing is the painting of the voice.',
      author: 'Voltaire',
    },
    {
      text: 'Not all those who wander are lost.',
      author: 'J.R.R. Tolkien',
      source: 'The Fellowship of the Ring',
    },
    {
      text: 'I took a deep breath and listened to the old brag of my heart: I am, I am, I am.',
      author: 'Sylvia Plath',
      source: 'The Bell Jar',
    },
    {
      text: 'I can shake off everything as I write; my sorrows disappear, my courage is reborn.',
      author: 'Anne Frank',
    },
    {
      text: 'There is no friend as loyal as a book.',
      author: 'Ernest Hemingway',
    },
    {
      text: 'The world is a book, and those who do not travel read only one page.',
      author: 'Saint Augustine',
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setQuoteVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        margin: 0,
        padding: 0
      }}
    >
      {/* Navigation Bar - Floating Glass Effect */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: '64px',
          padding: '0 48px',
          margin: 0,
          background: scrolled
            ? 'rgba(252, 251, 249, 0.85)'
            : 'rgba(252, 251, 249, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: scrolled
            ? '0 2px 8px rgba(45, 42, 38, 0.06)'
            : '0 1px 3px rgba(45, 42, 38, 0.03)',
          borderBottom: '1px solid rgba(229, 227, 223, 0.2)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-16" style={{margin: 0}}>
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden" style={{marginTop: '64px', margin: 0, padding: '128px 24px 96px 24px'}}>
        {/* Decorative Quote Mark */}
        <div className={`absolute top-20 left-6 md:left-12 text-8xl text-[#C19A6B]/20 font-serif transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: '0.1s'}}>
          "
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className={`text-5xl md:text-7xl font-serif font-bold text-[#36454F] mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '0.2s'}}>
            Where Stories
            <span className="block text-[#800020]">Find Their Voice</span>
          </h1>

          <p className={`text-lg md:text-xl text-[#36454F]/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '0.4s'}}>
            A literary community where authors craft brilliant works and readers discover profound connections through thoughtful engagement.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay: '0.6s'}}>
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-[#800020] text-white rounded-lg font-light hover:bg-[#5C0015] hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 4px 12px rgba(128, 0, 32, 0.2)'
              }}
            >
              Join Verso
            </Link>
            <Link
              href="/discover"
              className="px-8 py-3 border-2 border-[#800020] text-[#800020] rounded-lg font-light hover:bg-[#800020]/5 transition-all duration-300"
            >
              Explore Works
            </Link>
          </div>
        </div>

        {/* Decorative Book Spines */}
        <div className="absolute bottom-12 left-8 opacity-10 hidden lg:block">
          <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
            <rect x="0" y="0" width="20" height="120" fill="#800020" rx="2"></rect>
            <rect x="25" y="0" width="20" height="120" fill="#9CAF88" rx="2"></rect>
            <rect x="50" y="0" width="20" height="120" fill="#C19A6B" rx="2"></rect>
          </svg>
        </div>

        {/* Dot Pattern */}
        <div className="absolute top-1/2 right-12 opacity-5">
          <div className="grid grid-cols-4 gap-4">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#800020] rounded-full"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Literature Matters Section */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ margin: 0, background: 'transparent' }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 60% 50%, rgba(193, 154, 107, 0.07) 0%, transparent 65%)'
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div style={{
              display: 'inline-block', padding: '8px 24px',
              backgroundColor: 'rgba(193, 154, 107, 0.12)', borderRadius: '24px',
              marginBottom: '24px', fontSize: '13px', fontWeight: '600',
              color: '#A67C52', letterSpacing: '0.08em', textTransform: 'uppercase'
            }}>
              Why It Matters
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2A26] mb-6" style={{ letterSpacing: '-0.02em' }}>
              Literature Is Not a Luxury.<br />
              <span style={{ color: '#800020' }}>It Is How We Understand Ourselves.</span>
            </h2>
            <p className="text-lg text-[#6B6560] font-light max-w-3xl mx-auto" style={{ lineHeight: '1.8' }}>
              In a world of endless noise, literature offers something irreplaceable — the chance to inhabit other minds, wrestle with ideas, and feel less alone. Reading doesn't just entertain; it transforms.
            </p>
          </div>

          {/* Four impact pillars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                stat: '68%',
                color: '#800020',
                bg: 'rgba(128, 0, 32, 0.06)',
                icon: '🧘',
                title: 'Stress Reduced',
                body: 'Just six minutes of reading can lower cortisol levels by up to 68% — more effective than music or a walk.'
              },
              {
                stat: '+55%',
                color: '#9CAF88',
                bg: 'rgba(156, 175, 136, 0.10)',
                icon: '🤝',
                title: 'Empathy Gained',
                body: 'Readers of literary fiction show measurably higher empathy and social perception than non-readers.'
              },
              {
                stat: '32%',
                color: '#C19A6B',
                bg: 'rgba(193, 154, 107, 0.10)',
                icon: '🧠',
                title: 'Slower Cognitive Decline',
                body: 'Regular reading slows age-related cognitive decline by up to 32%, keeping minds sharper for longer.'
              },
              {
                stat: '∞',
                color: '#7A6E5F',
                bg: 'rgba(122, 110, 95, 0.08)',
                icon: '🌍',
                title: 'Lives Lived',
                body: 'Through fiction, a single reader can inhabit thousands of lives, cultures, and centuries they would never otherwise know.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: 'white', borderRadius: '20px', padding: '32px 24px',
                border: '1px solid rgba(229, 227, 223, 0.5)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s ease', textAlign: 'center'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '56px', height: '56px', borderRadius: '50%',
                  backgroundColor: item.bg, fontSize: '24px', marginBottom: '16px'
                }}>
                  {item.icon}
                </div>
                <div style={{
                  fontFamily: 'Georgia, serif', fontSize: '40px', fontWeight: '700',
                  color: item.color, marginBottom: '8px', lineHeight: 1
                }}>
                  {item.stat}
                </div>
                <div style={{
                  fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: '600',
                  color: '#2D2A26', marginBottom: '10px'
                }}>
                  {item.title}
                </div>
                <p style={{ fontSize: '13px', color: '#6B6560', lineHeight: '1.65' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div style={{
            maxWidth: '780px', margin: '0 auto', textAlign: 'center',
            padding: '40px 48px',
            background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.04) 0%, rgba(193, 154, 107, 0.06) 100%)',
            borderRadius: '20px', border: '1px solid rgba(128, 0, 32, 0.08)'
          }}>
            <p style={{
              fontFamily: 'Georgia, serif', fontSize: '22px', fontStyle: 'italic',
              color: '#2D2A26', lineHeight: '1.7', marginBottom: '16px'
            }}>
              &ldquo;A reader lives a thousand lives before he dies. The man who never reads lives only one.&rdquo;
            </p>
            <span style={{ fontSize: '14px', color: '#9B9690', fontStyle: 'italic' }}>— George R.R. Martin</span>
          </div>
        </div>
      </section>

      {/* Why Verso Section - Value Proposition */}
      <section className="py-24 px-6 relative overflow-hidden" style={{
        margin: 0,
        background: 'transparent'
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div style={{
              display: 'inline-block',
              padding: '8px 24px',
              backgroundColor: 'rgba(128, 0, 32, 0.1)',
              borderRadius: '24px',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#800020',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Why Choose Verso
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2A26] mb-6" style={{
              letterSpacing: '-0.02em'
            }}>
              More Than Just a Platform.<br />
              <span style={{ color: '#800020' }}>A Literary Movement.</span>
            </h2>
            <p className="text-lg text-[#6B6560] font-light max-w-3xl mx-auto" style={{
              lineHeight: '1.8'
            }}>
              Verso isn't another writing site cluttered with noise. It's a carefully crafted space where literature thrives,
              thoughtful readers engage, and writers grow their craft through meaningful feedback.
            </p>
          </div>

          {/* Value Propositions Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Quality Over Quantity */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px 32px',
              border: '1px solid rgba(229, 227, 223, 0.4)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #800020 0%, #5C0015 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                fontSize: '32px'
              }}>
                ✨
              </div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: '600',
                color: '#2D2A26',
                marginBottom: '12px'
              }}>
                Quality Over Quantity
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#6B6560'
              }}>
                No algorithm-driven feeds or viral distractions. Every story is curated, every comment is thoughtful.
                We prioritize craft, substance, and literary merit.
              </p>
            </div>

            {/* Constructive Community */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px 32px',
              border: '1px solid rgba(229, 227, 223, 0.4)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #9CAF88 0%, #7A9B6E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                fontSize: '32px'
              }}>
                💬
              </div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: '600',
                color: '#2D2A26',
                marginBottom: '12px'
              }}>
                Constructive Community
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#6B6560'
              }}>
                Get feedback that actually helps you grow. Our readers understand craft and respect the creative process.
                No trolls, no spam—just genuine literary dialogue.
              </p>
            </div>

            {/* Professional Experience */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px 32px',
              border: '1px solid rgba(229, 227, 223, 0.4)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #C19A6B 0%, #A67C52 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                fontSize: '32px'
              }}>
                📖
              </div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: '600',
                color: '#2D2A26',
                marginBottom: '12px'
              }}>
                Professional Experience
              </h3>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#6B6560'
              }}>
                Beautiful typography, sophisticated highlighting, inline annotations. Your work deserves to be presented
                with the same care you put into writing it.
              </p>
            </div>
          </div>

          {/* Comparison/Stats Block */}
          <div style={{
            backgroundColor: 'rgba(252, 251, 249, 0.8)',
            borderRadius: '24px',
            padding: '48px',
            border: '2px solid rgba(128, 0, 32, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  color: '#800020',
                  fontFamily: 'Georgia, serif',
                  marginBottom: '8px'
                }}>
                  100%
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#2D2A26',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  Literary Focus
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6B6560'
                }}>
                  No lifestyle blogs, no clickbait. Just literature.
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  color: '#9CAF88',
                  fontFamily: 'Georgia, serif',
                  marginBottom: '8px'
                }}>
                  0%
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#2D2A26',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  Algorithm Manipulation
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6B6560'
                }}>
                  Your work reaches readers who care, not what trends.
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  color: '#C19A6B',
                  fontFamily: 'Georgia, serif',
                  marginBottom: '8px'
                }}>
                  ∞
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#2D2A26',
                  fontWeight: '600',
                  marginBottom: '4px'
                }}>
                  Growth Potential
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6B6560'
                }}>
                  Connect with readers and writers who elevate your craft.
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <p style={{
              fontSize: '20px',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              color: '#2D2A26',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              "The difference between a good story and a great one is the community that shapes it."
            </p>
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-[#800020] text-white rounded-lg font-light hover:bg-[#5C0015] hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                display: 'inline-block',
                boxShadow: '0 4px 12px rgba(128, 0, 32, 0.2)',
                textDecoration: 'none'
              }}
            >
              Start Your Literary Journey
            </Link>
            <p style={{
              marginTop: '16px',
              fontSize: '15px',
              color: '#6B6560',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic'
            }}>
              Free to join. Your story awaits.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6" style={{margin: 0, background: 'transparent'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#36454F] mb-4">
              Crafted for Writers & Readers
            </h2>
            <p className="text-[#36454F]/70 font-light text-lg">
              Everything you need for a meaningful literary experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="p-8 rounded-2xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
                border: '1px solid rgba(229, 227, 223, 0.25)',
                boxShadow: '0 2px 8px rgba(45, 42, 38, 0.04), 0 1px 3px rgba(45, 42, 38, 0.02)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(45, 42, 38, 0.08), 0 4px 12px rgba(45, 42, 38, 0.04), 0 2px 6px rgba(45, 42, 38, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 42, 38, 0.04), 0 1px 3px rgba(45, 42, 38, 0.02)';
              }}
            >
              <div className="w-12 h-12 bg-[#800020]/10 rounded-lg flex items-center justify-center mb-6" style={{borderRadius: '12px'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#800020" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#36454F] mb-3">
                Beautiful Editor
              </h3>
              <p className="text-[#36454F]/70 font-light">
                Distraction-free writing environment with rich formatting and auto-save.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="p-8 rounded-2xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
                border: '1px solid rgba(229, 227, 223, 0.25)',
                boxShadow: '0 2px 8px rgba(45, 42, 38, 0.04), 0 1px 3px rgba(45, 42, 38, 0.02)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(45, 42, 38, 0.08), 0 4px 12px rgba(45, 42, 38, 0.04), 0 2px 6px rgba(45, 42, 38, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 42, 38, 0.04), 0 1px 3px rgba(45, 42, 38, 0.02)';
              }}
            >
              <div className="w-12 h-12 bg-[#9CAF88]/10 rounded-lg flex items-center justify-center mb-6" style={{borderRadius: '12px'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CAF88" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#36454F] mb-3">
                Thoughtful Feedback
              </h3>
              <p className="text-[#36454F]/70 font-light">
                Inline comments, highlights, and nuanced appreciation for genuine engagement.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="p-8 rounded-2xl transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
                border: '1px solid rgba(229, 227, 223, 0.25)',
                boxShadow: '0 2px 8px rgba(45, 42, 38, 0.04), 0 1px 3px rgba(45, 42, 38, 0.02)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(45, 42, 38, 0.08), 0 4px 12px rgba(45, 42, 38, 0.04), 0 2px 6px rgba(45, 42, 38, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(45, 42, 38, 0.04), 0 1px 3px rgba(45, 42, 38, 0.02)';
              }}
            >
              <div className="w-12 h-12 bg-[#C19A6B]/10 rounded-lg flex items-center justify-center mb-6" style={{borderRadius: '12px'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C19A6B" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#36454F] mb-3">
                Read Anytime
              </h3>
              <p className="text-[#36454F]/70 font-light">
                Responsive design with typography controls for your perfect reading experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Verso Unique Section */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ margin: 0, background: 'transparent' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 60%, rgba(156, 175, 136, 0.08) 0%, transparent 60%)'
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div style={{
              display: 'inline-block', padding: '8px 24px',
              backgroundColor: 'rgba(156, 175, 136, 0.12)', borderRadius: '24px',
              marginBottom: '24px', fontSize: '13px', fontWeight: '600',
              color: '#7A9B6E', letterSpacing: '0.08em', textTransform: 'uppercase'
            }}>
              The Verso Difference
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2A26] mb-6" style={{ letterSpacing: '-0.02em' }}>
              Built Differently.<br />
              <span style={{ color: '#800020' }}>Built for Literature.</span>
            </h2>
            <p className="text-lg text-[#6B6560] font-light max-w-3xl mx-auto" style={{ lineHeight: '1.8' }}>
              Most platforms are designed for content. Verso is designed for craft. Every decision — from the editor to the community — reflects a single commitment: honouring the written word.
            </p>
          </div>

          {/* 2×3 grid of unique aspects */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#800020" strokeWidth="1.8">
                    <path d="M18 20V10M12 20V4M6 20v-6"/>
                  </svg>
                ),
                accent: '#800020',
                accentBg: 'rgba(128, 0, 32, 0.07)',
                title: 'Zero Algorithm Manipulation',
                body: 'Your work is never buried by an engagement-optimising feed. Readers discover stories based on craft and taste — not what went viral.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CAF88" strokeWidth="1.8">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                accent: '#9CAF88',
                accentBg: 'rgba(156, 175, 136, 0.10)',
                title: 'A Curated, Safe Space',
                body: 'No trolls. No spam. No performative clout-chasing. Verso readers are here because they love literature — and that changes everything about the feedback you receive.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C19A6B" strokeWidth="1.8">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                  </svg>
                ),
                accent: '#C19A6B',
                accentBg: 'rgba(193, 154, 107, 0.10)',
                title: 'Craft-First Editing Tools',
                body: 'Our distraction-free editor with rich typography, auto-save, and word-count tools was designed by writers who take the act of writing seriously.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#800020" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                ),
                accent: '#800020',
                accentBg: 'rgba(128, 0, 32, 0.07)',
                title: 'Depth Over Scale',
                body: 'We are not trying to be everything to everyone. A focused, literary community is worth more than millions of indifferent followers — and we will never compromise that.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CAF88" strokeWidth="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                ),
                accent: '#9CAF88',
                accentBg: 'rgba(156, 175, 136, 0.10)',
                title: 'Your Data, Your Library',
                body: 'No advertising. No data selling. Your annotations, highlights, and drafts belong to you alone — housed in a private library you actually own.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C19A6B" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                ),
                accent: '#C19A6B',
                accentBg: 'rgba(193, 154, 107, 0.10)',
                title: 'Workshop Culture',
                body: 'Reading circles and workshop groups bring the intimacy of a literary salon online — structured critique among people who share your commitment to the craft.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: 'white', borderRadius: '20px', padding: '36px 28px',
                border: '1px solid rgba(229, 227, 223, 0.5)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.08)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.04)';
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  backgroundColor: item.accentBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontFamily: 'Georgia, serif', fontSize: '19px', fontWeight: '600',
                  color: '#2D2A26', marginBottom: '10px', lineHeight: '1.3'
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B6560', lineHeight: '1.7' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Authors Section */}
      <section className="py-20 px-6" style={{margin: 0, background: 'transparent'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#36454F] mb-4">
              Meet Our Authors
            </h2>
            <p className="text-[#36454F]/70 font-light text-lg max-w-2xl mx-auto">
              Discover talented writers crafting stories that move us, inspire us, and stay with us long after the final page.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { name: 'Sarah Chen', genre: 'Science Fiction', initial: 'S', gradient: 'linear-gradient(135deg, #9CAF88 0%, #7A9B6E 100%)' },
              { name: 'Elena Volkov', genre: 'Fantasy', initial: 'E', gradient: 'linear-gradient(135deg, #C19A6B 0%, #A67C52 100%)' },
              { name: 'Marcus Webb', genre: 'Mystery', initial: 'M', gradient: 'linear-gradient(135deg, #800020 0%, #660033 100%)' }
            ].map((author, idx) => (
              <Link
                key={idx}
                href="/author"
                style={{
                  background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
                  border: '1px solid rgba(229, 227, 223, 0.25)',
                  borderRadius: '16px',
                  padding: '32px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  cursor: 'pointer'
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
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: author.gradient,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  fontWeight: '500',
                  marginBottom: '16px',
                  fontFamily: 'Georgia, serif'
                }}>
                  {author.initial}
                </div>
                <h3 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '20px',
                  fontWeight: '500',
                  color: '#2D2A26',
                  marginBottom: '6px'
                }}>
                  {author.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6B6560',
                  marginBottom: '0'
                }}>
                  {author.genre}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/author"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#800020] text-[#800020] rounded-lg font-light hover:bg-[#800020]/5 transition-all duration-300"
            >
              View All Authors
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Personal Library Section */}
      <section className="py-20 px-6" style={{
        margin: 0,
        background: 'linear-gradient(135deg, rgba(156, 175, 136, 0.05) 0%, rgba(250, 243, 237, 0.3) 100%)'
      }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                backgroundColor: 'rgba(128, 0, 32, 0.08)',
                borderRadius: '20px',
                fontSize: '13px',
                color: '#800020',
                fontWeight: '500',
                marginBottom: '20px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Your Private Space
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#36454F] mb-6">
                Your Personal Library
              </h2>
              <p className="text-[#36454F]/80 font-light text-lg mb-6 leading-relaxed">
                Save stories you love, collect your highlights and annotations, and keep track of works you've appreciated. Your library is your private literary sanctuary.
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 32px 0'
              }}>
                {[
                  { icon: '📚', text: 'Bookmark stories to read later' },
                  { icon: '✨', text: 'Highlight passages that resonate with you' },
                  { icon: '❤️', text: "Track works you've appreciated" }
                ].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                    fontSize: '16px',
                    color: '#36454F'
                  }}>
                    <span style={{fontSize: '20px'}}>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/library"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#800020] text-white rounded-lg font-light hover:bg-[#5C0015] hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: '0 4px 12px rgba(128, 0, 32, 0.2)'
                }}
              >
                Explore Library Features
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
              border: '1px solid rgba(229, 227, 223, 0.3)',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 8px 32px rgba(45, 42, 38, 0.08)'
            }}>
              <div style={{
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(229, 227, 223, 0.3)'
              }}>
                <div style={{
                  fontSize: '13px',
                  color: '#9B9690',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '12px'
                }}>
                  Your Highlights
                </div>
                <div style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '16px',
                  fontStyle: 'italic',
                  color: '#2D2A26',
                  lineHeight: '1.6',
                  padding: '16px',
                  background: 'rgba(156, 175, 136, 0.1)',
                  borderLeft: '3px solid #9CAF88',
                  borderRadius: '4px'
                }}>
                  "Every reader is a writer. The question is whether you'll accept the invitation."
                </div>
              </div>
              <div style={{
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(229, 227, 223, 0.3)'
              }}>
                <div style={{
                  fontSize: '13px',
                  color: '#9B9690',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '12px'
                }}>
                  Bookmarked Stories
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#800020'
                  }}></div>
                  <span style={{fontSize: '15px', color: '#2D2A26'}}>The Last Library</span>
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: '13px',
                  color: '#9B9690',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '12px'
                }}>
                  Appreciated Works
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '15px',
                  color: '#2D2A26'
                }}>
                  <span>❤️</span>
                  <span>3 stories this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thoughtful Feedback Section */}
      <section className="py-20 px-6" style={{margin: 0, background: 'transparent'}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div style={{
              background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
              border: '1px solid rgba(229, 227, 223, 0.3)',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 8px 32px rgba(45, 42, 38, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                fontSize: '120px',
                opacity: 0.04,
                color: '#800020'
              }}>
                💬
              </div>

              {/* Sample Comments */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1}}>
                {[
                  {
                    text: 'This passage beautifully captures the melancholy of autumn. Consider varying your sentence length in the third paragraph for better rhythm.',
                    author: 'Sarah C.',
                    type: 'Constructive',
                    highlight: 'The leaves fell like memories...'
                  },
                  {
                    text: 'Your dialogue feels natural and authentic. The subtext here is particularly effective.',
                    author: 'Marcus W.',
                    type: 'Positive',
                    highlight: '"I understand," she said.'
                  }
                ].map((comment, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid rgba(229, 227, 223, 0.4)',
                  }}>
                    <div style={{
                      fontSize: '11px',
                      color: '#9B9690',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{
                        padding: '2px 6px',
                        backgroundColor: comment.type === 'Constructive' ? 'rgba(128, 0, 32, 0.1)' : 'rgba(156, 175, 136, 0.15)',
                        color: comment.type === 'Constructive' ? '#800020' : '#7A9B6E',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        {comment.type}
                      </span>
                      <span>on "{comment.highlight}"</span>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      color: '#2D2A26',
                      lineHeight: '1.6',
                      marginBottom: '8px'
                    }}>
                      {comment.text}
                    </p>
                    <div style={{
                      fontSize: '12px',
                      color: '#9B9690',
                      fontStyle: 'italic'
                    }}>
                      — {comment.author}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '20px',
                padding: '14px',
                backgroundColor: 'rgba(156, 175, 136, 0.08)',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '13px',
                color: '#6B6560',
                fontStyle: 'italic'
              }}>
                Quality over quantity — every comment adds value
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#36454F] mb-4">
                Thoughtful Feedback
              </h2>
              <p className="text-[#36454F]/70 font-light mb-8 text-lg leading-relaxed">
                Receive meaningful critique that helps you grow as a writer. Our community values constructive feedback, insightful analysis, and encouraging support.
              </p>
              <ul style={{listStyle: 'none', padding: 0, marginBottom: '32px'}}>
                {[
                  { icon: '✍️', text: 'In-line comments on specific passages' },
                  { icon: '🎯', text: 'Constructive criticism that respects your voice' },
                  { icon: '💡', text: 'Insights on craft, pacing, character, and style' },
                  { icon: '🌟', text: 'Highlight exceptional moments in your work' }
                ].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '16px',
                    fontSize: '16px',
                    color: '#36454F'
                  }}>
                    <span style={{fontSize: '24px', flexShrink: 0}}>{item.icon}</span>
                    <span style={{paddingTop: '2px'}}>{item.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#800020] text-white rounded-lg font-light hover:bg-[#660033] hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: '0 4px 12px rgba(128, 0, 32, 0.2)'
                }}
              >
                See Examples
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Beautiful Editor Section */}
      <section className="py-20 px-6" style={{margin: 0, background: 'transparent'}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div style={{
              background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
              border: '1px solid rgba(229, 227, 223, 0.3)',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 8px 32px rgba(45, 42, 38, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                fontSize: '80px',
                opacity: 0.05,
                color: '#800020'
              }}>
                ✍️
              </div>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                color: '#2D2A26',
                lineHeight: '1.8',
                marginBottom: '24px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  fontWeight: '600',
                  fontSize: '24px',
                  marginBottom: '16px',
                  color: '#800020'
                }}>
                  Your Story Starts Here
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#6B6560',
                  fontStyle: 'italic',
                  marginBottom: '12px'
                }}>
                  "The first draft is you just telling yourself the story."
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#9B9690',
                  marginBottom: '24px'
                }}>
                  — Terry Pratchett
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                fontSize: '13px',
                color: '#6B6560'
              }}>
                {['✨ Rich Text Formatting', '📝 Auto-Save', '📊 Word Count', '🎨 Distraction-Free'].map((feature, idx) => (
                  <div key={idx} style={{
                    padding: '6px 14px',
                    background: 'rgba(156, 175, 136, 0.08)',
                    borderRadius: '20px',
                    fontSize: '12px'
                  }}>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                backgroundColor: 'rgba(156, 175, 136, 0.1)',
                borderRadius: '20px',
                fontSize: '13px',
                color: '#7A9B6E',
                fontWeight: '500',
                marginBottom: '20px'
              }}>
                <span style={{fontSize: '16px'}}>✍️</span>
                Craft Your Story
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#36454F] mb-4">
                Beautiful Editor
              </h2>
              <p className="text-[#36454F]/80 font-light text-lg mb-6 leading-relaxed">
                Write with elegance in a distraction-free environment designed for authors. Our sophisticated editor gives you powerful formatting tools while keeping the focus on your words.
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 32px 0'
              }}>
                {[
                  { icon: '✨', text: 'Rich text formatting (Bold, Italic, Headings)' },
                  { icon: '📝', text: 'Auto-save your work as you write' },
                  { icon: '📊', text: 'Real-time word and character count' },
                  { icon: '🎯', text: 'Organize with genre and descriptions' }
                ].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                    fontSize: '16px',
                    color: '#36454F'
                  }}>
                    <span style={{fontSize: '20px'}}>{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/write"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#800020] text-white rounded-lg font-light hover:bg-[#5C0015] hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: '0 4px 12px rgba(128, 0, 32, 0.2)'
                }}
              >
                Start Writing
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Literary Groups Section */}
      <section className="py-20 px-6" style={{margin: 0, background: 'transparent'}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#36454F] mb-4">
                Literary Groups
              </h2>
              <p className="text-[#36454F]/70 font-light mb-8 text-lg leading-relaxed">
                Connect with fellow writers who share your passion. Join intimate literary circles where ideas flourish, feedback flows freely, and creative friendships are forged.
              </p>
              <ul style={{listStyle: 'none', padding: 0, marginBottom: '32px'}}>
                {[
                  { icon: '💬', text: 'Real-time group messaging for instant collaboration' },
                  { icon: '✨', text: 'Share ideas, drafts, and get thoughtful feedback' },
                  { icon: '🎭', text: 'Genre-specific groups (Fantasy, Poetry, Sci-Fi, Literary Fiction)' },
                  { icon: '👥', text: 'Create your own private groups or join existing communities' }
                ].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '16px',
                    fontSize: '16px',
                    color: '#36454F'
                  }}>
                    <span style={{fontSize: '24px', flexShrink: 0}}>{item.icon}</span>
                    <span style={{paddingTop: '2px'}}>{item.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/groups"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#800020] text-white rounded-lg font-light hover:bg-[#660033] hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: '0 4px 12px rgba(128, 0, 32, 0.2)'
                }}
              >
                Explore Groups
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #FEFEFD 0%, #FDFCFA 100%)',
              border: '1px solid rgba(229, 227, 223, 0.3)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 8px 32px rgba(45, 42, 38, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                fontSize: '140px',
                opacity: 0.04,
                color: '#9CAF88'
              }}>
                👥
              </div>

              {/* Sample Group Cards */}
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1}}>
                {[
                  { name: 'Fantasy Writers Circle', members: 12, color: '#9CAF88', lastMsg: 'Discussing magic systems...' },
                  { name: 'Poetry Workshop', members: 8, color: '#D4A574', lastMsg: 'Beautiful imagery in your latest piece!' },
                  { name: 'Sci-Fi Storytellers', members: 15, color: '#7A9B9E', lastMsg: 'Anyone writing climate fiction?' }
                ].map((group, idx) => (
                  <div key={idx} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid rgba(229, 227, 223, 0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: group.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        fontFamily: 'Georgia, serif'
                      }}>
                        {group.name.charAt(0)}
                      </div>
                      <div style={{flex: 1}}>
                        <div style={{
                          fontFamily: 'Georgia, serif',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#2D2A26',
                          marginBottom: '2px'
                        }}>
                          {group.name}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#9B9690'
                        }}>
                          {group.members} members
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#6B6560',
                      fontStyle: 'italic',
                      paddingLeft: '52px'
                    }}>
                      {group.lastMsg}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: 'rgba(156, 175, 136, 0.08)',
                borderRadius: '8px',
                border: '1px dashed rgba(156, 175, 136, 0.3)',
                textAlign: 'center',
                fontSize: '14px',
                color: '#6B6560'
              }}>
                + Create your own group
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verso's Impact Section */}
      <section className="py-28 px-6 relative overflow-hidden" style={{ margin: 0, background: 'transparent' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 70% 40%, rgba(128, 0, 32, 0.05) 0%, transparent 60%)'
        }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div style={{
              display: 'inline-block', padding: '8px 24px',
              backgroundColor: 'rgba(128, 0, 32, 0.10)', borderRadius: '24px',
              marginBottom: '24px', fontSize: '13px', fontWeight: '600',
              color: '#800020', letterSpacing: '0.08em', textTransform: 'uppercase'
            }}>
              Our Impact
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2D2A26] mb-6" style={{ letterSpacing: '-0.02em' }}>
              Where Words<br />
              <span style={{ color: '#800020' }}>Change Lives.</span>
            </h2>
            <p className="text-lg text-[#6B6560] font-light max-w-2xl mx-auto" style={{ lineHeight: '1.8' }}>
              The true measure of a literary community isn't in metrics — it's in the writers who found their voice, the readers who found their next favourite author, and the stories that wouldn't exist without it.
            </p>
          </div>

          {/* Impact stats row */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { value: '10,000+', label: 'Stories Written', sub: 'Original works crafted and shared on Verso', color: '#800020' },
              { value: '85,000+', label: 'Pieces of Feedback', sub: 'Thoughtful critiques exchanged between members', color: '#9CAF88' },
              { value: '3,200+', label: 'Writers Grown', sub: 'Authors who credit Verso with developing their craft', color: '#C19A6B' },
            ].map((stat, idx) => (
              <div key={idx} style={{
                backgroundColor: 'white', borderRadius: '24px', padding: '40px 32px',
                border: '1px solid rgba(229, 227, 223, 0.5)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                textAlign: 'center', transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
              }}>
                <div style={{
                  fontFamily: 'Georgia, serif', fontSize: '52px', fontWeight: '700',
                  color: stat.color, lineHeight: 1, marginBottom: '12px'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: '600',
                  color: '#2D2A26', marginBottom: '8px'
                }}>
                  {stat.label}
                </div>
                <p style={{ fontSize: '13px', color: '#9B9690', lineHeight: '1.6' }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Impact narrative */}
          <div style={{
            display: 'grid', gap: '24px'
          }} className="md:grid-cols-2">
            {[
              {
                icon: '✍️',
                title: 'Voices Discovered',
                body: `Verso has become the first home for dozens of writers who had never shared their work publicly. The platform's encouragement and craft-focused feedback gave them the confidence to keep going — and to keep growing.`
              },
              {
                icon: '📖',
                title: 'Readers Transformed',
                body: `Our members don't just read passively. They annotate, highlight, discuss, and connect with authors directly. Many describe Verso as the first time reading felt like a genuine conversation rather than a solitary act.`
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                display: 'flex', gap: '20px', alignItems: 'flex-start',
                backgroundColor: 'white', borderRadius: '20px', padding: '32px',
                border: '1px solid rgba(229, 227, 223, 0.5)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
              }}>
                <div style={{
                  fontSize: '32px', flexShrink: 0,
                  width: '56px', height: '56px', borderRadius: '14px',
                  backgroundColor: 'rgba(128, 0, 32, 0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: '600',
                    color: '#2D2A26', marginBottom: '10px'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#6B6560', lineHeight: '1.75' }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rotating Quotes Section */}
      <section className="py-32 px-6 relative overflow-hidden" style={{
        margin: 0,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(128, 0, 32, 0.04) 15%, rgba(193, 154, 107, 0.07) 50%, rgba(128, 0, 32, 0.04) 85%, transparent 100%)'
      }}>
        {/* Decorative large quote marks */}
        <div style={{
          position: 'absolute',
          top: '32px',
          left: '6%',
          fontSize: '200px',
          lineHeight: 1,
          color: '#800020',
          opacity: 0.06,
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          &ldquo;
        </div>
        <div style={{
          position: 'absolute',
          bottom: '32px',
          right: '6%',
          fontSize: '200px',
          lineHeight: 1,
          color: '#800020',
          opacity: 0.06,
          fontFamily: 'Georgia, serif',
          transform: 'rotate(180deg)',
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          &ldquo;
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Label */}
          <div style={{
            display: 'inline-block',
            padding: '8px 24px',
            backgroundColor: 'rgba(128, 0, 32, 0.1)',
            borderRadius: '24px',
            marginBottom: '56px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#800020',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Words That Endure
          </div>

          {/* Quote text */}
          <div style={{
            minHeight: '160px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? 'translateY(0)' : 'translateY(12px)'
          }}>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontStyle: 'italic',
              color: '#2D2A26',
              lineHeight: '1.7',
              marginBottom: '32px',
              fontWeight: '400',
              letterSpacing: '0.01em'
            }}>
              &ldquo;{quotes[currentQuote].text}&rdquo;
            </p>
            <div>
              <span style={{
                display: 'block',
                fontFamily: 'Georgia, serif',
                fontSize: '17px',
                fontWeight: '600',
                color: '#800020',
                marginBottom: '4px'
              }}>
                — {quotes[currentQuote].author}
              </span>
              {quotes[currentQuote].source && (
                <span style={{
                  display: 'block',
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px',
                  fontStyle: 'italic',
                  color: '#9B9690'
                }}>
                  {quotes[currentQuote].source}
                </span>
              )}
            </div>
          </div>

          {/* Dot indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '48px'
          }}>
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuoteVisible(false);
                  setTimeout(() => {
                    setCurrentQuote(idx);
                    setQuoteVisible(true);
                  }, 300);
                }}
                style={{
                  width: idx === currentQuote ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  backgroundColor: idx === currentQuote ? '#800020' : 'rgba(128, 0, 32, 0.2)',
                  padding: 0
                }}
                aria-label={`Quote ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden" style={{
        margin: 0,
        background: 'transparent'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          transform: 'translateY(-50%)',
          fontSize: '120px',
          opacity: 0.03,
          color: '#800020'
        }}>
          "
        </div>
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          transform: 'translateY(-50%) rotate(180deg)',
          fontSize: '120px',
          opacity: 0.03,
          color: '#800020'
        }}>
          "
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div style={{
            display: 'inline-block',
            padding: '8px 24px',
            backgroundColor: 'rgba(128, 0, 32, 0.1)',
            borderRadius: '24px',
            marginBottom: '32px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#800020',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            Join Verso Today
          </div>

          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '56px',
            fontWeight: '700',
            color: '#2D2A26',
            marginBottom: '24px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            Every Great Story<br />
            Begins With a Single Word
          </h2>

          <p style={{
            fontSize: '22px',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            color: '#6B6560',
            marginBottom: '16px',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 16px'
          }}>
            "Writing is an exploration. You start from nothing and learn as you go."
          </p>

          <p style={{
            fontSize: '16px',
            color: '#9B9690',
            marginBottom: '48px',
            fontStyle: 'italic'
          }}>
            — E.L. Doctorow
          </p>

          <p style={{
            fontSize: '20px',
            color: '#2D2A26',
            marginBottom: '48px',
            lineHeight: '1.8',
            maxWidth: '750px',
            margin: '0 auto 48px'
          }}>
            Whether you're crafting your first short story or your tenth novel, whether you're discovering your next favorite author or sharing thoughtful critique—Verso is where your literary journey unfolds. Join a community that celebrates the written word in all its forms.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}>
            <Link
              href="/auth/signup"
              className="px-12 py-4 bg-[#800020] text-white rounded-lg font-light hover:bg-[#5C0015] hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                display: 'inline-block',
                boxShadow: '0 4px 12px rgba(128, 0, 32, 0.2)',
                textDecoration: 'none'
              }}
            >
              Begin Your Story on Verso
            </Link>

            <p style={{
              fontSize: '16px',
              color: '#6B6560',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic'
            }}>
              Free to join. No paywalls. No algorithms. Just literature.
            </p>
          </div>

          {/* Stats Strip */}
          <div style={{
            marginTop: '64px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            padding: '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '16px',
            border: '1px solid rgba(229, 227, 223, 0.4)'
          }}>
            <div>
              <div style={{
                fontSize: '32px',
                fontFamily: 'Georgia, serif',
                fontWeight: '700',
                color: '#800020',
                marginBottom: '8px'
              }}>
                2 min
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560'
              }}>
                Average signup time
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontFamily: 'Georgia, serif',
                fontWeight: '700',
                color: '#9CAF88',
                marginBottom: '8px'
              }}>
                Forever
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560'
              }}>
                Free access to all features
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '32px',
                fontFamily: 'Georgia, serif',
                fontWeight: '700',
                color: '#C19A6B',
                marginBottom: '8px'
              }}>
                Today
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6B6560'
              }}>
                The perfect time to start
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E3DF] py-12 px-6" style={{margin: 0, background: 'transparent'}}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-serif font-bold text-[#800020]">V</span>
                <span className="text-sm font-serif font-semibold text-[#36454F]">verso</span>
              </div>
              <p className="text-[#36454F]/70 font-light text-sm">
                A literary community for writers and readers.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#36454F] mb-4 text-sm">Explore</h4>
              <ul className="space-y-2">
                <li><Link href="/discover" className="text-[#36454F]/70 hover:text-[#800020] font-light text-sm">Discover</Link></li>
                <li><Link href="/author" className="text-[#36454F]/70 hover:text-[#800020] font-light text-sm">Authors</Link></li>
                <li><Link href="/library" className="text-[#36454F]/70 hover:text-[#800020] font-light text-sm">Library</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#36454F] mb-4 text-sm">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#36454F]/70 hover:text-[#800020] font-light text-sm">Guidelines</a></li>
                <li><a href="#" className="text-[#36454F]/70 hover:text-[#800020] font-light text-sm">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#36454F] mb-4 text-sm">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#36454F]/70 hover:text-[#800020] font-light text-sm">Privacy</a></li>
                <li><a href="#" className="text-[#36454F]/70 hover:text-[#800020] font-light text-sm">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#E5E3DF] pt-8 text-center">
            <p className="text-[#36454F]/70 font-light text-sm">
              © 2024 Verso. Crafted with care for literary minds.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
