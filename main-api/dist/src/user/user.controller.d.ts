import { UserService } from './user.service';
import { UserResponse } from '@user/responses';
import { IJwtPayload } from '@auth/interfaces';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(dto: any): Promise<UserResponse>;
    findOneUser(idOrEmail: string): Promise<UserResponse>;
    findAllUser(): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        roles: import(".prisma/client").$Enums.Roles[];
    }[]>;
    findMe(token: string): Promise<UserResponse>;
    validToken(token: string): {
        isValid: boolean;
    } | undefined;
    deleteUser(id: string, uIDS: IJwtPayload): Promise<UserResponse>;
    uploadAvatar(file: Express.Multer.File, user: IJwtPayload): Promise<UserResponse>;
}
