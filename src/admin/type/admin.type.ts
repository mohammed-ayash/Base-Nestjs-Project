import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('admin')
export class AdminType {
  @Field({ nullable: true })
  id!: number;

  @Field({ nullable: true })
  full_name!: string;

  @Field({ nullable: true })
  email!: string;

  @Field({ nullable: true })
  phone_number!: string;

  @Field({ nullable: true })
  active!: boolean;
}
