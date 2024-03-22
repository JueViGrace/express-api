import { ISession } from 'connect-typeorm';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sessions' })
export class SessionsEntity implements ISession {
  @Index()
  @Column('bigint')
  expiredAt: number;

  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Column('text')
  json: string;
}
