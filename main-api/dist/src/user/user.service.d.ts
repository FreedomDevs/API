import { User } from '@prisma/client';
import { PrismaService } from "@prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "@auth/interfaces";
export declare class UserService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    save(user: Partial<User>): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        roles: import(".prisma/client").$Enums.Roles[];
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findOne(idEmailOrName: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        roles: import(".prisma/client").$Enums.Roles[];
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getAllUsers(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        roles: import(".prisma/client").$Enums.Roles[];
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getMe(token: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        roles: import(".prisma/client").$Enums.Roles[];
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    validToken(token: string): {
        isValid: boolean;
    } | undefined;
    delete(id: string, user: IJwtPayload): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        roles: import(".prisma/client").$Enums.Roles[];
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    private getAll;
    private hashPassword;
}
