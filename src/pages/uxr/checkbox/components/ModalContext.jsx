import { useState, useEffect } from 'react'
import TreeList from '../../../../components/core/TreeList'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import { FOLDER_TREE } from '../../../../data/checkboxUXRData'

export default function ModalContext({
  behavior = 'select-all',
  initialSelection,
  onSelectionChange,
}) {
  const [selectedIds, setSelectedIds] = useState(
    initialSelection || ['file-1-1', 'file-2-1', 'file-3-2']
  )

  useEffect(() => {
    if (initialSelection) {
      setSelectedIds(initialSelection)
    }
  }, [initialSelection])

  useEffect(() => {
    onSelectionChange?.(selectedIds)
  }, [selectedIds, onSelectionChange])

  const handleSelectionChange = (newSelection) => {
    setSelectedIds(newSelection)
  }

  // Custom folder checkbox that uses our IndeterminateCheckbox with behavior variants
  const renderFolderCheckbox = ({ checked, indeterminate, onSelectAll, onDeselectAll }) => (
    <IndeterminateCheckbox
      behavior={behavior}
      checked={checked}
      indeterminate={indeterminate}
      onSelectAll={onSelectAll}
      onDeselectAll={onDeselectAll}
      onSelectVisible={onSelectAll}
      onInvert={() => {
        // For invert, we'd need access to all descendants - simplified here
        if (checked || indeterminate) {
          onDeselectAll()
        } else {
          onSelectAll()
        }
      }}
    />
  )

  return (
    <TreeList
      data={FOLDER_TREE}
      selected={selectedIds}
      onSelectionChange={handleSelectionChange}
      defaultExpanded={['root', 'folder-1', 'folder-2', 'folder-3', 'folder-2-1']}
      renderFolderCheckbox={renderFolderCheckbox}
      disablePaper
      maxHeight={360}
    />
  )
}
