import { useState } from 'react'
import { Box, Collapse } from '@mui/material'
import MiraActivityMessage from '../MiraActivityMessage'
import MiraActivityLogToggle from './MiraActivityLogToggle'

/**
 * MiraActivityLog - Expandable activity container
 *
 * @param {Array} [messages=[]] - Array of activity messages {type, text, source}
 * @param {boolean} [defaultExpanded=false] - Whether expanded by default
 * @param {number} [maxVisible=6] - Maximum number of messages to show when expanded
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraActivityLog({ messages = [], defaultExpanded = false, maxVisible = 6, sx }) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const visibleMessages = expanded ? messages.slice(-maxVisible) : []

  if (messages.length === 0) return null

  return (
    <Box sx={sx}>
      <MiraActivityLogToggle
        expanded={expanded}
        count={messages.length}
        onToggle={() => setExpanded(!expanded)}
      />

      <Collapse in={expanded}>
        <Box
          sx={{
            maxHeight: 200,
            overflow: 'auto',
            px: 1.5,
            py: 1,
            borderTop: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'white',
          }}
        >
          {visibleMessages.map((item, index) => (
            <MiraActivityMessage
              key={index}
              type={item.type}
              text={item.text}
              source={item.source}
              isLatest={index === visibleMessages.length - 1}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  )
}

export default MiraActivityLog
