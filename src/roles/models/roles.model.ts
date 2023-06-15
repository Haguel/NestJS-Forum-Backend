import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/users.model";
import { UserRole } from "./user-roles.model";
import { roleType } from "../types/roles.types";

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model<Role> {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @Column({ type: DataTypes.STRING, defaultValue: 'user' })
    title: roleType;

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}