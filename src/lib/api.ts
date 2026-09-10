import { EnquiryFormData, ContactApiResponse } from '../types';

export async function submitEnquiry(formData: EnquiryFormData): Promise<ContactApiResponse> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return {
      success: false,
      message: 'Network error. Unable to reach the admissions server. Please try again or call us directly.',
    };
  }
}

export async function requestSyllabusDownload(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/syllabus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error requesting syllabus download:', error);
    return {
      success: false,
      message: 'Network error. Please try again or contact us directly.',
    };
  }
}
