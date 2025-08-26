import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import Header from '../../components/ui/Header';
import FeedCard from './components/FeedCard';
import FilterChips from './components/FilterChips';
import FeedSkeleton from './components/FeedSkeleton';
import EmptyFeedState from './components/EmptyFeedState';
import ContactModal from './components/ContactModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HomeFeed = () => {
  const { user, logout } = useAuth();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Load initial listings
  useEffect(() => {
    loadListings();
  }, []);

  // Filter listings when active filters change
  useEffect(() => {
    filterListings();
  }, [listings, activeFilters]);

  const loadListings = async (pageNum = 1) => {
    if (pageNum === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    // TODO: Replace with actual API call to fetch listings
    // For now, set empty array as no real data exists yet
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newListings = []; // No dummy data - empty until real listings are created

    if (pageNum === 1) {
      setListings(newListings);
    } else {
      setListings(prev => [...prev, ...newListings]);
    }

    setHasMore(false); // No more data to load
    setIsLoading(false);
    setIsLoadingMore(false);
  };

  const filterListings = () => {
    if (activeFilters?.length === 0) {
      setFilteredListings(listings);
    } else {
      const filtered = listings?.filter(listing =>
        activeFilters?.includes(listing?.material?.toLowerCase())
      );
      setFilteredListings(filtered);
    }
  };

  const handleFilterChange = (filterValue) => {
    if (filterValue === 'all') {
      setActiveFilters([]);
    } else {
      setActiveFilters(prev => {
        if (prev?.includes(filterValue)) {
          return prev?.filter(f => f !== filterValue);
        } else {
          return [...prev, filterValue];
        }
      });
    }
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const handleContact = (listing) => {
    setSelectedListing(listing);
    setIsContactModalOpen(true);
  };

  const handleFavorite = (listing) => {
    setFavorites(prev => {
      if (prev?.includes(listing?.id)) {
        return prev?.filter(id => id !== listing?.id);
      } else {
        return [...prev, listing?.id];
      }
    });
  };

  const loadMore = () => {
    if (hasMore && !isLoadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadListings(nextPage);
    }
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement?.scrollTop !== document.documentElement?.offsetHeight || isLoadingMore) {
      return;
    }
    loadMore();
  }, [isLoadingMore, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const hasActiveFilters = activeFilters?.length > 0;
  const showEmptyState = !isLoading && filteredListings?.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={logout} />
      {/* Filter Chips */}
      <FilterChips
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearFilters}
      />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Latest Scrap Materials
          </h1>
          <p className="text-muted-foreground">
            Discover the latest scrap material listings from verified sellers
          </p>
        </div>

        {/* Content Area */}
        {showEmptyState ? (
          <EmptyFeedState
            hasFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />
        ) : (
          <>
            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {isLoading ? (
                <FeedSkeleton count={8} />
              ) : (
                filteredListings?.map((listing) => (
                  <FeedCard
                    key={listing?.id}
                    listing={listing}
                    onContact={handleContact}
                    onFavorite={handleFavorite}
                    isFavorited={favorites?.includes(listing?.id)}
                  />
                ))
              )}
            </div>

            {/* Load More Section */}
            {!isLoading && filteredListings?.length > 0 && (
              <div className="flex flex-col items-center space-y-4">
                {isLoadingMore && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    <FeedSkeleton count={4} />
                  </div>
                )}
                
                {hasMore && !isLoadingMore && (
                  <Button
                    variant="outline"
                    onClick={loadMore}
                    iconName="ChevronDown"
                    iconPosition="left"
                  >
                    Load More Materials
                  </Button>
                )}
                
                {!hasMore && filteredListings?.length > 6 && (
                  <div className="text-center py-8">
                    <Icon name="CheckCircle" size={24} color="var(--color-success)" className="mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      You've seen all available materials
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        listing={selectedListing}
        user={user}
      />
    </div>
  );
};

export default HomeFeed;