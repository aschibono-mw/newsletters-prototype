import { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Button, Fab, TextField, TextareaAutosize, Select, MenuItem, Checkbox, FormControlLabel, Radio, RadioGroup, Switch, Slider, Rating, Autocomplete, Chip, ToggleButton, ToggleButtonGroup, Divider, Badge, Avatar, Tooltip, IconButton, List, ListItem, ListItemText, ListItemIcon, Accordion, AccordionSummary, AccordionDetails, Card, CardMedia, CardContent, CircularProgress, Tabs, Tab, Snackbar, Alert, Link, Breadcrumbs, Pagination, Stepper, Step, StepLabel, Table, TableBody, TableCell, TableHead, TableRow, ButtonGroup, Paper, SpeedDial, SpeedDialIcon, SpeedDialAction, AppBar, Toolbar, BottomNavigation, BottomNavigationAction, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/SearchRounded'
import CloudUploadIcon from '@mui/icons-material/CloudUploadRounded'
import MailIcon from '@mui/icons-material/MailRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import HomeIcon from '@mui/icons-material/HomeRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import MenuOpenIcon from '@mui/icons-material/MenuOpenRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded'
import CloseIcon from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import PrintIcon from '@mui/icons-material/Print'
import ShareIcon from '@mui/icons-material/Share'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'
import ComponentCard from '../components/cards/ComponentCard'

const SECTIONS = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'layout', label: 'Layout' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'data-display', label: 'Data Display' },
  { id: 'surfaces', label: 'Surfaces & Actions' },
]

// Inline Indicator component for preview
const IndicatorPreview = ({ children, color = 'default' }) => {
  const colorMap = {
    success: { border: '#4CAF50', background: '#E8F5E9' },
    error: { border: '#F44336', background: '#FFEBEE' },
    blue: { border: '#2196F3', background: '#E3F2FD' },
    default: { border: '#BDBDBD', background: '#F5F5F5' },
  }
  const colors = colorMap[color] || colorMap.default
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 8px',
        borderRadius: '4px',
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.background,
        color: colors.border,
        fontWeight: 700,
        fontSize: '12px',
        lineHeight: '16px',
      }}
    >
      {children}
    </Box>
  )
}

