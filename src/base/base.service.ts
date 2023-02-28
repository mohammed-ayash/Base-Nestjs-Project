import { BaseServiceInterFace } from './interface/base.service.interface';

export abstract class BaseService<T, C, U, FilterDto>
  implements BaseServiceInterFace<T, C, U, FilterDto>
{
  constructor(protected readonly baseRepositry, protected readonly resourse) {}

  async create(createDto: C): Promise<T> {
    const entity = this.getNewEntity();
    Object.assign(entity, createDto);

    return await this.baseRepositry.save(entity);
  }

  async findAll(baseFilterDto: FilterDto): Promise<T[]> {
    let query = await this.baseRepositry.createQueryBuilder(this.resourse);

    query = await this.baseRepositry.applyFilter(query, baseFilterDto);
    return await this.paginate(query, baseFilterDto);
  }

  async findOne(id: number): Promise<T> {
    return await this.baseRepositry.findOneByOrFail({ id });
  }

  async update(id: number, updateDto: U): Promise<T> {
    const entity = await this.baseRepositry.findOneByOrFail({ id });
    Object.assign(entity, updateDto);

    await this.baseRepositry.save({ ...entity });
    return entity;
  }

  async remove(id: number): Promise<T> {
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
