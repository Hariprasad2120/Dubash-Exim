import React from 'react';
import { NavItem } from '../../types';
import { Phone, X } from 'lucide-react';
import { companyData } from '../../data/company';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeSection: string;
  onItemClick: (href: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  items,
  activeSection,
  onItemClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary-container/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-surface-container-lowest shadow-2xl p-6 flex flex-col justify-between border-l border-outline-variant">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant">
            <div className="flex items-center gap-2">
              <img
                src={companyData.logoUrl}
                alt={companyData.name}
                className="h-10 w-auto object-contain"
              />
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-on-surface-variant hover:text-on-surface focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-2">
            {items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemClick(item.href);
                    onClose();
                  }}
                  className={`text-left px-3 py-2.5 rounded font-label-ui text-base transition-colors ${
                    isActive
                      ? 'bg-surface-container-high text-secondary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer & Actions */}
        <div className="pt-6 border-t border-outline-variant flex flex-col gap-3">
          <a
            href={`tel:${companyData.phoneTel}`}
            className="flex items-center justify-center gap-2 border border-outline-variant bg-surface-container-lowest text-on-surface px-4 py-2.5 rounded text-sm font-label-ui hover:bg-surface-container-low transition-colors"
          >
            <Phone className="w-4 h-4 text-secondary" />
            <span>{companyData.phone}</span>
          </a>

          <button
            onClick={() => {
              onItemClick('#enquire');
              onClose();
            }}
            className="w-full text-center bg-primary text-on-primary hover:bg-on-surface-variant px-4 py-3 rounded text-sm font-label-ui font-semibold transition-colors shadow-sm"
          >
            Enquire Now
          </button>

          <div className="flex items-center gap-2 px-2 text-outline text-xs font-label-mono-sm">
            <span>DGFT • CBIC • WCO Aligned</span>
          </div>
        </div>
      </div>
    </div>
  );
};
