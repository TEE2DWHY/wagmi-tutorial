import { useSwitchChain, useAccount } from "wagmi";
const SwitchChains = () => {
  const { isConnected } = useAccount();
  const { switchChain, error } = useSwitchChain();
  error && console.log(error);
  return (
    isConnected && (
      <>
        <button onClick={() => switchChain({ chainId: 137 })}>
          Switch Chain to Polygon
        </button>
        {error && <div>{error.shortMessage || error.message}</div>}
      </>
    )
  );
};

export default SwitchChains;
