export interface BaseFilterInterface {
  applyFilter(query, _execute);

  filtable(): any;

  getTableName();

  equalOperation(query, key, value);

  isOperation(query, key, value);

  booleanOperation(query, key, value);

  greaterOperation(query, key, value);

  lessOperation(query, key, value);

  likeOperation(query, key, value);
}
