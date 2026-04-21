import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Divider,
  Alert,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import { Link as RouterLink } from 'react-router-dom'
import TableContext from './components/TableContext'
import ModalContext from './components/ModalContext'
import { TABLE_ITEMS } from '../../../data/checkboxUXRData'

const STEPS = [
  { id: 'intro', type: 'intro' },
  { id: 'table-a', type: 'test', context: 'table', behavior: 'select-all', label: 'Option A' },
  { id: 'table-b', type: 'test', context: 'table', behavior: 'deselect-all', label: 'Option B' },
  { id: 'table-d', type: 'test', context: 'table', behavior: 'dropdown', label: 'Option D' },
  { id: 'modal-a', type: 'test', context: 'modal', behavior: 'select-all', label: 'Option A' },
  { id: 'modal-b', type: 'test', context: 'modal', behavior: 'deselect-all', label: 'Option B' },
  { id: 'modal-d', type: 'test', context: 'modal', behavior: 'dropdown', label: 'Option D' },
  { id: 'summary', type: 'summary' },
]

export default function CheckboxGuidedPage() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [currentAnswer, setCurrentAnswer] = useState('')

  const step = STEPS[stepIndex]
  const isFirst = stepIndex === 0
  const isLast = stepIndex === STEPS.length - 1

  const handleNext = () => {
    if (step.type === 'test' && step.behavior !== 'dropdown' && currentAnswer) {
      setResponses((prev) => ({ ...prev, [step.id]: currentAnswer }))
      setCurrentAnswer('')
    }
    if (!isLast) setStepIndex(stepIndex + 1)
  }

  const handleBack = () => {
    if (!isFirst) {
      setStepIndex(stepIndex - 1)
      setCurrentAnswer('')
    }
  }

  const getInitialSelection = () => {
    if (step.context === 'table') {
      return [TABLE_ITEMS[0].id, TABLE_ITEMS[2].id, TABLE_ITEMS[4].id]
    }
    return ['file-1-1', 'file-2-1', 'file-3-2']
  }

  // Intro step
  if (step.type === 'intro') {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ backgroundColor: 'grey.100', minHeight: 'calc(100vh - 200px)', px: 3, py: 4 }}>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                component={RouterLink}
                to="/uxr/checkbox"
                size="small"
                startIcon={<CloseIcon />}
                sx={{ color: 'text.secondary' }}
              >
                Exit
              </Button>
            </Box>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Guided Test Flow
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                  You'll see checkboxes in different states. Before clicking, tell us what you expect to happen.
                  Then we'll reveal the actual behavior.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" onClick={handleNext} endIcon={<ArrowForwardIcon />}>
                    Start
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    )
  }

  // Summary step
  if (step.type === 'summary') {
    const testSteps = STEPS.filter((s) => s.type === 'test' && s.behavior !== 'dropdown')
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ backgroundColor: 'grey.100', minHeight: 'calc(100vh - 200px)', px: 3, py: 4 }}>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Summary
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  Here are your responses:
                </Typography>

                {testSteps.map((s) => {
                  const response = responses[s.id]
                  const expected = s.behavior === 'select-all' ? 'select-all' : 'deselect-all'
                  const matched = response === expected
                  return (
                    <Box key={s.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
                        <Chip label={s.context} size="small" variant="outlined" />
                        <Chip label={s.label} size="small" />
                        {response && (
                          <Chip
                            label={matched ? 'Matched' : 'Different'}
                            size="small"
                            color={matched ? 'success' : 'warning'}
                          />
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Expected: {response === 'select-all' ? 'Select all' : response === 'deselect-all' ? 'Deselect all' : response || '—'}
                      </Typography>
                    </Box>
                  )
                })}

                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
                    Back
                  </Button>
                  <Button variant="contained" onClick={() => navigate('/uxr/checkbox')}>
                    Done
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    )
  }

  // Test step
  const isDropdown = step.behavior === 'dropdown'

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ backgroundColor: 'grey.100', minHeight: 'calc(100vh - 200px)', px: 3, py: 4 }}>
        <Box sx={{ maxWidth: 900, mx: 'auto' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Step {stepIndex} of {STEPS.length - 1}
            </Typography>
            <Button
              component={RouterLink}
              to="/uxr/checkbox"
              size="small"
              startIcon={<CloseIcon />}
              sx={{ color: 'text.secondary' }}
            >
              Exit
            </Button>
          </Box>

          <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={step.context === 'table' ? 'Table' : 'Modal'} size="small" variant="outlined" />
                <Chip label={step.label} size="small" />
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {step.context === 'table' ? 'Table Context' : 'Folder Tree Context'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                {isDropdown
                  ? 'This checkbox has a dropdown. Click it to see the available options.'
                  : 'Some items are selected. The header checkbox shows a dash (indeterminate).'}
              </Typography>

              {/* Demo */}
              {step.context === 'table' ? (
                <TableContext behavior={step.behavior} initialSelection={getInitialSelection()} />
              ) : (
                <ModalContext behavior={step.behavior} initialSelection={getInitialSelection()} />
              )}
            </CardContent>
          </Card>

          {/* Question (non-dropdown only) */}
          {!isDropdown && (
            <Card sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                  What do you expect when you click the indeterminate checkbox?
                </Typography>
                <RadioGroup value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)}>
                  <FormControlLabel value="select-all" control={<Radio size="small" />} label="All items will become selected" />
                  <FormControlLabel value="deselect-all" control={<Radio size="small" />} label="All items will become deselected" />
                </RadioGroup>
              </CardContent>
            </Card>
          )}

          {isDropdown && (
            <Alert severity="info" sx={{ mb: 3 }}>
              The dropdown provides explicit choices: Select all, Select none, Select visible, Invert selection.
            </Alert>
          )}

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleBack} startIcon={<ArrowBackIcon />}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForwardIcon />}
              disabled={!isDropdown && !currentAnswer}
            >
              {isLast ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
