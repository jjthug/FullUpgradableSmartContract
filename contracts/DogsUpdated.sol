pragma solidity ^0.8.0;
import "./Storage.sol";

contract DogsUpdated is Storage{

    constructor() public {
        initialize(msg.sender);
    }

    function initialize(address _owner) public {
        require(!initilized);
        
        owner = _owner;
        initilized = true;
        
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function getNumberOfDogs() public view returns(uint256){
        return _uintStorage["dogs"];
    }

    function setNumberOfDogs(uint256 _number) public onlyOwner{
        _uintStorage["dogs"] = _number;
    }
}