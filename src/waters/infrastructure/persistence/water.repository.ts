import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Water } from '../../domain/water';
import { FindAllWatersDto } from '../../dto/find-all-waters.dto';

export abstract class WaterRepository {
  abstract create(
    data: Omit<Water, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Water>;

  abstract findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: FindAllWatersDto;
  }): Promise<Water[]>;

  abstract findById(id: Water['id']): Promise<NullableType<Water>>;

  abstract findByIds(ids: Water['id'][]): Promise<Water[]>;

  abstract update(
    id: Water['id'],
    payload: DeepPartial<Water>,
  ): Promise<Water | null>;

  abstract remove(id: Water['id']): Promise<void>;
}
