import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/users.model";

export class RoleCreationArgs {
    accessLevel: number;
    title: string;
}

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model<Role, RoleCreationArgs> {
    @ApiPropertyOptional({ type: Number, nullable: false, example: 1, description: "Unique id" })
    @Column({ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @ApiProperty({ type: Number, nullable: false, example: 1 })
    @Column({ type: DataTypes.INTEGER, defaultValue: 1 })
    accessLevel: number;

    @ApiProperty({ type: String, nullable: false, example: "ADMIN", })
    @Column({ type: DataTypes.STRING, defaultValue: 'user' })
    title: string;

    @ApiPropertyOptional({ type: User, isArray: true })
    @HasMany(() => User)
    users: User[]
}