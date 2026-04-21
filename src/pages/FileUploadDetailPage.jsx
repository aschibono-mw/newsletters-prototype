import { Box, Typography } from '@mui/material'
import { CoreDetailPageLayout, CorePropsTable } from '../components/core'
import FileUploadThemed from '../components/themed/FileUploadThemed'
import AccessibilitySection from '../components/docs/AccessibilitySection'

function FileUploadDetailPage() {
  return (
    <CoreDetailPageLayout
      title="File Upload"
      description="File input with drag-and-drop, browse, and upload functionality."
    >
      {/* Overview Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Component Overview
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          File Upload is a complex input component that allows users to select and upload files through multiple interaction patterns. While not a core theming component, it provides essential functionality for document management, media uploads, and data import workflows.
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, mt: 3 }}>
          Common Variants
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          • <strong>Button Upload:</strong> Click button to open file browser (simplest pattern)
          <br />
          • <strong>Drag & Drop Zone:</strong> Dashed border area for dragging files
          <br />
          • <strong>Inline Upload:</strong> Compact variant for forms and tables
          <br />
          • <strong>Avatar/Image Upload:</strong> Specialized for profile pictures with preview
          <br />
          • <strong>Multiple File Upload:</strong> Queue-based upload with progress indicators
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, mt: 3 }}>
          Key Features
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          • <strong>File Type Validation:</strong> Accept only specific formats (images, PDFs, etc.)
          <br />
          • <strong>Size Limits:</strong> Enforce maximum file size with clear error messages
          <br />
          • <strong>Progress Indicators:</strong> Show upload status with linear/circular progress
          <br />
          • <strong>Preview:</strong> Display thumbnails for images and file icons for documents
          <br />
          • <strong>Error Handling:</strong> Clear feedback for failed uploads or invalid files
          <br />
          • <strong>Multiple Selection:</strong> Upload multiple files simultaneously
          <br />
          • <strong>Drag & Drop:</strong> Intuitive file selection by dragging from desktop
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, mt: 3 }}>
          Specifications
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          <strong>Button Variant:</strong> Outlined button with CloudUpload icon
          <br />
          <strong>Drop Zone:</strong> 2px dashed border, grey.300 color, hover state with teal border
          <br />
          <strong>Accepted Files:</strong> Display as helper text (e.g., "PNG, JPG up to 10MB")
          <br />
          <strong>Progress:</strong> Linear progress bar (0-100%) with percentage label
          <br />
          <strong>File List:</strong> Show selected files with name, size, and remove button
          <br />
          <strong>States:</strong> Default, hover, active (dragging over), uploading, success, error
        </Typography>

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, mt: 3 }}>
          Usage Contexts
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          • <strong>Forms:</strong> Document submission, attachments, supporting files
          <br />
          • <strong>Profile Settings:</strong> Avatar/profile picture upload with cropping
          <br />
          • <strong>Content Management:</strong> Media library, asset uploads, bulk import
          <br />
          • <strong>Data Import:</strong> CSV/Excel file upload for data processing
          <br />
          • <strong>Messaging:</strong> File attachments in chat or email interfaces
        </Typography>
      </Box>

      <FileUploadThemed />

      <CorePropsTable
        props={[
          { name: 'accept', type: 'string', description: 'Accepted file types (e.g., "image/*,.pdf")' },
          { name: 'multiple', type: 'boolean', description: 'If true, allows multiple file selection' },
          { name: 'maxSize', type: 'number', description: 'Maximum file size in bytes' },
          { name: 'onDrop', type: 'function', description: 'Callback when files are dropped/selected' },
          { name: 'disabled', type: 'boolean', description: 'If true, the upload is disabled' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "2.1.1", name: "Keyboard", level: "A", note: "Tab to trigger, Enter/Space to open picker" },
          { id: "2.4.7", name: "Focus Visible", level: "AA", note: "Visible focus on drop zone and button" },
          { id: "4.1.2", name: "Name, Role, Value", level: "A", note: "button role with aria-label for action" },
          { id: "4.1.3", name: "Status Messages", level: "AA", note: "Upload progress announced to screen readers" },
          { id: "1.4.3", name: "Contrast", level: "AA", note: "4.5:1 instruction text contrast" },
          { id: "1.4.11", name: "Non-text Contrast", level: "AA", note: "3:1 drop zone border vs background" },
        ]}
      />

      {/* Implementation Notes */}
      <Box sx={{ mt: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Implementation Notes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          File Upload is marked as non-core for theming because it typically requires:
          <br />
          • Backend integration for file processing and storage
          <br />
          • Complex state management for upload queues and progress tracking
          <br />
          • Third-party libraries (react-dropzone, uppy, filepond) for advanced features
          <br />
          • Security considerations (file validation, virus scanning, size limits)
          <br />
          <br />
          For most use cases, a simple Button with hidden input element is sufficient for MVP implementations.
        </Typography>
      </Box>
    </CoreDetailPageLayout>
  )
}

export default FileUploadDetailPage
