import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
  @Field((type) => String)
  @Column('character varying',{primary: true})
  id: string | null;

  @Field((type) => String)
  @Column('character varying', { name: 'name', nullable: true })
  name: string | null;

  @Field((type) => String)
  @Column('character varying', { name: 'email', unique: true, nullable: true })
  email: string | null;

  @Column('character varying', { name: 'password', nullable: false })
  password: string | null;

  @Field((type) => String)
  @Column('character varying', { name: 'gender', nullable: true })
  gender?: string | null;

  @Field((type) => String)
  @Column('character varying', { name: 'country', nullable: true })
  country?: string | null;

  @Field((type) => String)
  @Column('character varying', { name: 'googleId', nullable: true })
  googleID?: string | null;
}
