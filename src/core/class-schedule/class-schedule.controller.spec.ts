import { Test, TestingModule } from '@nestjs/testing'
import { ClassScheduleController } from './class-schedule.controller'
import { ClassScheduleService } from './class-schedule.service'

describe('ClassScheduleController', () => {
  let controller: ClassScheduleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassScheduleController],
      providers: [ClassScheduleService],
    }).compile()

    controller = module.get<ClassScheduleController>(ClassScheduleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
