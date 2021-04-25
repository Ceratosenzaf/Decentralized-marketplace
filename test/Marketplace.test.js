const { assert } = require("chai")
const Marketplace = artifacts.require("./Marketplace.sol")
require("chai").use(require("chai-as-promised")).should()

contract("Marketplace", (accounts) => {
    var marketplace

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe("deployment", async() => {
        it("deploys successfully", async () => {    // assert that the contract has an address
            let address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, "")
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it("has a name", async () => {              // assert that the name is correct
            let name = await marketplace.name()
            assert.equal(name, "Mr C3drik Marketplace")
        })
    })

    describe("products", async() => {
        var result, productsCount
        let name = "Test product"
        let price = web3.utils.toWei("1", "Ether")

        before(async () => {
            result = await marketplace.addProduct(name, price, {from: accounts[1]})
            productsCount = await marketplace.productsCount()
        })

        it("adds product", async() => {             // assert that products get added correctly
            var event = result.logs[0].args

            // check for successfull results
            assert.equal(productsCount, 1)
            assert.equal(event.id.toNumber(), productsCount, "id correct")
            assert.equal(event.name, name, "name correct")
            assert.equal(event.price, price, "price correct")
            assert.equal(event.owner, accounts[1], "owner correct")
            assert.equal(event.forSale, true, "forSale correct")

            // check for erroneous results
            await marketplace.addProduct("", price, {from: accounts[1]}).should.be.rejected
            await marketplace.addProduct(name, 0, {from: accounts[1]}).should.be.rejected;
        })

        it("lists products", async() => {
            var product = await marketplace.products(productsCount)
            assert.equal(product.id.toNumber(), productsCount, "id correct")
            assert.equal(product.name, name, "name correct")
            assert.equal(product.price, price, "price correct")
            assert.equal(product.owner, accounts[1], "owner correct")
            assert.equal(product.forSale, true, "forSale correct")
        })
    })
})