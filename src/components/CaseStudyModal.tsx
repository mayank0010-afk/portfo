import { useEffect } from 'react';
import { ArrowUpRight, MessageSquare, X } from 'lucide-react';
import type { ProjectCaseStudy } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onDiscussProject: (projectTitle: string) => void;
}

export function CaseStudyModal({
  project,
  onClose,
  onDiscussProject,
}: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#09090F] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#09090F] px-6 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#A1A1AA]">
            <span className="font-mono text-[#F59E0B] tabular-nums">{project.index}</span>
            <span aria-hidden="true" className="text-white/25">/</span>
            <span>{project.categoryLabel}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:border-[#F59E0B]/60 hover:bg-white/10 cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* High-Resolution Project Visual when available */}
        {project.image && (
          <div className="aspect-[16/8.5] w-full overflow-hidden border-b border-white/10 bg-[#050508]">
            <ResilientImage
              src={project.image}
              alt={project.imageAlt || project.title}
              fallbackTitle={project.title}
              containerClassName="h-full w-full"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Case Study Body */}
        <div className="space-y-8 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="font-mono text-xs text-[#F59E0B]">{project.statusNote}</p>
            <h2
              id="case-study-modal-title"
              className="mt-2 text-balance text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl"
            >
              {project.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#D4D4D8]">{project.summary}</p>
            {project.relatedExperience && (
              <p className="mt-3 font-mono text-xs text-[#A1A1AA]">
                Related Internship: <span className="text-[#FBBF24]">{project.relatedExperience}</span>
              </p>
            )}
          </div>

          {/* Problem Statement */}
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
              Problem Statement
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#D4D4D8] sm:text-[15px]">
              {project.problem}
            </p>
          </div>

          {/* Individual Contributions & Architecture */}
          <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-6 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
                Individual Contribution
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#D4D4D8]">
                {project.contributions.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#F59E0B]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
                Architecture &amp; Implementation
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#D4D4D8]">
                {project.architecture.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results / Current Progress & Stack */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <div>
              <h3 className="text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
                Outcome &amp; Current Scope
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#D4D4D8]">
                {project.outcomeOrStatus}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
                Technology Stack
              </h3>
              <p className="mt-2 font-mono text-xs leading-relaxed text-[#FBBF24]">
                {project.technologies.join(' · ')}
              </p>
            </div>
          </div>

          {/* Footer Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:border-[#F59E0B]/60 hover:bg-white/10"
            >
              <span>{project.githubLabel}</span>
              <ArrowUpRight className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => onDiscussProject(project.title)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#F59E0B] px-5 py-2.5 text-sm font-semibold text-[#050507] whitespace-nowrap shrink-0 transition-colors hover:bg-[#FBBF24] cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>Discuss This Project</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
