import { UserService } from './user.service';
import { UserResponse } from "@user/responses";
import { IJwtPayload } from "@auth/interfaces";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(dto: any): Promise<UserResponse>;
    findOneUser(idOrEmail: string): Promise<UserResponse>;
    findAllUser(): Promise<{
        id: string;
        name: string;
        roles: import(".prisma/client").$Enums.Roles[];
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findMe(token: string): Promise<UserResponse>;
    validToken(token: string): Promise<{
        isValid: boolean;
    } | undefined>;
    deleteUser(id: string, uIDS: IJwtPayload): Promise<UserResponse>;
}
