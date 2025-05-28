import React, { useState, useContext, useEffect, FormEvent } from 'react';
import { AgentContext } from '../contexts/AgentContext';
import { NavigationContext } from '../contexts/NavigationContext';
import { Agent, AgentStatus, Page } from '../types';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { AGENT_STATUS_OPTIONS } from '../constants'; // Assuming this is added to constants

const AgentFormPage: React.FC = () => {
  const { agents, getAgentById, createAgent, updateAgent } = useContext(AgentContext)!;
  const { navigateTo, currentPage, currentParams } = useContext(NavigationContext)!;

  const agentId = currentParams.id;
  const isEditMode = currentPage === 'agentEdit' && !!agentId;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<AgentStatus>('draft');
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [avgResponseTime, setAvgResponseTime] = useState(0);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && agentId) {
      const agentToEdit = getAgentById(agentId);
      if (agentToEdit) {
        setName(agentToEdit.name);
        setDescription(agentToEdit.description);
        setStatus(agentToEdit.status);
        setTasksCompleted(agentToEdit.performance.tasksCompleted);
        setSuccessRate(agentToEdit.performance.successRate);
        setAvgResponseTime(agentToEdit.performance.averageResponseTime);
      } else {
        setError('Agent not found.');
        // navigateTo('agentList'); // Or show error
      }
    }
  }, [isEditMode, agentId, getAgentById, agents]); // Add agents to dep array if getAgentById is not memoized based on it

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name.trim() || !description.trim()) {
      setError('Name and Description are required.');
      setIsLoading(false);
      return;
    }

    const agentData = {
      name,
      description,
      status,
      performance: {
        tasksCompleted: Number(tasksCompleted),
        successRate: Number(successRate),
        averageResponseTime: Number(avgResponseTime),
      }
    };

    try {
      let savedAgent: Agent | undefined;
      if (isEditMode && agentId) {
        savedAgent = await updateAgent(agentId, agentData);
      } else {
        savedAgent = await createAgent(agentData);
      }
      if (savedAgent) {
        navigateTo('agentDetail', { id: savedAgent.id });
      } else {
         setError(isEditMode ? 'Failed to update agent.' : 'Failed to create agent.');
      }
    } catch (err) {
      console.error(err);
      setError(`An error occurred: ${ (err as Error).message }`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          {isEditMode ? 'Edit Agent' : 'Create New Agent'}
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          {isEditMode ? `Modify the details for "${name || 'this agent'}"` : 'Fill in the details to set up your new AI agent.'}
        </p>
      </header>

      <Card className="max-w-2xl mx-auto !p-6 md:!p-8 dark:!bg-slate-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 dark:text-red-400 text-sm p-3 bg-red-100 dark:bg-red-900/30 rounded-md">{error}</p>}
          
          <div>
            <label htmlFor="agentName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Agent Name
            </label>
            <input
              type="text"
              id="agentName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              placeholder="e.g., Customer Support Pro"
            />
          </div>

          <div>
            <label htmlFor="agentDescription" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              id="agentDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              placeholder="Describe what this agent does, its goals, etc."
            />
          </div>

          <div>
            <label htmlFor="agentStatus" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              id="agentStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value as AgentStatus)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              {AGENT_STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <fieldset className="border border-slate-300 dark:border-slate-600 p-4 rounded-md">
            <legend className="text-sm font-medium text-slate-700 dark:text-slate-300 px-1">Performance Metrics (Simulated)</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                 <div>
                    <label htmlFor="tasksCompleted" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Tasks Completed</label>
                    <input type="number" id="tasksCompleted" value={tasksCompleted} onChange={e => setTasksCompleted(Number(e.target.value))} className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-500 rounded-md sm:text-sm bg-white dark:bg-slate-700"/>
                 </div>
                 <div>
                    <label htmlFor="successRate" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Success Rate (%)</label>
                    <input type="number" id="successRate" value={successRate} min="0" max="100" onChange={e => setSuccessRate(Number(e.target.value))} className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-500 rounded-md sm:text-sm bg-white dark:bg-slate-700"/>
                 </div>
                 <div>
                    <label htmlFor="avgResponseTime" className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Avg. Response (ms)</label>
                    <input type="number" id="avgResponseTime" value={avgResponseTime} onChange={e => setAvgResponseTime(Number(e.target.value))} className="w-full px-2 py-1.5 border border-slate-300 dark:border-slate-500 rounded-md sm:text-sm bg-white dark:bg-slate-700"/>
                 </div>
            </div>
          </fieldset>


          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => navigateTo(agentId ? 'agentDetail' : 'agentList', agentId ? {id: agentId} : {})} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create Agent')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AgentFormPage;
