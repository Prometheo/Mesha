const MeshaToken = artifacts.require("MeshaToken");

const { assert } = require("chai");
var chai = require("chai");

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Basic MeshaToken test", async accounts => {
    it("should put 100 MeshaToken in the deployer account", async () => {
        const instance = await MeshaToken.deployed();
        const balance = await instance.balanceOf.call(accounts[0]);
        assert.equal(web3.utils.fromWei(balance), 100);
    });
    it("should put 250 MeshaToken in the vesting beneficiary account on deploy", async () => {
        const instance = await MeshaToken.new(accounts[1]);
        const balance = await instance.balanceOf.call(accounts[1]);
        assert.equal(web3.utils.fromWei(balance), 250);
    });
    it("should fail because next vesting is not due", async () => {
        const instance = await MeshaToken.new(accounts[1]);
        await expect(instance.executePendingVestings()).to.eventually.be.rejected;
    });
    it("should be able to change beneficiary address", async () => {
        const instance = await MeshaToken.new(accounts[1]);
        var beneficiary = await instance.beneficiary.call();
        assert.equal(beneficiary, accounts[1])
        await (instance.changeBeneficiary(accounts[2]));
        var beneficiaryAfterChange = await instance.beneficiary.call();
        assert.notEqual(beneficiary, beneficiaryAfterChange);
        assert.equal(accounts[2], beneficiaryAfterChange);
    });
    it("should be able to transfer tokens and reflect properly", async () => {
        const instance = await MeshaToken.new(accounts[1]);
        var initialBalance = await instance.balanceOf.call(accounts[0])
        
        var initialRecipientBalance = await instance.balanceOf.call(accounts[5])
        await instance.transfer(accounts[5], web3.utils.toWei("10"));
        assert.equal(web3.utils.fromWei(await instance.balanceOf.call(accounts[0])), Number(web3.utils.fromWei(initialBalance)) - 10 )
        assert.equal(web3.utils.fromWei(await instance.balanceOf.call(accounts[5])), Number(web3.utils.fromWei(initialRecipientBalance)) + 10 )
        
    });
});