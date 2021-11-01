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
import { TestUser } from 'src/database/entities/testUser.entity';
import { SampleRegistDto, SampleUpdateDto } from './class/sample.dto';
import { SampleService } from './sample.service';

@ApiTags('サンプル')
@Controller('sample')
export class SampleController {
  constructor(private readonly service: SampleService) {}

  @ApiOperation({ description: '一覧取得' })
  @ApiResponse({ type: TestUser, isArray: true })
  @Get('/list')
  async list(): Promise<TestUser[]> {
    return this.service.list();
  }

  @ApiOperation({ description: '詳細取得' })
  @ApiResponse({ type: TestUser })
  @ApiNotFoundResponse()
  @Get('/:id')
  async detail(@Param('id', ParseIntPipe) id: number): Promise<TestUser> {
    return this.service.detail(id);
  }

  @ApiOperation({ description: '登録処理' })
  @ApiResponse({ type: TestUser })
  @ApiBadRequestResponse()
  @Post('register')
  async register(@Body() body: SampleRegistDto): Promise<TestUser> {
    return this.service.register(body);
  }

  @ApiOperation({ description: '更新処理' })
  @ApiResponse({ type: TestUser })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('update')
  async update(@Body() body: SampleUpdateDto): Promise<TestUser> {
    return this.service.update(body);
  }

  @ApiOperation({ description: '削除処理' })
  @ApiResponse({ type: TestUser })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('/delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<TestUser> {
    return this.service.delete(id);
  }
}
