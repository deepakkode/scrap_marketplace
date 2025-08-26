import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import Header from '../../components/ui/Header';
import FilterPanel from '../../components/ui/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import ActiveFilters from './components/ActiveFilters';
import ResultsGrid from './components/ResultsGrid';
import Pagination from './components/Pagination';

const ExplorePage = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    material: '',
    priceMin: '',
    priceMax: '',
    location: '',
    condition: [],
    quantity: '',
    seller: '',
    dateRange: ''
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const resultsPerPage = 12;

  // Filter and search logic
  const filteredListings = useMemo(() => {
    // TODO: Replace with actual API call to fetch listings
    // For now, return empty array as no real data exists yet
    let results = []; // No dummy data - empty until real listings are created

    // Apply search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      results = results?.filter(listing =>
        listing?.title?.toLowerCase()?.includes(query) ||
        listing?.material?.toLowerCase()?.includes(query) ||
        listing?.description?.toLowerCase()?.includes(query) ||
        listing?.location?.toLowerCase()?.includes(query) ||
        listing?.seller?.name?.toLowerCase()?.includes(query)
      );
    }

    // Apply filters
    if (filters?.material) {
      results = results?.filter(listing =>
        listing?.material?.toLowerCase() === filters?.material?.toLowerCase()
      );
    }

    if (filters?.priceMin) {
      results = results?.filter(listing => listing?.price >= parseFloat(filters?.priceMin));
    }

    if (filters?.priceMax) {
      results = results?.filter(listing => listing?.price <= parseFloat(filters?.priceMax));
    }

    if (filters?.location) {
      // Simple location filtering - in real app would use geolocation
      results = results?.filter(listing =>
        listing?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    if (filters?.condition && filters?.condition?.length > 0) {
      results = results?.filter(listing =>
        filters?.condition?.some(condition =>
          listing?.condition?.toLowerCase() === condition?.toLowerCase()
        )
      );
    }

    if (filters?.quantity) {
      results = results?.filter(listing => listing?.quantity >= parseFloat(filters?.quantity));
    }

    if (filters?.seller) {
      results = results?.filter(listing =>
        listing?.seller?.name?.toLowerCase()?.includes(filters?.seller?.toLowerCase())
      );
    }

    if (filters?.dateRange) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case '3months':
          filterDate?.setMonth(now?.getMonth() - 3);
          break;
        default:
          filterDate?.setFullYear(1970);
      }
      
      results = results?.filter(listing => new Date(listing.postedDate) >= filterDate);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        results?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        results?.sort((a, b) => b?.price - a?.price);
        break;
      case 'quantity-high':
        results?.sort((a, b) => b?.quantity - a?.quantity);
        break;
      case 'quantity-low':
        results?.sort((a, b) => a?.quantity - b?.quantity);
        break;
      case 'date-new':
        results?.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'date-old':
        results?.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        break;
      case 'location':
        results?.sort((a, b) => a?.location?.localeCompare(b?.location));
        break;
      default: // relevance
        // Keep original order for relevance
        break;
    }

    return results;
  }, [searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredListings?.length / resultsPerPage);
  const paginatedListings = filteredListings?.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortBy]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleRemoveFilter = (filterKey) => {
    const newFilters = { ...filters };
    if (filterKey === 'price') {
      newFilters.priceMin = '';
      newFilters.priceMax = '';
    } else if (filterKey === 'condition') {
      newFilters.condition = [];
    } else {
      newFilters[filterKey] = '';
    }
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      material: '',
      priceMin: '',
      priceMax: '',
      location: '',
      condition: [],
      quantity: '',
      seller: '',
      dateRange: ''
    });
    setSearchQuery('');
  };

  const handleContact = (listing) => {
    // In real app, this would open a contact modal or redirect to messaging
    alert(`Contacting ${listing?.seller?.name} about "${listing?.title}"`);
  };

  const handleFavorite = (listing) => {
    setFavoriteListings(prev =>
      prev?.includes(listing?.id)
        ? prev?.filter(id => id !== listing?.id)
        : [...prev, listing?.id]
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={logout} />
      <div className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  isOpen={true}
                  onFiltersChange={handleFiltersChange}
                  initialFilters={filters}
                  resultsCount={filteredListings?.length}
                />
              </div>
            </div>

            {/* Mobile Filter Panel */}
            <FilterPanel
              isOpen={showMobileFilters}
              onClose={() => setShowMobileFilters(false)}
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
              resultsCount={filteredListings?.length}
              className="lg:hidden"
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search Bar */}
              <SearchBar
                onSearch={handleSearch}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultsCount={filteredListings?.length}
                onToggleFilters={() => setShowMobileFilters(!showMobileFilters)}
                showMobileFilters={showMobileFilters}
              />

              {/* Active Filters */}
              <ActiveFilters
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
              />

              {/* Results Grid */}
              <ResultsGrid
                listings={paginatedListings}
                viewMode={viewMode}
                onContact={handleContact}
                onFavorite={handleFavorite}
                favoriteListings={favoriteListings}
                loading={isLoading}
              />

              {/* Pagination */}
              {!isLoading && filteredListings?.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalResults={filteredListings?.length}
                  resultsPerPage={resultsPerPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;