import { useEffect, useState } from "react";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { abi } from "../utils/abi";
import { message } from "antd";

const WriteContract = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { address } = useAccount();
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const { isSuccess: transactionSuccess } = useWaitForTransactionReceipt();
  const [tokenId, setTokenId] = useState("");
  const mintNft = (event) => {
    event.preventDefault();
    writeContract({
      address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2", // Contract address(Contract must support minting)
      abi, // ABI (Application Binary Interface) of the contract
      functionName: "mint", // Name of the function to be called (mint, in this case)
      args: [BigInt(tokenId)], // Arguments to be passed to the mint function
      account: address, // Account address from useAccount hook
    });
  };

  useEffect(() => {
    messageApi.destroy();
    isPending &&
      messageApi.open({
        type: "loading",
        content: "Transaction is Pending",
        duration: 1.5,
      });
  }, [isPending]);

  useEffect(() => {
    messageApi.destroy();
    transactionSuccess &&
      messageApi.open({
        type: "success",
        content: "Transaction is Successful",
        duration: 1.5,
      });
  }, [transactionSuccess]);

  useEffect(() => {
    messageApi.destroy();
    error &&
      messageApi.open({
        type: "error",
        content: error.shortMessage,
        duration: 3,
      });
  }, [error]);

  return (
    <>
      {contextHolder}
      <form onSubmit={mintNft}>
        <input
          name="tokenId"
          placeholder="69420"
          onChange={(e) => {
            e.preventDefault();
            setTokenId(e.target.value);
          }}
          required
        />
        <button type="submit">{isPending ? "Minting..." : "Mint"}</button>
        {hash && <span>Transaction Hash: {hash}</span>}
      </form>
    </>
  );
};

export default WriteContract;
