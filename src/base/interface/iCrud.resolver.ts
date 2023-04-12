export interface ICrudResolver<CreateDto, UpdateDto, QueryDto> {
  getAll(query: QueryDto): Promise<any>;

  create(body: CreateDto): Promise<any>;

  getOne(id: number): Promise<any>;

  update(body: UpdateDto, id: number): Promise<any>;

  delete(id: number): Promise<Partial<any>>;
}
