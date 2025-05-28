import React, { useState, useContext, FormEvent } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { AuthContext } from '../contexts/AuthContext';
import { NavigationContext } from '../contexts/NavigationContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useContext(AuthContext)!;
  const { navigateTo } = useContext(NavigationContext)!;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Simulate API call / login logic
    console.log('Logging in with:', { email, password });
    // Assuming login is successful
    loginUser(); 
    // AuthContext's loginUser will handle navigation to dashboard
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <Card className="max-w-md w-full space-y-8 !p-10 dark:!bg-slate-800">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:focus:ring-sky-400 dark:focus:border-sky-400 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Button variant="link" onClick={() => navigateTo('signup')} className="font-medium">
            Sign up
          </Button>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;