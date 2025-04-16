import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import { existsSync, unlinkSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class SkinsService {
  private readonly skinsDir = join(process.cwd(), 'skins')

  constructor(private readonly prisma: PrismaService) {}

  async uploadSkin(username: string, file: Express.Multer.File) {
    if (!existsSync(this.skinsDir)) {
      mkdirSync(this.skinsDir)
    }

    const user = await this.prisma.user.findUnique({
      where: { name: username },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (user.skinUrl) {
      const oldSkinPath = join(this.skinsDir, user.skinUrl)
      if (existsSync(oldSkinPath)) {
        unlinkSync(oldSkinPath)
      }
    }

    const fileExt = file.originalname.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = join(this.skinsDir, fileName)

    try {
      writeFileSync(filePath, file.buffer)
    } catch (err) {
      console.error(err)
      throw new InternalServerErrorException('Failed to save skin file')
    }

    await this.prisma.user.update({
      where: { name: username },
      data: {
        skinUrl: fileName,
      },
    })

    return { message: 'Skin uploaded successfully', fileName }
  }

  async getSkinByName(name: string) {
    const user = await this.prisma.user.findUnique({
      where: { name },
      select: { skinUrl: true },
    })

    if (!user?.skinUrl) {
      throw new NotFoundException('Skin not found')
    }

    const skinPath = join(this.skinsDir, user.skinUrl)
    if (!existsSync(skinPath)) {
      throw new NotFoundException('Skin file not found')
    }

    return {
      filePath: skinPath,
      fileName: user.skinUrl,
      mimeType: 'image/png',
    }
  }

  async getSkinTypeByName(name: string) {
    const user = await this.prisma.user.findUnique({
      where: { name },
      select: { skinType: true },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user.skinType ?? true
  }

  async setSkinTypeByName(name: string, type: boolean) {
    return this.prisma.user.update({
      where: { name },
      data: { skinType: type },
    })
  }
}
