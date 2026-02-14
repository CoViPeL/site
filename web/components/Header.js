'use client';

import Image from 'next/image';
import Link from 'next/link';

import covipelLogo from '../public/images/covipel_logo.svg';

const Header = ({
  siteSettings, showHomeLink = false, showSignup = false, children,
}) => {


  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="w-32">
          <Link href="/">
            <a>
              <Image src={covipelLogo} alt={`${siteSettings.name} Logo`} />
            </a>
          </Link>
        </div>

        {/* Navigation Menu - Centered */}
        <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-8 text-sm font-medium">

          <a href="#working-groups" className="text-black hover:text-primary transition">Working Groups</a>

          <a href="#about" className="text-black hover:text-primary transition">About</a>
          
          <a href="/insights" className="text-black hover:text-primary transition">Insights</a>
        </nav>

        {/* Right Side - Get Involved & Search */}
        <div className="flex items-center space-x-4 ml-auto">
          <button className="hidden md:inline-block px-6 py-2 bg-primary text-black rounded-full font-medium hover:opacity-80 transition">
            Get Involved
          </button>
          <button className="p-2 text-black hover:text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
