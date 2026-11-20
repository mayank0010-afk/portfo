import { useState } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import {
  SELECTED_PROJECTS,
  type ProjectCaseStudy,
  type ProjectFilterCategory,
} from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface WorkSectionProps {
  onSelectProject: (project: ProjectCaseStudy) => void;
}

const FILTER_TABS: ProjectFilterCategory[] = [
  'All Projects',
  'Backend & AI',
  'IoT & Embedded',
  'ML & Emerging',
];

const MARQUEE_PHRASES = [
  'Selected Work',
  'Backend Infrastructure',
  'AI Workflow Orchestration',
  'IoT & Embedded Systems',
  'Signal Processing',
  'Applied Engineering',
];

export function WorkSection({ onSelectProject }: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterCategory>('All Projects');

  const filteredProjects =
    activeFilter === 'All Projects'
      ? SELECTED_PROJECTS
      : SELECTED_PROJECTS.filter((project) => project.filterGroup === activeFilter);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const additionalProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative scroll-mt-20">
      {/* Subtle Cosmic Editorial Marquee Divider */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-y border-white/10 bg-[#06060A]/90 py-3.5 select-none"
      >
        <div className="marquee-track flex items-center gap-8 font-mono text-xs tracking-[0.16em] text-[#71717A]">
          {[0, 1].map((loopIndex) => (
            <div key={loopIndex} className="flex items-center gap-8 pr-8">
              {MARQUEE_PHRASES.map((phrase) => (
                <span
                  key={`${loopIndex}-${phrase}`}
                  className="flex items-center gap-8 whitespace-nowrap"
                >
                  <span>{phrase}</span>
                  <span className="text-[#F59E0B]/60">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-8 lg:py-28">
        {/* Section Header + Interactive Filter Controls */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
              <span className="font-mono text-[#F59E0B]">02</span>
              <span aria-hidden="true" className="text-white/25">/</span>
              <span className="text-[#E4E4E7]">Selected Work</span>
              <span aria-hidden="true" className="text-white/25">·</span>
              <span className="text-[#A1A1AA]">Thought Made Tangible</span>
            </div>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl lg:text-[44px]">
              Systems with a purpose.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by engineering area"
            className="inline-flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-[#09090E]/90 p-1"
          >
            {FILTER_TABS.map((tab) => {
              const active = activeFilter === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setActiveFilter(tab)}
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

        {/* Featured Primary Projects (with bespoke dark editorial visuals) */}
        {featuredProjects.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {featuredProjects.map((project, idx) => {
              const isLead = activeFilter === 'All Projects' && idx === 0;
              const spanClass =
                activeFilter === 'All Projects'
                  ? isLead
                    ? 'lg:col-span-12'
                    : 'lg:col-span-6'
                  : featuredProjects.length === 1
                    ? 'lg:col-span-12'
                    : 'lg:col-span-6';

              return (
                <article
                  key={project.id}
                  className={`group overflow-hidden rounded-2xl border border-white/10 bg-[#09090E]/90 transition-all duration-200 hover:border-[#F59E0B]/50 hover:shadow-[0_12px_40px_rgba(245,158,11,0.08)] ${spanClass}`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className={`flex h-full w-full flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F59E0B] cursor-pointer ${
                      isLead ? 'lg:grid lg:grid-cols-12 lg:items-stretch' : ''
                    }`}
                  >
                    {/* Visual Frame */}
                    <div
                      className={`overflow-hidden border-b border-white/8 ${
                        isLead
                          ? 'aspect-[16/9] lg:col-span-7 lg:aspect-auto lg:border-r lg:border-b-0'
                          : 'aspect-[16/9]'
                      }`}
                    >
                      {project.image && (
                        <ResilientImage
                          src={project.image}
                          alt={project.imageAlt || project.title}
                          fallbackTitle={project.title}
                          containerClassName="h-full w-full"
                          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        />
                      )}
                    </div>

                    {/* Text Body */}
                    <div
                      className={`flex flex-1 flex-col justify-between p-6 lg:p-8 ${
                        isLead ? 'lg:col-span-5' : ''
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#A1A1AA]">
                          <span className="font-mono text-[#F59E0B] tabular-nums">
                            {project.index}
                          </span>
                          <span aria-hidden="true" className="text-white/25">/</span>
                          <span>{project.categoryLabel}</span>
                        </div>

                        <h3
                          className={`mt-3 font-semibold tracking-[-0.02em] text-white transition-colors duration-150 group-hover:text-[#FBBF24] ${
                            isLead ? 'text-2xl lg:text-[28px] leading-tight' : 'text-xl lg:text-2xl'
                          }`}
                        >
                          {project.title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA] lg:text-[15px]">
                          {project.summary}
                        </p>

                        <p className="mt-5 font-mono text-xs leading-relaxed text-[#D4D4D8]">
                          {project.technologies.slice(0, 5).join(' · ')}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/8 pt-5">
                        <span className="text-xs text-[#71717A] truncate">
                          {project.statusNote}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F4F4F5] whitespace-nowrap shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#FBBF24]">
                          <span>Case Study</span>
                          <ArrowUpRight className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        )}

        {/* Additional Portfolio Projects (04–06) */}
        {additionalProjects.length > 0 && (
          <div className="mt-12">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
                Additional Engineering Projects &amp; Explorations
              </p>
              <span className="font-mono text-xs text-[#71717A] tabular-nums">
                Projects 04 – 06
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {additionalProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-[#08080D]/88 transition-all duration-200 hover:border-[#F59E0B]/45"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="flex h-full w-full flex-col justify-between p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F59E0B] cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-xs text-[#F59E0B] tabular-nums">
                          {project.index} / Project
                        </span>
                        <Layers className="h-4 w-4 text-[#52525B] transition-colors group-hover:text-[#F59E0B]" aria-hidden="true" />
                      </div>

                      <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em] text-white transition-colors group-hover:text-[#FBBF24]">
                        {project.title}
                      </h3>

                      <p className="mt-1.5 text-xs text-[#A1A1AA]">{project.categoryLabel}</p>

                      <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-white/8 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-[#71717A] truncate">
                          {project.technologies.join(' · ')}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#E4E4E7] whitespace-nowrap shrink-0 group-hover:text-[#FBBF24]">
                          <span>Details</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
