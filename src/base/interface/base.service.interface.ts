export interface BaseServiceInterFace<T, C, U, Q> {
  create(createDto: C): Promise<T>;

  findAll(baseFilterDto: Q): Promise<T[]>;

  findOne(id: number): Promise<T>;

  update(id: number, updateDto: U): Promise<T>;

  remove(id: number): Promise<T>;

  paginate(query, baseFilterDto: Q);

  getNewEntity();
}
