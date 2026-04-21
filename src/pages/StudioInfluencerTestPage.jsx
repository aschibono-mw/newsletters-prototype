import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  Paper,
  Divider,
  Link,
  Tooltip,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
} from '@mui/material'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import SendIcon from '@mui/icons-material/Send'
import VerifiedIcon from '@mui/icons-material/Verified'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import AppsIcon from '@mui/icons-material/Apps'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import StopIcon from '@mui/icons-material/Stop'

// Social icons (using emoji placeholders for demo)
const SocialIcon = ({ platform, size = 20 }) => {
  const icons = {
    twitter: 'X',
    facebook: 'f',
    linkedin: 'in',
    youtube: 'YT',
    instagram: 'IG',
    pinterest: 'P',
    substack: 'S',
    tiktok: 'TT',
  }
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.5,
        fontWeight: 600,
        color: 'text.secondary',
      }}
    >
      {icons[platform] || '?'}
    </Box>
  )
}

// ==============================================================================
// JOURNALIST/INFLUENCER CARD VARIANTS
// ==============================================================================

// Variant 1: Media Outlet Card (Bloomberg Television style)
function MediaOutletCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 48, height: 48, backgroundColor: 'primary.main', fontSize: '1.25rem', fontWeight: 700 }}>
          {data.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem' }}>
            @{data.handle}
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} />
          ))}
        </Box>
      </Box>
    </Paper>
  )
}

// Variant 2: Reach Stats Card (GROK style)
function ReachStatsCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 40, height: 40, backgroundColor: 'grey.300' }}>
          {data.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{data.name}</Typography>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.75rem' }}>
            @{data.handle}
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">Reach:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.reach}</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">Number of Posts:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.posts}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

// Variant 3: Podcaster/Influencer Card (Ezra Klein style)
function PodcasterCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            {data.role && (
              <Chip label={data.role} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {data.beats}
          </Typography>
          <Link href="#" underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.875rem' }}>
            View articles and details
            <OpenInNewIcon sx={{ fontSize: 14 }} />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} />
          ))}
        </Box>
      </Box>
    </Paper>
  )
}

// Variant 4: Contact Profile Card (Kim Adams style)
function ContactProfileCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Contact profile</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 64, height: 64 }} src={data.avatar}>
          {data.name.charAt(0)}
        </Avatar>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 18, color: 'primary.main' }} />}
          </Box>
          <Typography variant="body2" color="text.secondary">{data.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Link href={`mailto:${data.email}`} underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem' }}>
              {data.email}
            </Link>
            <IconButton size="small" sx={{ p: 0.25 }}>
              <ContentCopyIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

// Variant 5: Journalist Row Card (Veronika Bondarenko style)
function JournalistRowCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Checkbox size="small" sx={{ mt: -0.5, ml: -1 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            <Typography variant="body2" color="text.secondary">
              {data.title} · {data.location}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {data.publication}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {data.beats?.map((beat, i) => (
              <Chip key={i} label={beat} size="small" variant="outlined" sx={{ height: 24, fontSize: '0.75rem' }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} />
          ))}
        </Box>
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {data.openRate ? `${data.openRate} open rate` : 'N/A open rate'}
        </Typography>
        <Typography variant="caption">·</Typography>
        <Link href={`mailto:${data.email}`} underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.75rem' }}>
          {data.email}
          <ContentCopyIcon sx={{ fontSize: 12 }} />
        </Link>
      </Box>
    </Paper>
  )
}

// Variant 6: Compact Row Card (Dag Hellesund style)
function CompactRowCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Checkbox size="small" />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Link href="#" underline="hover" sx={{ fontWeight: 600, color: 'primary.main' }}>{data.name}</Link>
            {data.verified && <VerifiedIcon sx={{ fontSize: 14, color: 'primary.main' }} />}
            <Typography variant="body2" color="text.secondary">
              {data.title} · {data.location}
            </Typography>
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem' }}>
            {data.publication}
          </Link>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
            {data.beats?.map((beat, i) => (
              <Chip key={i} label={beat} size="small" variant="outlined" sx={{ height: 22, fontSize: '0.7rem' }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} size={18} />
          ))}
          <Button size="small" variant="outlined" sx={{ ml: 1, textTransform: 'none', fontSize: '0.75rem' }}>
            Add to list
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

// Variant 7: Social Stats Card (Tom Warren style)
function SocialStatsCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 48, height: 48 }} src={data.avatar}>
          {data.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem' }}>
            @{data.handle}
          </Link>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} />
          ))}
        </Box>
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Reach:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.reach}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Number of Posts:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{data.posts}</Typography>
          </Box>
        </Box>
        <Link href="#" underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.875rem' }}>
          View details
          <OpenInNewIcon sx={{ fontSize: 14 }} />
        </Link>
      </Box>
    </Paper>
  )
}