// Section component for rendering category groups
const ComponentSection = ({ id, title, components }) => (
  <Box id={id} sx={{ mb: 6, scrollMarginTop: 100 }}>
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
      {title}
    </Typography>
    <Grid container spacing={3}>
      {components.map((component) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={component.name}>
          <ComponentCard
            name={component.name}
            path={component.path}
            preview={component.preview}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
)

function DSCollectionPage() {
  const [activeSection, setActiveSection] = useState('foundation')

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

  // Foundation components
  const foundationComponents = [
    {
      name: 'Box',
      path: '/ds-collection/box',
      preview: (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ p: 1.5, bgcolor: 'primary.main', color: 'white', borderRadius: 1, fontSize: '0.7rem' }}>Box</Box>
          <Box sx={{ p: 1.5, bgcolor: 'grey.200', borderRadius: 1, fontSize: '0.7rem' }}>Box</Box>
        </Box>
      ),
    },
    {
      name: 'Palette',
      path: '/ds-collection/palette',
      preview: (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'primary.main', borderRadius: 1 }} />
          <Box sx={{ width: 40, height: 40, bgcolor: 'secondary.main', borderRadius: 1 }} />
          <Box sx={{ width: 40, height: 40, bgcolor: 'error.main', borderRadius: 1 }} />
        </Box>
      ),
    },
    {
      name: 'Typography',
      path: '/ds-collection/typography',
      preview: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6">Heading</Typography>
          <Typography variant="body1">Body Text</Typography>
          <Typography variant="caption">Caption</Typography>
        </Box>
      ),
    },
    {
      name: 'Spacing',
      path: '/ds-collection/spacing',
      preview: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ width: 80, height: 8, bgcolor: 'grey.300', borderRadius: 0.5 }} />
          <Box sx={{ width: 120, height: 8, bgcolor: 'grey.300', borderRadius: 0.5 }} />
          <Box sx={{ width: 160, height: 8, bgcolor: 'grey.300', borderRadius: 0.5 }} />
        </Box>
      ),
    },
    {
      name: 'Elevation',
      path: '/ds-collection/elevation',
      preview: (
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Box sx={{ width: 36, height: 36, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }} />
          <Box sx={{ width: 36, height: 36, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 3 }} />
          <Box sx={{ width: 36, height: 36, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 6 }} />
        </Box>
      ),
    },
    {
      name: 'Breakpoints',
      path: '/ds-collection/breakpoints',
      preview: (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-end' }}>
          <Box sx={{ width: 12, height: 24, bgcolor: 'grey.400', borderRadius: 0.5 }} />
          <Box sx={{ width: 12, height: 32, bgcolor: 'grey.400', borderRadius: 0.5 }} />
          <Box sx={{ width: 12, height: 40, bgcolor: 'grey.400', borderRadius: 0.5 }} />
          <Box sx={{ width: 12, height: 48, bgcolor: 'grey.400', borderRadius: 0.5 }} />
        </Box>
      ),
    },
    {
      name: 'Icons',
      path: '/ds-collection/icons',
      preview: (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <HomeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <MailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <DeleteIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
        </Box>
      ),
    },
  ]

  // Layout components
  const layoutComponents = [
    {
      name: 'Container',
      path: '/ds-collection/container',
      preview: (
        <Box sx={{ width: 200, bgcolor: 'grey.100', p: 0.5 }}>
          <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 1, textAlign: 'center', mx: 'auto', maxWidth: 160, fontSize: '0.7rem' }}>
            Centered
          </Box>
        </Box>
      ),
    },
    {
      name: 'Grid',
      path: '/ds-collection/grid',
      preview: (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', width: 120 }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Box key={i} sx={{ width: 36, height: 24, bgcolor: 'primary.main', borderRadius: 0.5 }} />
          ))}
        </Box>
      ),
    },
    {
      name: 'Stack',
      path: '/ds-collection/stack',
      preview: (
        <Stack direction="row" spacing={1}>
          <Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white', borderRadius: 1, fontSize: '0.7rem' }}>A</Box>
          <Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white', borderRadius: 1, fontSize: '0.7rem' }}>B</Box>
          <Box sx={{ p: 1, bgcolor: 'primary.main', color: 'white', borderRadius: 1, fontSize: '0.7rem' }}>C</Box>
        </Stack>
      ),
    },
    {
      name: 'Divider',
      path: '/ds-collection/divider',
      preview: (
        <Box sx={{ width: 200, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption">A</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="caption">B</Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="caption">C</Typography>
          </Box>
        </Box>
      ),
    },
    {
      name: 'Paper',
      path: '/ds-collection/paper',
      preview: (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Paper elevation={1} sx={{ width: 50, height: 50 }} />
          <Paper elevation={4} sx={{ width: 50, height: 50 }} />
          <Paper elevation={8} sx={{ width: 50, height: 50 }} />
        </Box>
      ),
    },
  ]

  // Input components
  const inputComponents = [
    {
      name: 'Text Field',
      path: '/ds-collection/text-field',
      preview: <TextField placeholder="Enter text..." size="small" />,
    },
    {
      name: 'Textarea Autosize',
      path: '/ds-collection/textarea-autosize',
      preview: (
        <TextareaAutosize
          placeholder="Auto-growing..."
          minRows={2}
          style={{
            width: 140,
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #E0E0E0',
            fontFamily: 'inherit',
            fontSize: '0.875rem',
            resize: 'none',
          }}
        />
      ),
    },
    {
      name: 'Select',
      path: '/ds-collection/select',
      preview: (
        <Select value="option1" size="small" sx={{ minWidth: 120 }}>
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
        </Select>
      ),
    },
    {
      name: 'Autocomplete',
      path: '/ds-collection/autocomplete',
      preview: (
        <Autocomplete
          options={['Option 1', 'Option 2', 'Option 3']}
          renderInput={(params) => <TextField {...params} placeholder="Search..." size="small" />}
          sx={{ width: 200 }}
          size="small"
        />
      ),
    },
    {
      name: 'Checkbox',
      path: '/ds-collection/checkbox',
      preview: (
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Checkbox"
        />
      ),
    },
    {
      name: 'Checkbox Group',
      path: '/ds-collection/checkbox-group',
      preview: (
        <Box>
          <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Option 1" />
          <FormControlLabel control={<Checkbox size="small" />} label="Option 2" />
        </Box>
      ),
    },
    {
      name: 'Radio',
      path: '/ds-collection/radio',
      preview: (
        <RadioGroup defaultValue="option1">
          <FormControlLabel value="option1" control={<Radio size="small" />} label="Option 1" />
        </RadioGroup>
      ),
    },
    {
      name: 'Radio Group',
      path: '/ds-collection/radio-group',
      preview: (
        <RadioGroup defaultValue="option1">
          <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
          <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
        </RadioGroup>
      ),
    },
    {
      name: 'Switch',
      path: '/ds-collection/switch',
      preview: (
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Switch"
        />
      ),
    },
    {
      name: 'Slider',
      path: '/ds-collection/slider',
      preview: <Slider defaultValue={50} sx={{ width: 200 }} />,
    },
    {
      name: 'Rating',
      path: '/ds-collection/rating',
      preview: <Rating value={4} readOnly />,
    },
    {
      name: 'Toggle Button',
      path: '/ds-collection/toggle-button',
      preview: (
        <ToggleButtonGroup
          value="center"
          exclusive
          sx={{
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontSize: '0.875rem',
              padding: '6px 12px',
              border: '1px solid',
              borderColor: 'grey.300',
              '&.Mui-selected': {
                backgroundColor: 'rgba(29, 159, 159, 0.12)',
                color: 'text.primary',
                border: '1px solid',
                borderColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(29, 159, 159, 0.16)',
                },
              },
            },
          }}
        >
          <ToggleButton value="left">Left</ToggleButton>
          <ToggleButton value="center">Center</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
      ),
    },
    {
      name: 'Find',
      path: '/ds-collection/find',
      preview: (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          borderRadius: '999px',
          px: 2,
          py: 1,
          border: '1px solid',
          borderColor: 'divider',
          width: 200,
        }}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Find...</Typography>
        </Box>
      ),
    },
    {
      name: 'File Upload',
      path: '/ds-collection/file-upload',
      preview: (
        <Button variant="outlined" startIcon={<CloudUploadIcon />}>
          Upload
        </Button>
      ),
    },
  ]

  // Navigation components
  const navigationComponents = [
    {
      name: 'App Bar',
      path: '/ds-collection/app-bar',
      preview: (
        <Box sx={{ width: 200, borderRadius: 1, overflow: 'hidden' }}>
          <AppBar position="static" sx={{ minHeight: 36 }}>
            <Toolbar variant="dense" sx={{ minHeight: 36 }}>
              <Typography variant="caption" sx={{ flexGrow: 1 }}>App</Typography>
              <IconButton size="small" color="inherit"><SearchIcon sx={{ fontSize: 16 }} /></IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      ),
    },
    {
      name: 'Tabs',
      path: '/ds-collection/tabs',
      preview: (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 200 }}>
          <Tabs value={0} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
            <Tab label={<Typography variant="caption">Tab 1</Typography>} sx={{ minHeight: 36, py: 1 }} />
            <Tab label={<Typography variant="caption">Tab 2</Typography>} sx={{ minHeight: 36, py: 1 }} />
          </Tabs>
        </Box>
      ),
    },
    {
      name: 'Breadcrumbs',
      path: '/ds-collection/breadcrumbs',
      preview: (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ fontSize: '0.75rem' }}>
          <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '0.75rem' }}>Home</Link>
          <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '0.75rem' }}>Category</Link>
          <Typography color="text.primary" sx={{ fontSize: '0.75rem' }}>Page</Typography>
        </Breadcrumbs>
      ),
    },
    {
      name: 'Links',
      path: '/ds-collection/links',
      preview: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: '0.875rem',
              textDecoration: 'underline',
              textDecorationColor: 'transparent',
              transition: 'text-decoration-color 0.2s',
              '&:hover': {
                textDecorationColor: 'primary.main',
              },
            }}
          >
            Link text
          </Typography>
        </Box>
      ),
    },
    {
      name: 'Menu',
      path: '/ds-collection/menu',
      preview: (
        <Paper sx={{ width: 140 }}>
          <Box sx={{ py: 0.5, px: 2, '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="caption">Edit</Typography>
          </Box>
          <Box sx={{ py: 0.5, px: 2, '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="caption">Copy</Typography>
          </Box>
          <Box sx={{ py: 0.5, px: 2, '&:hover': { bgcolor: 'action.hover' } }}>
            <Typography variant="caption">Delete</Typography>
          </Box>
        </Paper>
      ),
    },
    {
      name: 'Drawer',
      path: '/ds-collection/drawer',
      preview: (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <MenuOpenIcon sx={{ color: 'text.secondary', fontSize: 24 }} />
          <Box>
            <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
              Side Panel
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.7rem' }}>
              Click to expand
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      name: 'Bottom Navigation',
      path: '/ds-collection/bottom-navigation',
      preview: (
        <Paper sx={{ width: 200 }}>
          <BottomNavigation value={0} showLabels sx={{ height: 48 }}>
            <BottomNavigationAction label="Home" icon={<HomeIcon sx={{ fontSize: 18 }} />} sx={{ minWidth: 50, '& .MuiBottomNavigationAction-label': { fontSize: '0.6rem' } }} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon sx={{ fontSize: 18 }} />} sx={{ minWidth: 50, '& .MuiBottomNavigationAction-label': { fontSize: '0.6rem' } }} />
            <BottomNavigationAction label="Profile" icon={<PersonIcon sx={{ fontSize: 18 }} />} sx={{ minWidth: 50, '& .MuiBottomNavigationAction-label': { fontSize: '0.6rem' } }} />
          </BottomNavigation>
        </Paper>
      ),
    },
    {
      name: 'Pagination',
      path: '/ds-collection/pagination',
      preview: (
        <Pagination
          count={5}
          page={2}
          size="small"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '0.7rem',
              minWidth: 24,
              height: 24,
            },
          }}
        />
      ),
    },
    {
      name: 'Stepper',
      path: '/ds-collection/stepper',
      preview: (
        <Stepper
          activeStep={1}
          alternativeLabel
          sx={{
            width: 220,
            '& .MuiStepLabel-label': {
              fontSize: '0.7rem',
            },
            '& .MuiStepIcon-root': {
              fontSize: '1.2rem',
            },
          }}
        >
          <Step completed>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>
      ),
    },
  ]

  // Feedback components
  const feedbackComponents = [
    {
      name: 'Alert',
      path: '/ds-collection/alert',
      preview: (
        <Alert
          severity="info"
          icon={<InfoOutlinedIcon sx={{ fontSize: 18 }} />}
          sx={{
            '& .MuiAlert-message': {
              fontSize: '0.875rem',
            },
          }}
        >
          Alert message
        </Alert>
      ),
    },
    {
      name: 'Snackbar',
      path: '/ds-collection/snackbar',
      preview: (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Snackbar
            open={true}
            message="Snackbar message"
            action={
              <IconButton size="small" aria-label="close" color="inherit">
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            }
            sx={{
              position: 'static',
              transform: 'none',
              '& .MuiSnackbarContent-root': {
                backgroundColor: '#333333',
                color: 'white',
                minWidth: 'auto',
                fontSize: '0.875rem',
              },
            }}
          />
        </Box>
      ),
    },
    {
      name: 'Dialog',
      path: '/ds-collection/dialog',
      preview: (
        <Box
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            backgroundColor: 'background.paper',
            width: 220,
          }}
        >
          <Box
            sx={{
              px: 2,
              pt: 1.5,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
              Dialog title
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                color: 'text.secondary',
              }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Dialog content goes here with description text.
            </Typography>
          </Box>
          <Box
            sx={{
              px: 2,
              pb: 1.5,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
            }}
          >
            <Button size="small" sx={{ textTransform: 'none', fontSize: '0.7rem', minWidth: 'auto', px: 1.5 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: 'none', fontSize: '0.7rem', minWidth: 'auto', px: 1.5 }}
            >
              OK
            </Button>
          </Box>
        </Box>
      ),
    },
    {
      name: 'Progress',
      path: '/ds-collection/progress',
      preview: (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <CircularProgress size={24} thickness={4} />
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'grey.400' }} />
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'grey.400' }} />
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'grey.400' }} />
          </Box>
        </Box>
      ),
    },
    {
      name: 'Tooltip',
      path: '/ds-collection/tooltip',
      preview: (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Tooltip title="Helpful hint" arrow>
            <Button variant="outlined" size="small">Hover me</Button>
          </Tooltip>
          <Tooltip title="Delete item">
            <IconButton size="small">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ]

  // Data Display components
  const dataDisplayComponents = [
    {
      name: 'Avatar',
      path: '/ds-collection/avatar',
      preview: (
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '0.875rem' }}>JD</Avatar>
          <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: '0.875rem' }}>AM</Avatar>
          <Avatar sx={{ bgcolor: 'error.main', width: 32, height: 32, fontSize: '0.875rem' }}>SK</Avatar>
        </Box>
      ),
    },
    {
      name: 'Badge',
      path: '/ds-collection/badge',
      preview: (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Badge badgeContent={1} color="primary">
            <MailIcon sx={{ color: 'text.secondary' }} />
          </Badge>
          <Badge badgeContent="88+" color="secondary">
            <MailIcon sx={{ color: 'text.secondary' }} />
          </Badge>
          <Badge variant="dot" color="secondary">
            <MailIcon sx={{ color: 'text.secondary' }} />
          </Badge>
        </Box>
      ),
    },
    {
      name: 'Chip',
      path: '/ds-collection/chip',
      preview: (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="Default"
            variant="outlined"
            sx={{
              backgroundColor: 'grey.100',
              borderColor: 'grey.400',
            }}
          />
          <Chip
            label="Actionable"
            variant="outlined"
            onDelete={() => {}}
            sx={{
              backgroundColor: 'grey.100',
              borderColor: 'grey.400',
            }}
          />
        </Box>
      ),
    },
    {
      name: 'Indicator',
      path: '/ds-collection/indicator',
      preview: (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <IndicatorPreview color="success">Active</IndicatorPreview>
          <IndicatorPreview color="error">Error</IndicatorPreview>
          <IndicatorPreview color="blue">EMEA</IndicatorPreview>
        </Box>
      ),
    },
    {
      name: 'List',
      path: '/ds-collection/list',
      preview: (
        <List dense sx={{ width: 200, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 1, py: 1 }}>
          <ListItem sx={{ py: 0.5, fontSize: '0.75rem' }}>
            <ListItemText primary="Last 7 days" primaryTypographyProps={{ variant: 'caption', fontSize: '0.875rem' }} />
          </ListItem>
          <ListItem
            sx={{
              py: 0.5,
              bgcolor: 'rgba(8, 145, 178, 0.08)',
              borderLeft: '3px solid',
              borderLeftColor: 'primary.main',
            }}
          >
            <ListItemText
              primary="Last 14 days"
              primaryTypographyProps={{ variant: 'caption', fontSize: '0.875rem', fontWeight: 600 }}
            />
          </ListItem>
          <ListItem sx={{ py: 0.5 }}>
            <ListItemText primary="Last 30 days" primaryTypographyProps={{ variant: 'caption', fontSize: '0.875rem' }} />
          </ListItem>
          <Divider sx={{ my: 0.5 }} />
          <ListItem sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <SearchIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            </ListItemIcon>
            <ListItemText primary="Custom" primaryTypographyProps={{ variant: 'caption', fontSize: '0.875rem' }} />
          </ListItem>
        </List>
      ),
    },
    {
      name: 'Table',
      path: '/ds-collection/table',
      preview: (
        <Box sx={{ width: 240, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: 'grey.50', py: 0.5, fontSize: '0.65rem', fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ bgcolor: 'grey.50', py: 0.5, fontSize: '0.65rem', fontWeight: 600 }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell sx={{ py: 0.5, fontSize: '0.7rem' }}>Alice J.</TableCell>
                <TableCell sx={{ py: 0.5, fontSize: '0.7rem' }}>Admin</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell sx={{ py: 0.5, fontSize: '0.7rem' }}>Bob S.</TableCell>
                <TableCell sx={{ py: 0.5, fontSize: '0.7rem' }}>Editor</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      ),
    },
    {
      name: 'Tree List',
      path: '/ds-collection/tree-list',
      preview: (
        <Paper variant="outlined" sx={{ width: 160, p: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <ExpandMoreIcon sx={{ fontSize: 14 }} />
            <Checkbox size="small" sx={{ p: 0 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>Folder</Typography>
          </Box>
          <Box sx={{ pl: 3, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Checkbox size="small" sx={{ p: 0 }} checked />
            <Typography variant="caption">File.txt</Typography>
          </Box>
        </Paper>
      ),
    },
  ]

  // Surfaces & Actions components
  const surfacesComponents = [
    {
      name: 'Button',
      path: '/ds-collection/button',
      preview: <Button variant="contained">Button</Button>,
    },
    {
      name: 'Button Group',
      path: '/ds-collection/button-group',
      preview: (
        <ButtonGroup variant="contained" size="small">
          <Button>One</Button>
          <Button>Two</Button>
          <Button><ArrowDropDownIcon /></Button>
        </ButtonGroup>
      ),
    },
    {
      name: 'FAB',
      path: '/ds-collection/fab',
      preview: (
        <Fab variant="extended" sx={{ textTransform: 'none' }}>
          <AddIcon sx={{ mr: 1 }} />
          Floating Action Button
        </Fab>
      ),
    },
    {
      name: 'Speed Dial',
      path: '/ds-collection/speed-dial',
      preview: (
        <Box sx={{ position: 'relative', height: 80, width: 160, bgcolor: 'grey.100', borderRadius: 1 }}>
          <SpeedDial
            ariaLabel="Speed Dial preview"
            sx={{ position: 'absolute', bottom: 8, right: 8 }}
            icon={<SpeedDialIcon />}
            FabProps={{ size: 'small' }}
          >
            <SpeedDialAction icon={<FileCopyIcon />} tooltipTitle="Copy" />
            <SpeedDialAction icon={<PrintIcon />} tooltipTitle="Print" />
            <SpeedDialAction icon={<ShareIcon />} tooltipTitle="Share" />
          </SpeedDial>
        </Box>
      ),
    },
    {
      name: 'Card',
      path: '/ds-collection/card',
      preview: (
        <Card sx={{ width: 180 }}>
          <CardMedia
            component="img"
            height="120"
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop"
            alt="Card preview"
          />
          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              Card
            </Typography>
          </CardContent>
        </Card>
      ),
    },
    {
      name: 'Accordion',
      path: '/ds-collection/accordion',
      preview: (
        <Box sx={{ width: 240 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="caption">Expandable Panel</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="caption" color="text.secondary">
                Content inside accordion
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      ),
    },
    {
      name: 'Popover',
      path: '/ds-collection/popover',
      preview: (
        <Box sx={{ position: 'relative' }}>
          <Button size="small" variant="outlined">Trigger</Button>
          <Paper sx={{ position: 'absolute', top: 32, left: 0, p: 1.5, zIndex: 1 }}>
            <Typography variant="caption">Popover content</Typography>
          </Paper>
        </Box>
      ),
    },
  ]

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', px: 3, pt: 6, pb: 8 }}>
      {/* Main Content */}
      <Box sx={{ maxWidth: 900, width: '100%' }}>
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
            Design System Collection
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, lineHeight: 1.6 }}>
            Browse themed components from the design system. Click any card to see all variants and props.
          </Typography>
        </Box>

        {/* Sections */}
        <ComponentSection id="foundation" title="Foundation" components={foundationComponents} />
        <ComponentSection id="layout" title="Layout" components={layoutComponents} />
        <ComponentSection id="inputs" title="Inputs" components={inputComponents} />
        <ComponentSection id="navigation" title="Navigation" components={navigationComponents} />
        <ComponentSection id="feedback" title="Feedback" components={feedbackComponents} />
        <ComponentSection id="data-display" title="Data Display" components={dataDisplayComponents} />
        <ComponentSection id="surfaces" title="Surfaces & Actions" components={surfacesComponents} />
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
        <Box sx={{ position: 'fixed', top: 80 }}>
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

export default DSCollectionPage
