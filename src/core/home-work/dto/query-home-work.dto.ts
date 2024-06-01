import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class QueryHomeWork {
  @ApiProperty({ description: 'Class id', example: 1 })
  @IsNotEmpty()
  readonly classId: number

  @ApiProperty({ description: 'Date from', example: '2022-06-12', required: false })
  @IsOptional()
  @IsString()
  readonly dateFrom: string

  @ApiProperty({ description: 'Date to', example: '2022-06-12', required: false })
  @IsOptional()
  @IsString()
  readonly dateTo: string

  @ApiProperty({ description: 'Lesson id', example: [1], required: false, isArray: true })
  @IsOptional()
  readonly lessonId: string
}
