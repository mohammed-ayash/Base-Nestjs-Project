import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { BaseModel } from 'src/base/base-model.entity';
import { Role } from 'src/Role/entities/role.entity';

@Entity()
@Unique('unique_email', ['email'])
@Unique('unique_phone_number', ['phone_number'])
export class Admin extends BaseModel {
  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone_number: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Role, (role) => role.admins)
  role: Role;

  async validtionPassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
}
