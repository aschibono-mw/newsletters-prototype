import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Stack, FormHelperText, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function SelectBaseline() {
  const [values, setValues] = React.useState({
    outlined: 'option1',
    withInfotip: 'option2',
    withHelper: '',
    disabled: 'option1',
    error: '',
    small: '',
    filled: '',
    standard: '',
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
        <FormControl fullWidth>
          <InputLabel id="outlined-select-label">Outlined</InputLabel>
          <Select
            labelId="outlined-select-label"
            value={values.outlined}
            label="Outlined"
            onChange={handleChange('outlined')}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
          <FormHelperText>Helper text</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="infotip-select-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              With Infotip
              <Tooltip title="This is helpful information about the field" arrow>
                <IconButton size="small" sx={{ padding: 0, marginLeft: '4px' }}>
                  <InfoOutlinedIcon sx={{ fontSize: '16px', color: 'text.secondary' }} />
                </IconButton>
              </Tooltip>
            </span>
          </InputLabel>
          <Select
            labelId="infotip-select-label"
            value={values.withInfotip}
            label="With Infotip"
            onChange={handleChange('withInfotip')}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
          <FormHelperText>Label floats when field has selection</FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="helper-select-label">With Helper Text</InputLabel>
          <Select
            labelId="helper-select-label"
            value={values.withHelper}
            label="With Helper Text"
            onChange={handleChange('withHelper')}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
          <FormHelperText>Select an option from the list</FormHelperText>
        </FormControl>

        <FormControl fullWidth disabled>
          <InputLabel id="disabled-select-label">Disabled</InputLabel>
          <Select
            labelId="disabled-select-label"
            value={values.disabled}
            label="Disabled"
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
          <FormHelperText>Helper text</FormHelperText>
        </FormControl>

        <FormControl fullWidth error>
          <InputLabel id="error-select-label">Error</InputLabel>
          <Select
            labelId="error-select-label"
            value={values.error}
            label="Error"
            onChange={handleChange('error')}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
          <FormHelperText>Error message</FormHelperText>
        </FormControl>

        <div style={{ marginTop: '2rem', borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
          <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>Small Size Variant</h4>
          <FormControl fullWidth size="small">
            <InputLabel id="small-select-label">Small</InputLabel>
            <Select
              labelId="small-select-label"
              value={values.small}
              label="Small"
              onChange={handleChange('small')}
            >
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
            <FormHelperText>Helper text</FormHelperText>
          </FormControl>
        </div>

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px dashed #e0e0e0' }}>
          <h4 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600, color: '#92400e' }}>
            📋 Additional Variants (Not in Design System)
          </h4>
          <Stack spacing={4}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="filled-select-label">Filled</InputLabel>
              <Select
                labelId="filled-select-label"
                value={values.filled}
                label="Filled"
                onChange={handleChange('filled')}
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>

            <FormControl fullWidth variant="standard">
              <InputLabel id="standard-select-label">Standard</InputLabel>
              <Select
                labelId="standard-select-label"
                value={values.standard}
                label="Standard"
                onChange={handleChange('standard')}
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Stack>
        </div>

        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '4px' }}>
          <h4 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Select Features</h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: '1.6' }}>
            • Three variants: outlined (default), filled, standard
            <br />
            • Single or multiple selection modes
            <br />
            • MenuItem component for dropdown options
            <br />
            • FormControl wrapper for proper label association
            <br />
            • Disabled and error states
            <br />
            • Helper text for additional context
            <br />
            • Size variants: small, medium (default)
            <br />
            • Custom render values (chips, tags, etc.)
            <br />
            • Support for option groups with ListSubheader
            <br />• Keyboard navigation and search within options
          </p>
        </div>
      </Stack>
    </div>
  );
}
