import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// ─── Template Preview Components ─────────────────────────────────────────────

function MinimalistPreview({ scale = 1 }) {
  return (
    <Box sx={{ bgcolor: '#fff', p: scale < 1 ? 1.5 : 3, fontSize: '6px', lineHeight: 1.4, color: '#222', fontFamily: 'serif', border: '1px solid #eee' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontSize: scale < 1 ? '7px' : '14px', fontWeight: 700 }}>Your weekly news digest</Typography>
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '12px', color: '#888' }}>04/14/26</Typography>
      </Box>
      <Divider sx={{ mb: scale < 1 ? 0.5 : 1.5 }} />
      <Typography sx={{ fontSize: scale < 1 ? '6.5px' : '13px', fontWeight: 700, mb: scale < 1 ? 0.25 : 1 }}>Summary</Typography>
      <Box sx={{ height: scale < 1 ? 14 : 40, bgcolor: '#f5f5f5', borderRadius: 0.25, mb: scale < 1 ? 0.5 : 1.5 }} />
      <Typography sx={{ fontSize: scale < 1 ? '6.5px' : '13px', fontWeight: 700, mb: scale < 1 ? 0.25 : 1 }}>Top Headlines</Typography>
      {[1, 2].map((i) => (
        <Box key={i} sx={{ mb: scale < 1 ? 0.5 : 1.5 }}>
          <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '11px', color: '#888' }}>Source • April 14, 2026</Typography>
          <Typography sx={{ fontSize: scale < 1 ? '6px' : '12px', color: '#1a73e8', textDecoration: 'underline' }}>Content Headline Title</Typography>
          <Box sx={{ height: scale < 1 ? 6 : 18, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
        </Box>
      ))}
      <Typography sx={{ fontSize: scale < 1 ? '6.5px' : '13px', fontWeight: 700, mb: scale < 1 ? 0.25 : 1 }}>Competitor Coverage</Typography>
      {[1, 2].map((i) => (
        <Box key={i} sx={{ mb: scale < 1 ? 0.5 : 1.5 }}>
          <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '11px', color: '#888' }}>Source • April 14, 2026</Typography>
          <Typography sx={{ fontSize: scale < 1 ? '6px' : '12px', color: '#1a73e8', textDecoration: 'underline' }}>Content Headline Title</Typography>
          <Box sx={{ height: scale < 1 ? 6 : 18, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
        </Box>
      ))}
      <Divider sx={{ my: scale < 1 ? 0.5 : 1.5 }} />
      <Typography sx={{ fontSize: scale < 1 ? '5px' : '11px', color: '#aaa', textAlign: 'center' }}>© 2026 Meltwater, All Rights Reserved.</Typography>
    </Box>
  );
}

function CompactPreview({ scale = 1 }) {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
      <Box sx={{ bgcolor: '#00827F', py: scale < 1 ? 1 : 2, px: scale < 1 ? 1.5 : 3, textAlign: 'center' }}>
        <Typography sx={{ fontSize: scale < 1 ? '7px' : '14px', fontWeight: 700, color: '#fff' }}>Weekly Coverage Highlights</Typography>
        <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '12px', color: 'rgba(255,255,255,0.8)' }}>Week of February 20 - 26, 2024</Typography>
      </Box>
      <Box sx={{ p: scale < 1 ? 1.5 : 3 }}>
        <Box sx={{ height: scale < 1 ? 10 : 30, bgcolor: '#f5f5f5', borderRadius: 0.25, mb: scale < 1 ? 0.5 : 2 }} />
        <Typography sx={{ fontSize: scale < 1 ? '6.5px' : '13px', fontWeight: 700, mb: scale < 1 ? 0.5 : 1.5 }}>Section 1</Typography>
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ mb: scale < 1 ? 0.5 : 1.5 }}>
            <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '11px', color: '#888' }}>Source | April 14, 2026</Typography>
            <Typography sx={{ fontSize: scale < 1 ? '6px' : '12px', color: '#1a73e8', fontWeight: 700 }}>Content Headline Title</Typography>
            <Box sx={{ height: scale < 1 ? 5 : 14, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
          </Box>
        ))}
        <Divider sx={{ my: scale < 1 ? 0.5 : 1.5 }} />
        <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '11px', color: '#aaa', textAlign: 'center' }}>Enter footer text</Typography>
        <Typography sx={{ fontSize: scale < 1 ? '5px' : '11px', color: '#1a73e8', textAlign: 'center', mt: 0.25 }}>To unsubscribe from this newsletter click here</Typography>
      </Box>
    </Box>
  );
}

