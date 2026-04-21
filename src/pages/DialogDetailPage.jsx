import DialogThemed from '../components/themed/DialogThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'

function DialogDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Dialog / Modal"
      description="Overlay windows for focused tasks, confirmations, and content display."
    >
      <DialogThemed />

      <CorePropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'If true, the dialog is open' },
          { name: 'onClose', type: 'function', description: 'Callback when dialog is closed' },
          { name: 'maxWidth', type: '"xs" | "sm" | "md" | "lg" | "xl" | false', description: 'Maximum width of dialog' },
          { name: 'fullWidth', type: 'boolean', description: 'If true, dialog stretches to maxWidth' },
          { name: 'fullScreen', type: 'boolean', description: 'If true, dialog is full screen' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab through content, Escape to close" },
          { id: "2.1.2", name: "No Keyboard Trap", level: "A", note: "Focus trapped within, Escape exits" },
          { id: "2.4.3", name: "Focus Order", level: "A", note: "Focus moves to dialog on open" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on interactive elements" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "role=dialog, aria-labelledby" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 text, adapts to palette" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default DialogDetailPage
