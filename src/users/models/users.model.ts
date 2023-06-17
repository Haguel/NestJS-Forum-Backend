import { DataTypes } from "sequelize";
import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/models/posts.model";
import { Role } from "src/roles/models/roles.model";
import { UserRole } from "src/roles/models/user-roles.model";

export interface UserCreationArggs {
    email: string;
    username: string;
    passwordHash: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationArggs> {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    username: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    passwordHash: string;

    @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
    isBanned: boolean;

    @Column({ type: DataTypes.STRING })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}