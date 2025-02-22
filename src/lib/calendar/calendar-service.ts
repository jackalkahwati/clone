import { google } from 'googleapis';
import { Client } from '@microsoft/microsoft-graph-client';

interface EventData {
  provider: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  location?: string;
}

interface UpdateEventData extends Partial<EventData> {
  provider: string;
  eventId: string;
}

interface DeleteEventData {
  provider: string;
  eventId: string;
}

export class CalendarService {
  private async getGoogleClient() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CALENDAR_CLIENT_ID,
      process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
      process.env.NEXTAUTH_URL + '/api/auth/callback/google'
    );

    // TODO: Get tokens from user's session/database
    oauth2Client.setCredentials({
      access_token: 'user_access_token',
      refresh_token: 'user_refresh_token',
    });

    return google.calendar({ version: 'v3', auth: oauth2Client });
  }

  private async getMicrosoftClient() {
    // TODO: Get tokens from user's session/database
    return Client.init({
      authProvider: (done) => {
        done(null, 'user_access_token');
      },
    });
  }

  async createEvent(data: EventData): Promise<string> {
    switch (data.provider) {
      case 'google':
        return this.createGoogleEvent(data);
      case 'outlook':
        return this.createOutlookEvent(data);
      default:
        throw new Error(`Unsupported calendar provider: ${data.provider}`);
    }
  }

  async updateEvent(data: UpdateEventData): Promise<void> {
    switch (data.provider) {
      case 'google':
        await this.updateGoogleEvent(data);
        break;
      case 'outlook':
        await this.updateOutlookEvent(data);
        break;
      default:
        throw new Error(`Unsupported calendar provider: ${data.provider}`);
    }
  }

  async deleteEvent(data: DeleteEventData): Promise<void> {
    switch (data.provider) {
      case 'google':
        await this.deleteGoogleEvent(data);
        break;
      case 'outlook':
        await this.deleteOutlookEvent(data);
        break;
      default:
        throw new Error(`Unsupported calendar provider: ${data.provider}`);
    }
  }

  private async createGoogleEvent(data: EventData): Promise<string> {
    const calendar = await this.getGoogleClient();
    const event = {
      summary: data.title,
      description: data.description,
      start: {
        dateTime: data.startTime.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: data.endTime.toISOString(),
        timeZone: 'UTC',
      },
      attendees: data.attendees.map(email => ({ email })),
      location: data.location,
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return response.data.id!;
  }

  private async createOutlookEvent(data: EventData): Promise<string> {
    const client = await this.getMicrosoftClient();
    const event = {
      subject: data.title,
      body: {
        contentType: 'Text',
        content: data.description || '',
      },
      start: {
        dateTime: data.startTime.toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: data.endTime.toISOString(),
        timeZone: 'UTC',
      },
      attendees: data.attendees.map(email => ({
        emailAddress: { address: email },
        type: 'required',
      })),
      location: {
        displayName: data.location || '',
      },
    };

    const response = await client
      .api('/me/events')
      .post(event);

    return response.id;
  }

  private async updateGoogleEvent(data: UpdateEventData): Promise<void> {
    const calendar = await this.getGoogleClient();
    const event: any = {};

    if (data.title) event.summary = data.title;
    if (data.description) event.description = data.description;
    if (data.startTime) event.start = { dateTime: data.startTime.toISOString(), timeZone: 'UTC' };
    if (data.endTime) event.end = { dateTime: data.endTime.toISOString(), timeZone: 'UTC' };
    if (data.attendees) event.attendees = data.attendees.map(email => ({ email }));
    if (data.location) event.location = data.location;

    await calendar.events.patch({
      calendarId: 'primary',
      eventId: data.eventId,
      requestBody: event,
    });
  }

  private async updateOutlookEvent(data: UpdateEventData): Promise<void> {
    const client = await this.getMicrosoftClient();
    const event: any = {};

    if (data.title) event.subject = data.title;
    if (data.description) event.body = { contentType: 'Text', content: data.description };
    if (data.startTime) event.start = { dateTime: data.startTime.toISOString(), timeZone: 'UTC' };
    if (data.endTime) event.end = { dateTime: data.endTime.toISOString(), timeZone: 'UTC' };
    if (data.attendees) {
      event.attendees = data.attendees.map(email => ({
        emailAddress: { address: email },
        type: 'required',
      }));
    }
    if (data.location) event.location = { displayName: data.location };

    await client
      .api(`/me/events/${data.eventId}`)
      .patch(event);
  }

  private async deleteGoogleEvent(data: DeleteEventData): Promise<void> {
    const calendar = await this.getGoogleClient();
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: data.eventId,
    });
  }

  private async deleteOutlookEvent(data: DeleteEventData): Promise<void> {
    const client = await this.getMicrosoftClient();
    await client
      .api(`/me/events/${data.eventId}`)
      .delete();
  }
} 