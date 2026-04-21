import { useState } from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import { MIRA_GRADIENTS } from '../../../constants/miraStyles'

/**
 * MiraCodeBlock - Code examples with Mira-themed styling
 *
 * @param {string} code - Code string to display
 * @param {object} [sx] - Additional MUI sx styles
 */
function MiraCodeBlock({ code, sx }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 1,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Gradient top border */}
      <Box
        sx={{
          height: 3,
          background: MIRA_GRADIENTS.primary,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'grey.900',
          p: 2,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          color: 'grey.100',
          overflow: 'auto',
        }}
      >
        {/* Copy button */}
        <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: copied ? 'success.light' : 'grey.500',
              '&:hover': {
                color: copied ? 'success.light' : 'grey.300',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        <pre style={{ margin: 0 }}>{code}</pre>
      </Box>
    </Box>
  )
}

export default MiraCodeBlock
