import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateOrganizationDto {
  @ApiProperty({ description: 'Name', example: 'Движение первых', required: false })
  @IsOptional()
  @IsString()
  readonly name?: string

  @ApiProperty({ description: 'Description', example: 'Description', required: false })
  @IsOptional()
  @IsString()
  readonly description?: string

  @ApiProperty({ description: 'Tags add', example: ['new tag'], isArray: true, required: false })
  @IsOptional()
  @IsArray()
  readonly tagsAdd?: string[]

  @ApiProperty({
    description: 'Tags remove',
    example: ['remove tag'],
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  readonly tagsRemove?: string[]

  @ApiProperty({ description: 'Filter by private', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  readonly isPrivate?: boolean

  @ApiProperty({ description: 'Filter by global', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  readonly isGlobal?: boolean

  @ApiProperty({ description: 'Organization id', example: 5 })
  @IsNotEmpty()
  @IsNumber()
  readonly organizationId: number

  @ApiProperty({ description: 'Deleted participants id', example: [1, 2], isArray: true })
  @IsOptional()
  @IsArray()
  readonly deletedParticipantsId: number[]
}
