'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Screening', href: '/screening' },
  { name: 'About Us', href: '/about' },
  { name: 'VR Therapy', href: '/vr-therapy' },
  { name: 'IoT Analysis', href: '/iot-analysis' },
  { name: 'Pricing', href: '/pricing' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-black/20 backdrop-blur-sm lg:hidden"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-xl text-white py-4 px-6 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-gray-900/90 backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 pl-12 lg:pl-0">
              <Link href="/" className="text-white text-2xl font-['Dancing_Script']">
                PsyAI
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-purple-500/20 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
} 