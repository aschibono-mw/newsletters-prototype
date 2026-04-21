import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Divider,
  Paper,
  Switch,
} from '@mui/material'
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

function FormLayoutPatternPage() {
  return (
    <Container maxWidth={false} sx={{ maxWidth: 1200, mx: 'auto', px: 3, pt: 8, pb: 4 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <MuiLink component={Link} to="/ds-collection" underline="hover" color="inherit">
          DS Collection
        </MuiLink>
        <MuiLink component={Link} to="/patterns" underline="hover" color="inherit">
          Patterns
        </MuiLink>
        <Typography color="text.primary">Form Layout</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Form Layout
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Patterns for organizing form fields, labels, and actions for optimal usability.
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 4 }}>
        <div className="themed-showcase">
          {/* Vertical (Stacked) Layout */}
          <div className="variant-section">
            <h4>Vertical Layout</h4>
            <p>Labels above fields - the most common and accessible pattern.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Simple Vertical Form
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, maxWidth: 400 }}>
                  <Stack spacing={3}>
                    <TextField
                      label="Full Name"
                      placeholder="Enter your name"
                      fullWidth
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      fullWidth
                    />
                    <TextField
                      label="Password"
                      type="password"
                      placeholder="Enter password"
                      fullWidth
                    />
                    <Button variant="contained" fullWidth>
                      Create Account
                    </Button>
                  </Stack>
                </Paper>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  With Helper Text
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, maxWidth: 400 }}>
                  <Stack spacing={3}>
                    <TextField
                      label="Username"
                      placeholder="Choose a username"
                      helperText="3-20 characters, letters and numbers only"
                      fullWidth
                    />
                    <TextField
                      label="Bio"
                      multiline
                      rows={3}
                      placeholder="Tell us about yourself"
                      helperText="Maximum 200 characters"
                      fullWidth
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="text">Cancel</Button>
                      <Button variant="contained">Save</Button>
                    </Stack>
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Two-Column Layout */}
          <div className="variant-section">
            <h4>Two-Column Layout</h4>
            <p>Related fields side by side to reduce vertical scrolling.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Grid-based Layout
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, maxWidth: 600 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField label="First Name" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Last Name" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Email" type="email" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Phone" type="tel" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Country</InputLabel>
                        <Select label="Country" defaultValue="">
                          <MenuItem value="us">United States</MenuItem>
                          <MenuItem value="uk">United Kingdom</MenuItem>
                          <MenuItem value="ca">Canada</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Address" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="City" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField label="State" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField label="ZIP" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="text">Cancel</Button>
                        <Button variant="contained">Save Address</Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Horizontal (Inline) Layout */}
          <div className="variant-section">
            <h4>Horizontal Layout</h4>
            <p>Labels beside fields - useful for settings and dense forms.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Settings Pattern
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, maxWidth: 600 }}>
                  <Stack spacing={3}>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      <Box sx={{ width: 150, pt: 1 }}>
                        <Typography variant="body2" fontWeight={500}>
                          Display Name
                        </Typography>
                      </Box>
                      <TextField
                        size="small"
                        defaultValue="John Doe"
                        sx={{ flex: 1 }}
                      />
                    </Stack>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      <Box sx={{ width: 150, pt: 1 }}>
                        <Typography variant="body2" fontWeight={500}>
                          Email
                        </Typography>
                      </Box>
                      <TextField
                        size="small"
                        defaultValue="john@example.com"
                        sx={{ flex: 1 }}
                      />
                    </Stack>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      <Box sx={{ width: 150, pt: 1 }}>
                        <Typography variant="body2" fontWeight={500}>
                          Timezone
                        </Typography>
                      </Box>
                      <FormControl size="small" sx={{ flex: 1 }}>
                        <Select defaultValue="utc-8">
                          <MenuItem value="utc-8">Pacific Time (UTC-8)</MenuItem>
                          <MenuItem value="utc-5">Eastern Time (UTC-5)</MenuItem>
                          <MenuItem value="utc">UTC</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="text">Reset</Button>
                      <Button variant="contained">Update Profile</Button>
                    </Stack>
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Sectioned Forms */}
          <div className="variant-section">
            <h4>Sectioned Forms</h4>
            <p>Group related fields with section headers and dividers.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Multi-Section Form
                </Typography>
                <Paper variant="outlined" sx={{ maxWidth: 600 }}>
                  {/* Section 1 */}
                  <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Personal Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Basic details about you
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField label="First Name" size="small" fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="Last Name" size="small" fullWidth />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Email" size="small" fullWidth />
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  {/* Section 2 */}
                  <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Preferences
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Customize your experience
                    </Typography>
                    <Stack spacing={2}>
                      <FormControl>
                        <FormLabel>Language</FormLabel>
                        <RadioGroup row defaultValue="en">
                          <FormControlLabel value="en" control={<Radio size="small" />} label="English" />
                          <FormControlLabel value="es" control={<Radio size="small" />} label="Spanish" />
                          <FormControlLabel value="fr" control={<Radio size="small" />} label="French" />
                        </RadioGroup>
                      </FormControl>
                      <FormControlLabel
                        control={<Checkbox size="small" defaultChecked />}
                        label="Receive email notifications"
                      />
                    </Stack>
                  </Box>
                  <Divider />
                  {/* Actions */}
                  <Box sx={{ p: 3, backgroundColor: 'grey.50' }}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="text">Cancel</Button>
                      <Button variant="contained">Save Changes</Button>
                    </Stack>
                  </Box>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Inline Actions */}
          <div className="variant-section">
            <h4>Inline Forms</h4>
            <p>Compact forms with fields and actions on the same line.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Search/Filter Bar
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                      size="small"
                      placeholder="Search..."
                      sx={{ flex: 1, maxWidth: 300 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select defaultValue="all">
                        <MenuItem value="all">All Status</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                    <Button variant="contained">Search</Button>
                  </Stack>
                </Paper>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Newsletter Signup
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, maxWidth: 500 }}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      size="small"
                      placeholder="Enter your email"
                      sx={{ flex: 1 }}
                    />
                    <Button variant="contained">Subscribe</Button>
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Form States */}
          <div className="variant-section">
            <h4>Form States</h4>
            <p>Validation, error, and success states.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Validation States
                </Typography>
                <Paper variant="outlined" sx={{ p: 3, maxWidth: 400 }}>
                  <Stack spacing={3}>
                    <TextField
                      label="Valid Field"
                      defaultValue="john@example.com"
                      color="success"
                      helperText={
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <CheckCircleOutlineIcon sx={{ fontSize: 14, color: 'success.main' }} />
                          <span>Email is valid</span>
                        </Stack>
                      }
                      fullWidth
                    />
                    <TextField
                      label="Error Field"
                      defaultValue="invalid-email"
                      error
                      helperText={
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <ErrorOutlineIcon sx={{ fontSize: 14 }} />
                          <span>Please enter a valid email address</span>
                        </Stack>
                      }
                      fullWidth
                    />
                    <TextField
                      label="Required Field"
                      placeholder="This field is required"
                      required
                      fullWidth
                    />
                    <TextField
                      label="Disabled Field"
                      defaultValue="Cannot edit"
                      disabled
                      fullWidth
                    />
                  </Stack>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Toggle Settings */}
          <div className="variant-section">
            <h4>Toggle Settings</h4>
            <p>Switch-based settings with descriptions.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Settings List
                </Typography>
                <Paper variant="outlined" sx={{ maxWidth: 500 }}>
                  <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          Email Notifications
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive updates about your account activity
                        </Typography>
                      </Box>
                      <Switch defaultChecked />
                    </Stack>
                  </Box>
                  <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          Marketing Emails
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive news and promotional offers
                        </Typography>
                      </Box>
                      <Switch />
                    </Stack>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          Two-Factor Authentication
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Add an extra layer of security to your account
                        </Typography>
                      </Box>
                      <Switch defaultChecked />
                    </Stack>
                  </Box>
                </Paper>
              </Box>
            </Stack>
          </div>

          {/* Button Placement */}
          <div className="variant-section">
            <h4>Button Placement</h4>
            <p>Standard patterns for form action buttons.</p>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Primary Actions
                </Typography>
                <Stack spacing={2}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Right-aligned (recommended for dialogs/panels)
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                      <Button variant="text">Cancel</Button>
                      <Button variant="contained">Save</Button>
                    </Stack>
                  </Paper>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Left-aligned (for page forms)
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Button variant="contained">Submit</Button>
                      <Button variant="text">Cancel</Button>
                    </Stack>
                  </Paper>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Full-width (mobile/narrow containers)
                    </Typography>
                    <Stack spacing={1}>
                      <Button variant="contained" fullWidth>Create Account</Button>
                      <Button variant="text" fullWidth>Already have an account?</Button>
                    </Stack>
                  </Paper>
                </Stack>
              </Box>
            </Stack>
          </div>

          <FeaturesSection
            features={[
              { feature: "Vertical Layout", description: "Labels above fields - best for accessibility and mobile, use spacing={3}" },
              { feature: "Grid Layout", description: "Related fields side-by-side using Grid container with responsive columns" },
              { feature: "Section Dividers", description: "Group related fields with Divider and section headers" },
              { feature: "Helper Text", description: "FormHelperText for instructions, validation messages, character counts" },
              { feature: "Button Placement", description: "Right-aligned in dialogs, left-aligned on pages, full-width on mobile" },
            ]}
          />
        </div>

        <AccessibilitySection
          wcag={[
            { id: "1.3.1", name: "Info and Relationships", level: "A", note: "Labels programmatically associated with inputs" },
            { id: "3.3.1", name: "Error Identification", level: "A", note: "Errors identified and described in text" },
            { id: "3.3.2", name: "Labels or Instructions", level: "A", note: "All fields have visible labels or placeholders" },
            { id: "3.3.3", name: "Error Suggestion", level: "AA", note: "Error messages suggest how to fix the issue" },
          ]}
        />
      </Box>
    </Container>
  )
}

export default FormLayoutPatternPage
