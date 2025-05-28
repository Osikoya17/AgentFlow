import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Agent, AgentContextType, AgentStatus, AgentPerformanceMetrics } from '../types';

export const AgentContext = createContext<AgentContextType | undefined>(undefined);

interface AgentProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = 'agentflow-agents';

// Helper to generate unique IDs
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Helper for sample data
const createSampleAgent = (id: string, index: number): Agent => {
  const statuses: AgentStatus[] = ['active', 'inactive', 'draft'];
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const createdAt = new Date(now.setDate(now.getDate() - daysAgo)).toISOString();
  
  return {
    id,
    name: `Sample Agent ${index + 1}`,
    description: `This is a sample description for agent ${index + 1}. It is configured to perform various tasks.`,
    status: statuses[index % statuses.length],
    createdAt: createdAt,
    updatedAt: createdAt,
    performance: {
      tasksCompleted: Math.floor(Math.random() * 1000),
      successRate: Math.floor(Math.random() * 30) + 70, // 70-100%
      averageResponseTime: Math.floor(Math.random() * 500) + 100, // 100-600ms
    },
    config: {
      targetObjective: "Automate customer inquiries",
      sensitivityLevel: Math.random() > 0.5 ? "high" : "medium",
    }
  };
};


export const AgentProvider: React.FC<AgentProviderProps> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedAgents = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedAgents) {
        setAgents(JSON.parse(storedAgents));
      } else {
        // Initialize with a few sample agents if none are stored
        const sampleAgents = Array.from({ length: 3 }, (_, i) => createSampleAgent(generateId(), i));
        setAgents(sampleAgents);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleAgents));
      }
    } catch (error) {
      console.error("Failed to load agents from localStorage:", error);
      // Fallback to empty or default agents
      setAgents([]);
    }
    setIsLoading(false);
  }, []);

  const saveAgents = useCallback((updatedAgents: Agent[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedAgents));
    setAgents(updatedAgents);
  }, []);

  const getAgentById = useCallback((id: string) => {
    return agents.find(agent => agent.id === id);
  }, [agents]);

  const createAgent = useCallback(async (agentData: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'performance'> & { performance?: Partial<AgentPerformanceMetrics> }): Promise<Agent> => {
    const newAgent: Agent = {
      id: generateId(),
      ...agentData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      performance: { // Default performance metrics
          tasksCompleted: agentData.performance?.tasksCompleted ?? 0,
          successRate: agentData.performance?.successRate ?? 0,
          averageResponseTime: agentData.performance?.averageResponseTime ?? 0,
          ...(agentData.performance || {}),
      },
    };
    const updatedAgents = [...agents, newAgent];
    saveAgents(updatedAgents);
    return newAgent;
  }, [agents, saveAgents]);

  const updateAgent = useCallback(async (id: string, updates: Partial<Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Agent | undefined> => {
    let updatedAgent: Agent | undefined;
    const updatedAgents = agents.map(agent => {
      if (agent.id === id) {
        updatedAgent = { ...agent, ...updates, updatedAt: new Date().toISOString() };
        return updatedAgent;
      }
      return agent;
    });
    if (updatedAgent) {
      saveAgents(updatedAgents);
    }
    return updatedAgent;
  }, [agents, saveAgents]);

  const deleteAgent = useCallback(async (id: string): Promise<void> => {
    const updatedAgents = agents.filter(agent => agent.id !== id);
    saveAgents(updatedAgents);
  }, [agents, saveAgents]);

  const generateSampleAgents = useCallback((count: number) => {
      const newSamples = Array.from({ length: count }, (_, i) => createSampleAgent(generateId(), agents.length + i));
      const combinedAgents = [...agents, ...newSamples];
      saveAgents(combinedAgents);
  }, [agents, saveAgents]);


  return (
    <AgentContext.Provider value={{ agents, isLoading, getAgentById, createAgent, updateAgent, deleteAgent, generateSampleAgents }}>
      {children}
    </AgentContext.Provider>
  );
};
