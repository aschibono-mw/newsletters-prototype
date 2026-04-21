import { useState, useEffect } from 'react'
import { Box, Typography, Divider, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const SECTIONS = [
  { id: 'button-labels', label: 'Button Labels' },
  { id: 'common-labels', label: 'Common Labels' },
  { id: 'examples', label: 'Examples' },
  { id: 'link-text', label: 'Link Text' },
  { id: 'destructive', label: 'Destructive Actions' },
  { id: 'resources', label: 'Resources' },
]

function ContentActionLabelsPage() {
  const [activeSection, setActiveSection] = useState('button-labels')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 3, pt: 6, pb: 8 }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: 800, width: '100%' }}>
        {/* Breadcrumb */}
        <Box sx={{ mb: 4 }}>
          <Link
            component={RouterLink}
            to="/content"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Content
          </Link>
        </Box>

        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
            Action Labels
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
            Buttons initialize actions. Labels express what happens when the user interacts.
          </Typography>
        </Box>

        {/* Button labels section */}
        <Box id="button-labels" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Button Labels
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            A button's text label is its most important element. It communicates what action occurs on click. Labels should be clear and predictable.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Use title case for all button labels—capitalize each major word.
          </Typography>

          {/* Guidelines list */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Use action verbs that describe the outcome</Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Keep labels short (1-3 words)</Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Be specific about the action</Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Use title case</Typography>
              <Typography component="li" variant="body2">Avoid "Click here" or generic "Submit"</Typography>
            </Box>
          </Paper>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Common actions table */}
        <Box id="common-labels" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Common Action Labels
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Use consistent labels across the product for common actions.
          </Typography>

          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Label</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Create new item</TableCell>
                  <TableCell>Add [Item]</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>"Add" + noun, e.g., "Add User"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Save changes</TableCell>
                  <TableCell>Save Changes</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Be specific when context helps</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Discard changes</TableCell>
                  <TableCell>Cancel</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Returns to previous state</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Remove permanently</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Permanent removal only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Modify existing</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Opens edit mode or dialog</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Close dialog</TableCell>
                  <TableCell>Done / Close</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>"Done" after completing action</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Continue wizard</TableCell>
                  <TableCell>Next / Continue</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Multi-step flows</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Go back</TableCell>
                  <TableCell>Back</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>Returns to previous step</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Examples section */}
        <Box id="examples" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Examples
          </Typography>

          {/* Example 1 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Be Specific
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              <Paper
                sx={{
                  flex: 1,
                  p: 3,
                  backgroundColor: 'success.50',
                  border: '1px solid',
                  borderColor: 'success.200',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ color: 'success.dark', fontWeight: 600 }}>
                    Do
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                  "Save Changes"
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                  "Delete Project"
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  "Export Report"
                </Typography>
              </Paper>

              <Paper
                sx={{
                  flex: 1,
                  p: 3,
                  backgroundColor: 'error.50',
                  border: '1px solid',
                  borderColor: 'error.200',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <CancelOutlinedIcon sx={{ color: 'error.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ color: 'error.dark', fontWeight: 600 }}>
                    Don't
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                  "Submit"
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                  "OK"
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  "Click here"
                </Typography>
              </Paper>
            </Box>
          </Box>

          {/* Example 2 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Match Trigger and Outcome
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              <Paper
                sx={{
                  flex: 1,
                  p: 3,
                  backgroundColor: 'success.50',
                  border: '1px solid',
                  borderColor: 'success.200',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ color: 'success.dark', fontWeight: 600 }}>
                    Do
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  Dialog title: "Delete User?"
                  <br />
                  Button: "Delete"
                </Typography>
              </Paper>

              <Paper
                sx={{
                  flex: 1,
                  p: 3,
                  backgroundColor: 'error.50',
                  border: '1px solid',
                  borderColor: 'error.200',
                  borderRadius: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <CancelOutlinedIcon sx={{ color: 'error.main', fontSize: 20 }} />
                  <Typography variant="subtitle2" sx={{ color: 'error.dark', fontWeight: 600 }}>
                    Don't
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  Dialog title: "Delete User?"
                  <br />
                  Button: "Yes"
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Links section */}
        <Box id="link-text" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Link Text
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            Link text describes where the link goes or what it does. Avoid generic text like "click here" or "learn more"—these lack context and hurt accessibility.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
            <Paper
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: 'success.50',
                border: '1px solid',
                borderColor: 'success.200',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ color: 'success.dark', fontWeight: 600 }}>
                  Do
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                "View the <u>API documentation</u> for integration details."
              </Typography>
            </Paper>

            <Paper
              sx={{
                flex: 1,
                p: 3,
                backgroundColor: 'error.50',
                border: '1px solid',
                borderColor: 'error.200',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <CancelOutlinedIcon sx={{ color: 'error.main', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ color: 'error.dark', fontWeight: 600 }}>
                  Don't
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                "For integration details, <u>click here</u>."
              </Typography>
            </Paper>
          </Box>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Destructive actions section */}
        <Box id="destructive" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Destructive Actions
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
            For irreversible actions like deleting data, use clear, explicit labels. Pair destructive buttons with confirmation dialogs that explain consequences.
          </Typography>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Use "Delete" instead of "Remove" for permanent actions</Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>Specify what gets deleted: "Delete Project" not just "Delete"</Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>In confirmation dialogs, use the same verb: "Are you sure you want to delete this project?"</Typography>
              <Typography component="li" variant="body2">Include the item name when possible to reduce errors</Typography>
            </Box>
          </Paper>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Related resources */}
        <Box id="resources" sx={{ mb: 6, scrollMarginTop: 24 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Resources
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Link
              component={RouterLink}
              to="/ds-collection/button"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Button Component
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
            <Link
              component={RouterLink}
              to="/ds-collection/links"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Links Component
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
            <Link
              component={RouterLink}
              to="/ds-collection/dialog"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Dialog Component
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
          </Box>
        </Box>

        {/* Page navigation */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <Link
            component={RouterLink}
            to="/content/writing-style"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Writing Style
          </Link>
        </Box>
      </Box>

      {/* Fixed Sections Nav */}
      <Box
        sx={{
          width: 200,
          flexShrink: 0,
          ml: 6,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 80,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              display: 'block',
              mb: 1.5,
              fontSize: '0.7rem',
              letterSpacing: 1,
            }}
          >
            Sections
          </Typography>
          <Box
            component="nav"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              borderLeft: '1px solid',
              borderColor: 'divider',
              pl: 2,
            }}
          >
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id
              return (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleSectionClick(e, section.id)}
                  sx={{
                    color: isActive ? 'primary.main' : 'text.secondary',
                    textDecoration: 'none',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 400,
                    py: 0.5,
                    ml: -2,
                    pl: 2,
                    borderLeft: '2px solid',
                    borderColor: isActive ? 'primary.main' : 'transparent',
                    transition: 'all 0.15s',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  {section.label}
                </Link>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ContentActionLabelsPage
