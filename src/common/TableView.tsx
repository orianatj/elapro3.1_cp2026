import React from "react";

/**
 * TableProps defines the public API for the generic Table component,
 * reusable across different pages (Reports, Teacher validation tables, Admin lists, etc.)
 * 
 * This component receives:
 *  - column headers 
 *  - row content (children) supplied by the parent component, responsible for mapping the data to table rows.
 */

// Column labels displayed in the table header.
type TableProps = {  
  headers: React.ReactNode[]; // Allow JSX table headers to be rendered in the table header  
  children: React.ReactNode;  // supplied by the caller
};

/**
 * Generic Table component.
 *  Renders: 
 *  - semantic HTML table structure
 *  - column headers
 *  - table rows passed in by the parent
 */
export function Table({ headers, children }: TableProps) {
  return (
    <table>
      {/* Table header section */}
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key = {index}>
              {header}
            </th>
          ))}
        </tr>
      </thead>

      {/* Table body section */}
      <tbody>
        {children}
      </tbody>
    </table>
  );
}
