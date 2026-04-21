import { useState } from 'react'
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton, Rating, Drawer, Slider, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel, Badge, Divider, TextField, InputAdornment, ToggleButton, ToggleButtonGroup, Breadcrumbs, Link } from '@mui/material'
import Indicator from '../../components/core/Indicator'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import FilterListIcon from '@mui/icons-material/FilterListRounded'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartRounded'
import FavoriteIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderRounded'
import ViewModuleIcon from '@mui/icons-material/ViewModuleRounded'
import ViewListIcon from '@mui/icons-material/ViewListRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import AddIcon from '@mui/icons-material/AddRounded'
import RemoveIcon from '@mui/icons-material/RemoveRounded'

const products = [
  { id: 1, name: 'Wireless Headphones', price: 199.99, originalPrice: 249.99, rating: 4.5, reviews: 128, image: 'headphones', category: 'Electronics', badge: 'Sale' },
  { id: 2, name: 'Smart Watch Pro', price: 299.99, rating: 4.8, reviews: 256, image: 'watch', category: 'Electronics', badge: 'New' },
  { id: 3, name: 'Laptop Stand', price: 79.99, rating: 4.2, reviews: 89, image: 'stand', category: 'Accessories' },
  { id: 4, name: 'Mechanical Keyboard', price: 149.99, rating: 4.6, reviews: 312, image: 'keyboard', category: 'Electronics' },
  { id: 5, name: 'USB-C Hub', price: 59.99, originalPrice: 79.99, rating: 4.3, reviews: 156, image: 'hub', category: 'Accessories', badge: 'Sale' },
  { id: 6, name: 'Webcam HD', price: 89.99, rating: 4.4, reviews: 201, image: 'webcam', category: 'Electronics' },
  { id: 7, name: 'Desk Lamp', price: 45.99, rating: 4.1, reviews: 67, image: 'lamp', category: 'Home' },
  { id: 8, name: 'Monitor Arm', price: 129.99, rating: 4.7, reviews: 98, image: 'arm', category: 'Accessories', badge: 'Best Seller' },
]

const categories = ['All', 'Electronics', 'Accessories', 'Home']
const brands = ['Apple', 'Samsung', 'Sony', 'Logitech', 'Dell']

const cartItems = [
  { id: 1, name: 'Wireless Headphones', price: 199.99, quantity: 1 },
  { id: 2, name: 'Smart Watch Pro', price: 299.99, quantity: 2 },
]

function EcommerceTemplate() {
  const [, setFilterOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [favorites, setFavorites] = useState([2, 4])

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100' }}>
      {/* Header */}
      <Box sx={{ backgroundColor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', position: 'sticky', top: 0, zIndex: 1100 }}>
        <Container maxWidth="xl">
          <Box sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button component={RouterLink} to="/templates" startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>
              Back to Templates
            </Button>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>ShopName</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'grey.100', borderRadius: 1, px: 2, py: 0.5, width: 300 }}>
                <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <TextField variant="standard" placeholder="Search products..." fullWidth InputProps={{ disableUnderline: true }} />
              </Box>
              <IconButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={cartItems.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link underline="hover" color="inherit" href="#">Home</Link>
          <Link underline="hover" color="inherit" href="#">Products</Link>
          <Typography color="text.primary">All Products</Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ p: 3, display: { xs: 'none', md: 'block' } }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Filters</Typography>

              {/* Categories */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Category</Typography>
                {categories.map((cat) => (
                  <FormControlLabel
                    key={cat}
                    control={<Checkbox checked={selectedCategory === cat} onChange={() => setSelectedCategory(cat)} size="small" />}
                    label={cat}
                    sx={{ display: 'block', mb: 0.5 }}
                  />
                ))}
              </Box>

              {/* Price Range */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Price Range</Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, value) => setPriceRange(value)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={500}
                  sx={{ width: '90%', mx: 'auto', display: 'block' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">${priceRange[0]}</Typography>
                  <Typography variant="body2" color="text.secondary">${priceRange[1]}</Typography>
                </Box>
              </Box>

              {/* Brands */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Brand</Typography>
                {brands.map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={<Checkbox size="small" />}
                    label={brand}
                    sx={{ display: 'block', mb: 0.5 }}
                  />
                ))}
              </Box>

              {/* Rating */}
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Rating</Typography>
                {[4, 3, 2, 1].map((rating) => (
                  <FormControlLabel
                    key={rating}
                    control={<Checkbox size="small" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating value={rating} size="small" readOnly />
                        <Typography variant="body2">& up</Typography>
                      </Box>
                    }
                    sx={{ display: 'block', mb: 0.5 }}
                  />
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Products Grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            {/* Toolbar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {products.length} products
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button startIcon={<FilterListIcon />} onClick={() => setFilterOpen(true)} sx={{ display: { md: 'none' }, textTransform: 'none' }}>
                  Filters
                </Button>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <MenuItem value="featured">Featured</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                  </Select>
                </FormControl>
                <ToggleButtonGroup value={viewMode} exclusive onChange={(_, v) => v && setViewMode(v)} size="small">
                  <ToggleButton value="grid"><ViewModuleIcon /></ToggleButton>
                  <ToggleButton value="list"><ViewListIcon /></ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            {/* Products */}
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, lg: viewMode === 'grid' ? 4 : 12 }} key={product.id}>
                  <Card sx={{ display: viewMode === 'list' ? 'flex' : 'block', height: '100%', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}>
                    <Box sx={{ position: 'relative', width: viewMode === 'list' ? 200 : '100%' }}>
                      <CardMedia
                        sx={{
                          height: viewMode === 'list' ? '100%' : 200,
                          backgroundColor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography color="text.secondary">[{product.image}]</Typography>
                      </CardMedia>
                      {product.badge && (
                        <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                          <Indicator
                            label={product.badge}
                            size="small"
                            color={product.badge === 'Sale' ? 'orange' : product.badge === 'New' ? 'purple' : 'green'}
                          />
                        </Box>
                      )}
                      <IconButton
                        onClick={() => toggleFavorite(product.id)}
                        sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'background.paper', '&:hover': { backgroundColor: 'grey.100' } }}
                        size="small"
                      >
                        {favorites.includes(product.id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{product.category}</Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>{product.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Rating value={product.rating} precision={0.5} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary">({product.reviews})</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>${product.price}</Typography>
                        {product.originalPrice && (
                          <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                            ${product.originalPrice}
                          </Typography>
                        )}
                      </Box>
                      <Button variant="contained" fullWidth sx={{ mt: 2, textTransform: 'none' }} startIcon={<ShoppingCartIcon />}>
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 380, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Shopping Cart ({cartItems.length})</Typography>
            <IconButton onClick={() => setCartOpen(false)}><CloseIcon /></IconButton>
          </Box>

          {cartItems.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 3, pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ width: 80, height: 80, backgroundColor: 'grey.200', borderRadius: 1 }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>${item.price}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <IconButton size="small"><RemoveIcon fontSize="small" /></IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton size="small"><AddIcon fontSize="small" /></IconButton>
                </Box>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Subtotal</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>${cartTotal.toFixed(2)}</Typography>
          </Box>
          <Button variant="contained" fullWidth size="large" sx={{ textTransform: 'none', mb: 2 }}>
            Checkout
          </Button>
          <Button variant="outlined" fullWidth sx={{ textTransform: 'none' }} onClick={() => setCartOpen(false)}>
            Continue Shopping
          </Button>
        </Box>
      </Drawer>
    </Box>
  )
}

export default EcommerceTemplate
