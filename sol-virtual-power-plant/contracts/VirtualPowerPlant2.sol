pragma solidity >= 0.5.0 < 0.7.0;

contract VirtualPowerPlant2 {

  event bidCreated(bytes32 hash);
  event offerPlaced(bytes32 hash);
  event bidComplete(bytes32 hash);
  event offerComplete(bytes32 hash);
  
  uint globalOfferID = 0;

  struct Prosumer {
    address addr;
    string name;
    uint prosumerType;
    mapping (uint => Device) devices;
    mapping (uint => Offer)  proOpenOffers;
    mapping (uint => Offer)  proActiveOffers;
    mapping (uint => Offer)  proClosedOffers;
  }
  
  struct Device{
      address addr;
      uint deviceID;
      string deviceType;
      string name;
      string latitude;
      string longitude;
  }
  
  struct Offer{
      address supplier;
      address consumer;
      string validFrom;
      string validUntil;
      uint baseRate;
      uint rate;
      uint priority;
      uint offerID;
  }

  mapping (address => Prosumer) public prosumers;
  mapping (uint => Offer) public openOffers;
  mapping (uint => Offer) public activeOffers;
  mapping (uint => Offer) public closedOffers;

  constructor() public {
  }

  function createProsumer(string memory name, uint prosumerType) public {
    Prosumer memory prosumer;
    prosumer.addr = msg.sender;
    prosumer.name = name;
    prosumer.prosumerType = prosumerType;
    prosumers[msg.sender] = prosumer;
  }
  
  function addDevice(uint deviceID, string memory deviceType, string memory name, string memory latitude, string memory longitude) public {
    prosumers[msg.sender].devices[deviceID] = Device(msg.sender, deviceID, deviceType, name, latitude, longitude);
  }
  
  function placeOffer(string memory validFrom, string memory validUntil, uint baseRate, uint rate, uint priority) public {
    
    Offer memory offer;
    
    offer.supplier = msg.sender;
    offer.validFrom = validFrom;
    offer.validUntil = validUntil;
    offer.baseRate = baseRate;
    offer.rate = rate;
    offer.priority = priority;
    offer.offerID = globalOfferID;
    
    openOffers[globalOfferID] = offer;
    prosumers[msg.sender].proOpenOffers[globalOfferID] = offer;
    
    globalOfferID = globalOfferID + 1;
    
  }
  
  function acceptOffer(uint offerID) public {
    activeOffers[offerID] = openOffers[offerID];
    activeOffers[offerID].consumer = msg.sender;
    
    prosumers[activeOffers[offerID].supplier].proActiveOffers[offerID] = openOffers[offerID]; //add offer to supplier list of active offers
    prosumers[msg.sender].proActiveOffers[offerID] = openOffers[offerID]; //add offer to consumer list of active offers
    
    delete prosumers[activeOffers[offerID].supplier].proOpenOffers[offerID]; //delete the open offer that has now become an active offer
    delete openOffers[offerID];
    
  }
  
  function closeOffer(uint offerID) public {
    closedOffers[offerID] = activeOffers[offerID];
    
    prosumers[activeOffers[offerID].supplier].proClosedOffers[offerID] = activeOffers[offerID]; //add offer to supplier list of closed offers
    prosumers[activeOffers[offerID].consumer].proClosedOffers[offerID] = activeOffers[offerID]; //add offer to comsumer list of closed offers
    
    delete prosumers[closedOffers[offerID].supplier].proActiveOffers[offerID]; //delete the active offer that has now become an active offer
    delete prosumers[closedOffers[offerID].consumer].proActiveOffers[offerID];
    delete activeOffers[offerID];
  }

  function clear() public {
    //delete prosumers;
    //delete openOffers;
    //delete activeOffers;
    //delete closedOffers;
  }



}