
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  ExternalLink, 
  Loader2, 
  Filter, 
  Clock, 
  TrendingUp, 
  X,
  Star,
  FileText,
  HelpCircle,
  Briefcase,
  MessageSquare,
  Eye,
  ChevronRight,
  Home,
  MapPin
} from 'lucide-react';
import { useEnhancedSearch, EnhancedSearchResult } from '@/hooks/useEnhancedSearch';
import { Link, useNavigate } from 'react-router-dom';

interface EnhancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contentTypeIcons = {
  service: Briefcase,
  faq: HelpCircle,
  kb_article: FileText,
  testimonial: MessageSquare,
  semantic: Search,
  residential_town: MapPin,
  rolloff_town: MapPin,
  commercial_size: Briefcase,
  rolloff_size: Briefcase
};

const contentTypeLabels = {
  service: 'Service',
  faq: 'FAQ',
  kb_article: 'Knowledge Base',
  testimonial: 'Testimonial',
  semantic: 'Search Result',
  residential_town: 'Town Service',
  rolloff_town: 'Rolloff Service',
  commercial_size: 'Commercial Size',
  rolloff_size: 'Rolloff Size'
};

// Helper to generate dynamic URLs based on content type and metadata
const generateResultUrl = (result: EnhancedSearchResult): string | null => {
  if (result.url) return result.url;
  
  const { contentType, metadata } = result;
  
  switch (contentType) {
    case 'residential_town':
      return metadata?.slug ? `/residential/${metadata.slug}` : null;
    case 'rolloff_town':
      return metadata?.slug ? `/rolloff/${metadata.slug}` : null;
    case 'commercial_size':
      return metadata?.slug ? `/commercial/${metadata.slug}` : null;
    case 'rolloff_size':
      return metadata?.slug ? `/rolloff/sizes/${metadata.slug}` : null;
    case 'faq':
      return '/faqs';
    case 'service':
      return metadata?.slug ? `/services/${metadata.slug}` : '/services';
    case 'kb_article':
      return metadata?.slug ? `/help/${metadata.slug}` : '/help';
    default:
      return null;
  }
};

// Helper to generate context subtitle
const generateContextSubtitle = (result: EnhancedSearchResult): string => {
  const { contentType, metadata } = result;
  
  switch (contentType) {
    case 'residential_town':
      return `Residential Service > ${metadata?.name || result.title}`;
    case 'rolloff_town':
      return `Rolloff Service > ${metadata?.name || result.title}`;
    case 'commercial_size':
      return `Commercial > ${metadata?.size_label || result.title}`;
    case 'rolloff_size':
      return `Rolloff Sizes > ${metadata?.size_label || result.title}`;
    case 'faq':
      return metadata?.category ? `FAQ > ${metadata.category}` : 'FAQ';
    case 'service':
      return 'Service Page';
    case 'kb_article':
      return 'Knowledge Base';
    case 'testimonial':
      return `Customer Review${metadata?.serviceType ? ` > ${metadata.serviceType}` : ''}`;
    default:
      return contentTypeLabels[contentType] || 'Search Result';
  }
};

