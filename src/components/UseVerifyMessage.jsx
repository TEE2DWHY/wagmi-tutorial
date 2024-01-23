import { useVerifyMessage, useSignMessage } from "wagmi";
const UseVerifyMessage = () => {
  const { isSuccess: isSigned } = useSignMessage();
  const { data, error } = useVerifyMessage({
    address: "0x....",
    message: "Web3 Way",
    signature: "0x...",
  });
  error && console.log(error);
  return isSigned && data;
};

export default UseVerifyMessage;
