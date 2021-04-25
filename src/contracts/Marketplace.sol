pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productsCount = 0;
    mapping(uint => Product) public products; 

    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        bool forSale;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool forSale
    );

    constructor() public {
        name = "Mr C3drik Marketplace";
    }

    function addProduct(string memory _name, uint _price) public {
        // assert provided variables are valid
        require(bytes(_name).length > 0);
        require(_price > 0);

        // increase product counter
        productsCount ++;

        // add product
        products[productsCount] = Product(productsCount, _name, _price, msg.sender, true);

        // trigger an event to add the product to the blockchain
        emit ProductCreated(productsCount, _name, _price, msg.sender, true);
    }


}