import React from 'react';
import { whyChooseUsItems } from '../../data/features';

export const Features: React.FC = () => {
  return (
    <section className="w-full bg-surface py-space-3xl" id="why-choose-us">
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="mb-space-3xl">
          <span className="font-label-ui text-sm uppercase tracking-[0.28em] text-secondary font-bold">
            DISTINCT ADVANTAGE
          </span>
          <h2 className="font-headline-lg text-[clamp(1.85rem,2.5vw,2.75rem)] text-on-surface font-extrabold uppercase tracking-tight leading-[1.12] mt-3">
            WHY CHOOSE DUBASH EXIM ACADEMY?
          </h2>
          <p className="font-body-md text-[1.25rem] text-on-surface-variant max-w-3xl mt-4 leading-relaxed">
            We strip out passive lecture halls and replace them with hands-on console sessions matching live port and customs environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {whyChooseUsItems.map((item) => (
            <div
              key={item.number}
              className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between border border-outline-variant/30 min-h-[360px]"
            >
              {/* Large Stylized Number Watermark */}
              <div className="absolute top-4 right-5 text-surface-container-highest/70 font-display-hero text-[3rem] font-black select-none pointer-events-none leading-none">
                {item.number}
              </div>

              <div>
                <div className="w-14 h-14 rounded bg-surface-container-high text-secondary flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[30px]">{item.icon}</span>
                </div>
                <h3 className="font-headline-sm text-[1.6rem] text-on-surface font-bold mb-space-sm leading-tight">
                  {item.title}
                </h3>
                <p className="font-body-md text-[1.2rem] text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-space-lg pt-space-sm border-t-0 text-secondary font-label-ui text-sm uppercase tracking-[0.16em] flex items-center gap-1 font-semibold">
                <span>{item.footerTag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
