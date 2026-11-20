import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { INTERNSHIP_EXPERIENCES, PORTFOLIO_PROFILE } from '../data/portfolioData';

export function ExperienceSection() {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'resonate-ai': true,
    'dy-patil-innovation': true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 border-t border-white/10 bg-[#050508]/80"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-28">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
            <span className="font-mono text-[#F59E0B]">Experience</span>
            <span aria-hidden="true" className="text-white/25">/</span>
            <span className="text-[#E4E4E7]">Where Ideas Become Execution</span>
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl lg:text-[42px]">
            Building beyond the classroom.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A1A1AA]">
            Two software development internships with hands-on exposure to backend infrastructure,
            asynchronous AI workflow orchestration, and multi-platform application workflows.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative mt-14 space-y-8">
          {/* Continuous subtle vertical timeline rail on desktop */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-3 bottom-3 left-[15px] w-px bg-gradient-to-b from-[#F59E0B]/70 via-white/15 to-transparent"
          />

          {INTERNSHIP_EXPERIENCES.map((exp) => {
            const isExpanded = Boolean(expandedIds[exp.id]);
            return (
              <article
                key={exp.id}
                className="relative md:pl-12"
              >
                {/* Static geometric node on timeline rail (not pulsing) */}
                <div
                  aria-hidden="true"
                  className="hidden md:flex absolute top-7 left-0 h-8 w-8 items-center justify-center rounded-lg border border-[#F59E0B]/50 bg-[#08080D] font-mono text-xs font-medium text-[#F59E0B]"
                >
                  {exp.index}
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#09090F]/92 p-6 transition-colors duration-200 hover:border-white/20 lg:p-8">
                  {/* Top Header Row */}
                  <div className="flex flex-col justify-between gap-4 border-b border-white/8 pb-6 lg:flex-row lg:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-[#A1A1AA]">
                        <span className="text-[#F59E0B]">{exp.type}</span>
                        <span aria-hidden="true" className="text-white/25">·</span>
                        <span>{exp.area}</span>
                      </div>
                      <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-white sm:text-[26px]">
                        {exp.company}
                      </h3>
                      <p className="mt-1 text-base font-medium text-[#E4E4E7]">{exp.role}</p>
                    </div>

                    <div className="flex flex-col items-start gap-2 lg:items-end">
                      <span className="font-mono text-xs text-[#D4D4D8] tabular-nums">
                        {exp.period}
                      </span>
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => toggleExpand(exp.id)}
                        className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#E4E4E7] whitespace-nowrap shrink-0 transition-colors hover:border-[#F59E0B]/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Contributions' : 'Expand Contributions'}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Summary + Technology Stack (unboxed clean inline text) */}
                  <div className="mt-5">
                    <p className="max-w-[70ch] text-sm leading-relaxed text-[#D4D4D8] sm:text-[15px]">
                      {exp.summary}
                    </p>
                    <p className="mt-4 font-mono text-xs leading-relaxed text-[#A1A1AA]">
                      <span className="text-[#71717A]">Stack: </span>
                      {exp.technologies.join(' · ')}
                    </p>
                  </div>

                  {/* Expandable Detailed Breakdown */}
                  {isExpanded && (
                    <div className="mt-6 space-y-6 border-t border-white/8 pt-6">
                      {/* Featured Contribution Highlight */}
                      <div className="rounded-xl border border-[#F59E0B]/25 bg-[#F59E0B]/[0.04] p-5">
                        <p className="font-mono text-xs text-[#F59E0B]">
                          Featured Contribution · {exp.featuredContributionTitle}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[#E4E4E7]">
                          {exp.featuredContributionText}
                        </p>
                      </div>

                      {/* Key Contributions List */}
                      <div>
                        <h4 className="text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
                          Key Responsibilities &amp; Engineering Work
                        </h4>
                        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#D4D4D8]">
                          {exp.contributions.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#F59E0B]"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Platform Overview & Honest Scope Context */}
                      <div className="grid grid-cols-1 gap-4 border-t border-white/8 pt-5 lg:grid-cols-12">
                        <div className="lg:col-span-8">
                          <p className="text-xs leading-relaxed text-[#A1A1AA]">
                            <span className="font-medium text-[#E4E4E7]">Case Overview: </span>
                            {exp.caseStudySummary}
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-[#71717A]">
                            {exp.scopeTransparencyNote}
                          </p>
                        </div>

                        <div className="flex items-end lg:col-span-4 lg:justify-end">
                          <a
                            href={PORTFOLIO_PROFILE.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium text-[#FBBF24] underline decoration-[#F59E0B]/40 underline-offset-4 transition-colors hover:text-[#FDE68A]"
                          >
                            <span>GitHub Profile</span>
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
