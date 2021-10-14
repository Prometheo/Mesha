const MeshaToken = artifacts.require("MeshaToken");

contract("2nd MeshaToken test", async accounts => {
    it("should put 100 MeshaToken in the first account", async () => {
      const instance = await MeshaToken.deployed();
      const balance = await instance.getBalance.call(accounts[0]);
      console.log(balance.valueOf());
      assert.equal(balance.valueOf(), 10000);
    });
});