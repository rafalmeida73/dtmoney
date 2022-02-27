import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { api } from "../services/api";

interface TransactionInput {
  title: string;
  amount: number;
  category: string;
  type: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  createNewTransaction: (data: TransactionInput) => Promise<void>;
}

interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

const TransactionContext = createContext({} as TransactionContextType);

const TransactionProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response?.data?.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const createNewTransaction = async (data: TransactionInput) => {
    try {
      const response = await api.post("/transactions", {
        ...data,
        createdAt: new Date(),
      });
      setTransactions([...transactions, response?.data?.transaction]);
    } catch (error) {
      console.log(error);
    }
  };

  const value = useMemo(
    () => ({
      transactions,
      createNewTransaction,
    }),
    [transactions]
  );

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

const useTransactionContext = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("No context on TransactionContext");
  }
  return context;
};

export { useTransactionContext };
export default TransactionProvider;
