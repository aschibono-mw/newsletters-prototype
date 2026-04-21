// Recurring Prompts Mock Data

export const DAYS_OF_WEEK = [
  { id: 'sun', label: 'Sun', value: 0 },
  { id: 'mon', label: 'Mon', value: 1 },
  { id: 'tue', label: 'Tue', value: 2 },
  { id: 'wed', label: 'Wed', value: 3 },
  { id: 'thu', label: 'Thu', value: 4 },
  { id: 'fri', label: 'Fri', value: 5 },
  { id: 'sat', label: 'Sat', value: 6 },
]

export const TIME_OPTIONS = [
  { value: '06:00', label: '06:00 AM' },
  { value: '07:00', label: '07:00 AM' },
  { value: '08:00', label: '08:00 AM' },
  { value: '09:00', label: '09:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '01:00 PM' },
  { value: '14:00', label: '02:00 PM' },
  { value: '15:00', label: '03:00 PM' },
  { value: '16:00', label: '04:00 PM' },
  { value: '17:00', label: '05:00 PM' },
  { value: '18:00', label: '06:00 PM' },
  { value: '19:00', label: '07:00 PM' },
  { value: '20:00', label: '08:00 PM' },
  { value: '21:00', label: '09:00 PM' },
]

export const INITIAL_RECURRING_PROMPTS = [
  {
    id: 'recurring-1',
    promptName: 'Weekly Campaign Performance Summary',
    prompt: 'Analyze campaign metrics from the past week and generate a summary report including engagement rates, conversion metrics, and ROI analysis. Highlight any significant changes or trends.',
    schedule: {
      days: ['mon', 'wed', 'fri'],
      primaryTime: '08:00',
      secondaryTime: null,
    },
    recipients: ['alice@company.com', 'bob@company.com'],
    emailSubject: 'Your Weekly Campaign Update',
    emailMessage: 'Here is your scheduled Mira analysis.',
    status: 'active',
    lastRun: '2 hours ago',
    nextRun: 'Wed, Jan 22 at 8:00 AM',
    createdBy: 'Alice Bergson',
  },
  {
    id: 'recurring-2',
    promptName: 'Daily Competitor Monitoring',
    prompt: 'Monitor competitor social media activity and news mentions. Identify any new campaigns, product launches, or significant announcements.',
    schedule: {
      days: ['mon', 'tue', 'wed', 'thu', 'fri'],
      primaryTime: '09:00',
      secondaryTime: '17:00',
    },
    recipients: ['marketing-team@company.com'],
    emailSubject: 'Daily Competitor Intelligence',
    emailMessage: 'Your daily competitor analysis is ready.',
    status: 'active',
    lastRun: 'Yesterday at 5:00 PM',
    nextRun: 'Tomorrow at 9:00 AM',
    createdBy: 'Marketing Team',
  },
  {
    id: 'recurring-3',
    promptName: 'Monthly Customer Sentiment Report',
    prompt: 'Compile customer feedback from all channels and generate a comprehensive sentiment analysis report. Include NPS trends, common themes, and actionable recommendations.',
    schedule: {
      days: ['mon'],
      primaryTime: '10:00',
      secondaryTime: null,
    },
    recipients: ['leadership@company.com', 'customer-success@company.com'],
    emailSubject: 'Monthly Customer Sentiment Analysis',
    emailMessage: 'Please find your monthly customer sentiment report attached.',
    status: 'paused',
    lastRun: 'Jan 6 at 10:00 AM',
    nextRun: '—',
    createdBy: 'Customer Success',
  },
  {
    id: 'recurring-4',
    promptName: 'Social Media Performance Digest',
    prompt: 'Analyze social media performance across all platforms. Generate insights on top-performing content, audience growth, and engagement patterns.',
    schedule: {
      days: ['tue', 'thu'],
      primaryTime: '14:00',
      secondaryTime: null,
    },
    recipients: ['social@company.com'],
    emailSubject: 'Social Media Performance Update',
    emailMessage: 'Your social media digest is ready for review.',
    status: 'active',
    lastRun: 'Yesterday at 2:00 PM',
    nextRun: 'Thu, Jan 23 at 2:00 PM',
    createdBy: 'Social Team',
  },
]

// Mock saved prompts for selection in wizard
export const SAVED_PROMPTS = [
  {
    id: 'prompt-1',
    name: 'Campaign Performance Analysis',
    prompt: 'Analyze campaign metrics and generate a comprehensive performance report.',
  },
  {
    id: 'prompt-2',
    name: 'Competitor Intelligence Report',
    prompt: 'Monitor competitor activity and provide strategic insights.',
  },
  {
    id: 'prompt-3',
    name: 'Customer Sentiment Analysis',
    prompt: 'Analyze customer feedback and sentiment across all channels.',
  },
  {
    id: 'prompt-4',
    name: 'Social Media Summary',
    prompt: 'Generate a summary of social media performance and engagement.',
  },
]

// Mock team members for recipient autocomplete
export const TEAM_MEMBERS = [
  { email: 'alice@company.com', name: 'Alice Bergson' },
  { email: 'bob@company.com', name: 'Bob Chen' },
  { email: 'carol@company.com', name: 'Carol Davis' },
  { email: 'dave@company.com', name: 'Dave Wilson' },
  { email: 'marketing-team@company.com', name: 'Marketing Team' },
  { email: 'leadership@company.com', name: 'Leadership' },
  { email: 'customer-success@company.com', name: 'Customer Success' },
  { email: 'social@company.com', name: 'Social Team' },
]

// Helper function to format schedule for display
export function formatSchedule(schedule) {
  const { days, primaryTime, secondaryTime } = schedule

  // Get time label
  const getTimeLabel = (time) => {
    const option = TIME_OPTIONS.find((t) => t.value === time)
    return option ? option.label : time
  }

  // Check for common patterns
  const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri']
  const isWeekdays = weekdays.every((d) => days.includes(d)) && days.length === 5
  const isDaily = days.length === 7

  let dayText
  if (isDaily) {
    dayText = 'Daily'
  } else if (isWeekdays) {
    dayText = 'Weekdays'
  } else {
    const dayLabels = days.map((d) => {
      const day = DAYS_OF_WEEK.find((dw) => dw.id === d)
      return day ? day.label : d
    })
    dayText = dayLabels.join(', ')
  }

  let timeText = getTimeLabel(primaryTime)
  if (secondaryTime) {
    timeText += ` & ${getTimeLabel(secondaryTime)}`
  }

  return `${dayText} at ${timeText}`
}

// Helper to get recipient display text
export function formatRecipients(recipients) {
  if (recipients.length === 0) return 'No recipients'
  if (recipients.length === 1) return recipients[0]
  if (recipients.length === 2) return recipients.join(', ')
  return `${recipients[0]} +${recipients.length - 1} more`
}
