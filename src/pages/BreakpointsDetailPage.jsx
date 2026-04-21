import BreakpointsThemed from '../components/themed/BreakpointsThemed'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function BreakpointsDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Breakpoints"
      description="Responsive breakpoints for adaptive layouts across different screen sizes."
    >
      <BreakpointsThemed />

      <CorePropsTable
        props={[
          { name: 'xs', type: 'number', description: 'Extra small breakpoint. Default: 0px' },
          { name: 'sm', type: 'number', description: 'Small breakpoint. Default: 600px' },
          { name: 'md', type: 'number', description: 'Medium breakpoint. Default: 900px' },
          { name: 'lg', type: 'number', description: 'Large breakpoint. Default: 1200px' },
          { name: 'xl', type: 'number', description: 'Extra large breakpoint. Default: 1536px' },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default BreakpointsDetailPage
