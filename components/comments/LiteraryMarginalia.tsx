'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Comment {
  id: string;
  work_id: string;
  user_id: string;
  content: string;
  paragraph_index: number | null;
  comment_type: 'reflection' | 'appreciation' | 'question' | 'critique';
  created_at: string;
  user: {
    uid: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
}

interface LiteraryMarginaliaProps {
  workId: string;
  authorId: string;
  paragraphs: string[];
}

const COMMENT_TYPES = [
  { value: 'reflection', label: 'Reflection', icon: '💭', description: 'Share thoughtful analysis' },
  { value: 'appreciation', label: 'Appreciation', icon: '❤️', description: 'Express what resonated' },
  { value: 'question', label: 'Question', icon: '❓', description: 'Seek clarification' },
  { value: 'critique', label: 'Critique', icon: '✍️', description: 'Offer constructive feedback' },
];

export default function LiteraryMarginalia({ workId, authorId, paragraphs }: LiteraryMarginaliaProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedParagraph, setSelectedParagraph] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const [commentType, setCommentType] = useState<'reflection' | 'appreciation' | 'question' | 'critique'>('reflection');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, [workId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?workId=${workId}`);
      const result = await response.json();
      if (result.data) {
        setComments(result.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async () => {
    if (!user) {
      alert('Please sign in to comment');
      return;
    }

    if (commentContent.trim().length < 50) {
      setError('Please write at least 50 characters to encourage thoughtful discussion');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('Session expired. Please sign in again.');
        return;
      }

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          work_id: workId,
          content: commentContent,
          paragraph_index: selectedParagraph,
          comment_type: commentType,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to post comment');
      }

      const result = await response.json();
      setComments([...comments, result.data]);
      setCommentContent('');
      setSelectedParagraph(null);
    } catch (error: any) {
      setError(error.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const getCommentsForParagraph = (index: number) => {
    return comments.filter(c => c.paragraph_index === index);
  };

  const getCommentIcon = (type: string) => {
    return COMMENT_TYPES.find(t => t.value === type)?.icon || '💭';
  };

  const getCommentColor = (type: string) => {
    switch (type) {
      case 'appreciation': return '#9CAF88';
      case 'question': return '#7A9BC4';
      case 'critique': return '#B8860B';
      default: return '#75716B';
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Main Content with Paragraphs */}
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        fontFamily: 'Georgia, serif',
        fontSize: '19px',
        lineHeight: '1.8',
        color: '#2D2A26',
      }}>
        {paragraphs.map((paragraph, index) => {
          const paragraphComments = getCommentsForParagraph(index);
          const hasComments = paragraphComments.length > 0;

          return (
            <div key={index} style={{ position: 'relative', marginBottom: '32px' }}>
              {/* Paragraph Text */}
              <p
                onClick={() => setSelectedParagraph(selectedParagraph === index ? null : index)}
                style={{
                  cursor: 'pointer',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  backgroundColor: selectedParagraph === index
                    ? 'rgba(128, 0, 32, 0.05)'
                    : hasComments
                    ? 'rgba(156, 175, 136, 0.03)'
                    : 'transparent',
                  borderLeft: hasComments
                    ? '3px solid rgba(156, 175, 136, 0.4)'
                    : '3px solid transparent',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (selectedParagraph !== index) {
                    e.currentTarget.style.backgroundColor = 'rgba(229, 227, 223, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedParagraph !== index) {
                    e.currentTarget.style.backgroundColor = hasComments
                      ? 'rgba(156, 175, 136, 0.03)'
                      : 'transparent';
                  }
                }}
              >
                {paragraph}
                {hasComments && (
                  <span style={{
                    position: 'absolute',
                    right: '16px',
                    top: '12px',
                    fontSize: '13px',
                    color: '#9CAF88',
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: '500',
                  }}>
                    {paragraphComments.length} {paragraphComments.length === 1 ? 'note' : 'notes'}
                  </span>
                )}
              </p>

              {/* Comments Panel */}
              {selectedParagraph === index && (
                <div style={{
                  marginTop: '16px',
                  background: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(229, 227, 223, 0.5)',
                  boxShadow: '0 4px 24px rgba(45, 42, 38, 0.08)',
                }}>
                  {/* Existing Comments */}
                  {paragraphComments.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2D2A26',
                        marginBottom: '16px',
                        fontFamily: 'system-ui, sans-serif',
                        letterSpacing: '0.02em',
                      }}>
                        MARGINALIA
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {paragraphComments.map((comment) => (
                          <div
                            key={comment.id}
                            style={{
                              padding: '16px',
                              background: '#FDFCFA',
                              borderRadius: '12px',
                              borderLeft: `4px solid ${getCommentColor(comment.comment_type)}`,
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '8px',
                            }}>
                              <span style={{ fontSize: '16px' }}>{getCommentIcon(comment.comment_type)}</span>
                              <span style={{
                                fontSize: '14px',
                                fontWeight: '500',
                                color: '#2D2A26',
                                fontFamily: 'system-ui, sans-serif',
                              }}>
                                {comment.user.display_name || comment.user.username}
                              </span>
                              {comment.user_id === authorId && (
                                <span style={{
                                  fontSize: '11px',
                                  padding: '2px 8px',
                                  background: '#800020',
                                  color: 'white',
                                  borderRadius: '6px',
                                  fontWeight: '600',
                                  fontFamily: 'system-ui, sans-serif',
                                }}>
                                  AUTHOR
                                </span>
                              )}
                              <span style={{
                                fontSize: '12px',
                                color: '#9B9690',
                                marginLeft: 'auto',
                                fontFamily: 'system-ui, sans-serif',
                              }}>
                                {new Date(comment.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <p style={{
                              fontSize: '15px',
                              lineHeight: '1.6',
                              color: '#4A4640',
                              fontFamily: 'Georgia, serif',
                              margin: 0,
                            }}>
                              {comment.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Comment Form */}
                  {user ? (
                    <div>
                      <h4 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2D2A26',
                        marginBottom: '12px',
                        fontFamily: 'system-ui, sans-serif',
                        letterSpacing: '0.02em',
                      }}>
                        ADD YOUR NOTE
                      </h4>

                      {/* Comment Type Selection */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '8px',
                        marginBottom: '16px',
                      }}>
                        {COMMENT_TYPES.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => setCommentType(type.value as any)}
                            style={{
                              padding: '10px 12px',
                              background: commentType === type.value ? '#800020' : '#F5F3F0',
                              color: commentType === type.value ? 'white' : '#2D2A26',
                              border: 'none',
                              borderRadius: '10px',
                              fontSize: '13px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              fontFamily: 'system-ui, sans-serif',
                              textAlign: 'left',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                            onMouseEnter={(e) => {
                              if (commentType !== type.value) {
                                e.currentTarget.style.background = '#E5E3DF';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (commentType !== type.value) {
                                e.currentTarget.style.background = '#F5F3F0';
                              }
                            }}
                          >
                            <span>{type.icon}</span>
                            <div style={{ flex: 1 }}>
                              <div>{type.label}</div>
                              <div style={{
                                fontSize: '11px',
                                opacity: 0.7,
                                marginTop: '2px',
                              }}>
                                {type.description}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Comment Textarea */}
                      <textarea
                        value={commentContent}
                        onChange={(e) => {
                          setCommentContent(e.target.value);
                          setError('');
                        }}
                        placeholder="Share your thoughts on this passage... (minimum 50 characters)"
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '14px',
                          background: '#FDFCFA',
                          border: '1.5px solid rgba(229, 227, 223, 0.4)',
                          borderRadius: '12px',
                          fontSize: '15px',
                          fontFamily: 'Georgia, serif',
                          color: '#2D2A26',
                          resize: 'vertical',
                          outline: 'none',
                          marginBottom: '12px',
                        }}
                      />

                      {/* Character Count */}
                      <div style={{
                        fontSize: '12px',
                        color: commentContent.length < 50 ? '#B8860B' : '#9CAF88',
                        marginBottom: '12px',
                        fontFamily: 'system-ui, sans-serif',
                      }}>
                        {commentContent.length}/50 characters {commentContent.length < 50 && `(${50 - commentContent.length} more needed)`}
                      </div>

                      {error && (
                        <div style={{
                          padding: '12px',
                          background: 'rgba(184, 134, 11, 0.1)',
                          color: '#B8860B',
                          borderRadius: '8px',
                          fontSize: '14px',
                          marginBottom: '12px',
                          fontFamily: 'system-ui, sans-serif',
                        }}>
                          {error}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmitComment}
                        disabled={submitting || commentContent.length < 50}
                        style={{
                          padding: '12px 24px',
                          background: submitting || commentContent.length < 50 ? '#9B9690' : '#800020',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: submitting || commentContent.length < 50 ? 'not-allowed' : 'pointer',
                          fontFamily: 'system-ui, sans-serif',
                        }}
                      >
                        {submitting ? 'Posting...' : 'Post Marginalia'}
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      padding: '20px',
                      background: '#F5F3F0',
                      borderRadius: '12px',
                      textAlign: 'center',
                    }}>
                      <p style={{
                        fontSize: '15px',
                        color: '#75716B',
                        marginBottom: '12px',
                        fontFamily: 'system-ui, sans-serif',
                      }}>
                        Sign in to add your literary notes
                      </p>
                      <a
                        href="/auth/login"
                        style={{
                          display: 'inline-block',
                          padding: '10px 20px',
                          background: '#800020',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '10px',
                          fontSize: '14px',
                          fontWeight: '500',
                          fontFamily: 'system-ui, sans-serif',
                        }}
                      >
                        Sign In
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
