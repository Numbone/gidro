import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateWaterDto } from './dto/create-water.dto';
import { UpdateWaterDto } from './dto/update-water.dto';
import { WaterRepository } from './infrastructure/persistence/water.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Water } from './domain/water';
import { FindAllWatersDto } from './dto/find-all-waters.dto';

@Injectable()
export class WatersService {
  constructor(
    // Dependencies here
    private readonly waterRepository: WaterRepository,
  ) {}

  async create(createWaterDto: CreateWaterDto) {
    // Do not remove comment below.
    // <creating-property />
    const payload: Omit<Water, 'id' | 'createdAt' | 'updatedAt'> = {
      name: createWaterDto.name,
      region: createWaterDto.region,
      resource_type: createWaterDto.resource_type,
      water_type: createWaterDto.water_type,
      fauna: createWaterDto.fauna,
      passport_date: createWaterDto.passport_date,
      technical_condition: createWaterDto.technical_condition,
      latitude: createWaterDto.latitude,
      longitude: createWaterDto.longitude,
      pdf_url: createWaterDto.pdf_url ?? '',
      priority: createWaterDto.priority ?? 0,
    };
    return this.waterRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...payload,
    });
  }

  findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: FindAllWatersDto;
  }) {
    return this.waterRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
    });
  }

  findById(id: Water['id']) {
    return this.waterRepository.findById(id);
  }

  findByIds(ids: Water['id'][]) {
    return this.waterRepository.findByIds(ids);
  }

  async update(
    id: Water['id'],

    updateWaterDto: UpdateWaterDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    const payload: Partial<Water> = {};

    if (updateWaterDto.name !== undefined) payload.name = updateWaterDto.name;
    if (updateWaterDto.region !== undefined)
      payload.region = updateWaterDto.region;
    if (updateWaterDto.resource_type !== undefined)
      payload.resource_type = updateWaterDto.resource_type;
    if (updateWaterDto.water_type !== undefined)
      payload.water_type = updateWaterDto.water_type;
    if (updateWaterDto.fauna !== undefined)
      payload.fauna = updateWaterDto.fauna;
    if (updateWaterDto.passport_date !== undefined)
      payload.passport_date = updateWaterDto.passport_date;
    if (updateWaterDto.technical_condition !== undefined)
      payload.technical_condition = updateWaterDto.technical_condition;
    if (updateWaterDto.latitude !== undefined)
      payload.latitude = updateWaterDto.latitude;
    if (updateWaterDto.longitude !== undefined)
      payload.longitude = updateWaterDto.longitude;
    if (updateWaterDto.pdf_url !== undefined)
      payload.pdf_url = updateWaterDto.pdf_url;
    if (updateWaterDto.priority !== undefined)
      payload.priority = updateWaterDto.priority;

    return this.waterRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ...payload,
    });
  }

  remove(id: Water['id']) {
    return this.waterRepository.remove(id);
  }
}
