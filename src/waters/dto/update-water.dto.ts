// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateWaterDto } from './create-water.dto';

export class UpdateWaterDto extends PartialType(CreateWaterDto) {}
