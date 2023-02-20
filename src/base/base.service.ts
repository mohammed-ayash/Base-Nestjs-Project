import { BaseServiceInterFace } from './interface/base.service.interface';

export abstract class BaseService<C, U, F>
  implements BaseServiceInterFace<C, U, F>
{
  constructor(protected readonly baseRepositry, protected readonly resourse) {}

  async create(createDto: C) {
    const entity = this.getNewEntity();
    Object.assign(entity, createDto);

    return await this.baseRepositry.save(entity);
  }

  async findAll(baseFilterDto) {
    let query = await this.baseRepositry.createQueryBuilder(this.resourse);

    query = await baseFilterDto.applyFilter(query);
    return await this.paginate(query, baseFilterDto);
  }

  async findOne(id: number) {
    return await this.baseRepositry.findOneByOrFail({ id });
  }

  async update(id: number, updateDto: U) {
    const entity = await this.baseRepositry.findOneByOrFail({ id });

    return await this.baseRepositry.save({ ...entity, ...updateDto });
  }

  async remove(id: number) {
    const entity = await this.baseRepositry.findOneByOrFail({ id });
    await this.baseRepositry.delete(id);

    return entity;
  }

  async paginate(query, baseFilterDto) {
    const { page, pageSize } = baseFilterDto;
    const skip = pageSize * (page - 1) || 0;

    return await query.skip(skip).take(pageSize).getManyAndCount();
  }

  getNewEntity() {
    return null;
  }
}