function BalancePreview({ scale = 1 }) {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: scale < 1 ? 1 : 2, py: scale < 1 ? 0.5 : 1.5, borderBottom: '1px solid #eee' }}>
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '12px', color: '#888' }}>⬡ company</Typography>
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '12px', color: '#888' }}>04/14/26</Typography>
      </Box>
      <Box sx={{ bgcolor: '#2d1b4e', height: scale < 1 ? 50 : 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: scale < 1 ? 28 : 64, height: scale < 1 ? 28 : 64, borderRadius: '50%', background: 'radial-gradient(circle, #cc44cc, #7722aa)' }} />
      </Box>
      <Box sx={{ p: scale < 1 ? 1 : 2 }}>
        <Typography sx={{ fontSize: scale < 1 ? '7px' : '15px', fontWeight: 700, textAlign: 'center', mb: scale < 1 ? 0.5 : 1.5 }}>Your week at company</Typography>
        <Box sx={{ display: 'flex', border: '1px solid #eee', mb: scale < 1 ? 0.5 : 1.5 }}>
          {['Section 1', 'Section 2', 'Section 3'].map((s, i) => (
            <Box key={i} sx={{ flex: 1, borderRight: i < 2 ? '1px solid #eee' : 'none', py: scale < 1 ? 0.25 : 1, textAlign: 'center' }}>
              <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '12px', color: '#222' }}>{s}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ bgcolor: '#00827F', py: scale < 1 ? 0.25 : 0.75, mb: scale < 1 ? 0.5 : 1.5, textAlign: 'center' }}>
          <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '12px', color: '#fff' }}>Section 1</Typography>
        </Box>
        <Box sx={{ mb: 0.25 }}>
          <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '11px', color: '#888' }}>Source | Author name | April 14, 2026</Typography>
          <Typography sx={{ fontSize: scale < 1 ? '6px' : '13px', color: '#1a73e8' }}>Content Headline Title</Typography>
          <Box sx={{ height: scale < 1 ? 5 : 16, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
        </Box>
      </Box>
    </Box>
  );
}

