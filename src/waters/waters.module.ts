import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { WatersService } from './waters.service';
import { WatersController } from './waters.controller';
import { RelationalWaterPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalWaterPersistenceModule,
  ],
  controllers: [WatersController],
  providers: [WatersService],
  exports: [WatersService, RelationalWaterPersistenceModule],
})
export class WatersModule {}
