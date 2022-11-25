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

@JsonController()
@Service()
export class GetConnentController {
  @Get('/web3_connent')
  async web3_connent() {
    console.log(web3)
    web3.eth.getAccounts(console.log) // null []
    return []
  }

  @Get('/web3_eth_connent')
  async web3_eth_connent() {
    console.log(eth)
    return []
  }

  @Get('/web3_eth_default_account_block_and_more')
  async web3_eth_default_account_block_and_more() {
    var eth = web3.eth.defaultAccount //null
    var block = web3.eth.defaultBlock //latest
    var hard_fork = web3.eth.defaultHardfork //undefined
    var chain = web3.eth.defaultChain //undefined
    var common = web3.eth.defaultCommon //undefined
    var tx_confirm_block = web3.eth.transactionConfirmationBlocks
    var tx_poll_timeout = web3.eth.transactionPollingTimeout
    var handle_revert = web3.eth.handleRevert
    // console.log(tx_confirm_block, tx_poll_timeout, handle_revert) // 24 750 false
    // handleRevert
    // web3.eth.getProtocolVersion().then(console.log) //0x41
    // web3.eth.isSyncing().then(console.log).finally //false

    //
    // getCoinbase
    // web3.eth.getCoinbase().then(console.log)

    // web3.eth.isMining().then(console.log)    //false
    // web3.eth.getHashrate().then(console.log) //0
    // web3.eth.getGasPrice().then(console.log) //7602998
    // web3.eth.getAccounts().then(console.log) //[]
    // web3.eth.getBlockNumber().then(console.log) //8008863

    var balance = web3.eth.getBalance(`${BALANCE}`)
    var etherValue = web3.utils.fromWei(await balance, 'ether')

    web3.eth.getStorageAt(`${BALANCE}`, 0).then(console.log)
    // that result like the zero address
    // 0x0000000000000000000000000000000000000000000000000000000000000000

    web3.eth.getCode(`${BALANCE}`).then(console.log) //ox

    web3.eth.getBlock(13145200).then(console.log)

    var block_hash = (await web3.eth.getBlock(13145200)).parentHash

    web3.eth.getBlockTransactionCount(`${block_hash}`).then(console.log)

    web3.eth.getBlockUncleCount(`${block_hash}`).then(console.log)

    web3.eth.getUncle(500, 0).then(console.log)

    web3.eth
      .getTransaction(
        '0x9b0262562c70bf389fa6d9c7488962f0cfd22e65b1007f029f68dbe46a07aab2',
      )
      .then(console.log)

    // get Pending Tx
    // web3.eth.getPendingTransactions().then(console.log)

    // web3.eth.getPendingTransactions().then(pendingTx => {
    //   if (pendingTx) {
    //     // cancel that pendingTx
    //     console.log(pendingTx)
    //   }
    //   // send new tx
    // })

    web3.eth
      .getTransactionFromBlock(
        '0x38f98dd897acc813a97bdb13d0c718c7d5f547bd3543af23e75e84f0f9fa7c3b',
        2,
      )
      .then(console.log)

    var receipt = web3.eth
      .getTransactionReceipt(
        '0x38f98dd897acc813a97bdb13d0c718c7d5f547bd3543af23e75e84f0f9fa7c3b',
      )
      .then(console.log)

    // var TxCount = web3.eth
    //   .getTransactionCount(
    //     '0x38f98dd897acc813a97bdb13d0c718c7d5f547bd3543af23e75e84f0f9fa7c3b',
    //   )
    //   .then(console.log)

    // web3.eth
    //   .sign('Hello world', '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe')
    //   .then(console.log)

    //
    // web3-eth other
    // like work and gas...

    // change default
    // web3.eth.defaultAccount = '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe'
    // web3.eth.defaultBlock = 231
    // web3.eth.defaultHardfork = 'istanbul'
    // web3.eth.defaultChain = 'goerli'
    // web3.eth.defaultCommon = {
    //   customChain: { name: 'custom-network', chainId: 1, networkId: 1 },
    //   baseChain: 'mainnet',
    //   hardfork: 'petersburg',
    // }

    return {
      account: eth,
      block: block,
      hard_fork: hard_fork,
      chain: chain,
      common: common,
      tx_confirm_block: tx_confirm_block,
      tx_poll_timeout: tx_poll_timeout,
      handle_revert: handle_revert,
      etherValue: etherValue,
    }
  }
}
