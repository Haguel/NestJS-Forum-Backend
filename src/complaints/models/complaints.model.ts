import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Post } from '../../posts/models/posts.model';

interface ComplaintCreationArggs {
    complaintText: string;
    postId: number;
}

@Table({ tableName: 'complaints' })
export class Complaint extends Model<Complaint, ComplaintCreationArggs> {
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @Column({ type: DataTypes.STRING, allowNull: false })
    complaintText: string;

    @ForeignKey(() => Post)
    @Column
    postId: number;

    @BelongsTo(() => Post)
    post: Post;
}