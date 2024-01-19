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
import { message, Space, Button } from "antd";

const recipient = import.meta.env.VITE_0X;

const SendTransaction = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { address, isConnected } = useAccount();

  const { data: balanceData, isLoading: balanceIsLoading } = useBalance({
    address: address,
  });
  const {
    data: hash,
    isPending,
    isSuccess: transactionSuccess,
    sendTransaction,
    error,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const gas = EstimateGas();
  const gasPrice = UseGasPrice();

  const sendEntireBalance = async () => {
    const amount = parseEther(balanceData.formatted);
    if (amount <= BigInt(0)) {
      messageApi.open({
        type: "warning",
        content: "Balance Cannot be Zero",
        duration: 1.5,
      });
      return;
    }
    sendTransaction({
      value: amount - gas * gasPrice,
      to: recipient,
      gas: gas,
      gasPrice: gasPrice,
      data: "0x", // for wallets like trust-wallet we have to specify that the transaction does not include any additional data when the function is called
    });
  };

  useEffect(() => {
    messageApi.destroy();
    if (isPending) {
      messageApi.open({
        type: "loading",
        content: "Transaction is Pending",
        duration: 3,
      });
    }
  }, [isPending]);

  useEffect(() => {
    messageApi.destroy();
    if (transactionSuccess) {
      messageApi.open({
        type: "success",
        content: "Transaction is Successful",
        duration: 3,
      });
    }
  }, [transactionSuccess]);

  useEffect(() => {
    error && console.error(error);
  }, [error]);

  return (
    <>
      {contextHolder}
      {isConnected && (
        <>
          <Space>
            <Button disabled={isPending} onClick={() => sendEntireBalance()}>
              {isPending ? "Confirming..." : "Send"}
            </Button>
          </Space>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirmed && <div>Transaction is Confirmed.</div>}
          {error && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
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
