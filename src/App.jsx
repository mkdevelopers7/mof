import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./ui/AppLayout";

const queyClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queyClient}>
      <AppLayout />
    </QueryClientProvider>
  );
}

export default App;
