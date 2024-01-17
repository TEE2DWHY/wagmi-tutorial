import { useConnect } from "wagmi";
import { Button } from "antd";
import { useState } from "react";
const Wallets = () => {
  const { connect, connectors } = useConnect();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <Button
        type="default"
        onClick={showModal}
        style={{ marginBottom: "20px" }}
      >
        {isModalOpen ? "Hide Wallets" : "Show Wallets"}
      </Button>
      {isModalOpen &&
        connectors.map((connector) => (
          <div
            style={{ marginBottom: "20px" }}
            key={connector.uid}
            onClick={() => {
              connect({ connector });
            }}
          >
            <button>{connector.name}</button>
          </div>
        ))}
    </>
  );
};

export default Wallets;
