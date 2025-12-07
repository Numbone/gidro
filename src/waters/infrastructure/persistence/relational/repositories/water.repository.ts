import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { WaterEntity } from '../entities/water.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Water } from '../../../../domain/water';
import { WaterRepository } from '../../water.repository';
import { WaterMapper } from '../mappers/water.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import {
  FindAllWatersDto,
  SortOrder,
} from '../../../../dto/find-all-waters.dto';

@Injectable()
export class WaterRelationalRepository implements WaterRepository {
  constructor(
    @InjectRepository(WaterEntity)
    private readonly waterRepository: Repository<WaterEntity>,
  ) {}

  async create(data: Water): Promise<Water> {
    const persistenceModel = WaterMapper.toPersistence(data);
    const newEntity = await this.waterRepository.save(
      this.waterRepository.create(persistenceModel),
    );
    return WaterMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: FindAllWatersDto;
  }): Promise<{ data: Water[]; hasNextPage: boolean }> {
    const queryBuilder = this.waterRepository.createQueryBuilder('water');

    if (filters?.search) {
      queryBuilder.andWhere('LOWER(water.name) LIKE LOWER(:search)', {
        search: `%${filters.search}%`,
      });
    }

    if (filters) {
      if (filters.region) {
        queryBuilder.andWhere('water.region = :region', {
          region: filters.region,
        });
      }

      if (filters.resource_type) {
        queryBuilder.andWhere('water.resource_type = :resource_type', {
          resource_type: filters.resource_type,
        });
      }

      if (filters.water_type) {
        queryBuilder.andWhere('water.water_type = :water_type', {
          water_type: filters.water_type,
        });
      }

      if (filters.fauna !== undefined) {
        queryBuilder.andWhere('water.fauna = :fauna', { fauna: filters.fauna });
      }

      if (filters.passport_date_from && filters.passport_date_to) {
        queryBuilder.andWhere(
          'water.passport_date BETWEEN :dateFrom AND :dateTo',
          {
            dateFrom: filters.passport_date_from,
            dateTo: filters.passport_date_to,
          },
        );
      } else if (filters.passport_date_from) {
        queryBuilder.andWhere('water.passport_date >= :dateFrom', {
          dateFrom: filters.passport_date_from,
        });
      } else if (filters.passport_date_to) {
        queryBuilder.andWhere('water.passport_date <= :dateTo', {
          dateTo: filters.passport_date_to,
        });
      }

      if (filters.technical_condition_from && filters.technical_condition_to) {
        queryBuilder.andWhere(
          'water.technical_condition BETWEEN :condFrom AND :condTo',
          {
            condFrom: filters.technical_condition_from,
            condTo: filters.technical_condition_to,
          },
        );
      } else if (filters.technical_condition_from) {
        queryBuilder.andWhere('water.technical_condition >= :condFrom', {
          condFrom: filters.technical_condition_from,
        });
      } else if (filters.technical_condition_to) {
        queryBuilder.andWhere('water.technical_condition <= :condTo', {
          condTo: filters.technical_condition_to,
        });
      }
    }

    if (filters?.sortField) {
      const order = filters.sortOrder === SortOrder.DESC ? 'DESC' : 'ASC';
      queryBuilder.orderBy(`water.${filters.sortField}`, order);
    } else {
      // Сортировка по умолчанию: высокий приоритет первым
      queryBuilder.orderBy('water.priority', 'DESC');
    }

    // Получаем общее количество записей ДО применения пагинации
    const total = await queryBuilder.getCount();

    // Применяем пагинацию
    queryBuilder
      .skip(paginationOptions.page * paginationOptions.limit) // если page начинается с 0
      .take(paginationOptions.limit);

    const entities = await queryBuilder.getMany();

    // Проверяем, есть ли следующая страница
    const hasNextPage =
      (paginationOptions.page + 1) * paginationOptions.limit < total;

    return {
      data: entities.map((entity) => WaterMapper.toDomain(entity)),
      hasNextPage,
    };
  }

  async findById(id: Water['id']): Promise<NullableType<Water>> {
    const entity = await this.waterRepository.findOne({
      where: { id },
    });

    return entity ? WaterMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Water['id'][]): Promise<Water[]> {
    const entities = await this.waterRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => WaterMapper.toDomain(entity));
  }

  async update(id: Water['id'], payload: Partial<Water>): Promise<Water> {
    const entity = await this.waterRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.waterRepository.save(
      this.waterRepository.create(
        WaterMapper.toPersistence({
          ...WaterMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return WaterMapper.toDomain(updatedEntity);
  }

  async remove(id: Water['id']): Promise<void> {
    await this.waterRepository.delete(id);
  }
}
