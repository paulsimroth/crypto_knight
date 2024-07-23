// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {GameCoin} from "./GameToken.sol";

contract Marketplace {
    IERC1155 private _token;
    GameCoin private _coin;
    address private _owner;

    mapping(uint256 => uint256) price;

    constructor(IERC1155 tokenAddress, GameCoin coinAddress) {
        require(address(tokenAddress) != address(0));
        require(address(coinAddress) != address(0));

        _token = tokenAddress;
        _coin = coinAddress;
        _owner = msg.sender;

        price[1] = 10;
        price[2] = 20;
        price[3] = 30;
    }

    receive() external payable {
        (bool success, ) = _owner.call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }

    fallback() external payable {}

    function balanceOf(address account) public view returns (uint256) {
        require(account != address(0));
        return _coin.balanceOf(account);
    }

    function buySpecialItem(uint256 tokenId, uint256 buyOffer) public payable {
        //Check for correct amount and correct tokenId
        require(buyOffer >= price[tokenId] && price[tokenId] != 0);
        require(balanceOf(msg.sender) >= price[tokenId]);
        _coin.transferFrom(msg.sender, address(this), buyOffer);
        _token.safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
    }

    function buyTokens10K(uint256 coinAmount) public payable {
        require(msg.value >= 0.0001 ether, "Insufficient message value");
        _coin.mint(msg.sender, 10000);
    }

    function buyTokens100K(uint256 coinAmount) public payable {
        require(msg.value >= 0.001 ether, "Insufficient message value");
        _coin.mint(msg.sender, 100000);
    }

    function onERC1155Received(
        address _operator,
        address _from,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external pure returns (bytes4) {
        return
            bytes4(
                keccak256(
                    "onERC1155Received(address,address,uint256,uint256,bytes)"
                )
            );
    }
}
