import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateStudentDto {
  @ApiProperty({ example: true, description: 'Is admit student to school' })
  @IsNotEmpty()
  readonly isAdmit: boolean

  @ApiProperty({
    example: '2024-03-02T11:18:30.993Z',
    description: 'Date of accession student in school',
  })
  @IsNotEmpty()
  readonly dateOfAccession: Date
}