function PrecisionPreview({ scale = 1 }) {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: scale < 1 ? 1 : 2, py: scale < 1 ? 0.5 : 1.5, borderBottom: '1px solid #eee' }}>
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '12px', color: '#888' }}>⬡ company</Typography>
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '12px', color: '#888' }}>04/14/26</Typography>
      </Box>
      <Box sx={{ p: scale < 1 ? 1 : 2 }}>
        <Typography sx={{ fontSize: scale < 1 ? '7px' : '15px', fontWeight: 700, mb: scale < 1 ? 0.5 : 1.5 }}>Your weekly news digest</Typography>
        <Box sx={{ height: scale < 1 ? 10 : 30, bgcolor: '#f5f5f5', borderRadius: 0.25, mb: scale < 1 ? 0.5 : 1.5 }} />
        <Box sx={{ display: 'flex', border: '1px solid #eee', mb: scale < 1 ? 0.5 : 1.5 }}>
          {['Section 1', 'Section 2', 'Section 3'].map((s, i) => (
            <Box key={i} sx={{ flex: 1, borderRight: i < 2 ? '1px solid #eee' : 'none', py: scale < 1 ? 0.25 : 1, textAlign: 'center' }}>
              <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '12px' }}>{s}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ bgcolor: '#2e7d32', py: scale < 1 ? 0.25 : 0.75, mb: scale < 1 ? 0.5 : 1.5 }}>
          <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '12px', color: '#fff', textAlign: 'center' }}>Company News</Typography>
        </Box>
        {[1, 2].map((i) => (
          <Box key={i} sx={{ mb: scale < 1 ? 0.5 : 1.5, display: 'flex', gap: scale < 1 ? 0.5 : 1, alignItems: 'flex-start' }}>
            <Box sx={{ width: scale < 1 ? 8 : 20, height: scale < 1 ? 8 : 20, borderRadius: '50%', bgcolor: '#e0e0e0', flexShrink: 0, mt: 0.25 }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '11px', color: '#888' }}>Source | Author name | April 14, 2026</Typography>
              <Typography sx={{ fontSize: scale < 1 ? '6px' : '13px', color: '#1a73e8' }}>Content Headline Title</Typography>
              <Box sx={{ height: scale < 1 ? 4 : 14, bgcolor: '#f5f5f5', borderRadius: 0.25, mt: 0.25 }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function ClarityPreview({ scale = 1 }) {
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid #eee', overflow: 'hidden' }}>
      <Box sx={{ bgcolor: '#1565C0', px: scale < 1 ? 1 : 2, py: scale < 1 ? 0.75 : 1.5, display: 'flex', alignItems: 'center', gap: scale < 1 ? 0.5 : 1 }}>
        <Box sx={{ width: scale < 1 ? 12 : 28, height: scale < 1 ? 12 : 28, borderRadius: 0.5, bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: scale < 1 ? '5px' : '10px', color: '#1565C0', fontWeight: 700 }}>co</Typography>
        </Box>
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '12px', color: '#fff', fontWeight: 700 }}>company</Typography>
        <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '11px', color: 'rgba(255,255,255,0.7)', ml: 'auto' }}>July 15 - 19, 2024</Typography>
      </Box>
      <Box sx={{ bgcolor: '#1976D2', py: scale < 1 ? 0.5 : 1, textAlign: 'center' }}>
        <Typography sx={{ fontSize: scale < 1 ? '6.5px' : '13px', color: '#fff', fontWeight: 700 }}>Your weekly news digest</Typography>
      </Box>
      <Box sx={{ p: scale < 1 ? 1 : 2 }}>
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '13px', fontWeight: 700, textAlign: 'center', mb: scale < 1 ? 0.5 : 1.5 }}>Company News</Typography>
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '13px', fontWeight: 700, mb: scale < 1 ? 0.25 : 1 }}>About our products</Typography>
        {[1, 2].map((i) => (
          <Box key={i} sx={{ mb: scale < 1 ? 0.25 : 1, display: 'flex', gap: scale < 1 ? 0.5 : 1 }}>
            <Box sx={{ width: scale < 1 ? 8 : 20, height: scale < 1 ? 8 : 20, borderRadius: '50%', bgcolor: '#e0e0e0', flexShrink: 0, mt: 0.25 }} />
            <Box>
              <Typography sx={{ fontSize: scale < 1 ? '5px' : '10px', color: '#888' }}>Source | Author name | April 14, 2026</Typography>
              <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '12px', color: '#1a73e8' }}>Content Headline Title</Typography>
            </Box>
          </Box>
        ))}
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '13px', fontWeight: 700, mb: scale < 1 ? 0.25 : 1, mt: scale < 1 ? 0.5 : 1.5 }}>Industry News</Typography>
        <Typography sx={{ fontSize: scale < 1 ? '6px' : '13px', fontWeight: 700, color: '#555', mb: scale < 1 ? 0.25 : 1, mt: scale < 1 ? 0.25 : 0.5 }}>Negative</Typography>
        <Box sx={{ mb: 0.25, display: 'flex', gap: scale < 1 ? 0.5 : 1 }}>
          <Box sx={{ width: scale < 1 ? 8 : 20, height: scale < 1 ? 8 : 20, borderRadius: '50%', bgcolor: '#e0e0e0', flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontSize: scale < 1 ? '5px' : '10px', color: '#888' }}>Source | Author name</Typography>
            <Typography sx={{ fontSize: scale < 1 ? '5.5px' : '12px', color: '#1a73e8' }}>Content Headline Title</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Template definitions ─────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'A clean and simple layout that highlights your headlines without extra design elements.',
    Preview: MinimalistPreview,
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Ideal for quick setups with minimal design.',
    Preview: CompactPreview,
  },
  {
    id: 'balance',
    name: 'Balance',
    description: 'Great for visually engaging, branded newsletters.',
    Preview: BalancePreview,
  },
  {
    id: 'precision',
    name: 'Precision',
    description: 'Tailored for lightly branded media roundups.',
    Preview: PrecisionPreview,
  },
  {
    id: 'clarity',
    name: 'Clarity',
    description: 'Designed for media monitoring with sub-categories.',
    Preview: ClarityPreview,
  },
];

