import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { storage } from "../config/session";

const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>{address ? <span>{address} </span> : " "}</div>
      <button onClick={() => disconnect()}>Disconnect</button>
    </>
  );
};

export default Account;
