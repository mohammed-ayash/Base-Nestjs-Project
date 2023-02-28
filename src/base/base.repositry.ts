import { Repository } from 'typeorm';

export abstract class BaseRepositry<T, F> extends Repository<T> {
  applyFilter(query, filterDto: F, _execute = false) {
    const filtable = this.filtable();

    for (const key in filterDto) {
      if (key in filtable) {
        const methodName = filtable[key] + 'Operation';
        query = this[methodName](query, key, filterDto[key]);
      } else {
        const methodName = key + 'Filter';
        // skip loop if the property is from prototype of not a function.
        if (
          !this.hasOwnProperty(key) ||
          (typeof this[methodName] === 'undefined' &&
            typeof this[methodName] !== 'function')
        )
          continue;

        query = this[methodName](query);
      }
    }

    return _execute ? query.execute() : query;
  }

  filtable(): any {
    return {};
  }

  getTableName() {
    return '';
  }

  equalOperation(query, key, value) {
    return query.where(`${this.getTableName()}${key} = :value`, { value });
  }

  isOperation(query, key, value) {
    return query.where(`${this.getTableName()}${key} is :value`, { value });
  }

  booleanOperation(query, key, value) {
    const intValue = value === 'true' ? 1 : 0;
    return query.where(`${this.getTableName()}${key} = :intValue`, {
      intValue,
    });
  }

  greaterOperation(query, key, value) {
    return query.where(`${this.getTableName()}${key} > :value`, { value });
  }

  lessOperation(query, key, value) {
    return query.where(`${this.getTableName()}${key} < :value`, { value });
  }

  likeOperation(query, key, value) {
    value = `%${value}%`;

    return query.where(`${this.getTableName()}${key} like :value`, {
      value,
    });
  }
}
