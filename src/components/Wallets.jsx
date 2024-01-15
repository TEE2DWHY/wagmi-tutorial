import { useConnect } from "wagmi";

const Wallets = () => {
  const { connect, connectors } = useConnect();
  return (
    <>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => {
            connect({ connector });
          }}
        >
          {connector.name}
        </button>
      ))}
    </>
  );
};

export default Wallets;
