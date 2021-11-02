import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SampleRelationNtoNUpdateDto } from './class/sample-relationnton.dto';
import { SampleRelationNtoNResponse } from './class/sample-relationnton.response';
import { SampleRelationntonService } from './sample-relationnton.service';

@ApiTags('多対多のrelation sample')
@Controller('sample-relationnton')
export class SampleRelationntonController {
  constructor(private readonly service: SampleRelationntonService) {}

  @ApiOperation({ description: '一覧取得' })
  @ApiResponse({ type: SampleRelationNtoNResponse, isArray: true })
  @Get('/list')
  async list(): Promise<SampleRelationNtoNResponse[]> {
    return this.service.list();
  }

  @ApiOperation({ description: '更新処理' })
  @ApiResponse({ type: SampleRelationNtoNResponse })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('update')
  async update(
    @Body() body: SampleRelationNtoNUpdateDto,
  ): Promise<SampleRelationNtoNResponse> {
    return this.service.update(body);
  }
}
