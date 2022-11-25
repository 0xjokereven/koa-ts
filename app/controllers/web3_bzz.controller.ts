import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'
import Web3 from 'web3'
var Eth = require('web3-eth')

const RAZZLE_PRODUCT_ID = process.env.RAZZLE_PRODUCT_ID
const BALANCE = process.env.BALANCE

var web3 = new Web3(
  Web3.givenProvider || `wss://goerli.infura.io/ws/v3/${RAZZLE_PRODUCT_ID}`,
)
// "Eth.providers.givenProvider" 在支持以太坊的浏览器上会被设置
var eth = new Eth(Eth.givenProvider || `https://goerli.infura.io/v3/${RAZZLE_PRODUCT_ID}`)

// swarm
// https://gitter.im/ethereum/swarm/archives/2018/01/05?at=5a4fa1815355812e575695e5
// // -> web3.bzz.currentProvider // if Web3.givenProvider was an ethereum provider it will set: "http://localhost:8500" otherwise it will set: "http://swarm-gateways.net"

// var bzz = web3.bzz
// web3.bzz.setProvider('http://localhost:8500')

// // download raw file
// var fileHash = 'a5c10851ef054c268a2438f10a21f6efe3dc3dcdcc2ea0e6a1a7a38bf8c91e23'
// bzz.download(fileHash).then(function (buffer) {
//   console.log('Downloaded file:', buffer.toString())
// })

// // download directory, if the hash is manifest file.
// var dirHash = '7e980476df218c05ecfcb0a2ca73597193a34c5a9d6da84d54e295ecd8e0c641'
// bzz.download(dirHash).then(function (dir) {
//   console.log('Downloaded directory:')
// })

// // download file/directory to disk (only node.js)
// var dirHash = 'a5c10851ef054c268a2438f10a21f6efe3dc3dcdcc2ea0e6a1a7a38bf8c91e23'
// bzz
//   .download(dirHash, './dir')
//   .then(path => console.log(`Downloaded directory to ${path}.`))
//   .catch(console.log)

@JsonController()
@Service()
export class Web3BbtController {
  @Get('/web3_bzz')
  async web3_bzz() {
    return []
  }
}
