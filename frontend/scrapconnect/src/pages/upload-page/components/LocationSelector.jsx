import React from 'react';
import Select from '../../../components/ui/Select';

const LocationSelector = ({ selectedLocation, onLocationChange, error }) => {
  const locationOptions = [
    { value: '', label: 'Select your location' },
    { value: 'new-york-ny', label: 'New York, NY' },
    { value: 'los-angeles-ca', label: 'Los Angeles, CA' },
    { value: 'chicago-il', label: 'Chicago, IL' },
    { value: 'houston-tx', label: 'Houston, TX' },
    { value: 'phoenix-az', label: 'Phoenix, AZ' },
    { value: 'philadelphia-pa', label: 'Philadelphia, PA' },
    { value: 'san-antonio-tx', label: 'San Antonio, TX' },
    { value: 'san-diego-ca', label: 'San Diego, CA' },
    { value: 'dallas-tx', label: 'Dallas, TX' },
    { value: 'san-jose-ca', label: 'San Jose, CA' },
    { value: 'austin-tx', label: 'Austin, TX' },
    { value: 'jacksonville-fl', label: 'Jacksonville, FL' },
    { value: 'fort-worth-tx', label: 'Fort Worth, TX' },
    { value: 'columbus-oh', label: 'Columbus, OH' },
    { value: 'charlotte-nc', label: 'Charlotte, NC' },
    { value: 'san-francisco-ca', label: 'San Francisco, CA' },
    { value: 'indianapolis-in', label: 'Indianapolis, IN' },
    { value: 'seattle-wa', label: 'Seattle, WA' },
    { value: 'denver-co', label: 'Denver, CO' },
    { value: 'boston-ma', label: 'Boston, MA' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
        <p className="text-sm text-muted-foreground">
          Where is the material located for pickup?
        </p>
      </div>

      <Select
        label="Pickup Location"
        options={locationOptions}
        value={selectedLocation}
        onChange={onLocationChange}
        error={error}
        required
        searchable
        placeholder="Search for your city..."
        description="Buyers will see this location to estimate pickup logistics"
      />

      <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center mt-0.5">
            <span className="text-xs text-accent-foreground font-bold">i</span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground">Location Privacy</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Only the city and state will be visible to buyers. Your exact address remains private until you choose to share it directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;