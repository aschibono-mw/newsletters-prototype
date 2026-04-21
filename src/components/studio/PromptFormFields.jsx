import {
  Box,
  TextField,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from '@mui/material'

const CATEGORY_OPTIONS = [
  'Analysis & Reporting',
  'Brand Monitoring',
  'Competitive Intelligence',
  'Content & Creative',
  'Crisis & Issues',
  'Media Relations',
]

const VISIBILITY_OPTIONS = [
  { value: 'user', label: 'Only me', description: 'Private to your account' },
  { value: 'workspace', label: 'Workspace', description: 'Shared with your workspace' },
  { value: 'company', label: 'Company', description: 'Available to everyone' },
]

/**
 * PromptFormFields - Reusable form fields for creating/editing prompts
 *
 * @param {object} props
 * @param {string} props.title - Prompt title
 * @param {function} props.onTitleChange - Title change handler
 * @param {string} props.category - Selected category
 * @param {function} props.onCategoryChange - Category change handler
 * @param {string} props.promptText - Prompt text content
 * @param {function} props.onPromptTextChange - Prompt text change handler
 * @param {string} props.description - Optional description
 * @param {function} props.onDescriptionChange - Description change handler
 * @param {string} props.visibility - Visibility level (user/workspace/company)
 * @param {function} props.onVisibilityChange - Visibility change handler
 * @param {boolean} props.favorite - Is favorite
 * @param {function} props.onFavoriteChange - Favorite change handler
 * @param {string[]} props.categoryOptions - Custom category options (optional)
 * @param {boolean} props.autoFocusTitle - Auto focus title field (default: false)
 * @param {boolean} props.maxWidth - Max width for visibility options (default: 280)
 */
function PromptFormFields({
  title,
  onTitleChange,
  category,
  onCategoryChange,
  promptText,
  onPromptTextChange,
  description,
  onDescriptionChange,
  visibility,
  onVisibilityChange,
  favorite,
  onFavoriteChange,
  categoryOptions = CATEGORY_OPTIONS,
  autoFocusTitle = false,
  maxWidth = 280,
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField
        fullWidth
        label="Prompt Title"
        placeholder="Create a title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
        autoFocus={autoFocusTitle}
      />

      <Autocomplete
        freeSolo
        options={categoryOptions}
        value={category}
        onChange={(e, newValue) => onCategoryChange(newValue)}
        onInputChange={(e, newValue) => onCategoryChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            placeholder="Select or create a category"
          />
        )}
      />

      <TextField
        fullWidth
        label="Prompt"
        placeholder="Enter your prompt text..."
        value={promptText}
        onChange={(e) => onPromptTextChange(e.target.value)}
        required
        multiline
        rows={4}
      />

      <TextField
        fullWidth
        label="Description (optional)"
        placeholder="Brief description of what this prompt does"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        multiline
        rows={2}
      />

      {/* Visibility */}
      <Box sx={{ pt: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>
          VISIBILITY
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={visibility}
            onChange={(e) => onVisibilityChange(e.target.value)}
            sx={{ gap: 1 }}
          >
            {VISIBILITY_OPTIONS.map((option) => (
              <Paper
                key={option.value}
                variant="outlined"
                sx={{
                  p: 1.5,
                  cursor: 'pointer',
                  borderColor: visibility === option.value ? 'primary.main' : 'divider',
                  backgroundColor: visibility === option.value ? 'action.selected' : 'transparent',
                  maxWidth,
                }}
                onClick={() => onVisibilityChange(option.value)}
              >
                <FormControlLabel
                  value={option.value}
                  control={<Radio size="small" />}
                  label={
                    <Box sx={{ ml: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{option.label}</Typography>
                      <Typography variant="caption" color="text.secondary">{option.description}</Typography>
                    </Box>
                  }
                  sx={{ m: 0, alignItems: 'flex-start' }}
                />
              </Paper>
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Favorite */}
      <FormControlLabel
        control={
          <Checkbox
            checked={favorite}
            onChange={(e) => onFavoriteChange(e.target.checked)}
          />
        }
        label={
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Add to favorites
          </Typography>
        }
      />
    </Box>
  )
}

export default PromptFormFields
