import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ButtonBaseline() {
  return (
    <div className="baseline-showcase">
      <section className="variant-section">
        <h4>Variants</h4>
        <div className="button-group">
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </div>
      </section>

      <section className="variant-section">
        <h4>Sizes</h4>
        <div className="button-group">
          <Button variant="contained" size="small">Small</Button>
          <Button variant="contained" size="medium">Medium</Button>
          <Button variant="contained" size="large">Large</Button>
        </div>
      </section>

      <section className="variant-section">
        <h4>Colors</h4>
        <div className="button-group">
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" color="warning">Warning</Button>
          <Button variant="contained" color="success">Success</Button>
        </div>
      </section>

      <section className="variant-section">
        <h4>States</h4>
        <div className="button-group">
          <Button variant="contained">Default</Button>
          <Button variant="contained" disabled>Disabled</Button>
        </div>
      </section>

      <section className="variant-section">
        <h4>Outlined Variants</h4>
        <div className="button-group">
          <Button variant="outlined" color="primary">Primary</Button>
          <Button variant="outlined" color="error">Error</Button>
          <Button variant="outlined" disabled>Disabled</Button>
        </div>
      </section>

      <section className="variant-section">
        <h4>Text Variants</h4>
        <div className="button-group">
          <Button variant="text" color="primary">Primary</Button>
          <Button variant="text" color="error">Error</Button>
          <Button variant="text" disabled>Disabled</Button>
        </div>
      </section>

      <section className="variant-section">
        <h4>Icon Buttons</h4>
        <div className="button-group">
          <IconButton color="primary" size="small">
            <SearchIcon fontSize="small" />
          </IconButton>
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
          <IconButton color="primary" size="large">
            <DeleteIcon fontSize="large" />
          </IconButton>
          <IconButton color="primary" disabled>
            <SearchIcon />
          </IconButton>
        </div>
      </section>

      <section className="variant-section">
        <h4>Loading States</h4>
        <div className="button-group">
          <Button
            variant="contained"
            disabled
            startIcon={<CircularProgress size={16} />}
          >
            Loading
          </Button>
          <Button
            variant="outlined"
            disabled
            startIcon={<CircularProgress size={16} />}
          >
            Loading
          </Button>
        </div>
      </section>

      <section className="variant-section">
        <h4>Button Features</h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #666)', lineHeight: '1.6' }}>
          • Three variants: contained (elevated), outlined (bordered), text (minimal)
          <br />
          • Five semantic colors: primary, secondary, error, warning, success
          <br />
          • Three sizes: small, medium, large
          <br />
          • Disabled state with reduced opacity
          <br />
          • Support for icons via startIcon and endIcon props
          <br />
          • Can be rendered as links with href prop
          <br />
          • Customizable with sx prop for advanced styling
          <br />• Accessible with proper focus states and keyboard navigation
        </p>
      </section>
    </div>
  );
}
