import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

interface OpeningPortalProps {
  onEnter: () => void;
}

export function OpeningPortal({ onEnter }: OpeningPortalProps) {
  return (
    <section
      aria-label="Opening Screen — Enter the Universe"
      className="relative z-20 flex min-h-screen flex-col justify-between px-6 py-8 sm:px-10 sm:py-10"
    >
      {/* Top quiet monograph header — leaves central 3D black hole unobstructed */}
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.22em] text-[#A1A1AA] whitespace-nowrap">
          {PORTFOLIO_PROFILE.yearLabel}
        </span>
        <span className="hidden font-mono text-xs tracking-[0.18em] text-[#71717A] sm:inline whitespace-nowrap">
          {PORTFOLIO_PROFILE.coordinates}
        </span>
      </div>

      {/* Center spacer allowing the 3D black hole & glowing accretion disk to breathe */}
      <div className="pointer-events-none flex-1 min-h-[34vh]" />

      {/* Lower-third editorial typography lockup & dominant entry CTA */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
        <div className="max-w-xl">
          <h1 className="text-[clamp(3rem,7.2vw,5.75rem)] font-bold leading-[0.94] tracking-[-0.04em] text-white">
            {PORTFOLIO_PROFILE.brandMark}
          </h1>
          <p className="mt-4 text-xl font-medium tracking-[-0.015em] text-[#F4F4F5] sm:text-2xl">
            {PORTFOLIO_PROFILE.openingTagline}
          </p>
          <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
            {PORTFOLIO_PROFILE.openingSubline}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end shrink-0">
          <button
            type="button"
            onClick={onEnter}
            className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-xl border border-[#F59E0B]/60 bg-[#F59E0B] px-7 py-3.5 text-sm font-semibold tracking-[0.06em] text-[#050507] whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#FBBF24] hover:border-[#FDE68A] hover:shadow-[0_0_32px_rgba(245,158,11,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] cursor-pointer"
          >
            <span>ENTER THE UNIVERSE</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#71717A] whitespace-nowrap">
            {PORTFOLIO_PROFILE.positioning}
          </span>
        </div>
      </div>
    </section>
  );
}
