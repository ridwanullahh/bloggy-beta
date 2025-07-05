
export interface EmailTemplate {
  id: string;
  uid: string;
  blogId: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  type: 'newsletter' | 'welcome' | 'notification' | 'promotional';
  createdAt: string;
  updatedAt: string;
}

export interface EmailCampaign {
  id: string;
  uid: string;
  blogId: string;
  templateId: string;
  name: string;
  subject: string;
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  recipientCount: number;
  sentCount: number;
  openCount: number;
  clickCount: number;
  createdAt: string;
  sentAt?: string;
}

export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
}
