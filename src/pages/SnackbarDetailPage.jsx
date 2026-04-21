import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import SnackbarThemed from '../components/themed/SnackbarThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function SnackbarDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Snackbar"
      description="Brief notifications that appear at the bottom of the screen with optional actions."
    >
      <SnackbarThemed />

      <CorePropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'If true, the snackbar is open' },
          { name: 'onClose', type: 'function', description: 'Callback when snackbar is closed' },
          { name: 'message', type: 'ReactNode', description: 'The message to display' },
          { name: 'action', type: 'ReactNode', description: 'Action button/element' },
          { name: 'autoHideDuration', type: 'number', description: 'Auto-hide delay in ms. Default: 6000' },
          { name: 'anchorOrigin', type: 'object', description: 'Position on screen' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "4.1.3", name: "Status Messages", level: "AA", note: "role=status for announcements" },
          { id: "2.2.1", name: "Timing Adjustable", level: "A", note: "Auto-dismiss can be extended" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text on snackbar background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default SnackbarDetailPage
