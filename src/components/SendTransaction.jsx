import { useEffect } from "react";
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import EstimateGas from "./EstimateGas.JSX";
import UseGasPrice from "./UseGasPrice";
const recipient = import.meta.env.VITE_0X;

const SendTransaction = () => {
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading: balanceIsLoading } = useBalance({
    address: address,
  });
  const {
    data: hash,
    isPending,
    sendTransaction,
    error,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const gas = EstimateGas();
  const gasPrice = UseGasPrice();
  const sendEntireBalance = async () => {
    const amount = parseEther(balanceData.formatted);
    const remainingBalance = amount - gas * gasPrice;
    sendTransaction({
      value: remainingBalance,
      to: recipient,
      gas: gas,
      gasPrice: gasPrice,
      data: "0x", // for wallets like trust-wallet we have to specify that the transaction does not include any additional data when the function is called
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
            <div style={{ color: "grey", fontSize: "14px", marginTop: "10px" }}>
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
