import { useState } from 'react'
import { Box, Container, Typography, Button, TextField, Card, CardContent, Checkbox, FormControlLabel, Divider, IconButton, InputAdornment, LinearProgress, Link, Alert } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import VisibilityIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffRounded'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded'
import EmailIcon from '@mui/icons-material/EmailRounded'

function AuthTemplate() {
  const [currentView, setCurrentView] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  const getPasswordStrength = (pass) => {
    let strength = 0
    if (pass.length >= 8) strength += 25
    if (/[A-Z]/.test(pass)) strength += 25
    if (/[0-9]/.test(pass)) strength += 25
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  const strengthColor = passwordStrength <= 25 ? 'error' : passwordStrength <= 50 ? 'warning' : passwordStrength <= 75 ? 'info' : 'success'
  const strengthLabel = passwordStrength <= 25 ? 'Weak' : passwordStrength <= 50 ? 'Fair' : passwordStrength <= 75 ? 'Good' : 'Strong'

  const LoginForm = () => (
    <Card sx={{ maxWidth: 420, width: '100%', p: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ width: 48, height: 48, borderRadius: 2, backgroundColor: 'primary.main', mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>P</Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to continue to your account
        </Typography>
      </Box>

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Email address"
          type="email"
          fullWidth
          variant="outlined"
          placeholder="you@example.com"
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          placeholder="Enter your password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label={<Typography variant="body2">Remember me</Typography>}
          />
          <Link
            component="button"
            variant="body2"
            onClick={() => setCurrentView('forgot')}
            sx={{ textDecoration: 'none' }}
          >
            Forgot password?
          </Link>
        </Box>

        <Button variant="contained" size="large" fullWidth sx={{ textTransform: 'none', py: 1.5, fontWeight: 600 }}>
          Sign In
        </Button>

        <Divider sx={{ my: 1 }}>
          <Typography variant="body2" color="text.secondary">or continue with</Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{ textTransform: 'none', py: 1.25 }}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GitHubIcon />}
            sx={{ textTransform: 'none', py: 1.25 }}
          >
            GitHub
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link component="button" onClick={() => setCurrentView('signup')} sx={{ textDecoration: 'none', fontWeight: 600 }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Card>
  )

  const SignupForm = () => (
    <Card sx={{ maxWidth: 420, width: '100%', p: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ width: 48, height: 48, borderRadius: 2, backgroundColor: 'primary.main', mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>P</Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Create an account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Get started with your free account
        </Typography>
      </Box>

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="First name" fullWidth variant="outlined" />
          <TextField label="Last name" fullWidth variant="outlined" />
        </Box>
        <TextField
          label="Email address"
          type="email"
          fullWidth
          variant="outlined"
          placeholder="you@example.com"
        />
        <Box>
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {password && (
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Password strength</Typography>
                <Typography variant="caption" color={`${strengthColor}.main`}>{strengthLabel}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={passwordStrength} color={strengthColor} sx={{ height: 4, borderRadius: 2 }} />
            </Box>
          )}
        </Box>
        <TextField
          label="Confirm password"
          type="password"
          fullWidth
          variant="outlined"
          placeholder="Confirm your password"
        />

        <FormControlLabel
          control={<Checkbox size="small" />}
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Link sx={{ textDecoration: 'none' }}>Terms of Service</Link>
              {' '}and{' '}
              <Link sx={{ textDecoration: 'none' }}>Privacy Policy</Link>
            </Typography>
          }
        />

        <Button variant="contained" size="large" fullWidth sx={{ textTransform: 'none', py: 1.5, fontWeight: 600 }}>
          Create Account
        </Button>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link component="button" onClick={() => setCurrentView('login')} sx={{ textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Card>
  )

  const ForgotPasswordForm = () => (
    <Card sx={{ maxWidth: 420, width: '100%', p: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box sx={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'primary.light', mx: 'auto', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EmailIcon sx={{ color: 'primary.main' }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Forgot your password?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter your email and we'll send you a reset link
        </Typography>
      </Box>

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Email address"
          type="email"
          fullWidth
          variant="outlined"
          placeholder="you@example.com"
        />

        <Button variant="contained" size="large" fullWidth sx={{ textTransform: 'none', py: 1.5, fontWeight: 600 }}>
          Send Reset Link
        </Button>

        <Button
          variant="text"
          onClick={() => setCurrentView('login')}
          sx={{ textTransform: 'none' }}
        >
          Back to Sign In
        </Button>
      </Box>
    </Card>
  )

  const ResetSentForm = () => (
    <Card sx={{ maxWidth: 420, width: '100%', p: 4, textAlign: 'center' }}>
      <Box sx={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'success.light', mx: 'auto', mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircleIcon sx={{ color: 'success.main', fontSize: 32 }} />
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Check your email
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        We've sent a password reset link to your email address. Please check your inbox.
      </Typography>
      <Button variant="outlined" fullWidth sx={{ textTransform: 'none', mb: 2 }}>
        Open Email App
      </Button>
      <Typography variant="body2" color="text.secondary">
        Didn't receive the email?{' '}
        <Link component="button" sx={{ textDecoration: 'none', fontWeight: 600 }}>
          Click to resend
        </Link>
      </Typography>
    </Card>
  )

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Back Navigation */}
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        <Button
          component={RouterLink}
          to="/templates"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2, textTransform: 'none', color: 'white' }}
        >
          Back to Templates
        </Button>
      </Container>

      {/* Form Tabs */}
      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {['login', 'signup', 'forgot'].map((view) => (
            <Button
              key={view}
              onClick={() => setCurrentView(view)}
              sx={{
                textTransform: 'capitalize',
                color: currentView === view ? 'white' : 'rgba(255,255,255,0.7)',
                borderBottom: currentView === view ? '2px solid white' : '2px solid transparent',
                borderRadius: 0,
                px: 2,
                pb: 1,
              }}
            >
              {view === 'forgot' ? 'Forgot Password' : view}
            </Button>
          ))}
        </Box>
      </Container>

      {/* Form Container */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        {currentView === 'login' && <LoginForm />}
        {currentView === 'signup' && <SignupForm />}
        {currentView === 'forgot' && <ForgotPasswordForm />}
        {currentView === 'reset-sent' && <ResetSentForm />}
      </Box>
    </Box>
  )
}

export default AuthTemplate
