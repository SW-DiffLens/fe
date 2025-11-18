import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { setLoadingCallbacks } from "./api/client";
import { LoadingSpinner } from "./components/loading-spinner";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import { router } from "./routes";

function AppContent() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingCallbacks(showLoading, hideLoading);
  }, [showLoading, hideLoading]);

  return (
    <>
      <LoadingSpinner />
      <RouterProvider router={router} />
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
