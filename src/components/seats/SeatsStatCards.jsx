import { useMemo } from 'react'
import { StatCardsGrid } from '../layout'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined'

// Seat stats config for stat cards with infotips (4 cards per PRD)
const SEAT_STATS_CONFIG = [
  {
    id: 'platform',
    label: 'Platform Seats',
    limit: 100,
    icon: PersonOutlineIcon,
    infotip: 'Users with full platform access including all features and integrations',
  },
  {
    id: 'view-only',
    label: 'View-Only Seats',
    limit: null,
    icon: VisibilityOutlinedIcon,
    infotip: 'Users with read-only access to the app, can add integrations',
  },
  {
    id: 'interactor',
    label: 'Interactor Seats',
    limit: null,
    icon: GroupOutlinedIcon,
    infotip: 'Users without app access who interact via integrations only',
  },
  {
    id: 'integration',
    label: 'Integration Seats',
    limit: 50,
    icon: IntegrationInstructionsOutlinedIcon,
    infotip: 'Combined Teams App and Slack Agent integration seats',
  },
]

/**
 * SeatsStatCards - Stat cards section for the Seats page
 *
 * @param {Object} props
 * @param {Array} props.users - Array of user objects
 * @param {boolean} props.isLoading - Loading state
 */
function SeatsStatCards({ users = [], isLoading = false }) {
  // Calculate seat usage
  const seatUsage = useMemo(() => {
    const platformUsers = users.filter((u) => u.seatType === 'platform')
    const platformAdmins = platformUsers.filter((u) => u.platformSubType === 'admin').length
    const integrationCount = users.filter(
      (u) => u.integrationSeats?.teams || u.integrationSeats?.slack
    ).length

    return {
      platform: platformUsers.length,
      platformAdmins,
      'view-only': users.filter((u) => u.seatType === 'view-only').length,
      interactor: users.filter((u) => u.seatType === 'interactor').length,
      integration: integrationCount,
    }
  }, [users])

  // Transform config into stat cards format
  const stats = useMemo(() => {
    return SEAT_STATS_CONFIG.map((stat) => {
      const count = seatUsage[stat.id] || 0
      const limitDisplay = stat.limit ? `${count} / ${stat.limit}` : `${count} / Unlimited`
      const adminSuffix =
        stat.id === 'platform' && seatUsage.platformAdmins > 0
          ? ` (${seatUsage.platformAdmins} Admin${seatUsage.platformAdmins !== 1 ? 's' : ''})`
          : ''

      return {
        id: stat.id,
        label: stat.label,
        value: limitDisplay,
        secondary: adminSuffix,
        infotip: stat.infotip,
      }
    })
  }, [seatUsage])

  return <StatCardsGrid stats={stats} isLoading={isLoading} columns={4} />
}

export default SeatsStatCards
