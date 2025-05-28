
import React, { useContext, useEffect, useMemo, useCallback } from 'react';
import Button from '../components/ui/Button';
import { AuthContext } from '../contexts/AuthContext';
import { NavigationContext } from '../contexts/NavigationContext';
import { AgentContext } from '../contexts/AgentContext';
import { Agent, KpiCardData, BarChartDataItem, TableColumn } from '../types';
import KpiCard from '../components/analytics/KpiCard';
import SimpleBarChart from '../components/analytics/SimpleBarChart';
import Table from '../components/ui/Table';
import { ChipIcon, PlusCircleIcon, UsersIcon, CheckCircleIcon, BoltIcon, EyeIcon, PencilIcon, TrashIcon } from '../constants';

const DashboardPage: React.FC = () => {
  const { logoutUser } = useContext(AuthContext)!;
  const { navigateTo } = useContext(NavigationContext)!;
  const { agents, isLoading: agentsLoading, generateSampleAgents, deleteAgent } = useContext(AgentContext)!;

  useEffect(() => {
    // Optional: if no agents, generate some samples for demo
    if (!agentsLoading && agents.length === 0) {
       // generateSampleAgents(3); // You might want to make this user-triggered
    }
  }, [agents, agentsLoading, generateSampleAgents]);

  const analyticsData = useMemo(() => {
    if (agentsLoading || agents.length === 0) {
      return {
        kpis: [
          { title: 'Total Agents', value: 0, icon: <ChipIcon className="w-5 h-5"/> },
          { title: 'Active Agents', value: 0, icon: <UsersIcon className="w-5 h-5"/> },
          { title: 'Tasks This Month', value: 0, icon: <BoltIcon className="w-5 h-5"/> },
          { title: 'Avg. Success Rate', value: '0%', icon: <CheckCircleIcon className="w-5 h-5"/> },
        ],
        agentTaskDistribution: [],
      };
    }

    const totalAgents = agents.length;
    const activeAgents = agents.filter(a => a.status === 'active').length;
    const totalTasksCompleted = agents.reduce((sum, agent) => sum + agent.performance.tasksCompleted, 0);
    const averageSuccessRate = totalAgents > 0 
      ? (agents.reduce((sum, agent) => sum + agent.performance.successRate, 0) / totalAgents).toFixed(1) + '%'
      : '0%';

    const kpis: KpiCardData[] = [
      { title: 'Total Agents', value: totalAgents, icon: <ChipIcon className="w-5 h-5"/> },
      { title: 'Active Agents', value: activeAgents, icon: <UsersIcon className="w-5 h-5"/> },
      { title: 'Total Tasks Processed', value: totalTasksCompleted.toLocaleString(), icon: <BoltIcon className="w-5 h-5"/> },
      { title: 'Avg. Success Rate', value: averageSuccessRate, icon: <CheckCircleIcon className="w-5 h-5"/> },
    ];

    const agentTaskDistribution: BarChartDataItem[] = agents.slice(0, 10).map(agent => ({ // Show top 10 or so
      label: agent.name.length > 15 ? agent.name.substring(0,12) + '...' : agent.name,
      value: agent.performance.tasksCompleted,
    }));

    return { kpis, agentTaskDistribution };
  }, [agents, agentsLoading]);
  
  const recentAgents = useMemo(() => agents.slice(0, 3), [agents]);

  const handleDelete = useCallback(async (agentId: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await deleteAgent(agentId);
        // AgentContext will trigger a re-render, updating the list
      } catch (error) {
        console.error('Failed to delete agent from dashboard:', error);
        alert('Failed to delete agent. Please try again.');
      }
    }
  }, [deleteAgent]);

  const agentTableColumns: TableColumn<Agent>[] = [
    { key: 'name', header: 'Name', render: (agent) => <span className="font-medium text-slate-800 dark:text-slate-200">{agent.name}</span>},
    { key: 'status', header: 'Status', render: (agent) => (
        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
            agent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' :
            agent.status === 'inactive' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100'
        }`}>
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </span>
    )},
    { key: 'performance.tasksCompleted', header: 'Tasks Done', render: (agent) => agent.performance.tasksCompleted.toLocaleString() },
    { 
      key: 'actions', 
      header: 'Actions',
      cellClassName: 'text-right',
      render: (agent) => (
        <div className="flex space-x-1 justify-end">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigateTo('agentDetail', { id: agent.id }); }} aria-label="View Agent">
            <EyeIcon className="w-4 h-4"/>
          </Button>
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); navigateTo('agentEdit', { id: agent.id }); }} aria-label="Edit Agent">
            <PencilIcon className="w-4 h-4"/>
          </Button>
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(agent.id); }} className="text-red-500 hover:text-red-700 dark:hover:text-red-400" aria-label="Delete Agent">
            <TrashIcon className="w-4 h-4"/>
          </Button>
        </div>
      )
    }
  ];


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">Welcome to your AgentFlow dashboard.</p>
        </div>
        <Button 
            variant="primary" 
            size="md" 
            onClick={() => navigateTo('agentCreate')}
            className="mt-4 sm:mt-0"
        >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Create New Agent
        </Button>
      </header>

      {/* Analytics KPI Cards */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData.kpis.map(kpi => (
            <KpiCard key={kpi.title} data={kpi} />
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <section className="mb-8">
         <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">Agent Performance</h2>
        <SimpleBarChart 
            data={analyticsData.agentTaskDistribution} 
            title="Tasks Completed per Agent (Top 10)" 
            className="h-80" // Adjust height as needed
        />
      </section>
      
      {/* Recent Agents Summary */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Recent Agents</h2>
            <Button variant="link" onClick={() => navigateTo('agentList')}>View All Agents</Button>
        </div>
        {agentsLoading ? (
             <p className="text-slate-500 dark:text-slate-400">Loading agents...</p>
        ) : recentAgents.length > 0 ? (
            <Table
                columns={agentTableColumns}
                data={recentAgents}
                onRowClick={(agent) => navigateTo('agentDetail', { id: agent.id })}
            />
        ) : (
            <div className="text-center py-8 bg-white dark:bg-slate-800 rounded-lg shadow">
                <ChipIcon className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-500 mb-2" />
                <p className="text-slate-600 dark:text-slate-400 mb-3">No agents found yet.</p>
                <Button variant="secondary" onClick={() => navigateTo('agentCreate')}>Create Your First Agent</Button>
                <Button variant="ghost" onClick={() => generateSampleAgents(5)} className="ml-2">Generate Sample Agents</Button>
            </div>
        )}
      </section>

      <div className="mt-12 text-center">
        <Button variant="secondary" onClick={logoutUser}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
