import {
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
  Button,
  Avatar,
} from '@mui/material'
import { CoreDetailPageLayout, CoreVariantSection, CorePropsTable } from '../components/core'
import AccessibilitySection from '../components/docs/AccessibilitySection'
import FeaturesSection from '../components/docs/FeaturesSection'

function StackDetailPage() {
  return (
    <CoreDetailPageLayout
      title="Stack"
      description="A flex container shorthand for vertical or horizontal layouts with consistent spacing."
    >
      <CoreVariantSection title="Basic Stack">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Stack is a flexbox wrapper with spacing shorthand.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Column (Default Direction)
            </Typography>
            <Stack spacing={2} sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1, maxWidth: 300 }}>
              <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                Item 1
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                Item 2
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                Item 3
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Row Direction
            </Typography>
            <Stack direction="row" spacing={2} sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
              <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                Item 1
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                Item 2
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                Item 3
              </Box>
            </Stack>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Spacing">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Spacing prop controls gap between items (1 unit = 8px).
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              spacing=1 (8px)
            </Typography>
            <Stack direction="row" spacing={1}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                  {item}
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              spacing=2 (16px)
            </Typography>
            <Stack direction="row" spacing={2}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                  {item}
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              spacing=4 (32px)
            </Typography>
            <Stack direction="row" spacing={4}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ p: 2, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                  {item}
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Responsive Direction">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Direction can change at different breakpoints.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Column on Mobile, Row on Desktop
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}
            >
              <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 1 }}>
                First
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 1 }}>
                Second
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 1 }}>
                Third
              </Box>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Resize viewport to see direction change
            </Typography>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Dividers">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Stack can insert dividers between items.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Vertical Dividers (Row)
            </Typography>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}
            >
              <Typography>Item 1</Typography>
              <Typography>Item 2</Typography>
              <Typography>Item 3</Typography>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Horizontal Dividers (Column)
            </Typography>
            <Stack
              divider={<Divider flexItem />}
              spacing={2}
              sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1, maxWidth: 200 }}
            >
              <Typography>Item 1</Typography>
              <Typography>Item 2</Typography>
              <Typography>Item 3</Typography>
            </Stack>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Alignment">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Control alignment using alignItems and justifyContent.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              alignItems="center" (Cross Axis)
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1, minHeight: 100 }}
            >
              <Box sx={{ p: 1, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                Small
              </Box>
              <Box sx={{ p: 3, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                Large
              </Box>
              <Box sx={{ p: 1.5, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                Medium
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              justifyContent="space-between"
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}
            >
              <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 1 }}>
                Left
              </Box>
              <Box sx={{ p: 2, backgroundColor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 1 }}>
                Right
              </Box>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              justifyContent="flex-end"
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}
            >
              <Button variant="text">Cancel</Button>
              <Button variant="contained">Save</Button>
            </Stack>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Common Patterns">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Typical Stack usage patterns.
        </Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Button Row
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Primary</Button>
              <Button variant="outlined">Secondary</Button>
              <Button variant="text">Cancel</Button>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Chip Group
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="React" />
              <Chip label="JavaScript" />
              <Chip label="TypeScript" />
              <Chip label="Node.js" />
              <Chip label="MUI" />
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Avatar Group (Reversed)
            </Typography>
            <Stack direction="row-reverse" spacing={-1}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
              <Avatar sx={{ bgcolor: 'error.main' }}>C</Avatar>
              <Avatar sx={{ bgcolor: 'warning.main' }}>D</Avatar>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Negative spacing creates overlap
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Form Layout
            </Typography>
            <Stack spacing={2} sx={{ maxWidth: 400 }}>
              <Box sx={{ height: 40, backgroundColor: 'grey.200', borderRadius: 1 }} />
              <Box sx={{ height: 40, backgroundColor: 'grey.200', borderRadius: 1 }} />
              <Box sx={{ height: 40, backgroundColor: 'grey.200', borderRadius: 1 }} />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button variant="text">Reset</Button>
                <Button variant="contained">Submit</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CoreVariantSection>

      <CoreVariantSection title="Flex Wrap">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Items can wrap to multiple lines with useFlexGap.
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Wrapping Items
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              useFlexGap
              flexWrap="wrap"
              sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1, maxWidth: 300 }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Box key={item} sx={{ px: 2, py: 1, backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1 }}>
                  Item {item}
                </Box>
              ))}
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              useFlexGap ensures consistent spacing when wrapping
            </Typography>
          </Box>
        </Stack>
      </CoreVariantSection>

      <FeaturesSection
        features={[
          { feature: "Flexbox Shorthand", description: "Simplified flexbox container with direction and spacing props" },
          { feature: "Direction", description: "column (default), row, column-reverse, row-reverse; responsive via breakpoint object" },
          { feature: "Spacing", description: "Consistent gap between children (1 = 8px); supports negative values for overlap" },
          { feature: "Dividers", description: "divider prop inserts components between each child (e.g., Divider)" },
          { feature: "Flex Wrap", description: "useFlexGap + flexWrap='wrap' for proper spacing when items wrap" },
        ]}
      />

      <CorePropsTable
        props={[
          { name: 'direction', type: '"row" | "column" | "row-reverse" | "column-reverse" | object', description: 'Flex direction. Default: "column"' },
          { name: 'spacing', type: 'number | object', description: 'Gap between children (1 = 8px)' },
          { name: 'divider', type: 'ReactNode', description: 'Element to insert between children' },
          { name: 'alignItems', type: 'string', description: 'Flex align-items value' },
          { name: 'justifyContent', type: 'string', description: 'Flex justify-content value' },
          { name: 'useFlexGap', type: 'boolean', description: 'If true, uses CSS gap for spacing' },
          { name: 'sx', type: 'object', description: 'Additional MUI sx styles' },
        ]}
      />

      <AccessibilitySection
        wcag={[
          { id: "1.3.2", name: "Meaningful Sequence", level: "A", note: "Visual order matches DOM order; avoid row-reverse for important sequences" },
          { id: "1.4.10", name: "Reflow", level: "AA", note: "Responsive direction changes support content reflow" },
        ]}
      />
    </CoreDetailPageLayout>
  )
}

export default StackDetailPage
