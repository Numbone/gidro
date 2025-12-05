import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ResourceType, WaterType } from '../domain/water';
import { Type } from 'class-transformer';

export class CreateWaterDto {
  @ApiProperty({ example: 'Озеро Бурабай', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Акмолинская область', type: String })
  @IsNotEmpty()
  @IsString()
  region: string;

  @ApiProperty({ enum: ResourceType, example: ResourceType.LAKE })
  @IsEnum(ResourceType)
  resource_type: ResourceType;

  @ApiProperty({ enum: WaterType, example: WaterType.FRESH })
  @IsEnum(WaterType)
  water_type: WaterType;

  @ApiProperty({ example: true, description: 'Есть ли фауна' })
  @IsBoolean()
  fauna: boolean;

  @ApiProperty({
    example: '2023-05-12',
    type: String,
    description: 'Дата паспорта объекта',
  })
  @Type(() => Date)
  @IsDate()
  passport_date: Date;

  @ApiProperty({
    example: 4,
    description: 'Техническое состояние (1–5)',
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  technical_condition: number;

  @ApiProperty({ example: 53.093, description: 'Широта' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 70.3036, description: 'Долгота' })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({ example: 'https://example.com/passports/burabay.pdf' })
  @IsOptional()
  @IsString()
  pdf_url?: string;

  @ApiPropertyOptional({ example: 85, description: 'Приоритет объекта' })
  @IsOptional()
  @IsNumber()
  priority?: number;
}
