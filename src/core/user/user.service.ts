import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  create(dto: CreateUserDto) {
    return `This action adds a new user ${dto}`
  }

  findAll() {
    return 'This action returns all user'
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, dto: UpdateUserDto) {
    return `This action updates a #${id} user ${dto}`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
