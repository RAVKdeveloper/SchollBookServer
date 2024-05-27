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

  @ManyToOne(() => School, { onDelete: 'CASCADE' })
  @ApiProperty({ default: School, enum: () => School })
  @JoinColumn()
  school: School

  @ManyToMany(() => Teacher, teacher => teacher.lessons, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @ApiProperty({ enum: () => Teacher, description: 'Teacher' })
  @JoinTable()
  teacher: Teacher[]

  @ManyToOne(() => Class, classe => classe.lessons, { onDelete: 'CASCADE' })
  @ApiProperty({ enum: () => Class, description: 'Classes' })
  classes: Class
}
