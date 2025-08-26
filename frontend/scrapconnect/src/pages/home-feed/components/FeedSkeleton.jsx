import React from 'react';

const FeedSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="bg-card rounded-lg border border-border shadow-subtle overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="aspect-video bg-muted"></div>
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
              <div className="space-y-1 text-right">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
            
            {/* Location and Date */}
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-3 bg-muted rounded w-16"></div>
            </div>
            
            {/* Seller Info */}
            <div className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-background rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="h-4 bg-background rounded w-20"></div>
                <div className="h-3 bg-background rounded w-32"></div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <div className="h-8 bg-muted rounded flex-1"></div>
              <div className="h-8 bg-muted rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedSkeleton;