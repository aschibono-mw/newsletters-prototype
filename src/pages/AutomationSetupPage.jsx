import { useState } from 'react'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ForumOutlined from '@mui/icons-material/ForumOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SettingsIcon from '@mui/icons-material/Settings'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import Indicator from '../components/core/Indicator'

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '12px 16px',
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.grey[50],
    fontWeight: 600,
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

// Mock data
const SAVED_SEARCHES = [
  { id: 1, name: 'Brand Mentions' },
  { id: 2, name: 'Customer Support' },
  { id: 3, name: 'Product Feedback' },
  { id: 4, name: 'Competitor Activity' },
  { id: 5, name: 'Industry News' },
]

const SOCIAL_ACCOUNTS = [
  { id: 'bluesky-1', platform: 'Bluesky', name: 'user.handle.bsky.social', icon: '🦋' },
  { id: 'facebook-1', platform: 'Facebook', name: 'Business Page A', icon: '📘' },
  { id: 'facebook-2', platform: 'Facebook', name: 'Business Page B', icon: '📘' },
  { id: 'instagram-1', platform: 'Instagram', name: 'Brand Account A', icon: '📷' },
  { id: 'linkedin-1', platform: 'LinkedIn', name: 'Company Page', icon: '💼' },
  { id: 'twitter-1', platform: 'X', name: '@brandhandle', icon: '𝕏' },
  { id: 'youtube-1', platform: 'YouTube', name: 'Channel Name', icon: '▶️' },
]

const EXAMPLE_PROMPTS = [
  'Apply tag for CEO mentions',
  'Apply tag for product feedback',
  'Apply tag for customer complaints',
  'Hide all posts that contain profanity',
  'Hide all spam messages',
  'Change sentiment to negative for complaints',
]

// Classic setup options
const CRITERIA_OPTIONS = [
  { id: 'keywords', label: 'Contains keywords', description: 'Match specific words or phrases' },
  { id: 'sentiment', label: 'Sentiment is', description: 'Positive, negative, or neutral' },
  { id: 'author_type', label: 'Author type is', description: 'Influencer, customer, competitor, etc.' },
  { id: 'follower_count', label: 'Follower count', description: 'Above or below threshold' },
  { id: 'engagement', label: 'Engagement level', description: 'High, medium, or low engagement' },
  { id: 'language', label: 'Language is', description: 'Filter by detected language' },
]

const ACTION_OPTIONS = [
  { id: 'apply_tag', label: 'Apply tag', description: 'Add one or more tags to the content' },
  { id: 'hide', label: 'Hide content', description: 'Hide from main view' },
  { id: 'change_sentiment', label: 'Change sentiment', description: 'Override detected sentiment' },
  { id: 'assign', label: 'Assign to user', description: 'Route to team member' },
  { id: 'notify', label: 'Send notification', description: 'Alert via email or Slack' },
  { id: 'priority', label: 'Set priority', description: 'Mark as high, medium, or low' },
]

const SENTIMENT_VALUES = ['Positive', 'Negative', 'Neutral']
const PRIORITY_VALUES = ['High', 'Medium', 'Low']
const TAGS = ['Urgent', 'VIP', 'Product Feedback', 'Complaint', 'Praise', 'Question', 'Competitor']

const INITIAL_RULES = [
  {
    id: 1,
    name: 'Urgent customer support escalation',
    description: 'Flag urgent customer issues and tag for priority handling.',
    type: 'conversations',
    sources: ['twitter-1', 'facebook-1', 'instagram-1'],
    active: true,
    createdAt: '2025-11-01',
  },
  {
    id: 2,
    name: 'Competitor intelligence tracking',
    description: 'Track competitor mentions across searches.',
    type: 'searches',
    sources: [1, 4, 5],
    active: true,
    createdAt: '2025-10-28',
  },
  {
    id: 3,
    name: 'Product feedback routing',
    description: 'Capture product feedback and route to product team.',
    type: 'conversations',
    sources: ['twitter-1', 'linkedin-1'],
    active: true,
    createdAt: '2025-10-15',
  },
  {
    id: 4,
    name: 'Influencer engagement',
    description: 'Identify high-value influencer posts.',
    type: 'searches',
    sources: [1],
    active: false,
    createdAt: '2025-09-22',
  },
]

