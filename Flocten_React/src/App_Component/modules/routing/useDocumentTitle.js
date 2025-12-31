import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeTitles } from './routesConfig';

export const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'Uplc';
    document.title = title;
  }, [location.pathname]);
};