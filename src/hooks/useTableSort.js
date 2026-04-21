import { useState, useCallback } from 'react'

/**
 * Custom hook for managing table sort state
 *
 * @param {string} initialField - Initial sort field
 * @param {string} initialDirection - Initial sort direction ('asc' or 'desc')
 * @returns {Object} Sort state and handlers
 */
export function useTableSort(initialField = 'name', initialDirection = 'asc') {
  const [sortBy, setSortBy] = useState(initialField)
  const [sortDirection, setSortDirection] = useState(initialDirection)
  const [isSorting, setIsSorting] = useState(false)

  // Handle sort change - toggles direction if same field, otherwise sets new field with asc
  const handleSort = useCallback((field) => {
    setIsSorting(true)
    if (sortBy === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(field)
      setSortDirection('asc')
    }
    // Simulate sort processing time for UI feedback
    setTimeout(() => setIsSorting(false), 400)
  }, [sortBy])

  // Reset sort to defaults
  const resetSort = useCallback(() => {
    setSortBy(initialField)
    setSortDirection(initialDirection)
  }, [initialField, initialDirection])

  // Generic sort comparator function
  const getSortComparator = useCallback(() => {
    return (a, b) => {
      let comparison = 0
      const aVal = a[sortBy]
      const bVal = b[sortBy]

      if (Array.isArray(aVal) && Array.isArray(bVal)) {
        comparison = aVal.length - bVal.length
      } else if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = (aVal || '').localeCompare(bVal || '')
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal
      } else {
        comparison = String(aVal || '').localeCompare(String(bVal || ''))
      }

      return sortDirection === 'asc' ? comparison : -comparison
    }
  }, [sortBy, sortDirection])

  return {
    sortBy,
    sortDirection,
    isSorting,
    handleSort,
    resetSort,
    getSortComparator,
    setSortBy,
    setSortDirection,
  }
}

export default useTableSort
