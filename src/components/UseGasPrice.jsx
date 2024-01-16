import { mainnet } from "viem/chains";
import { useGasPrice } from "wagmi";

const UseGasPrice = () => {
  const { data: gasPriceDetails, isLoading: gasPriceLoading } = useGasPrice({
    chainId: mainnet.id,
  });
  const gasPrice = gasPriceLoading || !gasPriceDetails ? " " : gasPriceDetails;
  return gasPrice;
};

export default UseGasPrice;
