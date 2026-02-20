'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useState, useEffect, useCallback, useRef, 
} from 'react';
import { useRouter } from 'next/router';

import covipelLogo from '../public/images/covipel_logo.svg';

const navLinks = [
  { label: 'Working Groups', href: '#working-groups' },
  { label: 'About', href: '#about' },
  { label: 'Insights', href: '/insights', isRoute: true },
  { label: 'Research', href: '#research' },
];

const searchItems = [
  { label: 'Working Groups', href: '#working-groups', category: 'Sections' },
  { label: 'About Us', href: '#about', category: 'Sections' },
  { label: 'Research', href: '#research', category: 'Sections' },
  { label: 'Events', href: '#events', category: 'Sections' },
  { label: 'Blog', href: '#blog', category: 'Sections' },
  { label: 'FAQ', href: '#faq', category: 'Sections' },
  {
    label: 'Insights', href: '/insights', category: 'Pages', isRoute: true, 
  },
  {
    label: 'GitHub - Open Source', href: 'https://github.com/CoViPeL', category: 'Community', external: true, 
  },
  {
    label: 'Slack Community', href: 'https://slack.covipel.dev', category: 'Community', external: true, 
  },
  {
    label: 'Hugging Face', href: 'https://hf.covipel.dev', category: 'Community', external: true, 
  },
  { label: 'Privacy Policy', href: '#privacy', category: 'Legal' },
  { label: 'Policies', href: '#policies', category: 'Legal' },
];

