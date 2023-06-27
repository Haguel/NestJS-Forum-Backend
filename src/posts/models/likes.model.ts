import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Post } from "./posts.model";
import { User } from "src/users/models/users.model";

export class LikeCreationArggs {
    postId: number;
    userId: number;
}

@Table({ timestamps: false, tableName: 'likes' })
export class Like extends Model<Like> {
    @ForeignKey(() => Post)
    @Column({ allowNull: false })
    postId: number;

    @BelongsTo(() => Post)
    post: Post;

    @ForeignKey(() => User)
    @Column({ allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User;
}