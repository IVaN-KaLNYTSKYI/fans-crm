import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class Users extends Model<Users> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  phone: string;
}
