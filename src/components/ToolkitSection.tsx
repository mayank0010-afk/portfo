import { useState } from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';

type DepthFilter = 'all' | 'hands-on' | 'exploring';

export function ToolkitSection() {
  const [depthFilter, setDepthFilter] = useState<DepthFilter>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const visibleGroups = SKILL_GROUPS.map((group) => ({
    ...group,
    skills:
      depthFilter === 'all'
        ? group.skills
        : group.skills.filter((skill) => skill.depth === depthFilter),
  })).filter((group) => group.skills.length > 0);

  return (
    <section
      id="toolkit"
      className="relative scroll-mt-20 border-t border-white/10"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-28">
        {/* Header + Hands-on vs Exploring filter (no fake percentage bars) */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
              <span className="font-mono text-[#F59E0B]">03</span>
              <span aria-hidden="true" className="text-white/25">/</span>
              <span className="text-[#E4E4E7]">The Toolkit</span>
            </div>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl lg:text-[42px]">
              Engineering across disciplines.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
              Grouped by domain with clear distinction between hands-on project technologies and
              areas actively explored in coursework and experimentation.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter technologies by experience depth"
            className="inline-flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-[#09090E]/90 p-1"
          >
            {(
              [
                { id: 'all', label: 'All Technologies' },
                { id: 'hands-on', label: 'Hands-On Used' },
                { id: 'exploring', label: 'Explored & Applied' },
              ] as const
            ).map((tab) => {
              const active = depthFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setDepthFilter(tab.id)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F59E0B] cursor-pointer ${
                    active
                      ? 'bg-[#F59E0B] text-[#050507] font-semibold'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 3-column architectural skill grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map((group, idx) => (
            <div
              key={group.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#09090E]/90 p-6 transition-colors duration-200 hover:border-white/20"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-[#F59E0B] tabular-nums">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="text-[#71717A]">{group.level}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em] text-white">
                  {group.category}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA]">
                  {group.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/8 pt-4">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {group.skills.map((skill) => {
                    const isSelected = selectedSkill === skill.name;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() =>
                          setSelectedSkill((prev) => (prev === skill.name ? null : skill.name))
                        }
                        className={`min-h-[32px] text-left font-mono text-xs transition-colors duration-150 cursor-pointer ${
                          isSelected
                            ? 'text-[#FBBF24] underline decoration-[#F59E0B] underline-offset-4'
                            : skill.depth === 'hands-on'
                              ? 'text-[#F4F4F5] hover:text-[#FBBF24]'
                              : 'text-[#8A8A98] hover:text-[#E4E4E7]'
                        }`}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Legend Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-5 text-xs text-[#A1A1AA]">
          <div className="flex flex-wrap items-center gap-6">
            <span>
              <strong className="font-mono font-medium text-[#F4F4F5]">Bright White</strong> — Used
              hands-on in internships &amp; builds
            </span>
            <span>
              <strong className="font-mono font-medium text-[#8A8A98]">Muted Silver</strong> —
              Explored through coursework &amp; experiments
            </span>
          </div>
          {selectedSkill && (
            <span className="font-mono text-[#FBBF24]">
              Selected focus: {selectedSkill}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
