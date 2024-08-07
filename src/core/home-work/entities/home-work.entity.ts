import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'

import { DaySchedule } from 'src/core/class-schedule/entities/day-schedule.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { Lesson } from 'src/core/lessons/entities/lesson.entity'
import { User } from 'src/core/user/entities/user.entity'

@Entity('home_work')
export class HomeWork extends BasicEntity {
  @ApiProperty({ description: 'Name home work', example: 'Home work' })
  @Column()
  title: string

  @ApiProperty({ description: 'Description home work', example: 'Description work' })
  @Column()
  description: string

  @ApiProperty({ description: 'Lesson', type: () => Lesson })
  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'lesson' })
  lesson: Lesson

  @ApiProperty({ description: 'Day schedule', type: () => DaySchedule })
  @ManyToOne(() => DaySchedule)
  @JoinColumn({ name: 'day_schedule' })
  daySchedule: DaySchedule

  @ApiProperty({ description: 'Creator', type: () => User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator' })
  creator: User

  @ApiProperty({ description: 'Class', type: () => Class })
  @ManyToOne(() => Class, classe => classe.homeWorks)
  @JoinColumn({ name: 'class' })
  classe: Class
}
