import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PaginationControls = ({
  currentPage,
  totalPages,
  visiblePages,
  onPageChange,
  onPrevPage,
  onNextPage,
  onGoToFirst,
  onGoToLast,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems
}) => {
  return (
    <div className="pagination-container">
      <div className="total-count">
        <p>
          <strong>Total Contacts: {totalItems}</strong>
        </p>
      </div>

      <div className="pagination-wrapper">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                onClick={currentPage === 1 ? undefined : onGoToFirst}
                className={currentPage === 1 ? 'disabled' : ''}
              >
                <i className="fs-4 fas fa-angle-double-left"></i>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage === 1}
                onClick={onPrevPage}
              />
            </PaginationItem>
            {visiblePages.map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => onPageChange(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                disabled={currentPage === totalPages}
                onClick={onNextPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={currentPage === totalPages ? undefined : onGoToLast}
                className={currentPage === totalPages ? 'disabled' : ''}
              >
                <i className="fs-4 fas fa-angle-double-right"></i>
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="d-flex justify-content-end">
          <div className="bottom-right-text">
            <div className="mb-0">
              <div className="d-flex justify-content-end ms-2">
                <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(parseInt(value))}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Records per page" />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 30, 40, 50, 100].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} Records Per Page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