// Variant 8: Internal User Card (David Patel style - with last active)
function InternalUserCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Checkbox size="small" sx={{ mt: -0.5, ml: -1 }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            {data.warning && <WarningAmberIcon sx={{ fontSize: 16, color: 'warning.main' }} />}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {data.email}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              icon={<GroupsOutlinedIcon sx={{ fontSize: 14 }} />}
              label={data.teams?.join(', ')}
              size="small"
              sx={{ height: 24, fontSize: '0.75rem' }}
            />
            <Typography variant="caption" color="text.secondary">
              Last active {data.lastActive}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small"><PersonAddOutlinedIcon sx={{ fontSize: 18 }} /></IconButton>
          <IconButton size="small"><EditOutlinedIcon sx={{ fontSize: 18 }} /></IconButton>
          <IconButton size="small"><MoreVertIcon sx={{ fontSize: 18 }} /></IconButton>
        </Box>
      </Box>
    </Paper>
  )
}

// Variant 9: Publication Card (Noor Nanji / BBC style)
function PublicationCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Avatar sx={{ width: 32, height: 32, backgroundColor: 'grey.100', color: 'text.secondary', fontSize: '0.875rem' }}>
          {data.publication?.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            <Chip label={data.role} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem', display: 'block', mb: 1 }}>
            {data.publication}
          </Link>
          <Typography variant="body2" color="text.secondary">
            {data.beats}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {data.platforms?.map((platform, i) => (
              <SocialIcon key={i} platform={platform} size={18} />
            ))}
          </Box>
          <Link href="#" underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.75rem' }}>
            View articles and details
            <OpenInNewIcon sx={{ fontSize: 12 }} />
          </Link>
        </Box>
      </Box>
    </Paper>
  )
}

// Variant 10: Rich Profile Card (Mariella Moon / Engadget style)
function RichProfileCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Avatar sx={{ width: 48, height: 48 }} src={data.avatar}>
          {data.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            <Chip label={data.role} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem', display: 'block', mb: 1 }}>
            {data.publication}
          </Link>
          <Typography variant="body2" color="text.secondary">
            {data.beats}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {data.platforms?.map((platform, i) => (
              <SocialIcon key={i} platform={platform} size={18} />
            ))}
          </Box>
          <Link href="#" underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'primary.main', fontSize: '0.75rem' }}>
            View articles and details
            <OpenInNewIcon sx={{ fontSize: 12 }} />
          </Link>
        </Box>
      </Box>
    </Paper>
  )
}

