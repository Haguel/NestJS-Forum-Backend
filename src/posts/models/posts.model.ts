import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Complaint } from "./complaints.model";
import { User } from "src/users/models/users.model";

interface PostCreationArggs {
    title: string;
    description: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationArggs> {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @Column({ type: DataTypes.STRING, allowNull: false })
    title: string;

    @Column({ type: DataTypes.STRING })
    description: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Complaint)
    complaints: Complaint[];
}