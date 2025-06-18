
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ForumSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isSearching: boolean;
}

export const ForumSearch = ({ searchTerm, onSearchChange, isSearching }: ForumSearchProps) => {
  return (
    <div className="relative mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 border-[#9E78E9]/20 focus:border-[#9E78E9] focus:ring-[#9E78E9]/20"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange('')}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
      {isSearching && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-[#9E78E9] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