// Variant 11: Location Card (Alexander Bird style)
function LocationCard({ data }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Checkbox size="small" sx={{ mt: 0.5 }} />
        <Avatar sx={{ width: 40, height: 40 }} src={data.avatar}>
          {data.name.charAt(0)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{data.name}</Typography>
            {data.verified && <VerifiedIcon sx={{ fontSize: 16, color: 'primary.main' }} />}
            <Typography variant="body2" color="text.secondary">
              {data.title} · {data.location}
            </Typography>
          </Box>
          <Link href="#" underline="hover" sx={{ color: 'primary.main', fontSize: '0.875rem', display: 'block', mb: 1 }}>
            {data.publication}
          </Link>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {data.beats?.map((beat, i) => (
              <Chip key={i} label={beat} size="small" variant="outlined" sx={{ height: 24, fontSize: '0.75rem' }} />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary">
            {data.articleCount} Relevant Articles
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {data.platforms?.map((platform, i) => (
            <SocialIcon key={i} platform={platform} size={18} />
          ))}
        </Box>
      </Box>
    </Paper>
  )
}

// ==============================================================================
// MOCK DATA
// ==============================================================================

const MOCK_JOURNALISTS = {
  sarahChen: {
    name: 'Sarah Chen',
    handle: 'sarahchen_tech',
    verified: true,
    title: 'Tech Journalist',
    publication: 'TechCrunch',
    location: 'San Francisco, CA',
    email: 'sarah.chen@techcrunch.com',
    beats: ['AI and enterprise software', 'Startups'],
    platforms: ['twitter', 'linkedin'],
    followers: '45K',
    reach: '45,000',
    posts: '1,234',
    lastActive: '2 hours ago',
  },
  marcusWebb: {
    name: 'Marcus Webb',
    handle: 'marcuswebb',
    verified: true,
    title: 'Climate Tech Reporter',
    publication: 'Forbes',
    location: 'New York, NY',
    email: 'marcus.webb@forbes.com',
    beats: ['Climate tech', 'Carbon capture', 'Startups'],
    platforms: ['twitter', 'linkedin', 'substack'],
    followers: '34K',
    reach: '34,000',
    posts: '892',
    twitterFollowers: '34K followers, posts 2-3x daily',
    linkedinFollowers: '8K followers, posts weekly (longer thought leadership pieces)',
    substackSubscribers: '2.1K subscribers, monthly newsletter',
  },
  priyaSharma: {
    name: 'Priya Sharma',
    handle: 'priya_cleantech',
    verified: true,
    title: 'Energy Reporter',
    publication: 'Bloomberg Green',
    location: 'London, UK',
    email: 'priya.sharma@bloomberg.com',
    beats: ['EV battery recycling', 'Clean energy'],
    platforms: ['twitter', 'linkedin'],
    followers: '28K',
    reach: '28,000',
    posts: '756',
  },
  tomEriksson: {
    name: 'Tom Eriksson',
    handle: 'tomeriksson',
    verified: false,
    title: 'Cleantech Correspondent',
    publication: 'Sifted',
    location: 'Stockholm, Sweden',
    email: 'tom.eriksson@sifted.eu',
    beats: ['Cleantech funding'],
    platforms: ['twitter', 'linkedin'],
    followers: '12K',
    reach: '12,000',
    posts: '445',
  },
  jamesOkonkwo: {
    name: 'James Okonkwo',
    handle: 'jamesokonkwo',
    verified: true,
    title: 'Fintech Reporter',
    publication: 'Multiple',
    location: 'London, UK',
    email: 'james.okonkwo@email.com',
    beats: ['Fintech', 'Neobanks'],
    platforms: ['twitter', 'linkedin', 'instagram'],
    followers: '120K',
    reach: '120,000',
    posts: '2,341',
  },
  chloeMartin: {
    name: 'Chloe Martin',
    handle: 'chloemartin',
    verified: true,
    title: 'Lifestyle & Sustainability',
    publication: 'Independent',
    location: 'London, UK',
    email: 'chloe.martin@independent.co.uk',
    beats: ['Lifestyle', 'Sustainability'],
    platforms: ['instagram', 'youtube', 'tiktok'],
    followers: '89K',
    reach: '89,000',
    posts: '1,567',
  },
  devPatel: {
    name: 'Dev Patel',
    handle: 'devpatel_startup',
    verified: true,
    title: 'Startup Founder & Thought Leader',
    publication: 'Self',
    location: 'London, UK',
    email: 'dev@patel.io',
    beats: ['Startups', 'Industry thought leadership'],
    platforms: ['twitter', 'linkedin'],
    followers: '67K',
    reach: '67,000',
    posts: '890',
  },
  lenaFischer: {
    name: 'Lena Fischer',
    handle: 'lenafischer',
    verified: true,
    title: 'Senior Reporter',
    publication: 'Finance Forward',
    location: 'Berlin, Germany',
    email: 'lena.fischer@financeforward.de',
    beats: ['Neobanks', 'Payments'],
    platforms: ['twitter', 'linkedin'],
    followers: '15K',
    reach: '15,000',
    posts: '534',
  },
  kaiMueller: {
    name: 'Kai Mueller',
    handle: 'kaimueller',
    verified: false,
    title: 'Freelance Writer',
    publication: 'Freelance',
    location: 'Berlin, Germany',
    email: 'kai.mueller@freelance.de',
    beats: ['N26 turnaround', 'Fintech'],
    platforms: ['twitter'],
    followers: '8K',
    reach: '8,000',
    posts: '234',
  },
  sofiaBergmann: {
    name: 'Sofia Bergmann',
    handle: 'sofiabergmann',
    verified: true,
    title: 'DACH Correspondent',
    publication: 'Sifted',
    location: 'Berlin, Germany',
    email: 'sofia.bergmann@sifted.eu',
    beats: ['Fintech', 'DACH region'],
    platforms: ['twitter', 'linkedin'],
    followers: '11K',
    reach: '11,000',
    posts: '345',
  },
  carolinaMejia: {
    name: 'Carolina Mejia',
    handle: 'carolinamejia',
    verified: true,
    title: 'Tech Reporter',
    publication: 'Contxto',
    location: 'Mexico City, Mexico',
    email: 'carolina@contxto.com',
    beats: ['Startups', 'Tech (Spanish and English)'],
    platforms: ['twitter', 'linkedin'],
    followers: '22K',
    reach: '22,000',
    posts: '678',
  },
  lucasFerriera: {
    name: 'Lucas Ferreira',
    handle: 'lucasferreira',
    verified: true,
    title: 'Fintech Reporter',
    publication: 'NeoFeed',
    location: 'Sao Paulo, Brazil',
    email: 'lucas@neofeed.com.br',
    beats: ['Fintech (Portuguese)'],
    platforms: ['twitter', 'linkedin'],
    followers: '18K',
    reach: '18,000',
    posts: '445',
  },
  diegoOrozco: {
    name: 'Diego Orozco',
    handle: 'diegoorozco',
    verified: false,
    title: 'Freelance',
    publication: 'TechCrunch (LATAM contributor)',
    location: 'Buenos Aires, Argentina',
    email: 'diego.orozco@email.com',
    beats: ['VC funding', 'LATAM'],
    platforms: ['twitter', 'linkedin'],
    followers: '9K',
    reach: '9,000',
    posts: '234',
  },
}

// ==============================================================================
// TOOL INVOCATION CARD (Fake Stub for Prototyping)
// ==============================================================================

// Activity log item component
function ActivityItem({ icon, text, tag, isComplete, isActive }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 0.5,
        pl: 0.5,
        borderLeft: isActive ? '2px solid' : '2px solid transparent',
        borderColor: isActive ? 'primary.main' : 'transparent',
        backgroundColor: isActive ? 'rgba(0, 130, 127, 0.04)' : 'transparent',
        borderRadius: isActive ? '0 4px 4px 0' : 0,
      }}
    >
      <Box sx={{ color: isComplete ? 'success.main' : 'primary.main', display: 'flex' }}>
        {icon}
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: isComplete ? 'text.secondary' : isActive ? 'text.primary' : 'text.secondary',
        }}
      >
        {text}
      </Typography>
      {tag && (
        <Chip
          label={tag}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.7rem',
            backgroundColor: 'grey.100',
            color: 'text.secondary',
          }}
        />
      )}
    </Box>
  )
}

