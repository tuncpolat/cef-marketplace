import web3 from "./web3";
import ClosedEndFund from "../../build/contracts/ClosedEndFund.json";

export default (address) => {
  return new web3.eth.Contract(ClosedEndFund.abi, address);
};
