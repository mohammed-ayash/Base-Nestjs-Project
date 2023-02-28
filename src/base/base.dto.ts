import { ClassType } from './class.type';

export function BaseRequestDto<T extends ClassType>(ResourceCls: T) {
  class BaseDto extends ResourceCls {}

  return BaseDto;
}
