import { SetMetadata } from "@nestjs/common";

export const RolesDecorator = (accessLevel: number) => SetMetadata('accessLevel', accessLevel);