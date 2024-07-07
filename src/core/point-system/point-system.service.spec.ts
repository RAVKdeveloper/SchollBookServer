import { Test, TestingModule } from '@nestjs/testing'
import { PointSystemService } from './point-system.service'

describe('PointSystemService', () => {
  let service: PointSystemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointSystemService],
    }).compile()

    service = module.get<PointSystemService>(PointSystemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
