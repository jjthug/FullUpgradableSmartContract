pragma solidity ^0.8.0;
import "./Storage.sol";

contract Dogs is Storage{

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function getNumberOfDogs() public view returns(uint256){
        return _uintStorage["dogs"];
    }

    function setNumberOfDogs(uint256 _number) public {
        _uintStorage["dogs"] = _number;
    }
}