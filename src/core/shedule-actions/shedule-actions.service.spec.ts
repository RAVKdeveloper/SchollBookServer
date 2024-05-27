import { Test, TestingModule } from '@nestjs/testing';
import { SheduleActionsService } from './shedule-actions.service';

describe('SheduleActionsService', () => {
  let service: SheduleActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheduleActionsService],
    }).compile();

    service = module.get<SheduleActionsService>(SheduleActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
