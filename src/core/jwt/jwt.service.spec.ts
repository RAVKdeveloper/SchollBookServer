import { Test, TestingModule } from '@nestjs/testing'
import { JwtGenService } from './jwt.service'

describe('Service', () => {
  let service: JwtGenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtGenService],
    }).compile()

    service = module.get<JwtGenService>(JwtGenService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
