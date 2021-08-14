import Web3 from "web3";
import type { AbiItem } from "web3-utils";
import detectEthereumProvider from "@metamask/detect-provider";
import { ARTWORK_ABI, ARTWORK_ADDRESS } from "../../contractConfig";

declare let window: any;

export const detectAccountChange = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    window.ethereum.on("accountsChanged", async (accts: any) => {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const accounts = await web3.eth.requestAccounts();
      console.log("here,", accounts);
      return accounts[0];
    });
  }
  return "";
};

export const getWeb3 = async () => {
  const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  const accts = await web3.eth.requestAccounts();
  const contractInstance = new web3.eth.Contract(
    ARTWORK_ABI as AbiItem[],
    ARTWORK_ADDRESS
  );
  return { accts, contractInstance };
};
