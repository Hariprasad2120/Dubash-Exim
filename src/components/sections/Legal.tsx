import React from 'react';
import { companyData } from '../../data/company';
import { Modal } from '../ui/Modal';

const termsItems = [
  'These Terms of Service govern access to and use of this website and the information, enquiry forms, syllabus requests, and course-related features made available through it.',
  'Dubash Exim Academy provides practical training information for export-import management, customs compliance, ICEGATE documentation, Incoterms, trade finance, and related professional learning programs.',
  'You agree to use this website only for lawful purposes and must not interfere with the security, availability, servers, databases, or administrative systems connected to the website.',
  'When submitting an enquiry, syllabus request, contact form, or course interest form, you agree to provide accurate and legitimate information that does not violate third-party rights.',
  'Submitting an enquiry does not automatically create admission, enrolment, certification, placement, internship, or contractual rights with Dubash Exim Academy.',
  'Course descriptions, schedules, batch availability, fees, outcomes, support, and timelines are provided for general information and may change based on academic, operational, or business requirements.',
  'All website content, including logos, graphics, designs, text, photographs, icons, layouts, and training-related materials, is owned by or licensed to Dubash Exim Academy unless otherwise stated.',
  'You may not reproduce, distribute, modify, republish, sell, or commercially exploit website content without prior written permission, except where permitted by applicable law.',
  'Third-party links, tools, maps, communication platforms, payment providers, analytics services, or external websites may be provided for convenience. Their use is governed by their own terms and policies.',
  'We aim to keep this website accurate, secure, and available, but we do not guarantee uninterrupted access or that all information will always be complete, accurate, or current.',
  'To the extent permitted by applicable law, Dubash Exim Academy will not be liable for indirect, incidental, consequential, or other losses arising solely from use of, or inability to use, this website.',
  'These Terms are governed by the laws of India. Subject to applicable law, disputes relating to this website fall under the jurisdiction of courts located in Chennai, Tamil Nadu.',
];

const privacyItems = [
  'Dubash Exim Academy respects your privacy and handles personal information responsibly when you use this website.',
  'We may collect information you voluntarily provide, including name, email address, phone number, profile type, course interest, company or organization name, enquiry details, and messages submitted through forms.',
  'We may automatically receive limited technical information such as IP address, browser type, device type, operating system, referring pages, and usage information where applicable.',
  'We use collected information to respond to enquiries, share syllabus or batch details, communicate about requested courses, provide support, maintain business records, improve the website, prevent misuse, and meet legal obligations.',
  'Information submitted through contact or enquiry forms may be stored by Dubash Exim Academy or trusted service providers used for hosting, email delivery, analytics, IT services, or customer communication.',
  'We do not sell or rent personal information. We may disclose information when required by law, regulation, legal process, or lawful request from an authorized government authority.',
  'Please avoid submitting sensitive personal information unless it is necessary for your enquiry or requested service.',
  'This website may use cookies or similar technologies for functionality, security, preferences, and analytics. You can control or delete cookies through your browser settings.',
  'We use reasonable administrative and technical measures to protect personal information, but no internet transmission or electronic storage system can be guaranteed completely secure.',
  'We retain personal information only as long as reasonably necessary for responding to enquiries, maintaining records, resolving disputes, and satisfying legal or regulatory requirements.',
  'Depending on applicable law, you may request access, correction, deletion, or withdrawal of consent for your personal information, subject to legitimate business or legal retention needs.',
  'This website is not intentionally directed toward children, and we do not knowingly seek to collect personal information from children through it.',
  'Third-party websites linked from this site have their own privacy practices, and Dubash Exim Academy is not responsible for those practices.',
];

interface LegalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const Legal: React.FC<LegalProps> = ({ type, onClose }) => {
  const isTerms = type === 'terms';
  const items = isTerms ? termsItems : privacyItems;
  const title = isTerms ? 'Terms of Service' : 'Privacy Policy';
  const closingCopy = isTerms
    ? `For questions regarding these Terms, contact ${companyData.name} at ${companyData.email} or ${companyData.phone}. Office address: ${companyData.address}`
    : `For privacy questions, concerns, or requests, contact the Privacy/Grievance Officer at ${companyData.email} or ${companyData.phone}. Office address: ${companyData.address}`;

  return (
    <Modal isOpen={type !== null} onClose={onClose} title={title} panelClassName="max-w-4xl max-h-[86vh] overflow-hidden">
      <div className="pt-space-xs">
        <span className="font-label-ui text-label-ui uppercase tracking-wider text-secondary font-bold">
          Last Updated: September 10, 2026
        </span>
        <ol className="mt-space-md space-y-space-md font-body-sm text-body-sm text-on-surface-variant leading-relaxed list-decimal pl-5">
          {items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
          <li className="pl-1">{closingCopy}</li>
        </ol>
      </div>
    </Modal>
  );
};
