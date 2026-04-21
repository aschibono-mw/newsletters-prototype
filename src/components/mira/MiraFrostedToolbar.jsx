import { Box } from '@mui/material'
import { MIRA_FROSTED_STYLES } from '../../constants/miraStyles'

/**
 * MiraFrostedToolbar - Glassmorphism sticky toolbar
 *
 * @param {object} props
 * @param {'top' | 'bottom'} props.position - Toolbar position, default 'top'
 * @param {boolean} props.sticky - Whether toolbar is sticky, default true
 * @param {React.ReactNode} props.children - Toolbar content
 * @param {object} props.sx - Additional MUI sx styles
 */
function MiraFrostedToolbar({ position = 'top', sticky = true, children, sx = {} }) {
  return (
    <Box
      sx={{
        ...MIRA_FROSTED_STYLES,
        ...(sticky && {
          position: 'sticky',
          [position]: 0,
          zIndex: 100,
        }),
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default MiraFrostedToolbar
