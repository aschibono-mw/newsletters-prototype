import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// ─── Template Preview Components ───────────────────────────────────────────

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
      {/* Purple hero image */}
      <Box sx={{ bgcolor: '#2d1b4e', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle, #cc44cc, #7722aa)' }} />
      </Box>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ fontSize: '7px', fontWeight: 700, textAlign: 'center', mb: 0.5 }}>Your week at company</Typography>
        {/* Section tabs */}
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
        {/* Section tabs */}
        <Box sx={{ display: 'flex', border: '1px solid #eee', mb: 0.5 }}>
          {['Section 1', 'Section 2', 'Section 3'].map((s, i) => (
            <Box key={i} sx={{ flex: 1, borderRight: i < 2 ? '1px solid #eee' : 'none', py: 0.25, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '5.5px' }}>{s}</Typography>
            </Box>
          ))}
        </Box>
        {/* Green section header */}
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
      {/* Blue company header */}
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

// ─── Template Card ───────────────────────────────────────────────────────────

function TemplateCard({ name, description, PreviewComponent }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' },
        minWidth: 220,
        maxWidth: 360,
      }}
    >
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
              fontSize: 0,
            }}
          >
            <PreviewComponent />
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
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

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

export default function MwNewslettersCreatePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        bgcolor: 'background.default',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Meltwater diamond logo approximation */}
          <Box
            sx={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                bgcolor: 'primary.main',
                transform: 'rotate(45deg)',
                borderRadius: 0.5,
              }}
            />
          </Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Create Manual Newsletter
          </Typography>
        </Box>

        <IconButton onClick={() => navigate('/mw-newsletters')} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 4, py: 5 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Select a template structure to get started
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Choose a pre-designed layout or start from scratch.
          </Typography>
        </Box>

        {/* Template cards */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
            maxWidth: 1100,
            mx: 'auto',
          }}
        >
          {TEMPLATES.map((tpl) => (
            <TemplateCard
              key={tpl.id}
              name={tpl.name}
              description={tpl.description}
              PreviewComponent={tpl.Preview}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
