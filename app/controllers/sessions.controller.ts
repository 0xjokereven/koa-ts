import { Prisma } from '@prisma/client'
import {
  BadRequestError,
  BodyParam,
  Get,
  JsonController,
  Post,
} from 'routing-controllers'
import { Service } from 'typedi'
import { SessionsService } from '../services'

@JsonController()
@Service()
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Get('/sessions')
  async query() {
    console.log('all live matter')
    return { session: 'all live matter' }
  }

  @Post('/sessions')
  async create(
    @BodyParam('username') name: string,
  ): Promise<Prisma.SessionGetPayload<any>> {
    if (!name) {
      throw new BadRequestError('username is required')
    }
    return await this.sessionsService.create({ name })
  }
}
