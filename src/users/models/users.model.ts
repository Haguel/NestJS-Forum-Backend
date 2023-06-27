import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Like } from "src/posts/models/likes.model";
import { Post } from "src/posts/models/posts.model";
import { Role } from "src/roles/models/roles.model";

export interface UserCreationArggs {
    email: string;
    username: string;
    passwordHash: string;
    roleId: number;
    role: Role;
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

    @Column({ type: DataTypes.DATE })
    banExpiredAt: Date;

    @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
    isMuted: boolean;

    @Column({ type: DataTypes.STRING })
    muteReason: string;

    @Column({ type: DataTypes.DATE })
    muteExpiredAt: Date;

    @ForeignKey(() => Role)
    @Column({ allowNull: false })
    roleId: number;

    @BelongsTo(() => Role)
    role: Role;

    @HasMany(() => Post)
    posts: Post[];

    @HasMany(() => Like)
    likes: Like[]
}