const Header = ({
  siteSettings, showHomeLink = false, showSignup = false, children,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);
  const router = useRouter();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 80);
    }
    if (!searchOpen) {
      setSearchQuery('');
      setActiveIndex(0);
    }
  }, [searchOpen]);

  // Ctrl+K to open, Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = searchQuery.trim()
    ? searchItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase())
      || item.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchItems;

  useEffect(() => { setActiveIndex(0); }, [searchQuery]);

  const navigateTo = (item) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else if (item.isRoute) {
      router.push(item.href);
    } else {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.location.hash = item.href;
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter' && filteredItems.length > 0) {
      e.preventDefault();
      navigateTo(filteredItems[activeIndex]);
    }
  };

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  let flatIndex = 0;

  return (
    <>
      <style jsx>{`
        .header-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          border-bottom: 1px solid transparent;
        }
        .header-wrap.scrolled {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          box-shadow: 0 1px 24px rgba(0, 0, 0, 0.06);
          border-bottom-color: rgba(0, 0, 0, 0.06);
        }
        .header-wrap:not(.scrolled) {
          background: rgba(255, 255, 255, 0.98);
        }
        .header-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          gap: 16px;
        }

        /* Logo */
        .logo-link {
          display: flex; align-items: center;
          position: relative; z-index: 1010; flex-shrink: 0;
        }
        .logo-img { width: 120px; transition: opacity 0.2s ease; }
        .logo-link:hover .logo-img { opacity: 0.75; }

        /* Desktop nav */
        .desktop-nav { display: none; }
        @media (min-width: 768px) {
          .desktop-nav { display: flex; align-items: center; gap: 6px; }
        }
        .nav-pill {
          position: relative;
          padding: 7px 16px; font-size: 0.8rem; font-weight: 500;
          color: #333; border-radius: 9999px;
          transition: color 0.2s ease, background 0.2s ease;
          text-decoration: none; letter-spacing: 0.01em; white-space: nowrap;
        }
        .nav-pill:hover { color: #000; background: rgba(204, 235, 212, 0.35); }
        .nav-pill::after {
          content: ''; position: absolute; bottom: 2px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px; height: 2px; border-radius: 1px; background: #CCEBD4;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-pill:hover::after { transform: translateX(-50%) scaleX(1); }

        /* Right actions */
        .header-actions {
          display: flex; align-items: center; gap: 10px;
          position: relative; z-index: 1010; flex-shrink: 0;
        }

        /* Get involved */
        .get-involved-btn {
          display: none;
          padding: 8px 22px; font-size: 0.78rem; font-weight: 600;
          color: #000; background: #CCEBD4; border-radius: 9999px;
          border: none; cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.01em; box-shadow: 0 1px 4px rgba(204, 235, 212, 0.3);
        }
        @media (min-width: 768px) {
          .get-involved-btn { display: inline-flex; align-items: center; }
        }
        .get-involved-btn:hover {
          background: #b8e0c3; box-shadow: 0 4px 16px rgba(204, 235, 212, 0.45);
          transform: translateY(-1px);
        }
        .get-involved-btn:active { transform: translateY(0); }

        /* Search circle button */
        .search-circle-wrap { position: relative; }
        .search-circle-btn {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 50%;
          border: none; background: #bbb; color: #fff;
          cursor: pointer; padding: 0;
          transition: background 0.2s ease;
        }
        .search-circle-btn:hover { background: #aaa; }

        /* Search dropdown */
        .search-dropdown {
          position: fixed;
          top: 70px; left: 12px; right: 12px;
          width: auto;
          background: #fff; border-radius: 14px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.04);
          opacity: 0; pointer-events: none;
          transform: translateY(6px);
          transition: opacity 0.18s ease, transform 0.18s ease;
          overflow: hidden; z-index: 2000;
        }
        @media (min-width: 768px) {
          .search-dropdown {
            position: absolute;
            top: calc(100% + 10px); right: 0;
            left: auto;
            width: 320px;
          }
        }
        .search-dropdown.open {
          opacity: 1; pointer-events: auto; transform: translateY(0);
        }
        .search-input-row {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px;
          border-bottom: 1px solid #f0f0f0;
          color: #999;
        }
        .search-input-row input {
          flex: 1; border: none; outline: none;
          font-size: 0.85rem; color: #111; background: transparent;
          font-family: inherit;
        }
        .search-input-row input::placeholder { color: #bbb; }
        .search-dropdown-inner {
          max-height: 300px; overflow-y: auto; padding: 6px;
        }
        .search-dropdown-inner::-webkit-scrollbar { width: 3px; }
        .search-dropdown-inner::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
        .search-category {
          font-size: 0.62rem; font-weight: 600; color: #999;
          text-transform: uppercase; letter-spacing: 0.06em;
          padding: 8px 10px 3px;
        }
        .search-item {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: 8px; cursor: pointer;
          transition: background 0.12s ease;
          text-decoration: none; color: #333; font-size: 0.8rem;
        }
        .search-item:hover, .search-item.active {
          background: rgba(204, 235, 212, 0.35);
        }
        .search-item-icon {
          display: flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; border-radius: 6px;
          background: #f3f3f3; color: #888; flex-shrink: 0;
        }
        .search-item.active .search-item-icon { background: #CCEBD4; color: #333; }
        .search-item-label {
          flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .search-item-ext { font-size: 0.65rem; color: #bbb; }
        .search-empty {
          padding: 24px 12px; text-align: center; color: #999; font-size: 0.8rem;
        }

        /* Hamburger */
        .hamburger {
          display: flex; flex-direction: column; justify-content: center;
          align-items: center; width: 36px; height: 36px;
          border: none; background: transparent; cursor: pointer;
          gap: 5px; padding: 0;
        }
        @media (min-width: 768px) { .hamburger { display: none; } }
        .hamburger span {
          display: block; width: 17px; height: 1.5px;
          background: #333; border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }
        .hamburger.active span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.active span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile overlay */
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 8px;
          opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
        }
        .mobile-overlay.open { opacity: 1; pointer-events: auto; }
        .mobile-nav-link {
          font-size: 1.25rem; font-weight: 600; color: #111;
          padding: 14px 32px; border-radius: 12px;
          text-decoration: none; transition: all 0.2s ease; text-align: center;
        }
        .mobile-nav-link:hover { background: rgba(204,235,212,0.3); color: #000; }
        .mobile-cta {
          margin-top: 16px; padding: 14px 40px;
          font-size: 1rem; font-weight: 600; color: #000;
          background: #CCEBD4; border-radius: 9999px; border: none;
          cursor: pointer; transition: all 0.25s ease;
          box-shadow: 0 2px 12px rgba(204,235,212,0.35);
        }
        .mobile-cta:hover { background: #b8e0c3; }

        .header-spacer { height: 64px; }
      `}
      </style>

      <header className={`header-wrap${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          {/* Logo */}
          <Link href="/" passHref>
            <a className="logo-link" aria-label="Home">
              <div className="logo-img">
                <Image src={covipelLogo} alt={`${siteSettings.name} Logo`} />
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map((link) => {
              if (link.isRoute) {
                return (
                  <Link key={link.href} href={link.href} passHref>
                    <a className="nav-pill">{link.label}</a>
                  </Link>
                );
              }
              return (
                <a key={link.href} href={link.href} className="nav-pill">
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right actions: Get Involved + Search circle */}
          <div className="header-actions">
            <button className="get-involved-btn" id="header-get-involved">
              Get Involved
            </button>

            <div className="search-circle-wrap" ref={searchWrapRef}>
              <button
                className="search-circle-btn"
                aria-label="Search"
                id="header-search"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              <div className={`search-dropdown${searchOpen ? ' open' : ''}`}>
                <div className="search-input-row">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    id="header-search-input"
                  />
                </div>
                <div className="search-dropdown-inner">
                  {filteredItems.length === 0 ? (
                    <div className="search-empty">
                      No results for &ldquo;{searchQuery}&rdquo;
                    </div>
                  ) : (
                    Object.entries(groupedItems).map(([category, items]) => (
                      <div key={category}>
                        <div className="search-category">{category}</div>
                        {items.map((item) => {
                          const idx = flatIndex;
                          flatIndex += 1;
                          return (
                            <div
                              key={item.href}
                              className={`search-item${idx === activeIndex ? ' active' : ''}`}
                              onClick={() => navigateTo(item)}
                              onMouseEnter={() => setActiveIndex(idx)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  navigateTo(item);
                                }
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <div className="search-item-icon">
                                {item.external ? (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                  </svg>
                                ) : (
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                  </svg>
                                )}
                              </div>
                              <span className="search-item-label">{item.label}</span>
                              {item.external && <span className="search-item-ext">↗</span>}
                            </div>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`hamburger${mobileOpen ? ' active' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="header-hamburger"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        {children}
      </header>

      {/* Mobile navigation overlay */}
      <div className={`mobile-overlay${mobileOpen ? ' open' : ''}`}>
        {navLinks.map((link) => {
          if (link.isRoute) {
            return (
              <Link key={link.href} href={link.href} passHref>
                <a
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setMobileOpen(false);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {link.label}
                </a>
              </Link>
            );
          }
          return (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setMobileOpen(false);
              }}
              role="button"
              tabIndex={0}
            >
              {link.label}
            </a>
          );
        })}
        <button className="mobile-cta" onClick={() => setMobileOpen(false)}>
          Get Involved
        </button>
      </div>

      <div className="header-spacer" />
    </>
  );
};

export default Header;
