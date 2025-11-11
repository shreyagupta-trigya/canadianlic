import { useState, useMemo, useCallback } from 'react';

export const usePagination = (totalItems, itemsPerPage = 30) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

  const totalPages = Math.ceil(totalItems / itemsPerPageState);

  const visiblePages = useMemo(() => {
    const pages = [];
    const total = totalPages;
    const current = currentPage;

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, "...", total);
      } else if (current >= total - 2) {
        pages.push(1, "...", total - 2, total - 1, total);
      } else {
        pages.push(1, "...", current - 1, current, current + 1, "...", total);
      }
    }

    return pages;
  }, [totalPages, currentPage]);

  const goToPage = useCallback((pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  }, [totalPages]);

  const goToFirst = useCallback(() => setCurrentPage(1), []);
  const goToLast = useCallback(() => setCurrentPage(totalPages), [totalPages]);
  const goToPrev = useCallback(() => setCurrentPage(prev => Math.max(1, prev - 1)), []);
  const goToNext = useCallback(() => setCurrentPage(prev => Math.min(totalPages, prev + 1)), [totalPages]);

  const setItemsPerPage = useCallback((size) => {
    setItemsPerPageState(size);
    setCurrentPage(1); // Reset to first page when changing items per page
  }, []);

  return {
    currentPage,
    totalPages,
    itemsPerPage: itemsPerPageState,
    visiblePages,
    goToPage,
    goToFirst,
    goToLast,
    goToPrev,
    goToNext,
    setItemsPerPage,
  };
};
