import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/users.model";

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model<Role> {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @Column({ type: DataTypes.INTEGER, defaultValue: 1 })
    accessLevel: number;

    @Column({ type: DataTypes.STRING, defaultValue: 'user' })
    title: string;

    @HasMany(() => User)
    users: User[]
}