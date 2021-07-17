// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Artwork is ERC721 {
    constructor() ERC721("Artwork", "AWK") {
    }

    /**
    * @dev Mints a new NFT.
    * @param _to The address that will own the minted NFT.
    * @param _tokenId of the NFT to be minted by the msg.sender.
    */
    function mint(
      address _to,
      uint256 _tokenId
    )
      external
    {
      _safeMint(_to, _tokenId);
    }
}