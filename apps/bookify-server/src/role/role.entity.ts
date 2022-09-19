import { CoreEntity } from '../core/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends CoreEntity {
  @Column({
    unique: true,
  })
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
