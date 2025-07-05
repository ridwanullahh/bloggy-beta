
import sdk from '../lib/sdk-instance';
import { EmailTemplate, EmailCampaign, SMTPConfig } from '../types/email';
import { BlogSubscriber } from '../types/blog';

export class EmailService {
  private static smtpConfig: SMTPConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    fromName: process.env.SMTP_FROM_NAME || 'Blog Platform',
    fromEmail: process.env.SMTP_FROM_EMAIL || 'noreply@blogplatform.com'
  };

  static async createTemplate(
    blogId: string,
    name: string,
    subject: string,
    htmlContent: string,
    textContent: string = '',
    type: 'newsletter' | 'welcome' | 'notification' | 'promotional' = 'newsletter'
  ): Promise<EmailTemplate> {
    return await sdk.insert<EmailTemplate>('emailTemplates', {
      blogId,
      name,
      subject,
      htmlContent,
      textContent: textContent || this.htmlToText(htmlContent),
      type
    });
  }

  static async getTemplates(blogId: string): Promise<EmailTemplate[]> {
    const templates = await sdk.get<EmailTemplate>('emailTemplates');
    return templates.filter(t => t.blogId === blogId);
  }

  static async createCampaign(
    blogId: string,
    templateId: string,
    name: string,
    subject: string,
    scheduledFor?: string
  ): Promise<EmailCampaign> {
    const subscribers = await sdk.get<BlogSubscriber>('subscribers');
    const blogSubscribers = subscribers.filter(s => s.blogId === blogId && s.status === 'active');
    
    return await sdk.insert<EmailCampaign>('emailCampaigns', {
      blogId,
      templateId,
      name,
      subject,
      scheduledFor,
      status: scheduledFor ? 'scheduled' : 'draft',
      recipientCount: blogSubscribers.length,
      sentCount: 0,
      openCount: 0,
      clickCount: 0
    });
  }

  static async sendCampaign(campaignId: string): Promise<void> {
    const campaigns = await sdk.get<EmailCampaign>('emailCampaigns');
    const campaign = campaigns.find(c => c.id === campaignId);
    
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const templates = await sdk.get<EmailTemplate>('emailTemplates');
    const template = templates.find(t => t.id === campaign.templateId);
    
    if (!template) {
      throw new Error('Template not found');
    }

    const subscribers = await sdk.get<BlogSubscriber>('subscribers');
    const blogSubscribers = subscribers.filter(
      s => s.blogId === campaign.blogId && s.status === 'active'
    );

    await sdk.update<EmailCampaign>('emailCampaigns', campaignId, {
      status: 'sending'
    });

    try {
      // In a real implementation, this would send emails via SMTP
      // For now, we'll simulate the process
      console.log(`Sending ${blogSubscribers.length} emails for campaign: ${campaign.name}`);
      
      let sentCount = 0;
      for (const subscriber of blogSubscribers) {
        try {
          // Simulate email sending
          await this.sendEmail(
            subscriber.email,
            campaign.subject,
            template.htmlContent,
            template.textContent
          );
          sentCount++;
        } catch (error) {
          console.error(`Failed to send email to ${subscriber.email}:`, error);
        }
      }

      await sdk.update<EmailCampaign>('emailCampaigns', campaignId, {
        status: 'sent',
        sentCount,
        sentAt: new Date().toISOString()
      });
    } catch (error) {
      await sdk.update<EmailCampaign>('emailCampaigns', campaignId, {
        status: 'failed'
      });
      throw error;
    }
  }

  private static async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
    textContent: string
  ): Promise<void> {
    // In a real implementation, this would use nodemailer
    // For now, we'll log the email details
    console.log(`Sending email to: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML Content: ${htmlContent.substring(0, 100)}...`);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  private static htmlToText(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  static async scheduleCampaigns(): Promise<void> {
    const campaigns = await sdk.get<EmailCampaign>('emailCampaigns');
    const scheduledCampaigns = campaigns.filter(
      c => c.status === 'scheduled' && 
      c.scheduledFor && 
      new Date(c.scheduledFor) <= new Date()
    );

    for (const campaign of scheduledCampaigns) {
      try {
        await this.sendCampaign(campaign.id);
      } catch (error) {
        console.error(`Failed to send scheduled campaign ${campaign.id}:`, error);
      }
    }
  }
}
