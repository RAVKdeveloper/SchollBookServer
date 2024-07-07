import { Test, TestingModule } from '@nestjs/testing'
import { PointSystemController } from './point-system.controller'
import { PointSystemService } from './point-system.service'

describe('PointSystemController', () => {
  let controller: PointSystemController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PointSystemController],
      providers: [PointSystemService],
    }).compile()

    controller = module.get<PointSystemController>(PointSystemController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
