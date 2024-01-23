import { useSignMessage, useAccount, useVerifyMessage } from "wagmi";
import { message, Space } from "antd";
import { useEffect } from "react";

const UseSigning = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isConnected, address } = useAccount();
  const {
    data: signature,
    signMessage,
    isSuccess: isSigned,
    isPending: isLoading,
    error,
  } = useSignMessage();

  useEffect(() => {
    messageApi.destroy();
    isLoading &&
      messageApi.open({
        type: "loading",
        content: "Signing....",
        duration: 2,
      });
  }, [isLoading]);

  useEffect(() => {
    messageApi.destroy();
    isSigned &&
      messageApi.open({
        type: "success",
        content: "Authenticated.",
        duration: 2,
      });
  });

  useEffect(() => {
    messageApi.destroy();
    error &&
      messageApi.open({
        type: "error",
        content: error.shortMessage,
        duration: 2,
      });
  }, [error]);
  // message note
  const note = "Welcome to DVO where voting power is retained.";
  // verify message after signing
  const verifyMessage = useVerifyMessage({
    address: address,
    message: note,
    signature: signature,
  });
  isSigned && console.log("messageVerification:", verifyMessage.data);
  return (
    <>
      {isConnected && (
        <>
          {contextHolder}
          <Space>
            <button onClick={() => signMessage({ message: note })}>
              Sign Message
            </button>
          </Space>
          {isSigned && (
            <p style={{ fontWeight: "bold" }}>
              Signature: {`${signature.slice(0, 4)}...${signature.slice(128)}`}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default UseSigning;
