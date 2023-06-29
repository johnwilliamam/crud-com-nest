import * as bcrypt from 'bcrypt';
import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({type: 'varchar', length: 100, nullable: false})
  senha: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  cargo: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  matricula: string;

  @Column({ type: 'boolean', default: false })
  demitido: string;
  
  @BeforeInsert()
  async hashPassword(){
    this.senha = await bcrypt.hash(this.senha, 10)
  }
}
