import React from 'react';
import { companyData } from '../../data/company';
import { highlightCards } from '../../data/features';
import { Download, CalendarCheck, Ship, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenSyllabusModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSyllabusModal }) => {
  const scrollToEnquire = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('enquire');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Visual Maritime Horizon Gradient Strip */}
      <div className="w-full h-1.5 bg-gradient-to-r from-primary-container via-secondary to-tertiary-fixed-dim" />

      {/* SECTION 1: HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-surface py-space-2xl lg:py-space-3xl">
        {/* Ambient Maritime Grid Overlay Effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#115cb9_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop relative z-10">
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-space-xs mb-space-md flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-high text-on-secondary-container font-label-mono-sm text-label-mono-sm tracking-wide uppercase font-semibold">
              <span className="text-base leading-none">🇮🇳</span>
              <span>India’s Premier Practical EXIM &amp; Customs Training</span>
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded bg-surface-container text-outline font-label-mono-sm text-label-mono-sm">
              DGFT • CBIC • WCO Standards
            </span>
          </div>

          {/* Hero Grid: Two Columns (Left Content, Right Operational Terminal) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col">
              <h1 className="font-display-hero text-[clamp(2.75rem,4.15vw,3.75rem)] text-on-surface tracking-tight font-extrabold uppercase leading-[1.08] mb-space-md">
                MASTER THE SCIENCE OF
                <br />
                <span className="text-secondary">GLOBAL TRADE</span> &amp;
                <br />
                CUSTOMS COMPLIANCE
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-space-xl">
                Practical, industry-led training in Export-Import (EXIM) management, ICEGATE documentation, Incoterms 2020, and end-to-end supply chain execution.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-space-md mb-space-2xl">
                <button
                  type="button"
                  onClick={onOpenSyllabusModal}
                  className="inline-flex items-center justify-center gap-space-xs bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-fixed transition-all px-space-lg py-3.5 rounded font-label-ui text-label-ui shadow-sm group cursor-pointer"
                >
                  <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5 text-on-secondary" />
                  <span>Download Course Syllabus (PDF)</span>
                </button>

                <a
                  href="#enquire"
                  onClick={scrollToEnquire}
                  className="inline-flex items-center justify-center gap-space-xs bg-primary-container text-on-primary hover:bg-inverse-surface transition-all px-space-lg py-3.5 rounded font-label-ui text-label-ui shadow-sm cursor-pointer"
                >
                  <CalendarCheck className="w-[19px] h-[19px] text-tertiary-fixed-dim" />
                  <span>Enquire for Next Batch</span>
                </a>
              </div>

              {/* Trust Counters / Stat Strip */}
              <div className="grid grid-cols-3 gap-space-md bg-surface-container-low p-space-md rounded-lg">
                {companyData.stats.map((stat, idx) => (
                  <div key={idx} className={`flex flex-col ${idx > 0 ? 'pl-space-xs' : ''}`}>
                    <span
                      className={`font-display-hero text-headline-md font-bold leading-none ${
                        stat.highlightColor ? stat.highlightColor : 'text-on-surface'
                      }`}
                    >
                      {stat.value}
                    </span>
                    <span className="font-label-mono-sm text-label-mono-sm text-outline uppercase mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Terminal Visual Box */}
            <div className="lg:col-span-5 relative">
              {/* Background Accent Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-secondary-container/20 to-primary-container/10 rounded-xl blur-xl" />

              <div className="relative bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-outline-variant/30">
                {/* Simulated Maritime Operations Terminal Head */}
                <div className="bg-primary-container px-space-md py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-error inline-block" />
                    <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim inline-block" />
                    <span className="w-3 h-3 rounded-full bg-secondary-container inline-block" />
                    <span className="font-label-mono-sm text-label-mono-sm text-inverse-on-surface ml-2">
                      ICEGATE • EDI SIMULATOR v4.2
                    </span>
                  </div>
                  <span className="font-label-mono-sm text-label-mono-sm text-tertiary-fixed-dim uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
                    LIVE
                  </span>
                </div>

                {/* Terminal Visual Content */}
                <div className="p-space-lg flex flex-col gap-space-md bg-surface-container-lowest">
                  {/* Vessel & Custom Clearance Badge */}
                  <div className="flex items-center justify-between p-space-sm bg-surface-container rounded">
                    <div className="flex items-center gap-space-xs">
                      <Ship className="w-6 h-6 text-secondary shrink-0" />
                      <div>
                        <div className="font-label-ui text-label-ui text-on-surface leading-tight font-semibold">
                          JNPT Nhava Sheva Terminal
                        </div>
                        <div className="font-label-mono-sm text-label-mono-sm text-outline">
                          VESSEL: CMA CGM BIANCA • VOY: 928X
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-surface-container-high text-secondary font-label-mono-sm text-label-mono-sm rounded font-semibold text-xs">
                      GATE-IN CLEARED
                    </span>
                  </div>

                  {/* Practical Portal Document Mockup */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-label-mono-sm font-label-mono-sm text-on-surface-variant">
                      <span>BILL OF ENTRY (CUSTOMS BE NO.)</span>
                      <span className="text-secondary font-bold font-mono">8941029/2026</span>
                    </div>

                    <div className="w-full bg-surface-container rounded p-3 text-body-sm font-label-mono-sm space-y-1.5">
                      <div className="flex justify-between text-on-surface">
                        <span className="text-outline">HS TARIFF CODE:</span>
                        <span className="font-mono">8471.30.10 [DATA HARMONIZED]</span>
                      </div>
                      <div className="flex justify-between text-on-surface">
                        <span className="text-outline">INCOTERM VALUE:</span>
                        <span className="font-mono">CIF CHENNAI SEA PORT</span>
                      </div>
                      <div className="flex justify-between text-on-surface">
                        <span className="text-outline">E-SANCHIT STATUS:</span>
                        <span className="text-secondary font-semibold font-mono">IRN DIGITALLY SIGNED</span>
                      </div>
                      <div className="flex justify-between text-on-surface">
                        <span className="text-outline">DUTY DRAWBACK:</span>
                        <span className="text-on-tertiary-container font-semibold font-mono">SECTION 74 ELIGIBLE</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Image Representation of Maritime Port Execution */}
                  <div className="relative rounded overflow-hidden h-36 bg-surface-container">
                    <img
                      src={companyData.terminalImage}
                      alt="Modern commercial shipping container terminal with automated gantry cranes"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container/85 via-primary-container/30 to-transparent flex items-end p-3">
                      <span className="text-inverse-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-tertiary-fixed-dim shrink-0" />
                        Practical Operational Field Compliance
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Highlights Banner: 3 High-Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-2xl">
            {highlightCards.map((card, idx) => (
              <div
                key={idx}
                className="p-space-lg rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col border border-outline-variant/30"
              >
                <div className="w-12 h-12 rounded bg-surface-container-high text-secondary flex items-center justify-center mb-space-sm">
                  <span className="material-symbols-outlined text-[26px]">{card.icon}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label-ui text-label-ui uppercase tracking-wider text-secondary font-semibold">
                    {card.tag}
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-2xs font-bold">
                  {card.title}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
