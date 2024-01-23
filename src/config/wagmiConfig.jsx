// Create Configuration File: (https://wagmi.sh/react/getting-started).
import { http, createConfig } from "wagmi";
import { mainnet, arbitrum, base, goerli, iotex, polygon } from "viem/chains";
import {
  walletConnect,
  metaMask,
  injected,
  coinbaseWallet,
} from "wagmi/connectors";
import { Buffer } from "buffer";
const projectId = import.meta.env.VITE_PROJECT_ID;

if (window.Buffer === undefined) {
  window.Buffer = Buffer;
} // i did this to prevent the buffer error (buffer is not defined) with the coinbase wallet connector

export const config = createConfig({
  chains: [mainnet, polygon],
  connectors: [
    coinbaseWallet({
      appName: "Wagmi Tutorial",
      appLogoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHd5Dow5i4vlXbOnZKPcJ1N6UMIadlJuep1HrUm16pWg&s",
      // darkMode: true,
      // reloadOnDisconnect: true, : default is false
    }),
    injected(),
    walletConnect({
      projectId: projectId,
      metadata: {
        name: "Wagmi Tutorial",
        description: "Wagmi Tutorial Website",
        url: "https://wagmitutorial.com",
        icons: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHd5Dow5i4vlXbOnZKPcJ1N6UMIadlJuep1HrUm16pWg&s",
        ],
      },
      qrModalOptions: {
        themeMode: "dark",
      },
    }),
    metaMask(),
  ],
  // multiInjectedProviderDiscovery: false, // Enables discovery of injected providers via EIP-6963 using the mipd library and converting to injected connectors.
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    // [arbitrum.id]: http(),
    // [base.id]: http(),
  },
});
