import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Like } from "src/posts/models/likes.model";
import { Post } from "src/posts/models/posts.model";
import { Role } from "src/roles/models/roles.model";

export class UserCreationArggs {
    email: string;
    username: string;
    passwordHash: string;
    roleId: number;
    role: Role;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationArggs> {
    @ApiPropertyOptional({
        type: Number,
        example: 1,
        nullable: false,
        description: "Unique id"
    })
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @ApiProperty({
        type: String,
        nullable: false,
        example: "users.email@gmail.com",
        description: "Unique email"
    })
    @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({
        type: String,
        nullable: false,
        example: "TestUsername"
    })
    @Column({ type: DataTypes.STRING, allowNull: false })
    username: string;

    @ApiProperty({
        type: String,
        nullable: false,
        example: "$2b$10$bU9qm46He2YLMAcSn2B5sOJN5NcXi8BhhcXUVigzfGx7.HgcrkiJm"
    })
    @Column({ type: DataTypes.STRING, allowNull: false })
    passwordHash: string;

    @ApiPropertyOptional({
        type: Boolean,
        nullable: false,
        default: false,
        example: true
    })
    @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
    isBanned: boolean;

    @ApiPropertyOptional({
        type: String,
        nullable: true,
        example: "User violated rule 3.19"
    })
    @Column({ type: DataTypes.STRING })
    banReason: string;

    @ApiPropertyOptional({
        type: Date,
        nullable: true,
        example: "2023-06-29T10:27:59.601Z"
    })
    @Column({ type: DataTypes.DATE })
    banExpiredAt: Date;

    @ApiPropertyOptional({
        type: Boolean,
        default: false,
        example: true
    })
    @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
    isMuted: boolean;

    @ApiPropertyOptional({
        type: String,
        nullable: true,
        example: "Rude behavior"
    })
    @Column({ type: DataTypes.STRING })
    muteReason: string;

    @ApiPropertyOptional({
        type: Date,
        nullable: true,
        example: "2023-06-29T10:27:59.601Z"
    })
    @Column({ type: DataTypes.DATE })
    muteExpiredAt: Date;

    @ApiProperty({
        type: Number,
        nullable: false,
        example: 1,
    })
    @ForeignKey(() => Role)
    @Column({ allowNull: false })
    roleId: number;

    @ApiProperty({
        type: Role,
        nullable: false
    })
    @BelongsTo(() => Role)
    role: Role;

    @ApiPropertyOptional({ type: Post, isArray: true })
    @HasMany(() => Post)
    posts: Post[];

    @ApiPropertyOptional({ type: Like, isArray: true })
    @HasMany(() => Like)
    likes: Like[]
}