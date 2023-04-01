import { ClassType } from './class.type';

export function BaseRequestDto<T extends ClassType>(ResourceCls: T) {
  return ResourceCls;
}
