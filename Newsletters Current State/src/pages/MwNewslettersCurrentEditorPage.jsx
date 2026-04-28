import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ShareIcon from '@mui/icons-material/Share';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// ─── Settings & Schedule Dialog ───────────────────────────────────────────────

function SettingsDialog({ open, onClose }) {
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [selectedDays, setSelectedDays] = useState(['Mon']);
  const [approvalChoice, setApprovalChoice] = useState('yes');

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1.5 }}>
        <Typography variant="h6" fontWeight={700}>Settings &amp; Schedule</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Newsletter Settings */}
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
          Newsletter Settings
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Internal Newsletter name in Meltwater — not visible to recipients*"
        />

        {/* Email Settings */}
        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 2.5, mb: 1 }}>
          Email Settings
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Subject*"
          helperText="0/100"
        />

        <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
          <InputLabel>Select an approved sender*</InputLabel>
          <Select label="Select an approved sender*">
            <MenuItem value="sender1">sender@example.com</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5 }}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Language*</InputLabel>
            <Select label="Language*" defaultValue="en">
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>Time zone*</InputLabel>
            <Select label="Time zone*" defaultValue="europe_london">
              <MenuItem value="europe_london">Europe/London</MenuItem>
              <MenuItem value="america_new_york">America/New_York</MenuItem>
              <MenuItem value="us_pacific">US/Pacific</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControl fullWidth size="small" sx={{ mt: 1.5 }}>
          <InputLabel>Select recipient list*</InputLabel>
          <Select label="Select recipient list*">
            <MenuItem value="list1">Marketing Team</MenuItem>
            <MenuItem value="list2">Executives</MenuItem>
          </Select>
        </FormControl>

        {/* Review before sending */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 2.5, mb: 1 }}>
          <Typography variant="subtitle2" fontWeight={700}>Review before sending?</Typography>
          <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        </Box>
        <RadioGroup
          value={approvalChoice}
          onChange={(e) => setApprovalChoice(e.target.value)}
        >
          <FormControlLabel
            value="yes"
            control={<Radio size="small" />}
            label={
              <Typography sx={{ fontSize: '13px' }}>
                Yes, send it to me for review and approval before sending
              </Typography>
            }
          />
          <FormControlLabel
            value="no"
            control={<Radio size="small" />}
            label={
              <Typography sx={{ fontSize: '13px' }}>
                No, skip approval and send on schedule
              </Typography>
            }
          />
        </RadioGroup>

        {/* Schedule */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 2.5, mb: 1 }}>
          <Typography variant="subtitle2" fontWeight={700}>Schedule your newsletter delivery.</Typography>
          <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
        </Box>

        {/* Day picker */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mt: 1 }}>
          {DAYS.map((day) => {
            const isSelected = selectedDays.includes(day);
            return (
              <Box
                key={day}
                onClick={() => toggleDay(day)}
                sx={{
                  width: 44,
                  height: 36,
                  border: '1px solid',
                  borderColor: isSelected ? '#00827F' : 'divider',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  bgcolor: isSelected ? '#00827F' : '#fff',
                  color: isSelected ? '#fff' : 'text.primary',
                  fontSize: '13px',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'all 0.12s',
                  userSelect: 'none',
                }}
              >
                {day}
              </Box>
            );
          })}
        </Box>

        {/* Time row */}
        <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
          Specify a time
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 72 }}>
            <InputLabel>Hour</InputLabel>
            <Select label="Hour" defaultValue="01">
              {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => (
                <MenuItem key={h} value={h}>{h}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 72 }}>
            <InputLabel>Min</InputLabel>
            <Select label="Min" defaultValue="00">
              {['00', '15', '30', '45'].map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 72 }}>
            <InputLabel>AM/PM</InputLabel>
            <Select label="AM/PM" defaultValue="AM">
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Time zone</InputLabel>
            <Select label="Time zone" defaultValue="europe_london">
              <MenuItem value="europe_london">Europe/London</MenuItem>
              <MenuItem value="america_new_york">America/New_York</MenuItem>
              <MenuItem value="us_pacific">US/Pacific</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button variant="outlined" onClick={onClose}>Save Settings</Button>
        <Button
          variant="contained"
          sx={{ bgcolor: '#00827F', '&:hover': { bgcolor: '#006461' } }}
          onClick={onClose}
        >
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Section block ────────────────────────────────────────────────────────────

