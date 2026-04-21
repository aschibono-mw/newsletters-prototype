import { forwardRef } from 'react'
import { Typography } from '@mui/material'
import { MIRA_GRADIENT_TEXT_SX } from '../../constants/miraStyles'

/**
 * MiraGradientText - Typography wrapper with gradient text styling
 *
 * Applies the Mira brand gradient (purple → slate teal) to text.
 * Inherits all MUI Typography props.
 *
 * @param {object} props
 * @param {string} props.variant - Typography variant (h1-h6, body1, body2, etc.)
 * @param {string} props.component - HTML element to render as
 * @param {object} props.sx - Additional MUI sx styles
 * @param {React.ReactNode} props.children - Text content
 */
const MiraGradientText = forwardRef(function MiraGradientText(
  { children, sx = {}, ...rest },
  ref
) {
  return (
    <Typography
      ref={ref}
      sx={{
        ...MIRA_GRADIENT_TEXT_SX,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  )
})

export default MiraGradientText
