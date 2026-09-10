import type { VercelRequest, VercelResponse } from '@vercel/node';

function sanitizeInput(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>?/gm, '').trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return email.length <= 254 && !email.includes('..') && emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return /^\+[0-9]{1,4}[0-9]{6,15}$/.test(cleaned) || /^[0-9]{6,15}$/.test(cleaned);
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const fullName = sanitizeInput(req.body?.fullName);
  const email = sanitizeInput(req.body?.email);
  const phone = sanitizeInput(req.body?.phone);
  const profileType = sanitizeInput(req.body?.profileType);
  const courseInterest = sanitizeInput(req.body?.courseInterest);
  const message = sanitizeInput(req.body?.message);

  const errors: Record<string, string> = {};

  if (!fullName || fullName.length < 2) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.length > 100) {
    errors.fullName = 'Full name cannot exceed 100 characters.';
  }

  if (!email || !isValidEmail(email)) {
    errors.email = 'A valid email address is required.';
  }

  if (!phone || !isValidPhone(phone)) {
    errors.phone = 'A valid mobile/WhatsApp number is required for the selected country code.';
  }

  if (!profileType) {
    errors.profileType = 'Please select your current profile.';
  }

  if (!courseInterest) {
    errors.courseInterest = 'Please select a course of interest.';
  }

  if (message.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the specified fields.',
      errors,
    });
  }

  console.log('[Vercel Contact API] New enquiry received:', {
    fullName,
    email,
    phone,
    profileType,
    courseInterest,
    messageLength: message.length,
  });

  return res.status(200).json({
    success: true,
    message:
      'Your enquiry has been submitted successfully. Our admissions desk will review your details and contact you within 2 business hours.',
    data: {
      id: `ENQ-${Date.now()}`,
      timestamp: new Date().toISOString(),
    },
  });
}
