export const mockData = {
  inbox: {
    emails: [
      {
        id: '1',
        subject: 'Project Update Meeting',
        sender: 'sarah@company.com',
        preview: 'Hi team, following up on our discussion...',
        time: '10:30 AM',
        status: 'unread'
      },
      {
        id: '2',
        subject: 'Q4 Planning Documents',
        sender: 'mike@company.com',
        preview: 'Please review the attached documents...',
        time: '9:15 AM',
        status: 'ai_response_ready'
      },
      {
        id: '3',
        subject: 'Client Presentation Feedback',
        sender: 'client@external.com',
        preview: 'Thank you for the presentation...',
        time: 'Yesterday',
        status: 'read'
      }
    ],
    aiSuggestions: [
      {
        id: '1',
        type: 'reply',
        email: 'Q4 Planning Documents',
        suggestion: 'Schedule a review meeting with the team',
        confidence: 0.89
      },
      {
        id: '2',
        type: 'task',
        email: 'Project Update Meeting',
        suggestion: 'Create follow-up action items document',
        confidence: 0.92
      }
    ]
  },
  calendar: {
    meetings: [
      {
        id: '1',
        title: 'Team Standup',
        time: '10:00 AM',
        duration: '30m',
        attendees: ['Sarah', 'Mike', 'John'],
        status: 'upcoming'
      },
      {
        id: '2',
        title: 'Client Review',
        time: '2:00 PM',
        duration: '1h',
        attendees: ['Client Team', 'Product Team'],
        status: 'scheduled'
      }
    ],
    focusBlocks: [
      {
        id: '1',
        title: 'Deep Work',
        time: '11:00 AM',
        duration: '2h'
      }
    ]
  },
  documents: {
    recent: [
      {
        id: '1',
        title: 'Q4 Strategy.doc',
        modified: '2h ago',
        type: 'document'
      },
      {
        id: '2',
        title: 'Project Timeline.xlsx',
        modified: '4h ago',
        type: 'spreadsheet'
      }
    ],
    insights: [
      {
        id: '1',
        document: 'Q4 Strategy.doc',
        insight: 'Key milestones need timeline updates',
        priority: 'high'
      }
    ]
  }
} 