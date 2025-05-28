
import React, { useContext } from 'react';
import { SOCIAL_LINKS } from '../../constants';
import { NavigationContext } from '../../contexts/NavigationContext';
import { Page, NavigationParams } from '../../types';


const Footer: React.FC = () => {
  const { navigateTo } = useContext(NavigationContext)!;

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page, sectionId?: string) => {
    e.preventDefault();
    navigateTo(page, undefined, sectionId);
  };

  return (
    <footer className="bg-slate-800 dark:bg-slate-950 text-slate-300 dark:text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-sky-500 dark:text-sky-400 mb-2">AgentFlow AI</h3>
            <p className="text-sm">Automate, Innovate, Elevate.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-100 dark:text-slate-200 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" onClick={(e) => handleFooterLinkClick(e, 'home', 'features')} className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors">Features</a></li>
              <li><a href="#how-it-works" onClick={(e) => handleFooterLinkClick(e, 'home', 'how-it-works')} className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors">How It Works</a></li>
              <li><a href="#pricing" onClick={(e) => handleFooterLinkClick(e, 'home', 'pricing')} className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors">Pricing</a></li>
              {/* <li><a href="#" className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors">Contact Us</a></li> */}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-100 dark:text-slate-200 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors">Terms of Service</a></li>
            </ul>
            <div className="mt-6 flex space-x-4">
                {SOCIAL_LINKS.map(link => (
                    <a key={link.name} href={link.href} className="text-slate-400 dark:text-slate-500 hover:text-sky-400 dark:hover:text-sky-300 transition-colors" aria-label={link.name}>
                        {link.icon}
                    </a>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 dark:border-slate-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AgentFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
