import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import StepperThemed from '../components/themed/StepperThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function StepperDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Stepper"
      description="Guide users through multi-step processes with visual progress indicators and step navigation."
    >
      <StepperThemed />

      <CorePropsTable
        props={[
          { name: 'activeStep', type: 'number', description: 'Current active step (0-indexed)' },
          { name: 'orientation', type: '"horizontal" | "vertical"', description: 'Stepper orientation. Default: "horizontal"' },
          { name: 'alternativeLabel', type: 'boolean', description: 'If true, labels appear below icons' },
          { name: 'nonLinear', type: 'boolean', description: 'If true, allows non-sequential navigation' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Step status conveyed programmatically" },
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to navigate between steps" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on clickable steps" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "aria-current for active step" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 step label contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 step icon/connector contrast" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default StepperDetailPage
