import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from '../../../../regions/infrastructure/persistence/relational/entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionSeedService {
  constructor(
    @InjectRepository(RegionEntity)
    private repository: Repository<RegionEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      const regions = [
        { name: 'Акмолинская область', name_en: 'Akmola Region', code: 'AKM' },
        { name: 'Актюбинская область', name_en: 'Aktobe Region', code: 'AKT' },
        { name: 'Алматинская область', name_en: 'Almaty Region', code: 'ALM' },
        { name: 'Атырауская область', name_en: 'Atyrau Region', code: 'ATY' },
        {
          name: 'Восточно-Казахстанская область',
          name_en: 'East Kazakhstan Region',
          code: 'VKO',
        },
        { name: 'Жамбылская область', name_en: 'Jambyl Region', code: 'ZHA' },
        {
          name: 'Западно-Казахстанская область',
          name_en: 'West Kazakhstan Region',
          code: 'ZKO',
        },
        {
          name: 'Карагандинская область',
          name_en: 'Karaganda Region',
          code: 'KAR',
        },
        {
          name: 'Костанайская область',
          name_en: 'Kostanay Region',
          code: 'KOS',
        },
        {
          name: 'Кызылординская область',
          name_en: 'Kyzylorda Region',
          code: 'KYZ',
        },
        {
          name: 'Мангистауская область',
          name_en: 'Mangystau Region',
          code: 'MAN',
        },
        {
          name: 'Павлодарская область',
          name_en: 'Pavlodar Region',
          code: 'PAV',
        },
        {
          name: 'Северо-Казахстанская область',
          name_en: 'North Kazakhstan Region',
          code: 'SKO',
        },
        {
          name: 'Туркестанская область',
          name_en: 'Turkistan Region',
          code: 'TUR',
        },
        { name: 'Улытауская область', name_en: 'Ulytau Region', code: 'ULY' },
        { name: 'Абайская область', name_en: 'Abai Region', code: 'ABA' },
        { name: 'Жетысуская область', name_en: 'Jetisu Region', code: 'ZHE' },
        { name: 'город Астана', name_en: 'Astana City', code: 'AST' },
        { name: 'город Алматы', name_en: 'Almaty City', code: 'ALA' },
        { name: 'город Шымкент', name_en: 'Shymkent City', code: 'SHY' },
      ];
      await this.repository.save(this.repository.create(regions));
    }
  }
}
