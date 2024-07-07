import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class TokenGenRoleDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number

  @IsNotEmpty()
  @IsString()
  readonly role: string

  @IsOptional()
  @IsNumber()
  readonly studentId?: number

  @IsOptional()
  @IsNumber()
  readonly parentId?: number

  @IsNotEmpty()
  @IsNumber()
  readonly schoolId: number
}
