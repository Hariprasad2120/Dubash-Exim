import React from 'react';
import { companyData } from '../../data/company';
import { aboutPillars } from '../../data/features';

export const About: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-lowest py-space-3xl" id="about">
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
          {/* Visual Column with Overlapping Editorial Assets */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden shadow-lg bg-surface-container">
              <img
                src={companyData.boardroomImage}
                alt="International customs and maritime trade consultants reviewing digital manifests in boardroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block bg-tertiary-fixed-dim text-on-tertiary-fixed px-2.5 py-1 rounded font-label-mono-sm text-label-mono-sm uppercase mb-2 font-bold text-xs">
                  INSTITUTIONAL RIGOR
                </span>
                <p className="font-headline-sm text-headline-sm text-inverse-on-surface font-semibold">
                  Autonomous Trade Training &amp; Regulatory Literacy
                </p>
              </div>
            </div>

            {/* Metric Badge */}
            <div className="mt-space-md bg-primary-container text-on-primary p-space-md rounded-lg shadow-xl flex flex-col border border-outline-variant/30">
              <span className="font-label-mono-sm text-label-mono-sm text-tertiary-fixed-dim uppercase font-semibold">
                ACCURACY BENCHMARK
              </span>
              <span className="font-display-hero text-headline-md font-bold my-1 text-white">
                99.8%
              </span>
              <span className="font-body-sm text-body-sm text-on-primary-container leading-tight">
                Zero-error documentation standard taught across all modules.
              </span>
            </div>
          </div>

          {/* Copy & Core Pillars Column */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-label-ui text-sm uppercase tracking-[0.28em] text-secondary font-bold mb-3">
              ABOUT DUBASH EXIM ACADEMY
            </span>
            <h2 className="font-headline-lg text-[clamp(1.9rem,2.55vw,2.75rem)] text-on-surface font-extrabold uppercase tracking-tight leading-[1.12] mb-space-lg">
              Bridging the Gap Between Academic Knowledge &amp; Operational Execution
            </h2>
            <p className="font-body-lg text-[1.35rem] text-on-surface-variant leading-[1.65] mb-space-lg">
              Navigating international trade requires more than theoretical understanding—it demands precision in documentation, compliance, and risk management. At DUBASH EXIM ACADEMY, we train students, logistics professionals, and business owners to master the practical mechanics of global commerce. From preparing error-free Bills of Entry to navigating customs clearance and trade finance, our curriculum equips you to operate confidently in the fast-paced EXIM sector.
            </p>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-md">
              {aboutPillars.map((pillar, idx) => (
                <div key={idx} className="p-space-md rounded bg-surface-container-low flex flex-col">
                  <div className="flex items-center gap-space-2xs text-secondary mb-1">
                    <span className="material-symbols-outlined text-[22px]">{pillar.icon}</span>
                    <span className="font-label-ui text-base font-bold text-on-surface">
                      {pillar.title}
                    </span>
                  </div>
                  <p className="font-body-sm text-base text-on-surface-variant leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
