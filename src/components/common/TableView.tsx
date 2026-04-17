import React from "react";

/**
 * TableProps defines the public API for the generic Table component,
 * reusable across different pages (Reports, Teacher validation tables, Admin lists, etc.)
 * 
 * This component receives:
 *  - column headers (pure presentation)
 *  - row content (rendered by the caller)
 */

// Column labels displayed in the table header.
type TableProps = {  
  headers: string[];   
  rows: React.ReactNode;  // supplied by the caller
};

/**
 * Generic Table component.
 *  Renders: 
 *  - semantic HTML table structure
 *  - column headers
 *  - table rows passed in by the parent
 */
export function Table({ headers, rows }: TableProps) {
  return (
    <table>
      {/* Table header section */}
      <thead>
        <tr>
          {headers.map((header) => (
            <th key = {header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      {/* Table body section */}
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
