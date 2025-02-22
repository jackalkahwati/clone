import { S3 } from 'aws-sdk';
import { PrismaClient } from '@prisma/client';
import { EmailService } from '@/lib/email/email-service';

interface ContextData {
  emails?: string[];
  messages?: string[];
  events?: string[];
  tasks?: string[];
}

export class DocumentService {
  private static s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  private static bucketName = process.env.AWS_S3_BUCKET_NAME || 'clneme-documents';

  static async gatherContextData(prisma: PrismaClient, userId: string, context: ContextData) {
    const contextData: any = {};

    if (context.emails?.length) {
      contextData.emails = await prisma.email.findMany({
        where: {
          id: { in: context.emails },
          userId,
        },
      });
    }

    if (context.messages?.length) {
      contextData.messages = await prisma.message.findMany({
        where: {
          id: { in: context.messages },
          userId,
        },
      });
    }

    if (context.events?.length) {
      contextData.events = await prisma.event.findMany({
        where: {
          id: { in: context.events },
          calendar: {
            userId,
          },
        },
      });
    }

    if (context.tasks?.length) {
      contextData.tasks = await prisma.task.findMany({
        where: {
          id: { in: context.tasks },
          userId,
        },
      });
    }

    return contextData;
  }

  static async storeVersion(documentId: string, content: string) {
    const timestamp = new Date().toISOString();
    const key = `documents/${documentId}/versions/${timestamp}.json`;

    await this.s3.putObject({
      Bucket: this.bucketName,
      Key: key,
      Body: JSON.stringify({
        content,
        timestamp,
      }),
      ContentType: 'application/json',
    }).promise();

    return key;
  }

  static async getVersion(documentId: string, versionKey: string) {
    const response = await this.s3.getObject({
      Bucket: this.bucketName,
      Key: `documents/${documentId}/versions/${versionKey}.json`,
    }).promise();

    return JSON.parse(response.Body!.toString());
  }

  static async listVersions(documentId: string) {
    const response = await this.s3.listObjectsV2({
      Bucket: this.bucketName,
      Prefix: `documents/${documentId}/versions/`,
    }).promise();

    return response.Contents?.map(obj => ({
      key: obj.Key!,
      lastModified: obj.LastModified!,
      size: obj.Size!,
    })) || [];
  }

  static async deleteVersions(documentId: string) {
    const versions = await this.listVersions(documentId);
    
    if (versions.length === 0) return;

    await this.s3.deleteObjects({
      Bucket: this.bucketName,
      Delete: {
        Objects: versions.map(version => ({ Key: version.key })),
      },
    }).promise();
  }

  static async shareDocument(documentId: string, emails: string[], permission: 'view' | 'edit') {
    const sharingLinks = emails.map(email => ({
      email,
      link: this.generateSharingLink(documentId, email, permission),
    }));

    // Send sharing invitations
    const emailService = new EmailService();
    await Promise.all(
      sharingLinks.map(({ email, link }) =>
        emailService.sendEmail({
          to: email,
          subject: 'Document Shared with You',
          body: `You have been invited to ${permission} a document. Click here to access: ${link}`,
        })
      )
    );

    return sharingLinks;
  }

  private static generateSharingLink(documentId: string, email: string, permission: string): string {
    // In a real implementation, we would:
    // 1. Generate a secure token
    // 2. Store the token with permissions in the database
    // 3. Create a time-limited sharing link
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return `${baseUrl}/documents/${documentId}/shared?token=dummy-token`;
  }
} 