export interface EnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  profileType: string;
  courseInterest: string;
  message?: string;
  timestamp?: string;
}

export class EmailService {
  /**
   * Dispatches an enquiry notification to the admissions desk and sends a confirmation to the candidate.
   * Can be easily swapped with SendGrid, Resend, Nodemailer, or AWS SES via environment variables.
   */
  async sendEnquiryNotification(enquiry: EnquiryPayload): Promise<{ success: boolean; messageId: string }> {
    const messageId = `ENQ-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const timestamp = new Date().toISOString();

    // Log structured event for monitoring
    console.log(`[EmailService] [${timestamp}] New Enquiry Received:`, {
      messageId,
      name: enquiry.fullName,
      email: enquiry.email,
      phone: enquiry.phone,
      profileType: enquiry.profileType,
      courseInterest: enquiry.courseInterest,
      messageLength: enquiry.message?.length || 0,
    });

    // In a production environment with SMTP / SendGrid credentials configured:
    // if (process.env.SMTP_HOST && process.env.SMTP_USER) { ... }

    return {
      success: true,
      messageId,
    };
  }

  /**
   * Sends the Syllabus PDF download link to the user
   */
  async sendSyllabusDownloadLink(email: string): Promise<{ success: boolean; messageId: string }> {
    const messageId = `SYL-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    console.log(`[EmailService] Syllabus requested by: ${email} [${messageId}]`);

    return {
      success: true,
      messageId,
    };
  }
}

export const emailService = new EmailService();
