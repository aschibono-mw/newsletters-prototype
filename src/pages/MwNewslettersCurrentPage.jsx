import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewListIcon from '@mui/icons-material/ViewList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// ─── Re-exported preview components (copied from MwNewslettersCreatePage) ────

function MinimalistPreview() {
  return (
    <Box sx={{ bgcolor: '#fff', p: 1.5, fontSize: '6px', lineHeight: 1.4, color: '#222', fontFamily: 'serif', border: '1px solid #eee' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontSize: '7px', fontWeight: 700 }}>Your weekly news digest</Typography>
        <Typography sx={{ fontSize: '6px', color: '#888' }}>04/14/26</Typography>
      </Box>
      <Divider sx={{ mb: 0.5 }} />
      <Typography sx={{ fontSize: '6.5px', fontWeight: 700, mb: 0.25 }}>Summary</Typography>
      <Box sx={{ height: 14, bgcolor: '#f5f5f5', borderRadius: 0.25, mb: 0.5 }} />
      <Typography sx={{ fontSize: '6.5px', fontWeight: 700, mb: 0.25 }}>Top Headlines</Typography>
      {[1, 2].map((i) => (
        <Box key={i} sx={{ mb: 0.5 }}>
          <Typography sx={{ fontSize: '5.5px', color: '#888' }}>Source • April 14, 2026</Typography>
          <Typography sx={{ fontSize: '6px', color: '#1a73e8', textDecoration: 'underline' }}>Content Headline Title</Typography>
          <Box sx={{ height: 6, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
        </Box>
      ))}
      <Typography sx={{ fontSize: '6.5px', fontWeight: 700, mb: 0.25 }}>Competitor Coverage</Typography>
      {[1, 2].map((i) => (
        <Box key={i} sx={{ mb: 0.5 }}>
          <Typography sx={{ fontSize: '5.5px', color: '#888' }}>Source • April 14, 2026</Typography>
          <Typography sx={{ fontSize: '6px', color: '#1a73e8', textDecoration: 'underline' }}>Content Headline Title</Typography>
          <Box sx={{ height: 6, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
        </Box>
      ))}
      <Divider sx={{ my: 0.5 }} />
      <Typography sx={{ fontSize: '5px', color: '#aaa', textAlign: 'center' }}>© 2026 Meltwater, All Rights Reserved.</Typography>
    </Box>
  );
}

function CompactPreview() {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
      <Box sx={{ bgcolor: '#00827F', py: 1, px: 1.5, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '7px', fontWeight: 700, color: '#fff' }}>Weekly Coverage Highlights</Typography>
        <Typography sx={{ fontSize: '5.5px', color: 'rgba(255,255,255,0.8)' }}>Week of February 20 - 26, 2024</Typography>
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Box sx={{ height: 10, bgcolor: '#f5f5f5', borderRadius: 0.25, mb: 0.5 }} />
        <Typography sx={{ fontSize: '6.5px', fontWeight: 700, mb: 0.5 }}>Section 1</Typography>
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ mb: 0.5 }}>
            <Typography sx={{ fontSize: '5.5px', color: '#888' }}>Source | April 14, 2026</Typography>
            <Typography sx={{ fontSize: '6px', color: '#1a73e8', fontWeight: 700 }}>Content Headline Title</Typography>
            <Box sx={{ height: 5, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
          </Box>
        ))}
        <Divider sx={{ my: 0.5 }} />
        <Typography sx={{ fontSize: '5.5px', color: '#aaa', textAlign: 'center' }}>Enter footer text</Typography>
        <Typography sx={{ fontSize: '5px', color: '#1a73e8', textAlign: 'center', mt: 0.25 }}>To unsubscribe from this newsletter click here</Typography>
      </Box>
    </Box>
  );
}

