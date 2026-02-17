// API Client Hook for easy integration with external services
// This structure allows for easy integration of AI chatbot, blockchain, and geofencing APIs

import { useState, useCallback } from 'react';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

export interface ChatbotMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface BlockchainTransaction {
  id: string;
  userId: string;
  type: 'identity_verification' | 'location_update' | 'emergency_alert';
  data: any;
  hash: string;
  timestamp: Date;
}

export interface GeofenceAlert {
  id: string;
  userId: string;
  location: { lat: number; lng: number };
  alertType: 'entering_danger_zone' | 'leaving_safe_zone' | 'emergency_area';
  timestamp: Date;
}

class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string = '', apiKey: string = '') {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  // AI Chatbot API
  async sendChatMessage(message: string, userId: string): Promise<ChatbotMessage> {
    // Implementation for AI chatbot integration
    // This would connect to your AI service (OpenAI, Anthropic, etc.)
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ message, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to send chat message');
    }

    return response.json();
  }

  // Blockchain API
  async createBlockchainTransaction(
    userId: string, 
    type: BlockchainTransaction['type'], 
    data: any
  ): Promise<BlockchainTransaction> {
    // Implementation for blockchain integration
    // This would connect to your blockchain service
    const response = await fetch(`${this.baseUrl}/api/blockchain/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ userId, type, data }),
    });

    if (!response.ok) {
      throw new Error('Failed to create blockchain transaction');
    }

    return response.json();
  }

  async verifyBlockchainId(blockchainId: string): Promise<boolean> {
    // Verify blockchain ID authenticity
    const response = await fetch(`${this.baseUrl}/api/blockchain/verify/${blockchainId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to verify blockchain ID');
    }

    const result = await response.json();
    return result.valid;
  }

  // Geofencing API
  async checkGeofence(
    location: { lat: number; lng: number }, 
    userId: string
  ): Promise<GeofenceAlert[]> {
    // Implementation for geofencing service
    const response = await fetch(`${this.baseUrl}/api/geofence/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ location, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to check geofence');
    }

    return response.json();
  }

  async createGeofenceAlert(alert: Omit<GeofenceAlert, 'id'>): Promise<GeofenceAlert> {
    // Create geofence alert
    const response = await fetch(`${this.baseUrl}/api/geofence/alert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(alert),
    });

    if (!response.ok) {
      throw new Error('Failed to create geofence alert');
    }

    return response.json();
  }

  // Emergency API
  async triggerEmergencyAlert(
    userId: string, 
    location: { lat: number; lng: number }, 
    emergencyType: string
  ): Promise<{ success: boolean; alertId: string }> {
    const response = await fetch(`${this.baseUrl}/api/emergency/alert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ userId, location, emergencyType }),
    });

    if (!response.ok) {
      throw new Error('Failed to trigger emergency alert');
    }

    return response.json();
  }
}

// Custom hooks for API integration
export const useApiClient = () => {
  // This would be configured with your actual API endpoints and keys
  const apiClient = new ApiClient(
    process.env.REACT_APP_API_BASE_URL || '',
    process.env.REACT_APP_API_KEY || ''
  );

  return apiClient;
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const apiClient = useApiClient();

  const sendMessage = useCallback(async (message: string, userId: string) => {
    setLoading(true);
    try {
      const userMessage: ChatbotMessage = {
        id: Date.now().toString(),
        message,
        sender: 'user',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      const botResponse = await apiClient.sendChatMessage(message, userId);
      setMessages(prev => [...prev, botResponse]);
      
      return botResponse;
    } catch (error) {
      console.error('Error sending chat message:', error);
      // Add error message to chat
      const errorMessage: ChatbotMessage = {
        id: Date.now().toString(),
        message: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    clearMessages,
  };
};

export const useBlockchain = () => {
  const [loading, setLoading] = useState(false);
  const apiClient = useApiClient();

  const createTransaction = useCallback(async (
    userId: string, 
    type: BlockchainTransaction['type'], 
    data: any
  ) => {
    setLoading(true);
    try {
      const transaction = await apiClient.createBlockchainTransaction(userId, type, data);
      return { data: transaction, error: null };
    } catch (error) {
      console.error('Blockchain transaction error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  const verifyId = useCallback(async (blockchainId: string) => {
    setLoading(true);
    try {
      const isValid = await apiClient.verifyBlockchainId(blockchainId);
      return { data: isValid, error: null };
    } catch (error) {
      console.error('Blockchain verification error:', error);
      return { data: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  return {
    loading,
    createTransaction,
    verifyId,
  };
};

export const useGeofencing = () => {
  const [alerts, setAlerts] = useState<GeofenceAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const apiClient = useApiClient();

  const checkLocation = useCallback(async (
    location: { lat: number; lng: number }, 
    userId: string
  ) => {
    setLoading(true);
    try {
      const newAlerts = await apiClient.checkGeofence(location, userId);
      setAlerts(prev => [...prev, ...newAlerts]);
      return { data: newAlerts, error: null };
    } catch (error) {
      console.error('Geofencing check error:', error);
      return { data: [], error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  const triggerEmergency = useCallback(async (
    userId: string, 
    location: { lat: number; lng: number }, 
    emergencyType: string
  ) => {
    setLoading(true);
    try {
      const result = await apiClient.triggerEmergencyAlert(userId, location, emergencyType);
      return { data: result, error: null };
    } catch (error) {
      console.error('Emergency alert error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  return {
    alerts,
    loading,
    checkLocation,
    triggerEmergency,
  };
};

export default ApiClient;