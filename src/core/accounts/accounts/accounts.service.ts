import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Response } from 'express'
import { Repository } from 'typeorm'

import { CookiesNames } from 'src/basic/cookie-names.basic'
import { Roles } from 'src/basic/roles.type'
import { JwtGenService } from 'src/core/jwt/jwt.service'

import { Class } from 'src/core/class/entities/class.entity'
import { Parent } from './entities/parent.entity'
import { Student } from './entities/student.entity'

import { CreateParentAccDto } from './dto/create-parent.dto'
import { CreateStudentDto } from './dto/create-student.dto'

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Parent) private parentRepo: Repository<Parent>,
    private tokenService: JwtGenService,
  ) {}

  public async createStudentAcc(dto: CreateStudentDto, userId: number, res: Response) {
    try {
      const newStudent = await this.studentRepo.manager.transaction(async entityManager => {
        const classe = await entityManager.findOne(Class, {
          where: {
            id: dto.classId,
            school: { id: dto.schoolId },
          },
        })

        if (!classe) throw new NotFoundException('Класс не найден')

        return await entityManager.save(Student, {
          school: { id: dto.schoolId },
          userId: { id: userId },
          class: [{ id: classe.id }],
        })
      })

      const token = await this.tokenService.generateRoleTokens({
        userId,
        schoolId: dto.schoolId,
        role: Roles.STUDENT,
        studentId: newStudent.id,
      })

      res.cookie(CookiesNames.ROLE, token, {
        httpOnly: true,
      })

      res.send(newStudent)
    } catch (e) {
      throw e
    }
  }

  public async createParentAcc(dto: CreateParentAccDto, userId: number, res: Response) {
    try {
      const newParent = await this.parentRepo.manager.transaction(async entityManager => {
        const classe = await entityManager.findOne(Class, {
          where: {
            id: dto.classId,
          },
        })

        if (!classe) throw new NotFoundException('Класс не найден')

        return await entityManager.save(Parent, {
          user: { id: userId },
          school: { id: dto.schoolId },
          childrens: [],
          classes: [{ id: classe.id }],
        })
      })

      const token = await this.tokenService.generateRoleTokens({
        userId,
        schoolId: dto.schoolId,
        role: Roles.PARENT,
        studentId: newParent.id,
      })

      res.cookie(CookiesNames.ROLE, token, {
        httpOnly: true,
      })

      res.send(newParent)

      return newParent
    } catch (e) {
      throw e
    }
  }

  public async findOneStudent(id: number) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: {
        userId: true,
        class: {
          chiefs: {
            userId: true,
          },
          lessons: true,
        },
        school: true,
      },
    })

    if (!student) throw new NotFoundException('Пользователь не найден')

    return student
  }

  public async findOneParentById(id: number) {
    const parent = await this.parentRepo.findOne({
      where: { id },
      relations: {
        user: true,
        classes: {
          chiefs: {
            userId: true,
          },
          lessons: true,
        },
        school: true,
        childrens: {
          userId: true,
        },
      },
    })

    if (!parent) throw new NotFoundException('Родитель не найден')

    return parent
  }

  public async getMyChildrens(parentId: number | undefined) {
    if (!parentId && isNaN(parentId)) {
      throw new ForbiddenException('Доступ запрещен')
    }

    const childrens = await this.studentRepo.find({
      relations: {
        userId: true,
        class: true,
      },
      where: {
        parents: { id: parentId },
      },
    })

    return childrens
  }
}
