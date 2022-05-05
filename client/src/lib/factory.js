import web3 from "./web3";
import CEFFactory from "../abi/CEFFactory.json";

const instance = new web3.eth.Contract(
  CEFFactory.abi,
  "0x9bbb3fee5eddff2b001e5fdd528513ca794213a6" // CA, Robsten Testnet
);

export default instance;