function ToolInvocationCard({
  title = 'Search complete',
  subtitle,
  sourcesCount = 3,
  isComplete = true,
  progress = 100,
  activityItems = [],
}) {
  const [showActivity, setShowActivity] = useState(false)

  // Default activity items if none provided
  const defaultActivityItems = [
    { icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 16 }} />, text: 'Understanding your query...', isComplete: true },
    { icon: <MenuBookOutlinedIcon sx={{ fontSize: 16 }} />, text: 'Searching influencer database', tag: 'influencers', isComplete: true },
    { icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />, text: 'Found relevant profiles', isComplete: true },
    { icon: <MenuBookOutlinedIcon sx={{ fontSize: 16 }} />, text: 'Enriching profile data', tag: 'social-data', isComplete: true },
    { icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />, text: 'Search complete', isComplete: true },
  ]

  const activities = activityItems.length > 0 ? activityItems : defaultActivityItems

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ px: 2.5, pt: 2, pb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          <Box sx={{ color: isComplete ? 'success.main' : 'primary.main', mt: 0.25 }}>
            {isComplete ? (
              <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
            ) : (
              <MenuBookOutlinedIcon sx={{ fontSize: 20 }} />
            )}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`${sourcesCount} sources`}
              size="small"
              variant="outlined"
              sx={{
                height: 28,
                borderColor: 'divider',
                backgroundColor: 'background.paper',
              }}
            />
            {!isComplete && (
              <IconButton size="small" sx={{ backgroundColor: 'grey.100' }}>
                <StopIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Progress bar */}
        <Box
          sx={{
            mt: 1.5,
            height: 4,
            borderRadius: 2,
            backgroundColor: 'grey.200',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: 'primary.main',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </Box>
      </Box>

      {/* Activity toggle */}
      <Divider />
      <Button
        fullWidth
        onClick={() => setShowActivity(!showActivity)}
        endIcon={showActivity ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        sx={{
          py: 1,
          textTransform: 'none',
          color: 'text.secondary',
          fontWeight: 400,
          '&:hover': {
            backgroundColor: 'grey.50',
          },
        }}
      >
        {showActivity ? 'Hide activity' : 'Show activity'}
      </Button>

      {/* Activity log */}
      {showActivity && (
        <Box sx={{ px: 2.5, pb: 2, pt: 0.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {activities.map((item, index) => (
              <ActivityItem
                key={index}
                icon={item.icon}
                text={item.text}
                tag={item.tag}
                isComplete={item.isComplete}
                isActive={item.isActive}
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  )
}

// ==============================================================================
// CHAT MESSAGE COMPONENT
// ==============================================================================

// eslint-disable-next-line no-unused-vars
function ChatMessage({ role, children, showDivider: _showDivider = true, label }) {
  const isUser = role === 'user'
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: isUser ? 'text.primary' : 'primary.main',
            color: isUser ? 'common.white' : 'primary.contrastText',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          {isUser ? 'U' : <AutoAwesomeOutlinedIcon sx={{ fontSize: 18 }} />}
        </Avatar>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: '36px',
          }}
        >
          {label || (isUser ? 'You' : 'AI Assistant')}
        </Typography>
      </Box>
      <Box sx={{ color: 'text.primary', pl: 0 }}>
        {children}
      </Box>
    </Box>
  )
}

// ==============================================================================
// TEST FLOWS
// ==============================================================================

const TEST_FLOWS = [
  // AC1 - Search Flows
  {
    id: 'ac1-name',
    category: 'AC1',
    title: 'Search by Name',
    description: 'User searches for a specific journalist by name',
    userQuery: 'Find me Sarah Chen',
    render: () => (
      <>
        <ChatMessage role="user">Show me socials for tech influencer, Sarah Chen</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={3}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I found Sarah Chen, a tech journalist at TechCrunch covering AI and enterprise software. She has 45K followers on X and is based in San Francisco.
          </Typography>
          <SocialStatsCard data={MOCK_JOURNALISTS.sarahChen} />
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Would you like to see her recent articles or contact details?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac1-topic',
    category: 'AC1',
    title: 'Search by Recent Content (Topic)',
    description: 'User searches for journalists covering a specific topic',
    userQuery: "Who's been writing about climate tech lately?",
    render: () => (
      <>
        <ChatMessage role="user">Who's been writing about climate tech lately?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={5}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Here are 3 journalists who've recently covered climate tech:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>1. Marcus Webb</strong> – Published "The Rise of Carbon Capture Startups" 2 days ago (Forbes)
              </Typography>
              <PodcasterCard data={MOCK_JOURNALISTS.marcusWebb} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>2. Priya Sharma</strong> – Wrote about EV battery recycling last week (Bloomberg Green)
              </Typography>
              <PodcasterCard data={MOCK_JOURNALISTS.priyaSharma} />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>3. Tom Eriksson</strong> – Covers cleantech funding for Sifted, 4 articles this month
              </Typography>
              <PodcasterCard data={MOCK_JOURNALISTS.tomEriksson} />
            </Box>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want me to pull up more details on any of them?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac1-location',
    category: 'AC1',
    title: 'Search by Metadata (Location)',
    description: 'User searches for influencers in a specific location',
    userQuery: 'Show me influencers based in London',
    render: () => (
      <>
        <ChatMessage role="user">Show me influencers based in London</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={12}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Found 12 influencers based in London. Here are the top 3 by follower count:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <LocationCard data={{ ...MOCK_JOURNALISTS.jamesOkonkwo, articleCount: 34 }} />
            <LocationCard data={{ ...MOCK_JOURNALISTS.chloeMartin, articleCount: 28 }} />
            <LocationCard data={{ ...MOCK_JOURNALISTS.devPatel, articleCount: 19 }} />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Would you like to filter by industry or platform?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac1-multiple',
    category: 'AC1',
    title: 'Search by Multiple Criteria',
    description: 'User combines location and topic filters',
    userQuery: 'Find journalists in Berlin who cover fintech',
    render: () => (
      <>
        <ChatMessage role="user">Find journalists in Berlin who cover fintech</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={4}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Sure, I found 4 fintech journalists based in Berlin for you:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <JournalistRowCard data={MOCK_JOURNALISTS.lenaFischer} />
            <JournalistRowCard data={MOCK_JOURNALISTS.kaiMueller} />
            <JournalistRowCard data={MOCK_JOURNALISTS.sofiaBergmann} />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want me to add any other filters, like follower count or recent activity?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac1-no-results',
    category: 'AC1',
    title: 'No Results Handling',
    description: 'User searches for someone with no exact match',
    userQuery: 'Find me John Smith who writes about quantum computing',
    render: () => (
      <>
        <ChatMessage role="user">Find me John Smith who writes about quantum computing</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Box sx={{ mb: 3 }}>
            <ToolInvocationCard
              title="Search complete"
              sourcesCount={0}
              isComplete={true}
              progress={100}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Hmm, I found a few "John Smiths" but none that match quantum computing specifically. Could you help me narrow it down? Maybe you know:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">The publication they write for?</Typography></li>
            <li><Typography variant="body2">Their location or social handle?</Typography></li>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Alternatively, I can show you other journalists covering quantum computing if that helps!
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  // AC2 - Channel Flows
  {
    id: 'ac2-channel',
    category: 'AC2',
    title: 'Listed By Channel',
    description: 'User requests journalists on a specific platform',
    userQuery: 'Show me tech journalists on LinkedIn',
    render: () => (
      <>
        <ChatMessage role="user">Show me tech journalists on LinkedIn</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Here are tech journalists active on <strong>LinkedIn</strong>:
          </Typography>
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Followers</TableCell>
                  <TableCell>Recent Post</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Link href="#" underline="hover">Sarah Chen</Link>
                  </TableCell>
                  <TableCell>12K</TableCell>
                  <TableCell>Why AI agents are the next platform shift</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link href="#" underline="hover">Marcus Webb</Link>
                  </TableCell>
                  <TableCell>8K</TableCell>
                  <TableCell>5 climate startups to watch in 2025</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link href="#" underline="hover">Priya Sharma</Link>
                  </TableCell>
                  <TableCell>6K</TableCell>
                  <TableCell>The death of the traditional power grid</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want to see journalists on a different channel like Twitter or Substack?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'ac2-compare',
    category: 'AC2',
    title: 'Compare Across Channels',
    description: 'User asks where a journalist is most active',
    userQuery: 'Where is Marcus Webb most active?',
    render: () => (
      <>
        <ChatMessage role="user">Where is Marcus Webb most active?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Marcus Webb is on a few platforms, here's the breakdown:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Twitter:</strong> 34K followers, posts 2-3x daily</Typography></li>
            <li><Typography variant="body2"><strong>LinkedIn:</strong> 8K followers, posts weekly (longer thought leadership pieces)</Typography></li>
            <li><Typography variant="body2"><strong>Substack:</strong> 2.1K subscribers, monthly newsletter</Typography></li>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Looks like Twitter is his go-to for quick takes, while LinkedIn is where he shares deeper analysis.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want me to pull his recent content from any of these?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  // Edge Cases
  {
    id: 'edge-fuzzy',
    category: 'Edge',
    title: 'Fuzzy Match with Misspelled Name',
    description: 'User misspells a name and system suggests corrections',
    userQuery: 'Find me Sara Chen',
    render: () => (
      <>
        <ChatMessage role="user">Find me Sara Chen</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Did you mean <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>Sarah Chen</Link> from TechCrunch? I also found a <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>Sara Cheng</Link> who covers healthcare at STAT News.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Let me know which one you're looking for!
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-too-many',
    category: 'Edge',
    title: 'Too Many Results',
    description: 'Query returns too many results, system asks for refinement',
    userQuery: 'Show me journalists who cover startups',
    render: () => (
      <>
        <ChatMessage role="user">Show me journalists who cover startups</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            That's a popular beat – I found 200+ journalists covering startups! To give you the most relevant results, could you narrow it down a bit?
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">Any specific region? (e.g., US, Europe, APAC)</Typography></li>
            <li><Typography variant="body2">A particular stage? (e.g., seed, Series A, late-stage)</Typography></li>
            <li><Typography variant="body2">Industry focus? (e.g., fintech, health, SaaS)</Typography></li>
          </Box>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-wrong-channel',
    category: 'Edge',
    title: 'Person Not on Requested Channel',
    description: 'User asks for journalist on a platform they are not active on',
    userQuery: 'Show me Sarah Chen on TikTok',
    render: () => (
      <>
        <ChatMessage role="user">Show me Sarah Chen on TikTok</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            It looks like Sarah Chen isn't active on TikTok – but she does have a strong presence on <strong>Twitter</strong> (45K followers) and <strong>LinkedIn</strong> (13K).
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Would either of those work for you?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-ambiguous',
    category: 'Edge',
    title: 'Ambiguous Query',
    description: 'User asks a vague question that needs clarification',
    userQuery: "Who's popular right now?",
    render: () => (
      <>
        <ChatMessage role="user">Who's popular right now?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I'd love to help – could you give me a bit more context? Are you looking for:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">Journalists trending in a specific topic?</Typography></li>
            <li><Typography variant="body2">Influencers with the fastest-growing followings?</Typography></li>
            <li><Typography variant="body2">People with the most engagement this week?</Typography></li>
          </Box>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-no-contact',
    category: 'Edge',
    title: 'Contact Info Unavailable',
    description: 'User asks for email but its not available',
    userQuery: "What's Priya Sharma's email?",
    render: () => (
      <>
        <ChatMessage role="user">What's Priya Sharma's email?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Unfortunately, I don't have Priya Sharma's email on file (she keeps that private). I can give you her <Link href="#" underline="hover">Twitter DMs</Link> (open) or her <Link href="#" underline="hover">LinkedIn profile</Link> if you'd like to reach out there instead.
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-stale',
    category: 'Edge',
    title: 'Stale/Outdated Profile',
    description: 'Journalist has changed roles or publications',
    userQuery: 'Find me Jake Morrison at The Verge',
    render: () => (
      <>
        <ChatMessage role="user">Find me Jake Morrison at The Verge</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I found Jake Morrison, but heads up – it looks like he left The Verge about 3 months ago. According to recent activity, he's now freelancing and publishing on Substack.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Want me to pull up his current profile?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-inactive',
    category: 'Edge',
    title: 'Inactive/Dormant Profile',
    description: 'Journalist hasnt posted in a while',
    userQuery: 'Find me Rachel Torres',
    render: () => (
      <>
        <ChatMessage role="user">Find me Rachel Torres</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I found <Link href="#" underline="hover" sx={{ fontWeight: 600 }}>Rachel Torres</Link>; she used to cover crypto for CoinDesk. Just a heads up though, her last post was about 8 months ago and her accounts have been pretty quiet since.
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Would you still like her details, or should I suggest some active journalists in that space instead?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-time-based',
    category: 'Edge',
    title: 'Time-Based Query',
    description: 'User asks about coverage from a specific time period',
    userQuery: 'Who covered the OpenAI drama back in November?',
    render: () => (
      <>
        <ChatMessage role="user">Who covered the OpenAI drama back in November?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Ah, that was a wild news cycle! Here are a few journalists who were all over it:
          </Typography>
          <Box component="ol" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Kara Swisher</strong> – Broke several insider scoops on Twitter/X</Typography></li>
            <li><Typography variant="body2"><strong>Will Knight</strong> – Wrote a detailed timeline piece for WIRED</Typography></li>
            <li><Typography variant="body2"><strong>Casey Newton</strong> – Covered the fallout extensively on Platformer</Typography></li>
          </Box>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-followup',
    category: 'Edge',
    title: 'Follow-Up on Previous Search',
    description: 'User refines a previous search',
    userQuery: 'Actually, go back to that London list – who covers healthcare?',
    render: () => (
      <>
        <ChatMessage role="user">Actually, go back to that London list – who covers healthcare?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Good call! From the London influencers I showed you earlier, here's who focuses on healthcare:
          </Typography>
          <Box component="ol" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Dr. Aisha Patel</strong> – NHS policy and digital health, 42K followers</Typography></li>
            <li><Typography variant="body2"><strong>Ben Hartley</strong> – Biotech investing, 28K followers</Typography></li>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            The others were more fintech and lifestyle-focused. Want the full London list again with industry tags?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-duplicates',
    category: 'Edge',
    title: 'Duplicate Profiles',
    description: 'System finds multiple profiles that might be the same person',
    userQuery: "I'm seeing two Marcus Webbs – which is the real one?",
    render: () => (
      <>
        <ChatMessage role="user">I'm seeing two Marcus Webbs – which is the real one?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Good catch! There are indeed two profiles:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Marcus Webb (Verified)</strong> – Forbes contributor, 34K Twitter followers, consistent posting history</Typography></li>
            <li><Typography variant="body2"><strong>Marcus Webb</strong> – Smaller account, 1.2K followers, hasn't posted since 2022</Typography></li>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            The first one is almost certainly who you're looking for. Want me to merge these or hide the inactive one from future searches?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-alternatives',
    category: 'Edge',
    title: 'Requesting Alternatives',
    description: 'User asks for similar journalists when one is unavailable',
    userQuery: "Sarah Chen isn't responding – who else covers AI like her?",
    render: () => (
      <>
        <ChatMessage role="user">Sarah Chen isn't responding – who else covers AI like her?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            No worries, here are a few journalists with similar beats and reach:
          </Typography>
          <Box component="ol" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Emily Zhang</strong> – VentureBeat, focuses on enterprise AI – very responsive to pitches</Typography></li>
            <li><Typography variant="body2"><strong>David Park</strong> – The Information, covers AI funding rounds</Typography></li>
            <li><Typography variant="body2"><strong>Nisha Patel</strong> – MIT Tech Review, more technical/research angle</Typography></li>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Any of these feel like a good fit? I can also filter by response rate if that helps.
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-conflicting',
    category: 'Edge',
    title: 'Conflicting Criteria',
    description: 'User provides criteria that contradict each other',
    userQuery: 'Show me micro-influencers with over 500K followers',
    render: () => (
      <>
        <ChatMessage role="user">Show me micro-influencers with over 500K followers</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Just checking – micro-influencers are typically defined as having under 100K followers, so 500K would put them in a different tier. Did you mean:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2"><strong>Micro-influencers</strong> (10K–100K followers)?</Typography></li>
            <li><Typography variant="body2"><strong>Mid-tier influencers</strong> (100K–500K)?</Typography></li>
            <li><Typography variant="body2"><strong>Macro-influencers</strong> (500K+)?</Typography></li>
          </Box>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-bulk',
    category: 'Edge',
    title: 'Bulk/Export Request',
    description: 'User asks to export a large list',
    userQuery: 'Can you give me all fintech journalists in a spreadsheet?',
    render: () => (
      <>
        <ChatMessage role="user">Can you give me all fintech journalists in a spreadsheet?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            I've got 87 fintech journalists on file. I can export them as a CSV with name, outlet, location, channels, and follower counts. Want me to:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">Send the full list?</Typography></li>
            <li><Typography variant="body2">Filter it first (by region, follower count, etc.)?</Typography></li>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Just say the word and I'll have it ready for download.
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-credibility',
    category: 'Edge',
    title: 'Credibility/Verification Check',
    description: 'User asks if a journalist is legitimate',
    userQuery: 'Is James Okonkwo legit?',
    render: () => (
      <>
        <ChatMessage role="user">Is James Okonkwo legit?</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Good instinct to check! Here's what I've got on <strong>James Okonkwo</strong>:
          </Typography>
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            <li><Typography variant="body2">Verified on Twitter and LinkedIn</Typography></li>
            <li><Typography variant="body2">Bylines at Forbes, Sifted, and City AM</Typography></li>
            <li><Typography variant="body2">Consistent posting history since 2019</Typography></li>
            <li><Typography variant="body2">Engagement looks organic (no red flags)</Typography></li>
          </Box>
          <Typography variant="body1">
            He checks out. Want a deeper breakdown of his audience demographics?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
  {
    id: 'edge-regional',
    category: 'Edge',
    title: 'Non-English/Regional Content',
    description: 'User asks for journalists covering a non-English region',
    userQuery: 'Find journalists covering tech in Latin America',
    render: () => (
      <>
        <ChatMessage role="user">Find journalists covering tech in Latin America</ChatMessage>
        <ChatMessage role="assistant" showDivider={false}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Great region – lots happening there! Here are a few to start:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <CompactRowCard data={{ ...MOCK_JOURNALISTS.carolinaMejia, beats: ['Startups', 'Tech (Spanish/English)'] }} />
            <CompactRowCard data={{ ...MOCK_JOURNALISTS.lucasFerriera, beats: ['Fintech (Portuguese)'] }} />
            <CompactRowCard data={{ ...MOCK_JOURNALISTS.diegoOrozco, beats: ['VC funding', 'LATAM'] }} />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Should I filter by language or specific country?
          </Typography>
        </ChatMessage>
      </>
    ),
  },
]

// ==============================================================================
// CARD VARIANTS SHOWCASE
// ==============================================================================

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

// ==============================================================================
// MAIN PAGE COMPONENT
// ==============================================================================

function StudioInfluencerTestPage() {
  const [selectedFlow, setSelectedFlow] = useState(null)
  const [showCards, setShowCards] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  const categories = [
    { id: 'AC1', label: 'AC1: Search Flows', description: 'Name, topic, location, multiple criteria' },
    { id: 'AC2', label: 'AC2: Channel Flows', description: 'List by channel, compare across channels' },
    { id: 'Edge', label: 'Edge Cases', description: 'Error handling, ambiguous queries, etc.' },
  ]

  const handleFlowSelect = (flow) => {
    setSelectedFlow(flow)
    setShowCards(false)
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 3,
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Journalist/Influencer Search Tests
        </Typography>
        <Chip
          label="AC Flows"
          size="small"
          sx={{ backgroundColor: 'primary.lighter', color: 'primary.main' }}
        />
        <Box sx={{ flex: 1 }} />
        <Button
          variant={showCards ? 'contained' : 'outlined'}
          size="small"
          onClick={() => {
            setShowCards(!showCards)
            setSelectedFlow(null)
          }}
          sx={{ textTransform: 'none' }}
        >
          Component Overview
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar - Flow Selector */}
        <Box
          sx={{
            width: 320,
            borderRight: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'grey.50',
            overflow: 'auto',
            p: 2,
          }}
        >
          {categories.map((category) => (
            <Box key={category.id} sx={{ mb: 3 }}>
              <Typography variant="overline" sx={{ fontWeight: 600, color: 'text.secondary', display: 'block', mb: 1 }}>
                {category.label}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                {category.description}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {TEST_FLOWS.filter((f) => f.category === category.id).map((flow) => (
                  <Button
                    key={flow.id}
                    variant={selectedFlow?.id === flow.id ? 'contained' : 'text'}
                    size="small"
                    onClick={() => handleFlowSelect(flow)}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontWeight: selectedFlow?.id === flow.id ? 600 : 400,
                      color: selectedFlow?.id === flow.id ? undefined : 'text.primary',
                      pl: 1.5,
                    }}
                  >
                    {flow.title}
                  </Button>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Main Panel */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {showCards ? (
            <Box sx={{ flex: 1, overflow: 'auto', p: 4 }}>
              <CardVariantsShowcase />
            </Box>
          ) : selectedFlow ? (
            <>
              {/* Flow Header */}
              <Box sx={{ px: 4, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {selectedFlow.category}: {selectedFlow.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedFlow.description}
                </Typography>
              </Box>

              {/* Chat Thread */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 4 }}>
                <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                  {selectedFlow.render()}
                </Box>
              </Box>

              {/* Input Bar */}
              <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', backgroundColor: 'background.default' }}>
                <Box sx={{ maxWidth: 800, mx: 'auto' }}>
                  <TextField
                    fullWidth
                    placeholder="Type a follow-up question..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton disabled={!newMessage.trim()} color="primary">
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 50,
                        backgroundColor: 'background.paper',
                        pl: 3,
                      },
                    }}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Select a Test Flow
              </Typography>
              <Typography variant="body2">
                Choose a flow from the sidebar to preview the chat interaction
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default StudioInfluencerTestPage
