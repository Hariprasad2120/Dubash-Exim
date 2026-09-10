import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Audience } from './components/sections/Audience';
import { Features } from './components/sections/Features';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { SyllabusModal } from './components/sections/SyllabusModal';
import { Legal } from './components/sections/Legal';

export default function App() {
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Fixed Sticky Header with Navigation */}
      <Header onOpenSyllabusModal={() => setIsSyllabusModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 pt-16">
        {/* SECTION 1: HERO */}
        <Hero onOpenSyllabusModal={() => setIsSyllabusModalOpen(true)} />

        {/* SECTION 2: ABOUT DUBASH EXIM ACADEMY */}
        <About />

        {/* SECTION 3: COURSE MODULES & SYLLABUS */}
        <Services />

        {/* SECTION 4: TARGET AUDIENCE */}
        <Audience />

        {/* SECTION 5: WHY CHOOSE DUBASH EXIM */}
        <Features />

        {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
        <FAQ />

        {/* SECTION 7: ENROLMENT & CONTACT FORM */}
        <Contact />

      </main>

      {/* FOOTER */}
      <Footer onLegalClick={setLegalModal} />

      {/* Interactive Download Course Syllabus Modal */}
      <SyllabusModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
      />

      <Legal type={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}
