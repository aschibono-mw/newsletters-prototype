import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import AvatarThemed from '../components/themed/AvatarThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function AvatarDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Avatar"
      description="User profile images, initials, and icons for representing people and entities."
    >
      <AvatarThemed />

      <CorePropsTable
        props={[
          { name: 'src', type: 'string', description: 'Image source URL' },
          { name: 'alt', type: 'string', description: 'Alt text for the image' },
          { name: 'children', type: 'ReactNode', description: 'Content (initials or icon) when no src' },
          { name: 'variant', type: '"circular" | "rounded" | "square"', description: 'Shape variant. Default: "circular"' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.1.1", name: "Non-text Content", level: "A", note: "alt text for images, aria-label for initials" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 initials on avatar background" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 avatar border vs page background" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default AvatarDetailPage
