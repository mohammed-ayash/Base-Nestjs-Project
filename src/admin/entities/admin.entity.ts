import { Column, Entity, Unique } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { BaseModel } from 'src/base/base-model.entity';

@Entity()
@Unique('unique_email', ['email'])
export class Admin extends BaseModel {
  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: true })
  active: boolean;

  async validtionPassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
}
