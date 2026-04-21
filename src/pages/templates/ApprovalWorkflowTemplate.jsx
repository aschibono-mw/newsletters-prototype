import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Divider,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
  Stack,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Switch,
  FormControlLabel,
} from '@mui/material';
import Indicator from '../../components/core/Indicator';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  AccountTree as WorkflowIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Timeline as TimelineIcon,
  Flag as FlagIcon,
  Assignment as AssignmentIcon,
  AttachMoney as MoneyIcon,
  BeachAccess as PtoIcon,
  ShoppingCart as PurchaseIcon,
  Description as DocumentIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  Check as CheckIcon,
  HourglassEmpty as PendingIcon,
  ThumbUp as ApproveIcon,
  ThumbDown as RejectIcon,
  Comment as CommentIcon,
  History as HistoryIcon,
  CallSplit as BranchIcon,
  Merge as MergeIcon,
  DragIndicator as DragIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// Workflow status config
const workflowStatuses = {
  active: { label: 'Active', color: '#4CAF50' },
  draft: { label: 'Draft', color: '#9E9E9E' },
  paused: { label: 'Paused', color: '#F57C00' },
  archived: { label: 'Archived', color: '#757575' },
};

// Request statuses
const requestStatuses = {
  pending: { label: 'Pending Approval', color: '#F57C00', icon: <PendingIcon /> },
  approved: { label: 'Approved', color: '#4CAF50', icon: <CheckCircleIcon /> },
  rejected: { label: 'Rejected', color: '#D32F2F', icon: <CancelIcon /> },
  cancelled: { label: 'Cancelled', color: '#757575', icon: <CancelIcon /> },
};

// Mock workflows
const mockWorkflows = [
  {
    id: 1,
    name: 'Expense Approval',
    description: 'Multi-tier expense approval based on amount',
    category: 'expense',
    icon: <MoneyIcon />,
    status: 'active',
    steps: 3,
    activeRequests: 12,
    avgTime: '2.3 days',
  },
  {
    id: 2,
    name: 'PTO Request',
    description: 'Manager approval for time off requests',
    category: 'pto',
    icon: <PtoIcon />,
    status: 'active',
    steps: 2,
    activeRequests: 8,
    avgTime: '1.1 days',
  },
  {
    id: 3,
    name: 'Purchase Order',
    description: 'Purchase approval with budget verification',
    category: 'purchase',
    icon: <PurchaseIcon />,
    status: 'active',
    steps: 4,
    activeRequests: 5,
    avgTime: '3.5 days',
  },
  {
    id: 4,
    name: 'Document Review',
    description: 'Multi-reviewer document approval',
    category: 'document',
    icon: <DocumentIcon />,
    status: 'draft',
    steps: 2,
    activeRequests: 0,
    avgTime: '-',
  },
];

// Mock pending requests
const mockRequests = [
  {
    id: 'REQ-2024-0142',
    title: 'Q1 Marketing Campaign Expense',
    workflow: 'Expense Approval',
    requester: { name: 'Alice Johnson', avatar: 'AJ' },
    amount: '$15,000',
    submitted: '2 hours ago',
    currentStep: 2,
    totalSteps: 3,
    status: 'pending',
    currentApprover: 'Finance Director',
    dueDate: 'Jan 20, 2025',
  },
  {
    id: 'REQ-2024-0141',
    title: 'Team Building Event Budget',
    workflow: 'Expense Approval',
    requester: { name: 'Bob Chen', avatar: 'BC' },
    amount: '$3,500',
    submitted: '4 hours ago',
    currentStep: 1,
    totalSteps: 3,
    status: 'pending',
    currentApprover: 'Manager',
    dueDate: 'Jan 18, 2025',
  },
  {
    id: 'REQ-2024-0140',
    title: 'Annual Leave - Feb 1-5',
    workflow: 'PTO Request',
    requester: { name: 'Carol Davis', avatar: 'CD' },
    amount: '5 days',
    submitted: '1 day ago',
    currentStep: 1,
    totalSteps: 2,
    status: 'pending',
    currentApprover: 'Direct Manager',
    dueDate: 'Jan 25, 2025',
  },
  {
    id: 'REQ-2024-0139',
    title: 'New Software Licenses',
    workflow: 'Purchase Order',
    requester: { name: 'David Wilson', avatar: 'DW' },
    amount: '$8,200',
    submitted: '2 days ago',
    currentStep: 3,
    totalSteps: 4,
    status: 'pending',
    currentApprover: 'CFO',
    dueDate: 'Jan 22, 2025',
  },
  {
    id: 'REQ-2024-0138',
    title: 'Office Equipment Refresh',
    workflow: 'Expense Approval',
    requester: { name: 'Eve Martinez', avatar: 'EM' },
    amount: '$12,000',
    submitted: '3 days ago',
    currentStep: 3,
    totalSteps: 3,
    status: 'approved',
    currentApprover: '-',
    dueDate: '-',
  },
];

