const { expect } = require("chai");
const { ethers } = require("hardhat");
const Dogs = artifacts.require("Dogs");
const Proxy = artifacts.require("Proxy");

describe("Greeter", function () {
  let dogs, proxy;
  before(async function () {
      accounts = await web3.eth.getAccounts();
      dogs = await Dogs.new();
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
    assert.equal(no, 0); //Dogs contract should not store, proxy should

  })

});