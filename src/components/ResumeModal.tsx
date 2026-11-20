import { useEffect } from 'react';
import { Download, Printer, X } from 'lucide-react';
import {
  ACTIVITIES_AND_HACKATHONS,
  EDUCATION_TIMELINE,
  generatePlainTextResume,
  INTERNSHIP_EXPERIENCES,
  PORTFOLIO_PROFILE,
  SELECTED_PROJECTS,
  SKILL_GROUPS,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('printing-resume');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handlePrintPdf = () => {
    document.body.classList.add('printing-resume');
    window.print();
    window.setTimeout(() => {
      document.body.classList.remove('printing-resume');
    }, 300);
  };

  const handleDownloadText = () => {
    const content = generatePlainTextResume();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mayank_Sahani_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/84 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        id="resume-print-surface"
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0A0A10] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Top Action Toolbar (Hidden when printing) */}
        <div className="no-print sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0A0A10] px-6 py-4 sm:px-8">
          <div>
            <h2 id="resume-modal-title" className="text-sm font-semibold text-white">
              Mayank Sahani — Resume
            </h2>
            <p className="text-xs text-[#A1A1AA]">
              Print to PDF or download a clean ATS plain-text version
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:border-[#F59E0B]/60 hover:bg-white/10 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadText}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#F59E0B] px-3.5 py-2 text-xs font-semibold text-[#050507] whitespace-nowrap shrink-0 transition-colors hover:bg-[#FBBF24] cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download .txt</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Structured Resume Sheet */}
        <div className="space-y-8 p-6 sm:p-10 text-[#E4E4E7] print:text-[#09090B]">
          {/* Candidate Header */}
          <div className="border-b border-white/12 pb-6 print:border-black/20">
            <h1 className="text-3xl font-bold tracking-tight text-white print:text-black">
              {PORTFOLIO_PROFILE.fullName}
            </h1>
            <p className="mt-1 text-sm font-medium text-[#FBBF24] print:text-black">
              {PORTFOLIO_PROFILE.positioning}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-[#A1A1AA] print:text-zinc-700">
              <span>{PORTFOLIO_PROFILE.email}</span>
              <span>·</span>
              <span>linkedin.com/in/{PORTFOLIO_PROFILE.linkedinHandle}</span>
              <span>·</span>
              <span>github.com/{PORTFOLIO_PROFILE.githubHandle}</span>
              <span>·</span>
              <span>{PORTFOLIO_PROFILE.locationLabel}</span>
            </div>
          </div>

          {/* Internship Experience */}
          <div>
            <h3 className="font-mono text-xs font-medium tracking-[0.16em] text-[#F59E0B] print:text-black">
              INTERNSHIP EXPERIENCE
            </h3>
            <div className="mt-4 space-y-6">
              {INTERNSHIP_EXPERIENCES.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-base font-semibold text-white print:text-black">
                      {exp.role} — {exp.company}
                    </h4>
                    <span className="font-mono text-xs text-[#A1A1AA] tabular-nums print:text-zinc-700">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-[#A1A1AA] print:text-zinc-700">
                    {exp.technologies.join(' · ')}
                  </p>
                  <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-[#D4D4D8] print:text-zinc-800">
                    {exp.contributions.slice(0, 5).map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Projects */}
          <div className="border-t border-white/10 pt-6 print:border-black/15">
            <h3 className="font-mono text-xs font-medium tracking-[0.16em] text-[#F59E0B] print:text-black">
              SELECTED PROJECTS
            </h3>
            <div className="mt-4 space-y-4">
              {SELECTED_PROJECTS.map((project) => (
                <div key={project.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white print:text-black">
                      {project.title}
                    </h4>
                    <span className="text-xs text-[#A1A1AA] print:text-zinc-700">
                      {project.categoryLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-[#D4D4D8] print:text-zinc-800">
                    {project.summary}
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#A1A1AA] print:text-zinc-700">
                    {project.technologies.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="border-t border-white/10 pt-6 print:border-black/15">
            <h3 className="font-mono text-xs font-medium tracking-[0.16em] text-[#F59E0B] print:text-black">
              TECHNICAL SKILLS
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
              {SKILL_GROUPS.map((group) => (
                <div key={group.id}>
                  <span className="font-semibold text-white print:text-black">
                    {group.category}:{' '}
                  </span>
                  <span className="text-[#D4D4D8] print:text-zinc-800">
                    {group.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="border-t border-white/10 pt-6 print:border-black/15">
            <h3 className="font-mono text-xs font-medium tracking-[0.16em] text-[#F59E0B] print:text-black">
              EDUCATION
            </h3>
            <div className="mt-3 space-y-3 text-sm">
              {EDUCATION_TIMELINE.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white print:text-black">
                      {edu.institution}
                      {edu.parentInstitution ? `, ${edu.parentInstitution}` : ''}
                    </p>
                    <p className="text-[#D4D4D8] print:text-zinc-800">
                      {edu.credential}
                      {edu.specialization ? ` · ${edu.specialization}` : ''}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#A1A1AA] print:text-zinc-700">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons, Training & Volunteering */}
          <div className="border-t border-white/10 pt-6 print:border-black/15">
            <h3 className="font-mono text-xs font-medium tracking-[0.16em] text-[#F59E0B] print:text-black">
              HACKATHONS, TRAINING &amp; VOLUNTEERING
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#D4D4D8] print:text-zinc-800">
              {ACTIVITIES_AND_HACKATHONS.map((a) => `${a.title} (${a.category})`).join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
