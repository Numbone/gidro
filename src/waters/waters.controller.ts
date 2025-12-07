import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { Water } from './domain/water';
import { CreateWaterDto } from './dto/create-water.dto';
import { FindAllWatersDto } from './dto/find-all-waters.dto';
import { UpdateWaterDto } from './dto/update-water.dto';
import { WatersService } from './waters.service';

@ApiTags('Waters')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'waters',
  version: '1',
})
export class WatersController {
  constructor(private readonly watersService: WatersService) {}

  @Post()
  @ApiCreatedResponse({
    type: Water,
  })
  create(@Body() createWaterDto: CreateWaterDto) {
    return this.watersService.create(createWaterDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Water),
  })
  async findAll(
    @Query() query: FindAllWatersDto,
  ): Promise<InfinityPaginationResponseDto<Water>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const result = await this.watersService.findAllWithPagination({
      paginationOptions: {
        page,
        limit,
      },
      filters: query,
    });

    // Просто возвращаем результат напрямую
    return result;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Water,
  })
  findById(@Param('id') id: string) {
    return this.watersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Water,
  })
  update(@Param('id') id: string, @Body() updateWaterDto: UpdateWaterDto) {
    return this.watersService.update(id, updateWaterDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.watersService.remove(id);
  }
}
