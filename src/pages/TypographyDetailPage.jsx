import TypographyThemed from '../components/themed/TypographyThemed'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function TypographyDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Typography"
      description="Typography scale with font sizes, line heights, and weights for the design system."
    >
      <TypographyThemed />

      <CorePropsTable
        props={[
          { name: 'variant', type: '"h1" | "h2" | ... | "body1" | "body2" | "caption" | ...', description: 'Typography variant' },
          { name: 'color', type: '"primary" | "secondary" | "textPrimary" | "textSecondary" | "error"', description: 'Text color' },
          { name: 'align', type: '"left" | "center" | "right" | "justify"', description: 'Text alignment' },
          { name: 'gutterBottom', type: 'boolean', description: 'If true, adds margin bottom' },
          { name: 'noWrap', type: 'boolean', description: 'If true, text will not wrap' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default TypographyDetailPage
