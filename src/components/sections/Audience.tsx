import React from 'react';
import { targetAudience } from '../../data/audience';

export const Audience: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-lowest py-space-3xl">
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="text-center max-w-4xl mx-auto mb-space-3xl">
          <span className="font-label-ui text-sm uppercase tracking-[0.28em] text-secondary font-bold">
            TARGET AUDIENCE
          </span>
          <h2 className="font-headline-lg text-[clamp(1.85rem,2.5vw,2.75rem)] text-on-surface font-extrabold uppercase tracking-tight leading-[1.12] mt-3">
            Who Should Attend This Program?
          </h2>
          <p className="font-body-md text-[1.25rem] text-on-surface-variant mt-4 leading-relaxed">
            Designed specifically for career changers, current supply chain managers, and active business proprietors looking for verifiable operational competence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {targetAudience.map((profile, idx) => (
            <div
              key={idx}
              className="p-space-xl rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-outline-variant/30 min-h-[365px]"
            >
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-[4.5rem] h-[4.5rem] rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[36px]">{profile.icon}</span>
                  </div>
                  <span className="px-3 py-1.5 bg-surface-container-lowest text-secondary font-label-ui text-sm rounded font-semibold uppercase tracking-[0.16em] border border-outline-variant/20">
                    {profile.tag}
                  </span>
                </div>
                <h3 className="font-headline-sm text-[1.65rem] text-on-surface uppercase mb-space-xs font-bold leading-tight">
                  {profile.title}
                </h3>
                <p className="font-body-md text-[1.2rem] text-on-surface-variant leading-relaxed mb-space-md">
                  {profile.description}
                </p>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant/20">
                <span className="font-label-ui text-sm text-outline block uppercase tracking-[0.16em] font-semibold">
                  {profile.outcomeLabel}
                </span>
                <span className="font-body-sm text-base font-semibold text-on-surface leading-relaxed">
                  {profile.outcomeText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
