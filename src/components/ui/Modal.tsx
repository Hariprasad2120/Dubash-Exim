import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  panelClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, panelClassName = 'max-w-md' }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-container/75 backdrop-blur-sm p-margin-mobile animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`bg-surface-container-lowest ${panelClassName} w-full rounded-xl shadow-2xl relative border border-outline-variant/30 flex flex-col`}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 text-outline hover:text-on-surface p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <X className="w-5 h-5" />
        </button>
        {title && (
          <h3 id="modal-title" className="font-headline-sm text-headline-sm text-on-surface font-bold px-space-xl pt-space-xl pb-space-md pr-12 shrink-0">
            {title}
          </h3>
        )}
        <div className="overflow-y-auto px-space-xl pb-space-xl">
          {children}
        </div>
      </div>
    </div>
  );
};
