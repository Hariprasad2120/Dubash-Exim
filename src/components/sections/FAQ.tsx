import React, { useState } from 'react';
import { faqItems } from '../../data/faq';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  const scrollToEnquire = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('enquire');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-surface-container-lowest py-space-3xl" id="faqs">
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
          {/* Section Meta Information */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="font-label-ui text-sm uppercase tracking-[0.28em] text-secondary font-bold">
              SUPPORT • CLARIFICATIONS
            </span>
            <h2 className="font-headline-lg text-[clamp(1.9rem,2.55vw,2.75rem)] text-on-surface font-extrabold uppercase tracking-tight leading-[1.12] mt-3">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="font-body-md text-[1.25rem] text-on-surface-variant mt-space-lg leading-relaxed">
              Have specific inquiries regarding batch schedules, eligibility, or computational requirements? Our admissions council is here to guide you.
            </p>

            <div className="p-space-lg bg-surface-container-low rounded flex gap-space-md mt-space-xl border border-outline-variant/30">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-8 h-8 text-secondary shrink-0" />
              </div>
              <div>
                <span className="font-label-ui text-base font-bold text-on-surface">
                  Direct Academic Desk
                </span>
                <p className="font-body-sm text-base text-on-surface-variant mt-1">
                  Mon - Sat, 9:00 AM - 6:00 PM IST
                </p>
                <a
                  href="#enquire"
                  onClick={scrollToEnquire}
                  className="inline-flex items-center gap-2 text-secondary font-label-ui text-base font-semibold hover:underline mt-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-secondary" />
                  <span>Request a callback →</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Accordion FAQs */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {faqItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-lg bg-surface-container-low border border-outline-variant/30 overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'shadow-sm' : 'shadow-none'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(item.id)}
                    aria-expanded={isOpen}
                    className="w-full p-space-xl text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-label-ui text-base text-secondary font-bold shrink-0 mt-1">
                        {item.questionNumber}
                      </span>
                      <span className="font-headline-sm text-[1.45rem] text-on-surface font-semibold leading-tight">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-7 h-7 text-secondary transition-transform duration-300 ease-out shrink-0 ${
                        isOpen ? 'rotate-180 text-secondary' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-space-xl pb-space-xl pl-[calc(theme(spacing.space-xl)+2.25rem)] text-on-surface-variant font-body-md text-[1.1rem] leading-relaxed">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
