import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Complaint } from "../../complaints/models/complaints.model";
import { User } from "src/users/models/users.model";
import { Like } from "./likes.model";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class PostCreationArggs {
    userId: number;
    title: string;
    description: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationArggs> {
    @ApiPropertyOptional({
        type: Number,
        nullable: false,
        example: 1,
        description: "Unique id"
    })
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @ApiProperty({
        type: String,
        nullable: false,
        example: "I like shaurma too",
    })
    @Column({ type: DataTypes.STRING, allowNull: false })
    title: string;


    @ApiProperty({
        type: String,
        nullable: false,
        example: "Btw I really like shaurma. The origin of shaurma is somewhere in Arabia but it's very popular here, in Ukraine!",
    })
    @Column({ type: DataTypes.STRING, allowNull: false })
    description: string;

    @HasMany(() => Like)
    likes: Like[];

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

    @ApiPropertyOptional({ type: Complaint, isArray: true })
    @HasMany(() => Complaint)
    complaints: Complaint[];
}