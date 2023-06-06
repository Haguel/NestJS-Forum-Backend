import { DataTypes } from "sequelize";
import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/models/posts.model";
import { Role } from "src/roles/models/roles.model";
import { UserRole } from "src/roles/models/user-roles.model";

interface UserCreationArggs {
    username: string;
    password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationArggs> {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @Column({ type: DataTypes.STRING, allowNull: false })
    username: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    password: string;

    @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
    isBanned: boolean;

    @Column({ type: DataTypes.STRING })
    banReason: boolean;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    @HasMany(() => Post)
    post: Post[];
}