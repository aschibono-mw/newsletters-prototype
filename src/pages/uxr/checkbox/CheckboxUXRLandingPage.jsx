import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'

export default function CheckboxUXRLandingPage() {
  const prototypes = [
    { title: 'Interactive Demo', icon: <TouchAppOutlinedIcon sx={{ fontSize: 20 }} />, path: '/uxr/checkbox/interactive' },
    { title: 'Guided Test Flow', icon: <AssignmentOutlinedIcon sx={{ fontSize: 20 }} />, path: '/uxr/checkbox/guided' },
  ]

  const behaviorOptions = [
    { option: 'Option A', behavior: 'Select All', description: 'Indeterminate click selects all items' },
    { option: 'Option B', behavior: 'Deselect All', description: 'Indeterminate click deselects all items' },
    { option: 'Option D', behavior: 'Dropdown Menu', description: 'Shows menu with explicit selection choices' },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ backgroundColor: 'grey.100', minHeight: 'calc(100vh - 200px)', px: 3, py: 4 }}>
        <Box sx={{ maxWidth: 1536, mx: 'auto' }}>
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
              Indeterminate Checkbox UXR
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Test user expectations for indeterminate checkbox behavior
            </Typography>
          </Box>

          {/* Prototype Selection */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Choose Prototype
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              {prototypes.map((item) => (
                <Card
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.dark',
                        mx: 'auto',
                        mb: 1,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Behavior Options Reference */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Behaviors Being Tested
            </Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Option</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Behavior</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {behaviorOptions.map((item) => (
                    <TableRow key={item.option}>
                      <TableCell sx={{ fontWeight: 500 }}>{item.option}</TableCell>
                      <TableCell>{item.behavior}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