// ─── Template Card ────────────────────────────────────────────────────────────

function TemplateCard({ template, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const { Preview } = template;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        borderColor: hovered ? 'primary.main' : 'divider',
        boxShadow: hovered ? 4 : 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(template)}
    >
      {/* Preview area with hover overlay */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            p: 1.5,
            pb: 1,
            bgcolor: '#fafafa',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Preview scale={0.5} />
        </Box>

        {/* Hover overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.18s ease',
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              fontWeight: 600,
              '&:hover': { bgcolor: 'grey.100' },
              pointerEvents: 'none',
            }}
          >
            Preview and Select
          </Button>
        </Box>
      </Box>

      {/* Name + description */}
      <Box sx={{ px: 2, py: 1.75 }}>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ mb: 0.5 }}>
          {template.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
          {template.description}
        </Typography>
      </Box>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MwNewslettersCurrentCreatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'manual';

  const [activeTab, setActiveTab] = useState(0);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const pageTitle = type === 'automated' ? 'Create Automated Newsletter' : 'Create Manual Newsletter';

  const handleUseTemplate = () => {
    if (!previewTemplate) return;
    navigate(`/mw-newsletters-current/editor/new?type=${type}&template=${previewTemplate.id}`);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <Box
        sx={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
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

      {/* Tabs */}
      <Box sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{ px: 3, minHeight: 44, '& .MuiTab-root': { minHeight: 44, fontSize: '14px', textTransform: 'none' } }}
        >
          <Tab label="Meltwater Templates" />
          <Tab label="My Templates" />
        </Tabs>
      </Box>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 0 && (
          <Box sx={{ px: 4, py: 3 }}>
            <Box sx={{ textAlign: 'center', mt: 1, mb: 4 }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                Select a template structure to get started
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose a pre-designed layout or start from scratch.
              </Typography>
            </Box>

            {/* Template cards grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
                maxWidth: 1100,
                mx: 'auto',
              }}
            >
              {TEMPLATES.map((tpl) => (
                <TemplateCard
                  key={tpl.id}
                  template={tpl}
                  onSelect={setPreviewTemplate}
                />
              ))}
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 10,
              gap: 2,
            }}
          >
            <Box sx={{ fontSize: '64px', color: '#ccc', lineHeight: 1 }}>📄</Box>
            <Typography variant="h6" color="text.secondary" fontWeight={600}>
              No custom templates yet
            </Typography>
            <Typography
              sx={{ color: '#00827F', cursor: 'pointer', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}
              onClick={() => setActiveTab(0)}
            >
              Start from a Meltwater template
            </Typography>
          </Box>
        )}
      </Box>

      {/* Template Preview Dialog */}
      <Dialog
        open={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
        maxWidth="sm"
        fullWidth
      >
        {previewTemplate && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1.5 }}>
              <Typography variant="h6" fontWeight={700}>
                {previewTemplate.name} Template Preview
              </Typography>
              <IconButton size="small" onClick={() => setPreviewTemplate(null)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ overflow: 'auto' }}>
              <previewTemplate.Preview scale={1} />
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
              <Button variant="text" onClick={() => setPreviewTemplate(null)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleUseTemplate}
                sx={{ bgcolor: '#00827F', '&:hover': { bgcolor: '#006461' } }}
              >
                Use this Template
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
