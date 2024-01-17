import { useReadContract } from "wagmi";
import { abi } from "../utils/abi";
// import { config } from "../config/wagmiConfig";
const ReadContract = () => {
  const { data: contractDetails, isLoading } = useReadContract({
    abi,
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    functionName: "balanceOf", // for totalSupply it would be: functionName: "totalSupply",
    args: ["0xdAC17F958D2ee523a2206206994597C13D831ec7"],
    // config, // add this incase you want to retrieve data instead of using the nearest wagmi provider
  });

  const result = isLoading || !contractDetails ? " " : contractDetails;
  return result;
};

export default ReadContract;
