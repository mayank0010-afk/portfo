import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#beginning' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenResume }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050508]/92 no-print">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Single text element brand mark */}
        <a
          href="#beginning"
          className="font-[var(--font-display)] text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 transition-colors hover:text-[#FBBF24] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B]"
        >
          {PORTFOLIO_PROFILE.brandMark}
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-2 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[#F59E0B] after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action button + mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg border border-[#F59E0B]/45 bg-[#F59E0B]/12 px-4 py-2 text-sm font-medium text-[#FEF3C7] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#F59E0B] hover:bg-[#F59E0B] hover:text-[#050507] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] cursor-pointer"
          >
            Resume
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-white transition-colors duration-150 hover:bg-white/10 md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-[#07070B] px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#D4D4D8] transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
