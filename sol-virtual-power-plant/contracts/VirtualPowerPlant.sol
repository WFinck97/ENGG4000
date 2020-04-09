pragma solidity >= 0.5.0 < 0.7.0;

contract VirtualPowerPlant {

  event bidCreated(bytes32 hash);

  struct Supplier {
    address addr;
    uint kwhPrice;
    uint kwhAmount;
    string sourceType;
  }

  struct Consumer {
    address addr;
    uint demand;
  }

  struct Bid {
    address supplier;
    address consumer;
    uint price;
    uint state;
    uint duration;
    uint startTime;
  }

//  mapping (bytes32 => Bid) public bidMapping;
  mapping (address => Supplier) public supplierMapping;
  mapping (address => Consumer) public consumerMapping;
  mapping (bytes32 => Bid) public bidMapping;

  address[] public suppliers;
  address[] public consumers;
  bytes32[] public bids;

  constructor() public {
  }

  function createSupplier(uint kwhPrice, uint kwhAmount, string memory sourceType ) public {
    supplierMapping[msg.sender] =  Supplier(msg.sender, kwhPrice, kwhAmount, sourceType);
    suppliers.push(msg.sender);
  }

  function createConsumer(uint demand) public {
    consumerMapping[msg.sender] = Consumer(msg.sender, demand);
    consumers.push(msg.sender);
  }

  function placeBid(address addr, uint price, uint duration) public {
    bytes32 hash = keccak256(abi.encodePacked(addr,msg.sender,price,blockhash(block.number - 1)));
    bidMapping[hash] = Bid(addr,msg.sender,price,0, duration, now);
    bids.push(hash);
    emit bidCreated(hash);
  }

  function acceptBid(bytes32 bidID) public {
    assert(msg.sender == bidMapping[bidID].supplier || msg.sender == bidMapping[bidID].consumer);
    bidMapping[bidID].state = 1;
  }

  function denyBid(bytes32 bidID) public {
    assert( msg.sender == bidMapping[bidID].supplier || msg.sender == bidMapping[bidID].consumer);
    bidMapping[bidID].state = 2;
  }

  function clear() public {
    delete suppliers;
    delete consumers;
    delete bids;
  }

  function getSuppliers() public view returns (address[] memory) {
    return suppliers;
  }
  function getSupplier(address supplier) public view returns (address, uint, uint, string memory){
    return (supplierMapping[supplier].addr,supplierMapping[supplier].kwhAmount,supplierMapping[supplier].kwhPrice,supplierMapping[supplier].sourceType);
  }
  function getConsumers() public view returns (address[] memory) {
    return consumers;
  }
  function getBids() public view returns (bytes32[] memory) {
    return bids;
  }



}
