'use client';

import Image from 'next/image';
import { useState } from 'react';
import covipelLogoGreen from '../public/images/covipel_logo_green.svg';

const fallbackPrivacyUrl = 'https://github.com/CoViPeL/covipel/blob/main/PRIVACY.md';

const Footer = ({ siteSettings }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-6">
          <div>
            <div className="w-32 mb-3">
              <Image src={covipelLogoGreen} alt={`${siteSettings.name} Logo`} />
            </div>
            <p className="text-sm font-semibold mb-2">Better AI for Everyone</p>
            <p className="text-xs text-dark-gray mb-3">
              © 2026 CoViPeL. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Stay Updated</h3>
            <p className="text-dark-gray text-xs mb-4">
              Get the latest CoViPeL updates delivered fresh to your inbox
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg text-black text-xs focus:outline-none"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-black font-medium rounded-full hover:opacity-80 transition text-xs"
              >
                Submit
              </button>
            </form>

            <p className="text-xs text-dark-gray">
              By submitting this form you agree to our
              {' '}
              <a href={siteSettings.privacyPolicy || fallbackPrivacyUrl} target="_blank" rel="noreferrer" className="underline hover:text-white">Privacy Policy</a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 my-3" />

        <p className="text-sm text-dark-gray mb-3">
          CoViPeL was created in order to make interactive computing more
          accessible, powerful, and transformational for research and education.
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-6 text-xs">
            <a href={siteSettings.privacyPolicy || fallbackPrivacyUrl} target="_blank" rel="noreferrer" className="text-dark-gray hover:text-white underline">
              Privacy Policy
            </a>
            <a href="#policies" className="text-dark-gray hover:text-white underline">
              Policies
            </a>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/CoViPeL" title="GitHub" className="text-dark-gray hover:text-white transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://slack.covipel.dev" title="Slack" className="text-dark-gray hover:text-white transition">
              <svg width="20" height="20" viewBox="0 0 127 127" fill="currentColor">
                <path d="M27.2 80c0 7.5-6.1 13.6-13.6 13.6C6.1 93.6 0 87.5 0 80c0-7.5 6.1-13.6 13.6-13.6h13.6V80zm6.8 0c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6v34c0 7.5-6.1 13.6-13.6 13.6-7.5 0-13.6-6.1-13.6-13.6V80z" />
                <path d="M47 27.2c-7.5 0-13.6-6.1-13.6-13.6C33.4 6.1 39.5 0 47 0c7.5 0 13.6 6.1 13.6 13.6v13.6H47zm0 6.8c7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6H13c-7.5 0-13.6-6.1-13.6-13.6 0-7.5 6.1-13.6 13.6-13.6H47z" />
                <path d="M99.8 47c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6H99.8V47zm-6.8 0c0 7.5-6.1 13.6-13.6 13.6-7.5 0-13.6-6.1-13.6-13.6V13c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6v34z" />
                <path d="M80 99.8c7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6-7.5 0-13.6-6.1-13.6-13.6V99.8H80zm0-6.8c-7.5 0-13.6-6.1-13.6-13.6 0-7.5 6.1-13.6 13.6-13.6h34c7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6H80z" />
              </svg>
            </a>
            <a href="https://hf.covipel.dev" title="Hugging Face" className="text-dark-gray hover:text-white transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
