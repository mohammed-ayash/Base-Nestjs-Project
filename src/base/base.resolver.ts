import { Type, UsePipes } from '@nestjs/common';
import { Args, Int, Mutation, Query } from '@nestjs/graphql';
import { AbstractValidationPipe } from './abstract-validation.pipe';
import { ClassType } from './class.type';
import { BaseServiceInterFace } from './interface/base.service.interface';
import { ICrudResolver } from './interface/iCrud.resolver';

export function ResolverFactory<C, U, Q, ET, LET>(
  createDto: Type<C>,
  updateDto: Type<U>,
  queryDto: Type<Q>,
  crudType: Type<ET>,
  listCrudType: Type<LET>,
  resourse: string,
): ClassType<ICrudResolver<C, U, Q>> {
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

  class CrudResolver<T, C, U, Q> implements ICrudResolver<C, U, Q> {
    constructor(private readonly service: BaseServiceInterFace<T, C, U, Q>) {}

    @UsePipes(queryPipe)
    @Query(() => listCrudType, { name: 'getAll' + resourse })
    async getAll(
      @Args('filters', { type: () => queryDto })
      query?: Q,
    ) {
      const data = await this.service.findAll(query);
      return await this.successPaginationResponse(data, query);
    }

    @UsePipes(createPipe)
    @Mutation(() => crudType, { name: 'create' + resourse })
    async create(@Args('createDto', { type: () => createDto }) createDto: C) {
      return await this.service.create(createDto);
    }

    @Query(() => crudType, { name: 'getOne' + resourse })
    async getOne(@Args('id', { type: () => Int }) id: number) {
      return await this.service.findOne(id);
    }
    @UsePipes(updatePipe)
    @Mutation(() => crudType, { name: 'update' + resourse })
    async update(
      @Args('updateDto', { type: () => updateDto })
      updateDto: U,
    ) {
      return await this.service.update(updateDto['id'], updateDto);
    }

    @Mutation(() => crudType, { name: 'delete' + resourse })
    async delete(@Args('id', { type: () => Int }) id: number) {
      return await this.service.remove(id);
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
        items: result,
        totalItems: total,
        totalPages: Math.floor(total / (filterDto.pageSize ?? 10)) + 1,
        currentPage: filterDto.page ?? 1,
      };
    }
  }

  return CrudResolver;
}
