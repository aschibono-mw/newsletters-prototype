import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import ElevationThemed from '../components/themed/ElevationThemed'

function ElevationDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Elevation"
      description="Shadow elevations for creating depth and hierarchy in the interface."
    >
      <ElevationThemed />

      <CorePropsTable
        props={[
          { name: 'elevation', type: 'number', description: 'Shadow depth from 0 (no shadow) to 24 (deepest)' },
          { name: 'component', type: 'string | ReactComponent', description: 'The component used for the root node' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default ElevationDetailPage
