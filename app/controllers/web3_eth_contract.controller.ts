import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'
import Web3 from 'web3'
var Eth = require('web3-eth')

const RAZZLE_PRODUCT_ID = process.env.RAZZLE_PRODUCT_ID
const BALANCE = process.env.BALANCE

// https://github.com/web3/web3.js/issues/3579
// must use wss to connent the web3

var web3 = new Web3(
  Web3.givenProvider || `wss://goerli.infura.io/ws/v3/${RAZZLE_PRODUCT_ID}`,
)

// "Eth.providers.givenProvider" 在支持以太坊的浏览器上会被设置
var eth = new Eth(
  Eth.givenProvider || `wss://goerli.infura.io/ws/v3/${RAZZLE_PRODUCT_ID}`,
)

@JsonController()
@Service()
export class Web3EthContractController {
  @Get('/web3_eth_contract')
  async web3_eth_contract() {
    // web3.eth.accounts.create()
    return []
  }
}
