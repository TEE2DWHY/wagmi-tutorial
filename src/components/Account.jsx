import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { storage } from "../config/session";

const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        {address ? (
          <div style={{ marginBottom: "20px" }}>
            User Address: {`${address.slice(0, 4)}...${address.slice(38)}`}
          </div>
        ) : (
          " "
        )}
      </div>
      <button onClick={() => disconnect()} style={{ marginRight: "10px" }}>
        Disconnect
      </button>
    </>
  );
};

export default Account;
