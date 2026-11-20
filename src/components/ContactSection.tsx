import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
  Send,
} from 'lucide-react';
import { generatePlainTextResume, PORTFOLIO_PROFILE } from '../data/portfolioData';

interface ContactSectionProps {
  prefillTopic: string | null;
  onOpenResume: () => void;
  onReturnToHorizon: () => void;
}

const INQUIRY_TYPES = ['Internship / Full-Time Role', 'Backend & AI Project', 'Collaboration'] as const;

export function ContactSection({
  prefillTopic,
  onOpenResume,
  onReturnToHorizon,
}: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<(typeof INQUIRY_TYPES)[number]>(
    'Internship / Full-Time Role'
  );
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    organization: string;
    inquiryType: string;
    mailtoHref: string;
  } | null>(null);

  useEffect(() => {
    if (prefillTopic) {
      setMessage(
        `Hi Mayank, I reviewed your portfolio and would like to discuss ${prefillTopic}.`
      );
      setSubmittedData(null);
      setErrorMessage(null);
    }
  }, [prefillTopic]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_PROFILE.email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = PORTFOLIO_PROFILE.email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleDownloadResume = () => {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('Please enter your name, email address, and a brief note before sending.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Please provide a valid email address so Mayank can reply directly.');
      return;
    }

    const subject = encodeURIComponent(
      `[Portfolio · ${inquiryType}] ${trimmedName}${organization.trim() ? ` — ${organization.trim()}` : ''}`
    );
    const body = encodeURIComponent(
      `${trimmedMessage}\n\n---\nFrom: ${trimmedName}\nOrganization: ${organization.trim() || 'Not specified'}\nEmail: ${trimmedEmail}`
    );

    setErrorMessage(null);
    setSubmittedData({
      name: trimmedName,
      organization: organization.trim(),
      inquiryType,
      mailtoHref: `mailto:${PORTFOLIO_PROFILE.email}?subject=${subject}&body=${body}`,
    });
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 border-t border-white/10 bg-gradient-to-b from-[#040407]/85 via-[#030305]/92 to-[#030305]"
    >
      <div className="mx-auto max-w-[1200px] px-6 pt-20 pb-14 lg:px-8 lg:pt-28 lg:pb-16">
        {/* Top Heading */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-[#A1A1AA]">
            <span className="font-mono text-[#F59E0B]">07</span>
            <span aria-hidden="true" className="text-white/25">/</span>
            <span className="text-[#E4E4E7]">Let&apos;s Connect</span>
          </div>

          <h2 className="mt-5 text-balance text-[clamp(2.25rem,4.8vw,3.85rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
            Have something worth building?
          </h2>

          <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
            Let&apos;s connect, collaborate and create something meaningful. Open to software
            engineering internships, backend &amp; AI roles, and technical collaborations.
          </p>
        </div>

        {/* Two-Column Recruiter Action & Direct Contact Area */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Direct Channels & Resume Downloads */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {/* Email */}
              <div className="py-5">
                <p className="text-xs font-medium tracking-[0.12em] text-[#71717A]">Direct Email</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={`mailto:${PORTFOLIO_PROFILE.email}`}
                    className="font-mono text-sm text-[#F4F4F5] transition-colors hover:text-[#FBBF24] break-all"
                  >
                    {PORTFOLIO_PROFILE.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#E4E4E7] whitespace-nowrap shrink-0 transition-colors hover:border-[#F59E0B]/50 hover:text-white cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#A1A1AA]" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="py-5">
                <p className="text-xs font-medium tracking-[0.12em] text-[#71717A]">LinkedIn</p>
                <a
                  href={PORTFOLIO_PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 font-mono text-sm text-[#F4F4F5] transition-colors hover:text-[#FBBF24]"
                >
                  <span>{PORTFOLIO_PROFILE.linkedinHandle}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                </a>
              </div>

              {/* GitHub */}
              <div className="py-5">
                <p className="text-xs font-medium tracking-[0.12em] text-[#71717A]">GitHub</p>
                <a
                  href={PORTFOLIO_PROFILE.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 font-mono text-sm text-[#F4F4F5] transition-colors hover:text-[#FBBF24]"
                >
                  <span>{PORTFOLIO_PROFILE.githubHandle}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Resume Actions */}
            <div className="rounded-2xl border border-white/10 bg-[#09090F]/90 p-6">
              <p className="text-sm font-semibold text-white">Recruiter Resume Pack</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#A1A1AA]">
                Preview a print-ready formatted resume or download a clean ATS-friendly text copy
                immediately.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:border-[#F59E0B]/60 hover:bg-white/10 cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                  <span>Preview &amp; Print PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadResume}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/12 px-4 py-2 text-xs font-medium text-[#FEF3C7] whitespace-nowrap shrink-0 transition-colors hover:bg-[#F59E0B] hover:text-[#050507] cursor-pointer"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Working Recruiter Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#09090F]/92 p-6 sm:p-8">
              {submittedData ? (
                <div className="py-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/12 text-[#F59E0B]">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-white">Message Draft Ready</h3>
                  <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-[#A1A1AA]">
                    Thank you, {submittedData.name}
                    {submittedData.organization ? ` (${submittedData.organization})` : ''}. Your{' '}
                    <span className="text-[#E4E4E7]">{submittedData.inquiryType}</span> inquiry is
                    prepared and ready to send directly via your mail client.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={submittedData.mailtoHref}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#F59E0B] px-5 py-2.5 text-sm font-semibold text-[#050507] whitespace-nowrap shrink-0 transition-colors hover:bg-[#FBBF24]"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>Open in Email Client</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedData(null);
                        setName('');
                        setOrganization('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="inline-flex min-h-[44px] items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-[#E4E4E7] whitespace-nowrap shrink-0 transition-colors hover:bg-white/10 cursor-pointer"
                    >
                      Write Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <p className="text-xs font-medium tracking-[0.12em] text-[#A1A1AA]">
                      Inquiry Topic
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {INQUIRY_TYPES.map((type) => {
                        const active = inquiryType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setInquiryType(type)}
                            className={`min-h-[38px] rounded-lg border px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                              active
                                ? 'border-[#F59E0B] bg-[#F59E0B] text-[#050507] font-semibold'
                                : 'border-white/12 bg-white/[0.03] text-[#A1A1AA] hover:border-white/25 hover:text-white'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-[#D4D4D8]">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/12 bg-[#050508] px-3.5 py-2.5 text-sm text-white placeholder:text-[#52525B] focus:border-[#F59E0B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-org" className="block text-xs font-medium text-[#D4D4D8]">
                        Company / Team (Optional)
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Engineering Recruiting"
                        className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/12 bg-[#050508] px-3.5 py-2.5 text-sm text-white placeholder:text-[#52525B] focus:border-[#F59E0B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#D4D4D8]">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="mt-1.5 min-h-[44px] w-full rounded-xl border border-white/12 bg-[#050508] px-3.5 py-2.5 text-sm text-white placeholder:text-[#52525B] focus:border-[#F59E0B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-[#D4D4D8]">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details about the role, team, or system you're building..."
                      className="mt-1.5 w-full rounded-xl border border-white/12 bg-[#050508] px-3.5 py-2.5 text-sm text-white placeholder:text-[#52525B] focus:border-[#F59E0B] focus:outline-none"
                    />
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-xs text-red-200"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <span className="text-xs text-[#71717A]">
                      Direct response via {PORTFOLIO_PROFILE.email}
                    </span>
                    <button
                      type="submit"
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-[#050507] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#FBBF24] hover:shadow-[0_0_24px_rgba(245,158,11,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B] cursor-pointer"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Send Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Quiet Copyright Footer + Replay Black-Hole Horizon Action */}
        <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#71717A] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-[var(--font-display)] font-semibold text-[#E4E4E7]">
              {PORTFOLIO_PROFILE.brandMark}
            </span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>© 2026 Mayank Sahani. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#work" className="transition-colors hover:text-white">
              Work
            </a>
            <a href="#experience" className="transition-colors hover:text-white">
              Experience
            </a>
            <a href="#toolkit" className="transition-colors hover:text-white">
              Toolkit
            </a>
            <button
              type="button"
              onClick={onReturnToHorizon}
              className="inline-flex items-center gap-1.5 font-mono text-[#A1A1AA] transition-colors hover:text-[#FBBF24] cursor-pointer"
            >
              <ArrowUp className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
              <span>Return to Black Hole</span>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
