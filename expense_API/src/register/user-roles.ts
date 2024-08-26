import { RolesBuilder } from "nest-access-control";

export enum UserRoles{
    Admin='Admin',
    Reader='Reader'

}
export const roles:RolesBuilder=new RolesBuilder()

roles.grant(UserRoles.Reader).readAny(["income"])
.grant(UserRoles.Admin)
.extend(UserRoles.Reader)
.updateAny(["income"])
.createAny(["income"])
.deleteAny(["income"])