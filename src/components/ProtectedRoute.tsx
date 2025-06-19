
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowGuests?: boolean; // New prop to allow guest access
}

const ProtectedRoute = ({ children, allowGuests = false }: ProtectedRouteProps) => {
  const { user, loading, isGuest } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && !isGuest && !allowGuests) {
      navigate('/welcome');
    }
  }, [user, loading, isGuest, allowGuests, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[#9E78E9] rounded-full flex items-center justify-center mx-auto">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#9E78E9] mb-2">Loading...</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Verifying your authentication
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Allow access if user is authenticated, is a guest (and guests are allowed), or if guests are specifically allowed
  if (user || (isGuest && allowGuests) || allowGuests) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
