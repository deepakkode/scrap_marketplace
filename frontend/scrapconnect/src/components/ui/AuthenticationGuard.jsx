import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationGuard');
  }
  return context;
};

const AuthenticationGuard = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ['/login-screen', '/register-screen'];
  const protectedRoutes = ['/home-feed', '/explore-page', '/upload-page', '/profile-page'];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      handleRouteProtection();
    }
  }, [user, location?.pathname, isLoading]);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        
        if (isValidToken(token)) {
          setUser(parsedUser);
        } else {
          clearAuthData();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const isValidToken = (token) => {
    try {
      const payload = JSON.parse(atob(token?.split('.')?.[1]));
      const currentTime = Date.now() / 1000;
      return payload?.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const handleRouteProtection = () => {
    const isPublicRoute = publicRoutes?.includes(location?.pathname);
    const isProtectedRoute = protectedRoutes?.includes(location?.pathname);
    
    if (user && isPublicRoute) {
      navigate('/home-feed', { replace: true });
    } else if (!user && isProtectedRoute) {
      navigate('/login-screen', { replace: true });
    } else if (!user && !isPublicRoute && location?.pathname === '/') {
      navigate('/login-screen', { replace: true });
    } else if (user && location?.pathname === '/') {
      navigate('/home-feed', { replace: true });
    }

    if (user && location?.pathname === '/upload-page' && user?.role !== 'Seller') {
      navigate('/home-feed', { replace: true });
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      const mockResponse = await new Promise((resolve) => {
        setTimeout(() => {
          if (credentials.email && credentials.password) {
            const mockUser = {
              id: '1',
              name: credentials.email.split('@')[0],
              email: credentials.email,
              role: credentials.email.includes('seller') ? 'Seller' : 'Buyer'
            };
            
            const mockToken = btoa(JSON.stringify({
              exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
              userId: mockUser.id
            }));
            
            resolve({ user: mockUser, token: mockToken });
          } else {
            throw new Error('Invalid credentials');
          }
        }, 1000);
      });

      localStorage.setItem('authToken', mockResponse?.token);
      localStorage.setItem('userData', JSON.stringify(mockResponse?.user));
      setUser(mockResponse?.user);
      
      return { success: true, user: mockResponse?.user };
    } catch (error) {
      return { success: false, error: error?.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      const mockResponse = await new Promise((resolve) => {
        setTimeout(() => {
          const mockUser = {
            id: Date.now().toString(),
            name: userData.name,
            email: userData.email,
            role: userData.role || 'Buyer'
          };
          
          const mockToken = btoa(JSON.stringify({
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
            userId: mockUser.id
          }));
          
          resolve({ user: mockUser, token: mockToken });
        }, 1000);
      });

      localStorage.setItem('authToken', mockResponse?.token);
      localStorage.setItem('userData', JSON.stringify(mockResponse?.user));
      setUser(mockResponse?.user);
      
      return { success: true, user: mockResponse?.user };
    } catch (error) {
      return { success: false, error: error?.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    navigate('/login-screen', { replace: true });
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const authValue = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
            <div className="w-5 h-5 bg-primary-foreground rounded"></div>
          </div>
          <div className="text-muted-foreground">Loading ScrapConnect...</div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationGuard;