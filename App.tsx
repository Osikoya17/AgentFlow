
import React, { useContext, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AgentListPage from './pages/AgentListPage';
import AgentFormPage from './pages/AgentFormPage';
import AgentDetailPage from './pages/AgentDetailPage';
import { NavigationContext } from './contexts/NavigationContext';
import { AuthContext } from './contexts/AuthContext';
import AssistantToggleButton from './components/assistant/AssistantToggleButton';
import AssistantPanel from './components/assistant/AssistantPanel';
import { AssistantContext } from './contexts/AssistantContext';

const App: React.FC = () => {
  const { currentPage, currentParams, navigateTo } = useContext(NavigationContext)!;
  const { isAuthenticated } = useContext(AuthContext)!;
  const { isAssistantOpen } = useContext(AssistantContext)!;


  useEffect(() => {
    const authPages: string[] = ['login', 'signup'];
    const protectedPages: string[] = ['dashboard', 'agentList', 'agentCreate', 'agentEdit', 'agentDetail'];

    if (authPages.includes(currentPage) && isAuthenticated) {
      navigateTo('dashboard');
    }
    
    if (protectedPages.includes(currentPage) && !isAuthenticated) {
      navigateTo('login');
    }
  }, [currentPage, isAuthenticated, navigateTo]);

  const renderPage = () => {
    // For protected routes, ensure isAuthenticated check before rendering
    // The useEffect above handles redirection, but this is an additional safeguard
    if (['dashboard', 'agentList', 'agentCreate', 'agentEdit', 'agentDetail'].includes(currentPage) && !isAuthenticated) {
      return null; // Or a loading spinner / placeholder, as redirection should occur
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'agentList':
        return <AgentListPage />;
      case 'agentCreate':
        return <AgentFormPage />; // Key prop can force re-mount if needed, but usually not for create
      case 'agentEdit': // ID is in currentParams.id
        return <AgentFormPage key={currentParams.id || 'edit'} />; // Key forces re-mount if ID changes while on page
      case 'agentDetail': // ID is in currentParams.id
        return <AgentDetailPage key={currentParams.id || 'detail'} />;
      case 'home':
      case 'features':
      case 'how-it-works':
      case 'pricing':
      case 'testimonials':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <main className="flex-grow">
        {renderPage()}
      </main>
      { (currentPage === 'home' || !isAuthenticated) && <Footer /> } 
      {/* Conditionally render footer or adjust based on app state. For now, show on home or if logged out. */}
      
      {isAuthenticated && <AssistantToggleButton />}
      {isAuthenticated && isAssistantOpen && <AssistantPanel />}
    </div>
  );
};

export default App;
