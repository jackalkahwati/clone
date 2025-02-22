import { AISettings, Email } from '@prisma/client';

export class DeepSeekAI {
  private apiKey: string;

  constructor() {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY is not set');
    }
    this.apiKey = apiKey;
  }

  async generateEmailResponse(email: Email & { user: { aiSettings: AISettings } }, settings: AISettings): Promise<string> {
    try {
      // Format the prompt based on email content and AI settings
      const prompt = this.formatPrompt(email, settings);

      // Make API call to DeepSeek
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are an AI assistant that helps write email responses. 
                       Formality Level: ${settings.toneFormal}%
                       Creativity Level: ${settings.toneCreative}%`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: settings.responseSpeed / 100,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating email response:', error);
      throw new Error('Failed to generate email response');
    }
  }

  private formatPrompt(email: Email, settings: AISettings): string {
    return `
      Please help me write a response to this email:

      Subject: ${email.subject}
      From: ${email.sender}
      Body: ${email.body}

      Please generate a professional response that maintains the context of the conversation.
      The response should have a formality level of ${settings.toneFormal}% and creativity level of ${settings.toneCreative}%.
    `;
  }
} 