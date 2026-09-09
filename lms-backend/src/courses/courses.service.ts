import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryCourseDto) {
    const { search, category_id, status, page = 1, limit = 10 } = query;

    // Bangun filter secara dinamis -> mirip Query Builder ->where() di Laravel
    const where: any = {};
    if (search) where.title = { contains: search, mode: 'insensitive' };
    if (category_id) where.categoryId = category_id;
    if (status) where.status = status;

    const [data, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip: (page - 1) * limit,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { id: true, name: true } },
          instructor: { select: { id: true, name: true } },
        },
      }),
      this.prisma.course.count({ where }),
    ]);

    return {
      data,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true } },
        instructor: { select: { id: true, name: true } },
        materials: { orderBy: { orderNo: 'asc' } },
      },
    });

    if (!course) {
      throw new NotFoundException('Course tidak ditemukan');
    }
    return course;
  }

  create(dto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        title: dto.title,
        description: dto.description,
        categoryId: dto.category_id,
        instructorId: dto.instructor_id,
        thumbnail: dto.thumbnail,
        startDate: dto.start_date ? new Date(dto.start_date) : undefined,
        status: dto.status ?? 'draft',
      },
    });
  }

  async update(id: string, dto: UpdateCourseDto) {
    await this.findOne(id); // pastikan course ada, kalau tidak -> 404

    return this.prisma.course.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        categoryId: dto.category_id,
        instructorId: dto.instructor_id,
        thumbnail: dto.thumbnail,
        startDate: dto.start_date ? new Date(dto.start_date) : undefined,
        status: dto.status,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.course.delete({ where: { id } });
    return { message: 'Course berhasil dihapus' };
  }
}
