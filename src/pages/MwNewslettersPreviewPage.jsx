import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined'
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined'

// ── Mock newsletter content per series ────────────────────────────────────────
const SERIES_META = {
  'daily-brief': {
    name: 'Daily Brief',
    subject: 'Your Daily Media Brief – April 21, 2026',
    recipientList: 'Marketing Team (47 recipients)',
    title: 'Your Daily Media Brief',
    sections: [
      {
        heading: 'Top Headlines',
        articles: [
          {
            source: 'TechCrunch',
            date: 'April 21, 2026',
            headline: 'AI Startups See Record Investment in Q1 2026',
            snippet: 'Venture capital funding for artificial intelligence companies reached a new high in the first quarter of 2026, with total investment surpassing $18 billion globally. Analysts point to enterprise adoption as the primary driver.',
          },
          {
            source: 'Reuters',
            date: 'April 21, 2026',
            headline: 'Global Markets Rally on Strong Earnings Reports',
            snippet: 'Major stock indices climbed for the third consecutive session as corporate earnings beat expectations. The S&P 500 gained 1.2%, driven by technology and consumer discretionary sectors.',
          },
        ],
      },
      {
        heading: 'Competitor Coverage',
        articles: [
          {
            source: 'Bloomberg',
            date: 'April 21, 2026',
            headline: 'Cision Announces New AI-Powered Media Monitoring Suite',
            snippet: 'PR software firm Cision unveiled an expanded artificial intelligence feature set aimed at enterprise communications teams. The update focuses on real-time sentiment analysis and automated reporting.',
          },
          {
            source: 'PR Week',
            date: 'April 21, 2026',
            headline: 'Brandwatch Expands Social Listening Capabilities',
            snippet: 'The social analytics platform added support for 12 new languages and expanded coverage of emerging regional social networks, strengthening its position in international markets.',
          },
        ],
      },
    ],
  },
  'monthly-roundup': {
    name: 'Monthly Roundup',
    subject: 'Monthly Media Roundup – April 2026',
    recipientList: 'Executive Team (12 recipients)',
    title: 'Monthly Media Roundup',
    sections: [
      {
        heading: 'Brand Highlights',
        articles: [
          {
            source: 'Forbes',
            date: 'April 2026',
            headline: 'Meltwater Named to Top 50 B2B Software Companies List',
            snippet: 'Meltwater secured a position in the annual ranking of leading B2B software providers, recognized for its media intelligence platform and customer retention metrics.',
          },
          {
            source: 'Business Insider',
            date: 'April 2026',
            headline: 'Media Intelligence Market Set to Reach $8B by 2028',
            snippet: 'A new industry report projects strong growth for media monitoring and intelligence platforms, driven by increasing demand from communications and marketing teams seeking real-time insights.',
          },
        ],
      },
      {
        heading: 'Industry Trends',
        articles: [
          {
            source: 'Digiday',
            date: 'April 2026',
            headline: 'Newsrooms Double Down on AI-Assisted Content Production',
            snippet: 'Leading publishers are expanding use of AI tools for story ideation, summarization, and distribution strategy. Editorial teams report time savings without sacrificing editorial quality.',
          },
        ],
      },
    ],
  },
  'media-coverage': {
    name: 'Media Coverage',
    subject: 'Your Media Coverage Report – April 21, 2026',
    recipientList: 'Communications Team (28 recipients)',
    title: 'Media Coverage Report',
    sections: [
      {
        heading: 'Earned Media',
        articles: [
          {
            source: 'The Verge',
            date: 'April 21, 2026',
            headline: 'How Meltwater is Helping Brands Navigate the AI News Cycle',
            snippet: 'A deep-dive feature examining how enterprise media intelligence platforms are evolving to help communications teams make sense of the accelerating pace of AI-related news coverage.',
          },
          {
            source: 'CMS Wire',
            date: 'April 21, 2026',
            headline: 'Real-Time Media Monitoring: Best Practices for 2026',
            snippet: 'Industry practitioners share their approaches to staying ahead of breaking news and managing brand reputation across an increasingly fragmented media landscape.',
          },
        ],
      },
      {
        heading: 'Social Mentions',
        articles: [
          {
            source: 'Twitter / X',
            date: 'April 21, 2026',
            headline: '#MediaIntelligence Trending Among PR Professionals',
            snippet: 'The hashtag saw a 340% spike in engagement following the release of a major industry report, with communications professionals sharing benchmarks and best practices.',
          },
        ],
      },
    ],
  },
  'competitor-digest': {
    name: 'Competitor Digest',
    subject: 'Competitor Intelligence Digest – Week of April 21',
    recipientList: 'Strategy Team (8 recipients)',
    title: 'Competitor Intelligence Digest',
    sections: [
      {
        heading: 'Competitor Activity',
        articles: [
          {
            source: 'TechCrunch',
            date: 'April 21, 2026',
            headline: 'Sprinklr Raises $120M to Accelerate Enterprise Expansion',
            snippet: 'Customer experience management platform Sprinklr closed a new funding round as it pushes deeper into enterprise accounts across financial services and healthcare verticals.',
          },
          {
            source: 'MarTech Today',
            date: 'April 21, 2026',
            headline: 'Hootsuite Pivots Strategy Toward AI-Native Social Management',
            snippet: 'The social media management veteran announced a product overhaul centered on generative AI features, including automated content suggestions and predictive posting schedules.',
          },
        ],
      },
      {
        heading: 'Market Moves',
        articles: [
          {
            source: 'Reuters',
            date: 'April 21, 2026',
            headline: 'Qualtrics Acquires Media Analytics Startup for $85M',
            snippet: 'The experience management company is expanding into owned and earned media analytics through the acquisition, signaling a convergence of customer and media intelligence.',
          },
        ],
      },
    ],
  },
}