// Mock workflow steps
const mockWorkflowSteps = [
  {
    id: 1,
    name: 'Manager Approval',
    type: 'single',
    approver: 'Direct Manager',
    conditions: 'All requests',
    sla: '2 business days',
    actions: ['Approve', 'Reject', 'Request Changes'],
  },
  {
    id: 2,
    name: 'Finance Review',
    type: 'conditional',
    approver: 'Finance Team',
    conditions: 'Amount > $5,000',
    sla: '3 business days',
    actions: ['Approve', 'Reject', 'Escalate'],
  },
  {
    id: 3,
    name: 'Executive Approval',
    type: 'conditional',
    approver: 'CFO or CEO',
    conditions: 'Amount > $10,000',
    sla: '5 business days',
    actions: ['Approve', 'Reject'],
  },
];

// Mock approval history
const mockHistory = [
  { step: 'Manager Approval', approver: 'Sarah Lee', action: 'Approved', date: 'Jan 15, 2025 2:30 PM', comment: 'Looks good, approved.' },
  { step: 'Finance Review', approver: 'Mike Johnson', action: 'Approved', date: 'Jan 16, 2025 10:15 AM', comment: 'Budget verified.' },
];

export default function ApprovalWorkflowTemplate() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [, setSelectedWorkflow] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [requestDetailOpen, setRequestDetailOpen] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [approvalAction, setApprovalAction] = useState(null);

  const handleApprove = () => {
    setApprovalAction('approve');
    setApprovalDialogOpen(true);
  };

  const handleReject = () => {
    setApprovalAction('reject');
    setApprovalDialogOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'grey.50' }}>
      {/* Left Sidebar */}
      <Paper
        elevation={0}
        sx={{
          width: 260,
          borderRight: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => setBuilderOpen(true)}
            sx={{ textTransform: 'none' }}
          >
            Create Workflow
          </Button>
        </Box>

        <Divider />

        {/* Quick Actions */}
        <List dense sx={{ px: 1, py: 1 }}>
          <ListItemButton selected sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Approvals" />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>8</Typography>
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ScheduleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Requests" />
            <Typography variant="caption" color="text.secondary">4</Typography>
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <WorkflowIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="All Workflows" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <HistoryIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItemButton>
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Workflows */}
        <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            WORKFLOWS
          </Typography>
          <IconButton size="small">
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Box>

        <List dense sx={{ px: 1, flex: 1, overflow: 'auto' }}>
          {mockWorkflows.map((workflow) => (
            <ListItemButton
              key={workflow.id}
              sx={{ borderRadius: 1, mb: 0.5 }}
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {workflow.icon}
              </ListItemIcon>
              <ListItemText
                primary={workflow.name}
                secondary={`${workflow.activeRequests} active`}
                primaryTypographyProps={{ fontSize: 14 }}
                secondaryTypographyProps={{ fontSize: 11 }}
              />
              <Indicator
                label={workflowStatuses[workflow.status].label}
                status={workflow.status === 'active' ? 'active' : workflow.status === 'paused' ? 'warning' : 'inactive'}
                size="small"
              />
            </ListItemButton>
          ))}
        </List>

        {/* Stats */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600} gutterBottom display="block">
            THIS WEEK
          </Typography>
          <Grid container spacing={1} sx={{ mt: 0.5 }}>
            <Grid size={6}>
              <Typography variant="h5" fontWeight={600} color="success.main">24</Typography>
              <Typography variant="caption" color="text.secondary">Approved</Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="h5" fontWeight={600} color="error.main">3</Typography>
              <Typography variant="caption" color="text.secondary">Rejected</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <Paper elevation={0} sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" fontWeight={600}>Pending Approvals</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button size="small" startIcon={<FilterListIcon />}>Filter</Button>
              <Button variant="contained" size="small" startIcon={<AddIcon />}>
                New Request
              </Button>
            </Box>
          </Box>
          <TextField
            size="small"
            placeholder="Search requests..."
            sx={{ width: 320 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Paper>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)}>
            <Tab label="Awaiting My Approval (8)" />
            <Tab label="My Requests" />
            <Tab label="All Pending" />
            <Tab label="Completed" />
          </Tabs>
        </Box>

        {/* Request List */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Workflow</TableCell>
                  <TableCell>Requester</TableCell>
                  <TableCell>Amount/Duration</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRequests.map((request) => (
                  <TableRow
                    key={request.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => { setSelectedRequest(request); setRequestDetailOpen(true); }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500} color="primary">
                        {request.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{request.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Submitted {request.submitted}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={request.workflow} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: 11 }}>
                          {request.requester.avatar}
                        </Avatar>
                        <Typography variant="body2">{request.requester.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>{request.amount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(request.currentStep / request.totalSteps) * 100}
                          sx={{ width: 60, height: 6, borderRadius: 3 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {request.currentStep}/{request.totalSteps}
                        </Typography>
                      </Box>
                      {request.status === 'pending' && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {request.currentApprover}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Indicator
                        label={requestStatuses[request.status].label}
                        status={request.status === 'approved' ? 'success' : request.status === 'rejected' ? 'error' : request.status === 'pending' ? 'pending' : 'inactive'}
                        size="small"
                        startIcon={requestStatuses[request.status].icon}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {request.status === 'pending' && (
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Approve">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={(e) => { e.stopPropagation(); handleApprove(); }}
                            >
                              <ApproveIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={(e) => { e.stopPropagation(); handleReject(); }}
                            >
                              <RejectIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                      <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Request Detail Dialog */}
      <Dialog
        open={requestDetailOpen}
        onClose={() => setRequestDetailOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedRequest && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">{selectedRequest.id}</Typography>
                  <Typography variant="h6">{selectedRequest.title}</Typography>
                </Box>
                <IconButton onClick={() => setRequestDetailOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                {/* Left Column - Details */}
                <Grid size={{ xs: 12, md: 7 }}>
                  <Typography variant="subtitle2" gutterBottom>Request Details</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2}>
                      <Grid size={6}>
                        <Typography variant="caption" color="text.secondary">Workflow</Typography>
                        <Typography variant="body2">{selectedRequest.workflow}</Typography>
                      </Grid>
                      <Grid size={6}>
                        <Typography variant="caption" color="text.secondary">Amount</Typography>
                        <Typography variant="body2" fontWeight={500}>{selectedRequest.amount}</Typography>
                      </Grid>
                      <Grid size={6}>
                        <Typography variant="caption" color="text.secondary">Requester</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 20, height: 20, fontSize: 10 }}>{selectedRequest.requester.avatar}</Avatar>
                          <Typography variant="body2">{selectedRequest.requester.name}</Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Typography variant="caption" color="text.secondary">Submitted</Typography>
                        <Typography variant="body2">{selectedRequest.submitted}</Typography>
                      </Grid>
                      <Grid size={6}>
                        <Typography variant="caption" color="text.secondary">Due Date</Typography>
                        <Typography variant="body2">{selectedRequest.dueDate}</Typography>
                      </Grid>
                      <Grid size={6}>
                        <Typography variant="caption" color="text.secondary">Status</Typography>
                        <Box sx={{ mt: 0.5 }}>
                          <Indicator
                            label={requestStatuses[selectedRequest.status].label}
                            status={selectedRequest.status === 'approved' ? 'success' : selectedRequest.status === 'rejected' ? 'error' : selectedRequest.status === 'pending' ? 'pending' : 'inactive'}
                            size="small"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  <Typography variant="subtitle2" gutterBottom>Justification</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                    <Typography variant="body2">
                      This budget is required for the Q1 marketing campaign including digital advertising,
                      content creation, and event sponsorships. The campaign targets new enterprise customers
                      and is projected to generate 150+ qualified leads.
                    </Typography>
                  </Paper>

                  <Typography variant="subtitle2" gutterBottom>Attachments</Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Stack direction="row" spacing={1}>
                      <Chip label="Budget_Breakdown.xlsx" variant="outlined" onDelete={() => {}} deleteIcon={<VisibilityIcon />} />
                      <Chip label="Campaign_Plan.pdf" variant="outlined" onDelete={() => {}} deleteIcon={<VisibilityIcon />} />
                    </Stack>
                  </Paper>
                </Grid>

                {/* Right Column - Approval Flow */}
                <Grid size={{ xs: 12, md: 5 }}>
                  <Typography variant="subtitle2" gutterBottom>Approval Progress</Typography>
                  <Stepper orientation="vertical" activeStep={selectedRequest.currentStep - 1}>
                    {mockWorkflowSteps.map((step, index) => (
                      <Step key={step.id} completed={index < selectedRequest.currentStep - 1}>
                        <StepLabel
                          optional={
                            mockHistory[index] && (
                              <Typography variant="caption" color="text.secondary">
                                {mockHistory[index].approver} • {mockHistory[index].date}
                              </Typography>
                            )
                          }
                        >
                          {step.name}
                        </StepLabel>
                        <StepContent>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {step.approver}
                          </Typography>
                          {mockHistory[index] && (
                            <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'success.50' }}>
                              <Typography variant="body2">"{mockHistory[index].comment}"</Typography>
                            </Paper>
                          )}
                          {index === selectedRequest.currentStep - 1 && selectedRequest.status === 'pending' && (
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                              <Button size="small" variant="contained" color="success" startIcon={<CheckIcon />}>
                                Approve
                              </Button>
                              <Button size="small" variant="outlined" color="error">
                                Reject
                              </Button>
                            </Box>
                          )}
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setRequestDetailOpen(false)}>Close</Button>
              {selectedRequest.status === 'pending' && (
                <>
                  <Button variant="outlined" color="error" onClick={handleReject}>Reject</Button>
                  <Button variant="contained" color="success" onClick={handleApprove}>Approve</Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Workflow Builder Dialog */}
      <Dialog
        open={builderOpen}
        onClose={() => setBuilderOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Workflow Builder</Typography>
            <IconButton onClick={() => setBuilderOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Left Panel - Workflow Config */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={3}>
                <TextField label="Workflow Name" fullWidth defaultValue="New Approval Workflow" />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  defaultValue="Configure the approval steps and conditions"
                />
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select label="Category" defaultValue="expense">
                    <MenuItem value="expense">Expense Approval</MenuItem>
                    <MenuItem value="pto">PTO Request</MenuItem>
                    <MenuItem value="purchase">Purchase Order</MenuItem>
                    <MenuItem value="document">Document Review</MenuItem>
                    <MenuItem value="custom">Custom</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable SLA tracking"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Send email notifications"
                />
              </Stack>
            </Grid>

            {/* Right Panel - Steps Builder */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1">Approval Steps</Typography>
                <Button size="small" startIcon={<AddIcon />}>Add Step</Button>
              </Box>

              <Stack spacing={2}>
                {mockWorkflowSteps.map((step, index) => (
                  <Paper key={step.id} variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <IconButton size="small" sx={{ cursor: 'grab' }}>
                        <DragIcon />
                      </IconButton>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Indicator label={`Step ${index + 1}`} size="small" color="cyan" />
                            <Typography variant="subtitle2">{step.name}</Typography>
                            {step.type === 'conditional' && (
                              <Chip label="Conditional" size="small" variant="outlined" icon={<BranchIcon />} />
                            )}
                          </Box>
                          <Box>
                            <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                            <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                          </Box>
                        </Box>
                        <Grid container spacing={2}>
                          <Grid size={6}>
                            <Typography variant="caption" color="text.secondary">Approver</Typography>
                            <Typography variant="body2">{step.approver}</Typography>
                          </Grid>
                          <Grid size={6}>
                            <Typography variant="caption" color="text.secondary">SLA</Typography>
                            <Typography variant="body2">{step.sla}</Typography>
                          </Grid>
                          {step.type === 'conditional' && (
                            <Grid size={12}>
                              <Typography variant="caption" color="text.secondary">Condition</Typography>
                              <Chip label={step.conditions} size="small" variant="outlined" sx={{ ml: 1 }} />
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Box>
                  </Paper>
                ))}

                {/* Add Step Placeholder */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderStyle: 'dashed',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'grey.50' },
                  }}
                >
                  <AddIcon color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Add another step
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBuilderOpen(false)}>Cancel</Button>
          <Button variant="outlined">Save as Draft</Button>
          <Button variant="contained">Activate Workflow</Button>
        </DialogActions>
      </Dialog>

      {/* Approval Action Dialog */}
      <Dialog
        open={approvalDialogOpen}
        onClose={() => setApprovalDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {approvalAction === 'approve' ? 'Approve Request' : 'Reject Request'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {approvalAction === 'approve'
              ? 'Please confirm your approval and optionally add a comment.'
              : 'Please provide a reason for rejection.'}
          </Typography>
          <TextField
            label={approvalAction === 'approve' ? 'Comment (optional)' : 'Reason for rejection'}
            fullWidth
            multiline
            rows={3}
            required={approvalAction === 'reject'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApprovalDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color={approvalAction === 'approve' ? 'success' : 'error'}
            onClick={() => setApprovalDialogOpen(false)}
          >
            {approvalAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
