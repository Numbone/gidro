import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { RelationalRegionPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalRegionPersistenceModule,
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService, RelationalRegionPersistenceModule],
})
export class RegionsModule {}
