import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  LinearProgress,
  Switch,
  FormControlLabel,
  Divider,
  Rating,
  Radio,
  RadioGroup,
  FormLabel,
  Checkbox,
  Slider,
} from '@mui/material'
import Indicator from '../../components/core/Indicator'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  Visibility as ViewIcon,
  BarChart as ChartIcon,
  ShortText as TextIcon,
  RadioButtonChecked as RadioIcon,
  CheckBox as CheckboxIcon,
  LinearScale as ScaleIcon,
  Star as StarIcon,
  Notes as LongTextIcon,
  ArrowDropDown as DropdownIcon,
  DragIndicator as DragIcon,
  Settings as SettingsIcon,
  Send as SendIcon,
  Download as DownloadIcon,
  PieChart as PieChartIcon,
} from '@mui/icons-material'

// Mock data
const questionTypes = [
  { id: 'text', label: 'Short Text', icon: TextIcon },
  { id: 'longtext', label: 'Long Text', icon: LongTextIcon },
  { id: 'radio', label: 'Multiple Choice', icon: RadioIcon },
  { id: 'checkbox', label: 'Checkboxes', icon: CheckboxIcon },
  { id: 'dropdown', label: 'Dropdown', icon: DropdownIcon },
  { id: 'scale', label: 'Linear Scale', icon: ScaleIcon },
  { id: 'rating', label: 'Star Rating', icon: StarIcon },
]

const mockSurveys = [
  { id: 1, name: 'Customer Satisfaction Q4', status: 'active', responses: 234, completion: 78, created: '2024-11-01', questions: 12 },
  { id: 2, name: 'Employee Engagement 2024', status: 'active', responses: 156, completion: 92, created: '2024-10-15', questions: 25 },
  { id: 3, name: 'Product Feedback - Mobile App', status: 'draft', responses: 0, completion: 0, created: '2024-11-20', questions: 8 },
  { id: 4, name: 'Event Registration Form', status: 'closed', responses: 89, completion: 100, created: '2024-09-10', questions: 6 },
  { id: 5, name: 'NPS Survey - November', status: 'active', responses: 412, completion: 65, created: '2024-11-10', questions: 3 },
]

