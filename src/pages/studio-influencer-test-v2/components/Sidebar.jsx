import { useState } from 'react'
import { Box, Typography, Button, Collapse, IconButton } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

const CATEGORIES = [
  { id: 'AC1', label: 'AC1: Search Flows', description: 'Name, topic, location, multiple criteria' },
  { id: 'AC2', label: 'AC2: Channel Flows', description: 'List by channel, compare across channels' },
  { id: 'Edge', label: 'Edge Cases', description: 'Error handling, ambiguous queries, etc.' },
]

function Sidebar({ testFlows, selectedFlow, onFlowSelect }) {
  // Track which categories are expanded (all open by default)
  const [expandedCategories, setExpandedCategories] = useState({
    AC1: true,
    AC2: true,
    Edge: true,
  })

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  return (
    <Box
      sx={{
        width: 320,
        borderRight: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'grey.50',
        overflow: 'auto',
        p: 2,
      }}
    >
      {CATEGORIES.map((category) => {
        const categoryFlows = testFlows.filter((f) => f.category === category.id)
        const isExpanded = expandedCategories[category.id]

        return (
          <Box key={category.id} sx={{ mb: 2 }}>
            {/* Collapsible Category Header */}
            <Box
              onClick={() => toggleCategory(category.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                py: 0.5,
                px: 0.5,
                mx: -0.5,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'grey.200',
                },
              }}
            >
              <IconButton
                size="small"
                sx={{
                  p: 0.25,
                  color: 'text.secondary',
                }}
              >
                {isExpanded ? (
                  <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
                ) : (
                  <KeyboardArrowRightIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 600,
                    color: 'text.secondary',
                    display: 'block',
                    lineHeight: 1.4,
                  }}
                >
                  {category.label}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.disabled',
                  fontWeight: 500,
                }}
              >
                {categoryFlows.length}
              </Typography>
            </Box>

            {/* Category Description (always visible) */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                mb: 1,
                pl: 3.5,
              }}
            >
              {category.description}
            </Typography>

            {/* Collapsible Flow List */}
            <Collapse in={isExpanded}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, pl: 2 }}>
                {categoryFlows.map((flow) => (
                  <Button
                    key={flow.id}
                    variant={selectedFlow?.id === flow.id ? 'contained' : 'text'}
                    size="small"
                    onClick={() => onFlowSelect(flow)}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontWeight: selectedFlow?.id === flow.id ? 600 : 400,
                      color: selectedFlow?.id === flow.id ? undefined : 'text.primary',
                      pl: 1.5,
                      textAlign: 'left',
                    }}
                  >
                    {flow.title}
                  </Button>
                ))}
              </Box>
            </Collapse>
          </Box>
        )
      })}
    </Box>
  )
}

export default Sidebar
