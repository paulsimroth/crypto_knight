// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract GameBuff is ERC1155, ERC1155Burnable, ERC1155Supply{
    constructor(string memory uri) ERC1155(uri) {}

    /**
     * @dev Creates `amount` tokens of token type `id`, and assigns them to `to`.
     * Calls {_mint} to handle minting.
     */
    function mint(
        address to,
        uint256 id,
        uint256 amount
    ) public returns (bool) {
        _mint(to, id, amount, "");
        return true;
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        returns (bool)
    {
        _mint(account, id, amount, data);
        return true;
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
