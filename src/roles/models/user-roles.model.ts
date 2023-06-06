import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/models/users.model';

@Table({ tableName: 'user-roles' })
export class UserRole extends Model<UserRole> {
    @Column({ type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Role)
    @Column
    roleId: number;
}