import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { DAYS_OF_WEEK, TIME_OPTIONS } from '../../data/recurringPromptsData'

/**
 * ScheduleConfigFields - Reusable schedule configuration (days + times)
 *
 * @param {object} props
 * @param {string[]} props.selectedDays - Array of selected day IDs
 * @param {function} props.onDaysChange - Day selection handler (receives array of day IDs)
 * @param {string} props.primaryTime - Primary delivery time
 * @param {function} props.onPrimaryTimeChange - Primary time change handler
 * @param {string} props.secondaryTime - Secondary delivery time (optional)
 * @param {function} props.onSecondaryTimeChange - Secondary time change handler
 * @param {boolean} props.showAdditionalOptions - Show accordion with secondary time (default: true)
 * @param {boolean} props.compact - Use compact layout (default: false)
 */
function ScheduleConfigFields({
  selectedDays,
  onDaysChange,
  primaryTime,
  onPrimaryTimeChange,
  secondaryTime,
  onSecondaryTimeChange,
  showAdditionalOptions = true,
  compact = false,
}) {
  const handleDaysChange = (event, newDays) => {
    if (newDays.length > 0) {
      onDaysChange(newDays)
    }
  }

  return (
    <Box>
      {/* Day Picker */}
      <Box sx={{ mb: compact ? 2 : 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Select one or more days for delivery
        </Typography>
        <ToggleButtonGroup
          value={selectedDays}
          onChange={handleDaysChange}
          aria-label="days of week"
          sx={{ flexWrap: 'wrap', gap: 0.5 }}
        >
          {DAYS_OF_WEEK.map((day) => (
            <ToggleButton
              key={day.id}
              value={day.id}
              sx={{
                px: 2.5,
                py: 1.5,
                borderRadius: '20px !important',
                border: '1px solid',
                borderColor: 'divider',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              {day.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Delivery Time */}
      <Box sx={{ mb: compact ? 2 : 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Delivery time
        </Typography>
        <FormControl fullWidth size={compact ? 'small' : 'medium'}>
          <Select
            value={primaryTime}
            onChange={(e) => onPrimaryTimeChange(e.target.value)}
          >
            {TIME_OPTIONS.map((time) => (
              <MenuItem key={time.value} value={time.value}>
                {time.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Additional Options */}
      {showAdditionalOptions && (
        <Accordion
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              ADDITIONAL OPTIONS
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Second delivery time
            </Typography>
            <FormControl fullWidth size={compact ? 'small' : 'medium'}>
              <Select
                value={secondaryTime}
                onChange={(e) => onSecondaryTimeChange(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                {TIME_OPTIONS.map((time) => (
                  <MenuItem key={time.value} value={time.value}>
                    {time.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  )
}

export default ScheduleConfigFields
