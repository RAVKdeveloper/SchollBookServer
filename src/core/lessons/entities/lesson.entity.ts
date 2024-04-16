import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { BasicEntity } from 'src/basic/basic.entity'
import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { School } from 'src/core/school/entities/school.entity'

@Entity('lesson')
export class Lesson extends BasicEntity {
  @ApiProperty({ example: 'Информатика', description: 'Lesson name' })
  @Column({ name: 'lesson_name' })
  lessonName: string

  @ApiProperty({ example: 'https://schoolbook.ru/lessonIcons/23423' })
  @Column({ nullable: true })
  icon: string

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @ApiProperty({ default: School, enum: () => School })
  @JoinColumn()
  school: School

  @ManyToOne(() => Teacher, teacher => teacher.lessons, { onDelete: 'CASCADE', nullable: true })
  @ApiProperty({ enum: () => Teacher, description: 'Teacher' })
  @JoinColumn()
  teacher: Teacher
}
