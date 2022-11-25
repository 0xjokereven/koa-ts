import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'
import Web3 from 'web3'
var Eth = require('web3-eth')

const RAZZLE_PRODUCT_ID = process.env.RAZZLE_PRODUCT_ID
const BALANCE = process.env.BALANCE

var web3 = new Web3(
  Web3.givenProvider || `https://mainnet.infura.io/v3/${RAZZLE_PRODUCT_ID}`,
)

// "Eth.providers.givenProvider" 在支持以太坊的浏览器上会被设置
var eth = new Eth(Eth.givenProvider || `https://goerli.infura.io/v3/${RAZZLE_PRODUCT_ID}`)

// 订阅
var subscription = web3.eth.subscribe(
  'logs',
  {
    address: '',
    topics: [''],
    // TODO: topics null or addresss is what
  },
  function (error, result) {
    if (!error) console.log(result)
  },
)

@JsonController()
@Service()
export class SubscribeController {
  @Get('/subscribe')
  async subscribe() {
    return []
  }
}
