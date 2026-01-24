'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LiteraryMarginalia from '@/components/comments/LiteraryMarginalia';

export default function WorkPage() {
  const params = useParams();
  const workId = params.id as string;

  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWork = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/works?id=${workId}`);
        const result = await response.json();

        if (result.data) {
          setWork(result.data);
        } else {
          setWork(null);
        }
      } catch (error) {
        console.error('Error fetching work:', error);
        setWork(null);
      } finally {
        setLoading(false);
      }
    };

    if (workId) {
      fetchWork();
    }
  }, [workId]);

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#FCFBF9',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ fontSize: '18px', color: '#75716B', fontFamily: 'Georgia, serif' }}>Loading...</p>
      </div>
    );
  }

  if (!work) {
    return (
      <div style={{
        backgroundColor: '#FCFBF9',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        padding: '40px'
      }}>
        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '36px',
          fontWeight: '300',
          color: '#2D2A26'
        }}>
          The Tale Remains Untold
        </h1>
        <p style={{
          fontSize: '17px',
          color: '#75716B',
          textAlign: 'center',
          maxWidth: '500px',
          lineHeight: '1.8',
          fontStyle: 'italic'
        }}>
          Like a book withdrawn to private shelves, this story has wandered from the public path. Perhaps it rests in quieter quarters, or has yet to be written into being.
        </p>
        <Link
          href="/discover"
          style={{
            padding: '12px 28px',
            background: '#800020',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '20px',
            fontSize: '15px',
            fontWeight: '500',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Explore Other Stories
        </Link>
      </div>
    );
  }

  // Split content into paragraphs
  const paragraphs = work.content
    .split('\n\n')
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0);

  return (
    <div style={{
      backgroundColor: '#FCFBF9',
      backgroundImage: `
        radial-gradient(circle 1000px at 15% 10%, rgba(156, 175, 136, 0.08) 0%, transparent 50%),
        radial-gradient(circle 800px at 85% 90%, rgba(128, 0, 32, 0.06) 0%, transparent 50%)
      `,
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '80px 20px 100px'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 60px'
      }}>
        {/* Back Button */}
        <Link
          href="/discover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#75716B',
            textDecoration: 'none',
            fontSize: '15px',
            marginBottom: '32px',
            transition: 'color 0.2s',
            fontFamily: 'system-ui, sans-serif',
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
          Back to Discover
        </Link>

        {/* Title & Metadata */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '48px',
          border: '1px solid rgba(229, 227, 223, 0.3)',
          boxShadow: '0 4px 24px rgba(45, 42, 38, 0.06)',
        }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '48px',
            fontWeight: '400',
            color: '#2D2A26',
            marginBottom: '16px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
          }}>
            {work.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}>
            <Link
              href={`/author/${work.author.username}`}
              style={{
                fontSize: '18px',
                color: '#800020',
                textDecoration: 'none',
                fontFamily: 'Georgia, serif',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              by {work.author.display_name || work.author.username}
            </Link>
            {work.genre && (
              <>
                <span style={{ color: '#D1C4B8' }}>·</span>
                <span style={{
                  fontSize: '13px',
                  padding: '4px 12px',
                  background: 'rgba(128, 0, 32, 0.08)',
                  color: '#800020',
                  borderRadius: '12px',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: '500',
                  letterSpacing: '0.02em',
                }}>
                  {work.genre}
                </span>
              </>
            )}
          </div>

          {work.description && (
            <p style={{
              fontSize: '17px',
              color: '#4A4640',
              lineHeight: '1.6',
              marginBottom: '20px',
              fontFamily: 'Georgia, serif',
            }}>
              {work.description}
            </p>
          )}

          <div style={{
            display: 'flex',
            gap: '20px',
            fontSize: '14px',
            color: '#9B9690',
            fontFamily: 'system-ui, sans-serif',
            paddingTop: '20px',
            borderTop: '1px solid rgba(229, 227, 223, 0.4)',
          }}>
            <span>{work.word_count?.toLocaleString() || 0} words</span>
            <span>·</span>
            <span>{work.reading_time_minutes || 0} min read</span>
            <span>·</span>
            <span>
              {new Date(work.published_at || work.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Story Content with Literary Marginalia */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '64px 48px',
        border: '1px solid rgba(229, 227, 223, 0.3)',
        boxShadow: '0 4px 24px rgba(45, 42, 38, 0.06)',
      }}>
        <div style={{
          marginBottom: '32px',
          paddingBottom: '32px',
          borderBottom: '2px solid rgba(229, 227, 223, 0.3)',
        }}>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '16px',
            fontWeight: '600',
            color: '#2D2A26',
            marginBottom: '8px',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Literary Marginalia
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#75716B',
            lineHeight: '1.6',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
          }}>
            Click on any paragraph to add your notes. Share reflections, appreciation, questions, or thoughtful critique.
          </p>
        </div>

        <LiteraryMarginalia
          workId={work.id}
          authorId={work.author_id}
          paragraphs={paragraphs}
        />
      </div>

      {/* Footer - Author Info */}
      <div style={{
        maxWidth: '800px',
        margin: '60px auto 0',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '32px 48px',
        border: '1px solid rgba(229, 227, 223, 0.3)',
        boxShadow: '0 4px 24px rgba(45, 42, 38, 0.06)',
      }}>
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: work.author.avatar_url
              ? `url(${work.author.avatar_url})`
              : 'linear-gradient(135deg, #9CAF88 0%, #7A9B6E 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: '500',
            flexShrink: '0',
            fontFamily: 'Georgia, serif',
          }}>
            {!work.author.avatar_url && (work.author.display_name || work.author.username).charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: '14px',
              color: '#9B9690',
              marginBottom: '4px',
              fontFamily: 'system-ui, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Written by
            </p>
            <Link
              href={`/author/${work.author.username}`}
              style={{
                fontSize: '20px',
                color: '#2D2A26',
                textDecoration: 'none',
                fontFamily: 'Georgia, serif',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#800020'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#2D2A26'}
            >
              {work.author.display_name || work.author.username}
            </Link>
          </div>
          <Link
            href={`/author/${work.author.username}`}
            style={{
              padding: '10px 24px',
              background: '#800020',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
