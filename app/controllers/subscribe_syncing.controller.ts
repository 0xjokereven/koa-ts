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
  .subscribe('syncing', function (error, sync) {
    if (!error) console.log(sync)
  })
  .on('data', function (sync) {
    // 一些同步状态数据
  })
  .on('changed', function (isSyncing) {
    if (isSyncing) {
      // 暂停应用操作
    } else {
      // 重启应用操作
    }
  })

// 取消订阅
// subscription.unsubscribe(function (error, success) {
//   if (success) console.log('Successfully unsubscribed!')
// })

@JsonController()
@Service()
export class SyncingSubscribeController {
  @Get('/syncing_subscribe')
  async syncing_subscribe() {
    subscription
    return []
  }
}
