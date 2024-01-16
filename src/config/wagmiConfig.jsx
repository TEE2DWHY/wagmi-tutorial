// Create Configuration File: (https://wagmi.sh/react/getting-started).
import { http, createConfig } from "wagmi";
import { mainnet, arbitrum, base } from "viem/chains";
import { walletConnect, metaMask, injected } from "wagmi/connectors";

const projectId = import.meta.env.VITE_PROJECT_ID;

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected(), walletConnect({ projectId }), metaMask()],
  transports: {
    [mainnet.id]: http(),
    // [arbitrum.id]: http(),
    // [base.id]: http(),
  },
});
