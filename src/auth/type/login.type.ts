import { Field, ObjectType } from '@nestjs/graphql';
import { AdminType } from 'src/admin/type/admin.type';

@ObjectType('login')
export class LoginType {
  @Field({ nullable: true })
  access_token!: string;

  @Field({ nullable: true })
  data!: AdminType;
}
