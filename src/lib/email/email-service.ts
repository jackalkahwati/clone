import { google } from 'googleapis';
import { Credentials } from 'google-auth-library';
import { Client } from '@microsoft/microsoft-graph-client';

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  private async getGoogleClient() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.NEXTAUTH_URL + '/api/auth/callback/google'
    );

    // TODO: Get tokens from user's session/database
    oauth2Client.setCredentials({
      access_token: 'user_access_token',
      refresh_token: 'user_refresh_token',
    });

    return google.gmail({ version: 'v1', auth: oauth2Client });
  }

  private async getMicrosoftClient() {
    // TODO: Get tokens from user's session/database
    return Client.init({
      authProvider: (done) => {
        done(null, 'user_access_token');
      },
    });
  }

  async sendEmail(options: EmailOptions) {
    try {
      // Try sending via Gmail
      const gmailClient = await this.getGoogleClient();
      const message = this.createEmailMessage(options);
      
      await gmailClient.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: message,
        },
      });
    } catch (error) {
      try {
        // Fallback to Outlook if Gmail fails
        const graphClient = await this.getMicrosoftClient();
        
        await graphClient
          .api('/me/sendMail')
          .post({
            message: {
              subject: options.subject,
              body: {
                contentType: 'Text',
                content: options.body,
              },
              toRecipients: [
                {
                  emailAddress: {
                    address: options.to,
                  },
                },
              ],
            },
          });
      } catch (msError) {
        console.error('Failed to send email via both Gmail and Outlook:', msError);
        throw new Error('Failed to send email');
      }
    }
  }

  private createEmailMessage(options: EmailOptions): string {
    const email = [
      'Content-Type: text/plain; charset="UTF-8"\n',
      'MIME-Version: 1.0\n',
      'Content-Transfer-Encoding: 7bit\n',
      `To: ${options.to}\n`,
      `Subject: ${options.subject}\n\n`,
      options.body,
    ].join('');

    return Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  }
} 