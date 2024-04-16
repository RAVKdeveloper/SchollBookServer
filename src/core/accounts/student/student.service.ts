import { Injectable, Inject } from '@nestjs/common'
import { Cache } from 'cache-manager'

import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

@Injectable()
export class StudentService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  async create(dto: CreateStudentDto) {
    const cache = await this.cacheManager.get('students')
    if (!cache) {
      const students = await this.test()
      await this.cacheManager.set('students', { ...students, ...dto })
      return { ...students, ...dto }
    }

    return cache
  }

  async test(): Promise<{ student: string }> {
    return new Promise(resolve => {
      setTimeout(() => {
        const students = { student: 'Hello' }

        resolve(students)
      }, 1000)
    })
  }

  findAll() {
    return 'This action returns all student'
  }

  findOne(id: number) {
    return `This action returns a #${id} student`
  }

  update(id: number, dto: UpdateStudentDto) {
    return `This action updates a #${id} ${dto} student`
  }

  remove(id: number) {
    return `This action removes a #${id} student`
  }
}
