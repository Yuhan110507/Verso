'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Message {
  id: number;
  author: string;
  authorInitial: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

interface Group {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  lastMessage: string;
  lastMessageTime: string;
  unread?: number;
}

export default function GroupsPage() {
  const [selectedGroupId, setSelectedGroupId] = useState<number>(1);
  const [messageInput, setMessageInput] = useState('');
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  // Groups data with state so it can be updated
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: 'Fantasy Writers Circle',
      description: 'A group for fantasy authors to share worldbuilding ideas',
      memberCount: 12,
      lastMessage: 'What magic systems are you using?',
      lastMessageTime: '2m ago',
      unread: 3,
    },
    {
      id: 2,
      name: 'Poetry Workshop',
      description: 'Weekly poetry critique and discussion',
      memberCount: 8,
      lastMessage: 'Love the imagery in your latest piece!',
      lastMessageTime: '1h ago',
      unread: 1,
    },
    {
      id: 3,
      name: 'Sci-Fi Storytellers',
      description: 'Hard sci-fi and speculative fiction enthusiasts',
      memberCount: 15,
      lastMessage: 'Anyone writing climate fiction?',
      lastMessageTime: '3h ago',
    },
    {
      id: 4,
      name: 'Literary Fiction Club',
      description: 'Character-driven stories and literary discussions',
      memberCount: 10,
      lastMessage: 'Just finished the first draft!',
      lastMessageTime: '1d ago',
    },
  ]);

  // Messages organized by group ID
  const messagesByGroup: {[key: number]: Message[]} = {
    1: [ // Fantasy Writers Circle
      {
        id: 1,
        author: 'Elena Volkov',
        authorInitial: 'E',
        content: 'Hey everyone! I\'ve been working on a new magic system for my fantasy novel. It\'s based on emotions rather than traditional elements. What do you think?',
        timestamp: '10:23 AM',
      },
      {
        id: 2,
        author: 'Marcus Webb',
        authorInitial: 'M',
        content: 'That sounds fascinating! Emotion-based magic could lead to really interesting character development. How does it manifest?',
        timestamp: '10:27 AM',
      },
      {
        id: 3,
        author: 'You',
        authorInitial: 'Y',
        content: 'I love this concept! It reminds me of some psychological theories about emotional energy. Have you thought about the limitations?',
        timestamp: '10:35 AM',
        isOwn: true,
      },
      {
        id: 4,
        author: 'Elena Volkov',
        authorInitial: 'E',
        content: 'Great question! I\'m thinking that extreme emotions can be draining, so mages need to maintain balance. Too much joy or sorrow could actually weaken their abilities.',
        timestamp: '10:42 AM',
      },
      {
        id: 5,
        author: 'Sarah Chen',
        authorInitial: 'S',
        content: 'What magic systems are you using?',
        timestamp: '11:05 AM',
      },
    ],
    2: [ // Poetry Workshop
      {
        id: 1,
        author: 'Ava Summers',
        authorInitial: 'A',
        content: 'I just finished a new poem about the changing seasons. Would love some feedback on the imagery!',
        timestamp: '9:15 AM',
      },
      {
        id: 2,
        author: 'Thomas Blackwood',
        authorInitial: 'T',
        content: 'I\'d love to read it! Have you considered using more sensory details? Touch and smell can really enhance seasonal poetry.',
        timestamp: '9:22 AM',
      },
      {
        id: 3,
        author: 'You',
        authorInitial: 'Y',
        content: 'The metaphor in your third stanza was beautiful. The way you connected autumn leaves to memories was really moving.',
        timestamp: '9:45 AM',
        isOwn: true,
      },
      {
        id: 4,
        author: 'Ava Summers',
        authorInitial: 'A',
        content: 'Thank you so much! That means a lot. I was worried it might be too abstract.',
        timestamp: '10:12 AM',
      },
      {
        id: 5,
        author: 'James Mitchell',
        authorInitial: 'J',
        content: 'Love the imagery in your latest piece!',
        timestamp: '2:30 PM',
      },
    ],
    3: [ // Sci-Fi Storytellers
      {
        id: 1,
        author: 'Sarah Chen',
        authorInitial: 'S',
        content: 'I\'m struggling with the science behind my FTL travel system. How do you balance scientific accuracy with storytelling needs?',
        timestamp: '11:00 AM',
      },
      {
        id: 2,
        author: 'You',
        authorInitial: 'Y',
        content: 'I think as long as you\'re internally consistent, readers will accept it. Establish the rules early and stick to them!',
        timestamp: '11:15 AM',
        isOwn: true,
      },
      {
        id: 3,
        author: 'Marcus Webb',
        authorInitial: 'M',
        content: 'Agreed! I spent weeks researching quantum mechanics for my novel, but ultimately had to simplify. The story comes first.',
        timestamp: '11:28 AM',
      },
      {
        id: 4,
        author: 'Thomas Blackwood',
        authorInitial: 'T',
        content: 'Anyone writing climate fiction? I\'m exploring that angle for my next project.',
        timestamp: '12:15 PM',
      },
    ],
    4: [ // Literary Fiction Club
      {
        id: 1,
        author: 'James Mitchell',
        authorInitial: 'J',
        content: 'Just finished the first draft of my novel! 85,000 words about a family coming apart at the seams.',
        timestamp: 'Yesterday',
      },
      {
        id: 2,
        author: 'Elena Volkov',
        authorInitial: 'E',
        content: 'Congratulations! That\'s a huge accomplishment. How are you feeling about it?',
        timestamp: 'Yesterday',
      },
      {
        id: 3,
        author: 'James Mitchell',
        authorInitial: 'J',
        content: 'Honestly? Exhausted but proud. The ending came together differently than I planned, but I think it\'s stronger for it.',
        timestamp: 'Yesterday',
      },
      {
        id: 4,
        author: 'You',
        authorInitial: 'Y',
        content: 'I\'d love to beta read when you\'re ready! Family dynamics are my favorite theme to read about.',
        timestamp: 'Yesterday',
        isOwn: true,
      },
    ],
  };

  const messages = messagesByGroup[selectedGroupId] || [];

  // Members organized by group ID
  const membersByGroup: {[key: number]: {name: string; initial: string; role: string}[]} = {
    1: [ // Fantasy Writers Circle
      { name: 'You', initial: 'Y', role: 'Admin' },
      { name: 'Elena Volkov', initial: 'E', role: 'Member' },
      { name: 'Marcus Webb', initial: 'M', role: 'Member' },
      { name: 'Sarah Chen', initial: 'S', role: 'Member' },
      { name: 'Thomas Blackwood', initial: 'T', role: 'Member' },
      { name: 'James Mitchell', initial: 'J', role: 'Member' },
      { name: 'Ava Summers', initial: 'A', role: 'Member' },
      { name: 'David Park', initial: 'D', role: 'Member' },
      { name: 'Sophia Rodriguez', initial: 'S', role: 'Member' },
      { name: 'Oliver Chen', initial: 'O', role: 'Member' },
      { name: 'Emma Wilson', initial: 'E', role: 'Member' },
      { name: 'Lucas Brown', initial: 'L', role: 'Member' },
    ],
    2: [ // Poetry Workshop
      { name: 'You', initial: 'Y', role: 'Admin' },
      { name: 'Ava Summers', initial: 'A', role: 'Member' },
      { name: 'Thomas Blackwood', initial: 'T', role: 'Member' },
      { name: 'James Mitchell', initial: 'J', role: 'Member' },
      { name: 'Isabella Garcia', initial: 'I', role: 'Member' },
      { name: 'Noah Anderson', initial: 'N', role: 'Member' },
      { name: 'Mia Thompson', initial: 'M', role: 'Member' },
      { name: 'Ethan Davis', initial: 'E', role: 'Member' },
    ],
    3: [ // Sci-Fi Storytellers
      { name: 'You', initial: 'Y', role: 'Admin' },
      { name: 'Sarah Chen', initial: 'S', role: 'Member' },
      { name: 'Marcus Webb', initial: 'M', role: 'Member' },
      { name: 'Thomas Blackwood', initial: 'T', role: 'Member' },
      { name: 'Alex Kim', initial: 'A', role: 'Member' },
      { name: 'Rachel Green', initial: 'R', role: 'Member' },
      { name: 'Daniel White', initial: 'D', role: 'Member' },
      { name: 'Sophie Martin', initial: 'S', role: 'Member' },
      { name: 'Jack Turner', initial: 'J', role: 'Member' },
      { name: 'Lily Foster', initial: 'L', role: 'Member' },
      { name: 'Ryan Cooper', initial: 'R', role: 'Member' },
      { name: 'Grace Lee', initial: 'G', role: 'Member' },
      { name: 'Max Stevens', initial: 'M', role: 'Member' },
      { name: 'Chloe Adams', initial: 'C', role: 'Member' },
      { name: 'Ben Taylor', initial: 'B', role: 'Member' },
    ],
    4: [ // Literary Fiction Club
      { name: 'You', initial: 'Y', role: 'Admin' },
      { name: 'James Mitchell', initial: 'J', role: 'Member' },
      { name: 'Elena Volkov', initial: 'E', role: 'Member' },
      { name: 'Victoria Harper', initial: 'V', role: 'Member' },
      { name: 'William Scott', initial: 'W', role: 'Member' },
      { name: 'Charlotte King', initial: 'C', role: 'Member' },
      { name: 'Henry Brooks', initial: 'H', role: 'Member' },
      { name: 'Amelia Clark', initial: 'A', role: 'Member' },
      { name: 'Oscar Wright', initial: 'O', role: 'Member' },
      { name: 'Zoe Phillips', initial: 'Z', role: 'Member' },
    ],
  };

  const members = membersByGroup[selectedGroupId] || [{ name: 'You', initial: 'Y', role: 'Admin' }];

  const selectedGroup = groups.find(g => g.id === selectedGroupId);
  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In production, this would send the message to your backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim() && newGroupDescription.trim()) {
      const newGroup: Group = {
        id: Math.max(...groups.map(g => g.id)) + 1,
        name: newGroupName.trim(),
        description: newGroupDescription.trim(),
        memberCount: 1, // Just the creator initially
        lastMessage: 'Group created',
        lastMessageTime: 'Just now',
      };

      setGroups([...groups, newGroup]);
      setSelectedGroupId(newGroup.id);
      setNewGroupName('');
      setNewGroupDescription('');
      setShowNewGroupModal(false);
    }
  };

  return (
    <main style={{ backgroundColor: '#F5F3F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
          maxWidth: '1400px',
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
              color: '#800020',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '500',
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

      {/* Main Content - Split View */}
      <div style={{ flex: 1, display: 'flex', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        {/* Left Sidebar - Groups List */}
        <div style={{
          width: '320px',
          backgroundColor: 'white',
          borderRight: '1px solid #E5E3DF',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{ padding: '24px', borderBottom: '1px solid #E5E3DF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: '600',
                color: '#2D2A26',
                margin: 0,
              }}>
                Literary Groups
              </h2>
              <button
                onClick={() => setShowNewGroupModal(true)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#800020',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#660019'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#800020'}
              >
                +
              </button>
            </div>
            {/* Search */}
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '14px',
                border: '1px solid #E5E3DF',
                borderRadius: '8px',
                backgroundColor: '#F5F3F0',
                outline: 'none',
                fontFamily: 'system-ui, sans-serif',
              }}
            />
          </div>

          {/* Groups List */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                style={{
                  padding: '16px 24px',
                  cursor: 'pointer',
                  backgroundColor: selectedGroupId === group.id ? 'rgba(128, 0, 32, 0.05)' : 'transparent',
                  borderLeft: selectedGroupId === group.id ? '3px solid #800020' : '3px solid transparent',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (selectedGroupId !== group.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(245, 243, 240, 0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedGroupId !== group.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h3 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#2D2A26',
                    margin: 0,
                  }}>
                    {group.name}
                  </h3>
                  {group.unread && (
                    <span style={{
                      backgroundColor: '#800020',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontFamily: 'system-ui, sans-serif',
                    }}>
                      {group.unread}
                    </span>
                  )}
                </div>
                <p style={{
                  fontSize: '13px',
                  color: '#6B6560',
                  margin: '4px 0',
                  lineHeight: '1.4',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {group.lastMessage}
                </p>
                <div style={{
                  fontSize: '12px',
                  color: '#9B9690',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}>
                  <span>{group.memberCount} members</span>
                  <span>•</span>
                  <span>{group.lastMessageTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
          {/* Chat Header */}
          <div style={{
            padding: '20px 32px',
            borderBottom: '1px solid #E5E3DF',
            backgroundColor: 'white',
          }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '20px',
              fontWeight: '600',
              color: '#2D2A26',
              margin: '0 0 4px 0',
            }}>
              {selectedGroup?.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <p style={{
                fontSize: '14px',
                color: '#6B6560',
                margin: 0,
              }}>
                {selectedGroup?.memberCount} members
              </p>
              <button
                onClick={() => setShowMembersModal(true)}
                style={{
                  padding: '6px 14px',
                  fontSize: '13px',
                  backgroundColor: 'transparent',
                  border: '1px solid #E5E3DF',
                  borderRadius: '6px',
                  color: '#6B6560',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#800020';
                  e.currentTarget.style.color = '#800020';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E3DF';
                  e.currentTarget.style.color = '#6B6560';
                }}
              >
                View Members
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignSelf: message.isOwn ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                }}
              >
                {!message.isOwn && (
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#9CAF88',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '500',
                    flexShrink: 0,
                    fontFamily: 'Georgia, serif',
                  }}>
                    {message.authorInitial}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  {!message.isOwn && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#2D2A26',
                        fontFamily: 'system-ui, sans-serif',
                      }}>
                        {message.author}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: '#9B9690',
                        fontFamily: 'system-ui, sans-serif',
                      }}>
                        {message.timestamp}
                      </span>
                    </div>
                  )}
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: message.isOwn ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    backgroundColor: message.isOwn ? '#800020' : '#F5F3F0',
                    color: message.isOwn ? 'white' : '#2D2A26',
                    fontSize: '15px',
                    lineHeight: '1.6',
                    fontFamily: 'system-ui, sans-serif',
                  }}>
                    {message.content}
                  </div>
                  {message.isOwn && (
                    <div style={{
                      textAlign: 'right',
                      marginTop: '4px',
                      fontSize: '12px',
                      color: '#9B9690',
                      fontFamily: 'system-ui, sans-serif',
                    }}>
                      {message.timestamp}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div style={{
            padding: '20px 32px',
            borderTop: '1px solid #E5E3DF',
            backgroundColor: 'white',
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-end',
            }}>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message... (Shift+Enter for new line)"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: '1px solid #E5E3DF',
                  borderRadius: '12px',
                  backgroundColor: '#F5F3F0',
                  outline: 'none',
                  fontFamily: 'system-ui, sans-serif',
                  resize: 'none',
                  minHeight: '48px',
                  maxHeight: '120px',
                  lineHeight: '1.5',
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                style={{
                  padding: '12px 24px',
                  backgroundColor: messageInput.trim() ? '#800020' : '#E5E3DF',
                  color: messageInput.trim() ? 'white' : '#9B9690',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: messageInput.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: 'system-ui, sans-serif',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (messageInput.trim()) {
                    e.currentTarget.style.backgroundColor = '#660019';
                  }
                }}
                onMouseLeave={(e) => {
                  if (messageInput.trim()) {
                    e.currentTarget.style.backgroundColor = '#800020';
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Group Modal */}
      {showNewGroupModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(45, 42, 38, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={() => setShowNewGroupModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px',
              fontWeight: '600',
              color: '#2D2A26',
              marginBottom: '8px',
            }}>
              Create New Group
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#6B6560',
              marginBottom: '24px',
            }}>
              Start a literary group to connect with other writers
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
                fontFamily: 'system-ui, sans-serif',
              }}>
                Group Name
              </label>
              <input
                type="text"
                placeholder="e.g., Mystery Writers Workshop"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  fontSize: '15px',
                  border: '1px solid #E5E3DF',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  outline: 'none',
                  fontFamily: 'Georgia, serif',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: '500',
                color: '#2D2A26',
                marginBottom: '8px',
                fontFamily: 'system-ui, sans-serif',
              }}>
                Description
              </label>
              <textarea
                placeholder="Briefly describe the purpose of this group..."
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  fontSize: '15px',
                  border: '1px solid #E5E3DF',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  outline: 'none',
                  fontFamily: 'system-ui, sans-serif',
                  resize: 'vertical',
                  minHeight: '80px',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowNewGroupModal(false)}
                style={{
                  padding: '10px 20px',
                  fontSize: '15px',
                  backgroundColor: 'transparent',
                  border: '1px solid #E5E3DF',
                  borderRadius: '8px',
                  color: '#6B6560',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: '500',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!newGroupName.trim() || !newGroupDescription.trim()}
                style={{
                  padding: '10px 20px',
                  fontSize: '15px',
                  backgroundColor: (newGroupName.trim() && newGroupDescription.trim()) ? '#800020' : '#E5E3DF',
                  border: 'none',
                  borderRadius: '8px',
                  color: (newGroupName.trim() && newGroupDescription.trim()) ? 'white' : '#9B9690',
                  cursor: (newGroupName.trim() && newGroupDescription.trim()) ? 'pointer' : 'not-allowed',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                  opacity: (newGroupName.trim() && newGroupDescription.trim()) ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (newGroupName.trim() && newGroupDescription.trim()) {
                    e.currentTarget.style.backgroundColor = '#660019';
                  }
                }}
                onMouseLeave={(e) => {
                  if (newGroupName.trim() && newGroupDescription.trim()) {
                    e.currentTarget.style.backgroundColor = '#800020';
                  }
                }}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members Modal */}
      {showMembersModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(45, 42, 38, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
        onClick={() => setShowMembersModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '70vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#2D2A26',
                  marginBottom: '4px',
                }}>
                  Group Members
                </h2>
                <p style={{
                  fontSize: '15px',
                  color: '#6B6560',
                  margin: 0,
                }}>
                  {selectedGroup?.name} • {members.length} member{members.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => setShowMembersModal(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  border: '1px solid #E5E3DF',
                  color: '#6B6560',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F5F3F0';
                  e.currentTarget.style.borderColor = '#800020';
                  e.currentTarget.style.color = '#800020';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#E5E3DF';
                  e.currentTarget.style.color = '#6B6560';
                }}
              >
                ×
              </button>
            </div>

            {/* Members List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {members.map((member, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: member.name === 'You' ? 'rgba(128, 0, 32, 0.05)' : '#F5F3F0',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: member.name === 'You' ? '#800020' : '#9CAF88',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    flexShrink: 0,
                    fontFamily: 'Georgia, serif',
                  }}>
                    {member.initial}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'system-ui, sans-serif',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#2D2A26',
                      marginBottom: '2px',
                    }}>
                      {member.name}
                    </div>
                    <div style={{
                      fontFamily: 'system-ui, sans-serif',
                      fontSize: '13px',
                      color: '#9B9690',
                    }}>
                      {member.role}
                    </div>
                  </div>
                  {member.role === 'Admin' && (
                    <div style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(128, 0, 32, 0.1)',
                      color: '#800020',
                      fontSize: '11px',
                      fontWeight: '600',
                      fontFamily: 'system-ui, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      Admin
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
