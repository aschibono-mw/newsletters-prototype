import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import SpacingThemed from '../components/themed/SpacingThemed'

function SpacingDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Spacing"
      description="Spacing scale with consistent increments for margins, padding, and gaps."
    >
      <SpacingThemed />

      <CorePropsTable
        props={[
          { name: 'spacing', type: 'number | function', description: 'Base spacing unit (1 = 8px). Default: 8' },
          { name: 'm, p', type: 'number | string', description: 'Margin/padding shorthand (1 = 8px, 2 = 16px, etc.)' },
          { name: 'mx, my, px, py', type: 'number | string', description: 'Horizontal/vertical margin/padding' },
          { name: 'mt, mb, ml, mr', type: 'number | string', description: 'Individual margin directions' },
          { name: 'gap', type: 'number | string', description: 'Gap between flex/grid children' },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default SpacingDetailPage
