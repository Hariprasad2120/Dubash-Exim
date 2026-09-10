import { Router, Request, Response } from 'express';
import { emailService } from '../services/emailService';

const router = Router();

// Sanitization helper
function sanitizeInput(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return /^\+[0-9]{1,4}[0-9]{6,15}$/.test(cleaned) || /^[0-9]{6,15}$/.test(cleaned);
}

// In-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

/**
 * POST /api/contact
 * Handles admissions enquiries
 */
router.post('/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

    if (!checkRateLimit(clientIp, 6, 60000)) {
      res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a minute before submitting again.',
      });
      return;
    }

    const rawBody = req.body || {};
    const fullName = sanitizeInput(rawBody.fullName);
    const email = sanitizeInput(rawBody.email);
    const phone = sanitizeInput(rawBody.phone);
    const profileType = sanitizeInput(rawBody.profileType);
    const courseInterest = sanitizeInput(rawBody.courseInterest);
    const message = sanitizeInput(rawBody.message);

    const errors: Record<string, string> = {};

    if (!fullName || fullName.length < 2) {
      errors.fullName = 'Full Name is required (minimum 2 characters).';
    } else if (fullName.length > 100) {
      errors.fullName = 'Full Name cannot exceed 100 characters.';
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

    if (message && message.length > 2000) {
      errors.message = 'Message cannot exceed 2000 characters.';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the specified fields.',
        errors,
      });
      return;
    }

    const emailResult = await emailService.sendEnquiryNotification({
      fullName,
      email,
      phone,
      profileType,
      courseInterest,
      message,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      message: 'Your enquiry has been submitted successfully. Our admissions desk will review your details and contact you within 2 business hours.',
      data: {
        id: emailResult.messageId,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Server error handling contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error occurred while processing your request.',
    });
  }
});

/**
 * POST /api/syllabus
 * Handles syllabus download requests
 */
router.post('/syllabus', async (req: Request, res: Response): Promise<void> => {
  try {
    const rawEmail = req.body?.email;
    const email = sanitizeInput(rawEmail);

    if (!email || !isValidEmail(email)) {
      res.status(400).json({
        success: false,
        message: 'A valid email address is required to receive the syllabus.',
      });
      return;
    }

    const result = await emailService.sendSyllabusDownloadLink(email);

    res.status(200).json({
      success: true,
      message: 'Course syllabus document link has been generated and dispatched.',
      data: {
        id: result.messageId,
      },
    });
  } catch (error) {
    console.error('Server error handling syllabus request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process syllabus request. Please try again.',
    });
  }
});

export default router;
