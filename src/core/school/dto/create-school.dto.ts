import { IsNotEmpty, MinLength, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSchoolDto {
  @ApiProperty({ example: 'МБОУ СШ 62', description: 'School name' })
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ example: 'st.Ukrainian h.65', description: 'Location school' })
  @IsNotEmpty()
  readonly location: string

  @ApiProperty({ example: '353535325355', description: 'License registration number' })
  @MinLength(5)
  @MaxLength(20)
  readonly licenseNumber: string

  @ApiProperty({ example: '5', description: 'Points system in school' })
  @IsNotEmpty()
  readonly pointsSystem: string

  @ApiProperty({ example: 'Moscow', description: 'Region from this school' })
  @IsNotEmpty()
  readonly region: string
}
