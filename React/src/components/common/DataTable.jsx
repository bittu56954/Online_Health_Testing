import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

export const DataTable = ({
  columns,
  data = [],
  searchable = true,
  searchPlaceholder = 'Search records...',
  filterOptions = [],
  filterKey = 'status',
  pageSize = 10,
  actionButton,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered data based on search and dropdown filter
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Filter dropdown check
      if (selectedFilter !== 'ALL') {
        const itemVal = item[filterKey];
        if (itemVal && itemVal.toString().toLowerCase() !== selectedFilter.toLowerCase()) {
          return false;
        }
      }

      // Search term check
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matches = columns.some((col) => {
          if (!col.accessor) return false;
          let val = typeof col.accessor === 'function' ? col.accessor(item) : item[col.accessor];
          if (val === null || val === undefined) return false;
          return val.toString().toLowerCase().includes(term);
        });
        if (!matches) return false;
      }

      return true;
    });
  }, [data, columns, searchTerm, selectedFilter, filterKey]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="data-table-wrapper">
      {(searchable || filterOptions.length > 0 || actionButton) && (
        <div className="table-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, flexWrap: 'wrap' }}>
            {searchable && (
              <div className="search-input-wrapper">
                <Search size={16} />
                <input
                  type="text"
                  className="search-input"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}

            {filterOptions.length > 0 && (
              <select
                className="form-select"
                style={{ width: 'auto', minWidth: 150, padding: '8px 12px' }}
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="ALL">All Status</option>
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {actionButton && <div>{actionButton}</div>}
        </div>
      )}

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} style={col.style || {}}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr key={row._id || rowIdx}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} style={col.style || {}}>
                      {col.cell
                        ? col.cell(row)
                        : typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '48px 16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#94a3b8' }}>
                    <Inbox size={36} strokeWidth={1.5} />
                    <span style={{ fontSize: '0.92rem', fontWeight: 500 }}>No matching records found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > pageSize && (
        <div
          className="table-pagination-footer"
          style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              className="btn btn-secondary btn-sm btn-icon"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontWeight: 600, padding: '0 8px' }}>
              {currentPage} / {totalPages}
            </span>
            <button
              className="btn btn-secondary btn-sm btn-icon"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
