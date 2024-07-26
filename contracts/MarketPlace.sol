// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./GameToken.sol";
import "./SpecialItem.sol";

contract Marketplace is Ownable {
    GameCoin private _coin;
    GameItems private _items;

    mapping(uint256 => uint256) public itemPrices;
    mapping(uint256 => uint256) public maxItemsPerUser;

    mapping(address => mapping(uint256 => uint256)) public userItemCount;

    event ItemPurchased(address buyer, uint256 itemId, uint256 amount);
    event ItemUpgraded(address indexed user, uint256 oldItemId, uint256 newItemId);
    event TokensPurchased(address buyer, uint256 amount);

    constructor(GameCoin coinAddress, GameItems itemsAddress) Ownable(msg.sender) {
        require(address(coinAddress) != address(0), "Invalid coin address");
        require(address(itemsAddress) != address(0), "Invalid items address");
        _coin = coinAddress;
        _items = itemsAddress;
        
        // Set default prices and max items per user
        for (uint256 i = 0; i < 18; i++) {
            itemPrices[i] = 10 * (10 ** (i % 6)); // Example: 10, 100, 1000, 10000, 100000, 1000000
            maxItemsPerUser[i] = 10 / (2 ** (i % 6)); // Example: 10, 5, 2, 1, 1, 1
        }
    }

    function buyItem(uint256 itemId, uint256 amount) public {
        require(userItemCount[msg.sender][itemId] + amount <= maxItemsPerUser[itemId], "Exceeds max items per user");
        uint256 totalPrice = itemPrices[itemId] * amount;
        require(_coin.balanceOf(msg.sender) >= totalPrice, "Insufficient balance");

        _coin.transferFrom(msg.sender, address(this), totalPrice);
        _items.mint(msg.sender, itemId, amount);

        userItemCount[msg.sender][itemId] += amount;
        emit ItemPurchased(msg.sender, itemId, amount);
    }

    function upgradeItem(uint256 itemId) public {
        require(itemId % 6 < 5, "Cannot upgrade Legendary items");
        require(_items.getItemBalance(msg.sender, itemId) >= 2, "Not enough items to upgrade");

        uint256 newItemId = itemId + 1;

        // Burn two items of the current rarity
        _items.burn(msg.sender, itemId, 2);

        // Mint one item of the next rarity
        _items.mint(msg.sender, newItemId, 1);

        // Update user item counts
        userItemCount[msg.sender][itemId] -= 2;
        userItemCount[msg.sender][newItemId] += 1;

        emit ItemUpgraded(msg.sender, itemId, newItemId);
    }

    function buyTokens(uint256 amount) public payable {
        require(msg.value >= amount * 0.00001 ether, "Insufficient payment");
        _coin.mintFromMarketplace(msg.sender, amount);
        emit TokensPurchased(msg.sender, amount);
    }

    function setItemPrice(uint256 itemId, uint256 newPrice) public onlyOwner {
        itemPrices[itemId] = newPrice;
    }

    function setMaxItemsPerUser(uint256 itemId, uint256 newMax) public onlyOwner {
        maxItemsPerUser[itemId] = newMax;
    }

    function withdrawTokens(address to, uint256 amount) public onlyOwner {
        _coin.transfer(to, amount);
    }

    function withdrawEth(address payable to, uint256 amount) public onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        to.transfer(amount);
    }
}