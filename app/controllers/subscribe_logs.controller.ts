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

var subscription = web3.eth
  .subscribe(
    'logs',
    {
      address: '0x29B67BB1cFE4799FDb46B49aD81cD771665E2dF7',
      topics: [null],
    },
    function (error, result) {
      if (!error) console.log(result)
    },
  )
  .on('connected', function (subscriptionId) {
    console.log(subscriptionId)
  })
  .on('data', function (log) {
    console.log(log)
  })
  .on('changed', function (log) {})

// 取消订阅
// subscription.unsubscribe(function (error, success) {
//   if (success) console.log('Successfully unsubscribed!')
// })

@JsonController()
@Service()
export class LogsSubscribeController {
  @Get('/logs_subscribe')
  async logs_subscribe() {
    subscription
    return []
  }
}
