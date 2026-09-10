import React, { useState, useEffect } from 'react';
import { navigationItems } from '../../data/navigation';
import { companyData } from '../../data/company';
import { MobileMenu } from './MobileMenu';
import { Phone, Menu } from 'lucide-react';

interface HeaderProps {
  onOpenSyllabusModal?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = navigationItems.map((item) => item.id);

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant">
        <div className="relative w-full px-margin-mobile lg:px-margin-desktop h-16 flex items-center gap-space-lg">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-space-sm min-w-0">
            <a
              href="#"
              className="flex items-center gap-space-sm focus:outline-none min-w-0"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={companyData.logoUrl}
                alt={`${companyData.name} Official Logo`}
                className="h-12 w-auto object-contain shrink-0"
              />
              <div className="hidden md:flex flex-col min-w-0">
                <span className="font-headline-sm text-[1.15rem] tracking-tight text-on-surface leading-none uppercase font-bold whitespace-nowrap">
                  {companyData.name}
                </span>
                <span className="font-label-ui text-[0.64rem] text-outline tracking-[0.22em] uppercase mt-space-2xs whitespace-nowrap">
                  {companyData.subName}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex absolute left-1/2 top-0 -translate-x-1/2 items-center justify-center gap-space-xl h-full">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`font-label-ui text-label-ui transition-colors py-2 relative whitespace-nowrap ${
                    isActive
                      ? 'text-secondary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="ml-auto flex items-center justify-end gap-space-sm shrink-0">
            {/* Phone button */}
            <a
              href={`tel:${companyData.phoneTel}`}
              className="hidden lg:inline-flex items-center gap-space-2xs border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low hover:text-on-surface px-space-md py-2 rounded text-label-ui font-label-ui transition-colors whitespace-nowrap"
            >
              <Phone className="w-[18px] h-[18px] text-secondary" />
              <span>{companyData.phone}</span>
            </a>

            {/* Enquire Now CTA button */}
            <a
              href="#enquire"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#enquire');
              }}
              className="hidden xl:inline-flex items-center justify-center bg-primary text-on-primary hover:bg-on-surface-variant px-space-md py-2 rounded text-label-ui font-label-ui transition-colors shadow-sm whitespace-nowrap"
            >
              Enquire Now
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded text-on-surface hover:bg-surface-container-low transition-colors ml-1 focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6 text-on-surface" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navigationItems}
        activeSection={activeSection}
        onItemClick={handleNavClick}
      />
    </>
  );
};
