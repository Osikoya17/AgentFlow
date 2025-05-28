import React, { useState, useContext } from 'react';
import { NAV_LINKS_PUBLIC, NAV_LINKS_AUTHENTICATED, ChipIcon } from '../../constants';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { AuthContext } from '../../contexts/AuthContext';
import { NavigationContext } from '../../contexts/NavigationContext';
import { Page, NavLink as NavLinkType, NavigationParams } from '../../types';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logoutUser } = useContext(AuthContext)!;
  const { navigateTo, currentPage } = useContext(NavigationContext)!;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNav = (page: Page, params?: NavigationParams, sectionId?: string) => {
    navigateTo(page, params, sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };
  
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleNav('home');
  };

  const renderNavLink = (link: NavLinkType, isMobile: boolean = false) => {
    const commonClasses = `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isMobile ? 'block w-full text-left' : ''}`;
    const isActive = currentPage === link.href; // Basic active state check

    // Handle section links on home page (href is 'home', sectionId is in link.label or a dedicated prop)
    // The NAV_LINKS_PUBLIC constants now correctly set href to 'home' for section links
    if (link.href === 'home' && ['Features', 'How It Works', 'Pricing', 'Testimonials'].includes(link.label)) {
        const sectionId = link.label.toLowerCase().replace(/\s+/g, '-');
        return (
            <button
              key={link.label}
              onClick={() => handleNav('home', undefined, sectionId)}
              className={`${commonClasses} ${isActive && currentPage === 'home' && window.location.hash.includes(sectionId) ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'}`}
              aria-label={`Go to ${link.label} section`}
            >
              {link.label}
            </button>
        );
    }
    
    // For direct page navigation (e.g. Dashboard, My Agents)
    return (
        <Button
            key={link.label}
            variant="link"
            onClick={() => {
                if (link.isPageLink) handleNav(link.href as Page, link.params);
            }}
            className={`${commonClasses} ${isActive ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400'}`}
        >
          {link.label === "My Agents" && <ChipIcon className="w-4 h-4 mr-1.5 inline-block" />}
          {link.label}
        </Button>
    );
};

  const currentNavLinks = isAuthenticated ? NAV_LINKS_AUTHENTICATED : NAV_LINKS_PUBLIC;

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a href="#" onClick={handleLogoClick} className="flex-shrink-0">
              <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                AgentFlow <span className="text-slate-700 dark:text-slate-300">AI</span>
              </span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {currentNavLinks.map((link) => renderNavLink(link))}
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-2 ml-4">
              {isAuthenticated ? (
                <>
                  {/* Dashboard button already covered by NAV_LINKS_AUTHENTICATED if desired */}
                  {/* <Button variant="outline" size="md" onClick={() => handleNav('dashboard')}>Dashboard</Button> */}
                  <Button variant="secondary" size="md" onClick={logoutUser}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="md" onClick={() => handleNav('login')}>Login</Button>
                  <Button variant="primary" size="md" onClick={() => handleNav('signup')}>Sign Up</Button>
                </>
              )}
            </div>
            <div className="-mr-2 flex md:hidden ml-2">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="bg-slate-100 dark:bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {currentNavLinks.map((link) => renderNavLink(link, true))}
          </div>
          <div className="pt-4 pb-3 border-t border-slate-200 dark:border-slate-700">
            <div className="px-5 space-y-3">
              {isAuthenticated ? (
                <>
                  {/* <Button variant="outline" size="md" className="w-full" onClick={() => handleNav('dashboard')}>Dashboard</Button> */}
                  <Button variant="secondary" size="md" className="w-full" onClick={() => { logoutUser(); setIsMobileMenuOpen(false);}}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="md" className="w-full" onClick={() => handleNav('login')}>Login</Button>
                  <Button variant="primary" size="md" className="w-full" onClick={() => handleNav('signup')}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
