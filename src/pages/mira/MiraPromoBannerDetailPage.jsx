import { useState } from 'react'
import { Box, Typography, Alert, Link as MuiLink } from '@mui/material'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import { MiraPromoBanner } from '../../components/mira'
import {
  MiraDetailPageLayout,
  MiraVariantSection,
  MiraPropsTable,
  MiraCodeBlock,
} from '../../components/mira/layout'

function MiraPromoBannerDetailPage() {
  const [dismissed, setDismissed] = useState(false)
  const [actionClicked, setActionClicked] = useState('')

  return (
    <MiraDetailPageLayout
      title="MiraPromoBanner"
      description="Feature announcement banner with subtle purple gradient. Used to promote new Mira features like Projects. Now uses MiraButton for gradient CTA."
    >
      <MiraVariantSection title="Default">
        {actionClicked && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Action clicked: {actionClicked}
          </Alert>
        )}
        <MiraPromoBanner
          icon={<FolderOutlinedIcon />}
          title="Introducing Mira Projects"
          description="Tell us more about who you are and leverage your existing searches and filters to improve results"
          actionLabel="Try Now"
          onAction={() => setActionClicked('Mira Projects - Try Now')}
        />
      </MiraVariantSection>

      <MiraVariantSection title="With Gradient Border">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Use the `gradientBorder` prop to add a pink-to-teal gradient border around the entire banner for extra emphasis.
        </Typography>
        <MiraPromoBanner
          icon={<AutoAwesomeOutlinedIcon />}
          title="New: AI-Powered Insights"
          description="Get smarter recommendations based on your usage patterns"
          actionLabel="Learn More"
          onAction={() => setActionClicked('AI Insights - Learn More')}
          gradientBorder
        />
      </MiraVariantSection>

      <MiraVariantSection title="With Dismiss Button">
        {!dismissed ? (
          <MiraPromoBanner
            icon={<AutoAwesomeOutlinedIcon />}
            title="Try the New Feature"
            description="Discover enhanced AI capabilities in your workflow"
            actionLabel="Explore"
            onAction={() => setActionClicked('Explore feature')}
            onDismiss={() => setDismissed(true)}
          />
        ) : (
          <Alert severity="success" action={
            <MuiLink component="button" onClick={() => setDismissed(false)} sx={{ cursor: 'pointer' }}>
              Reset
            </MuiLink>
          }>
            Banner dismissed!
          </Alert>
        )}
      </MiraVariantSection>

      <MiraVariantSection title="Gradient Border + Dismiss">
        <MiraPromoBanner
          icon={<RocketLaunchOutlinedIcon />}
          title="Quick Start Guide"
          description="Get up and running with Mira in just 5 minutes"
          actionLabel="Start Tour"
          onAction={() => setActionClicked('Quick Start')}
          onDismiss={() => {}}
          gradientBorder
        />
      </MiraVariantSection>

      <MiraVariantSection title="Different Icons">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <MiraPromoBanner
            icon={<RocketLaunchOutlinedIcon />}
            title="Launch Faster"
            description="Streamline your workflow with AI-powered automation"
            actionLabel="Get Started"
            onAction={() => setActionClicked('Launch Faster')}
          />
          <MiraPromoBanner
            icon={<AutoAwesomeOutlinedIcon />}
            title="Pro Tips"
            description="Discover advanced features to boost your productivity"
            actionLabel="View Tips"
            onAction={() => setActionClicked('Pro Tips')}
            gradientBorder
          />
        </Box>
      </MiraVariantSection>

      <MiraVariantSection title="Without Action Button">
        <MiraPromoBanner
          icon={<FolderOutlinedIcon />}
          title="Coming Soon"
          description="We're working on something exciting. Stay tuned for updates!"
        />
      </MiraVariantSection>

      <MiraPropsTable
        props={[
          { name: 'icon', type: 'ReactNode', description: 'Icon element displayed in purple-tinted box' },
          { name: 'title', type: 'string', description: 'Banner title (displayed in secondary color)' },
          { name: 'description', type: 'string', description: 'Banner description text' },
          { name: 'actionLabel', type: 'string', description: 'Action button label (optional)' },
          { name: 'onAction', type: '() => void', description: 'Action button click handler (optional)' },
          { name: 'onDismiss', type: '() => void', description: 'Dismiss button handler, shows X button when provided (optional)' },
          { name: 'gradientBorder', type: 'boolean', description: 'Show pink-to-teal gradient border around banner. Default: false' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <MiraVariantSection title="Usage Example">
        <MiraCodeBlock
          code={`import { MiraPromoBanner } from '../components/mira'

// Default banner with gradient button
<MiraPromoBanner
  icon={<FolderOutlinedIcon />}
  title="Introducing Mira Projects"
  description="Leverage your existing searches to improve results"
  actionLabel="Try Now"
  onAction={() => navigate('/studio/projects')}
/>

// With gradient border for emphasis
<MiraPromoBanner
  icon={<AutoAwesomeOutlinedIcon />}
  title="New AI Feature"
  description="Discover enhanced capabilities"
  actionLabel="Learn More"
  onAction={() => {}}
  gradientBorder
/>

// With dismiss button
<MiraPromoBanner
  icon={<FolderOutlinedIcon />}
  title="Dismissible Banner"
  description="This can be closed by the user"
  actionLabel="Try Now"
  onAction={() => {}}
  onDismiss={() => setShowBanner(false)}
  gradientBorder
/>`}
        />
      </MiraVariantSection>
    </MiraDetailPageLayout>
  )
}

export default MiraPromoBannerDetailPage
