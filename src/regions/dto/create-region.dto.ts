import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateRegionDto {
  // Don't forget to use the class-validator decorators in the DTO properties.
  @ApiProperty({ example: 'Акмолинская область', type: String })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Akmola Region', type: String })
  @IsOptional()
  @IsString()
  name_en?: string;

  @ApiPropertyOptional({ example: 'AKM', type: String })
  @IsOptional()
  @IsString()
  code?: string;
}
