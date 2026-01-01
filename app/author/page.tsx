'use client';

import Link from 'next/link';

export default function AuthorsPage() {
  // Sample authors data - in production, this would come from your database
  const authors = [
    {
      id: 1,
      name: 'Sarah Chen',
      bio: 'Science fiction writer exploring themes of technology and humanity',
      worksPublished: 1,
      followers: 2845,
    },
    {
      id: 2,
      name: 'James Mitchell',
      bio: 'Literary fiction author focused on human connection and relationships',
      worksPublished: 1,
      followers: 1920,
    },
    {
      id: 3,
      name: 'Elena Volkov',
      bio: 'Fantasy writer crafting intricate worlds of magic and wonder',
      worksPublished: 1,
      followers: 3456,
    },
    {
      id: 4,
      name: 'Marcus Webb',
      bio: 'Mystery and thriller author with a penchant for psychological suspense',
      worksPublished: 1,
      followers: 2234,
    },
    {
      id: 5,
      name: 'Ava Summers',
      bio: 'Romance novelist weaving tales of love across time and space',
      worksPublished: 1,
      followers: 4102,
    },
    {
      id: 6,
      name: 'Thomas Blackwood',
      bio: 'Epic fantasy author creating sprawling adventures and mythical realms',
      worksPublished: 1,
      followers: 3789,
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
              color: '#800020',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '500',
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 40px 60px',
      }}>
        {/* Back Button */}
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
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '48px',
          fontWeight: '500',
          color: '#2D2A26',
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          Featured Authors
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#6B6560',
          lineHeight: '1.6',
          maxWidth: '600px',
        }}>
          Discover the talented writers crafting the stories that move us, inspire us, and stay with us long after the final page.
        </p>
      </div>

      {/* Authors Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px 80px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '32px',
        }}>
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/author/${author.id}`}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                border: '1px solid #E5E3DF',
                cursor: 'pointer',
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
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #9CAF88 0%, #7A9B6E 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: '500',
                marginBottom: '20px',
                fontFamily: 'Georgia, serif',
              }}>
                {author.name.charAt(0)}
              </div>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
              }}>
                {author.name}
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#6B6560',
                lineHeight: '1.6',
                marginBottom: '20px',
              }}>
                {author.bio}
              </p>
              <div style={{
                display: 'flex',
                gap: '16px',
                fontSize: '14px',
                color: '#9B9690',
              }}>
                <span>{author.worksPublished} {author.worksPublished === 1 ? 'work' : 'works'} published</span>
                <span>•</span>
                <span>{author.followers.toLocaleString()} followers</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