const EnhancedSearchModal = ({ isOpen, onClose }: EnhancedSearchModalProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    isSearching,
    searchHistory,
    popularQueries,
    performSearch,
    getSuggestions,
    clearHistory,
    handleResultClick
  } = useEnhancedSearch();

  const suggestions = getSuggestions(query);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    await performSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSelectedSuggestion(-1);
    
    // Debounced search
    const timeoutId = setTimeout(() => {
      if (newQuery.trim()) {
        handleSearch(newQuery);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Handle suggestions navigation
      if (suggestions.length > 0 && selectedSuggestion >= 0) {
        handleSearch(suggestions[selectedSuggestion]);
        return;
      }
      
      // Handle result navigation - navigate to first result
      if (results.length > 0 && query.trim()) {
        const firstResult = results[0];
        const url = generateResultUrl(firstResult);
        if (url) {
          handleResultClick(firstResult);
          if (url.startsWith('/')) {
            navigate(url);
            handleClose();
          } else {
            window.open(url, '_blank');
          }
        }
        return;
      }
      
      // Fallback to search
      handleSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => Math.min(prev + 1, suggestions.length - 1));
      } else if (results.length > 0) {
        setSelectedResultIndex(prev => Math.min(prev + 1, results.length - 1));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => Math.max(prev - 1, -1));
      } else if (results.length > 0) {
        setSelectedResultIndex(prev => Math.max(prev - 1, -1));
      }
    } else if (e.key === 'Tab') {
      // Allow tab navigation through results
      if (results.length > 0) {
        e.preventDefault();
        setSelectedResultIndex(prev => (prev + 1) % results.length);
      }
    }
  };

  const handleClose = () => {
    setQuery('');
    setSelectedSuggestion(-1);
    setSelectedResultIndex(-1);
    onClose();
  };

  const handleResultNavigation = (result: EnhancedSearchResult) => {
    const url = generateResultUrl(result);
    if (url) {
      handleResultClick(result);
      if (url.startsWith('/')) {
        navigate(url);
        handleClose();
      } else {
        window.open(url, '_blank');
      }
    }
  };

  const toggleContentType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(type)
        ? prev.contentTypes.filter(t => t !== type)
        : [...prev.contentTypes, type]
    }));
  };

  const highlightQuery = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark>
      ) : part
    );
  };

  const formatSimilarity = (similarity?: number) => {
    return similarity ? `${Math.round(similarity * 100)}%` : '';
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Enhanced Search
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm"
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              ref={inputRef}
              placeholder="Search services, FAQs, knowledge base, testimonials..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-4"
            />
            
            {/* Search Suggestions */}
            {query && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-50 mt-1">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
                      index === selectedSuggestion ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleSearch(suggestion)}
                  >
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {!query && (
            <div className="space-y-4">
              {/* Popular Searches */}
              {popularQueries.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularQueries.map(popularQuery => (
                      <Badge 
                        key={popularQuery}
                        variant="outline" 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSearch(popularQuery)}
                      >
                        {popularQuery}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {searchHistory.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Recent Searches
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearHistory}
                      className="text-xs text-gray-500"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {searchHistory.slice(0, 5).map(historyQuery => (
                      <div
                        key={historyQuery}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                        onClick={() => handleSearch(historyQuery)}
                      >
                        <span className="text-sm">{historyQuery}</span>
                        <X className="w-3 h-3 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <Card>
              <CardContent className="p-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Content Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(contentTypeLabels)
                        .filter(([type]) => ['service', 'faq', 'kb_article', 'testimonial', 'residential_town', 'rolloff_town'].includes(type))
                        .map(([type, label]) => (
                        <Badge
                          key={type}
                          variant={filters.contentTypes.includes(type) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleContentType(type)}
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Sort By</h4>
                    <div className="flex gap-2">
                      {[
                        { value: 'relevance', label: 'Relevance' },
                        { value: 'date', label: 'Date' },
                        { value: 'popularity', label: 'Popularity' }
                      ].map(option => (
                        <Badge
                          key={option.value}
                          variant={filters.sortBy === option.value ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value as any }))}
                        >
                          {option.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loading */}
          {isSearching && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-diverz-purple" />
              <span className="ml-2 text-gray-600">Searching...</span>
            </div>
          )}

          {/* Search Results */}
          {results.length > 0 && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </h3>
                {filters.contentTypes.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, contentTypes: [] }))}
                    className="text-xs"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              
              {/* Group results by category for better organization */}
              {(() => {
                const groupedResults = results.reduce((acc, result) => {
                  const category = result.contentType;
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(result);
                  return acc;
                }, {} as Record<string, EnhancedSearchResult[]>);

                return Object.entries(groupedResults).map(([category, categoryResults]) => (
                  <div key={category} className="space-y-2">
                    {Object.keys(groupedResults).length > 1 && (
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide px-1">
                        {contentTypeLabels[category] || category}
                      </h4>
                    )}
                    {categoryResults.map((result: EnhancedSearchResult, index) => {
                      const IconComponent = contentTypeIcons[result.contentType] || Search;
                      const resultUrl = generateResultUrl(result);
                      const contextSubtitle = generateContextSubtitle(result);
                      const isSelected = selectedResultIndex === results.indexOf(result);
                      
                      return (
                        <Card 
                          key={`${result.contentType}-${result.id}`} 
                          className={`hover:shadow-md transition-all duration-200 cursor-pointer min-h-[48px] ${
                            isSelected ? 'ring-2 ring-primary ring-opacity-50 bg-primary/5' : ''
                          } ${resultUrl ? 'hover:bg-gray-50' : ''}`}
                          onClick={() => resultUrl && handleResultNavigation(result)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              resultUrl && handleResultNavigation(result);
                            }
                          }}
                          aria-label={`View ${result.title} - ${contextSubtitle}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <IconComponent className="w-4 h-4 text-primary flex-shrink-0" />
                                  <span className="text-xs text-gray-500 truncate">
                                    {contextSubtitle}
                                  </span>
                                  {result.similarity && (
                                    <Badge variant="secondary" className="text-xs ml-auto flex-shrink-0">
                                      {formatSimilarity(result.similarity)} match
                                    </Badge>
                                  )}
                                </div>
                                
                                <h4 className="font-medium text-gray-900 mb-1 text-sm leading-tight">
                                  {highlightQuery(result.title, query)}
                                </h4>
                                
                                <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                                  {highlightQuery(
                                    result.content.substring(0, 150) + (result.content.length > 150 ? '...' : ''),
                                    query
                                  )}
                                </p>

                                {result.metadata?.rating && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-xs text-gray-600">{result.metadata.rating}/5</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {resultUrl && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-8 px-2 gap-1 text-primary hover:text-primary-foreground hover:bg-primary"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleResultNavigation(result);
                                    }}
                                    aria-label={`Open ${result.title}`}
                                  >
                                    <Eye className="w-3 h-3" />
                                    View Page
                                  </Button>
                                )}
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
          )}

          {/* No Results */}
          {query && results.length === 0 && !isSearching && (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No matches found</h3>
              <p className="text-sm text-gray-600 mb-4">
                We couldn't find any results for "<span className="font-medium">{query}</span>"
              </p>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Need help? Our support team is here to assist you.
                </p>
                
                <Button 
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-2"
                >
                  <Link to="/contact" onClick={handleClose}>
                    <MessageSquare className="w-4 h-4" />
                    Contact Support
                  </Link>
                </Button>

                {popularQueries.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3">Try these popular searches:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {popularQueries.slice(0, 4).map(suggestion => (
                        <Badge
                          key={suggestion}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleSearch(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-400 pt-4 border-t">
          <div className="flex flex-wrap justify-between gap-2">
            <span>Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Escape</kbd> to close</span>
            <span>Use <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">↑↓</kbd> to navigate</span>
            <span><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> opens first result</span>
            <span><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Tab</kbd> cycles through results</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedSearchModal;
