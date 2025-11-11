import { useState, useCallback } from 'react';

export const useColumnVisibility = (initialColumns) => {
  const [visibleColumns, setVisibleColumns] = useState(initialColumns);

  const updateVisibleColumns = useCallback((updatedLabels) => {
    setVisibleColumns(visibleColumns.map(col => ({
      ...col,
      visible: updatedLabels.includes(col.label)
    })));
  }, [visibleColumns]);

  const isVisible = useCallback((colLabel) => {
    return visibleColumns.some(col => col.label === colLabel && col.visible);
  }, [visibleColumns]);

  return {
    visibleColumns,
    updateVisibleColumns,
    isVisible,
  };
};
