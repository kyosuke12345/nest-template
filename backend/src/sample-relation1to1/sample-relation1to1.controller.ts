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
  SampleRelation1to1RegisterDto,
  SampleRelation1to1UpdateDto,
} from './class/sample-relation1to1.dto';
import { SampleRelation1to1Response } from './class/sample-relation1to1.response';
import { SampleRelation1to1Service } from './sample-relation1to1.service';

@ApiTags('1対1のrelation sample')
@Controller('sample-relation1to1')
export class SampleRelation1to1Controller {
  constructor(private readonly service: SampleRelation1to1Service) {}

  @ApiOperation({ description: '一覧取得' })
  @ApiResponse({ type: SampleRelation1to1Response, isArray: true })
  @Get('/list')
  async list(): Promise<SampleRelation1to1Response[]> {
    return this.service.list();
  }

  @ApiOperation({ description: '詳細取得' })
  @ApiResponse({ type: SampleRelation1to1Response })
  @ApiNotFoundResponse()
  @Get('/:id')
  async detail(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SampleRelation1to1Response> {
    return this.service.detail(id);
  }

  @ApiOperation({ description: '登録処理' })
  @ApiResponse({ type: SampleRelation1to1Response })
  @ApiBadRequestResponse()
  @Post('register')
  async register(
    @Body() body: SampleRelation1to1RegisterDto,
  ): Promise<SampleRelation1to1Response> {
    return this.service.register(body);
  }

  @ApiOperation({ description: '更新処理' })
  @ApiResponse({ type: SampleRelation1to1Response })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('update')
  async update(
    @Body() body: SampleRelation1to1UpdateDto,
  ): Promise<SampleRelation1to1Response> {
    return this.service.update(body);
  }

  @ApiOperation({ description: '削除処理' })
  @ApiResponse({ type: SampleRelation1to1Response })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('/delete/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SampleRelation1to1Response> {
    return this.service.delete(id);
  }
}
