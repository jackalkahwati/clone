export const config = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    calendarApiKey: process.env.GOOGLE_CALENDAR_API_KEY!,
    scopes: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/gmail.modify',
    ],
  },
  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY!,
      model: 'gpt-4-turbo-preview',
    },
    pinecone: {
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    },
  },
  taskManagement: {
    jira: {
      clientId: process.env.JIRA_CLIENT_ID!,
      clientSecret: process.env.JIRA_CLIENT_SECRET!,
      scopes: ['read:jira-work', 'write:jira-work'],
    },
    trello: {
      apiKey: process.env.TRELLO_API_KEY!,
      apiSecret: process.env.TRELLO_API_SECRET!,
      scopes: ['read', 'write'],
    },
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY!,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    plans: {
      basic: {
        id: 'price_basic',
        price: 49,
        name: 'Basic',
        features: [
          'Email automation',
          'Calendar management',
          'Basic document generation',
        ],
      },
      pro: {
        id: 'price_pro',
        price: 99,
        name: 'Pro',
        features: [
          'All Basic features',
          'Advanced document generation',
          'Meeting summaries',
          'Multi-job task management',
        ],
      },
      enterprise: {
        id: 'price_enterprise',
        price: 299,
        name: 'Enterprise',
        features: [
          'All Pro features',
          'Premium integrations',
          'Dedicated support',
          'Custom AI training',
        ],
      },
    },
  },
} as const;

export type Config = typeof config; 