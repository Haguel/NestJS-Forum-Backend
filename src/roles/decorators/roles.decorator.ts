import { SetMetadata } from "@nestjs/common";
import { roleType } from "../types/roles.types";

export const RolesDecorator = (...roles: roleType[]) => SetMetadata('roles', roles);