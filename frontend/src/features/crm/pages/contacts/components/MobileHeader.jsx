import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';

const MobileHeader = ({ showAndHideState, onSearchClick }) => {
  return (
    <div className="h-[60px] flex items-center justify-end bg-white border-b px-4">
      <div className="flex items-center space-x-2">
        <Button
          onClick={onSearchClick}
          variant="ghost"
          size="icon"
        >
          <Search className="h-4 w-4" />
        </Button>
        
        {showAndHideState?.addButton && (
          <Button asChild>
            <Link to="/contact">
              <Plus className="h-4 w-4 mr-2" />
              New
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
