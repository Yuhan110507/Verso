'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [isProofreading, setIsProofreading] = useState(false);
  const [proofreadResults, setProofreadResults] = useState<{type: string; message: string}[]>([]);
  const [showProofreadPanel, setShowProofreadPanel] = useState(false);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculate word count from contentEditable div
  useEffect(() => {
    if (contentRef.current) {
      const text = contentRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      setWordCount(words);
      setContent(contentRef.current.innerHTML);
    }
  }, [contentRef.current?.innerHTML]);

  // Auto-save simulation
  useEffect(() => {
    if (title || content) {
      setIsSaving(true);
      const timer = setTimeout(() => {
        setLastSaved(new Date());
        setIsSaving(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [title, content, genre, description, authorBio]);

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
      alert('Draft saved successfully!');
    }, 500);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert('Please add a title before publishing');
      return;
    }
    if (!content.trim()) {
      alert('Please add content before publishing');
      return;
    }
    if (!genre) {
      alert('Please select a genre before publishing');
      return;
    }
    // Show publish modal to confirm visibility
    setShowPublishModal(true);
  };

  const confirmPublish = async () => {
    try {
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('Please sign in to publish');
        return;
      }

      // Create work via API
      const response = await fetch('/api/works', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          title,
          description,
          genre,
          content: contentRef.current?.innerHTML || content,
          visibility,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to publish');
      }

      const { data: work } = await response.json();

      alert(`Story "${title}" published successfully as ${visibility}!`);
      setShowPublishModal(false);

      // Redirect to the published story
      window.location.href = `/work/${work.id}`;
    } catch (error: any) {
      console.error('Publish error:', error);
      alert(`Failed to publish: ${error.message}`);
    }
  };

  // Proofread function - Comprehensive checks inspired by Grammarly, ProWritingAid, Hemingway
  const handleProofread = () => {
    if (!contentRef.current) return;

    setIsProofreading(true);
    setShowProofreadPanel(true);

    setTimeout(() => {
      const text = contentRef.current?.innerText || '';
      const results: {type: string; message: string}[] = [];

      if (text.length === 0) {
        results.push({ type: 'info', message: 'No content to proofread' });
      } else {
        let issuesFound = false;

        // ========== SPELLING & TYPOS ==========

        // Common misspellings
        const commonErrors = [
          'teh', 'recieve', 'occured', 'seperate', 'definately', 'untill', 'wierd',
          'occassion', 'accomodate', 'acheive', 'beleive', 'begining', 'calender',
          'commited', 'concious', 'enviroment', 'existance', 'goverment', 'grammer',
          'independant', 'neccessary', 'occurance', 'posession', 'proffesional',
          'publically', 'reccomend', 'religous', 'rythm', 'succesful', 'tommorow',
          'usefull', 'writting', 'thier', 'alot', 'aswell', 'ym', 'tihs', 'taht',
          'adn', 'hte', 'fo', 'cna', 'jsut', 'liek', 'waht', 'whic', 'tiem'
        ];

        const foundCommonErrors: string[] = [];
        commonErrors.forEach(error => {
          const regex = new RegExp(`\\b${error}\\b`, 'gi');
          if (regex.test(text)) {
            foundCommonErrors.push(error);
            issuesFound = true;
          }
        });

        if (foundCommonErrors.length > 0) {
          results.push({
            type: 'error',
            message: `Spelling errors: ${foundCommonErrors.slice(0, 3).join(', ')}${foundCommonErrors.length > 3 ? ` +${foundCommonErrors.length - 3} more` : ''}`
          });
        }

        // Pattern-based typo detection
        const words = text.match(/\b[a-zA-Z']+\b/g) || [];
        const suspiciousWords: string[] = [];
        const tripleLetterWords: string[] = [];

        words.forEach(word => {
          const lowerWord = word.toLowerCase().replace(/'/g, '');
          if (lowerWord.length <= 2) return;

          // Triple letters (almost always wrong)
          if (lowerWord.match(/([a-z])\1\1/i)) {
            if (!tripleLetterWords.includes(word)) {
              tripleLetterWords.push(word);
              issuesFound = true;
            }
          }

          // Unusual consonant clusters
          if (lowerWord.match(/[bcdfghjklmnpqrstvwxyz]{5,}/i) &&
              !lowerWord.match(/tion|ness|less|ment|ship|hood|ight|ough|tch|sch/i)) {
            if (!suspiciousWords.includes(word)) {
              suspiciousWords.push(word);
            }
          }
        });

        if (tripleLetterWords.length > 0) {
          results.push({
            type: 'error',
            message: `Triple letter errors: ${tripleLetterWords.slice(0, 3).join(', ')}`
          });
        }

        // ========== GRAMMAR & SENTENCE STRUCTURE ==========

        // Common grammar mistakes
        if (text.match(/\bcould of\b|\bwould of\b|\bshould of\b/gi)) {
          results.push({ type: 'error', message: 'Use "could have" not "could of"' });
          issuesFound = true;
        }

        // Incomplete sentences
        if (text.match(/,\s+(I|he|she|it|we|they|you|a|an|the)[.!?]\s*$/i)) {
          results.push({
            type: 'error',
            message: 'Incomplete sentence - ends with pronoun/article after comma'
          });
          issuesFound = true;
        }

        if (text.match(/,\s+(and|but|or|so|yet|for|nor|because|although|while|since)[.!?]\s*$/i)) {
          results.push({
            type: 'error',
            message: 'Incomplete sentence - ends with conjunction after comma'
          });
          issuesFound = true;
        }

        // Repeated words
        const repeatedMatches = text.match(/\b(\w+)\s+\1\b/gi);
        if (repeatedMatches && repeatedMatches.length > 0) {
          results.push({
            type: 'warning',
            message: `Repeated words found: ${repeatedMatches.slice(0, 2).join(', ')}${repeatedMatches.length > 2 ? ` +${repeatedMatches.length - 2} more` : ''}`
          });
        }

        // Capitalization after punctuation
        if (text.match(/[.!?]\s+[a-z]/g)) {
          results.push({ type: 'warning', message: 'Some sentences don\'t start with capitals' });
        }

        // ========== STYLE & CLARITY (Hemingway-style) ==========

        // Passive voice detection
        const passivePatterns = [
          /\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi,
          /\b(is|are|was|were|be|been|being)\s+\w+en\b/gi
        ];
        let passiveCount = 0;
        passivePatterns.forEach(pattern => {
          const matches = text.match(pattern);
          if (matches) passiveCount += matches.length;
        });
        if (passiveCount > 2) {
          results.push({
            type: 'info',
            message: `${passiveCount} instances of passive voice - consider active voice for clarity`
          });
        }

        // Adverb detection (-ly words)
        const adverbs = text.match(/\b\w+ly\b/gi);
        const adverbCount = adverbs ? adverbs.filter(word =>
          !['only', 'early', 'daily', 'weekly', 'monthly', 'yearly', 'holy', 'lovely', 'friendly', 'silly', 'ugly'].includes(word.toLowerCase())
        ).length : 0;
        if (adverbCount > 5) {
          results.push({
            type: 'info',
            message: `${adverbCount} adverbs found - try stronger verbs instead`
          });
        }

        // Weak/filler words
        const weakWords = ['very', 'really', 'just', 'actually', 'quite', 'rather', 'somewhat', 'extremely'];
        let weakWordCount = 0;
        weakWords.forEach(word => {
          const matches = text.match(new RegExp(`\\b${word}\\b`, 'gi'));
          if (matches) weakWordCount += matches.length;
        });
        if (weakWordCount > 3) {
          results.push({
            type: 'info',
            message: `${weakWordCount} weak words (very, really, just, etc.) - be more specific`
          });
        }

        // Cliches
        const cliches = [
          'at the end of the day', 'think outside the box', 'low-hanging fruit',
          'paradigm shift', 'touch base', 'circle back', 'move the needle',
          'it goes without saying', 'last but not least', 'a blessing in disguise',
          'beat around the bush', 'crystal clear', 'easier said than done'
        ];
        const foundCliches: string[] = [];
        cliches.forEach(cliche => {
          if (text.toLowerCase().includes(cliche)) {
            foundCliches.push(cliche);
          }
        });
        if (foundCliches.length > 0) {
          results.push({
            type: 'warning',
            message: `Cliche detected: "${foundCliches[0]}" - try fresh language`
          });
        }

        // ========== READABILITY ==========

        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

        // Very long sentences (hard to read)
        const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 40);
        if (longSentences.length > 0) {
          results.push({
            type: 'info',
            message: `${longSentences.length} very long sentence${longSentences.length > 1 ? 's' : ''} (40+ words) - consider breaking up`
          });
        }

        // Very short sentences (might feel choppy if too many)
        const shortSentences = sentences.filter(s => {
          const wordCount = s.trim().split(/\s+/).length;
          return wordCount > 0 && wordCount < 5;
        });
        if (shortSentences.length > sentences.length * 0.5 && sentences.length > 5) {
          results.push({
            type: 'info',
            message: 'Many short sentences - vary sentence length for better flow'
          });
        }

        // Sentence variety - check if many sentences start the same way
        if (sentences.length > 5) {
          const starters = sentences.map(s => {
            const words = s.trim().split(/\s+/);
            return words[0]?.toLowerCase() || '';
          });
          const starterCounts: {[key: string]: number} = {};
          starters.forEach(starter => {
            if (starter.length > 2) {
              starterCounts[starter] = (starterCounts[starter] || 0) + 1;
            }
          });
          const repeatedStarters = Object.entries(starterCounts).filter(([_, count]) => count > 3);
          if (repeatedStarters.length > 0) {
            results.push({
              type: 'info',
              message: `${repeatedStarters.length} repeated sentence starter${repeatedStarters.length > 1 ? 's' : ''} - vary your openings`
            });
          }
        }

        // ========== CONSISTENCY ==========

        // Mixed spelling (US vs UK)
        const hasUS = text.match(/\b(color|flavor|honor|labor|neighbor)\b/gi);
        const hasUK = text.match(/\b(colour|flavour|honour|labour|neighbour)\b/gi);
        if (hasUS && hasUK) {
          results.push({
            type: 'warning',
            message: 'Mixed US/UK spelling - be consistent'
          });
        }

        // Multiple spaces
        if (text.match(/\s{2,}/g)) {
          results.push({ type: 'warning', message: 'Multiple consecutive spaces found' });
        }

        // ========== DIALOGUE (for fiction) ==========

        // Excessive dialogue tags
        const dialogueTags = text.match(/\b(said|asked|replied|shouted|whispered|exclaimed|murmured|muttered)\b/gi);
        if (dialogueTags && dialogueTags.length > 10) {
          const saidCount = text.match(/\bsaid\b/gi)?.length || 0;
          if (saidCount > dialogueTags.length * 0.7) {
            results.push({
              type: 'info',
              message: `Many "said" tags (${saidCount}) - consider varying or using action beats`
            });
          }
        }

        // ========== FINAL CHECKS ==========

        // Document ending
        if (!text.match(/[.!?]$/)) {
          results.push({ type: 'info', message: 'Document doesn\'t end with punctuation' });
        }

        if (results.length === 0) {
          results.push({ type: 'success', message: 'Excellent! No issues found. Your writing looks polished.' });
        }
      }

      setProofreadResults(results);
      setIsProofreading(false);
    }, 2000);
  };

  // Formatting functions
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const handleContentInput = () => {
    if (contentRef.current) {
      const text = contentRef.current.innerText || '';
      const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      setWordCount(words);
      setContent(contentRef.current.innerHTML);
    }
  };

  return (
    <>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#FDFCFA',
      }}>
        {/* Elegant Header */}
        <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(253, 252, 250, 0.98)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(229, 227, 223, 0.3)',
        padding: '18px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link href="/" style={{
            fontSize: '19px',
            fontWeight: '600',
            color: '#2D2A26',
            textDecoration: 'none',
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.01em',
          }}>
            Verso
          </Link>

          {/* Auto-save indicator */}
          <div style={{
            fontSize: '12px',
            color: '#9B9690',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            opacity: isSaving ? 1 : 0.7,
            transition: 'opacity 0.3s',
          }}>
            <div style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: isSaving ? '#9CAF88' : '#9CAF88',
              opacity: isSaving ? 1 : 0.5,
            }}></div>
            {isSaving ? 'Saving' : lastSaved ? `Saved ${lastSaved.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : 'Unsaved'}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Metadata toggle */}
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            style={{
              padding: '9px 18px',
              backgroundColor: showMetadata ? 'rgba(128, 0, 32, 0.06)' : 'transparent',
              border: '1px solid rgba(229, 227, 223, 0.5)',
              borderRadius: '6px',
              color: showMetadata ? '#800020' : '#6B6560',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'system-ui, sans-serif',
            }}
            onMouseEnter={(e) => {
              if (!showMetadata) {
                e.currentTarget.style.backgroundColor = 'rgba(229, 227, 223, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.8)';
              }
            }}
            onMouseLeave={(e) => {
              if (!showMetadata) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
              }
            }}
          >
            Details
          </button>

          {/* Word count */}
          <span style={{
            fontSize: '13px',
            color: '#9B9690',
            fontFamily: 'system-ui, sans-serif',
            padding: '9px 16px',
            backgroundColor: 'rgba(156, 175, 136, 0.06)',
            borderRadius: '6px',
          }}>
            {wordCount} words
          </span>

          {/* Proofread */}
          <button
            onClick={handleProofread}
            disabled={isProofreading}
            style={{
              padding: '9px 20px',
              backgroundColor: 'white',
              border: '1px solid rgba(229, 227, 223, 0.8)',
              borderRadius: '6px',
              color: isProofreading ? '#9B9690' : '#6B6560',
              fontSize: '13px',
              fontWeight: '500',
              cursor: isProofreading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'system-ui, sans-serif',
              opacity: isProofreading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isProofreading) {
                e.currentTarget.style.backgroundColor = '#F5F3F0';
                e.currentTarget.style.borderColor = '#800020';
                e.currentTarget.style.color = '#800020';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProofreading) {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.8)';
                e.currentTarget.style.color = '#6B6560';
              }
            }}
          >
            {isProofreading ? 'Checking...' : 'Proofread'}
          </button>

          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            style={{
              padding: '9px 20px',
              backgroundColor: 'white',
              border: '1px solid rgba(229, 227, 223, 0.8)',
              borderRadius: '6px',
              color: '#6B6560',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'system-ui, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F3F0';
              e.currentTarget.style.borderColor = '#800020';
              e.currentTarget.style.color = '#800020';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.8)';
              e.currentTarget.style.color = '#6B6560';
            }}
          >
            Save Draft
          </button>

          {/* Publish */}
          <button
            onClick={handlePublish}
            style={{
              padding: '9px 24px',
              backgroundColor: '#800020',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'system-ui, sans-serif',
              boxShadow: '0 1px 3px rgba(128, 0, 32, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#660033';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(128, 0, 32, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#800020';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(128, 0, 32, 0.2)';
            }}
          >
            Publish
          </button>
        </div>
      </header>

      {/* Metadata Panel - Slides down elegantly */}
      {showMetadata && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(229, 227, 223, 0.4)',
          padding: '32px 48px',
          zIndex: 99,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
          animation: 'slideDown 0.3s ease',
        }}>
          <style>{`
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div style={{
            maxWidth: '720px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
          }}>
            <div style={{ position: 'relative' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: '#6B6560',
                marginBottom: '10px',
                fontWeight: '600',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, sans-serif',
              }}>
                Genre
              </label>
              <button
                onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                type="button"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  fontSize: '14px',
                  border: showGenreDropdown ? '1px solid #800020' : '1px solid rgba(229, 227, 223, 0.6)',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: genre ? '#2D2A26' : '#9B9690',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'Georgia, serif',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: showGenreDropdown ? '0 0 0 3px rgba(128, 0, 32, 0.08)' : 'none',
                }}
              >
                <span>{genre ? (
                  {
                    'adventure': 'Adventure',
                    'anthropology': 'Anthropology',
                    'art-aesthetics': 'Art & Aesthetics',
                    'biography': 'Biography',
                    'contemporary': 'Contemporary',
                    'crime': 'Crime',
                    'cultural-studies': 'Cultural Studies',
                    'drama': 'Drama',
                    'dystopian': 'Dystopian',
                    'economics': 'Economics',
                    'education': 'Education',
                    'environmental': 'Environmental',
                    'essays': 'Essays',
                    'ethics': 'Ethics',
                    'fantasy': 'Fantasy',
                    'historical': 'Historical',
                    'history': 'History',
                    'horror': 'Horror',
                    'humor': 'Humor',
                    'journalism': 'Journalism',
                    'law-justice': 'Law & Justice',
                    'literary': 'Literary',
                    'literary-criticism': 'Literary Criticism',
                    'magical-realism': 'Magical Realism',
                    'memoir': 'Memoir',
                    'mystery': 'Mystery',
                    'philosophy': 'Philosophy',
                    'poetry': 'Poetry',
                    'politics': 'Politics',
                    'psychology': 'Psychology',
                    'religion-spirituality': 'Religion & Spirituality',
                    'romance': 'Romance',
                    'science': 'Science',
                    'science-fiction': 'Science Fiction',
                    'short-stories': 'Short Stories',
                    'sociology': 'Sociology',
                    'technology': 'Technology',
                    'thriller': 'Thriller',
                    'young-adult': 'Young Adult'
                  }[genre] || 'Select genre...'
                ) : 'Select genre...'}</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ transform: showGenreDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {showGenreDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  backgroundColor: 'white',
                  border: '1px solid rgba(229, 227, 223, 0.6)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  zIndex: 1000,
                  maxHeight: '280px',
                  overflowY: 'auto',
                  padding: '6px',
                }}>
                  {[
                    { value: '', label: 'Select genre...' },
                    { value: 'adventure', label: 'Adventure' },
                    { value: 'anthropology', label: 'Anthropology' },
                    { value: 'art-aesthetics', label: 'Art & Aesthetics' },
                    { value: 'biography', label: 'Biography' },
                    { value: 'contemporary', label: 'Contemporary' },
                    { value: 'crime', label: 'Crime' },
                    { value: 'cultural-studies', label: 'Cultural Studies' },
                    { value: 'drama', label: 'Drama' },
                    { value: 'dystopian', label: 'Dystopian' },
                    { value: 'economics', label: 'Economics' },
                    { value: 'education', label: 'Education' },
                    { value: 'environmental', label: 'Environmental' },
                    { value: 'essays', label: 'Essays' },
                    { value: 'ethics', label: 'Ethics' },
                    { value: 'fantasy', label: 'Fantasy' },
                    { value: 'historical', label: 'Historical' },
                    { value: 'history', label: 'History' },
                    { value: 'horror', label: 'Horror' },
                    { value: 'humor', label: 'Humor' },
                    { value: 'journalism', label: 'Journalism' },
                    { value: 'law-justice', label: 'Law & Justice' },
                    { value: 'literary', label: 'Literary' },
                    { value: 'literary-criticism', label: 'Literary Criticism' },
                    { value: 'magical-realism', label: 'Magical Realism' },
                    { value: 'memoir', label: 'Memoir' },
                    { value: 'mystery', label: 'Mystery' },
                    { value: 'philosophy', label: 'Philosophy' },
                    { value: 'poetry', label: 'Poetry' },
                    { value: 'politics', label: 'Politics' },
                    { value: 'psychology', label: 'Psychology' },
                    { value: 'religion-spirituality', label: 'Religion & Spirituality' },
                    { value: 'romance', label: 'Romance' },
                    { value: 'science', label: 'Science' },
                    { value: 'science-fiction', label: 'Science Fiction' },
                    { value: 'short-stories', label: 'Short Stories' },
                    { value: 'sociology', label: 'Sociology' },
                    { value: 'technology', label: 'Technology' },
                    { value: 'thriller', label: 'Thriller' },
                    { value: 'young-adult', label: 'Young Adult' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setGenre(option.value);
                        setShowGenreDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: genre === option.value ? 'rgba(128, 0, 32, 0.06)' : 'transparent',
                        color: genre === option.value ? '#800020' : '#2D2A26',
                        fontFamily: 'Georgia, serif',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                        fontWeight: genre === option.value ? '500' : '400',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = genre === option.value ? 'rgba(128, 0, 32, 0.08)' : 'rgba(229, 227, 223, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = genre === option.value ? 'rgba(128, 0, 32, 0.06)' : 'transparent';
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: '#6B6560',
                marginBottom: '10px',
                fontWeight: '600',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, sans-serif',
              }}>
                Status
              </label>
              <div style={{
                padding: '11px 14px',
                fontSize: '14px',
                border: '1px solid rgba(229, 227, 223, 0.6)',
                borderRadius: '6px',
                backgroundColor: 'rgba(156, 175, 136, 0.04)',
                color: '#6B6560',
                fontFamily: 'Georgia, serif',
              }}>
                Draft
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: '#6B6560',
                marginBottom: '10px',
                fontWeight: '600',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, sans-serif',
              }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  const words = e.target.value.trim().split(/\s+/).filter(w => w.length > 0);
                  if (words.length <= 65 || e.target.value === '') {
                    setDescription(e.target.value);
                  }
                }}
                placeholder="A brief summary that appears when readers discover your story..."
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  fontSize: '14px',
                  border: '1px solid rgba(229, 227, 223, 0.6)',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: '#2D2A26',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '70px',
                  fontFamily: 'Georgia, serif',
                  lineHeight: '1.6',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#800020';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(128, 0, 32, 0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.6)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <div style={{
                fontSize: '11px',
                color: '#9B9690',
                marginTop: '6px',
                textAlign: 'right',
                fontFamily: 'system-ui, sans-serif',
              }}>
                {description.trim().split(/\s+/).filter(w => w.length > 0).length}/65 words
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: '#6B6560',
                marginBottom: '10px',
                fontWeight: '600',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, sans-serif',
              }}>
                Author Bio
              </label>
              <textarea
                value={authorBio}
                onChange={(e) => {
                  const words = e.target.value.trim().split(/\s+/).filter(w => w.length > 0);
                  if (words.length <= 300 || e.target.value === '') {
                    setAuthorBio(e.target.value);
                  }
                }}
                placeholder="Tell readers about yourself and your writing journey..."
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  fontSize: '14px',
                  border: '1px solid rgba(229, 227, 223, 0.6)',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  color: '#2D2A26',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '90px',
                  fontFamily: 'Georgia, serif',
                  lineHeight: '1.6',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#800020';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(128, 0, 32, 0.08)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.6)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <div style={{
                fontSize: '11px',
                color: '#9B9690',
                marginTop: '6px',
                textAlign: 'right',
                fontFamily: 'system-ui, sans-serif',
              }}>
                {authorBio.trim().split(/\s+/).filter(w => w.length > 0).length}/300 words
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Proofread Results Panel */}
      {showProofreadPanel && (
        <div style={{
          position: 'fixed',
          top: showMetadata ? '268px' : '68px',
          right: '24px',
          width: '320px',
          backgroundColor: 'white',
          border: '1px solid rgba(229, 227, 223, 0.4)',
          borderRadius: '12px',
          padding: '20px',
          zIndex: 100,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          animation: 'slideInRight 0.3s ease',
        }}>
          <style>{`
            @keyframes slideInRight {
              from {
                opacity: 0;
                transform: translateX(20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#2D2A26',
              margin: 0,
              fontFamily: 'system-ui, sans-serif',
            }}>
              Proofread Results
            </h3>
            <button
              onClick={() => setShowProofreadPanel(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                color: '#9B9690',
                cursor: 'pointer',
                padding: '4px',
                lineHeight: '1',
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
          }}>
            {isProofreading ? (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: '#9B9690',
                fontSize: '14px',
              }}>
                Analyzing your document...
              </div>
            ) : (
              proofreadResults.map((result, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px',
                    marginBottom: '8px',
                    borderRadius: '6px',
                    backgroundColor:
                      result.type === 'error' ? 'rgba(220, 38, 38, 0.08)' :
                      result.type === 'warning' ? 'rgba(245, 158, 11, 0.08)' :
                      result.type === 'success' ? 'rgba(34, 197, 94, 0.08)' :
                      'rgba(59, 130, 246, 0.08)',
                    border: `1px solid ${
                      result.type === 'error' ? 'rgba(220, 38, 38, 0.2)' :
                      result.type === 'warning' ? 'rgba(245, 158, 11, 0.2)' :
                      result.type === 'success' ? 'rgba(34, 197, 94, 0.2)' :
                      'rgba(59, 130, 246, 0.2)'
                    }`,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{
                      fontSize: '16px',
                      lineHeight: '1.4',
                    }}>
                      {result.type === 'error' ? '❌' :
                       result.type === 'warning' ? '⚠️' :
                       result.type === 'success' ? '✅' : 'ℹ️'}
                    </span>
                    <span style={{
                      fontSize: '13px',
                      color: '#2D2A26',
                      lineHeight: '1.4',
                      fontFamily: 'system-ui, sans-serif',
                    }}>
                      {result.message}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Editor */}
      <main style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: showMetadata ? '280px 40px 80px' : '120px 40px 80px',
        transition: 'padding 0.3s ease',
      }}>
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          style={{
            width: '100%',
            padding: '0',
            fontSize: '52px',
            fontWeight: '600',
            fontFamily: 'Georgia, serif',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: '#2D2A26',
            marginBottom: '48px',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
          }}
        />

        {/* Content */}
        <div
          ref={contentRef}
          contentEditable
          onInput={handleContentInput}
          data-placeholder="Start writing your story..."
          style={{
            width: '100%',
            minHeight: '70vh',
            padding: '0',
            fontSize: '20px',
            lineHeight: '1.8',
            fontFamily: 'Georgia, serif',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: '#2D2A26',
          }}
          suppressContentEditableWarning
        />

        {/* Footer */}
        <div style={{
          marginTop: '60px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(229, 227, 223, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: '#9B9690',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <div>
            {wordCount.toLocaleString()} words · {content.length.toLocaleString()} characters
          </div>
          <div>
            {Math.ceil(wordCount / 200)} min read
          </div>
        </div>
      </main>
      </div>

      {/* Floating Formatting Toolbar - Always visible at bottom of viewport */}
      <div id="formatting-toolbar" style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(253, 252, 250, 0.98)',
        borderRadius: '12px',
        padding: '14px 20px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(229, 227, 223, 0.5)',
        zIndex: 9999,
      }}>
        {/* Bold */}
        <button
          onClick={() => formatText('bold')}
          title="Bold (Ctrl+B)"
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(229, 227, 223, 0.5)',
            borderRadius: '6px',
            color: '#6B6560',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'Georgia, serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.06)';
            e.currentTarget.style.borderColor = '#800020';
            e.currentTarget.style.color = '#800020';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
            e.currentTarget.style.color = '#6B6560';
          }}
        >
          <strong>B</strong>
        </button>

        {/* Italic */}
        <button
          onClick={() => formatText('italic')}
          title="Italic (Ctrl+I)"
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(229, 227, 223, 0.5)',
            borderRadius: '6px',
            color: '#6B6560',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'Georgia, serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.06)';
            e.currentTarget.style.borderColor = '#800020';
            e.currentTarget.style.color = '#800020';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
            e.currentTarget.style.color = '#6B6560';
          }}
        >
          <em>I</em>
        </button>

        {/* Underline */}
        <button
          onClick={() => formatText('underline')}
          title="Underline (Ctrl+U)"
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(229, 227, 223, 0.5)',
            borderRadius: '6px',
            color: '#6B6560',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'Georgia, serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.06)';
            e.currentTarget.style.borderColor = '#800020';
            e.currentTarget.style.color = '#800020';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
            e.currentTarget.style.color = '#6B6560';
          }}
        >
          <u>U</u>
        </button>

        <div style={{
          width: '1px',
          height: '24px',
          backgroundColor: 'rgba(229, 227, 223, 0.5)',
          margin: '0 4px',
        }}></div>

        {/* Heading 1 */}
        <button
          onClick={() => formatText('formatBlock', 'h1')}
          title="Heading 1"
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(229, 227, 223, 0.5)',
            borderRadius: '6px',
            color: '#6B6560',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'system-ui, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.06)';
            e.currentTarget.style.borderColor = '#800020';
            e.currentTarget.style.color = '#800020';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
            e.currentTarget.style.color = '#6B6560';
          }}
        >
          H1
        </button>

        {/* Heading 2 */}
        <button
          onClick={() => formatText('formatBlock', 'h2')}
          title="Heading 2"
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(229, 227, 223, 0.5)',
            borderRadius: '6px',
            color: '#6B6560',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'system-ui, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.06)';
            e.currentTarget.style.borderColor = '#800020';
            e.currentTarget.style.color = '#800020';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
            e.currentTarget.style.color = '#6B6560';
          }}
        >
          H2
        </button>

        {/* Quote */}
        <button
          onClick={() => formatText('formatBlock', 'blockquote')}
          title="Quote"
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(229, 227, 223, 0.5)',
            borderRadius: '6px',
            color: '#6B6560',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'Georgia, serif',
            lineHeight: '1',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.06)';
            e.currentTarget.style.borderColor = '#800020';
            e.currentTarget.style.color = '#800020';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
            e.currentTarget.style.color = '#6B6560';
          }}
        >
          "
        </button>

        <div style={{
          width: '1px',
          height: '24px',
          backgroundColor: 'rgba(229, 227, 223, 0.5)',
          margin: '0 4px',
        }}></div>

        {/* Bullet List */}
        <button
          onClick={() => formatText('insertUnorderedList')}
          title="Bullet List"
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(229, 227, 223, 0.5)',
            borderRadius: '6px',
            color: '#6B6560',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'system-ui, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.06)';
            e.currentTarget.style.borderColor = '#800020';
            e.currentTarget.style.color = '#800020';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
            e.currentTarget.style.color = '#6B6560';
          }}
        >
          • List
        </button>

        {/* Numbered List */}
        <button
          onClick={() => formatText('insertOrderedList')}
          title="Numbered List"
          style={{
            padding: '8px 12px',
            backgroundColor: 'transparent',
            border: '1px solid rgba(229, 227, 223, 0.5)',
            borderRadius: '6px',
            color: '#6B6560',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'system-ui, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.06)';
            e.currentTarget.style.borderColor = '#800020';
            e.currentTarget.style.color = '#800020';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(229, 227, 223, 0.5)';
            e.currentTarget.style.color = '#6B6560';
          }}
        >
          1. List
        </button>
      </div>

      {/* Styles for contentEditable placeholder and toolbar */}
      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9B9690;
          font-style: italic;
        }
        [contenteditable]:focus {
          outline: none;
        }
        #formatting-toolbar {
          position: fixed !important;
          bottom: 40px !important;
          z-index: 9999 !important;
          will-change: transform !important;
        }
      `}</style>

      {/* Publish Modal */}
      {showPublishModal && (
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
              zIndex: 10000,
            }}
            onClick={() => setShowPublishModal(false)}
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
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15)',
              zIndex: 10001,
            }}
          >
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px',
              fontWeight: '500',
              color: '#2D2A26',
              marginBottom: '16px'
            }}>
              Ready to Publish?
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#6B6560',
              lineHeight: '1.6',
              marginBottom: '32px'
            }}>
              Choose the visibility for your story. You can change this later in your settings.
            </p>

            {/* Visibility Options */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#2D2A26',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Visibility
              </div>

              {/* Public Option */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '20px',
                  backgroundColor: visibility === 'public' ? 'rgba(156, 175, 136, 0.1)' : '#F5F3F0',
                  border: visibility === 'public' ? '2px solid #9CAF88' : '2px solid transparent',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (visibility !== 'public') {
                    e.currentTarget.style.backgroundColor = 'rgba(229, 227, 223, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (visibility !== 'public') {
                    e.currentTarget.style.backgroundColor = '#F5F3F0';
                  }
                }}
              >
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === 'public'}
                  onChange={() => setVisibility('public')}
                  style={{
                    marginTop: '4px',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: '#9CAF88'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#2D2A26',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>🌐</span>
                    Public
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6B6560',
                    lineHeight: '1.5'
                  }}>
                    Anyone on Verso can read, comment, and share your story. It will appear in Discover and search results.
                  </div>
                </div>
              </label>

              {/* Private Option */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '20px',
                  backgroundColor: visibility === 'private' ? 'rgba(156, 175, 136, 0.1)' : '#F5F3F0',
                  border: visibility === 'private' ? '2px solid #9CAF88' : '2px solid transparent',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (visibility !== 'private') {
                    e.currentTarget.style.backgroundColor = 'rgba(229, 227, 223, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (visibility !== 'private') {
                    e.currentTarget.style.backgroundColor = '#F5F3F0';
                  }
                }}
              >
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === 'private'}
                  onChange={() => setVisibility('private')}
                  style={{
                    marginTop: '4px',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    accentColor: '#9CAF88'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#2D2A26',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>🔒</span>
                    Private
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6B6560',
                    lineHeight: '1.5'
                  }}>
                    Only you can see this story. It won't appear in Discover or search results. Perfect for drafts or personal writing.
                  </div>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowPublishModal(false)}
                style={{
                  padding: '12px 24px',
                  fontSize: '15px',
                  fontWeight: '500',
                  color: '#6B6560',
                  backgroundColor: 'transparent',
                  border: '1px solid #E5E3DF',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
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
                onClick={confirmPublish}
                style={{
                  padding: '12px 32px',
                  fontSize: '15px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: '#800020',
                  border: 'none',
                  borderRadius: '8px',
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
                Publish Story
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
