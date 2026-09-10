import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ThankYouCard } from '../ui/ThankYouCard';
import { validateEmail } from '../../lib/validation';
import { requestSyllabusDownload } from '../../lib/api';
import { FileText, Download, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await requestSyllabusDownload(email);
      if (res.success) {
        setIsSuccess(true);
        // Trigger simulated PDF download
        const dummyPdfUrl = '#';
        console.log('Syllabus download initiated for', email);
      } else {
        setError(res.message || 'Unable to prepare download. Please try again.');
      }
    } catch {
      setError('A connection error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setError(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="">
      <div className="flex flex-col">
        <div className="w-12 h-12 rounded bg-surface-container-high text-secondary flex items-center justify-center mb-3">
          <FileText className="w-6 h-6 text-secondary" />
        </div>

        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold uppercase mb-1">
          Download Course Syllabus
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
          Receive the complete 2026 Academic Catalog covering all 4 modules, 60 practical lab hours, ICEGATE test credentials, and certification evaluation framework.
        </p>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <ThankYouCard
              title="Download Ready!"
              message={`The syllabus has been sent to ${email}. You can also view the document summary below.`}
              buttonText="Close & Return to Academy"
              iconType="check"
              onReset={handleReset}
            />
          ) : (

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {error && (
              <div className="p-2.5 bg-error-container text-error rounded text-body-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Input
              id="syllabusName"
              type="text"
              label="Your Name (Optional)"
              placeholder="e.g. Priyanshu Gupta"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              id="syllabusEmail"
              type="email"
              label="Work / Personal Email Address"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              required
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full mt-2"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Get Free PDF Syllabus Now
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-outline text-xs mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              <span>We respect your privacy. No promotional spam.</span>
            </div>
          </form>
        )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};
