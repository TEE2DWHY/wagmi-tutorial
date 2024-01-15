import Wallets from "./Wallets";
import Account from "./Account";
import { useAccount } from "wagmi";

const ConnectWallet = () => {
  const { isConnected } = useAccount();

  return <>{isConnected ? <Account /> : <Wallets />}</>;
};

export default ConnectWallet;
