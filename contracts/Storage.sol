pragma solidity ^0.8.0;

contract Storage{
    mapping(string => uint256) _uintStorage;
    mapping(string => string) _stringStorage;
    mapping(string => bool) _boolStorage;
    mapping(string => bytes4) _bytesStorage;
    mapping(string => address) _addressStorage;
    address public owner;
    bool public initilized;


}