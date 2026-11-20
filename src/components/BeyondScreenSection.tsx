import { PERSONAL_FACETS, PORTFOLIO_PROFILE } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

export function BeyondScreenSection() {
  return (
    <section
      id="person"
      className="relative scroll-mt-20 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Faceless 3D Character Visual Anchor (No personal photograph) */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#030305]">
              <ResilientImage
                src={PORTFOLIO_PROFILE.facelessCharacterImage}
                alt={PORTFOLIO_PROFILE.facelessCharacterAlt}
                fallbackTitle="Faceless 3D Visual Identity"
                containerClassName="h-full w-full"
                className="h-full w-full object-cover object-top"
              />
              {/* Measured bottom scrim for crisp caption legibility */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030305] via-[#030305]/70 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 text-xs">
                <span className="font-mono tracking-[0.12em] text-[#E4E4E7]">
                  Visual Identity · Faceless 3D Form
                </span>
                <span className="font-mono text-[#F59E0B]">06</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Personality & Interests */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
                <span className="font-mono text-[#F59E0B]">06</span>
                <span aria-hidden="true" className="text-white/25">/</span>
                <span className="text-[#E4E4E7]">Beyond the Screen</span>
                <span aria-hidden="true" className="text-white/25">·</span>
                <span className="text-[#A1A1AA]">Curiosity Drives Creation</span>
              </div>

              <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl lg:text-[42px]">
                More than just code.
              </h2>

              <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-[#A1A1AA]">
                The way I approach engineering is shaped by everything outside the terminal —
                competitive strategy, physical discipline, visual storytelling, and an enduring
                drive to figure out how systems tick.
              </p>
            </div>

            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {PERSONAL_FACETS.map((facet) => (
                <div
                  key={facet.index}
                  className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-6"
                >
                  <div className="flex items-baseline gap-3 sm:col-span-5">
                    <span className="font-mono text-xs text-[#F59E0B] tabular-nums">
                      {facet.index}.
                    </span>
                    <h3 className="text-sm font-semibold text-white">{facet.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#A1A1AA] sm:col-span-7">
                    {facet.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
