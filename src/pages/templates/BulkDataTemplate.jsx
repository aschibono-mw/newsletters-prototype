import { useState, useRef, useEffect } from 'react'
import { Box, Container, Typography, Button, Card, CardContent, IconButton, TextField, Chip, Stepper, Step, StepLabel, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, FormControlLabel, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Alert, Avatar, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Indicator from '../../components/core/Indicator'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import CloudUploadIcon from '@mui/icons-material/CloudUploadRounded'
import DownloadIcon from '@mui/icons-material/DownloadRounded'
import DeleteIcon from '@mui/icons-material/DeleteRounded'
import EditIcon from '@mui/icons-material/EditRounded'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorIcon from '@mui/icons-material/ErrorRounded'
import WarningIcon from '@mui/icons-material/WarningRounded'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFileRounded'
import SwapHorizIcon from '@mui/icons-material/SwapHorizRounded'
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded'
import RefreshIcon from '@mui/icons-material/RefreshRounded'
import HistoryIcon from '@mui/icons-material/HistoryRounded'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'

const sampleMappings = [
  { source: 'First Name', target: 'first_name', required: true, matched: true },
  { source: 'Last Name', target: 'last_name', required: true, matched: true },
  { source: 'Email Address', target: 'email', required: true, matched: true },
  { source: 'Phone', target: 'phone_number', required: false, matched: true },
  { source: 'Company', target: 'company_name', required: false, matched: true },
  { source: 'Notes', target: null, required: false, matched: false },
]

const validationErrors = [
  { row: 15, field: 'email', value: 'invalid-email', error: 'Invalid email format' },
  { row: 23, field: 'phone_number', value: '123', error: 'Phone number too short' },
  { row: 45, field: 'first_name', value: '', error: 'Required field is empty' },
  { row: 67, field: 'email', value: 'test@', error: 'Invalid email format' },
]

const importHistory = [
  { id: 1, date: '2024-11-24 10:30', file: 'contacts_nov.csv', records: 500, success: 488, failed: 12, status: 'completed' },
  { id: 2, date: '2024-11-23 14:15', file: 'leads_batch2.xlsx', records: 1200, success: 1200, failed: 0, status: 'completed' },
  { id: 3, date: '2024-11-22 09:00', file: 'customers_update.csv', records: 350, success: 0, failed: 350, status: 'failed' },
  { id: 4, date: '2024-11-21 16:45', file: 'contacts_oct.csv', records: 800, success: 795, failed: 5, status: 'completed' },
]

const targetFields = [
  { name: 'first_name', type: 'text', required: true },
  { name: 'last_name', type: 'text', required: true },
  { name: 'email', type: 'email', required: true },
  { name: 'phone_number', type: 'phone', required: false },
  { name: 'company_name', type: 'text', required: false },
  { name: 'job_title', type: 'text', required: false },
  { name: 'address', type: 'text', required: false },
  { name: 'custom_field_1', type: 'text', required: false },
]

function BulkDataTemplate() {
  const [currentTab, setCurrentTab] = useState('import')
  const [importStep, setImportStep] = useState(0)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false)
  const [, setExportDialogOpen] = useState(false) // eslint-disable-line no-unused-vars
  const [, setBulkUpdateDialogOpen] = useState(false) // eslint-disable-line no-unused-vars
  const [importing, setImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const importIntervalRef = useRef(null)

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (importIntervalRef.current) {
        clearInterval(importIntervalRef.current)
      }
    }
  }, [])

  const handleFileUpload = () => {
    setUploadedFile({ name: 'contacts_import.csv', size: '2.4 MB', rows: 500 })
  }

  const startImport = () => {
    setImporting(true)
    let progress = 0
    importIntervalRef.current = setInterval(() => {
      progress += 10
      setImportProgress(progress)
      if (progress >= 100) {
        clearInterval(importIntervalRef.current)
        importIntervalRef.current = null
        setImporting(false)
        setImportStep(4)
      }
    }, 500)
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100' }}>
      {/* Header */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button component={RouterLink} to="/templates" startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>
                Back to Templates
              </Button>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>Bulk Data Management</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<HistoryIcon />} onClick={() => setHistoryDialogOpen(true)} sx={{ textTransform: 'none' }}>History</Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Tabs */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
            {[
              { id: 'import', label: 'Import Data', icon: <CloudUploadIcon /> },
              { id: 'export', label: 'Export Data', icon: <DownloadIcon /> },
              { id: 'bulk-update', label: 'Bulk Update', icon: <EditIcon /> },
              { id: 'bulk-delete', label: 'Bulk Delete', icon: <DeleteIcon /> },
            ].map((tab) => (
              <Chip
                key={tab.id}
                icon={tab.icon}
                label={tab.label}
                variant={currentTab === tab.id ? 'filled' : 'outlined'}
                color={currentTab === tab.id ? 'primary' : 'default'}
                onClick={() => setCurrentTab(tab.id)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {currentTab === 'import' && (
          <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Stepper activeStep={importStep} sx={{ mb: 4 }}>
                {['Upload File', 'Map Columns', 'Configure', 'Validate', 'Import'].map((label) => (
                  <Step key={label}><StepLabel>{label}</StepLabel></Step>
                ))}
              </Stepper>

              {importStep === 0 && (
                <Box>
                  <Box
                    onClick={handleFileUpload}
                    sx={{
                      border: '2px dashed',
                      borderColor: 'grey.300',
                      borderRadius: 2,
                      p: 6,
                      textAlign: 'center',
                      cursor: 'pointer',
                      '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' },
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>Drop your file here or click to browse</Typography>
                    <Typography variant="body2" color="text.secondary">Supports CSV, Excel (XLS/XLSX), JSON</Typography>
                    <Typography variant="caption" color="text.secondary">Maximum file size: 100MB</Typography>
                  </Box>

                  {uploadedFile && (
                    <Box sx={{ mt: 3, p: 2, backgroundColor: 'success.50', borderRadius: 1, border: '1px solid', borderColor: 'success.200', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: 'success.main' }} />
                      <InsertDriveFileIcon sx={{ color: 'text.secondary' }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{uploadedFile.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{uploadedFile.size} • {uploadedFile.rows} rows detected</Typography>
                      </Box>
                      <IconButton size="small" onClick={() => setUploadedFile(null)}><CloseIcon /></IconButton>
                    </Box>
                  )}

                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }}>Download Template</Button>
                  </Box>
                </Box>
              )}

              {importStep === 1 && (
                <Box>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    We've auto-detected column mappings. Please review and adjust if needed.
                  </Alert>
                  <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'grey.50' }}>
                          <TableCell>Source Column</TableCell>
                          <TableCell sx={{ width: 60 }}></TableCell>
                          <TableCell>Target Field</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sampleMappings.map((mapping, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <Typography variant="body2">{mapping.source}</Typography>
                            </TableCell>
                            <TableCell>
                              <ArrowForwardIcon sx={{ color: 'text.secondary' }} />
                            </TableCell>
                            <TableCell>
                              <FormControl size="small" fullWidth>
                                <Select value={mapping.target || ''} displayEmpty>
                                  <MenuItem value=""><em>Do not import</em></MenuItem>
                                  {targetFields.map((field) => (
                                    <MenuItem key={field.name} value={field.name}>
                                      {field.name} {field.required && '*'}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              {mapping.matched ? (
                                <Indicator label="Mapped" size="small" status="success" />
                              ) : (
                                <Indicator label="Not Mapped" size="small" status="warning" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {importStep === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Import Options</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Duplicate Handling</Typography>
                      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                        <InputLabel>When a duplicate is found</InputLabel>
                        <Select label="When a duplicate is found" defaultValue="update">
                          <MenuItem value="skip">Skip record</MenuItem>
                          <MenuItem value="update">Update existing record</MenuItem>
                          <MenuItem value="create">Create duplicate</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                        <InputLabel>Match duplicates by</InputLabel>
                        <Select label="Match duplicates by" defaultValue="email">
                          <MenuItem value="email">Email</MenuItem>
                          <MenuItem value="id">Record ID</MenuItem>
                          <MenuItem value="name">Name + Company</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Data Transformations</Typography>
                      <FormControlLabel control={<Checkbox defaultChecked size="small" />} label={<Typography variant="body2">Trim whitespace</Typography>} />
                      <FormControlLabel control={<Checkbox defaultChecked size="small" />} label={<Typography variant="body2">Standardize phone numbers</Typography>} />
                      <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">Convert names to Title Case</Typography>} />
                      <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">Remove duplicate rows</Typography>} />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {importStep === 3 && (
                <Box>
                  <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                    <Card sx={{ flex: 1, p: 2, textAlign: 'center', backgroundColor: 'success.50' }}>
                      <CheckCircleIcon sx={{ color: 'success.main', fontSize: 32, mb: 1 }} />
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>488</Typography>
                      <Typography variant="body2" color="text.secondary">Valid Records</Typography>
                    </Card>
                    <Card sx={{ flex: 1, p: 2, textAlign: 'center', backgroundColor: 'warning.50' }}>
                      <WarningIcon sx={{ color: 'warning.main', fontSize: 32, mb: 1 }} />
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>8</Typography>
                      <Typography variant="body2" color="text.secondary">Warnings</Typography>
                    </Card>
                    <Card sx={{ flex: 1, p: 2, textAlign: 'center', backgroundColor: 'error.50' }}>
                      <ErrorIcon sx={{ color: 'error.main', fontSize: 32, mb: 1 }} />
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>4</Typography>
                      <Typography variant="body2" color="text.secondary">Errors</Typography>
                    </Card>
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Validation Errors</Typography>
                  <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 3 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'grey.50' }}>
                          <TableCell>Row</TableCell>
                          <TableCell>Field</TableCell>
                          <TableCell>Value</TableCell>
                          <TableCell>Error</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {validationErrors.map((error, i) => (
                          <TableRow key={i}>
                            <TableCell>{error.row}</TableCell>
                            <TableCell>{error.field}</TableCell>
                            <TableCell><code>{error.value}</code></TableCell>
                            <TableCell><Typography variant="body2" color="error">{error.error}</Typography></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }}>Download Error Report</Button>
                    <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">Skip errors and proceed with valid records</Typography>} />
                  </Box>
                </Box>
              )}

              {importStep === 4 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  {importing ? (
                    <>
                      <Typography variant="h6" sx={{ mb: 2 }}>Importing records...</Typography>
                      <LinearProgress variant="determinate" value={importProgress} sx={{ maxWidth: 400, mx: 'auto', mb: 2 }} />
                      <Typography variant="body2" color="text.secondary">{importProgress}% complete</Typography>
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>Import Complete!</Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Successfully imported 488 records. 4 records were skipped due to errors.
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button variant="outlined" sx={{ textTransform: 'none' }}>View Imported Records</Button>
                        <Button variant="contained" onClick={() => { setImportStep(0); setUploadedFile(null) }} sx={{ textTransform: 'none' }}>Start New Import</Button>
                      </Box>
                    </>
                  )}
                </Box>
              )}

              {importStep < 4 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    disabled={importStep === 0}
                    onClick={() => setImportStep(importStep - 1)}
                    sx={{ textTransform: 'none' }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    disabled={importStep === 0 && !uploadedFile}
                    onClick={() => importStep === 3 ? startImport() : setImportStep(importStep + 1)}
                    startIcon={importStep === 3 ? <PlayArrowIcon /> : null}
                    sx={{ textTransform: 'none' }}
                  >
                    {importStep === 3 ? 'Start Import' : 'Continue'}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {currentTab === 'export' && (
          <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Export Data</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Data Type</InputLabel>
                    <Select label="Data Type" defaultValue="contacts">
                      <MenuItem value="contacts">Contacts</MenuItem>
                      <MenuItem value="companies">Companies</MenuItem>
                      <MenuItem value="deals">Deals</MenuItem>
                      <MenuItem value="tasks">Tasks</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Format</InputLabel>
                    <Select label="Format" defaultValue="csv">
                      <MenuItem value="csv">CSV</MenuItem>
                      <MenuItem value="xlsx">Excel (XLSX)</MenuItem>
                      <MenuItem value="json">JSON</MenuItem>
                      <MenuItem value="xml">XML</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="outlined" startIcon={<FilterListIcon />} fullWidth sx={{ textTransform: 'none', mb: 3 }}>
                    Add Filters
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Select Fields to Export</Typography>
                  <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2, maxHeight: 200, overflow: 'auto' }}>
                    {targetFields.map((field) => (
                      <FormControlLabel
                        key={field.name}
                        control={<Checkbox defaultChecked size="small" />}
                        label={<Typography variant="body2">{field.name}</Typography>}
                        sx={{ display: 'block', mb: 0.5 }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" startIcon={<SettingsIcon />} sx={{ textTransform: 'none' }}>Schedule Export</Button>
                <Button variant="contained" startIcon={<DownloadIcon />} sx={{ textTransform: 'none' }}>Export Now</Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {currentTab === 'bulk-update' && (
          <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Bulk Update Records</Typography>
              <Alert severity="warning" sx={{ mb: 3 }}>
                This action will update multiple records at once. Please review carefully before proceeding.
              </Alert>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>1. Select Records</Typography>
                  <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Record Type</InputLabel>
                    <Select label="Record Type" defaultValue="contacts">
                      <MenuItem value="contacts">Contacts</MenuItem>
                      <MenuItem value="companies">Companies</MenuItem>
                      <MenuItem value="deals">Deals</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="outlined" startIcon={<FilterListIcon />} fullWidth sx={{ textTransform: 'none' }}>
                    Configure Filters
                  </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>234 records match your criteria</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>2. Define Updates</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <FormControl size="small" sx={{ flex: 1 }}>
                      <InputLabel>Field</InputLabel>
                      <Select label="Field" defaultValue="">
                        {targetFields.map((field) => (
                          <MenuItem key={field.name} value={field.name}>{field.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ width: 120 }}>
                      <InputLabel>Action</InputLabel>
                      <Select label="Action" defaultValue="set">
                        <MenuItem value="set">Set to</MenuItem>
                        <MenuItem value="clear">Clear</MenuItem>
                        <MenuItem value="append">Append</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField size="small" placeholder="Value" sx={{ flex: 1 }} />
                  </Box>
                  <Button startIcon={<AddIcon />} size="small" sx={{ textTransform: 'none' }}>Add Another Update</Button>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" sx={{ textTransform: 'none' }}>Preview Changes</Button>
                <Button variant="contained" color="warning" sx={{ textTransform: 'none' }}>Apply Updates</Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {currentTab === 'bulk-delete' && (
          <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Bulk Delete Records</Typography>
              <Alert severity="error" sx={{ mb: 3 }}>
                Warning: Deleted records cannot be recovered. Please proceed with caution.
              </Alert>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                <InputLabel>Record Type</InputLabel>
                <Select label="Record Type" defaultValue="contacts">
                  <MenuItem value="contacts">Contacts</MenuItem>
                  <MenuItem value="companies">Companies</MenuItem>
                  <MenuItem value="deals">Deals</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ textTransform: 'none', mb: 2 }}>
                Configure Filters
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>56 records match your criteria</Typography>
              <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">I understand this action cannot be undone</Typography>} />
              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" sx={{ textTransform: 'none' }}>Preview Records</Button>
                <Button variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ textTransform: 'none' }}>Delete Records</Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* History Dialog */}
      <Dialog open={historyDialogOpen} onClose={() => setHistoryDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Import History</DialogTitle>
        <DialogContent dividers>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.50' }}>
                  <TableCell>Date</TableCell>
                  <TableCell>File</TableCell>
                  <TableCell>Records</TableCell>
                  <TableCell>Success</TableCell>
                  <TableCell>Failed</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {importHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.file}</TableCell>
                    <TableCell>{item.records}</TableCell>
                    <TableCell><Typography color="success.main">{item.success}</Typography></TableCell>
                    <TableCell><Typography color="error.main">{item.failed}</Typography></TableCell>
                    <TableCell>
                      <Chip label={item.status} size="small" color={item.status === 'completed' ? 'success' : 'error'} />
                    </TableCell>
                    <TableCell>
                      <Button size="small" sx={{ textTransform: 'none' }}>View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryDialogOpen(false)} sx={{ textTransform: 'none' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BulkDataTemplate
