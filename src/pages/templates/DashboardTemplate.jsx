import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Container, Typography, Button, Grid, Card, CardContent, Avatar, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Menu, MenuItem, Badge, InputBase, Tooltip } from '@mui/material'
import Indicator from '../../components/core/Indicator'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import DashboardIcon from '@mui/icons-material/DashboardRounded'
import PeopleIcon from '@mui/icons-material/PeopleRounded'
import BarChartIcon from '@mui/icons-material/BarChartRounded'
import SettingsIcon from '@mui/icons-material/SettingsRounded'
import NotificationsIcon from '@mui/icons-material/NotificationsRounded'
import SearchIcon from '@mui/icons-material/SearchRounded'
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded'
import TrendingDownIcon from '@mui/icons-material/TrendingDownRounded'
import MoreVertIcon from '@mui/icons-material/MoreVertRounded'
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyRounded'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import PersonAddIcon from '@mui/icons-material/PersonAddRounded'
import MenuIcon from '@mui/icons-material/MenuRounded'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded'
import LogoutIcon from '@mui/icons-material/LogoutRounded'
import HelpIcon from '@mui/icons-material/HelpRounded'

const navItems = [
  { icon: <DashboardIcon />, label: 'Dashboard', active: true },
  { icon: <BarChartIcon />, label: 'Analytics' },
  { icon: <PeopleIcon />, label: 'Users' },
  { icon: <ShoppingCartIcon />, label: 'Orders' },
  { icon: <SettingsIcon />, label: 'Settings' },
]

const statCards = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', positive: true, icon: <AttachMoneyIcon /> },
  { title: 'Active Users', value: '2,350', change: '+180', positive: true, icon: <PeopleIcon /> },
  { title: 'New Orders', value: '12,234', change: '-3.2%', positive: false, icon: <ShoppingCartIcon /> },
  { title: 'Page Views', value: '573,491', change: '+15.3%', positive: true, icon: <VisibilityIcon /> },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Smith', email: 'john@email.com', amount: '$250.00', status: 'Completed' },
  { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@email.com', amount: '$150.00', status: 'Pending' },
  { id: 'ORD-003', customer: 'Mike Brown', email: 'mike@email.com', amount: '$320.00', status: 'Processing' },
  { id: 'ORD-004', customer: 'Emily Davis', email: 'emily@email.com', amount: '$95.00', status: 'Completed' },
  { id: 'ORD-005', customer: 'Alex Wilson', email: 'alex@email.com', amount: '$180.00', status: 'Cancelled' },
]


const activities = [
  { user: 'John Smith', action: 'placed a new order', time: '2 minutes ago' },
  { user: 'Sarah Johnson', action: 'updated profile settings', time: '15 minutes ago' },
  { user: 'Mike Brown', action: 'submitted a support ticket', time: '1 hour ago' },
  { user: 'Emily Davis', action: 'cancelled an order', time: '3 hours ago' },
]

function DashboardTemplate() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'grey.100' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarOpen ? 240 : 72,
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
          zIndex: 1200,
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ width: 40, height: 40, borderRadius: 1, backgroundColor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <DashboardIcon />
          </Box>
          {sidebarOpen && (
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Dashboard
            </Typography>
          )}
        </Box>

        {/* Navigation */}
        <List sx={{ flex: 1, py: 2 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{
                mx: 1,
                borderRadius: 1,
                mb: 0.5,
                backgroundColor: item.active ? 'primary.light' : 'transparent',
                color: item.active ? 'primary.dark' : 'text.primary',
                '&:hover': {
                  backgroundColor: item.active ? 'primary.light' : 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: item.active ? 'primary.main' : 'text.secondary', minWidth: sidebarOpen ? 40 : 'auto' }}>
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
        </List>

        {/* User Section */}
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 36, height: 36 }}>JD</Avatar>
            {sidebarOpen && (
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>John Doe</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Admin</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Collapse Button */}
        <IconButton
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{
            position: 'absolute',
            right: -12,
            top: 72,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            color: 'text.secondary',
            width: 24,
            height: 24,
            '&:hover': { backgroundColor: 'grey.100' },
          }}
        >
          <ChevronLeftIcon sx={{ transform: sidebarOpen ? 'none' : 'rotate(180deg)', fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, ml: sidebarOpen ? '240px' : '72px', transition: 'margin-left 0.3s ease' }}>
        {/* Top Bar */}
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            px: 3,
            py: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1100,
          }}
        >
          <Button
            component={RouterLink}
            to="/templates"
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: 'none' }}
          >
            Back to Templates
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'grey.100', borderRadius: 1, px: 2, py: 0.5 }}>
              <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
              <InputBase placeholder="Search..." sx={{ fontSize: 14 }} />
            </Box>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Help">
              <IconButton>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Page Content */}
        <Box sx={{ p: 3 }}>
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Dashboard Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back! Here's what's happening with your business today.
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statCards.map((stat) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.title}>
                <Card sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 1, borderRadius: 1, backgroundColor: stat.positive ? 'success.light' : 'error.light' }}>
                      {stat.icon}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {stat.positive ? (
                      <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
                    )}
                    <Typography variant="body2" sx={{ color: stat.positive ? 'success.main' : 'error.main', fontWeight: 600 }}>
                      {stat.change}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      from last month
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {/* Chart Area */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card sx={{ p: 3, mb: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Revenue Overview</Typography>
                  <Button size="small" sx={{ textTransform: 'none' }}>View Report</Button>
                </Box>
                <Box sx={{ height: 280, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                  {[65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50, 88].map((height, i) => (
                    <Box
                      key={i}
                      sx={{
                        flex: 1,
                        height: `${height}%`,
                        backgroundColor: 'primary.main',
                        borderRadius: '4px 4px 0 0',
                        opacity: 0.8,
                        transition: 'opacity 0.2s',
                        '&:hover': { opacity: 1 },
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                    <Typography key={month} variant="caption" color="text.secondary">{month}</Typography>
                  ))}
                </Box>
              </Card>

              {/* Recent Orders Table */}
              <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Recent Orders</Typography>
                  <Button size="small" sx={{ textTransform: 'none' }}>View All</Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id} hover>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                                {order.customer.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>{order.customer}</Typography>
                                <Typography variant="caption" color="text.secondary">{order.email}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <Indicator label={order.status} status={order.status} />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>

            {/* Activity Feed */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Card sx={{ p: 3, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Recent Activity</Typography>
                <List disablePadding>
                  {activities.map((activity, i) => (
                    <ListItem key={i} disablePadding sx={{ mb: 2 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem', backgroundColor: 'primary.light' }}>
                          {activity.user.charAt(0)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            <strong>{activity.user}</strong> {activity.action}
                          </Typography>
                        }
                        secondary={activity.time}
                      />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardTemplate
