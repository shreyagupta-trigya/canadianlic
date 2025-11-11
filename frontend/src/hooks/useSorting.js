import { useState, useCallback } from 'react';

export const useSorting = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSort = useCallback((header) => {
    if (sortColumn === header) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(header);
      setSortOrder('asc');
    }
  }, [sortColumn, sortOrder]);

  return {
    sortColumn,
    sortOrder,
    toggleSort,
  };
};
