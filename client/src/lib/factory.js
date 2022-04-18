import web3 from "./web3";
import CEFFactory from "../../build/contracts/CEFFactory.json";

const instance = new web3.eth.Contract(
  CEFFactory.abi,
  "0x7B361d5F92F48742b9941F6cA4Dc42190E1b2307" // CA address, Robsten
);

export default instance;
