import { SetMetadata } from "@nestjs/common";
import { roleType } from "../common/roles.common";

export const RolesDecorator = (...roles: roleType[]) => SetMetadata('roles', roles);