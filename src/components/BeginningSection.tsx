import { ArrowDown, ArrowRight, FileText } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolioData';

interface BeginningSectionProps {
  onOpenResume: () => void;
}

export function BeginningSection({ onOpenResume }: BeginningSectionProps) {
  return (
    <section
      id="beginning"
      className="relative mx-auto max-w-[1200px] px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28"
    >
      {/* Top Meta Row: Editorial Section Identifier Left, Coordinates Right */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
          <span className="font-mono text-[#F59E0B]">01</span>
          <span aria-hidden="true" className="text-white/25">/</span>
          <span className="text-[#E4E4E7]">The Beginning</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-[#A1A1AA] tabular-nums">
          <span>{PORTFOLIO_PROFILE.locationLabel}</span>
          <span aria-hidden="true" className="text-white/25">·</span>
          <span>{PORTFOLIO_PROFILE.coordinates}</span>
        </div>
      </div>

      {/* Main Intro Content Grid */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
        {/* Controlled Narrative Column */}
        <div className="lg:col-span-8">
          <p className="text-xs font-medium tracking-[0.18em] text-[#F59E0B] sm:text-sm">
            {PORTFOLIO_PROFILE.positioning}
          </p>

          <h1 className="mt-5 max-w-2xl text-balance text-[clamp(2.5rem,5.2vw,4.35rem)] font-bold leading-[1.03] tracking-[-0.03em] text-white">
            {PORTFOLIO_PROFILE.centralHeadline}
          </h1>

          <div className="mt-8 max-w-[58ch] space-y-4 text-base leading-[1.72] tracking-[0.008em] text-[#D4D4D8] sm:text-[17px]">
            <p>{PORTFOLIO_PROFILE.introParagraphOne}</p>
            <p className="text-[#A1A1AA]">{PORTFOLIO_PROFILE.introParagraphTwo}</p>
            <p className="text-sm text-[#E4E4E7]">{PORTFOLIO_PROFILE.introFocusLine}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#work"
              className="inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-[#050507] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#FBBF24] hover:shadow-[0_0_24px_rgba(245,158,11,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
            >
              <span>Explore My Work</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href="#experience"
              className="inline-flex min-h-[46px] items-center justify-center rounded-xl border border-white/15 bg-[#0A0A0F]/85 px-5 py-3 text-sm font-medium text-[#F4F4F5] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#F59E0B]/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
            >
              View Internships
            </a>

            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex min-h-[46px] items-center gap-2 px-2 py-2 text-sm font-medium text-[#A1A1AA] whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] cursor-pointer"
            >
              <FileText className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
              <span className="underline decoration-white/25 underline-offset-4 hover:decoration-[#F59E0B]">
                Resume Summary
              </span>
            </button>
          </div>
        </div>

        {/* Right Side: Compact Engineering Positioning Facts */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-white/10 bg-[#08080C]/88 p-6">
            <p className="text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
              Recruiter Snapshot
            </p>
            <dl className="mt-5 space-y-4 divide-y divide-white/8 text-sm">
              <div className="pt-0">
                <dt className="text-xs text-[#71717A]">Focus Areas</dt>
                <dd className="mt-1 font-medium text-[#F4F4F5]">
                  Backend Systems · AI Workflows · IoT
                </dd>
              </div>
              <div className="pt-4">
                <dt className="text-xs text-[#71717A]">Industry Experience</dt>
                <dd className="mt-1 font-medium text-[#F4F4F5]">
                  2 Software Engineering Internships
                </dd>
              </div>
              <div className="pt-4">
                <dt className="text-xs text-[#71717A]">Education</dt>
                <dd className="mt-1 font-medium text-[#F4F4F5]">
                  B.Tech CSE (AI &amp; Data Science) · Class of 2027
                </dd>
              </div>
              <div className="pt-4">
                <dt className="text-xs text-[#71717A]">Direct Contact</dt>
                <dd className="mt-1 font-mono text-xs text-[#FBBF24]">
                  <a
                    href={`mailto:${PORTFOLIO_PROFILE.email}`}
                    className="hover:underline underline-offset-4"
                  >
                    {PORTFOLIO_PROFILE.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="mt-16 flex items-center justify-between border-t border-white/8 pt-6 text-xs text-[#71717A]">
        <a
          href="#work"
          className="inline-flex items-center gap-2 font-mono tracking-[0.12em] text-[#A1A1AA] transition-colors hover:text-[#F59E0B]"
        >
          <ArrowDown className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
          <span>Scroll to explore selected systems</span>
        </a>
        <span className="hidden font-mono sm:inline">6 Projects · 2 Internships · 9 Skill Domains</span>
      </div>
    </section>
  );
}
