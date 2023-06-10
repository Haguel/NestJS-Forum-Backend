import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/users.model";
import { UserRole } from "./user-roles.model";

interface RoleCreationArggs {
    title: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationArggs> {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @Column({ type: DataTypes.STRING, defaultValue: 'user' })
    title: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}