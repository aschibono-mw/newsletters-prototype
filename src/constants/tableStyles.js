// Reusable table header separator style
export const headerCellSeparatorSx = {
  position: 'relative',
  fontWeight: 600,
  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '25%',
    height: '50%',
    width: '1px',
    backgroundColor: 'divider',
  },
}
