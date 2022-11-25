import { Get, JsonController } from 'routing-controllers'
import { Service } from 'typedi'
import Web3 from 'web3'

@JsonController()
@Service()
export class Web3ModelsController {
  // web3_models
  @Get('/web3_models')
  async web3_models() {
    var model = Web3.modules
    console.log(model)
    return []
  }

  // web3_version
  @Get('/web3_version')
  async web3_version() {
    var version = Web3.version
    return { version: version }
  }

  // web3_utils
  @Get('/web3_utils')
  async web3_utils() {
    var util = Web3.utils
    console.log(util)
    return []
  }

  // web3_provider
  @Get('/web3_provider')
  async web3_provider() {
    var provider = Web3.providers
    console.log(provider)
    return []
  }

  // batch_request
  @Get('/batch_request')
  async batch_request() {}

  // web3_extend
  @Get('/web3_extend')
  async web3_extend() {}
}
