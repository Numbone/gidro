import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ResourceType, WaterType } from '../domain/water';

export enum SortField {
  NAME = 'name',
  REGION = 'region',
  RESOURCE_TYPE = 'resource_type',
  WATER_TYPE = 'water_type',
  FAUNA = 'fauna',
  PASSPORT_DATE = 'passport_date',
  TECHNICAL_CONDITION = 'technical_condition',
  PRIORITY = 'priority',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FindAllWatersDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Поиск по названию объекта',
    example: 'Бурабай',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: SortField,
    description: 'Поле для сортировки',
    example: SortField.PRIORITY,
  })
  @IsOptional()
  @IsEnum(SortField)
  sortField?: SortField;

  @ApiPropertyOptional({
    enum: SortOrder,
    description: 'Направление сортировки',
    example: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @ApiPropertyOptional({
    description: 'Область',
    example: 'Акмолинская область',
  })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({
    enum: ResourceType,
    description: 'Тип водного ресурса',
  })
  @IsOptional()
  @IsEnum(ResourceType)
  resource_type?: ResourceType;

  @ApiPropertyOptional({
    enum: WaterType,
    description: 'Тип воды',
  })
  @IsOptional()
  @IsEnum(WaterType)
  water_type?: WaterType;

  @ApiPropertyOptional({
    description: 'Наличие фауны',
    type: Boolean,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  fauna?: boolean;

  @ApiPropertyOptional({
    description: 'Дата паспорта ОТ (YYYY-MM-DD)',
    example: '2020-01-01',
  })
  @IsOptional()
  @IsDateString()
  passport_date_from?: string;

  @ApiPropertyOptional({
    description: 'Дата паспорта ДО (YYYY-MM-DD)',
    example: '2024-12-31',
  })
  @IsOptional()
  @IsDateString()
  passport_date_to?: string;

  @ApiPropertyOptional({
    description: 'Категория технического состояния ОТ',
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  technical_condition_from?: number;

  @ApiPropertyOptional({
    description: 'Категория технического состояния ДО',
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  technical_condition_to?: number;
}
