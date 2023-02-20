export interface BaseServiceInterFace<C, U, BaseFilterInterface> {
  create(createDto: C);

  findAll(baseFilterDto: BaseFilterInterface);

  findOne(id: number);

  update(id: number, updateDto: U);

  remove(id: number);

  paginate(query, baseFilterDto: BaseFilterInterface);

  getNewEntity();
}
