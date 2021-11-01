import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { SampleRegistDto, SampleUpdateDto } from './class/sample.dto';
import { SampleResponse } from './class/sample.response';
import { SampleService } from './sample.service';

@ApiTags('サンプル')
@Controller('sample')
export class SampleController {
  constructor(private readonly service: SampleService) {}

  @ApiOperation({ description: '一覧取得' })
  @ApiResponse({ type: SampleResponse, isArray: true })
  @Get('/list')
  async list(): Promise<SampleResponse[]> {
    return this.service.list();
  }

  @ApiOperation({ description: '詳細取得' })
  @ApiResponse({ type: SampleResponse })
  @ApiNotFoundResponse()
  @Get('/:id')
  async detail(@Param('id', ParseIntPipe) id: number): Promise<SampleResponse> {
    return this.service.detail(id);
  }

  @ApiOperation({ description: '登録処理' })
  @ApiResponse({ type: SampleResponse })
  @ApiBadRequestResponse()
  @Post('register')
  async register(@Body() body: SampleRegistDto): Promise<SampleResponse> {
    return this.service.register(body);
  }

  @ApiOperation({ description: '更新処理' })
  @ApiResponse({ type: SampleResponse })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('update')
  async update(@Body() body: SampleUpdateDto): Promise<SampleResponse> {
    return this.service.update(body);
  }

  @ApiOperation({ description: '削除処理' })
  @ApiResponse({ type: SampleResponse })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('/delete/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<SampleResponse, 'id'>> {
    return this.service.delete(id);
  }
}
