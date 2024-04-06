import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail } from 'class-validator'

import type { Roles } from 'src/basic/roles.type'

export class CreateAuthDto {
  @ApiProperty({ example: 'schoolbook:example.com', description: 'Email' })
  @IsEmail()
  readonly email: string

  @ApiProperty({ example: 'Billi', description: 'Name user' })
  @IsNotEmpty()
  readonly name: string

  @ApiProperty({ example: 'Kirillovich', description: 'Middlename user' })
  @IsNotEmpty()
  readonly middlename: string

  @ApiProperty({ example: 'Butcher', description: 'Surname user' })
  @IsNotEmpty()
  readonly surname: string

  @ApiProperty({ example: 'STUDENT', description: 'Role user' })
  @IsNotEmpty()
  readonly role: Roles
}
