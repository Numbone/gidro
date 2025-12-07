import { ApiProperty } from '@nestjs/swagger';

export class Region {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Акмолинская область',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Akmola Region',
  })
  name_en?: string;

  @ApiProperty({
    type: String,
    example: 'AKM',
  })
  code?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
