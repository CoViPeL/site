'use client';

import Image from 'next/image';
import { useState } from 'react';
import covipelLogoGreen from '../public/images/covipel_logo_green.svg';



const Footer = ({ siteSettings }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };



  return (
    <>
      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .footer-gradient-bar {
          height: 2px;
          background: linear-gradient(90deg, #CCEBD4, #2088EF, #D383FF, #CCEBD4);
          background-size: 300% 100%;
          animation: gradientMove 6s ease infinite;
        }
        .newsletter-card {
          padding: 0;
        }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          color: #848484;
        }
        .footer-link {
          color: #848484;
          transition: color 0.2s ease;
          font-size: 0.75rem;
        }
        .footer-link:hover {
          color: #CCEBD4;
        }
        .email-input {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px 12px;
          color: #fff;
          transition: all 0.3s ease;
          outline: none;
          flex: 1;
          min-width: 0;
        }
        .email-input::placeholder { color: #666; }
        .email-input:focus {
          border-color: rgba(204, 235, 212, 0.4);
          box-shadow: 0 0 0 2px rgba(204, 235, 212, 0.08);
        }
        .submit-btn {
          background: #CCEBD4;
          color: #000;
          font-weight: 600;
          border-radius: 9999px;
          padding: 8px 22px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          letter-spacing: 0.01em;
          border: none;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(204, 235, 212, 0.3);
        }
        .submit-btn:hover {
          background: #b8e0c3;
          box-shadow: 0 4px 16px rgba(204, 235, 212, 0.45);
          transform: translateY(-1px);
        }
        .submit-btn:active {
          transform: translateY(0);
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

      `}</style>

      {/* Animated gradient accent */}
      <div className="footer-gradient-bar" />

      <footer className="w-full bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 md:py-6">

          {/* ─── Mobile: stacked layout | Desktop: 4-col grid ─── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8 items-start">

            {/* Brand — full width on mobile */}
            <div className="flex flex-col gap-1">
              <div className="w-28 mb-1">
                <Image src={covipelLogoGreen} alt={`${siteSettings.name} Logo`} />
              </div>
              <p className="text-sm font-semibold" style={{ color: '#CCEBD4' }}>
                Advancing Vision & Perception
              </p>
              <p className="text-xs" style={{ color: '#848484' }}>
                Making interactive computing more accessible and transformational.
              </p>
            </div>

            {/* Quick Links + Community — side by side on mobile, separate cols on desktop */}
            <div className="grid grid-cols-2 md:contents gap-6">
              <div>
                <h4 className="text-xs font-semibold mb-3" style={{ color: '#fff' }}>Quick Links</h4>
                <ul className="flex flex-col gap-2">
                  <li><a href="#working-groups" className="footer-link">Working Groups</a></li>
                  <li><a href="#about" className="footer-link">About Us</a></li>
                  <li><a href="/insights" className="footer-link">Insights</a></li>
                  <li><a href="#research" className="footer-link">Research</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold mb-3" style={{ color: '#fff' }}>Community</h4>
                <ul className="flex flex-col gap-2">
                  <li><a href="https://github.com/CoViPeL" target="_blank" rel="noreferrer" className="footer-link">Open Source</a></li>
                  <li><a href="https://slack.covipel.dev" target="_blank" rel="noreferrer" className="footer-link">Join Slack</a></li>
                  <li><a href="#events" className="footer-link">Events</a></li>
                  <li><a href="#blog" className="footer-link">Blog</a></li>
                  <li><a href="#faq" className="footer-link">FAQ</a></li>
                </ul>
              </div>
            </div>

            {/* Newsletter — full width on mobile */}
            <div className="newsletter-card">
              <h4 className="text-xs font-semibold mb-2" style={{ color: '#fff' }}>
                Stay Updated
              </h4>
              <p className="text-xs mb-2" style={{ color: '#848484' }}>
                Latest updates to your inbox
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input text-xs w-full"
                  required
                  aria-label="Email address"
                  id="footer-email-input"
                />
                <button type="submit" className="submit-btn text-xs w-full" id="footer-submit-btn">
                  {submitted ? 'Done!' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          {/* ─── Separator ─── */}
          <div className="divider my-5" />

          {/* ─── Bottom bar ─── */}
          <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
            {/* Copyright + links */}
            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-x-5">
              <p className="text-xs" style={{ color: '#555' }}>
                © 2026 CoViPeL. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#privacy" className="footer-link underline">Privacy Policy</a>
                <a href="#policies" className="footer-link underline">Policies</a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <a href="https://github.com/CoViPeL" title="GitHub" className="social-icon" aria-label="GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://slack.covipel.dev" title="Slack" className="social-icon" aria-label="Slack">
                <svg width="15" height="15" viewBox="0 0 127 127" fill="currentColor">
                  <path d="M27.2 80c0 7.5-6.1 13.6-13.6 13.6C6.1 93.6 0 87.5 0 80c0-7.5 6.1-13.6 13.6-13.6h13.6V80zm6.8 0c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6v34c0 7.5-6.1 13.6-13.6 13.6-7.5 0-13.6-6.1-13.6-13.6V80z" />
                  <path d="M47 27.2c-7.5 0-13.6-6.1-13.6-13.6C33.4 6.1 39.5 0 47 0c7.5 0 13.6 6.1 13.6 13.6v13.6H47zm0 6.8c7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6H13c-7.5 0-13.6-6.1-13.6-13.6 0-7.5 6.1-13.6 13.6-13.6H47z" />
                  <path d="M99.8 47c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6H99.8V47zm-6.8 0c0 7.5-6.1 13.6-13.6 13.6-7.5 0-13.6-6.1-13.6-13.6V13c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6v34z" />
                  <path d="M80 99.8c7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6-7.5 0-13.6-6.1-13.6-13.6V99.8H80zm0-6.8c-7.5 0-13.6-6.1-13.6-13.6 0-7.5 6.1-13.6 13.6-13.6h34c7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6H80z" />
                </svg>
              </a>
              <a href="https://hf.covipel.dev" title="Hugging Face" className="social-icon" aria-label="Hugging Face">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>


    </>
  );
};

export default Footer;
