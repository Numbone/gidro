import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { WatersService } from './waters.service';
import { CreateWaterDto } from './dto/create-water.dto';
import { UpdateWaterDto } from './dto/update-water.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Water } from './domain/water';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllWatersDto } from './dto/find-all-waters.dto';

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

    return infinityPagination(
      await this.watersService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filters: query,
      }),
      { page, limit },
    );
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
