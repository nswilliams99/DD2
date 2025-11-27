
import { Star, ExternalLink } from 'lucide-react';

const GoogleReviewBar = () => {
  // This would eventually connect to Google My Business API
  const rating = 4.8;
  const reviewCount = 128;

  return (
    <div className="bg-white border-b border-gray-200 py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-professional-dark">
              {rating} ({reviewCount} Reviews)
            </span>
            <span className="text-gray-500">|</span>
            <a
              href="https://www.google.com/search?q=dumpster+diverz+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-diverz-purple hover:text-diverz-purple-dark transition-colors font-medium"
            >
              <span>See Our Reviews on Google</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleReviewBar;
