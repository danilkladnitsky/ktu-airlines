import { Role } from "guards/roles.enum"

export type JwtDto = {
    role: Role;
    id: number;
}