import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { AgentProvider } from './contexts/AgentContext';
import { AssistantProvider } from './contexts/AssistantContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <NavigationProvider>
        <AuthProvider>
          <AgentProvider>
            <AssistantProvider>
              <App />
            </AssistantProvider>
          </AgentProvider>
        </AuthProvider>
      </NavigationProvider>
    </ThemeProvider>
  </React.StrictMode>
);