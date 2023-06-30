import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "./posts.model";
import { User } from "src/users/models/users.model";
import { ApiProperty } from "@nestjs/swagger";

export class LikeCreationArggs {
    postId: number;
    userId: number;
}

@Table({ timestamps: false, tableName: 'likes' })
export class Like extends Model<Like> {
    @ApiProperty({
        type: Number,
        nullable: false,
        example: 1,
    })
    @ForeignKey(() => Post)
    @Column({ allowNull: false })
    postId: number;

    @BelongsTo(() => Post)
    post: Post;

    @ApiProperty({
        type: Number,
        nullable: false,
        example: 1,
    })
    @ForeignKey(() => User)
    @Column({ allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}