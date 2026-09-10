import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { EnquiryFormData } from '../../types';
import { validateEnquiryForm, ValidationErrors } from '../../lib/validation';
import { submitEnquiry } from '../../lib/api';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ThankYouCard } from '../ui/ThankYouCard';
import { CheckCircle2, ShieldCheck, AlertCircle, Sparkles, ChevronDown } from 'lucide-react';
import { countryCodes } from '../../data/countryCodes';

const courseOptions = [
  { value: 'Full EXIM Certification (All 4 Modules)', label: 'Full EXIM Certification (All 4 Modules)' },
  { value: 'Customs & ICEGATE Practical Workshop', label: 'Customs & ICEGATE Practical Workshop' },
  { value: 'Incoterms & Trade Finance Masterclass', label: 'Incoterms & Trade Finance Masterclass' },
  { value: 'Corporate Cohort Training (Enterprise)', label: 'Corporate Cohort Training (Enterprise)' },
];

const profileOptions = [
  'Student / Job Seeker',
  'Working Professional',
  'Exporter / Business Owner',
];

const sanitizeFullName = (value: string) => value.replace(/[^A-Za-z\s.'-]/g, '');
const sanitizePhone = (value: string, maxLength = 15) => value.replace(/\D/g, '').slice(0, maxLength);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    profileType: 'Working Professional',
    courseInterest: 'Full EXIM Certification (All 4 Modules)',
    message: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const selectedCountry = countryCodes.find((item) => item.code === formData.countryCode) ?? countryCodes[0];
    const nextValue =
      name === 'fullName' ? sanitizeFullName(value) : name === 'phone' ? sanitizePhone(value, selectedCountry.maxLength) : value;
    setFormData((prev) => {
      if (name === 'countryCode') {
        const nextCountry = countryCodes.find((item) => item.code === value) ?? countryCodes[0];
        return {
          ...prev,
          countryCode: value,
          phone: sanitizePhone(prev.phone, nextCountry.maxLength),
        };
      }

      return { ...prev, [name]: nextValue };
    });
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const selectedCountry = countryCodes.find((item) => item.code === formData.countryCode) ?? countryCodes[0];

  const handleProfileSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, profileType: type }));
    if (errors.profileType) {
      setErrors((prev) => ({ ...prev, profileType: undefined }));
    }
  };

  const handleCountrySelect = (code: string) => {
    const nextCountry = countryCodes.find((item) => item.code === code) ?? countryCodes[0];
    setFormData((prev) => ({
      ...prev,
      countryCode: code,
      phone: sanitizePhone(prev.phone, nextCountry.maxLength),
    }));
    setIsCountryMenuOpen(false);
    if (errors.countryCode) {
      setErrors((prev) => ({ ...prev, countryCode: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateEnquiryForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: 'idle', message: '' });

    try {
      const response = await submitEnquiry({
        ...formData,
        phone: `${formData.countryCode} ${formData.phone}`,
      });
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: response.message || 'Your enquiry has been submitted successfully.',
        });
        setFormData({
          fullName: '',
          email: '',
          countryCode: '+91',
          phone: '',
          profileType: 'Working Professional',
          courseInterest: 'Full EXIM Certification (All 4 Modules)',
          message: '',
        });
        setErrors({});
      } else {
        setSubmitStatus({
          type: 'error',
          message: response.message || 'Something went wrong. Please check the form and retry.',
        });
        if (response.errors) {
          setErrors(response.errors);
        }
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({
        type: 'error',
        message: 'A network error occurred. Please try again or reach us by telephone.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-surface py-space-3xl" id="contact">
      {/* Anchor for enquiry buttons */}
      <div id="enquire" className="relative -top-24" />

      <div className="max-w-[1280px] mx-auto px-margin-mobile lg:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-xl overflow-hidden bg-surface-container-lowest">
          {/* Left Context Column */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-primary-container text-inverse-on-surface p-space-xl sm:p-space-2xl min-h-[640px]">
            <div>
              <span className="inline-flex w-fit rounded bg-secondary px-3 py-2 font-label-mono-sm text-label-mono-sm uppercase tracking-widest text-on-secondary font-bold">
                BATCH ADMISSIONS OPEN
              </span>
              <h2 className="font-headline-lg text-[clamp(2rem,3vw,3rem)] text-inverse-on-surface font-extrabold uppercase tracking-tight leading-[1.16] mt-space-lg">
                Reserve Your Spot for the Next Batch
              </h2>
              <p className="font-body-lg text-body-lg text-inverse-on-surface mt-space-md leading-relaxed max-w-2xl">
                Fill out the form below to receive the detailed syllabus and batch timings.
              </p>

              <div className="mt-space-xl space-y-space-md">
                <div className="flex items-center gap-space-xs text-inverse-on-surface font-body-md">
                  <CheckCircle2 className="w-5 h-5 text-tertiary-fixed-dim shrink-0" />
                  <span>Direct ICEGATE mock document templates included</span>
                </div>
                <div className="flex items-center gap-space-xs text-inverse-on-surface font-body-md">
                  <CheckCircle2 className="w-5 h-5 text-tertiary-fixed-dim shrink-0" />
                  <span>Small-cohort peer learning (Max 25 candidates per batch)</span>
                </div>
                <div className="flex items-center gap-space-xs text-inverse-on-surface font-body-md">
                  <CheckCircle2 className="w-5 h-5 text-tertiary-fixed-dim shrink-0" />
                  <span>Placement assistance &amp; CHA internship references</span>
                </div>
              </div>
            </div>

            <div className="p-space-md bg-inverse-surface rounded border border-outline-variant/20 mt-space-2xl">
              <span className="flex items-center gap-space-xs font-label-mono-sm text-label-mono-sm text-tertiary-fixed-dim uppercase font-semibold mb-2">
                <ShieldCheck className="w-5 h-5" />
                PROMPT VERIFICATION PROTOCOL
              </span>
              <p className="font-body-sm text-body-sm text-inverse-on-surface leading-relaxed">
                Instant response via WhatsApp or email within 2 business hours.
              </p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-6 bg-surface-container-lowest">
            <div className="px-space-xl py-space-xl sm:px-space-3xl sm:py-space-2xl">
              <div className="relative overflow-hidden rounded-xl">
                <AnimatePresence>
                  {submitStatus.type === 'success' && (
                    <ThankYouCard
                      title="Thank You!"
                      message={submitStatus.message}
                      buttonText="Submit Another Enquiry"
                      onReset={() => setSubmitStatus({ type: 'idle', message: '' })}
                      iconType="sparkles"
                    />
                  )}
                </AnimatePresence>


                <form onSubmit={handleSubmit} className="flex flex-col gap-space-md" noValidate>
                  {submitStatus.type === 'error' && (
                    <div className="p-3 bg-error-container text-error rounded-md flex items-start gap-2 text-body-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{submitStatus.message}</span>
                    </div>
                  )}

                  {/* Profile Type Radio Selector */}
                  <div className="flex flex-col">
                    <label className="font-label-ui text-label-ui text-on-surface font-semibold uppercase mb-2">
                      Current Profile *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {profileOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleProfileSelect(opt)}
                          className={`px-3 py-2.5 rounded text-left border text-body-sm transition-all flex items-center justify-between cursor-pointer ${
                            formData.profileType === opt
                              ? 'border-secondary bg-surface-container-high text-on-surface font-semibold ring-1 ring-secondary'
                              : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
                          }`}
                        >
                          <span>{opt}</span>
                          {formData.profileType === opt && (
                            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.profileType && (
                      <span className="text-error text-body-sm mt-1">{errors.profileType}</span>
                    )}
                  </div>

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-space-md">
                    <Input
                      id="fullName"
                      name="fullName"
                      label="Full Name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                      autoComplete="name"
                      minLength={2}
                      maxLength={100}
                      pattern="[A-Za-z][A-Za-z\s.'-]*[A-Za-z]"
                      title="Use letters, spaces, apostrophes, hyphens, or periods only."
                      onBeforeInput={(e) => {
                        if (e.data && sanitizeFullName(e.data) !== e.data) {
                          e.preventDefault();
                        }
                      }}
                      required
                    />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                  </div>

                  {/* Phone Number and Course Dropdown */}
                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-space-md">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      label="Mobile / WhatsApp"
                      placeholder={selectedCountry.placeholder}
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      inputMode="numeric"
                      pattern={`[0-9]{${selectedCountry.minLength},${selectedCountry.maxLength}}`}
                      minLength={selectedCountry.minLength}
                      maxLength={selectedCountry.maxLength}
                      required
                      prefixElement={
                        <div className="relative">
                          <button
                            id="countryCode"
                            type="button"
                            aria-label="Country code"
                            aria-haspopup="listbox"
                            aria-expanded={isCountryMenuOpen}
                            title={selectedCountry.country}
                            onClick={() => setIsCountryMenuOpen((isOpen) => !isOpen)}
                            onBlur={() => window.setTimeout(() => setIsCountryMenuOpen(false), 120)}
                            className="w-28 box-border px-4 py-3 rounded bg-surface-container text-on-surface-variant font-label-ui text-label-ui font-semibold border border-outline-variant/30 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary flex items-center justify-between shrink-0"
                          >
                            <span>{selectedCountry.code}</span>
                            <ChevronDown className="w-4 h-4 text-outline shrink-0" />
                          </button>

                          {isCountryMenuOpen && (
                            <div
                              role="listbox"
                              aria-label="Select country code"
                              className="absolute left-0 top-[calc(100%+0.25rem)] z-30 w-72 max-h-64 overflow-y-auto rounded bg-surface-container-lowest border border-outline-variant shadow-xl py-1"
                            >
                              {countryCodes.map((item) => (
                                <button
                                  key={`${item.country}-${item.code}`}
                                  type="button"
                                  role="option"
                                  aria-selected={item.code === formData.countryCode}
                                  onMouseDown={(e) => e.preventDefault()}
                                  onClick={() => handleCountrySelect(item.code)}
                                  className={`w-full px-3 py-2 text-left font-label-ui text-sm flex items-center justify-between gap-3 hover:bg-surface-container-low ${
                                    item.code === formData.countryCode
                                      ? 'text-secondary bg-surface-container-high font-semibold'
                                      : 'text-on-surface-variant'
                                  }`}
                                >
                                  <span>{item.country}</span>
                                  <span className="font-semibold text-on-surface">{item.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      }
                    />
                    {errors.countryCode && (
                      <span className="text-error text-body-sm mt-1">{errors.countryCode}</span>
                    )}

                    <Select
                      id="courseInterest"
                      name="courseInterest"
                      label="Interested Course"
                      value={formData.courseInterest}
                      onChange={handleChange}
                      options={courseOptions}
                      error={errors.courseInterest}
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <Textarea
                    id="message"
                    name="message"
                    label="Specific Questions / Background"
                    placeholder="Tell us about your background or specific questions regarding foreign trade policies..."
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="submit"
                    isLoading={isSubmitting}
                    className="mt-2"
                  >
                    SUBMIT ENQUIRY
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-outline text-body-sm font-label-mono-sm">
                    <ShieldCheck className="w-4 h-4 text-secondary" />
                    <span>Strict confidentiality. No promotional spam.</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
