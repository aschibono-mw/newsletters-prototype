import React from 'react';
import { TextField, Stack, Tooltip, IconButton, InputAdornment } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClearIcon from '@mui/icons-material/Clear';

export default function TextFieldBaseline() {
  const [values, setValues] = React.useState({
    standard: '',
    outlined: '',
    filled: '',
    multiline: '',
    withClear: '',
    withInfotip: 'Some text',
  });

  const handleChange = (field) => (event) => {
    setValues({
      ...values,
      [field]: event.target.value,
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Stack spacing={4}>
        <TextField
          label="Outlined"
          variant="outlined"
          value={values.outlined}
          onChange={handleChange('outlined')}
          helperText="Helper text"
        />
        <TextField
          label={
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              With Infotip
              <Tooltip title="This is helpful information about the field" arrow>
                <IconButton size="small" sx={{ padding: 0, marginLeft: '4px' }}>
                  <InfoOutlinedIcon sx={{ fontSize: '16px', color: 'text.secondary' }} />
                </IconButton>
              </Tooltip>
            </span>
          }
          variant="outlined"
          value={values.withInfotip}
          onChange={handleChange('withInfotip')}
          helperText="Label floats when field has content"
        />
        <TextField
          label="With Clear Button"
          variant="outlined"
          value={values.withClear}
          onChange={handleChange('withClear')}
          helperText="Type to see clear button"
          InputProps={{
            endAdornment: values.withClear && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setValues({ ...values, withClear: '' })}
                  edge="end"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Multiline"
          variant="outlined"
          multiline
          rows={3}
          value={values.multiline}
          onChange={handleChange('multiline')}
          helperText="Helper text"
        />
        <TextField
          label="Disabled"
          variant="outlined"
          disabled
          value="Disabled value"
        />
        <TextField
          label="Error"
          variant="outlined"
          error
          helperText="Error message"
        />

        <div style={{ marginTop: '2rem', borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
          <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Small Size Variant</h4>
          <TextField
            label="Small"
            variant="outlined"
            size="small"
            helperText="Helper text"
          />
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px dashed #e0e0e0' }}>
          <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600, color: '#92400e' }}>
            📋 Additional Variants (Not in Design System)
          </h4>
          <Stack spacing={4}>
            <TextField
              label="Filled"
              variant="filled"
              value={values.filled}
              onChange={handleChange('filled')}
              helperText="Helper text"
            />
            <TextField
              label="Standard"
              variant="standard"
              value={values.standard}
              onChange={handleChange('standard')}
              helperText="Helper text"
            />
          </Stack>
        </div>

        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '4px' }}>
          <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>TextField Features</h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
            • Three variants: standard (underlined), outlined (bordered), filled (background)
            <br />
            • Label that animates to the top when focused or filled
            <br />
            • Helper text for additional context or instructions
            <br />
            • Error state with red styling and error message
            <br />
            • Disabled state for read-only scenarios
            <br />
            • Multiline mode for textarea functionality
            <br />
            • Support for start/end adornments (icons, buttons)
            <br />
            • Size variants: small, medium (default)
            <br />• Full form validation support with required, pattern, etc.
          </p>
        </div>
      </Stack>
    </div>
  );
}
