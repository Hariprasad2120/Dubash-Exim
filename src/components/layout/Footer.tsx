import React from 'react';
import { companyData } from '../../data/company';
import { quickNavItems } from '../../data/navigation';
import { MapPin, Mail, Phone, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavClick?: (href: string) => void;
  onLegalClick?: (type: 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onLegalClick }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#terms' || href === '#privacy') {
      e.preventDefault();
      onLegalClick?.(href === '#terms' ? 'terms' : 'privacy');
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      if (onNavClick) onNavClick(href);
    }
  };

  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop py-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl">
          {/* Column 1: Brand & Credential */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <img
                src={companyData.logoUrl}
                alt={`${companyData.name} Official Logo`}
                className="h-12 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-[1.15rem] tracking-tight text-on-surface leading-none uppercase font-bold whitespace-nowrap">
                  {companyData.name}
                </span>
                <span className="font-label-ui text-[0.64rem] text-outline tracking-[0.22em] uppercase mt-space-2xs whitespace-nowrap">
                  {companyData.subName}
                </span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-sm">
              {companyData.footerDescription}
            </p>
            <div className="flex items-center gap-space-xs font-label-mono-sm text-label-mono-sm text-secondary bg-surface-container-high px-space-sm py-1.5 rounded border border-outline-variant w-fit">
              <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
              <span>DGFT &amp; Customs Regulatory Aligned</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="font-label-ui text-label-ui uppercase tracking-wider text-on-surface font-semibold">
              Quick Navigation
            </h3>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm">
              {quickNavItems.map((item) => (
                <li key={item.label} className="list-none">
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Headquarters & Contact */}
          <div className="lg:col-span-5 flex flex-col gap-space-sm">
            <h3 className="font-label-ui text-label-ui uppercase tracking-wider text-on-surface font-semibold">
              Headquarters &amp; Contact
            </h3>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <div className="flex items-start gap-space-xs">
                <MapPin className="w-[18px] h-[18px] text-secondary mt-0.5 shrink-0" />
                <span>{companyData.address}</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <Mail className="w-[18px] h-[18px] text-secondary shrink-0" />
                <a
                  href={`mailto:${companyData.email}`}
                  className="hover:text-secondary transition-colors"
                >
                  {companyData.email}
                </a>
              </div>
              <div className="flex items-center gap-space-xs">
                <Phone className="w-[18px] h-[18px] text-secondary shrink-0" />
                <a
                  href={`tel:${companyData.phoneTel}`}
                  className="hover:text-secondary transition-colors"
                >
                  {companyData.phone}
                </a>
              </div>
              <div className="flex items-center gap-space-xs">
                <Clock className="w-[18px] h-[18px] text-secondary shrink-0" />
                <span>{companyData.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer and Copyright */}
        <div className="mt-space-2xl pt-space-lg border-t border-outline-variant flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
          <div className="font-body-sm text-body-sm text-outline max-w-2xl leading-normal">
            <strong>Regulatory &amp; Legal Disclaimer:</strong> Dubash Exim Academy is an autonomous professional skill-training institute. Certification programs focus on vocational execution of foreign trade policies, customs clearance frameworks, and logistics operations. Not affiliated with any statutory border authority.
          </div>
          <div className="font-label-mono-sm text-label-mono-sm text-on-surface-variant shrink-0">
            {companyData.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
