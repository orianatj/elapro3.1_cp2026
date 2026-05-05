import React from "react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 12,
  onPageChange = () => {},
}: PaginationProps) {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
        {"<"}
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <span
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
          style={{ cursor: "pointer" }}
        >
          {page}
        </span>
      ))}

      <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>
        {">"}
      </button>
    </div>
  );
}