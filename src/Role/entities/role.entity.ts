import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseModel } from 'src/base/base-model.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique('unique_name', ['name'])
export class Role extends BaseModel {
  @Column()
  name: string;

  @Column()
  display_name: string;

  @Column({ type: 'simple-array' })
  permissions: string[];

  @Exclude()
  @OneToMany(() => Admin, (admin) => admin.role)
  admins: Admin[];
}
