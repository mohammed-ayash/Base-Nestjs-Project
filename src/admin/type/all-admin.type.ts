import { Field, ObjectType } from '@nestjs/graphql';
import { AdminType } from './admin.type';

@ObjectType('allAdmins')
export class AllAdminType {
  @Field(() => [AdminType], { nullable: true })
  items!: AdminType[];

  @Field({ nullable: true })
  totalItems!: number;

  @Field({ nullable: true })
  totalPages!: number;

  @Field({ nullable: true })
  currentPage!: number;
}
