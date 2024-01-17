import { useReadContract } from "wagmi";
import { abi } from "../utils/abi";
import { mainnet } from "viem/chains";
// import { config } from "../config/wagmiConfig";
const ReadContract = () => {
  const { data: contractDetails, isLoading } = useReadContract({
    abi,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    functionName: "balanceOf", // for totalSupply it would be: functionName: "totalSupply",
    args: ["0x3426D106f5de9ac55cCA854BecEd616951360596"], // to see the balance of a particular address we pass it as argument.
    //  config,  - add this incase you want to retrieve data instead of using the nearest wagmi provider
    // blockNumber: 17829139n, - this allows us to access the data of address@arg at a given block number (more like fetching for historical data and not the current state of the blockchain)
    // blockTag: "latest", - this allows us to access data at a given block-tag (this could be latest, safe( safe means we want to get thee data at a block considered safe), earliest, pending, finalized).
    chainId: mainnet.id, // specify the chainID if necessary
  });

  const result = isLoading || !contractDetails ? " " : contractDetails;
  console.log(result);
  return result;
};

export default ReadContract;
