import { Region } from '../../../../domain/region';
import { RegionEntity } from '../entities/region.entity';

export class RegionMapper {
  static toDomain(raw: RegionEntity): Region {
    const domainEntity = new Region();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.name_en = raw.name_en;
    domainEntity.code = raw.code;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Region): RegionEntity {
    const persistenceEntity = new RegionEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.name_en = domainEntity.name_en;
    persistenceEntity.code = domainEntity.code;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
