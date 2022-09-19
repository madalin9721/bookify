import { CoreEntity } from '../core/core.entity';
import { Column } from 'typeorm';

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
