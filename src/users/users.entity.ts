import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Users extends Model<Users> {
  @Column
  id:string

  @Column
  username: string;

  @Column
  email: string;

  @Column
  phone: string;
}
