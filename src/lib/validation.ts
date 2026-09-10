import { EnquiryFormData } from '../types';
import { countryCodes } from '../data/countryCodes';

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  profileType?: string;
  courseInterest?: string;
  message?: string;
}

export function validateEmail(email: string): boolean {
  const normalizedEmail = email.trim();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return (
    normalizedEmail.length <= 254 &&
    !normalizedEmail.includes('..') &&
    emailRegex.test(normalizedEmail)
  );
}

export function validateFullName(fullName: string): boolean {
  const normalizedName = fullName.trim().replace(/\s+/g, ' ');
  const nameRegex = /^[A-Za-z][A-Za-z\s.'-]*[A-Za-z]$/;
  return (
    normalizedName.length >= 2 &&
    normalizedName.length <= 100 &&
    nameRegex.test(normalizedName) &&
    !/[.'-]{2,}/.test(normalizedName)
  );
}

export function validatePhone(phone: string, minLength = 6, maxLength = 15): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= minLength && cleanPhone.length <= maxLength;
}

export function validateEnquiryForm(data: EnquiryFormData): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required.';
  } else if (data.fullName.trim().length > 100) {
    errors.fullName = 'Full Name cannot exceed 100 characters.';
  } else if (!validateFullName(data.fullName)) {
    errors.fullName = 'Please enter a valid name using letters, spaces, apostrophes, hyphens, or periods only.';
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email address is required.';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  const selectedCountry = countryCodes.find((item) => item.code === data.countryCode);

  if (!data.countryCode || !selectedCountry) {
    errors.countryCode = 'Please select a valid country code.';
  }

  if (!data.phone || !selectedCountry || !validatePhone(data.phone, selectedCountry.minLength, selectedCountry.maxLength)) {
    errors.phone = selectedCountry
      ? `Please provide a valid ${selectedCountry.minLength === selectedCountry.maxLength ? selectedCountry.maxLength : `${selectedCountry.minLength}-${selectedCountry.maxLength}`}-digit mobile/WhatsApp number.`
      : 'Please provide a valid mobile/WhatsApp number.';
  }

  if (!data.profileType) {
    errors.profileType = 'Please select your current profile.';
  }

  if (!data.courseInterest) {
    errors.courseInterest = 'Please select a course of interest.';
  }

  if (data.message && data.message.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
