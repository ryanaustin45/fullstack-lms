import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  // Ubah "Creative Marketing" jadi "creative-marketing" -> slug URL-friendly
  private generateSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async create(dto: CreateCategoryDto) {
    const slug = this.generateSlug(dto.slug || dto.name);

    const existing = await this.prisma.category.findUnique({ where: { slug } });
    if (existing) {
      throw new ConflictException('Kategori dengan nama/slug ini sudah ada');
    }

    return this.prisma.category.create({ data: { name: dto.name, slug } });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }

    let slug = category.slug;
    if (dto.name && dto.name !== category.name) {
      slug = this.generateSlug(dto.name);
      const clashing = await this.prisma.category.findFirst({
        where: { slug, NOT: { id } },
      });
      if (clashing) {
        throw new ConflictException('Kategori dengan nama/slug ini sudah ada');
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: { name: dto.name ?? category.name, slug },
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }

    try {
      await this.prisma.category.delete({ where: { id } });
    } catch (err: any) {
      // P2003 = foreign key constraint -> kategori masih dipakai oleh course
      if (err.code === 'P2003') {
        throw new ConflictException(
          'Kategori tidak bisa dihapus karena masih dipakai oleh course. Hapus atau pindahkan course-nya dulu.',
        );
      }
      throw err;
    }

    return { message: 'Kategori berhasil dihapus' };
  }
}