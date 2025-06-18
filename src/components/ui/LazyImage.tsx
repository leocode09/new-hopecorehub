
import { useState, useRef, useEffect } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export const LazyImage = ({ src, alt, className, placeholder }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { preferences } = useUserPreferences();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Skip lazy loading if disabled in preferences or low data mode
  const shouldLazyLoad = preferences?.lazy_loading_enabled && !preferences?.low_data_mode;

  if (preferences?.low_data_mode) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image disabled (Low Data Mode)</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={className}>
      {(!shouldLazyLoad || isInView) && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setIsLoaded(true)}
          loading={shouldLazyLoad ? 'lazy' : 'eager'}
        />
      )}
      {shouldLazyLoad && !isInView && (
        <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />
      )}
    </div>
  );
};
