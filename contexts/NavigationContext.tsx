
import React, { createContext, useState, ReactNode, useEffect, useCallback, useRef } from 'react';
import { Page, NavigationContextType, NavigationParams } from '../types';

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

const parseHash = (): { page: Page, params: NavigationParams, sectionId?: string } => {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return { page: 'home', params: {} };

  const [pathPart, queryString] = hash.split('?');
  const pathSegments = pathPart.split('/');
  
  const pageName = pathSegments[0] as Page;
  let sectionId: string | undefined;
  let params: NavigationParams = {};

  // Check for valid page names
  const validPages: Page[] = ['home', 'login', 'signup', 'dashboard', 'features', 'how-it-works', 'pricing', 'testimonials', 'agentList', 'agentCreate', 'agentEdit', 'agentDetail'];
  const resolvedPage: Page = validPages.includes(pageName) ? pageName : 'home';

  if (resolvedPage === 'home' && pathSegments.length > 1) {
    sectionId = pathSegments[1];
  }

  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((value, key) => {
      params[key] = value;
    });
  }
  
  // If page is 'features', 'how-it-works', etc., treat it as 'home' with a sectionId
  const homePageSections: Page[] = ['features', 'how-it-works', 'pricing', 'testimonials'];
  if (homePageSections.includes(resolvedPage)) {
      return { page: 'home', params, sectionId: resolvedPage };
  }


  return { page: resolvedPage, params, sectionId };
};

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentParams, setCurrentParams] = useState<NavigationParams>({});
  const isProgrammaticNavRef = useRef(false);

  const navigateTo = useCallback((page: Page, params?: NavigationParams, sectionId?: string) => {
    setCurrentPage(page);
    setCurrentParams(params || {});

    let newHash: string = page; // Explicitly type newHash as string
    if (page === 'home' && sectionId) {
      newHash = `home/${sectionId}`;
    }
    
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      newHash += `?${queryString}`;
    }
    
    // If newHash is just "home" without sectionId and without params, effectively clear hash or set to #home
    if (page === 'home' && !sectionId && (!params || Object.keys(params).length === 0)) {
        newHash = 'home'; // or '' if you prefer completely empty hash for root home
    }


    const currentFullHash = window.location.hash.replace(/^#/, '');
    if (currentFullHash !== newHash) {
      isProgrammaticNavRef.current = true;
      window.location.hash = newHash;
      setTimeout(() => { isProgrammaticNavRef.current = false; }, 0);
    }
    
    // Scrolling logic
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else { // Scroll to top for all other page navigations or home without section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [/* setCurrentPage, setCurrentParams are stable */]);

  const handleHashChange = useCallback(() => {
    if (isProgrammaticNavRef.current) {
      return;
    }
    const { page, params, sectionId } = parseHash();
    
    setCurrentPage(page);
    setCurrentParams(params);

    if (page === 'home' && sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (page !== 'home' || (page === 'home' && !sectionId)) {
        // Only scroll to top if not a section navigation within home page
        if (window.scrollY !== 0) { // Avoid unnecessary scroll if already at top
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
  }, [/* setCurrentPage, setCurrentParams are stable */]);

  useEffect(() => {
    const { page, params, sectionId } = parseHash();
    setCurrentPage(page);
    setCurrentParams(params);
    
    if (page === 'home' && sectionId) {
        // Initial scroll for deep links to sections
        setTimeout(() => document.getElementById(sectionId)?.scrollIntoView(), 100);
    } else if (page !== 'home') {
        window.scrollTo({ top: 0}); // Initial scroll to top for direct page links
    }


    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]); // handleHashChange should be stable due to its own dependencies

  return (
    <NavigationContext.Provider value={{ currentPage, currentParams, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};
