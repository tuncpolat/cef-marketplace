import web3 from "./web3";
import CEFFactory from "../../build/contracts/CEFFactory.json";

const instance = new web3.eth.Contract(
  CEFFactory.abi,
  "0xBadEABE2a1Efe1b5eAA7BeC3AADB040F9E202F96" // CA address, Robsten
);

export default instance;
