pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productsCount = 0;
    mapping(uint => Product) public products; 

    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool forSale;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool forSale
    );

    event ProductSold(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool forSale
    );

    constructor() public {
        name = "MrC3drik Marketplace";
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

    function buyProduct(uint _id) public payable {
        // declare variables
        Product memory _product = products[_id];
        address payable _seller = _product.owner;
        address payable _buyer = msg.sender;

        // assert provided variables are valid
        require(_id > 0 && _id <= productsCount);
        require(msg.value >= _product.price);
        require(_product.forSale == true);
        require(_seller != _buyer);

        // pay seller
        address(_seller).transfer(msg.value);

        // transfer ownership
        _product.owner = _buyer;
        _product.forSale = false;

        // update product
        products[_id] = _product;

        // trigger an event to update the product in the blockchain
        emit ProductSold(productsCount, _product.name, _product.price, msg.sender, false);
    }

}