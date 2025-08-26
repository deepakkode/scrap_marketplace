import React from 'react';
import Button from '../../../components/ui/Button';


const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalResults,
  resultsPerPage 
}) => {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className="bg-card border border-border rounded-lg p-4 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        {/* Results Info */}
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{startResult}</span> to{' '}
          <span className="font-medium text-foreground">{endResult}</span> of{' '}
          <span className="font-medium text-foreground">{totalResults?.toLocaleString()}</span> results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
            className="px-3"
          >
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {visiblePages?.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-muted-foreground">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className="w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
            className="px-3"
          >
            <span className="hidden sm:inline">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;