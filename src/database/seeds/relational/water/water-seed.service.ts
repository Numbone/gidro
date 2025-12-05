import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WaterEntity } from '../../../../waters/infrastructure/persistence/relational/entities/water.entity';
import { ResourceType, WaterType } from '../../../../waters/domain/water';

@Injectable()
export class WaterSeedService {
  constructor(
    @InjectRepository(WaterEntity)
    private repository: Repository<WaterEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count > 0) {
      return;
    }

    const waters = [
      {
        name: 'Озеро Бурабай',
        region: 'Акмолинская область',
        resource_type: ResourceType.LAKE,
        water_type: WaterType.FRESH,
        fauna: true,
        passport_date: new Date('2023-05-12'),
        technical_condition: 4,
        latitude: 53.093,
        longitude: 70.3036,
        pdf_url: 'https://example.com/passports/burabay.pdf',
        priority: 85,
      },
      {
        name: 'Канал Иртыш–Караганда',
        region: 'Карагандинская область',
        resource_type: ResourceType.CHANNEL,
        water_type: WaterType.FRESH,
        fauna: false,
        passport_date: new Date('2022-11-03'),
        technical_condition: 3,
        latitude: 49.806,
        longitude: 73.1034,
        pdf_url: 'https://example.com/passports/irtysh-karaganda.pdf',
        priority: 74,
      },
    ];

    await this.repository.save(waters.map((w) => this.repository.create(w)));
  }
}
