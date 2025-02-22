import { WebClient } from '@slack/web-api';
import { Client } from '@microsoft/microsoft-graph-client';

interface MessageOptions {
  platform: string;
  channel: string;
  content: string;
}

export class ChatService {
  private async getSlackClient() {
    const token = process.env.SLACK_BOT_TOKEN;
    if (!token) {
      throw new Error('SLACK_BOT_TOKEN is not set');
    }
    return new WebClient(token);
  }

  private async getTeamsClient() {
    // TODO: Get tokens from user's session/database
    return Client.init({
      authProvider: (done) => {
        done(null, 'user_access_token');
      },
    });
  }

  async sendMessage(options: MessageOptions) {
    switch (options.platform) {
      case 'slack':
        await this.sendSlackMessage(options);
        break;
      case 'teams':
        await this.sendTeamsMessage(options);
        break;
      default:
        throw new Error(`Unsupported platform: ${options.platform}`);
    }
  }

  private async sendSlackMessage(options: MessageOptions) {
    try {
      const client = await this.getSlackClient();
      await client.chat.postMessage({
        channel: options.channel,
        text: options.content,
      });
    } catch (error) {
      console.error('Failed to send Slack message:', error);
      throw new Error('Failed to send Slack message');
    }
  }

  private async sendTeamsMessage(options: MessageOptions) {
    try {
      const client = await this.getTeamsClient();
      await client
        .api(`/teams/${options.channel}/channels/messages`)
        .post({
          body: {
            content: options.content,
          },
        });
    } catch (error) {
      console.error('Failed to send Teams message:', error);
      throw new Error('Failed to send Teams message');
    }
  }
} 