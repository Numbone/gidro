import { Water } from '../../../../domain/water';
import { WaterEntity } from '../entities/water.entity';

export class WaterMapper {
  static toDomain(raw: WaterEntity): Water {
    const domainEntity = new Water();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.region = raw.region;
    domainEntity.resource_type = raw.resource_type;
    domainEntity.water_type = raw.water_type;
    domainEntity.fauna = raw.fauna;
    domainEntity.passport_date = raw.passport_date;
    domainEntity.technical_condition = raw.technical_condition;
    domainEntity.latitude = raw.latitude;
    domainEntity.longitude = raw.longitude;
    domainEntity.pdf_url = raw.pdf_url ?? '';
    domainEntity.priority = raw.priority ?? 1;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Water): WaterEntity {
    const persistenceEntity = new WaterEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.region = domainEntity.region;
    persistenceEntity.resource_type = domainEntity.resource_type;
    persistenceEntity.water_type = domainEntity.water_type;
    persistenceEntity.fauna = domainEntity.fauna;
    persistenceEntity.passport_date = domainEntity.passport_date;
    persistenceEntity.technical_condition = domainEntity.technical_condition;
    persistenceEntity.latitude = domainEntity.latitude;
    persistenceEntity.longitude = domainEntity.longitude;
    persistenceEntity.pdf_url = domainEntity.pdf_url;
    persistenceEntity.priority = domainEntity.priority;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
