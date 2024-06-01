import { Test, TestingModule } from '@nestjs/testing'
import { SheduleActionsController } from './shedule-actions.controller'
import { SheduleActionsService } from './shedule-actions.service'

describe('SheduleActionsController', () => {
  let controller: SheduleActionsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheduleActionsController],
      providers: [SheduleActionsService],
    }).compile()

    controller = module.get<SheduleActionsController>(SheduleActionsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
