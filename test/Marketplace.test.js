const { assert } = require("chai")
const Marketplace = artifacts.require("./Marketplace.sol")

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
})