function BalancePreview() {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, py: 0.5, borderBottom: '1px solid #eee' }}>
        <Typography sx={{ fontSize: '6px', color: '#888' }}>⬡ company</Typography>
        <Typography sx={{ fontSize: '6px', color: '#888' }}>04/14/26</Typography>
      </Box>
      <Box sx={{ bgcolor: '#2d1b4e', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle, #cc44cc, #7722aa)' }} />
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ fontSize: '7px', fontWeight: 700, textAlign: 'center', mb: 0.5 }}>Your week at company</Typography>
        <Box sx={{ display: 'flex', border: '1px solid #eee', mb: 0.5 }}>
          {['Section 1', 'Section 2', 'Section 3'].map((s, i) => (
            <Box key={i} sx={{ flex: 1, borderRight: i < 2 ? '1px solid #eee' : 'none', py: 0.25, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '5.5px', color: '#222' }}>{s}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ bgcolor: '#00827F', py: 0.25, mb: 0.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '5.5px', color: '#fff' }}>Section 1</Typography>
        </Box>
        <Box sx={{ mb: 0.25 }}>
          <Typography sx={{ fontSize: '5.5px', color: '#888' }}>Source | Author name | April 14, 2026</Typography>
          <Typography sx={{ fontSize: '6px', color: '#1a73e8' }}>Content Headline Title</Typography>
          <Box sx={{ height: 5, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
        </Box>
      </Box>
    </Box>
  );
}

function PrecisionPreview() {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, py: 0.5, borderBottom: '1px solid #eee' }}>
        <Typography sx={{ fontSize: '6px', color: '#888' }}>⬡ company</Typography>
        <Typography sx={{ fontSize: '6px', color: '#888' }}>04/14/26</Typography>
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ fontSize: '7px', fontWeight: 700, mb: 0.5 }}>Your weekly news digest</Typography>
        <Box sx={{ height: 10, bgcolor: '#f5f5f5', borderRadius: 0.25, mb: 0.5 }} />
        <Box sx={{ display: 'flex', border: '1px solid #eee', mb: 0.5 }}>
          {['Section 1', 'Section 2', 'Section 3'].map((s, i) => (
            <Box key={i} sx={{ flex: 1, borderRight: i < 2 ? '1px solid #eee' : 'none', py: 0.25, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '5.5px' }}>{s}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ bgcolor: '#2e7d32', py: 0.25, mb: 0.5 }}>
          <Typography sx={{ fontSize: '5.5px', color: '#fff', textAlign: 'center' }}>Company News</Typography>
        </Box>
        {[1, 2].map((i) => (
          <Box key={i} sx={{ mb: 0.5, display: 'flex', gap: 0.5, alignItems: 'flex-start' }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#e0e0e0', flexShrink: 0, mt: 0.25 }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '5.5px', color: '#888' }}>Source | Author name | April 14, 2026</Typography>
              <Typography sx={{ fontSize: '6px', color: '#1a73e8' }}>Content Headline Title</Typography>
              <Box sx={{ height: 4, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ClarityPreview() {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
      <Box sx={{ bgcolor: '#1565C0', px: 1, py: 0.75, display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '5px', color: '#1565C0', fontWeight: 700 }}>co</Typography>
        </Box>
        <Typography sx={{ fontSize: '6px', color: '#fff', fontWeight: 700 }}>company</Typography>
        <Typography sx={{ fontSize: '5.5px', color: 'rgba(255,255,255,0.7)', ml: 'auto' }}>July 15 - 19, 2024</Typography>
      </Box>
      <Box sx={{ bgcolor: '#1976D2', py: 0.5, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '6.5px', color: '#fff', fontWeight: 700 }}>Your weekly news digest</Typography>
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ fontSize: '6px', fontWeight: 700, textAlign: 'center', mb: 0.5 }}>Company News</Typography>
        <Typography sx={{ fontSize: '6px', fontWeight: 700, mb: 0.25 }}>About our products</Typography>
        {[1, 2].map((i) => (
          <Box key={i} sx={{ mb: 0.25, display: 'flex', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#e0e0e0', flexShrink: 0, mt: 0.25 }} />
            <Box>
              <Typography sx={{ fontSize: '5px', color: '#888' }}>Source | Author name | April 14, 2026</Typography>
              <Typography sx={{ fontSize: '5.5px', color: '#1a73e8' }}>Content Headline Title</Typography>
            </Box>
          </Box>
        ))}
        <Typography sx={{ fontSize: '6px', fontWeight: 700, mb: 0.25, mt: 0.5 }}>Industry News</Typography>
        <Typography sx={{ fontSize: '6px', fontWeight: 700, color: '#555', mb: 0.25, mt: 0.25 }}>Negative</Typography>
        <Box sx={{ mb: 0.25, display: 'flex', gap: 0.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#e0e0e0', flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontSize: '5px', color: '#888' }}>Source | Author name</Typography>
            <Typography sx={{ fontSize: '5.5px', color: '#1a73e8' }}>Content Headline Title</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Preview component map ────────────────────────────────────────────────────

const PREVIEW_MAP = {
  minimalist: MinimalistPreview,
  compact: CompactPreview,
  balance: BalancePreview,
  precision: PrecisionPreview,
  clarity: ClarityPreview,
};

// ─── Newsletter data ──────────────────────────────────────────────────────────

const NEWSLETTERS = [
  { id: 1, title: 'Burgers - Minimalist...', template: 'minimalist', badge: 'Automated', lastSent: '4/24/2026 05:02 PM', sentCount: 7, draftCount: 0 },
  { id: 2, title: 'last template', template: 'compact', badge: 'Automated', lastSent: '4/24/2026 05:01 PM', sentCount: 7, draftCount: 0 },
  { id: 3, title: 'EVs - Template 3', template: 'balance', badge: 'Automated', lastSent: '4/24/2026 05:01 PM', sentCount: 7, draftCount: 0 },
  { id: 4, title: 'Joe Rogan Template 2', template: 'precision', badge: 'Automated', lastSent: '4/24/2026 05:00 PM', sentCount: 7, draftCount: 0 },
  { id: 5, title: 'Precision Template Test', template: 'clarity', badge: 'Automated', lastSent: '4/24/2026 05:00 PM', sentCount: 7, draftCount: 0 },
  { id: 6, title: 'Green test', template: 'precision', badge: 'Automated', lastSent: '4/19/2024 12:06 PM', sentCount: 1, draftCount: 2 },
  { id: 7, title: 'Untitled draft', template: 'compact', badge: 'Draft', lastSent: null, sentCount: 0, draftCount: 1 },
  { id: 8, title: 'Untitled draft', template: 'balance', badge: 'Draft', lastSent: null, sentCount: 0, draftCount: 1 },
  { id: 9, title: 'Untitled draft', template: 'minimalist', badge: 'Draft', lastSent: null, sentCount: 0, draftCount: 1 },
  { id: 10, title: 'Untitled draft', template: 'clarity', badge: 'Draft', lastSent: null, sentCount: 0, draftCount: 1 },
];

// ─── Newsletter Card ──────────────────────────────────────────────────────────

function NewsletterCard({ newsletter }) {
  const [kabobAnchor, setKabobAnchor] = useState(null);
  const PreviewComponent = PREVIEW_MAP[newsletter.template] || MinimalistPreview;

  const sentLabel = (() => {
    if (newsletter.sentCount > 0 && newsletter.draftCount > 0) {
      return `${newsletter.sentCount} Sent, ${newsletter.draftCount} Draft`;
    }
    if (newsletter.sentCount > 0) {
      return `${newsletter.sentCount} Sent`;
    }
    if (newsletter.draftCount > 0) {
      return `${newsletter.draftCount} Draft`;
    }
    return null;
  })();

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.15s',
        '&:hover': { boxShadow: 3 },
      }}
    >
      {/* Thumbnail area */}
      <Box sx={{ position: 'relative', height: 210, bgcolor: '#f0f0f0', overflow: 'hidden', p: '12px 12px 0 12px' }}>
        {/* Framed preview — white paper with shadow sitting inside grey bg */}
        <Box sx={{
          position: 'relative',
          height: '100%',
          bgcolor: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '285%',
              height: '285%',
              transform: 'scale(0.35)',
              transformOrigin: 'top left',
            }}
          >
            <PreviewComponent />
          </Box>
        </Box>

        {/* Badge */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 20,
            bgcolor: 'rgba(255,255,255,0.92)',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '11px',
            px: 1,
            py: 0.25,
            lineHeight: 1.6,
            color: '#333',
            fontFamily: 'inherit',
            fontWeight: 500,
          }}
        >
          {newsletter.badge}
        </Box>
      </Box>

      {/* Card body */}
      <Box sx={{ px: 1.5, py: 1.25, flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 600,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {newsletter.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', color: 'text.secondary', flex: 1 }}>
            {newsletter.lastSent ? `Last sent - ${newsletter.lastSent}` : 'No sends yet'}
          </Typography>
          <IconButton
            size="small"
            sx={{ p: 0.25, ml: 0.5 }}
            onClick={(e) => { e.stopPropagation(); setKabobAnchor(e.currentTarget); }}
          >
            <MoreVertIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {sentLabel && (
          <Typography sx={{ fontSize: '12px', color: '#00827F', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
            {sentLabel}
          </Typography>
        )}
      </Box>

      {/* Kabob menu */}
      <Menu
        anchorEl={kabobAnchor}
        open={Boolean(kabobAnchor)}
        onClose={() => setKabobAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => setKabobAnchor(null)}>Edit</MenuItem>
        <MenuItem onClick={() => setKabobAnchor(null)}>Duplicate</MenuItem>
        <MenuItem onClick={() => setKabobAnchor(null)} sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MwNewslettersCurrentPage() {
  const navigate = useNavigate();
  const [createMenuAnchor, setCreateMenuAnchor] = useState(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>

      {/* Top action bar — Create New lives here, top-right above info banner */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3, py: 1.25 }}>
        <Button
          variant="contained"
          endIcon={<ArrowDropDownIcon />}
          onClick={(e) => setCreateMenuAnchor(e.currentTarget)}
          sx={{
            bgcolor: '#B627A1',
            borderRadius: '4px',
            '&:hover': { bgcolor: '#8f1d7b' },
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            px: 2.5,
            py: 0.875,
          }}
        >
          Create New
        </Button>

        <Menu
          anchorEl={createMenuAnchor}
          open={Boolean(createMenuAnchor)}
          onClose={() => setCreateMenuAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{ paper: { sx: { minWidth: 320, mt: 0.5 } } }}
        >
          <MenuItem
            onClick={() => { setCreateMenuAnchor(null); navigate('/mw-newsletters-current/create?type=manual'); }}
            sx={{ py: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.25 }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>Manual Newsletter</Typography>
            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
              You draft and send each newsletter yourself.
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => { setCreateMenuAnchor(null); navigate('/mw-newsletters-current/create?type=automated'); }}
            sx={{ py: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.25 }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>Automated Newsletter</Typography>
            <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
              Meltwater automatically drafts and sends the newsletters on a set schedule.
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

      {/* Info banner */}
      <Box
        sx={{
          bgcolor: '#e8f4fd',
          borderTop: '1px solid #b3d7f0',
          borderBottom: '1px solid #b3d7f0',
          px: 3,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>
          Need help or want to share an idea?
        </Typography>
        <Typography
          component="span"
          sx={{ fontSize: '13px', color: '#00827F', cursor: 'pointer', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}
        >
          Learn more about Newsletters
        </Typography>
        <Typography sx={{ fontSize: '13px', color: 'text.disabled' }}>|</Typography>
        <Typography
          component="span"
          sx={{ fontSize: '13px', color: '#00827F', cursor: 'pointer', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}
        >
          Submit feedback
        </Typography>
      </Box>

      <Box sx={{ px: 3, py: 2, flex: 1 }}>
        {/* Count + icons row */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 700, flex: 1 }}>
            20 Total Newsletter Series
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton size="small"><SearchIcon sx={{ fontSize: 20 }} /></IconButton>
            <IconButton size="small"><FilterListIcon sx={{ fontSize: 20 }} /></IconButton>
            <IconButton size="small"><ViewListIcon sx={{ fontSize: 20 }} /></IconButton>
          </Box>
        </Box>

        {/* Sort label row — right-aligned, below count row */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
            Sorted by Recently sent, Descending
          </Typography>
        </Box>

        {/* Newsletter grid - 5 columns */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
          }}
        >
          {NEWSLETTERS.map((newsletter) => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
