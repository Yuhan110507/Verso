'use client';

import { useState, useEffect } from 'react';

interface ProfessionalReadingProps {
  title: string;
  author: string;
  category: string;
  content: string;
  wordCount: number;
  readingTime: number;
  publishedDate: string;
}

interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: Date;
  isPinned?: boolean;
}

interface Highlight {
  id: string;
  text: string;
  type: 'public' | 'private';
  timestamp: Date;
  annotation: string;
}

export function ProfessionalReading({
  title,
  author,
  category,
  content,
  wordCount,
  readingTime,
  publishedDate,
}: ProfessionalReadingProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAppreciated, setIsAppreciated] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [highlightType, setHighlightType] = useState<'public' | 'private'>('private');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [annotationText, setAnnotationText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Calculate actual word count from content
  const actualWordCount = content.trim().split(/\s+/).length;
  const actualReadingTime = Math.ceil(actualWordCount / 200); // Average reading speed: 200 words/min

  // Handle bookmark toggle
  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Save to Supabase user's library
    console.log('Bookmark toggled:', !isBookmarked);
  };

  // Handle appreciation toggle
  const handleAppreciate = async () => {
    setIsAppreciated(!isAppreciated);
    // TODO: Save appreciation to Supabase
    console.log('Appreciation toggled:', !isAppreciated);
  };

  // Handle highlight - toggle menu visibility
  const handleHighlight = () => {
    setShowHighlightMenu(!showHighlightMenu);
  };

  // Capture highlighted text
  const handleCaptureHighlight = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && text.length > 0) {
      const newHighlight: Highlight = {
        id: Date.now().toString(),
        text: text,
        type: highlightType,
        timestamp: new Date(),
        annotation: '',
      };

      setHighlights([...highlights, newHighlight]);
      setSelectedText('');
      selection?.removeAllRanges();
      // TODO: Save to Supabase
    }
  };

  // Update highlight annotation
  const handleUpdateAnnotation = (highlightId: string, annotation: string) => {
    setHighlights(highlights.map(h =>
      h.id === highlightId ? { ...h, annotation } : h
    ));
    // TODO: Update in Supabase
  };

  // Delete highlight
  const handleDeleteHighlight = (highlightId: string) => {
    setHighlights(highlights.filter(h => h.id !== highlightId));
    // TODO: Delete from Supabase
  };

  // Handle comment panel
  const handleComment = () => {
    setShowComments(!showComments);
  };

  // Handle post comment
  const handlePostComment = async () => {
    if (!commentText.trim()) return;

    // TODO: Get actual user info from Supabase auth
    const newComment: Comment = {
      id: Date.now().toString(),
      text: commentText.trim(),
      username: 'Reader', // TODO: Replace with actual username from auth
      timestamp: new Date(),
    };

    setComments([newComment, ...comments]);
    setCommentText('');
    // TODO: Save comment to Supabase
  };

  // Handle delete comment
  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
    // TODO: Delete from Supabase
  };

  // Handle pin/unpin comment
  const handleTogglePin = (commentId: string) => {
    setComments(comments.map(c =>
      c.id === commentId ? { ...c, isPinned: !c.isPinned } : c
    ));
    // TODO: Update pin status in Supabase
  };

  // Sort comments: pinned first, then by timestamp
  const sortedComments = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  // Handle annotation save
  const handleSaveAnnotation = (highlightId: string) => {
    if (annotationText.trim()) {
      handleUpdateAnnotation(highlightId, annotationText.trim());
    }
    setActiveAnnotation(null);
    setAnnotationText('');
  };

  // Handle share
  const handleShare = () => {
    // Get current URL
    if (typeof window !== 'undefined') {
      setShareLink(window.location.href);
    }
    setShowShareModal(true);
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setToastMessage('Link copied to clipboard!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setToastMessage('Failed to copy link');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Share to Twitter
  const handleShareTwitter = () => {
    const text = `Check out "${title}" by ${author} on Verso`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareLink)}`;
    window.open(url, '_blank');
  };

  // Share to Facebook
  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(url, '_blank');
  };

  // Share via Email
  const handleShareEmail = () => {
    const subject = `Check out "${title}" on Verso`;
    const body = `I thought you might enjoy this story:\n\n"${title}" by ${author}\n\n${shareLink}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Share to WhatsApp
  const handleShareWhatsApp = () => {
    const text = `Check out "${title}" by ${author} on Verso: ${shareLink}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Share to Instagram (copy link with instruction)
  const handleShareInstagram = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setToastMessage('Link copied! Open Instagram and paste in your story or post.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setToastMessage('Please copy the link above and share it on Instagram.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  // Render content with highlights
  const renderContentWithHighlights = () => {
    if (highlights.length === 0) {
      // No highlights - render plain paragraphs
      return content.split('\n\n').map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ));
    }

    // Process the entire content with all highlights
    let processedContent: (string | JSX.Element)[] = [content];

    // Apply each highlight to the entire content
    highlights.forEach((highlight, hIdx) => {
      const newContent: (string | JSX.Element)[] = [];

      processedContent.forEach((item) => {
        if (typeof item === 'string') {
          const parts = item.split(highlight.text);

          parts.forEach((part, partIdx) => {
            if (part) {
              newContent.push(part);
            }

            // Add the highlighted text between parts (except after the last part)
            if (partIdx < parts.length - 1) {
              newContent.push(
                <mark
                  key={`highlight-${hIdx}-${partIdx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveAnnotation(highlight.id);
                    setAnnotationText(highlight.annotation || '');
                  }}
                  style={{
                    backgroundColor: highlight.type === 'private'
                      ? 'rgba(255, 235, 156, 0.6)'
                      : 'rgba(156, 175, 136, 0.4)',
                    cursor: 'pointer',
                    padding: '3px 1px',
                    borderRadius: '3px',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = highlight.type === 'private'
                      ? 'rgba(255, 235, 156, 0.8)'
                      : 'rgba(156, 175, 136, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = highlight.type === 'private'
                      ? 'rgba(255, 235, 156, 0.6)'
                      : 'rgba(156, 175, 136, 0.4)';
                  }}
                >
                  {highlight.text}
                </mark>
              );
            }
          });
        } else {
          // Keep JSX elements as is
          newContent.push(item);
        }
      });

      processedContent = newContent;
    });

    // Now split into paragraphs while preserving highlights
    const result: JSX.Element[] = [];
    let currentParagraph: (string | JSX.Element)[] = [];

    processedContent.forEach((item, idx) => {
      if (typeof item === 'string') {
        // Split by paragraph breaks
        const parts = item.split('\n\n');

        parts.forEach((part, partIdx) => {
          if (partIdx > 0) {
            // New paragraph - save current and start new
            if (currentParagraph.length > 0) {
              result.push(<p key={`para-${result.length}`}>{currentParagraph}</p>);
              currentParagraph = [];
            }
          }

          if (part) {
            currentParagraph.push(part);
          }
        });
      } else {
        // Add JSX element to current paragraph
        currentParagraph.push(item);
      }
    });

    // Don't forget the last paragraph
    if (currentParagraph.length > 0) {
      result.push(<p key={`para-${result.length}`}>{currentParagraph}</p>);
    }

    return result;
  };

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Reading Progress */}
      <div
        className="reading-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="nav-logo">
          <span>Verso</span>
          <div className="nav-spine" />
        </div>
        <div className="nav-spacer" />
        <div className="nav-buttons">
          <button className="nav-button">← Previous</button>
          <button className="nav-button">Next →</button>
          <button className="nav-cta" onClick={handleShare}>Share</button>
        </div>
      </nav>

      {/* Secondary Title Bar */}
      <div className="title-bar">
        <div className="title-bar-category">{category.toUpperCase()}</div>
        <h1 className="title-bar-title">{title}</h1>
        <div className="title-bar-metadata">
          <span>{author}</span>
          <span className="title-bar-dot">·</span>
          <span>{publishedDate}</span>
          <span className="title-bar-dot">·</span>
          <span>{actualReadingTime} min read</span>
          <span className="title-bar-dot">·</span>
          <span>{actualWordCount.toLocaleString()} words</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ paddingTop: '164px', paddingBottom: '120px' }}>
        <div className="reading-container">
          {/* Story Content */}
          <article className="story-content" data-highlight-type={highlightType}>
            {renderContentWithHighlights()}
          </article>

          {/* Margin Note Example */}
          <div className="margin-note" style={{ marginTop: '48px' }}>
            <div className="margin-note-label">Editor's Note</div>
            <div className="margin-note-content">
              This story has been carefully curated for Verso's literary community.
              {comments.length > 0 || highlights.filter(h => h.type === 'public').length > 0 ? (
                <>
                  {' '}Readers have
                  {comments.length > 0 && (
                    <> left {comments.length} thoughtful {comments.length === 1 ? 'comment' : 'comments'}</>
                  )}
                  {comments.length > 0 && highlights.filter(h => h.type === 'public').length > 0 && ' and'}
                  {highlights.filter(h => h.type === 'public').length > 0 && (
                    <> highlighted {highlights.filter(h => h.type === 'public').length} {highlights.filter(h => h.type === 'public').length === 1 ? 'passage' : 'passages'}</>
                  )}.
                </>
              ) : (
                <> Be the first to leave a comment or highlight a passage!</>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="floating-action-bar">
        <button
          className={`action-button ${isBookmarked ? 'action-button-active' : ''}`}
          title="Bookmark"
          onClick={handleBookmark}
        >
          <svg viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'}>
            <path d="M5 2h14v20l-7-5-7 5V2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="action-separator" />

        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowHighlightMenu(true)}
          onMouseLeave={() => setShowHighlightMenu(false)}
        >
          <button
            className={`action-button ${showHighlightMenu ? 'action-button-active' : ''}`}
            title="Highlight"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18M3 6h18m0 12H3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Hover Menu */}
          {showHighlightMenu && (
            <div
              onMouseEnter={() => setShowHighlightMenu(true)}
              onMouseLeave={() => setShowHighlightMenu(false)}
              style={{
                position: 'absolute',
                bottom: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                minWidth: '200px',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <button
                onClick={() => setHighlightType(highlightType === 'private' ? 'public' : 'private')}
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'white',
                  border: '1.5px solid #E5E3DF',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6B6560',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none',
                  fontFamily: 'system-ui, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#9CAF88';
                  e.currentTarget.style.backgroundColor = '#F5F3F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E3DF';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                {highlightType === 'private' ? '🔒 Private' : '🌐 Public'}
              </button>
              <button
                onClick={handleCaptureHighlight}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#9CAF88',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none',
                  fontFamily: 'system-ui, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7A9B6E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#9CAF88';
                }}
              >
                Save Highlight
              </button>
            </div>
          )}
        </div>

        <button className="action-button" title="Share" onClick={handleShare}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-6-6L12 2m0 0L8 6m4-4v12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          className={`action-button ${showComments ? 'action-button-active' : ''}`}
          title="Comment"
          onClick={handleComment}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          className={`action-button ${isAppreciated ? 'action-button-active' : ''}`}
          title="Appreciate"
          onClick={handleAppreciate}
        >
          <svg viewBox="0 0 24 24" fill={isAppreciated ? 'currentColor' : 'none'}>
            <path d="M20.84 4.61a5.5 5.5 0 01-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 017.78 7.78l-1.06 1.06L12 19.9l-7.78-7.78a5.5 5.5 0 017.78-7.78l1.06 1.06 1.06-1.06z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Annotation Popup */}
      {activeAnnotation && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(2px)',
              zIndex: 999,
            }}
            onClick={() => setActiveAnnotation(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              zIndex: 1000,
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '12px'
              }}>
                Add Annotation
              </h3>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#F5F3F0',
                borderRadius: '8px',
                fontFamily: 'Georgia, serif',
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#4A4640',
                fontStyle: 'italic',
                borderLeft: '3px solid #9CAF88'
              }}>
                "{highlights.find(h => h.id === activeAnnotation)?.text}"
              </div>
            </div>
            <textarea
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
              placeholder="Write your thoughts about this passage..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '16px',
                fontFamily: 'Georgia, serif',
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#2D2A26',
                border: '1px solid #E5E3DF',
                borderRadius: '8px',
                resize: 'vertical',
                outline: 'none',
                backgroundColor: 'white'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#9CAF88'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E5E3DF'}
            />
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setActiveAnnotation(null)}
                style={{
                  padding: '10px 20px',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6B6560',
                  backgroundColor: 'transparent',
                  border: '1px solid #E5E3DF',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F3F0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveAnnotation(activeAnnotation)}
                style={{
                  padding: '10px 24px',
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: '#9CAF88',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7A9B6E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#9CAF88';
                }}
              >
                Save Annotation
              </button>
            </div>
          </div>
        </>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
            }}
            onClick={() => setShowShareModal(false)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '480px',
              width: '90%',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
            }}
          >
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '12px'
              }}>
                Share this story
              </h3>
              <p style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '15px',
                color: '#6B6560',
                lineHeight: '1.5'
              }}>
                "{title}" by {author}
              </p>
            </div>

            {/* Copy Link */}
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: '#F5F3F0',
              borderRadius: '12px',
              border: '1px solid #E5E3DF'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    fontSize: '14px',
                    fontFamily: 'system-ui, sans-serif',
                    color: '#6B6560',
                    backgroundColor: 'white',
                    border: '1px solid #E5E3DF',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleCopyLink}
                  style={{
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'system-ui, sans-serif',
                    color: 'white',
                    backgroundColor: '#800020',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    outline: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#660019';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#800020';
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div style={{
              marginBottom: '24px'
            }}>
              <div style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '13px',
                fontWeight: '500',
                color: '#9B9690',
                marginBottom: '16px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Share via
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
              }}>
                <button
                  onClick={handleShareTwitter}
                  style={{
                    padding: '14px',
                    backgroundColor: '#1DA1F2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'system-ui, sans-serif',
                    transition: 'all 0.2s',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a8cd8';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1DA1F2';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                  Twitter
                </button>

                <button
                  onClick={handleShareFacebook}
                  style={{
                    padding: '14px',
                    backgroundColor: '#1877F2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'system-ui, sans-serif',
                    transition: 'all 0.2s',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1565d8';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1877F2';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                  Facebook
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  style={{
                    padding: '14px',
                    backgroundColor: '#25D366',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'system-ui, sans-serif',
                    transition: 'all 0.2s',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1fb855';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#25D366';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>

                <button
                  onClick={handleShareInstagram}
                  style={{
                    padding: '14px',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'system-ui, sans-serif',
                    transition: 'all 0.2s',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.85';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </button>

                <button
                  onClick={handleShareEmail}
                  style={{
                    padding: '14px',
                    backgroundColor: '#6B6560',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'system-ui, sans-serif',
                    transition: 'all 0.2s',
                    outline: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    gridColumn: 'span 3'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#5a534e';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#6B6560';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Email
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowShareModal(false)}
              style={{
                width: '100%',
                padding: '12px',
                fontFamily: 'system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                color: '#6B6560',
                backgroundColor: 'transparent',
                border: '1px solid #E5E3DF',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F5F3F0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Close
            </button>
          </div>
        </>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#2D2A26',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            zIndex: 10000,
            fontFamily: 'system-ui, sans-serif',
            fontSize: '15px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slideUp 0.3s ease-out',
            maxWidth: '90%',
            textAlign: 'center'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>

      {/* Comments Panel with Backdrop */}
      {showComments && (
        <>
          <div className="comments-backdrop" onClick={() => setShowComments(false)} />
          <div className="comments-panel">
            <div className="comments-header">
              <h3>Comments & Feedback</h3>
              <button className="comments-close" onClick={() => setShowComments(false)}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: '20px', height: '20px' }}>
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="comments-content">
              <div className="comments-list">
                {comments.length === 0 ? (
                  <div className="comments-empty">
                    No comments yet. Be the first to share your thoughts!
                  </div>
                ) : (
                  <div style={{ marginBottom: '32px' }}>
                    {sortedComments.map((comment) => (
                      <div key={comment.id} style={{
                        padding: '24px 0',
                        borderBottom: '1px solid rgba(229, 227, 223, 0.3)',
                        background: comment.isPinned ? 'rgba(156, 175, 136, 0.05)' : 'transparent',
                        marginLeft: comment.isPinned ? '-32px' : '0',
                        marginRight: comment.isPinned ? '-32px' : '0',
                        paddingLeft: comment.isPinned ? '32px' : '0',
                        paddingRight: comment.isPinned ? '32px' : '0',
                        borderLeft: comment.isPinned ? '3px solid #9CAF88' : 'none'
                      }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #9CAF88 0%, #7A9B6E 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '17px',
                            fontWeight: '500',
                            flexShrink: '0'
                          }}>
                            {comment.username.charAt(0).toUpperCase()}
                          </div>
                          <div style={{ flex: '1' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'nowrap' }}>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: '500', color: '#2D2A26', whiteSpace: 'nowrap' }}>
                                  {comment.username}
                                </span>
                                <span style={{ color: '#9B9690', fontSize: '14px', flexShrink: '0' }}>•</span>
                                <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '13px', color: '#9B9690', whiteSpace: 'nowrap' }}>
                                  {new Date(comment.timestamp).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleTogglePin(comment.id);
                                  }}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: comment.isPinned ? '#9CAF88' : '#9B9690',
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    fontSize: '13px',
                                    fontFamily: 'system-ui, sans-serif',
                                    transition: 'color 0.2s',
                                    flexShrink: '0',
                                    fontWeight: comment.isPinned ? '600' : '400',
                                    outline: 'none'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#9CAF88'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = comment.isPinned ? '#9CAF88' : '#9B9690'}
                                >
                                  {comment.isPinned ? '📌 Pinned' : 'Pin'}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteComment(comment.id);
                                  }}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#9B9690',
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    fontSize: '13px',
                                    fontFamily: 'system-ui, sans-serif',
                                    transition: 'color 0.2s',
                                    flexShrink: '0',
                                    outline: 'none'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#800020'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#9B9690'}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: '1.7', color: '#4A4640' }}>
                              {comment.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="comment-input-section">
                <textarea
                  className="comment-input"
                  placeholder="Share your thoughts about this story..."
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button className="comment-submit" onClick={handlePostComment}>
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
