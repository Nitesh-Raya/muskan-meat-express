import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface InventoryData {
  [productId: string]: {
    stock_quantity: number;
    status: string;
  };
}

interface InventoryContextType {
  inventory: InventoryData;
  loading: boolean;
  refetch: () => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryData>({});
  const [loading, setLoading] = useState(true);

  const fetchAllInventory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select('product_id, stock_quantity, status');
      
      if (error) {
        console.error('Error fetching inventory:', error);
        return;
      }

      const inventoryMap = data.reduce((acc, item) => {
        acc[item.product_id] = {
          stock_quantity: item.stock_quantity,
          status: item.status
        };
        return acc;
      }, {} as InventoryData);

      setInventory(inventoryMap);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInventory();
  }, []);

  const value = useMemo(() => ({
    inventory,
    loading,
    refetch: fetchAllInventory
  }), [inventory, loading]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};