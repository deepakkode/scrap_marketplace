import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActivityFeed = ({ activities = [], userRole }) => {
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('week');

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'listings', label: 'Listings' },
    { value: 'inquiries', label: 'Inquiries' },
    { value: 'messages', label: 'Messages' },
    { value: 'transactions', label: 'Transactions' }
  ];

  const timeRangeOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  const allActivities = activities || [];

  const filteredActivities = allActivities?.filter(activity => {
    if (filter === 'all') return true;
    return activity?.type?.includes(filter?.slice(0, -1)); // Remove 's' from filter
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      listing_created: 'Plus',
      listing_updated: 'Edit',
      listing_viewed: 'Eye',
      inquiry_received: 'MessageCircle',
      inquiry_sent: 'Send',
      message_received: 'Mail',
      message_sent: 'Send',
      transaction_completed: 'CheckCircle',
      profile_updated: 'User',
      account_verified: 'Shield'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      listing_created: 'text-success',
      listing_updated: 'text-accent',
      listing_viewed: 'text-muted-foreground',
      inquiry_received: 'text-accent',
      inquiry_sent: 'text-accent',
      message_received: 'text-accent',
      message_sent: 'text-muted-foreground',
      transaction_completed: 'text-success',
      profile_updated: 'text-muted-foreground',
      account_verified: 'text-success'
    };
    return colorMap?.[type] || 'text-muted-foreground';
  };

  if (filteredActivities?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Activity" size={24} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Activity Yet</h3>
        <p className="text-muted-foreground mb-4">
          Your recent activity will appear here once you start using the platform.
        </p>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">
              Track your recent actions and interactions
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Select
              options={filterOptions}
              value={filter}
              onChange={setFilter}
              placeholder="Filter activity"
              className="w-40"
            />
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              placeholder="Time range"
              className="w-32"
            />
          </div>
        </div>
      </div>
      {/* Activity List */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredActivities?.map((activity, index) => (
            <div key={activity?.id} className="flex items-start space-x-4 p-4 hover:bg-muted rounded-lg transition-smooth">
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={18} 
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {activity?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activity?.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(activity?.timestamp)}
                    </span>
                  </div>
                </div>

                {/* Additional Actions */}
                {activity?.type === 'inquiry_received' && (
                  <div className="flex space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Reply
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                    >
                      View Details
                    </Button>
                  </div>
                )}

                {activity?.type === 'transaction_completed' && (
                  <div className="flex space-x-2 mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download Receipt
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Star"
                      iconPosition="left"
                    >
                      Rate Buyer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            iconName="ChevronDown"
            iconPosition="left"
          >
            Load More Activity
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;