const FALLBACK_SERIES = {
  name: 'Newsletter Preview',
  subject: 'Your Newsletter – April 21, 2026',
  recipientList: 'Recipient list will appear here',
  title: 'Your Weekly News Digest',
  sections: [
    {
      heading: 'Top Headlines',
      articles: [
        {
          source: 'Source',
          date: 'April 21, 2026',
          headline: 'Content Headline Title',
          snippet: 'Content hit sentence with search keywords bolded will appear here. This is another line of hit sentence body copy.',
        },
        {
          source: 'Source',
          date: 'April 21, 2026',
          headline: 'Content Headline Title',
          snippet: 'Content hit sentence with search keywords bolded will appear here. This is another line of hit sentence body copy.',
        },
      ],
    },
    {
      heading: 'Competitor Coverage',
      articles: [
        {
          source: 'Source',
          date: 'April 21, 2026',
          headline: 'Content Headline Title',
          snippet: 'Content hit sentence with search keywords bolded will appear here. This is another line of hit sentence body copy.',
        },
      ],
    },
  ],
}

// ── Newsletter email body ─────────────────────────────────────────────────────
function NewsletterBody({ series, date, isMobile }) {
  const maxWidth = isMobile ? 375 : 640

  return (
    <Box sx={{
      width: maxWidth,
      maxWidth: '100%',
      bgcolor: '#ffffff',
      borderRadius: '2px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
    }}>
      {/* Email header band */}
      <Box sx={{ bgcolor: '#00827F', px: isMobile ? 2.5 : 4, py: isMobile ? 2 : 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? 14 : 16, letterSpacing: '0.02em' }}>
          {series.name.toUpperCase()}
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: isMobile ? 11 : 12 }}>
          {date}
        </Typography>
      </Box>

      {/* Newsletter title */}
      <Box sx={{ px: isMobile ? 2.5 : 4, pt: isMobile ? 2.5 : 3, pb: isMobile ? 1.5 : 2, borderBottom: '2px solid #00827F' }}>
        <Typography sx={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3 }}>
          {series.title}
        </Typography>
      </Box>

      {/* Sections */}
      {series.sections.map((section, si) => (
        <Box key={si} sx={{ px: isMobile ? 2.5 : 4, pt: 2.5, pb: si === series.sections.length - 1 ? 0 : 0 }}>
          {/* Section heading */}
          <Typography sx={{
            fontSize: isMobile ? 13 : 14,
            fontWeight: 700,
            color: '#1a1a1a',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            mb: 2,
            pb: 0.75,
            borderBottom: '1px solid #e0e0e0',
          }}>
            {section.heading}
          </Typography>

          {/* Articles */}
          {section.articles.map((article, ai) => (
            <Box key={ai} sx={{ mb: ai === section.articles.length - 1 ? 2.5 : 2.5 }}>
              <Typography sx={{ fontSize: isMobile ? 10 : 11, color: '#757575', mb: 0.5 }}>
                {article.source} · {article.date}
              </Typography>
              <Typography
                component="a"
                href="#"
                onClick={e => e.preventDefault()}
                sx={{
                  fontSize: isMobile ? 13 : 14,
                  fontWeight: 600,
                  color: '#1a5276',
                  textDecoration: 'none',
                  display: 'block',
                  mb: 0.5,
                  lineHeight: 1.4,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {article.headline}
              </Typography>
              <Typography sx={{ fontSize: isMobile ? 12 : 13, color: '#444', lineHeight: 1.6 }}>
                {article.snippet}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}

      {/* Footer */}
      <Box sx={{ bgcolor: '#f5f5f5', px: isMobile ? 2.5 : 4, py: 2.5, mt: 1, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 11, color: '#9e9e9e', mb: 0.5 }}>
          © 2025 Meltwater. All Rights Reserved.
        </Typography>
        <Typography sx={{ fontSize: 10, color: '#bdbdbd', mb: 1 }}>
          PENN 1, 1 Pennsylvania Plaza, Meltwater Suite 4125, New York, NY 10119, USA
        </Typography>
        <Typography sx={{ fontSize: 11, color: '#9e9e9e' }}>
          To unsubscribe from this newsletter{' '}
          <Box
            component="a"
            href="#"
            onClick={e => e.preventDefault()}
            sx={{ color: '#00827F', textDecoration: 'underline', fontSize: 11 }}
          >
            Click Here
          </Box>
        </Typography>
      </Box>
    </Box>
  )
}

// ── Main preview page ─────────────────────────────────────────────────────────
export default function MwNewslettersPreviewPage() {
  const { seriesId } = useParams()
  const [isMobile, setIsMobile] = useState(false)

  const series = SERIES_META[seriesId] || FALLBACK_SERIES

  // Format today's date
  const now = new Date()
  const dateStr = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${String(now.getFullYear()).slice(2)}`

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f0f0f0' }}>

      {/* ── Top toolbar ── */}
      <Box sx={{
        height: 56,
        bgcolor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        px: 2.5,
        gap: 1.5,
        flexShrink: 0,
      }}>
        {/* Meltwater logo mark */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
          <Box sx={{
            width: 28, height: 28, borderRadius: '6px',
            bgcolor: '#00827F',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1 }}>M</Typography>
          </Box>
        </Box>

        <Typography sx={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a', flex: 1 }}>
          Preview your Newsletter
        </Typography>

        {/* Viewport toggle */}
        <Box sx={{ display: 'flex', gap: 0.25, bgcolor: '#f5f5f5', borderRadius: '6px', p: 0.25 }}>
          <Tooltip title="Desktop">
            <IconButton
              size="small"
              onClick={() => setIsMobile(false)}
              sx={{
                borderRadius: '4px',
                bgcolor: !isMobile ? '#ffffff' : 'transparent',
                boxShadow: !isMobile ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                color: !isMobile ? '#00827F' : '#9e9e9e',
                '&:hover': { bgcolor: !isMobile ? '#ffffff' : 'rgba(0,0,0,0.04)' },
                transition: 'all 0.15s',
              }}
            >
              <DesktopWindowsOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mobile">
            <IconButton
              size="small"
              onClick={() => setIsMobile(true)}
              sx={{
                borderRadius: '4px',
                bgcolor: isMobile ? '#ffffff' : 'transparent',
                boxShadow: isMobile ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                color: isMobile ? '#00827F' : '#9e9e9e',
                '&:hover': { bgcolor: isMobile ? '#ffffff' : 'rgba(0,0,0,0.04)' },
                transition: 'all 0.15s',
              }}
            >
              <SmartphoneOutlinedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Close */}
        <Tooltip title="Close preview">
          <IconButton size="small" onClick={() => window.close()} sx={{ color: 'text.secondary', ml: 0.5 }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── Email preview area ── */}
      <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>

        {/* Email envelope header card */}
        <Box sx={{
          width: isMobile ? 375 : 640,
          maxWidth: 'calc(100% - 48px)',
          bgcolor: '#ffffff',
          border: '1px solid #e0e0e0',
          borderRadius: '2px 2px 0 0',
          px: 3,
          py: 2,
          mb: 0,
        }}>
          <Typography sx={{ fontSize: 14, color: '#9e9e9e', mb: 1 }}>
            {series.subject}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 0.5 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Meltwater</Typography>
            <Typography sx={{ fontSize: 12, color: '#757575' }}>&lt;newsletters@meltwater.com&gt;</Typography>
          </Box>
          <Typography sx={{ fontSize: 12, color: '#9e9e9e' }}>
            to {series.recipientList}
          </Typography>
        </Box>

        {/* Newsletter body */}
        <Box sx={{ width: isMobile ? 375 : 640, maxWidth: 'calc(100% - 48px)' }}>
          <NewsletterBody series={series} date={dateStr} isMobile={isMobile} />
        </Box>

      </Box>
    </Box>
  )
}
