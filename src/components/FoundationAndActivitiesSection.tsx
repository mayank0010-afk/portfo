import { useState } from 'react';
import { ACTIVITIES_AND_HACKATHONS, EDUCATION_TIMELINE } from '../data/portfolioData';

type ActivityFilter = 'All' | 'Hackathons' | 'Training & Volunteering';

export function FoundationAndActivitiesSection() {
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>('All');

  const visibleActivities = ACTIVITIES_AND_HACKATHONS.filter((item) => {
    if (activityFilter === 'All') return true;
    if (activityFilter === 'Hackathons') return item.category === 'Hackathons';
    return item.category === 'Training' || item.category === 'Volunteering';
  });

  return (
    <div className="relative border-t border-white/10 bg-[#040407]/85">
      {/* 04 / THE FOUNDATION — Education */}
      <section
        id="foundation"
        className="mx-auto max-w-[1200px] scroll-mt-20 px-6 py-20 lg:px-8 lg:py-24"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
              <span className="font-mono text-[#F59E0B]">04</span>
              <span aria-hidden="true" className="text-white/25">/</span>
              <span className="text-[#E4E4E7]">The Foundation</span>
            </div>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl">
              Built on curiosity.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
              Academic grounding in Computer Science, Artificial Intelligence, and Data Science.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {EDUCATION_TIMELINE.map((edu, index) => (
                <div
                  key={edu.id}
                  className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-12 sm:items-start"
                >
                  <div className="sm:col-span-4">
                    <p className="font-mono text-xs text-[#F59E0B] tabular-nums">{edu.period}</p>
                    <p className="mt-1 font-mono text-[11px] text-[#71717A]">
                      {index === 0 ? 'Undergraduate Degree' : 'Pre-University'}
                    </p>
                  </div>

                  <div className="sm:col-span-8">
                    <h3 className="text-xl font-semibold tracking-[-0.015em] text-white">
                      {edu.institution}
                    </h3>
                    {edu.parentInstitution && (
                      <p className="mt-0.5 text-sm text-[#A1A1AA]">{edu.parentInstitution}</p>
                    )}
                    <p className="mt-2 text-sm font-medium text-[#E4E4E7]">{edu.credential}</p>
                    {edu.specialization && (
                      <p className="mt-1 text-sm text-[#FBBF24]">{edu.specialization}</p>
                    )}
                    <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1AA]">
                      {edu.highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 / BEYOND THE CLASSROOM — Hackathons, Training & Activities */}
      <section
        id="activities"
        className="mx-auto max-w-[1200px] scroll-mt-20 border-t border-white/10 px-6 py-20 lg:px-8 lg:py-24"
      >
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
              <span className="font-mono text-[#F59E0B]">05</span>
              <span aria-hidden="true" className="text-white/25">/</span>
              <span className="text-[#E4E4E7]">Beyond the Classroom</span>
            </div>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl">
              Learning by building.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
              Hackathons, technical challenges, structured employability training, and community
              teaching — each represented accurately by role and scope.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter activities by category"
            className="inline-flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-[#09090E]/90 p-1"
          >
            {(['All', 'Hackathons', 'Training & Volunteering'] as const).map((tab) => {
              const active = activityFilter === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setActivityFilter(tab)}
                  className={`min-h-[38px] rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F59E0B] cursor-pointer ${
                    active
                      ? 'bg-[#F59E0B] text-[#050507] font-semibold'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleActivities.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#09090F]/92 p-5 transition-colors duration-200 hover:border-[#F59E0B]/40"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-[#F59E0B]">{item.category}</span>
                  <span className="font-mono text-[#71717A] tabular-nums">{item.year}</span>
                </div>

                <h3 className="mt-3 text-base font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-[#A1A1AA]">{item.organization}</p>
              </div>

              <p className="mt-4 border-t border-white/8 pt-3.5 text-xs leading-relaxed text-[#A1A1AA]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
