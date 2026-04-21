import { Box } from '@mui/material'
import MiraProgressHeader from './progress/MiraProgressHeader'
import MiraProgressBar from './progress/MiraProgressBar'
import MiraSourcesChip from './progress/MiraSourcesChip'
import MiraStopButton from './progress/MiraStopButton'
import MiraActivityLog from './progress/MiraActivityLog'
import { MIRA_PROGRESS_STUB_STYLES } from '../../constants/miraStyles'

/**
 * MiraProgressStub - Processing indicator with progress bar, activity log, and source count
 *
 * @param {number} [progress=0] - Progress percentage (0-100)
 * @param {boolean} [isProcessing=false] - Whether actively processing (shows thinking dots)
 * @param {boolean} [isComplete=false] - Whether processing is complete
 * @param {string} [statusLabel="Processing..."] - Current status label
 * @param {number} [sourceCount=0] - Number of sources consulted
 * @param {Array} [activityMessages=[]] - Array of activity messages {type, text, source}
 * @param {function} [onStop] - Callback when stop button clicked
 * @param {function} [onSourcesClick] - Callback when sources chip clicked (only when complete)
 * @param {boolean} [defaultExpanded=false] - Whether activity log is expanded by default
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraProgressStub({
  progress = 0,
  isProcessing = false,
  isComplete = false,
  statusLabel = 'Processing...',
  sourceCount = 0,
  activityMessages = [],
  onStop,
  onSourcesClick,
  defaultExpanded = false,
  sx,
}) {
  const currentActivity = activityMessages.length > 0 && !isComplete
    ? activityMessages[activityMessages.length - 1].text
    : undefined

  return (
    <Box
      sx={{
        ...MIRA_PROGRESS_STUB_STYLES,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Main Stub Header */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <MiraProgressHeader
            isComplete={isComplete}
            isProcessing={isProcessing}
            statusLabel={statusLabel}
            currentActivity={currentActivity}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MiraSourcesChip
              count={sourceCount}
              clickable={isComplete}
              onClick={onSourcesClick}
            />
            {!isComplete && onStop && (
              <MiraStopButton onClick={onStop} />
            )}
          </Box>
        </Box>

        {/* Progress Bar */}
        <MiraProgressBar progress={progress} isComplete={isComplete} />
      </Box>

      {/* Expandable Activity Log */}
      <MiraActivityLog
        messages={activityMessages}
        defaultExpanded={defaultExpanded}
      />
    </Box>
  )
}

export default MiraProgressStub
