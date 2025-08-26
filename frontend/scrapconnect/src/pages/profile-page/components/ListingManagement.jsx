import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ListingManagement = ({ listings = [], userRole, onEditListing, onDeleteListing, onMarkAsSold }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filterOptions = [
    { value: 'all', label: 'All Listings' },
    { value: 'active', label: 'Active' },
    { value: 'sold', label: 'Sold' },
    { value: 'draft', label: 'Draft' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' }
  ];

  const filteredListings = listings?.filter(listing => {
    if (filter === 'all') return true;
    return listing?.status === filter;
  });

  const sortedListings = [...filteredListings]?.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.postedDate) - new Date(b.postedDate);
      case 'price-high':
        return b?.price - a?.price;
      case 'price-low':
        return a?.price - b?.price;
      default:
        return new Date(b.postedDate) - new Date(a.postedDate);
    }
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      sold: { color: 'bg-muted text-muted-foreground', label: 'Sold' },
      draft: { color: 'bg-warning text-warning-foreground', label: 'Draft' },
      expired: { color: 'bg-destructive text-destructive-foreground', label: 'Expired' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatPrice = (price) => {
    return `$${price?.toLocaleString()}`;
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEdit = (listing) => {
    if (onEditListing) {
      onEditListing(listing);
    }
  };

  const handleDelete = (listingId) => {
    if (onDeleteListing && window.confirm('Are you sure you want to delete this listing?')) {
      onDeleteListing(listingId);
    }
  };

  const handleMarkAsSold = (listingId) => {
    if (onMarkAsSold) {
      onMarkAsSold(listingId);
    }
  };

  if (listings?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name={userRole === 'Seller' ? 'Package' : 'Search'} size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {userRole === 'Seller' ? 'No Listings Yet' : 'No Inquiries Yet'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {userRole === 'Seller' ?'Start by creating your first scrap material listing to connect with buyers.' :'Browse the marketplace and start inquiring about materials you need.'
          }
        </p>
        <Button
          variant="default"
          iconName={userRole === 'Seller' ? 'Plus' : 'Search'}
          iconPosition="left"
        >
          {userRole === 'Seller' ? 'Create First Listing' : 'Explore Marketplace'}
        </Button>
      </div>
    );
  }

  const displayData = userRole === 'Seller' ? listings : [];

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {userRole === 'Seller' ? 'My Listings' : 'My Inquiries'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {userRole === 'Seller' ?'Manage your scrap material listings' :'Track your material inquiries and saved searches'
              }
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Select
              options={filterOptions}
              value={filter}
              onChange={setFilter}
              placeholder="Filter by status"
              className="w-40"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-40"
            />
          </div>
        </div>
      </div>
      {/* Listings Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedListings?.map((listing) => (
            <div key={listing?.id} className="border border-border rounded-lg overflow-hidden hover:shadow-card transition-smooth">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={listing?.images?.[0] || '/assets/images/no_image.png'}
                  alt={listing?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(listing?.status)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {listing?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {listing?.material}
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <div className="font-bold text-foreground font-mono">
                      {formatPrice(listing?.price)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      per {listing?.unit}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Package" size={14} />
                    <span className="font-mono">{listing?.quantity} {listing?.unit}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(listing?.postedDate)}</span>
                  </div>
                </div>

                {listing?.location && (
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-3">
                    <Icon name="MapPin" size={14} />
                    <span>{listing?.location}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  {userRole === 'Seller' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(listing)}
                        iconName="Edit"
                        iconPosition="left"
                        className="flex-1"
                      >
                        Edit
                      </Button>
                      
                      {listing?.status === 'active' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleMarkAsSold(listing?.id)}
                          iconName="Check"
                          iconPosition="left"
                        >
                          Mark Sold
                        </Button>
                      )}
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(listing?.id)}
                        iconName="Trash2"
                      />
                    </>
                  )}
                  
                  {userRole === 'Buyer' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="MessageCircle"
                        iconPosition="left"
                        className="flex-1"
                      >
                        Contact
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Heart"
                      />
                    </>
                  )}
                </div>

                {/* Stats for sellers */}
                {userRole === 'Seller' && listing?.stats && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{listing?.stats?.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={12} />
                      <span>{listing?.stats?.inquiries} inquiries</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingManagement;