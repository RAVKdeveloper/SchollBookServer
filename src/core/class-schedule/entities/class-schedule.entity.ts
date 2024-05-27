import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

import { BasicEntity } from 'src/basic/basic.entity'
import { Class } from 'src/core/class/entities/class.entity'
import { DaySchedule } from './day-schedule.entity'

@Entity('class_schedule')
export class ClassSchedule extends BasicEntity {
  @ApiProperty({ example: true, description: 'Class schedule is the top week?' })
  @Column({ default: false })
  isTheTopWeek: boolean

  @OneToMany(() => DaySchedule, day => day.schedule)
  @ApiProperty({ default: [], description: 'Days this week', enum: () => DaySchedule })
  days: DaySchedule[]

  @ManyToOne(() => Class, clas => clas.schedule)
  @ApiProperty({ description: 'Class', enum: () => Class })
  class: Class

  @ApiProperty({ example: 17 })
  @Column({ name: 'current_week' })
  currentWeek: number

  @ApiProperty({ example: '2024' })
  @Column()
  year: string

  @ApiProperty({ example: '19.04.2022-', description: 'Timeline start this week' })
  @Column()
  timelineStart: string

  @ApiProperty({ example: '25.05.2022', description: 'Timeline end this week' })
  @Column()
  timelineEnd: string
}
