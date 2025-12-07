import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { RegionRepository } from './infrastructure/persistence/region.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Region } from './domain/region';

@Injectable()
export class RegionsService {
  constructor(
    // Dependencies here
    private readonly regionRepository: RegionRepository,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    // Do not remove comment below.
    // <creating-property />
    return this.regionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...createRegionDto,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.regionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Region['id']) {
    return this.regionRepository.findById(id);
  }

  findByIds(ids: Region['id'][]) {
    return this.regionRepository.findByIds(ids);
  }

  async update(
    id: Region['id'],

    updateRegionDto: UpdateRegionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.regionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ...updateRegionDto,
    });
  }

  remove(id: Region['id']) {
    return this.regionRepository.remove(id);
  }
}
