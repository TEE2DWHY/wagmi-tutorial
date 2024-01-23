// styling
import "./App.css";
// wagmi import(s)
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// wagmi config file
import { config } from "./config/wagmiConfig";
import ConnectWallet from "./components/ConnectWallet";
import SendTransaction from "./components/SendTransaction";
import WriteContract from "./components/WriteContract";
import UseToken from "./components/UseToken";
import UseSigning from "./components/UseSigning";
import SwitchChains from "./components/SwitchChains";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />
          {/* <SendTransaction /> */}
          {/* <WriteContract /> */}
          {/* <UseToken /> */}
          <UseSigning />
          {/* <SwitchChains /> */}
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