function NewsletterSection({ title }) {
  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        mb: 2,
        overflow: 'hidden',
        '&:hover': { border: '1.5px dashed #1a73e8' },
      }}
    >
      {/* Section toolbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 1.5,
          py: 0.5,
          gap: 0.5,
          bgcolor: '#fafafa',
          borderBottom: '1px solid #e8e8e8',
        }}
      >
        <DragHandleIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
        <IconButton size="small" sx={{ p: 0.25 }}>
          <KeyboardArrowUpIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        </IconButton>
        <IconButton size="small" sx={{ p: 0.25 }}>
          <KeyboardArrowDownIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        </IconButton>

        <Typography sx={{ flex: 1, fontSize: '11px', color: 'text.disabled', textAlign: 'center' }}>
          (0) items selected
        </Typography>

        <IconButton size="small" sx={{ p: 0.25 }}>
          <EditIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        </IconButton>
        <IconButton size="small" sx={{ p: 0.25 }}>
          <PlaylistAddIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        </IconButton>
        <IconButton size="small" sx={{ p: 0.25 }}>
          <AddCircleOutlineIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        </IconButton>
        <IconButton size="small" sx={{ p: 0.25 }}>
          <SettingsIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        </IconButton>
        <IconButton size="small" sx={{ p: 0.25 }}>
          <MoreVertIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        </IconButton>
        <IconButton size="small" sx={{ p: 0.25 }}>
          <KeyboardArrowUpIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        </IconButton>
      </Box>

      {/* Section content */}
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 1 }}>{title}</Typography>
        {[1, 2].map((i) => (
          <Box key={i} sx={{ mb: i < 2 ? 2 : 0 }}>
            <Typography sx={{ fontSize: '11px', color: 'text.secondary', mb: 0.25 }}>
              Source • April 27, 2026
            </Typography>
            <Typography
              sx={{
                fontSize: '13px',
                color: '#1a73e8',
                textDecoration: 'underline',
                cursor: 'pointer',
                mb: 0.5,
                fontWeight: 500,
              }}
            >
              Content Headline Title
            </Typography>
            <Typography sx={{ fontSize: '12px', color: 'text.secondary', lineHeight: 1.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MwNewslettersCurrentEditorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'manual';

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [rightTab, setRightTab] = useState(0);

  const pageTitle = type === 'automated' ? 'Create Automated Newsletter' : 'Create Manual Newsletter';

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header bar */}
      <Box
        sx={{
          height: 56,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography sx={{ fontSize: '24px', fontWeight: 900, color: '#00827F', lineHeight: 1 }}>◈</Typography>
          <Typography sx={{ fontSize: '18px', fontWeight: 600 }}>{pageTitle}</Typography>
        </Box>
        <IconButton onClick={() => navigate('/mw-newsletters-current')} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Toolbar row */}
      <Box
        sx={{
          height: 52,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          px: 2,
          gap: 1,
          flexShrink: 0,
        }}
      >
        {/* Left group */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" title="Preview">
            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" title="Share">
            <ShareIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5, my: 1 }} />
          <IconButton size="small" title="Undo">
            <UndoIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" title="Redo">
            <RedoIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Right group */}
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="text"
            size="small"
            startIcon={
              <AutoAwesomeIcon sx={{ fontSize: 16, color: '#B627A1' }} />
            }
            sx={{ textTransform: 'none', fontSize: '13px', color: 'text.primary' }}
          >
            AI Tools
          </Button>
          <Button
            variant="text"
            size="small"
            startIcon={<HelpOutlineIcon sx={{ fontSize: 16 }} />}
            sx={{ textTransform: 'none', fontSize: '13px', color: 'text.primary' }}
          >
            Content Guidelines
          </Button>
          <Button
            variant="text"
            size="small"
            startIcon={<GridViewIcon sx={{ fontSize: 16 }} />}
            sx={{ textTransform: 'none', fontSize: '13px', color: 'text.primary' }}
          >
            Add Elements
          </Button>
          <Button
            variant="outlined"
            size="small"
            endIcon={<ArrowDropDownIcon />}
            sx={{ textTransform: 'none', fontSize: '13px' }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSettingsOpen(true)}
            sx={{
              textTransform: 'none',
              fontSize: '13px',
              bgcolor: '#B627A1',
              '&:hover': { bgcolor: '#8f1d7b' },
            }}
          >
            Settings &amp; Schedule
          </Button>
        </Box>
      </Box>

      {/* Main area */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left panel - newsletter paper */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            py: 3,
            px: 2,
          }}
        >
          <Box
            sx={{
              width: 620,
              minHeight: 600,
              bgcolor: '#fff',
              border: '1px solid #e0e0e0',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            {/* Newsletter title row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                py: 2,
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>
                Your weekly news digest
              </Typography>
              <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                04/27/26
              </Typography>
            </Box>

            {/* Summary block */}
            <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #e0e0e0' }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, mb: 0.75 }}>Summary</Typography>
              <Typography sx={{ fontSize: '13px', color: 'text.secondary', lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Box>

            {/* Sections */}
            <Box sx={{ px: 3, py: 2 }}>
              <NewsletterSection title="Top Headlines" />
              <NewsletterSection title="Competitor Coverage" />
            </Box>

            {/* Footer */}
            <Box
              sx={{
                px: 3,
                py: 2,
                borderTop: '1px solid #e0e0e0',
                bgcolor: '#fafafa',
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: '11px', color: 'text.disabled', mb: 0.5 }}>
                © 2025 Meltwater. All Rights Reserved.
              </Typography>
              <Typography sx={{ fontSize: '11px', color: 'text.disabled' }}>
                350 Mission Street, San Francisco, CA 94105, United States
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right panel */}
        <Box
          sx={{
            width: 380,
            bgcolor: 'background.paper',
            borderLeft: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
          }}
        >
          {/* Tabs row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={rightTab}
              onChange={(_, v) => setRightTab(v)}
              sx={{
                flex: 1,
                minHeight: 44,
                '& .MuiTab-root': { minHeight: 44, fontSize: '13px', textTransform: 'none' },
              }}
            >
              <Tab label="Search Results" />
              <Tab label="Content Settings" />
            </Tabs>
            <IconButton size="small" sx={{ mr: 1 }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          {/* Panel content */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4,
              px: 2,
            }}
          >
            <LightbulbOutlinedIcon
              sx={{ fontSize: 80, color: '#00827F', opacity: 0.5, mb: 1 }}
            />
            <Typography
              variant="h6"
              fontWeight={700}
              textAlign="center"
              sx={{ px: 3, mt: 2, mb: 1 }}
            >
              Preview the content that will be included in your Newsletter here
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ px: 3 }}
            >
              Start by adding saved searches, tags, or RSS feeds—these are called inputs.
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2, textTransform: 'none', borderColor: '#00827F', color: '#00827F' }}
              onClick={() => setSettingsOpen(true)}
            >
              Add content
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Settings & Schedule Dialog */}
      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </Box>
  );
}
