import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterEntity } from '../../../../waters/infrastructure/persistence/relational/entities/water.entity';
import { WaterSeedService } from './water-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([WaterEntity])],
  providers: [WaterSeedService],
  exports: [WaterSeedService],
})
export class WaterSeedModule {}
