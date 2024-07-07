import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Teacher } from 'src/core/accounts/teacher/entities/teacher.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { School } from 'src/core/school/entities/school.entity'

@Entity('lesson')
export class Lesson extends BasicEntity {
  @ApiProperty({ example: 'Информатика', description: 'Lesson name' })
  @Column({ name: 'lesson_name' })
  lessonName: string

  @ApiProperty({ example: 'https://schoolbook.ru/lessonIcons/23423' })
  @Column({ nullable: true })
  icon: string

  @ApiProperty({ default: School, type: () => School })
  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @JoinColumn()
  school: School

  @ManyToMany(() => Teacher, teacher => teacher.lessons, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @ApiProperty({ type: () => Teacher, description: 'Teacher', isArray: true })
  @JoinTable()
  teacher: Teacher[]

  @ApiProperty({ type: () => Class, description: 'Classes' })
  @ManyToOne(() => Class, classe => classe.lessons, { onDelete: 'CASCADE' })
  classes: Class
}
