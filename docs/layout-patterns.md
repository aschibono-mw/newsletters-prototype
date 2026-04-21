# Preferred Layout Patterns

Standard layout structures and patterns.

---

## Page Layout

### Standard Page Structure

```jsx
<Box sx={{
  display: 'flex',
  minHeight: '100vh',
}}>
  <Sidebar />  {/* Fixed width: 240px */}

  <Box sx={{
    flexGrow: 1,
    p: 3,        /* 24px padding */
    mt: 4,       /* 32px top margin below toolbar */
  }}>
    <Container maxWidth="lg">
      {/* Page content */}
    </Container>
  </Box>
</Box>
```

---

## Comparison Layout (Two-Column)

```jsx
<Box sx={{
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 3,  /* 24px gap */
}}>
  {/* Left column: MUI Baseline */}
  <Paper sx={{
    p: 3,
    backgroundColor: '#ffffff',  /* White background */
  }}>
    <Typography variant="h6">MUI Baseline</Typography>
    {/* Component variants */}
  </Paper>

  {/* Right column: Themed */}
  <Paper sx={{
    p: 3,
    backgroundColor: '#ffffff',
  }}>
    <Typography variant="h6">Themed</Typography>
    {/* Themed component variants */}
  </Paper>
</Box>
```

---

## Stack Patterns

### Vertical Stack (Forms)

```jsx
<Stack spacing={4}>  {/* 32px between elements */}
  <TextField label="Name" />
  <TextField label="Email" />
  <Button>Submit</Button>
</Stack>
```

### Horizontal Stack (Button Groups)

```jsx
<Stack direction="row" spacing={2}>  {/* 16px between */}
  <Button variant="outlined">Cancel</Button>
  <Button variant="contained">Save</Button>
</Stack>
```

### Inline Stack (Labels with Icons)

```jsx
<Stack direction="row" spacing={1} alignItems="center">
  <Icon />
  <Typography>Label text</Typography>
</Stack>
```

---

## Grid Patterns

### 12-Column Grid

```jsx
<Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 6 }}>
    {/* Half width on desktop, full on mobile */}
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    {/* Half width on desktop, full on mobile */}
  </Grid>
</Grid>
```

### Card Grid

```jsx
<Grid container spacing={3}>
  {items.map(item => (
    <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
      <Card>{/* Card content */}</Card>
    </Grid>
  ))}
</Grid>
```

---

## Section Headers

### Page Title

```jsx
<Box sx={{ mb: 4 }}>
  <Typography variant="h5" sx={{ fontWeight: 600 }}>
    Page Title
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Page description text
  </Typography>
</Box>
```

### Section Title

```jsx
<Typography
  variant="subtitle1"
  sx={{
    fontWeight: 600,
    mb: 2,
    mt: 4,  /* Space above section */
  }}
>
  Section Title
</Typography>
```

### Subsection Title

```jsx
<Typography
  variant="subtitle2"
  sx={{
    fontWeight: 600,
    mb: 1,
    color: 'text.secondary',
  }}
>
  Subsection Title
</Typography>
```

---

## Card Layouts

### Media Card

```jsx
<Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    height="140"
    image="/path/to/image.jpg"
  />
  <CardContent>
    <Typography variant="h6">Title</Typography>
    <Typography variant="body2" color="text.secondary">
      Description text
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Action</Button>
  </CardActions>
</Card>
```

### Promo Card

```jsx
<Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
  <Avatar sx={{ mr: 2 }}>
    <Icon />
  </Avatar>
  <Box sx={{ flexGrow: 1 }}>
    <Typography variant="subtitle1">Title</Typography>
    <Typography variant="body2" color="text.secondary">
      Description
    </Typography>
  </Box>
  <Button>Action</Button>
</Card>
```

---

## Modal/Dialog Layout

```jsx
<Dialog maxWidth="sm" fullWidth>
  <DialogTitle>
    Modal Title
    <IconButton
      onClick={onClose}
      sx={{ position: 'absolute', right: 8, top: 8 }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent dividers>
    {/* Content */}
  </DialogContent>

  <DialogActions sx={{ px: 3, py: 2 }}>
    <Button onClick={onClose}>Cancel</Button>
    <Button variant="contained">Confirm</Button>
  </DialogActions>
</Dialog>
```

---

## Form Layout

### Single Column Form

```jsx
<Box component="form" sx={{ maxWidth: 400 }}>
  <Stack spacing={3}>
    <TextField fullWidth label="Field 1" />
    <TextField fullWidth label="Field 2" />
    <Select fullWidth label="Field 3" />

    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Button>Cancel</Button>
      <Button variant="contained">Submit</Button>
    </Stack>
  </Stack>
</Box>
```

### Two Column Form

```jsx
<Box component="form">
  <Grid container spacing={3}>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField fullWidth label="First Name" />
    </Grid>
    <Grid size={{ xs: 12, sm: 6 }}>
      <TextField fullWidth label="Last Name" />
    </Grid>
    <Grid size={12}>
      <TextField fullWidth label="Email" />
    </Grid>
  </Grid>
</Box>
```

---

## Responsive Patterns

### Hide/Show by Breakpoint

```jsx
<Box sx={{
  display: { xs: 'none', md: 'block' }  // Hide on mobile
}}>
  Desktop content
</Box>

<Box sx={{
  display: { xs: 'block', md: 'none' }  // Show only on mobile
}}>
  Mobile content
</Box>
```

### Responsive Padding

```jsx
<Box sx={{
  p: { xs: 2, sm: 3, md: 4 }  // Increase padding at larger screens
}}>
```

### Responsive Typography

```jsx
<Typography sx={{
  fontSize: { xs: '1rem', md: '1.25rem' }
}}>
```
