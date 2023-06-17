import { SetMetadata } from "@nestjs/common";
import { roleTitle } from "../common/roles.common";

export const RolesDecorator = (...roleTitles: roleTitle[]) => SetMetadata('roleTitles', roleTitles);