import { useState, useCallback } from 'react'

/**
 * Custom hook for managing table filter state
 * Handles filter anchors, selections, toggle/clear functionality
 *
 * @param {Object} initialFilters - Object with filter keys and empty arrays as initial values
 * @returns {Object} Filter state and handlers
 */
export function useTableFilters(initialFilters = {}) {
  // Filter selections state - e.g. { seatType: ['platform', 'view-only'], role: ['admin'] }
  const [filters, setFilters] = useState(() => {
    const initial = {}
    Object.keys(initialFilters).forEach((key) => {
      initial[key] = initialFilters[key] || []
    })
    return initial
  })

  // Menu anchor elements for each filter - e.g. { seatType: HTMLElement, role: null }
  const [anchors, setAnchors] = useState(() => {
    const initial = {}
    Object.keys(initialFilters).forEach((key) => {
      initial[key] = null
    })
    return initial
  })

  // Open filter menu
  const openFilter = useCallback((filterKey, anchorEl) => {
    setAnchors((prev) => ({ ...prev, [filterKey]: anchorEl }))
  }, [])

  // Close filter menu
  const closeFilter = useCallback((filterKey) => {
    setAnchors((prev) => ({ ...prev, [filterKey]: null }))
  }, [])

  // Toggle a filter value
  const toggleFilter = useCallback((filterKey, value) => {
    setFilters((prev) => {
      const current = prev[filterKey] || []
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [filterKey]: updated }
    })
  }, [])

  // Clear all values for a specific filter
  const clearFilter = useCallback((filterKey) => {
    setFilters((prev) => ({ ...prev, [filterKey]: [] }))
  }, [])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters((prev) => {
      const cleared = {}
      Object.keys(prev).forEach((key) => {
        cleared[key] = []
      })
      return cleared
    })
  }, [])

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0)

  // Get total count of active filter values
  const activeFilterCount = Object.values(filters).reduce(
    (sum, arr) => sum + arr.length,
    0
  )

  return {
    filters,
    anchors,
    openFilter,
    closeFilter,
    toggleFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
    setFilters,
  }
}

export default useTableFilters
