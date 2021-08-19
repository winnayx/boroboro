import Web3 from "web3";
import type { AbiItem } from "web3-utils";
import { ARTWORK_ABI, ARTWORK_ADDRESS } from "../../contractConfig";

export const getWeb3 = async () => {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accts = await web3.eth.requestAccounts();
  const contractInstance = new web3.eth.Contract(
    ARTWORK_ABI as AbiItem[],
    ARTWORK_ADDRESS
  );
  return { accts, contractInstance };
};

export const getTokenSupply = async () => {
  return getWeb3().then(({ accts, contractInstance }) => {
    return contractInstance.methods
      .totalSupply()
      .call({ from: accts[0] })
      .then((res: any) => res);
  });
};

export const getAllTokens = async () => {
  return getWeb3().then(({ accts, contractInstance }) => {
    const account = accts[0];
    return contractInstance.methods
      .totalSupply()
      .call({ from: account })
      .then((res: any, err: any) => {
        if (err) {
          console.log("ERROR in totalSupply call", err);
        } else {
          const arr = Array(parseInt(res, 10)).fill(0); // creates arr [0,0...]
          const newTokens = arr.map(function (item, i) {
            return contractInstance.methods
              .tokenURI(i + 1) // tokenID begins at 1
              .call({
                from: account,
              })
              .then((url: string) => {
                return fetch(url, { redirect: "follow" }).then((data) =>
                  data.json()
                );
              });
          });

          return Promise.all(newTokens).then((res) => res);
        }
      });
  });
};

export const getToken = async (tokenId: number) => {
  return getWeb3().then(({ accts, contractInstance }) => {
    const account = accts[0];
    return contractInstance.methods
      .tokenURI(tokenId)
      .call({
        from: account,
      })
      .then((url: string) => {
        return fetch(url, { redirect: "follow" }).then((data) => data.json());
      });
  });
};

export const getOwner = async (tokenId: number) => {
  return getWeb3().then(({ accts, contractInstance }) => {
    const account = accts[0];
    return contractInstance.methods
      .ownerOf(tokenId)
      .call({ from: account })
      .then((owner: string) => {
        console.log(owner);
        return owner;
      });
  });
};
