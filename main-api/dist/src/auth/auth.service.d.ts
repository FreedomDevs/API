import { LoginDto, RegisterDto } from './dto';
import { UserService } from '@user/user.service';
import { IToken } from './interfaces';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly logger;
    constructor(userService: UserService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        id: string;
        name: string;
        roles: import(".prisma/client").$Enums.Roles[];
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    login(dto: LoginDto): Promise<IToken>;
}
