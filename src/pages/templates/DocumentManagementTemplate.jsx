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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Divider,
  Menu,
  MenuItem,
  Breadcrumbs,
  Link,
  LinearProgress,
  Tabs,
  Tab,
  Badge,
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
  Checkbox,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import Indicator from '../../components/core/Indicator';
import {
  Search as SearchIcon,
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  TableChart as ExcelIcon,
  Image as ImageIcon,
  VideoFile as VideoIcon,
  MoreVert as MoreVertIcon,
  ChevronRight as ChevronRightIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  History as HistoryIcon,
  Comment as CommentIcon,
  Visibility as VisibilityIcon,
  Lock as LockIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  CreateNewFolder as CreateNewFolderIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  Sort as SortIcon,
  FilterList as FilterListIcon,
  Home as HomeIcon,
  Article as ArticleIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  Info as InfoIcon,
  CloudDone as CloudDoneIcon,
} from '@mui/icons-material';

// File type icon helper
const getFileIcon = (type) => {
  switch (type) {
    case 'pdf': return <PdfIcon sx={{ color: '#E53935' }} />;
    case 'doc': return <DocIcon sx={{ color: '#1976D2' }} />;
    case 'excel': return <ExcelIcon sx={{ color: '#2E7D32' }} />;
    case 'image': return <ImageIcon sx={{ color: '#7B1FA2' }} />;
    case 'video': return <VideoIcon sx={{ color: '#F57C00' }} />;
    default: return <FileIcon sx={{ color: 'text.secondary' }} />;
  }
};

// Mock folder structure
const mockFolders = [
  { id: 1, name: 'Product Documentation', files: 24, size: '156 MB', modified: '2 hours ago', starred: true },
  { id: 2, name: 'Marketing Assets', files: 89, size: '2.3 GB', modified: 'Yesterday', starred: false },
  { id: 3, name: 'Engineering Specs', files: 45, size: '890 MB', modified: '3 days ago', starred: true },
  { id: 4, name: 'HR Policies', files: 12, size: '45 MB', modified: '1 week ago', starred: false },
  { id: 5, name: 'Customer Contracts', files: 156, size: '1.2 GB', modified: '5 hours ago', starred: false },
];

// Mock files
const mockFiles = [
  { id: 1, name: 'Q4 Product Roadmap.pdf', type: 'pdf', size: '2.4 MB', modified: '10 min ago', owner: 'Sarah Chen', version: 5, starred: true },
  { id: 2, name: 'API Integration Guide.docx', type: 'doc', size: '890 KB', modified: '1 hour ago', owner: 'Mike Johnson', version: 12, starred: false },
  { id: 3, name: 'Financial Report 2024.xlsx', type: 'excel', size: '4.2 MB', modified: '3 hours ago', owner: 'Lisa Wang', version: 3, starred: false },
  { id: 4, name: 'Brand Guidelines.pdf', type: 'pdf', size: '15.6 MB', modified: 'Yesterday', owner: 'Alex Kim', version: 8, starred: true },
  { id: 5, name: 'Product Screenshots.zip', type: 'file', size: '234 MB', modified: '2 days ago', owner: 'Tom Smith', version: 1, starred: false },
  { id: 6, name: 'Demo Video.mp4', type: 'video', size: '1.2 GB', modified: '3 days ago', owner: 'Sarah Chen', version: 2, starred: false },
  { id: 7, name: 'Architecture Diagram.png', type: 'image', size: '3.4 MB', modified: '1 week ago', owner: 'Mike Johnson', version: 4, starred: false },
];

// Mock versions
const mockVersions = [
  { version: 5, date: 'Jan 15, 2025 2:30 PM', user: 'Sarah Chen', size: '2.4 MB', changes: 'Updated pricing section' },
  { version: 4, date: 'Jan 14, 2025 11:00 AM', user: 'Mike Johnson', size: '2.3 MB', changes: 'Added new features' },
  { version: 3, date: 'Jan 12, 2025 4:15 PM', user: 'Sarah Chen', size: '2.1 MB', changes: 'Fixed typos' },
  { version: 2, date: 'Jan 10, 2025 9:30 AM', user: 'Lisa Wang', size: '2.0 MB', changes: 'Initial review feedback' },
  { version: 1, date: 'Jan 8, 2025 3:00 PM', user: 'Sarah Chen', size: '1.8 MB', changes: 'Initial upload' },
];

