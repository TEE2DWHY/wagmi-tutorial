// styling
import "./App.css";
// wagmi import(s)
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// wagmi config file
import { config } from "./config/wagmiConfig";
import ConnectWallet from "./components/ConnectWallet";
import SendTransaction from "./components/SendTransaction";
import ReadContract from "./components/ReadContract";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />
          <SendTransaction />
          <ReadContract />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
