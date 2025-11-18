import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const requestCountRef = useRef(0);

  const showLoading = () => {
    requestCountRef.current += 1;
    if (requestCountRef.current > 0) {
      setIsLoading(true);
    }
  };

  const hideLoading = () => {
    requestCountRef.current = Math.max(0, requestCountRef.current - 1);
    if (requestCountRef.current === 0) {
      setIsLoading(false);
    }
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    requestCountRef.current = loading ? 1 : 0;
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, showLoading, hideLoading, setLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
