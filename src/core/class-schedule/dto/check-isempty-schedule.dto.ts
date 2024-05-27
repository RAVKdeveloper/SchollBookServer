import { IsNotEmpty, IsNumber } from 'class-validator'

export class CheckIsEmptySchedule {
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number

  @IsNotEmpty()
  @IsNumber()
  readonly currentWeek: number

  @IsNotEmpty()
  readonly currentYear: string
}
