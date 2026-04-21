# UI Patterns

Common interaction and visual patterns.

---

## Button Patterns

### Primary Action

```jsx
<Button variant="contained" color="primary">
  Save Changes
</Button>
```

### Secondary Action

```jsx
<Button variant="outlined" color="primary">
  Cancel
</Button>
```

### Destructive Action

```jsx
<Button variant="contained" color="error">
  Delete
</Button>
```

### Button with Loading

```jsx
<Button
  variant="contained"
  disabled={loading}
  startIcon={loading ? <CircularProgress size={16} /> : null}
>
  {loading ? 'Saving...' : 'Save'}
</Button>
```

### Icon Button

```jsx
<IconButton
  size="small"
  sx={{ color: 'text.secondary' }}
>
  <MoreVertIcon />
</IconButton>
```

---

## Form Patterns

### Required Field

```jsx
<TextField
  required
  label="Email"
  helperText="Required field"
/>
```

### Field with Error

```jsx
<TextField
  error
  label="Email"
  helperText="Please enter a valid email"
/>
```

### Field with Character Count

```jsx
<TextField
  label="Description"
  helperText={
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>Brief description</span>
      <span>{value.length}/100</span>
    </Box>
  }
/>
```

### Field with Infotip

```jsx
<TextField
  label={
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      Label
      <Tooltip title="Help text">
        <InfoIcon sx={{ fontSize: 14 }} />
      </Tooltip>
    </Box>
  }
/>
```

---

## Selection Patterns

### Single Select (Radio)

```jsx
<FormControl>
  <FormLabel>Choose one</FormLabel>
  <RadioGroup value={value} onChange={handleChange}>
    <FormControlLabel value="a" control={<Radio />} label="Option A" />
    <FormControlLabel value="b" control={<Radio />} label="Option B" />
  </RadioGroup>
</FormControl>
```

### Multi Select (Checkbox)

```jsx
<FormControl>
  <FormLabel>Select all that apply</FormLabel>
  <FormGroup>
    <FormControlLabel control={<Checkbox />} label="Option A" />
    <FormControlLabel control={<Checkbox />} label="Option B" />
  </FormGroup>
</FormControl>
```

### Toggle Selection

```jsx
<ToggleButtonGroup
  exclusive
  value={value}
  onChange={handleChange}
>
  <ToggleButton value="left">
    <FormatAlignLeftIcon />
  </ToggleButton>
  <ToggleButton value="center">
    <FormatAlignCenterIcon />
  </ToggleButton>
</ToggleButtonGroup>
```

---

## Feedback Patterns

### Inline Alert

```jsx
<Alert severity="warning" sx={{ mb: 2 }}>
  Your session will expire in 5 minutes.
</Alert>
```

### Toast Notification

```jsx
<Snackbar
  open={open}
  autoHideDuration={4000}
  onClose={handleClose}
>
  <Alert severity="success" onClose={handleClose}>
    Changes saved successfully
  </Alert>
</Snackbar>
```

### Confirmation Dialog

```jsx
<Dialog open={open}>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    Are you sure you want to delete this item?
  </DialogContent>
  <DialogActions>
    <Button onClick={onCancel}>Cancel</Button>
    <Button variant="contained" color="error" onClick={onConfirm}>
      Delete
    </Button>
  </DialogActions>
</Dialog>
```

---

## Loading Patterns

### Full Page Loading

```jsx
<Box sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
}}>
  <CircularProgress />
</Box>
```

### Skeleton Loading

```jsx
<Stack spacing={2}>
  <Skeleton variant="rectangular" height={200} />
  <Skeleton variant="text" width="60%" />
  <Skeleton variant="text" width="40%" />
</Stack>
```

### Button Loading State

```jsx
<Button disabled>
  <CircularProgress size={16} sx={{ mr: 1 }} />
  Loading...
</Button>
```

---

## Empty State Pattern

```jsx
<Box sx={{
  textAlign: 'center',
  py: 8,
  px: 3,
}}>
  <EmptyIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
  <Typography variant="h6" gutterBottom>
    No items found
  </Typography>
  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
    Get started by creating your first item.
  </Typography>
  <Button variant="contained">Create Item</Button>
</Box>
```

---

## Navigation Patterns

### Breadcrumbs

```jsx
<Breadcrumbs>
  <Link href="/">Home</Link>
  <Link href="/products">Products</Link>
  <Typography color="text.primary">Product Name</Typography>
</Breadcrumbs>
```

### Tab Navigation

```jsx
<Tabs value={value} onChange={handleChange}>
  <Tab label="Overview" />
  <Tab label="Details" />
  <Tab label="Settings" />
</Tabs>
```

### Stepper

```jsx
<Stepper activeStep={activeStep}>
  <Step>
    <StepLabel>Step 1</StepLabel>
  </Step>
  <Step>
    <StepLabel>Step 2</StepLabel>
  </Step>
  <Step>
    <StepLabel>Step 3</StepLabel>
  </Step>
</Stepper>
```

---

## Table Patterns

### Basic Table with Actions

```jsx
<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Status</TableCell>
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map(row => (
        <TableRow key={row.id} hover>
          <TableCell>{row.name}</TableCell>
          <TableCell>
            <Chip label={row.status} size="small" />
          </TableCell>
          <TableCell align="right">
            <IconButton size="small">
              <EditIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

### Table with Pagination

```jsx
<TablePagination
  component="div"
  count={totalCount}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
```

---

## Chip Patterns

### Filter Chips

```jsx
<Stack direction="row" spacing={1}>
  <Chip label="All" variant={filter === 'all' ? 'filled' : 'outlined'} />
  <Chip label="Active" variant={filter === 'active' ? 'filled' : 'outlined'} />
  <Chip label="Archived" variant={filter === 'archived' ? 'filled' : 'outlined'} />
</Stack>
```

### Removable Tags

```jsx
<Stack direction="row" spacing={1} flexWrap="wrap">
  {tags.map(tag => (
    <Chip
      key={tag}
      label={tag}
      onDelete={() => handleDelete(tag)}
      size="small"
    />
  ))}
</Stack>
```

---

## Tooltip Patterns

### Icon with Tooltip

```jsx
<Tooltip title="More information">
  <IconButton size="small">
    <InfoIcon />
  </IconButton>
</Tooltip>
```

### Disabled Button Tooltip

```jsx
<Tooltip title="You don't have permission">
  <span>  {/* Wrapper needed for disabled elements */}
    <Button disabled>Submit</Button>
  </span>
</Tooltip>
```

---

## Avatar Patterns

### User Avatar

```jsx
<Avatar alt="Jane Doe" src="/path/to/photo.jpg" />
```

### Avatar with Badge

```jsx
<Badge
  overlap="circular"
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  badgeContent={<OnlineIcon sx={{ fontSize: 12, color: 'success.main' }} />}
>
  <Avatar alt="Jane Doe" />
</Badge>
```

### Avatar Group

```jsx
<AvatarGroup max={4}>
  <Avatar alt="User 1" />
  <Avatar alt="User 2" />
  <Avatar alt="User 3" />
  <Avatar alt="User 4" />
  <Avatar alt="User 5" />
</AvatarGroup>
```
