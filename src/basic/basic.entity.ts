import { ApiProperty } from '@nestjs/swagger'
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('basic')
export class BasicEntity {
  @ApiProperty({ example: 1, description: 'Entity id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: '2024-03-02T11:18:30.993Z', description: 'Entity creatAt' })
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date

  @ApiProperty({ example: '2024-03-02T11:18:30.993Z', description: 'Entity updateAt' })
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date
}
