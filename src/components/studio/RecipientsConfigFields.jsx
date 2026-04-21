import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  Divider,
} from '@mui/material'
import { TEAM_MEMBERS } from '../../data/recurringPromptsData'

/**
 * RecipientsConfigFields - Reusable recipients and email customization form
 *
 * @param {object} props
 * @param {string[]} props.recipients - Array of email addresses
 * @param {function} props.onRecipientsChange - Recipients change handler
 * @param {string} props.emailSubject - Email subject line
 * @param {function} props.onEmailSubjectChange - Email subject change handler
 * @param {string} props.emailMessage - Email body message
 * @param {function} props.onEmailMessageChange - Email message change handler
 * @param {boolean} props.showEmailCustomization - Show email subject/message fields (default: true)
 * @param {boolean} props.showDivider - Show divider between sections (default: true)
 * @param {string[]} props.teamOptions - Custom team email options (default: TEAM_MEMBERS)
 */
function RecipientsConfigFields({
  recipients,
  onRecipientsChange,
  emailSubject,
  onEmailSubjectChange,
  emailMessage,
  onEmailMessageChange,
  showEmailCustomization = true,
  showDivider = true,
  teamOptions,
}) {
  const emailOptions = teamOptions || TEAM_MEMBERS.map((member) => member.email)

  return (
    <Box>
      {/* Recipients */}
      <Box sx={{ mb: showEmailCustomization ? 0 : 0 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Email Recipients
        </Typography>
        <Autocomplete
          multiple
          freeSolo
          options={emailOptions}
          value={recipients}
          onChange={(e, newValue) => onRecipientsChange(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index })
              return (
                <Chip
                  key={key}
                  label={option}
                  size="small"
                  {...tagProps}
                />
              )
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Add email addresses..."
              helperText="Type an email address and press Enter, or select from suggestions"
            />
          )}
        />
      </Box>

      {showEmailCustomization && (
        <>
          {showDivider && <Divider sx={{ my: 3 }} />}

          {/* Email Customization */}
          <Box sx={{ mt: showDivider ? 0 : 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
              Customize Email (Optional)
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Email Subject"
                placeholder="e.g., Your Weekly Campaign Update"
                value={emailSubject}
                onChange={(e) => onEmailSubjectChange(e.target.value)}
              />

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Email Message"
                placeholder="Optional message to include above the AI-generated content..."
                value={emailMessage}
                onChange={(e) => onEmailMessageChange(e.target.value)}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default RecipientsConfigFields
