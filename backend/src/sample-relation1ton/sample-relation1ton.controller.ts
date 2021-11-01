import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  SampleRelation1toNRegisterDto,
  SampleRelation1toNUpdateDto,
} from './class/sample-relation1ton.dto';
import { SampleRelation1toNResponse } from './class/sample-relation1ton.response';
import { SampleRelation1tonService } from './sample-relation1ton.service';

@ApiTags('1対多のrelation sample')
@Controller('sample-relation1ton')
export class SampleRelation1tonController {
  constructor(private readonly service: SampleRelation1tonService) {}

  @ApiOperation({ description: '一覧取得' })
  @ApiResponse({ type: SampleRelation1toNResponse, isArray: true })
  @Get('/list')
  async list(): Promise<SampleRelation1toNResponse[]> {
    return this.service.list();
  }

  @ApiOperation({ description: '詳細取得' })
  @ApiResponse({ type: SampleRelation1toNResponse })
  @ApiNotFoundResponse()
  @Get('/:id')
  async detail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SampleRelation1toNResponse> {
    return this.service.detail(id);
  }

  @ApiOperation({ description: '登録処理' })
  @ApiResponse({ type: SampleRelation1toNResponse })
  @ApiBadRequestResponse()
  @Post('register')
  async register(
    @Body() body: SampleRelation1toNRegisterDto,
  ): Promise<SampleRelation1toNResponse> {
    return this.service.register(body);
  }

  @ApiOperation({ description: '更新処理' })
  @ApiResponse({ type: SampleRelation1toNResponse })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('update')
  async update(
    @Body() body: SampleRelation1toNUpdateDto,
  ): Promise<SampleRelation1toNResponse> {
    return this.service.update(body);
  }

  @ApiOperation({ description: '削除処理' })
  @ApiResponse({ type: SampleRelation1toNResponse })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('/delete/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SampleRelation1toNResponse> {
    return this.service.delete(id);
  }
}
