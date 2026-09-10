import React from 'react';
import { courseModules } from '../../data/modules';
import { CheckCircle2, GraduationCap } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section className="w-full bg-surface py-space-3xl" id="course-modules">
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop">
        {/* Section Heading & Meta Chip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-label-ui text-sm uppercase tracking-[0.28em] text-secondary font-bold">
              CURRICULUM MATRIX
            </span>
            <h2 className="font-headline-lg text-[clamp(1.9rem,2.55vw,2.75rem)] text-on-surface font-extrabold uppercase tracking-tight leading-[1.12] mt-3">
              COURSE MODULES &amp; SYLLABUS
            </h2>
            <p className="font-body-lg text-[1.35rem] text-on-surface-variant mt-4 max-w-xl">
              Comprehensive Curriculum Built for Real-World Success
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1.5 bg-surface-container-high text-secondary rounded font-label-ui text-sm uppercase tracking-[0.12em] font-semibold">
              <GraduationCap className="w-4 h-4 mr-1.5 text-secondary shrink-0" />
              Total 4 Comprehensive Modules • 60 Hours Practical Work
            </span>
          </div>
        </div>

        {/* 4 Modules Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {courseModules.map((module) => (
            <div
              key={module.id}
              className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col border border-outline-variant/30"
            >
              {/* Module Header Bar */}
              <div className="bg-primary-container p-space-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded bg-secondary text-on-secondary font-label-ui text-sm font-bold">
                    {module.moduleNumber}
                  </span>
                  <span className="font-headline-sm text-[1.45rem] text-on-primary uppercase font-semibold">
                    Module {parseInt(module.moduleNumber, 10)}
                  </span>
                </div>
                <span className="font-label-ui text-sm text-tertiary-fixed-dim uppercase tracking-[0.14em] bg-surface-container-highest/20 px-3 py-1 rounded font-semibold">
                  {module.category}
                </span>
              </div>

              {/* Module Content */}
              <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                <div>
                  <h3 className="font-headline-md text-[1.85rem] text-on-surface mb-space-sm font-bold leading-tight">
                    {module.title}
                  </h3>
                  <div className="mb-space-md">
                    <span className="font-label-ui text-base uppercase tracking-wide text-outline font-semibold block mb-2">
                      Core Topics Covered:
                    </span>
                    <ul className="space-y-3 font-body-md text-[1.12rem] text-on-surface leading-relaxed">
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-secondary mt-1 shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Skill Acquired Footnote */}
                <div className="p-space-md bg-surface-container rounded-lg">
                  <span className="font-label-ui text-sm uppercase tracking-[0.18em] text-secondary font-bold block mb-2">
                    Key Skills Acquired:
                  </span>
                  <p className="font-body-sm text-base font-semibold text-on-surface leading-relaxed">
                    {module.keySkill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