const mockQuestions = [
  { id: 1, type: 'radio', question: 'How satisfied are you with our product?', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
  { id: 2, type: 'scale', question: 'How likely are you to recommend us to a friend?', required: true, min: 0, max: 10, minLabel: 'Not likely', maxLabel: 'Very likely' },
  { id: 3, type: 'checkbox', question: 'Which features do you use most often?', required: false, options: ['Dashboard', 'Reports', 'Integrations', 'API', 'Mobile App'] },
  { id: 4, type: 'longtext', question: 'What improvements would you suggest?', required: false },
  { id: 5, type: 'rating', question: 'Rate your overall experience', required: true },
]

const mockResponses = [
  { id: 1, respondent: 'user_a1b2c3', submitted: '2024-11-24 14:32', completed: true, answers: { 1: 'Very Satisfied', 2: 9, 5: 5 } },
  { id: 2, respondent: 'user_d4e5f6', submitted: '2024-11-24 13:15', completed: true, answers: { 1: 'Satisfied', 2: 7, 5: 4 } },
  { id: 3, respondent: 'user_g7h8i9', submitted: '2024-11-24 11:45', completed: false, answers: { 1: 'Neutral', 2: 5 } },
  { id: 4, respondent: 'user_j0k1l2', submitted: '2024-11-23 16:22', completed: true, answers: { 1: 'Very Satisfied', 2: 10, 5: 5 } },
]

const analyticsData = {
  satisfaction: [
    { label: 'Very Satisfied', count: 89, percentage: 38 },
    { label: 'Satisfied', count: 76, percentage: 32 },
    { label: 'Neutral', count: 42, percentage: 18 },
    { label: 'Dissatisfied', count: 18, percentage: 8 },
    { label: 'Very Dissatisfied', count: 9, percentage: 4 },
  ],
  nps: { promoters: 58, passives: 28, detractors: 14, score: 44 },
  avgRating: 4.2,
  responseRate: 78,
}

function SurveyBuilderTemplate() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedSurvey, setSelectedSurvey] = useState(mockSurveys[0])
  const [builderTab, setBuilderTab] = useState(0)
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false)
  const [selectedQuestionType, setSelectedQuestionType] = useState('radio')

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'draft': return 'warning'
      case 'closed': return 'inactive'
      default: return 'info'
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>Survey Builder</Typography>
              <Typography variant="body2" color="text.secondary">
                Create surveys, collect responses, and analyze results
              </Typography>
            </Box>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
              Create Survey
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Main Tabs */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTab-root': { textTransform: 'none' } }}
        >
          <Tab label="All Surveys" />
          <Tab label="Survey Editor" />
          <Tab label="Responses" />
          <Tab label="Analytics" />
        </Tabs>
      </Paper>

      {/* All Surveys */}
      {activeTab === 0 && (
        <Paper>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              size="small"
              placeholder="Search surveys..."
              sx={{ width: 300 }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label="All" variant="filled" size="small" />
              <Chip label="Active" variant="outlined" size="small" />
              <Chip label="Draft" variant="outlined" size="small" />
              <Chip label="Closed" variant="outlined" size="small" />
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Survey Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Questions</TableCell>
                  <TableCell>Responses</TableCell>
                  <TableCell>Completion Rate</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockSurveys.map((survey) => (
                  <TableRow
                    key={survey.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedSurvey(survey)
                      setActiveTab(1)
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{survey.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Indicator
                        label={survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                        status={getStatusColor(survey.status)}
                      />
                    </TableCell>
                    <TableCell>{survey.questions}</TableCell>
                    <TableCell>{survey.responses}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={survey.completion}
                          sx={{ width: 60, height: 6, borderRadius: 3 }}
                        />
                        <Typography variant="caption">{survey.completion}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{survey.created}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                        <CopyIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                        <ShareIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Survey Editor */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          {/* Question Types Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Add Question</Typography>
              {questionTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Box
                    key={type.id}
                    draggable
                    onClick={() => {
                      setSelectedQuestionType(type.id)
                      setQuestionDialogOpen(true)
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 1,
                      cursor: 'grab',
                      border: 1,
                      borderColor: 'divider',
                      mb: 1,
                      '&:hover': { borderColor: 'primary.main', backgroundColor: 'primary.50' },
                    }}
                  >
                    <Icon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2">{type.label}</Typography>
                  </Box>
                )
              })}
            </Paper>
          </Grid>

          {/* Survey Canvas */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper sx={{ p: 0 }}>
              {/* Survey Header */}
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{selectedSurvey.name}</Typography>
                    <Indicator
                      label={selectedSurvey.status.charAt(0).toUpperCase() + selectedSurvey.status.slice(1)}
                      status={getStatusColor(selectedSurvey.status)}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<ViewIcon />}>Preview</Button>
                    <Button size="small" startIcon={<SettingsIcon />}>Settings</Button>
                    <Button variant="contained" size="small" startIcon={<SendIcon />}>Publish</Button>
                  </Box>
                </Box>
                <Tabs
                  value={builderTab}
                  onChange={(e, v) => setBuilderTab(v)}
                  sx={{ '& .MuiTab-root': { textTransform: 'none', minHeight: 40 } }}
                >
                  <Tab label="Questions" />
                  <Tab label="Logic" />
                  <Tab label="Design" />
                </Tabs>
              </Box>

              {/* Questions List */}
              <Box sx={{ p: 2, minHeight: 400 }}>
                {mockQuestions.map((q, index) => {
                  const TypeIcon = questionTypes.find(t => t.id === q.type)?.icon || TextIcon
                  return (
                    <Paper
                      key={q.id}
                      variant="outlined"
                      sx={{
                        p: 2,
                        mb: 2,
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{ cursor: 'grab', color: 'text.disabled', mt: 0.5 }}>
                          <DragIcon />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              Q{index + 1}
                            </Typography>
                            <Chip
                              icon={<TypeIcon sx={{ fontSize: 14 }} />}
                              label={questionTypes.find(t => t.id === q.type)?.label}
                              size="small"
                              sx={{ height: 22, fontSize: 11 }}
                            />
                            {q.required && <Indicator label="Required" status="error" size="small" />}
                          </Box>
                          <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{q.question}</Typography>

                          {/* Question Preview */}
                          {q.type === 'radio' && q.options && (
                            <RadioGroup>
                              {q.options.map((opt) => (
                                <FormControlLabel key={opt} value={opt} control={<Radio size="small" disabled />} label={opt} />
                              ))}
                            </RadioGroup>
                          )}
                          {q.type === 'checkbox' && q.options && (
                            <Box>
                              {q.options.map((opt) => (
                                <FormControlLabel key={opt} control={<Checkbox size="small" disabled />} label={opt} />
                              ))}
                            </Box>
                          )}
                          {q.type === 'scale' && (
                            <Box sx={{ px: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="caption">{q.minLabel}</Typography>
                                <Typography variant="caption">{q.maxLabel}</Typography>
                              </Box>
                              <Slider
                                min={q.min}
                                max={q.max}
                                marks
                                valueLabelDisplay="auto"
                                disabled
                                sx={{ width: '100%' }}
                              />
                            </Box>
                          )}
                          {q.type === 'rating' && (
                            <Rating size="large" disabled />
                          )}
                          {q.type === 'longtext' && (
                            <TextField
                              multiline
                              rows={3}
                              fullWidth
                              disabled
                              placeholder="Long answer text..."
                              size="small"
                            />
                          )}
                        </Box>
                        <Box>
                          <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                          <IconButton size="small"><CopyIcon fontSize="small" /></IconButton>
                          <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  )
                })}

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={() => setQuestionDialogOpen(true)}
                  sx={{ borderStyle: 'dashed', py: 2 }}
                >
                  Add Question
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Responses */}
      {activeTab === 2 && (
        <Paper>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{selectedSurvey.name}</Typography>
              <Typography variant="body2" color="text.secondary">{mockResponses.length} responses</Typography>
            </Box>
            <Button startIcon={<DownloadIcon />} variant="outlined" size="small">
              Export CSV
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Respondent ID</TableCell>
                  <TableCell>Submitted</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Q1: Satisfaction</TableCell>
                  <TableCell>Q2: NPS Score</TableCell>
                  <TableCell>Q5: Rating</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockResponses.map((response) => (
                  <TableRow key={response.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{response.respondent}</Typography>
                    </TableCell>
                    <TableCell>{response.submitted}</TableCell>
                    <TableCell>
                      <Indicator
                        label={response.completed ? 'Complete' : 'Partial'}
                        status={response.completed ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>{response.answers[1] || '-'}</TableCell>
                    <TableCell>
                      {response.answers[2] !== undefined ? (
                        <Chip
                          label={response.answers[2]}
                          size="small"
                          color={response.answers[2] >= 9 ? 'success' : response.answers[2] >= 7 ? 'warning' : 'error'}
                          sx={{ minWidth: 32 }}
                        />
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {response.answers[5] ? <Rating value={response.answers[5]} size="small" readOnly /> : '-'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small"><ViewIcon fontSize="small" /></IconButton>
                      <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Analytics */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={2}>
              {[
                { label: 'Total Responses', value: selectedSurvey.responses, icon: ChartIcon },
                { label: 'Completion Rate', value: `${analyticsData.responseRate}%`, icon: PieChartIcon },
                { label: 'NPS Score', value: analyticsData.nps.score, icon: ScaleIcon },
                { label: 'Avg Rating', value: analyticsData.avgRating.toFixed(1), icon: StarIcon },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                    <Paper sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Icon sx={{ color: 'primary.main', fontSize: 20 }} />
                        <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                    </Paper>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>

          {/* Satisfaction Breakdown */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Satisfaction Breakdown</Typography>
              {analyticsData.satisfaction.map((item) => (
                <Box key={item.label} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.count} ({item.percentage}%)</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.percentage}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* NPS Breakdown */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>NPS Breakdown</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, color: analyticsData.nps.score >= 50 ? 'success.main' : analyticsData.nps.score >= 0 ? 'warning.main' : 'error.main' }}>
                    {analyticsData.nps.score}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Net Promoter Score</Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                {[
                  { label: 'Promoters (9-10)', value: analyticsData.nps.promoters, color: 'success.main' },
                  { label: 'Passives (7-8)', value: analyticsData.nps.passives, color: 'warning.main' },
                  { label: 'Detractors (0-6)', value: analyticsData.nps.detractors, color: 'error.main' },
                ].map((item) => (
                  <Grid size={{ xs: 4 }} key={item.label}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: item.color }}>{item.value}%</Typography>
                      <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
      </Container>

      {/* Add Question Dialog */}
      <Dialog open={questionDialogOpen} onClose={() => setQuestionDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Question Type</InputLabel>
              <Select
                label="Question Type"
                value={selectedQuestionType}
                onChange={(e) => setSelectedQuestionType(e.target.value)}
              >
                {questionTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>{type.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Question"
              size="small"
              fullWidth
              multiline
              rows={2}
              placeholder="Enter your question..."
            />
            {(selectedQuestionType === 'radio' || selectedQuestionType === 'checkbox' || selectedQuestionType === 'dropdown') && (
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>Options</Typography>
                {['Option 1', 'Option 2', 'Option 3'].map((opt, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField size="small" fullWidth defaultValue={opt} />
                    <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                  </Box>
                ))}
                <Button size="small" startIcon={<AddIcon />}>Add Option</Button>
              </Box>
            )}
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Required"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuestionDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setQuestionDialogOpen(false)}>Add Question</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SurveyBuilderTemplate
