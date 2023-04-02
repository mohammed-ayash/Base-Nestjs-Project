import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Type,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { PermissionGuard } from 'src/auth/Guard/permission.guard';
import { Permissions } from 'src/auth/permissions.decorator';
import { AbstractValidationPipe } from './abstract-validation.pipe';
import { BaseRequestDto } from './base.dto';
import { ClassType } from './class.type';
import { BaseServiceInterFace } from './interface/base.service.interface';
import { ICrudController } from './interface/iCrud.controller';
import { ApiOkResponsed } from './response.dto';

export function ControllerFactory<C, U, Q>(
  createDto: Type<C>,
  updateDto: Type<U>,
  queryDto: Type<Q>,
  resourse: string,
): ClassType<ICrudController<C, U, Q>> {
  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createDto },
  );
  const updatePipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: updateDto },
  );
  const queryPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { query: queryDto },
  );

  class CrudController<T, C, U, Q> implements ICrudController<C, U, Q> {
    constructor(private readonly service: BaseServiceInterFace<T, C, U, Q>) {}

    @Get()
    @UsePipes(queryPipe)
    @ApiQuery({ type: BaseRequestDto(queryDto) })
    @ApiOkResponsed(BaseRequestDto(queryDto))
    @UseGuards(PermissionGuard)
    @Permissions('show ' + resourse)
    async getAll(@Query() query: Q): Promise<any> {
      const entities = await this.service.findAll(query);
      return this.successPaginationResponse(entities, query);
    }

    @Post()
    @UsePipes(createPipe)
    @ApiOkResponsed(BaseRequestDto(createDto))
    @ApiBody({ type: BaseRequestDto(createDto) })
    @UseGuards(PermissionGuard)
    @Permissions('create ' + resourse, 'show ' + resourse)
    async create(@Body() body: C): Promise<any> {
      const entity = await this.service.create(body);

      return this.successResponse(entity);
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @Permissions('show ' + resourse)
    async getOne(@Param('id') id: number): Promise<any> {
      const entity = await this.service.findOne(id);
      return this.successResponse(entity);
    }

    @Patch(':id')
    @UsePipes(updatePipe)
    @ApiOkResponsed(BaseRequestDto(createDto))
    @ApiBody({ type: BaseRequestDto(createDto) })
    @UseGuards(PermissionGuard)
    @Permissions('update ' + resourse, 'show ' + resourse)
    async update(@Body() body: U, @Param('id') id: number): Promise<any> {
      const entity = await this.service.update(id, body);

      return this.successResponse(entity);
    }

    @Delete(':id')
    @UseGuards(PermissionGuard)
    @Permissions('delete ' + resourse, 'show ' + resourse)
    async delete(@Param('id') id: number): Promise<Partial<any>> {
      const entity = await this.service.remove(id);
      return this.successResponse(entity);
    }

    successResponse(data) {
      return {
        status: 'success',
        data,
      };
    }

    successPaginationResponse(data, filterDto) {
      const [result, total] = data;

      return {
        status: 'success',
        data: {
          items: result,
          totalItems: total,
          totalPages: Math.floor(total / (filterDto.pageSize ?? 10)) + 1,
          currentPage: filterDto.page ?? 1,
        },
      };
    }
  }

  return CrudController;
}
