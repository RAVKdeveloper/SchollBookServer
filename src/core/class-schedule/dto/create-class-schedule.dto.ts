import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export interface Day {
  readonly activeTeachersId: number[]
  readonly lessonsId: number[]
  readonly dayName: string
  readonly time: string
}

export class CreateClassScheduleDto {
  @ApiProperty({ example: 1, description: 'Class id' })
  @IsNotEmpty()
  @IsNumber()
  readonly classId: number

  @ApiProperty({
    description: 'Days schedule',
    example: { activeTeachersId: 1, lessonsId: 6, dayName: 'Friday', time: '8:00-8:45' },
  })
  @IsNotEmpty()
  readonly day: Day
}
