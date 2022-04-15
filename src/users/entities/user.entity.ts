import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User { 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 70})
  name: string;

  @Column({length: 20})
  cargo: string;

  @Column({length:20})
  BU: string;
}