export default function DocumentManagementTemplate() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewMode, setViewMode] = useState('list');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setDetailsOpen(true);
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === mockFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(mockFiles.map(f => f.id));
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'grey.50' }}>
      {/* Left Sidebar - Navigation */}
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
        {/* Upload Button */}
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<CloudUploadIcon />}
            onClick={() => setUploadDialogOpen(true)}
            sx={{ textTransform: 'none' }}
          >
            Upload Files
          </Button>
        </Box>

        <Divider />

        {/* Quick Access */}
        <List dense sx={{ px: 1 }}>
          <ListItemButton selected sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Documents" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <AccessTimeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Recent" />
            <Badge badgeContent={4} color="primary" sx={{ mr: 1 }} />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <StarBorderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Shared with me" />
            <Badge badgeContent={12} color="primary" sx={{ mr: 1 }} />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ArticleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Knowledge Base" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: 1, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Folders */}
        <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            Folders
          </Typography>
          <IconButton size="small">
            <CreateNewFolderIcon fontSize="small" />
          </IconButton>
        </Box>

        <List dense sx={{ px: 1, flex: 1, overflow: 'auto' }}>
          {mockFolders.map((folder) => (
            <ListItemButton key={folder.id} sx={{ borderRadius: 1, mb: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <FolderIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </ListItemIcon>
              <ListItemText
                primary={folder.name}
                primaryTypographyProps={{ noWrap: true, fontSize: 14 }}
              />
              {folder.starred && <StarIcon fontSize="small" sx={{ color: '#FFC107', ml: 1 }} />}
            </ListItemButton>
          ))}
        </List>

        {/* Storage Usage */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Storage Used
            </Typography>
            <Typography variant="caption" color="text.secondary">
              8.4 GB / 15 GB
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={56}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            px: 3,
            py: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            {/* Breadcrumbs */}
            <Breadcrumbs separator={<ChevronRightIcon fontSize="small" />}>
              <Link href="#" underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                Documents
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Product Documentation
              </Link>
              <Typography color="text.primary">Q4 Release</Typography>
            </Breadcrumbs>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CreateNewFolderIcon />}
                sx={{ textTransform: 'none' }}
              >
                New Folder
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                sx={{ textTransform: 'none' }}
              >
                New Document
              </Button>
            </Box>
          </Box>

          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search documents..."
              sx={{ width: 320 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              size="small"
              startIcon={<FilterListIcon />}
              sx={{ textTransform: 'none' }}
            >
              Filters
            </Button>
            <Button
              size="small"
              startIcon={<SortIcon />}
              onClick={(e) => setSortMenuAnchor(e.currentTarget)}
              sx={{ textTransform: 'none' }}
            >
              Sort: Modified
            </Button>
            <Menu
              anchorEl={sortMenuAnchor}
              open={Boolean(sortMenuAnchor)}
              onClose={() => setSortMenuAnchor(null)}
            >
              <MenuItem>Name</MenuItem>
              <MenuItem selected>Modified Date</MenuItem>
              <MenuItem>Size</MenuItem>
              <MenuItem>Owner</MenuItem>
            </Menu>

            <Box sx={{ flex: 1 }} />

            {/* View Toggle */}
            <Box sx={{ display: 'flex', border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <IconButton
                size="small"
                color={viewMode === 'list' ? 'primary' : 'default'}
                onClick={() => setViewMode('list')}
              >
                <ViewListIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color={viewMode === 'grid' ? 'primary' : 'default'}
                onClick={() => setViewMode('grid')}
              >
                <GridViewIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Tab Navigation */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none' } }}>
            <Tab label="All Files" />
            <Tab label="Documents" />
            <Tab label="Images" />
            <Tab label="Videos" />
          </Tabs>
        </Box>

        {/* Selection Actions */}
        {selectedFiles.length > 0 && (
          <Paper sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'primary.50' }}>
            <Typography variant="body2" color="primary">
              {selectedFiles.length} selected
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Button size="small" startIcon={<DownloadIcon />}>Download</Button>
            <Button size="small" startIcon={<ShareIcon />}>Share</Button>
            <Button size="small" startIcon={<FolderIcon />}>Move</Button>
            <Button size="small" color="error" startIcon={<DeleteIcon />}>Delete</Button>
            <Box sx={{ flex: 1 }} />
            <Button size="small" onClick={() => setSelectedFiles([])}>Clear Selection</Button>
          </Paper>
        )}

        {/* File List */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          {viewMode === 'list' ? (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedFiles.length === mockFiles.length}
                        indeterminate={selectedFiles.length > 0 && selectedFiles.length < mockFiles.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Modified</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell align="center">Version</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockFiles.map((file) => (
                    <TableRow
                      key={file.id}
                      hover
                      selected={selectedFiles.includes(file.id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleSelectFile(file.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell onClick={() => handleFileClick(file)}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          {getFileIcon(file.type)}
                          <Typography variant="body2">{file.name}</Typography>
                          {file.starred && <StarIcon fontSize="small" sx={{ color: '#FFC107' }} />}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                            {file.owner.split(' ').map(n => n[0]).join('')}
                          </Avatar>
                          <Typography variant="body2">{file.owner}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">{file.modified}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">{file.size}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip label={`v${file.version}`} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); }}>
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); }}>
                          <ShareIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); setContextMenu(e.currentTarget); }}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Grid container spacing={2}>
              {mockFiles.map((file) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={file.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { borderColor: 'primary.main', boxShadow: 1 },
                      ...(selectedFiles.includes(file.id) && { borderColor: 'primary.main', bgcolor: 'primary.50' })
                    }}
                    onClick={() => handleFileClick(file)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Checkbox
                          size="small"
                          checked={selectedFiles.includes(file.id)}
                          onChange={(e) => { e.stopPropagation(); handleSelectFile(file.id); }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                          {file.starred ? <StarIcon sx={{ color: '#FFC107' }} /> : <StarBorderIcon />}
                        </IconButton>
                      </Box>
                      <Box sx={{ textAlign: 'center', py: 2 }}>
                        <Box sx={{ transform: 'scale(2)', mb: 2 }}>
                          {getFileIcon(file.type)}
                        </Box>
                        <Typography variant="body2" fontWeight={500} noWrap>
                          {file.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {file.size} · {file.modified}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Details Panel */}
      {detailsOpen && selectedFile && (
        <Paper
          elevation={0}
          sx={{
            width: 360,
            borderLeft: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" fontWeight={600}>File Details</Typography>
            <IconButton size="small" onClick={() => setDetailsOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {/* Preview */}
            <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.100' }}>
              <Box sx={{ transform: 'scale(3)', py: 3 }}>
                {getFileIcon(selectedFile.type)}
              </Box>
            </Box>

            {/* File Info */}
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>{selectedFile.name}</Typography>

              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Size</Typography>
                  <Typography variant="body2">{selectedFile.size}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Modified</Typography>
                  <Typography variant="body2">{selectedFile.modified}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Owner</Typography>
                  <Typography variant="body2">{selectedFile.owner}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Version</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">v{selectedFile.version}</Typography>
                    <Button size="small" onClick={() => setVersionDialogOpen(true)}>History</Button>
                  </Box>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Actions */}
              <Typography variant="subtitle2" gutterBottom>Actions</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" useFlexGap>
                <Button size="small" variant="outlined" startIcon={<DownloadIcon />}>Download</Button>
                <Button size="small" variant="outlined" startIcon={<ShareIcon />}>Share</Button>
                <Button size="small" variant="outlined" startIcon={<EditIcon />}>Edit</Button>
                <Button size="small" variant="outlined" startIcon={<HistoryIcon />}>Versions</Button>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Sharing */}
              <Typography variant="subtitle2" gutterBottom>Shared with</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>SC</Avatar>
                <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>MJ</Avatar>
                <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>LW</Avatar>
                <Button size="small">+ Add</Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Activity */}
              <Typography variant="subtitle2" gutterBottom>Recent Activity</Typography>
              <List dense disablePadding>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemAvatar sx={{ minWidth: 36 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: 10 }}>SC</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Sarah Chen edited"
                    secondary="10 minutes ago"
                    primaryTypographyProps={{ fontSize: 13 }}
                    secondaryTypographyProps={{ fontSize: 11 }}
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemAvatar sx={{ minWidth: 36 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: 10 }}>MJ</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Mike Johnson commented"
                    secondary="2 hours ago"
                    primaryTypographyProps={{ fontSize: 13 }}
                    secondaryTypographyProps={{ fontSize: 11 }}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={contextMenu}
        open={Boolean(contextMenu)}
        onClose={() => setContextMenu(null)}
      >
        <MenuItem onClick={() => setContextMenu(null)}>
          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
          Preview
        </MenuItem>
        <MenuItem onClick={() => setContextMenu(null)}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={() => setContextMenu(null)}>
          <ListItemIcon><DownloadIcon fontSize="small" /></ListItemIcon>
          Download
        </MenuItem>
        <MenuItem onClick={() => setContextMenu(null)}>
          <ListItemIcon><ShareIcon fontSize="small" /></ListItemIcon>
          Share
        </MenuItem>
        <MenuItem onClick={() => { setContextMenu(null); setVersionDialogOpen(true); }}>
          <ListItemIcon><HistoryIcon fontSize="small" /></ListItemIcon>
          Version History
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setContextMenu(null)}>
          <ListItemIcon><FolderIcon fontSize="small" /></ListItemIcon>
          Move to...
        </MenuItem>
        <MenuItem onClick={() => setContextMenu(null)}>
          <ListItemIcon><StarBorderIcon fontSize="small" /></ListItemIcon>
          Add to Starred
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setContextMenu(null)} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Upload Files
          <IconButton
            onClick={() => setUploadDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 6,
              textAlign: 'center',
              bgcolor: 'grey.50',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' },
              cursor: 'pointer',
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag and drop files here
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              or click to browse
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Maximum file size: 500MB · Supported: PDF, DOC, XLS, Images, Videos
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>Upload to folder:</Typography>
            <TextField
              select
              fullWidth
              size="small"
              defaultValue="Product Documentation"
              SelectProps={{ native: true }}
            >
              <option>My Documents</option>
              <option>Product Documentation</option>
              <option>Marketing Assets</option>
              <option>Engineering Specs</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Upload</Button>
        </DialogActions>
      </Dialog>

      {/* Version History Dialog */}
      <Dialog open={versionDialogOpen} onClose={() => setVersionDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Version History
          <IconButton
            onClick={() => setVersionDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {selectedFile?.name}
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Version</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Modified by</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Changes</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockVersions.map((version) => (
                  <TableRow key={version.version} hover>
                    <TableCell>
                      <Chip
                        label={`v${version.version}`}
                        size="small"
                        color={version.version === 5 ? 'primary' : 'default'}
                        variant={version.version === 5 ? 'filled' : 'outlined'}
                      />
                      {version.version === 5 && (
                        <Box component="span" sx={{ ml: 1 }}><Indicator label="Current" size="small" status="success" /></Box>
                      )}
                    </TableCell>
                    <TableCell>{version.date}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                          {version.user.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        {version.user}
                      </Box>
                    </TableCell>
                    <TableCell>{version.size}</TableCell>
                    <TableCell>{version.changes}</TableCell>
                    <TableCell align="right">
                      <Button size="small">Preview</Button>
                      {version.version !== 5 && (
                        <Button size="small" color="primary">Restore</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVersionDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
