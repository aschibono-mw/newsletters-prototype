import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import PaletteThemed from '../components/themed/PaletteThemed'

function PaletteDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Palette"
      description="Color palette with brand colors, status colors, text colors, and grey scale."
    >
      <PaletteThemed />

      <CorePropsTable
        props={[
          { name: 'primary', type: 'object', description: 'Primary brand color (main, light, dark, contrastText)' },
          { name: 'secondary', type: 'object', description: 'Secondary brand color' },
          { name: 'error', type: 'object', description: 'Error/danger color' },
          { name: 'warning', type: 'object', description: 'Warning color' },
          { name: 'success', type: 'object', description: 'Success color' },
          { name: 'info', type: 'object', description: 'Info color' },
          { name: 'grey', type: 'object', description: 'Grey scale (50-900)' },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default PaletteDetailPage
