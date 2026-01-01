'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Add scrolled class when scrolled down 50px
          setIsScrolled(currentScrollY > 50);
          
          // Hide nav when scrolling down, show when scrolling up
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsHidden(true);
          } else if (currentScrollY < lastScrollY) {
            setIsHidden(false);
          }
          
          // Always show at top
          if (currentScrollY < 50) {
            setIsHidden(false);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Don't render header on auth pages - AFTER all hooks
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <header className={`${isScrolled ? 'nav-scrolled' : ''} ${isHidden ? 'nav-hidden' : ''}`}>
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group no-underline">
          <div className="w-8 h-8 relative flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Left page (sage) */}
                <div className="absolute inset-0 bg-verso-sage rounded-sm" style={{ width: '55%' }} />
                {/* Right page (cream with burgundy edge) */}
                <div
                  className="absolute inset-0 bg-verso-cream border-r-2 border-verso-burgundy rounded-sm group-hover:animate-gentle-fold"
                  style={{ width: '55%', left: '45%' }}
                />
              </div>
            </div>
          </div>
          <span className="text-xl font-serif font-bold text-verso-burgundy whitespace-nowrap">Verso</span>
        </Link>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/discover"
            className="text-verso-charcoal hover:text-verso-burgundy transition-colors text-sm no-underline"
          >
            Discover
          </Link>
          {user && (
            <>
              <Link
                href="/write"
                className="text-verso-charcoal hover:text-verso-burgundy transition-colors text-sm no-underline"
              >
                Compose
              </Link>
              <Link
                href="/library"
                className="text-verso-charcoal hover:text-verso-burgundy transition-colors text-sm no-underline"
              >
                Library
              </Link>
            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-full bg-verso-sage text-verso-cream flex items-center justify-center font-serif font-bold hover:bg-verso-burgundy transition-colors flex-shrink-0"
              >
                {(profile?.display_name?.[0] || profile?.username?.[0] || user.email?.[0] || 'U').toUpperCase()}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-verso-cream border border-verso-lightGray rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-verso-charcoal hover:bg-verso-fffdd0 transition-colors no-underline"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-verso-charcoal hover:bg-verso-fffdd0 transition-colors no-underline"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-verso-charcoal hover:bg-verso-dusty transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="verso-button-secondary text-sm">
                Sign In
              </Link>
              <Link href="/auth/signup" className="verso-button-primary text-sm">
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
