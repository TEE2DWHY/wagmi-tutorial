import { useSignMessage, useAccount } from "wagmi";
import { message, Space } from "antd";
import { useEffect } from "react";

const UseSigning = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isConnected } = useAccount();
  const {
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

  const data = "Welcome to DVO where voting power is retained.";
  return (
    <>
      {isConnected && (
        <>
          {contextHolder}
          <Space>
            <button onClick={() => signMessage({ message: data })}>
              Sign Message
            </button>
          </Space>
        </>
      )}
    </>
  );
};

export default UseSigning;
