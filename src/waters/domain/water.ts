import { ApiProperty } from '@nestjs/swagger';

export enum ResourceType {
  LAKE = 'lake',
  CHANNEL = 'channel',
  RESERVOIR = 'reservoir',
}

export enum WaterType {
  FRESH = 'fresh',
  SALTY = 'salty',
}

export class Water {
  @ApiProperty({
    type: String,
    description: 'Уникальный идентификатор (int или uuid)',
    example: 'e2fbbd9e-4c07-4c18-9a53-4bcbad345678',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Бухар-Жырау канал',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Карагандинская область',
  })
  region: string;

  @ApiProperty({
    enum: ResourceType,
    example: ResourceType.LAKE,
  })
  resource_type: ResourceType;

  @ApiProperty({
    enum: WaterType,
    example: WaterType.FRESH,
  })
  water_type: WaterType;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Есть ли фауна',
  })
  fauna: boolean;

  @ApiProperty({
    type: Date,
    example: '2024-01-15',
    description: 'Дата паспорта объекта',
  })
  passport_date: Date;

  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 5,
    example: 3,
    description: 'Техническое состояние (1–5)',
  })
  technical_condition: number;

  @ApiProperty({
    type: Number,
    example: 51.1605,
  })
  latitude: number;

  @ApiProperty({
    type: Number,
    example: 71.4704,
  })
  longitude: number;

  @ApiProperty({
    type: String,
    example: 'https://example.com/passports/water-1.pdf',
  })
  pdf_url: string;

  @ApiProperty({
    type: Number,
    example: 82,
    description: 'Приоритет объекта',
  })
  priority: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
