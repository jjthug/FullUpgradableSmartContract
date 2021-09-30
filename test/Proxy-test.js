const { expect } = require("chai");
const { ethers } = require("hardhat");
const Dogs = artifacts.require("Dogs");
const DogsUpdated = artifacts.require("DogsUpdated");
const Proxy = artifacts.require("Proxy");
const truffleAssert = require('truffle-assertions');


describe("Greeter", function () {
  let dogs, proxy;
  before(async function () {
      accounts = await web3.eth.getAccounts();
      dogs = await Dogs.new();
      dogsUpdated = await DogsUpdated.new();
      proxy = await Proxy.new(dogs.address);
    });

  it("should work", async() => {

    // await proxy.setNumberOfDogs(10);  ==> Fails with TypeError: proxy.setNumberOfDogs is not a function
    
    var proxyDogs = await Dogs.at(proxy.address);
    await proxyDogs.setNumberOfDogs(10);
    let no = await proxyDogs.getNumberOfDogs();

    // await dogs.setNumberOfDogs(10);
    // no = await dogs.getNumberOfDogs();

    assert.equal(no, 10);
  })

  it("should work", async() => {

    // await proxy.setNumberOfDogs(10);  ==> Fails with TypeError: proxy.setNumberOfDogs is not a function

    var proxyDogs = await Dogs.at(proxy.address);
    await proxyDogs.setNumberOfDogs(10);
    let no = await proxyDogs.getNumberOfDogs();
    // await dogs.setNumberOfDogs(10);
    // no = await dogs.getNumberOfDogs();
    assert.equal(no, 10);


    no = await dogs.getNumberOfDogs(); 
    assert.equal(no, 0); // Dogs contract should not store, proxy should
    // Upgrading to dogsUpdated contract from !!proxy contract (not proxyDogs)!!
    await proxy.upgrade(dogsUpdated.address);
    no = await proxyDogs.getNumberOfDogs();
    assert.equal(no, 10); // variable value is same, as its stored in proxy contract


    proxyDogs = await DogsUpdated.at(proxy.address);
    //Sets the state variables of the proxy contract the same as that of the dogsUpdated contract
    await proxyDogs.initialize(accounts[0]);
    await proxyDogs.setNumberOfDogs(30); // only owner can
    no = await proxyDogs.getNumberOfDogs();
    assert.equal(no, 30);

    //Basically dogsUpdated get new values, proxy also gets with initialize
  })

});