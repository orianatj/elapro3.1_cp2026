import React from "react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  siblingCount?: number;

  showFirstLast?: boolean;
  showPrevNext?: boolean;

  prevLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  firstLabel?: React.ReactNode;
  lastLabel?: React.ReactNode;

  disabled?: boolean;

  className?: string;
  activeClassName?: string;

  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 12,
  siblingCount = 1,

  showFirstLast = true,
  showPrevNext = true,

  prevLabel = "<",
  nextLabel = ">",
  firstLabel = "<<",
  lastLabel = ">>",

  disabled = false,

  className = "pagination",
  activeClassName = "active",

  onPageChange = () => {},
}: PaginationProps) {
  const createPageNumbers = () => {
    const pages: (number | string)[] = [];

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(
      currentPage + siblingCount,
      totalPages
    );

    // First page
    if (leftSibling > 1) {
      pages.push(1);
    }

    // Left ellipsis
    if (leftSibling > 2) {
      pages.push("...");
    }

    // Middle pages
    for (let page = leftSibling; page <= rightSibling; page++) {
      pages.push(page);
    }

    // Right ellipsis
    if (rightSibling < totalPages - 1) {
      pages.push("...");
    }

    // Last page
    if (rightSibling < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPageNumbers();

  const changePage = (page: number) => {
    if (disabled) return;
    if (page < 1 || page > totalPages) return;
    if (page === currentPage) return;

    onPageChange(page);
  };

  return (
    <div className={className}>
      {showFirstLast && (
        <button
          disabled={disabled || currentPage === 1}
          onClick={() => changePage(1)}
        >
          {firstLabel}
        </button>
      )}

      {showPrevNext && (
        <button
          disabled={disabled || currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          {prevLabel}
        </button>
      )}

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`}>...</span>
        ) : (
          <span
            key={page}
            className={
              page === currentPage ? activeClassName : ""
            }
            onClick={() => changePage(Number(page))}
            style={{
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {page}
          </span>
        )
      )}

      {showPrevNext && (
        <button
          disabled={disabled || currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          {nextLabel}
        </button>
      )}

      {showFirstLast && (
        <button
          disabled={disabled || currentPage === totalPages}
          onClick={() => changePage(totalPages)}
        >
          {lastLabel}
        </button>
      )}
    </div>
  );
}