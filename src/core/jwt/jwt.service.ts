import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { TokenGenRoleDto } from './dto/token-gen-role.dto'
import { TokensGenerateDto } from './dto/token-gen.dto'

@Injectable()
export class JwtGenService {
  constructor(private service: JwtService) {}

  public async generateTokens(payload: TokensGenerateDto) {
    const acces_token = await this.service.signAsync(payload)

    return acces_token
  }

  public async generateRoleTokens(payload: TokenGenRoleDto) {
    const token = await this.service.signAsync(payload)

    return token
  }
}
