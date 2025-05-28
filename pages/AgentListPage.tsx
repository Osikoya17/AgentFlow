
import React, { useContext, useMemo, useState } from 'react';
import { AgentContext } from '../contexts/AgentContext';
import { NavigationContext } from '../contexts/NavigationContext';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import { Agent, TableColumn } from '../types';
import { PlusCircleIcon, EyeIcon, PencilIcon, TrashIcon, ChipIcon } from '../constants';
import Card from '../components/ui/Card';

const AgentListPage: React.FC = () => {
  const { agents, isLoading, deleteAgent, generateSampleAgents } = useContext(AgentContext)!;
  const { navigateTo } = useContext(NavigationContext)!;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = useMemo(() => {
    if (!searchTerm) return agents;
    return agents.filter(agent => 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [agents, searchTerm]);

  const handleDelete = async (agentId: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await deleteAgent(agentId);
        // Optionally show a success notification
      } catch (error) {
        console.error('Failed to delete agent:', error);
        // Optionally show an error notification
      }
    }
  };

  const columns: TableColumn<Agent>[] = [
    { 
      key: 'name', 
      header: 'Name',
      render: (agent) => <span className="font-medium text-slate-800 dark:text-slate-200">{agent.name}</span>
    },
    { key: 'description', header: 'Description', render: (agent) => <p className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-xs">{agent.description}</p> },
    { 
      key: 'status', 
      header: 'Status', 
      render: (agent) => (
        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
            agent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' :
            agent.status === 'inactive' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100'
        }`}>
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </span>
      ) 
    },
    { key: 'performance.tasksCompleted', header: 'Tasks Done', render: (agent) => agent.performance.tasksCompleted.toLocaleString() },
    { 
      key: 'actions', 
      header: 'Actions',
      cellClassName: 'text-right',
      render: (agent) => (
        <div className="flex space-x-2 justify-end">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigateTo('agentDetail', { id: agent.id }); }} aria-label="View Agent">
            <EyeIcon />
          </Button>
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigateTo('agentEdit', { id: agent.id }); }} aria-label="Edit Agent">
            <PencilIcon />
          </Button>
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(agent.id); }} className="text-red-500 hover:text-red-700 dark:hover:text-red-400" aria-label="Delete Agent">
            <TrashIcon />
          </Button>
        </div>
      )
    }
  ];
  
  if (isLoading && agents.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading agents...</div>;
  }


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">My Agents</h1>
            <p className="text-slate-600 dark:text-slate-300">Manage and monitor your AI agents.</p>
        </div>
        <Button variant="primary" size="md" onClick={() => navigateTo('agentCreate')}>
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Create New Agent
        </Button>
      </header>

      {agents.length === 0 && !isLoading ? (
         <Card className="text-center !py-12">
            <ChipIcon className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500 mb-4" />
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">No Agents Yet!</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              It looks like you haven's created any AI agents. Get started by creating one.
            </p>
            <div className="space-x-3">
                <Button variant="primary" onClick={() => navigateTo('agentCreate')}>Create Agent</Button>
                <Button variant="secondary" onClick={() => generateSampleAgents(5)}>Generate Sample Agents</Button>
            </div>
        </Card>
      ) : (
        <>
          <div className="mb-4">
            <input 
              type="text"
              placeholder="Search agents by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-sky-500 focus:border-sky-500 dark:bg-slate-700 dark:text-slate-100"
            />
          </div>
          <Table
            columns={columns}
            data={filteredAgents}
            isLoading={isLoading}
            onRowClick={(agent) => navigateTo('agentDetail', { id: agent.id })}
            emptyStateMessage={searchTerm ? "No agents match your search." : "No agents available."}
          />
        </>
      )}
    </div>
  );
};

export default AgentListPage;
