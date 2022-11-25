/**
 * Connect to Thundercore mainnet and listen for tips to a specific smart contract address.
 */

import Web3 from 'web3'
var provider = 'wss://goerli.infura.io/ws/v3/bb7f1a94a0174cac8c6d966fd925dbaa'
var web3 = new Web3(provider)

let listenOnce = () => {
  // Create a connection to Thundercore mainet.

  const smartContractAddress = '0xb7d82e5B73e01bB4c1cFB1448f1215bf165929a2'

  var subscription = web3.eth
    .subscribe(
      'logs',
      {
        address: smartContractAddress,
      },
      (error, result) => {
        if (error) {
          console.log(error)
          console.log('Reconnecting to Thundercore mainnet.')
          setTimeout(() => {
            // Re-instantiating web3 is needed in case the connection is dropped.
            web3 = new Web3(provider)
            _listen()
          }, 5000)
        }
      },
    )
    .on('connected', subscriptionId => {
      console.log('connected')
    })
    .on('data', log => {
      console.log(log)
    })
    .on('changed', log => {
      console.log('changed')
    })

  return subscription
}

const _listen = async () => {
  let tips = listenOnce()
  console.log('Connected to Thundercore mainnet.')

  // web3 subscription times out at 60 secs. Close and reopen at 50 secs.
  setInterval(() => {
    tips.unsubscribe((error, success) => {
      if (error) {
        console.log('Failed to disconnect from Thundercore mainnet!')
      }
      if (success) {
        console.log('disconnected')
      }
    })
    tips = listenOnce()
  }, 50 * 1000)
}

// _listen()
