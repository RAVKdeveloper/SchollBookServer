import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { TokensGenerateDto } from './dto/token-gen.dto'

@Injectable()
export class JwtGenService {
  constructor(private service: JwtService) {}

  async generateTokens(payload: TokensGenerateDto) {
    const acces_token = await this.service.signAsync(payload)

    return acces_token
  }
}
