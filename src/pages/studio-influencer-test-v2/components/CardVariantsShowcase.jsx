import { Box, Typography } from '@mui/material'
import {
  JournalistRowCard,
  SocialStatsCard,
  ContactProfileCard,
  PublicationCard,
  MediaOutletCard,
  InternalUserCard,
} from './cards'

function CardVariantsShowcase() {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Journalist & Influencer Components
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Recommended card patterns for different contexts. Consolidated from 12 variants found across the app.
      </Typography>

      <Box sx={{ display: 'grid', gap: 5 }}>
        {/* Browse/Search Results */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Browse / Search Results
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Journalist Row Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Primary card for list views. Shows name, title, location, publication, beats, social links, and contact info. Supports checkbox for bulk actions.
            </Typography>
          </Box>
          <JournalistRowCard data={{ name: 'Veronika Bondarenko', verified: true, title: 'Aviation Writer', location: 'New York City, NY', publication: 'TheStreet', beats: ['Aviation (general)'], platforms: ['linkedin', 'facebook', 'instagram'], email: 'veronika.bondarenko@thestreet.com', openRate: 'N/A' }} />
        </Box>

        {/* Quick Preview / Metrics */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Quick Preview / Metrics
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Social Stats Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Compact card for showing reach and activity metrics. Good for inline chat results, hover previews, or when space is limited.
            </Typography>
          </Box>
          <SocialStatsCard data={{ name: 'Tom Warren', handle: 'tomtech', verified: true, reach: '41,525,376', posts: '1', platforms: ['twitter', 'facebook', 'linkedin'] }} />
        </Box>

        {/* Profile Detail */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Profile Detail / Contact
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Contact Profile Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Expanded view focused on contact information. Larger avatar, prominent email with copy button. Use when user drills into a specific person.
            </Typography>
          </Box>
          <ContactProfileCard data={{ name: 'Kim Adams', verified: true, title: 'Journalist And Editor', email: 'kim.adams@camra.org.uk' }} />
        </Box>

        {/* Publication Focus */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Publication Focus
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Publication Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Emphasizes the journalist's publication relationship. Shows publication as a link, role chip, beats as text. Good when publication context matters.
            </Typography>
          </Box>
          <PublicationCard data={{ name: 'Noor Nanji', verified: true, role: 'Culture Reporter', publication: 'BBC', beats: 'Culture & Society, Local news, Social issues', platforms: ['twitter', 'linkedin'] }} />
        </Box>

        {/* Media Outlets */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Media Outlets / Brands
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Media Outlet Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              For organization/brand entities rather than individuals. Shows outlet name, handle, and all social channel presence.
            </Typography>
          </Box>
          <MediaOutletCard data={{ name: 'Bloomberg Television', handle: 'FTLconnex', verified: true, platforms: ['youtube', 'instagram', 'linkedin', 'facebook'] }} />
        </Box>

        {/* Internal Users */}
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Internal Users (Different Context)
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Internal User Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              For internal team members, not external journalists. Shows team membership, last active status, and action buttons. Supports warning state for issues.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <InternalUserCard data={{ name: 'David Patel', verified: true, email: 'david.patel@example.com', teams: ['APAC', 'Product', '+1'], lastActive: '1 hour ago' }} />
            <InternalUserCard data={{ name: 'Bob Johnson', warning: true, email: 'bob.johnson@example.com', teams: ['EMEA', 'Marketing', '+2'], lastActive: '5 hours ago' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CardVariantsShowcase
