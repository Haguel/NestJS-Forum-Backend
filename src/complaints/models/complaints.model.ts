import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Post } from '../../posts/models/posts.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface ComplaintCreationArggs {
    complaintText: string;
    postId: number;
}

@Table({ tableName: 'complaints' })
export class Complaint extends Model<Complaint, ComplaintCreationArggs> {
    @ApiPropertyOptional({ type: Number, nullable: false, example: 1, description: "Unique id" })
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @ApiProperty({ type: String, nullable: false, example: "This post is contained forbidden content" })
    @Column({ type: DataTypes.STRING, allowNull: false })
    complaintText: string;

    @ApiProperty({ type: Number, nullable: false, example: 1 })
    @ForeignKey(() => Post)
    @Column
    postId: number;

    @BelongsTo(() => Post)
    post: Post;
}
