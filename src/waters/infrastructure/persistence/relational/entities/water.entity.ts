import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

export enum ResourceType {
  LAKE = 'lake',
  CHANNEL = 'channel',
  RESERVOIR = 'reservoir',
}

export enum WaterType {
  FRESH = 'fresh',
  SALTY = 'salty',
}

@Entity({ name: 'water' })
export class WaterEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  region: string;

  @Column({
    type: 'enum',
    enum: ResourceType,
  })
  resource_type: ResourceType;

  @Column({
    type: 'enum',
    enum: WaterType,
  })
  water_type: WaterType;

  @Column({ type: 'boolean' })
  fauna: boolean;

  @Column({ type: 'date' })
  passport_date: Date;

  @Column({ type: 'int' })
  technical_condition: number;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'varchar', nullable: true })
  pdf_url: string | null;

  @Column({ type: 'int', nullable: true })
  priority: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
