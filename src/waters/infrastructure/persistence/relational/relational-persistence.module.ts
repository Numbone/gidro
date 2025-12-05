import { Module } from '@nestjs/common';
import { WaterRepository } from '../water.repository';
import { WaterRelationalRepository } from './repositories/water.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterEntity } from './entities/water.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WaterEntity])],
  providers: [
    {
      provide: WaterRepository,
      useClass: WaterRelationalRepository,
    },
  ],
  exports: [WaterRepository],
})
export class RelationalWaterPersistenceModule {}
