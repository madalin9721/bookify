import { CoreEntity } from '../core/core.entity';
import { BeforeInsert, BeforeUpdate, Column, ManyToOne } from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';

import * as bcrypt from 'bcryptjs';
import { Role } from '../role/role.entity';

export class User extends CoreEntity {
  @Column({
    unique: true,
  })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Role, { eager: true })
  role: Role;

  @BeforeInsert()
  @BeforeUpdate()
  async passwordToHash() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  /**
   * Overrides toJson() in order to make use of the Exclude() annotation used on the 'password' field
   */
  toJSON() {
    return instanceToPlain(this);
  }
}
