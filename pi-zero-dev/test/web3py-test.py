import json

from web3 import Web3

w3 = Web3(Web3.HTTPProvider("http://quorum.lemmi.be"))

abi = json.loads('[{"name":"","inputs":[{"name":"initVal","type":"uint256","internalType":"uint256"}],"type":"constructor","payable":false,"stateMutability":"nonpayable"},{"anonymous":false,"name":"Change","inputs":[{"indexed":false,"name":"message","type":"string","internalType":"string"},{"indexed":false,"name":"newVal","type":"uint256","internalType":"uint256"}],"type":"event","payable":false},{"constant":true,"name":"get","inputs":[],"outputs":[{"name":"retVal","type":"uint256","internalType":"uint256"}],"type":"function","payable":false,"stateMutability":"view"},{"constant":false,"name":"set","inputs":[{"name":"x","type":"uint256","internalType":"uint256"}],"outputs":[],"type":"function","payable":false,"stateMutability":"nonpayable"}]')

address = '0xb70a390c7250a3794e8bf067de784e3b261ca4f5'
#Web3.toChecksumAddress(lower_case_address).', '0xb70a390c7250a3794e8bf067de784e3b261ca4f5'

contract = w3.eth.contract(address=Web3.toChecksumAddress(address),abi=abi)

print(contract.functions.get().call())
