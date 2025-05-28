import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AgentContext } from '../contexts/AgentContext';
import { NavigationContext } from '../contexts/NavigationContext';
import { Agent, BarChartDataItem } from '../types';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { PencilIcon, TrashIcon, BoltIcon, CheckCircleIcon, ExclamationCircleIcon, CogIcon } from '../constants';
import SimpleBarChart from '../components/analytics/SimpleBarChart';

const AgentDetailPage: React.FC = () => {
  const { getAgentById, deleteAgent } = useContext(AgentContext)!;
  const { navigateTo, currentParams, currentPage } = useContext(NavigationContext)!;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const agentId = currentParams.id;

  useEffect(() => {
    if (agentId) {
      setIsLoading(true);
      const foundAgent = getAgentById(agentId);
      if (foundAgent) {
        setAgent(foundAgent);
        setError('');
      } else {
        setAgent(null);
        setError('Agent not found.');
      }
      setIsLoading(false);
    } else {
        setError('No agent ID provided.');
        setIsLoading(false);
        // navigateTo('agentList'); // Redirect if no ID
    }
  }, [agentId, getAgentById, currentPage]); // Re-fetch if current page changes, or agentId changes (from params)

  const handleDelete = async () => {
    if (agent && window.confirm(`Are you sure you want to delete agent "${agent.name}"?`)) {
      try {
        await deleteAgent(agent.id);
        navigateTo('agentList');
      } catch (err) {
        console.error('Failed to delete agent:', err);
        setError('Failed to delete agent. Please try again.');
      }
    }
  };

  const performanceChartData: BarChartDataItem[] = useMemo(() => {
    if (!agent) return [];
    return [
      { label: 'Tasks Done', value: agent.performance.tasksCompleted, color: 'bg-sky-500' },
      { label: 'Success %', value: agent.performance.successRate, color: 'bg-green-500' },
      // Avg Response Time might need different scale or representation
    ];
  }, [agent]);

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'text-green-500 dark:text-green-400';
      case 'inactive': return 'text-red-500 dark:text-red-400';
      case 'draft': return 'text-yellow-500 dark:text-yellow-400';
      default: return 'text-slate-500 dark:text-slate-400';
    }
  };
   const getStatusBgColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-700/30';
      case 'inactive': return 'bg-red-100 dark:bg-red-700/30';
      case 'draft': return 'bg-yellow-100 dark:bg-yellow-600/30';
      default: return 'bg-slate-100 dark:bg-slate-700/30';
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading agent details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => navigateTo('agentList')}>Back to Agent List</Button>
      </div>
    );
  }

  if (!agent) {
    // Should be caught by error state, but as a fallback
    return <div className="container mx-auto px-4 py-8 text-center">Agent data unavailable.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
            {agent.name} 
            <span className={`ml-3 px-3 py-1 text-sm font-semibold rounded-full ${getStatusBgColor(agent.status)} ${getStatusColor(agent.status)}`}>
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Agent ID: {agent.id}</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" onClick={() => navigateTo('agentEdit', { id: agent.id })}>
            <PencilIcon className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="secondary" onClick={handleDelete} className="!bg-red-600 hover:!bg-red-700 dark:!bg-red-700 dark:hover:!bg-red-800 text-white">
            <TrashIcon className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & Config */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">Description</h2>
            <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{agent.description}</p>
          </Card>
          
          <Card>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                <CogIcon className="w-5 h-5 mr-2 text-sky-600 dark:text-sky-400"/> Agent Configuration (Sample)
            </h2>
            {agent.config && Object.keys(agent.config).length > 0 ? (
                <dl className="divide-y divide-slate-200 dark:divide-slate-700">
                {Object.entries(agent.config).map(([key, value]) => (
                    <div key={key} className="py-3 grid grid-cols-3 gap-4 items-center">
                    <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</dt>
                    <dd className="text-sm text-slate-900 dark:text-slate-100 col-span-2">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</dd>
                    </div>
                ))}
                </dl>
            ) : (
                <p className="text-slate-500 dark:text-slate-400">No specific configuration available for this agent.</p>
            )}
          </Card>
        </div>

        {/* Right Column: Performance & Metadata */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                <BoltIcon className="w-5 h-5 mr-2 text-sky-600 dark:text-sky-400"/> Performance Metrics
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Tasks Completed:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{agent.performance.tasksCompleted.toLocaleString()}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Success Rate:</span>
                <span className={`font-semibold ${agent.performance.successRate >= 80 ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                  {agent.performance.successRate}%
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Avg. Response Time:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{agent.performance.averageResponseTime} ms</span>
              </li>
            </ul>
            <div className="mt-4 h-40">
                 <SimpleBarChart data={performanceChartData} />
            </div>
          </Card>
          <Card>
             <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">Metadata</h2>
             <ul className="space-y-1 text-sm">
                <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Created At:</span> <span className="text-slate-700 dark:text-slate-300">{new Date(agent.createdAt).toLocaleString()}</span></li>
                <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Last Updated:</span> <span className="text-slate-700 dark:text-slate-300">{new Date(agent.updatedAt).toLocaleString()}</span></li>
             </ul>
          </Card>
        </div>
      </div>

       <div className="mt-10 text-center">
        <Button variant="outline" onClick={() => navigateTo('agentList')}>
          Back to Agent List
        </Button>
      </div>
    </div>
  );
};

export default AgentDetailPage;
