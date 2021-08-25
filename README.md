# CS191 Project: BOROBORO

<img src="https://d1ee3oaj5b5ueh.cloudfront.net/thumbs/1440xAUTO_2019_06_5d0cb0e592e84.jpeg" width="1000">

## Description of the dApp

A tool to record artwork transaction history on Ethereum.

Historically, authenticity and provenance have always posed enormous issues for the art market. How does a potential buyer or collector verify the authenticity of a painting? How do we know the artwork was acquired legally? How can we prove that provenance documents are not forged?

For my senior project, I created a tool that abstracts the Ethereum blockchain & IPFS mechanisms to allow artists & galleries to record works of art on-chain, making the transaction history credible in a transparent and fraud-preventing way.



## Major Art World Problem: Authenticity & Provenance

- Billion dollar industry in selling fake & forged artworks
- Provenance (digital or physical) can easily be forged
  - Physical documents are easily (re)producible
  - PDFs and digital certificates are easily be generated (just because it is digital doesn't mean it is real!)
- If provenance documents are lost, there is practically no way of proving artwork's authenticity
- Authenticity is proved based on art experts' judgment
  - Despite their experiences, they cannot be 100% right. 

<center><img src="https://wp-assets.futurism.com/2019/04/real-fake-paintings-ai.png" width="400"></center>



## Solution: Blockchain

<img style="float: center;" src="https://d1fmx1rbmqrxrr.cloudfront.net/zdnet/optim/i/edit/ne/2019/02/Blockchain%20620__w630.jpg" width="300">

- Decentralized, trustworthy single source-of-truth
- Secure & extremely difficult to tamper with past records
- No need to worry about losing documents
- Permits anonymity of collectors 
- Allows verification of diversity of mediums (sculpture, multi-media, performances...)
- Efficient, easy & accurate verification



## Workflow & Example Use Case

Alice wants to buy a sculpture from the secondary-market art dealer Bob. 

Before transacting, she wants to verify the authenticity of the artwork. 

Bob sends Alice the contract address and token address of the artwork. 

Alice verifies that minter's address matches the address of the artist, confirming Bob's claim that the artist self-minted the artwork. 

Alice also checks that it was previously owned by well-known collectors, Chris, Daniel, and Eve (assessment based on those addresses' transaction history), just as Bob claimed. It is currently owned by Bob.

Alice verifies that this is the authentic artwork. Bob and Alice exchange funds and artwork. Bob registers this change-of-hand by updating the owner on BOROBORO. 

<img src="https://static.euronews.com/articles/stories/03/78/29/12/400x225_cmsv2_6401deb4-e46e-5c3f-9a15-e45abd767d33-3782912.jpg" width="800">



## Features

- Mint

  - Mints artwork as a token on Ethereum
  - Records related metadata on IPFS, including year, image, artist, title, creator, etc.
  - Assigns Token ID sequentially
  
- Update

  - Records transaction of artwork between addresses on Ethereum
  - Verifies rightful ownership of token ID provided before transaction

- Explore
  - View minted artwork on explore page
  - Displays relevant & anonymized metadata on artwork detail page (artist, year, current owner's address)



## Technicalities

### Built with

- Solidity
- Truffle
- OpenZeppelin ERC721, ERC721URIStorage, ERC721Enumerable
- React
- Material UI
- TypeScript
- IPFS HTTP Client 
- Next.js



## To Run

### Backend/Blockchain

The contract used by the dApp is deployed on the Rinkeby testnet. To see the deployed contract and relevant history on Rinkeby:

https://rinkeby.etherscan.io/address/0xA62870E463383a0972270C3d99921d8ba433dc48

When signed into the Metamask account on Rinkeby testnet, the contract should automatically be called and loaded. There is no need for additional local deployment.

If interested in my contract code, examine contract code at cs191/contracts/Artwork.sol.

### Frontend

##### Deployed

The dApp is built on top of Next.js and deployed using the native Vercel service. 

It can be accessed at https://boroboro.vercel.app/. 

##### Local

To launch the dApp locally, run

```
### cd cs191/dapp
### yarn install
### yarn dev
```



## Future work

There is a lot of features waiting to be built, here is a general roadmap.

### Roadmap

#### Frontend

- [ ] Add ability to select artwork from /explore to update provenance
- [ ] Add more edge case detection for security purposes
- [ ] Provide escrow service

#### Backend

- [ ] Detect and nudge users to be on the intended network (testnet or mainnet)
- [ ] Deploy on mainnet for real usage (?)
