import { mainnet } from "viem/chains";
import { useToken, useAccount } from "wagmi";

const UseToken = () => {
  const { isConnected } = useAccount();
  const { isLoading, data: result } = useToken({
    chainId: mainnet.id,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", //usdt contract address
    formatUnits: "ether",
  });

  const { address, decimals, name, symbol, totalSupply } = isLoading
    ? {}
    : result;

  return (
    isConnected && (
      <div>
        <p>Address: {address}</p>
        <p>Decimals: {decimals}</p>
        <p>Name: {name}</p>
        <p>Symbol: {symbol}</p>
        <p>Total Supply: {totalSupply && totalSupply.formatted}</p>
      </div>
    )
  );
};

export default UseToken;
