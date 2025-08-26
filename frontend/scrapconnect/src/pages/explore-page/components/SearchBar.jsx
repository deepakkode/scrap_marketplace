import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, searchQuery, onSearchChange }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  const handleSearch = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch(localQuery);
    }
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const clearSearch = () => {
    setLocalQuery('');
    if (onSearchChange) {
      onSearchChange('');
    }
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <form onSubmit={handleSearch} className="flex space-x-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
          </div>
          <Input
            type="text"
            placeholder="Search scrap materials, sellers, locations..."
            value={localQuery}
            onChange={handleInputChange}
            className="pl-10 pr-10"
          />
          {localQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <Icon name="X" size={16} color="var(--color-muted-foreground)" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          variant="default"
          iconName="Search"
          iconPosition="left"
          className="px-6"
        >
          Search
        </Button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Popular searches:</span>
        {['Steel scrap', 'Aluminum cans', 'Copper wire', 'Plastic bottles']?.map((term) => (
          <button
            key={term}
            onClick={() => {
              setLocalQuery(term);
              if (onSearch) onSearch(term);
            }}
            className="text-sm text-accent hover:text-accent/80 underline transition-smooth"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;