import { ForbiddenException, Injectable } from '@nestjs/common';

import { Roles, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '@auth/interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  save(user: Partial<User>) {
    if (!user.email || !user.name || !user.password) {
      throw new Error('Missing required fields: email, name, or password');
    }

    const hashedPassword = this.hashPassword(user.password);
    return this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashedPassword,
        roles: ['USER'],
      },
    });
  }

  findOne(idEmailOrName: string) {
    // if (idEmailOrName === 'all') {
    //     return this.prisma.user.findMany();
    // }
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { email: idEmailOrName },
          { name: idEmailOrName },
          { id: idEmailOrName },
        ],
      },
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getMe(token: string) {
    const tokenData = this.jwtService.verify(token);
    const { id } = tokenData;
    const profileData = this.findOne(id);
    return profileData;
  }

  validToken(token: string) {
    try {
      const tokenData = this.jwtService.verify(token);

      if (tokenData) {
        return { isValid: true };
      }
    } catch (e) {
      // Если произошла ошибка верификации, токен невалиден
      return { isValid: false };
    }
  }

  delete(id: string, user: IJwtPayload) {
    if (user.id !== id && !user.roles.includes(Roles.ADMIN)) {
      throw new ForbiddenException();
    }

    return this.prisma.user.delete({ where: { id: id } });
  }

  private getAll() {
    return this.prisma.user.findMany();
  }

  private hashPassword(password: string): string {
    return hashSync(password, genSaltSync(10));
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
    });
  }
}
