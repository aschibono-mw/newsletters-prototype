import { useState, useCallback } from 'react'

/**
 * Custom hook for managing table pagination state
 *
 * @param {Object} options - Configuration options
 * @param {number} options.initialPage - Initial page (default: 0)
 * @param {number} options.initialRowsPerPage - Initial rows per page (default: 10)
 * @param {number[]} options.rowsPerPageOptions - Available rows per page options
 * @returns {Object} Pagination state and handlers
 */
export function usePagination({
  initialPage = 0,
  initialRowsPerPage = 10,
  rowsPerPageOptions = [10, 25, 50, 100],
} = {}) {
  const [page, setPage] = useState(initialPage)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)

  // Handle page change
  const handlePageChange = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])

  // Handle rows per page change
  const handleRowsPerPageChange = useCallback((event) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    setRowsPerPage(newRowsPerPage)
    setPage(0) // Reset to first page when changing rows per page
  }, [])

  // Reset pagination to initial state
  const resetPagination = useCallback(() => {
    setPage(initialPage)
    setRowsPerPage(initialRowsPerPage)
  }, [initialPage, initialRowsPerPage])

  // Reset to first page (useful when filters change)
  const resetPage = useCallback(() => {
    setPage(0)
  }, [])

  // Get paginated slice of data
  const getPaginatedData = useCallback((data) => {
    const startIndex = page * rowsPerPage
    return data.slice(startIndex, startIndex + rowsPerPage)
  }, [page, rowsPerPage])

  // Calculate pagination info
  const getPaginationInfo = useCallback((totalCount) => {
    const totalPages = Math.ceil(totalCount / rowsPerPage)
    const startIndex = page * rowsPerPage
    const endIndex = Math.min(startIndex + rowsPerPage, totalCount)

    return {
      totalPages,
      startIndex,
      endIndex,
      currentPage: page + 1, // 1-indexed for display
      isFirstPage: page === 0,
      isLastPage: page >= totalPages - 1,
    }
  }, [page, rowsPerPage])

  return {
    page,
    rowsPerPage,
    rowsPerPageOptions,
    handlePageChange,
    handleRowsPerPageChange,
    resetPagination,
    resetPage,
    getPaginatedData,
    getPaginationInfo,
    setPage,
    setRowsPerPage,
  }
}

export default usePagination
