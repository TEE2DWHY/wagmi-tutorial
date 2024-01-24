import { useChainId } from "wagmi";
const UseChainId = () => {
  const chainId = useChainId();
  return chainId;
};

export default UseChainId;