const STEPS = ['Basic Info', 'Select Sources', 'Configure Actions', 'Review']

function AutomationSetupPageV5() {
  const [rules, setRules] = useState(INITIAL_RULES)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [editingRule, setEditingRule] = useState(null) // null = creating new, object = editing

  // Form state
  const [ruleName, setRuleName] = useState('')
  const [ruleType, setRuleType] = useState('conversations')
  const [selectedSources, setSelectedSources] = useState([])
  const [setupMode, setSetupMode] = useState('ai')
  const [userInput, setUserInput] = useState('')
  const [ruleDescription, setRuleDescription] = useState('')

  // Classic setup state
  const [selectedCriteria, setSelectedCriteria] = useState([])
  const [selectedActions, setSelectedActions] = useState([])
  const [criteriaValues, setCriteriaValues] = useState({}) // e.g., { keywords: 'CEO, executive', sentiment: 'Negative' }
  const [actionValues, setActionValues] = useState({}) // e.g., { apply_tag: 'Urgent', priority: 'High' }

  // Menu state
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [menuRule, setMenuRule] = useState(null)

  // ============ Dialog Handlers ============
  const handleOpenDialog = (rule = null, startAtReview = false) => {
    if (rule) {
      // Editing/viewing existing rule
      setEditingRule(rule)
      setRuleName(rule.name)
      setRuleType(rule.type)
      setSelectedSources(rule.sources || [])
      setRuleDescription(rule.description || '')
      setUserInput(rule.aiPrompt || '')
      setSetupMode(rule.setupMode || 'ai')
      setSelectedCriteria(rule.criteria || [])
      setSelectedActions(rule.actions || [])
      setCriteriaValues(rule.criteriaValues || {})
      setActionValues(rule.actionValues || {})
      // Start at Review step if viewing existing rule
      setActiveStep(startAtReview ? 3 : 0)
    } else {
      // Creating new rule
      setEditingRule(null)
      setRuleName('')
      setRuleType('conversations')
      setSelectedSources([])
      setRuleDescription('')
      setUserInput('')
      setSetupMode('ai')
      setSelectedCriteria([])
      setSelectedActions([])
      setCriteriaValues({})
      setActionValues({})
      setActiveStep(0)
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingRule(null)
    setActiveStep(0)
  }

  const handleNext = () => {
    setActiveStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleSave = () => {
    const ruleData = {
      name: ruleName || 'Untitled Rule',
      type: ruleType,
      description: ruleDescription,
      sources: selectedSources,
      setupMode,
      aiPrompt: setupMode === 'ai' ? userInput : '',
      criteria: setupMode === 'classic' ? selectedCriteria : [],
      actions: setupMode === 'classic' ? selectedActions : [],
      criteriaValues: setupMode === 'classic' ? criteriaValues : {},
      actionValues: setupMode === 'classic' ? actionValues : {},
      active: selectedSources.length > 0,
    }

    if (editingRule) {
      // Update existing rule
      setRules((prev) =>
        prev.map((rule) =>
          rule.id === editingRule.id
            ? { ...rule, ...ruleData }
            : rule
        )
      )
      setSnackbarMessage(`"${ruleName}" updated`)
    } else {
      // Create new rule
      const newRule = {
        id: Date.now(),
        ...ruleData,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setRules((prev) => [newRule, ...prev])
      setSnackbarMessage(`"${newRule.name}" created`)
    }
    setSnackbarOpen(true)
    handleCloseDialog()
  }

  // ============ Source Selection ============
  const handleToggleSource = (sourceId) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]
    )
  }

  // ============ Classic Setup Handlers ============
  const handleToggleCriteria = (criteriaId) => {
    setSelectedCriteria((prev) => {
      if (prev.includes(criteriaId)) {
        // Remove criteria and its values
        const newValues = { ...criteriaValues }
        delete newValues[criteriaId]
        setCriteriaValues(newValues)
        return prev.filter((id) => id !== criteriaId)
      }
      return [...prev, criteriaId]
    })
  }

  const handleToggleAction = (actionId) => {
    setSelectedActions((prev) => {
      if (prev.includes(actionId)) {
        // Remove action and its values
        const newValues = { ...actionValues }
        delete newValues[actionId]
        setActionValues(newValues)
        return prev.filter((id) => id !== actionId)
      }
      return [...prev, actionId]
    })
  }

  const handleCriteriaValueChange = (criteriaId, value) => {
    setCriteriaValues((prev) => ({ ...prev, [criteriaId]: value }))
  }

  const handleActionValueChange = (actionId, value) => {
    setActionValues((prev) => ({ ...prev, [actionId]: value }))
  }

  // ============ Table Actions ============
  const handleToggleActive = (ruleId) => {
    setRules((prev) =>
      prev.map((rule) => (rule.id === ruleId ? { ...rule, active: !rule.active } : rule))
    )
  }

  const handleOpenMenu = (event, rule) => {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
    setMenuRule(rule)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
    setMenuRule(null)
  }

  const handleEditRule = () => {
    if (menuRule) {
      handleOpenDialog(menuRule)
    }
    handleCloseMenu()
  }

  const handleDeleteRule = () => {
    if (menuRule) {
      setRules((prev) => prev.filter((rule) => rule.id !== menuRule.id))
      setSnackbarMessage(`"${menuRule.name}" deleted`)
      setSnackbarOpen(true)
    }
    handleCloseMenu()
  }

  // ============ Helpers ============
  const getSourceDisplay = (rule) => {
    const count = rule.sources.length
    if (count === 0) return 'Not configured'
    if (rule.type === 'conversations') {
      return `${count} ${count === 1 ? 'account' : 'accounts'}`
    }
    return `${count} ${count === 1 ? 'search' : 'searches'}`
  }

  const getSourcesList = () => {
    return ruleType === 'conversations' ? SOCIAL_ACCOUNTS : SAVED_SEARCHES
  }

  const canProceedToNext = () => {
    if (activeStep === 0) return ruleName.trim().length > 0
    if (activeStep === 1) return selectedSources.length > 0
    if (activeStep === 2) {
      if (setupMode === 'ai') return userInput.trim().length > 0
      if (setupMode === 'classic') return selectedCriteria.length > 0 && selectedActions.length > 0
    }
    return true
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5" fontWeight={600}>Automation Rules</Typography>
              <Typography variant="body2" color="text.secondary">
                Create rules to automatically tag, hide, or modify incoming content
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Create Rule
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Info Alert */}
        <Alert severity="info" sx={{ mb: 3 }}>
          Your account can process up to 5,000 document changes per day with automation rules.
        </Alert>

        {/* Rules Table */}
        {rules.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <AutoAwesomeIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>No automation rules yet</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first rule to start automating your workflow
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
              Create Rule
            </Button>
          </Paper>
        ) : (
          <Paper variant="outlined">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Rule</StyledTableCell>
                    <StyledTableCell>Apply To</StyledTableCell>
                    <StyledTableCell>Sources</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell align="right" sx={{ width: 80 }}></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rules.map((rule) => (
                    <StyledTableRow
                      key={rule.id}
                      onClick={() => handleOpenDialog(rule, true)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <StyledTableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {rule.name}
                        </Typography>
                        {rule.description && (
                          <Typography variant="caption" color="text.secondary">
                            {rule.description}
                          </Typography>
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {rule.type === 'conversations' ? (
                            <ForumOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
                          ) : (
                            <SearchOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
                          )}
                          <Typography variant="body2">
                            {rule.type === 'conversations' ? 'Conversations' : 'Searches'}
                          </Typography>
                        </Stack>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography variant="body2" color={rule.sources.length === 0 ? 'text.secondary' : 'text.primary'}>
                          {getSourceDisplay(rule)}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Box onClick={(e) => { e.stopPropagation(); handleToggleActive(rule.id); }} sx={{ cursor: 'pointer' }}>
                          <Indicator
                            label={rule.active ? 'Active' : 'Inactive'}
                            status={rule.active ? 'active' : 'inactive'}
                            size="small"
                          />
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton size="small" onClick={(e) => handleOpenMenu(e, rule)}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ p: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
              <Typography variant="caption" color="text.secondary">
                {rules.length} {rules.length === 1 ? 'rule' : 'rules'} total
              </Typography>
            </Box>
          </Paper>
        )}
      </Container>

      {/* ============ Multi-Step Dialog ============ */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { minHeight: 480 } }}
      >
        {/* Dialog Header */}
        <DialogTitle sx={{ pb: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {editingRule
                ? (activeStep === 3 ? 'Review Rule' : 'Edit Rule')
                : 'Create Automation Rule'
              }
            </Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>

        {/* Stepper */}
        <Box sx={{ px: 3, pt: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label, index) => (
              <Step key={label} completed={index < activeStep}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <DialogContent sx={{ pt: 3 }}>
          {/* Step 0: Basic Info */}
          {activeStep === 0 && (
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Rule Name"
                placeholder="e.g., Tag urgent customer issues"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                autoFocus
              />
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Apply to
                </Typography>
                <ToggleButtonGroup
                  value={ruleType}
                  exclusive
                  onChange={(e, val) => {
                    if (val) {
                      setRuleType(val)
                      setSelectedSources([]) // Reset sources when type changes
                    }
                  }}
                  fullWidth
                >
                  <ToggleButton value="conversations" sx={{ textTransform: 'none', py: 1.5 }}>
                    <ForumOutlined sx={{ mr: 1 }} />
                    Conversations
                  </ToggleButton>
                  <ToggleButton value="searches" sx={{ textTransform: 'none', py: 1.5 }}>
                    <SearchOutlined sx={{ mr: 1 }} />
                    Saved Searches
                  </ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {ruleType === 'conversations'
                    ? 'Apply rule to incoming messages on your social accounts'
                    : 'Apply rule to results from your saved searches'}
                </Typography>
              </Box>
              <TextField
                fullWidth
                label="Description (optional)"
                placeholder="What does this rule do?"
                value={ruleDescription}
                onChange={(e) => setRuleDescription(e.target.value)}
                multiline
                minRows={2}
                maxRows={3}
              />
            </Stack>
          )}

          {/* Step 1: Select Sources */}
          {activeStep === 1 && (
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  {ruleType === 'conversations' ? 'Select Social Accounts' : 'Select Saved Searches'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Choose which {ruleType === 'conversations' ? 'accounts' : 'searches'} this rule will monitor
                </Typography>
              </Box>

              <Paper variant="outlined" sx={{ maxHeight: 280, overflow: 'auto' }}>
                <List dense disablePadding>
                  {getSourcesList().map((source) => {
                    const sourceId = source.id
                    const isSelected = selectedSources.includes(sourceId)
                    return (
                      <ListItem key={sourceId} disablePadding>
                        <ListItemButton onClick={() => handleToggleSource(sourceId)}>
                          <Checkbox checked={isSelected} size="small" sx={{ mr: 1 }} />
                          {ruleType === 'conversations' && (
                            <Avatar sx={{ width: 28, height: 28, fontSize: '1rem', mr: 1.5, bgcolor: 'transparent' }}>
                              {source.icon}
                            </Avatar>
                          )}
                          <ListItemText
                            primary={source.name}
                            secondary={ruleType === 'conversations' ? source.platform : null}
                            primaryTypographyProps={{ variant: 'body2' }}
                            secondaryTypographyProps={{ variant: 'caption' }}
                          />
                          {isSelected && <CheckIcon fontSize="small" color="primary" />}
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
              </Paper>

              {selectedSources.length > 0 && (
                <Typography variant="body2" color="primary">
                  {selectedSources.length} {ruleType === 'conversations' ? 'account' : 'search'}{selectedSources.length !== 1 ? (ruleType === 'conversations' ? 's' : 'es') : ''} selected
                </Typography>
              )}
            </Stack>
          )}

          {/* Step 2: Configure Actions */}
          {activeStep === 2 && (
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Configuration Mode
                </Typography>
                <ToggleButtonGroup
                  value={setupMode}
                  exclusive
                  onChange={(e, val) => val && setSetupMode(val)}
                  fullWidth
                  size="small"
                >
                  <ToggleButton value="ai" sx={{ textTransform: 'none' }}>
                    <AutoAwesomeIcon fontSize="small" sx={{ mr: 1 }} />
                    AI Setup
                  </ToggleButton>
                  <ToggleButton value="classic" sx={{ textTransform: 'none' }}>
                    <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
                    Classic
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {setupMode === 'ai' && (
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    What should this rule do?
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Describe in plain language what you want to automate
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                    {EXAMPLE_PROMPTS.slice(0, 3).map((prompt, idx) => (
                      <Chip
                        key={idx}
                        label={prompt}
                        size="small"
                        variant="outlined"
                        onClick={() => setUserInput(prompt)}
                        sx={{
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      />
                    ))}
                  </Stack>

                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    placeholder="e.g., Tag all mentions of our CEO as 'Executive Mention'"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                </Box>
              )}

              {setupMode === 'classic' && (
                <Stack spacing={3}>
                  {/* IF - Criteria */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Indicator label="IF" color="cyan" size="small" />
                      When content matches criteria
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Stack spacing={2}>
                        {CRITERIA_OPTIONS.map((criteria) => {
                          const isSelected = selectedCriteria.includes(criteria.id)
                          return (
                            <Box key={criteria.id}>
                              <Stack direction="row" spacing={2} alignItems="flex-start">
                                <Checkbox
                                  checked={isSelected}
                                  onChange={() => handleToggleCriteria(criteria.id)}
                                  size="small"
                                  sx={{ mt: 0.5 }}
                                />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body2" fontWeight={500}>
                                    {criteria.label}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {criteria.description}
                                  </Typography>
                                  {isSelected && (
                                    <Box sx={{ mt: 1 }}>
                                      {criteria.id === 'keywords' && (
                                        <TextField
                                          size="small"
                                          fullWidth
                                          placeholder="Enter keywords separated by commas"
                                          value={criteriaValues.keywords || ''}
                                          onChange={(e) => handleCriteriaValueChange('keywords', e.target.value)}
                                        />
                                      )}
                                      {criteria.id === 'sentiment' && (
                                        <FormControl size="small" fullWidth>
                                          <Select
                                            value={criteriaValues.sentiment || ''}
                                            onChange={(e) => handleCriteriaValueChange('sentiment', e.target.value)}
                                            displayEmpty
                                          >
                                            <MenuItem value="" disabled>Select sentiment</MenuItem>
                                            {SENTIMENT_VALUES.map((s) => (
                                              <MenuItem key={s} value={s}>{s}</MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                      )}
                                      {criteria.id === 'follower_count' && (
                                        <TextField
                                          size="small"
                                          fullWidth
                                          type="number"
                                          placeholder="Minimum follower count"
                                          value={criteriaValues.follower_count || ''}
                                          onChange={(e) => handleCriteriaValueChange('follower_count', e.target.value)}
                                        />
                                      )}
                                      {(criteria.id === 'author_type' || criteria.id === 'engagement' || criteria.id === 'language') && (
                                        <TextField
                                          size="small"
                                          fullWidth
                                          placeholder={`Enter ${criteria.label.toLowerCase()}`}
                                          value={criteriaValues[criteria.id] || ''}
                                          onChange={(e) => handleCriteriaValueChange(criteria.id, e.target.value)}
                                        />
                                      )}
                                    </Box>
                                  )}
                                </Box>
                              </Stack>
                            </Box>
                          )
                        })}
                      </Stack>
                    </Paper>
                  </Box>

                  {/* THEN - Actions */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Indicator label="THEN" color="purple" size="small" />
                      Perform these actions
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Stack spacing={2}>
                        {ACTION_OPTIONS.map((action) => {
                          const isSelected = selectedActions.includes(action.id)
                          return (
                            <Box key={action.id}>
                              <Stack direction="row" spacing={2} alignItems="flex-start">
                                <Checkbox
                                  checked={isSelected}
                                  onChange={() => handleToggleAction(action.id)}
                                  size="small"
                                  sx={{ mt: 0.5 }}
                                />
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="body2" fontWeight={500}>
                                    {action.label}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {action.description}
                                  </Typography>
                                  {isSelected && (
                                    <Box sx={{ mt: 1 }}>
                                      {action.id === 'apply_tag' && (
                                        <FormControl size="small" fullWidth>
                                          <Select
                                            value={actionValues.apply_tag || ''}
                                            onChange={(e) => handleActionValueChange('apply_tag', e.target.value)}
                                            displayEmpty
                                          >
                                            <MenuItem value="" disabled>Select tag</MenuItem>
                                            {TAGS.map((t) => (
                                              <MenuItem key={t} value={t}>{t}</MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                      )}
                                      {action.id === 'change_sentiment' && (
                                        <FormControl size="small" fullWidth>
                                          <Select
                                            value={actionValues.change_sentiment || ''}
                                            onChange={(e) => handleActionValueChange('change_sentiment', e.target.value)}
                                            displayEmpty
                                          >
                                            <MenuItem value="" disabled>Select sentiment</MenuItem>
                                            {SENTIMENT_VALUES.map((s) => (
                                              <MenuItem key={s} value={s}>{s}</MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                      )}
                                      {action.id === 'priority' && (
                                        <FormControl size="small" fullWidth>
                                          <Select
                                            value={actionValues.priority || ''}
                                            onChange={(e) => handleActionValueChange('priority', e.target.value)}
                                            displayEmpty
                                          >
                                            <MenuItem value="" disabled>Select priority</MenuItem>
                                            {PRIORITY_VALUES.map((p) => (
                                              <MenuItem key={p} value={p}>{p}</MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                      )}
                                      {action.id === 'assign' && (
                                        <TextField
                                          size="small"
                                          fullWidth
                                          placeholder="Enter username or email"
                                          value={actionValues.assign || ''}
                                          onChange={(e) => handleActionValueChange('assign', e.target.value)}
                                        />
                                      )}
                                      {action.id === 'notify' && (
                                        <TextField
                                          size="small"
                                          fullWidth
                                          placeholder="Enter email or Slack channel"
                                          value={actionValues.notify || ''}
                                          onChange={(e) => handleActionValueChange('notify', e.target.value)}
                                        />
                                      )}
                                    </Box>
                                  )}
                                </Box>
                              </Stack>
                            </Box>
                          )
                        })}
                      </Stack>
                    </Paper>
                  </Box>
                </Stack>
              )}
            </Stack>
          )}

          {/* Step 3: Review */}
          {activeStep === 3 && (
            <Stack spacing={3}>
              {!editingRule && (
                <Alert severity="info" icon={<AutoAwesomeIcon />}>
                  Review your AI-generated rule configuration before creating.
                </Alert>
              )}

              {/* Rule Summary */}
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={2}>
                  {/* Name & Type */}
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Rule Name
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {ruleName || 'Untitled Rule'}
                    </Typography>
                  </Box>

                  {ruleDescription && (
                    <Box>
                      <Typography variant="overline" color="text.secondary">
                        Description
                      </Typography>
                      <Typography variant="body2">
                        {ruleDescription}
                      </Typography>
                    </Box>
                  )}

                  <Divider />

                  {/* Apply To */}
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Apply To
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                      {ruleType === 'conversations' ? (
                        <ForumOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
                      ) : (
                        <SearchOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
                      )}
                      <Typography variant="body2">
                        {ruleType === 'conversations' ? 'Conversations' : 'Saved Searches'}
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Sources */}
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      {ruleType === 'conversations' ? 'Social Accounts' : 'Saved Searches'} ({selectedSources.length})
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 0.5 }}>
                      {selectedSources.map((sourceId) => {
                        const sourceList = getSourcesList()
                        const source = sourceList.find((s) => s.id === sourceId)
                        if (!source) return null
                        return (
                          <Chip
                            key={sourceId}
                            label={source.name}
                            size="small"
                            icon={ruleType === 'conversations' ? (
                              <Box component="span" sx={{ fontSize: '0.875rem', ml: 0.5 }}>{source.icon}</Box>
                            ) : undefined}
                          />
                        )
                      })}
                    </Stack>
                  </Box>

                  <Divider />

                  {/* Configuration */}
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Configuration Mode
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, mb: 1 }}>
                      {setupMode === 'ai' ? (
                        <>
                          <AutoAwesomeIcon fontSize="small" sx={{ color: 'primary.main' }} />
                          <Typography variant="body2" fontWeight={500}>AI Setup</Typography>
                        </>
                      ) : (
                        <>
                          <SettingsIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                          <Typography variant="body2" fontWeight={500}>Classic Setup</Typography>
                        </>
                      )}
                    </Stack>

                    {/* AI Setup Review */}
                    {setupMode === 'ai' && userInput && (
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          bgcolor: 'grey.50',
                          borderStyle: 'dashed',
                        }}
                      >
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          "{userInput}"
                        </Typography>
                      </Paper>
                    )}
                    {setupMode === 'ai' && !userInput && (
                      <Typography variant="body2" color="text.secondary">
                        No AI prompt provided
                      </Typography>
                    )}

                    {/* Classic Setup Review */}
                    {setupMode === 'classic' && (
                      <Stack spacing={2}>
                        {/* IF Criteria */}
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Indicator label="IF" color="cyan" size="small" />
                            <Typography variant="caption" color="text.secondary">
                              {selectedCriteria.length === 0 ? 'No criteria selected' : `${selectedCriteria.length} criteria`}
                            </Typography>
                          </Stack>
                          {selectedCriteria.length > 0 && (
                            <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                              <Stack spacing={1}>
                                {selectedCriteria.map((criteriaId) => {
                                  const criteria = CRITERIA_OPTIONS.find((c) => c.id === criteriaId)
                                  const value = criteriaValues[criteriaId]
                                  return (
                                    <Box key={criteriaId}>
                                      <Typography variant="body2">
                                        <strong>{criteria?.label}</strong>
                                        {value && <span>: {value}</span>}
                                      </Typography>
                                    </Box>
                                  )
                                })}
                              </Stack>
                            </Paper>
                          )}
                        </Box>

                        {/* THEN Actions */}
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                            <Indicator label="THEN" color="purple" size="small" />
                            <Typography variant="caption" color="text.secondary">
                              {selectedActions.length === 0 ? 'No actions selected' : `${selectedActions.length} actions`}
                            </Typography>
                          </Stack>
                          {selectedActions.length > 0 && (
                            <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                              <Stack spacing={1}>
                                {selectedActions.map((actionId) => {
                                  const action = ACTION_OPTIONS.find((a) => a.id === actionId)
                                  const value = actionValues[actionId]
                                  return (
                                    <Box key={actionId}>
                                      <Typography variant="body2">
                                        <strong>{action?.label}</strong>
                                        {value && <span>: {value}</span>}
                                      </Typography>
                                    </Box>
                                  )
                                })}
                              </Stack>
                            </Paper>
                          )}
                        </Box>
                      </Stack>
                    )}
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
          {activeStep === 0 ? (
            <Button onClick={handleCloseDialog}>Cancel</Button>
          ) : activeStep === 3 && editingRule ? (
            <Button onClick={handleCloseDialog}>Close</Button>
          ) : (
            <Button onClick={handleBack}>Back</Button>
          )}
          <Box sx={{ flex: 1 }} />
          {activeStep === 3 ? (
            // Review step actions
            <>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(0)}
                startIcon={<EditOutlined />}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={<CheckIcon />}
              >
                {editingRule ? 'Save Changes' : 'Create Rule'}
              </Button>
            </>
          ) : activeStep < STEPS.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!canProceedToNext()}
            >
              Continue
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>

      {/* Actions Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleEditRule}>
          <ListItemIcon><EditOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>Configure</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteRule} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteOutlined fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}

export default AutomationSetupPageV5
